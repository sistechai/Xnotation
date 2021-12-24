import {
  setEditablePolygon, removePolygonPoint,
} from '../../../objects/polygon/alterPolygon/alterPolygon.js';
import { getCurrentlyHoveredDrawPoint } from '../../../objects/polygon/polygon.js';

let removingPoints = false;
let canvas = null;
let currentlyHoveredPoint = null;
let ignoredFirstMouseMovement = false;
let lastHoveredPoint = null;
let mouseMoved = false;

// initiated, if during drawing polygon to press Remove points
function setRemovablePointsEventsCanvas(canvasObj, polygonObj) {
  console.log("??? setRemovablePointsEventsCanvas");
  canvas = canvasObj;
  ignoredFirstMouseMovement = false;
  currentlyHoveredPoint = null;
  lastHoveredPoint = null;
  mouseMoved = false;
  // edit this
  if (polygonObj) {
    setEditablePolygon(canvas, polygonObj, true, true);
  }
}

function pointMouseDownEvents(event) {
  console.log("??? Mouse down");
  if (event.target && event.target.shapeName === 'point') {
    removePolygonPoint(event.target.pointId);
    currentlyHoveredPoint = null;
  }
}

function removeTempPointViaKeyboard() {
  if (!mouseMoved) {
    if (lastHoveredPoint) {
      removePolygonPoint(lastHoveredPoint.pointId);
    } else {
      const currentlyHoveredDrawingPoint = getCurrentlyHoveredDrawPoint();
      if (currentlyHoveredDrawingPoint) {
        removePolygonPoint(currentlyHoveredDrawingPoint.pointId);
        currentlyHoveredDrawingPoint.state = 'removed';
      }
    }
    mouseMoved = true;
  } else if (currentlyHoveredPoint) {
    removePolygonPoint(currentlyHoveredPoint.pointId);
  }
  currentlyHoveredPoint = null;
}

function pointMouseOverEvents(event) {
  if (event.target && event.target.shapeName === 'point' && event.target.fill === 'red') {
    event.target.stroke = 'red';
    canvas.renderAll();
    currentlyHoveredPoint = event.target;
  }
}

function pointMouseUpEvents() {
  // filler function for the default parent call
}

function pointMouseOutEvents(event) {
  console.log("???? point out remove");
  if (event.target && event.target.shapeName === 'point') {
    event.target.stroke = 'black';
    canvas.renderAll();
    currentlyHoveredPoint = null;
    // fix for the bug where upon hovering over a point in another mode and switching it to this
    // mode - the mouse out event is triggered, highlighting the last hovered shape
    if (!mouseMoved) lastHoveredPoint = event.target;
  }
}

function pointMouseMoveEvents() {
  console.log("???? point mouse move");
  if (ignoredFirstMouseMovement) {
    mouseMoved = true;
  } else {
    ignoredFirstMouseMovement = true;
  }
}

function getRemovingPointsState() {
  console.log("???? get Removing points state, removing points", removingPoints);
  return removingPoints;
}

function setRemovingPointsStateToFalse() {
  console.log("???? set Removing points state to false, removing points", removingPoints);
  removingPoints = false;
}

export {
  pointMouseDownEvents, pointMouseOverEvents,
  setRemovablePointsEventsCanvas, getRemovingPointsState,
  setRemovingPointsStateToFalse, removeTempPointViaKeyboard,
  pointMouseUpEvents, pointMouseOutEvents, pointMouseMoveEvents,
};