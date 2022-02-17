import { removeEditedPolygonId } from './defaultEventsWorker.js';
import {
  removePolygonPoints, getPolygonEditingStatus, setEditablePolygon,
  getPolygonIfEditing, initializeAddNewPoints, addFirstPoint, getPolygonIdIfEditing,
  addPoint, completePolygon, drawLineOnMouseMove, moveAddablePoint, getPolygonPointsArray,
  addPointsMouseOver, resetAddPointProperties, addPointsMouseOut,
} from '../../../objects/polygon/alterPolygon/alterPolygon.js';
import { enableActiveObjectsAppearInFront, preventActiveObjectsAppearInFront } from '../../../utils/canvasUtils.js';
import { getCurrentZoomState, getDoubleScrollCanvasState, setSessionDirtyState } from '../../../../tools/state.js';
import { highlightLabelInTheList, removeHighlightOfListLabel } from '../../../../tools/labelList/labelListHighlightUtils.js';
import { setRemoveLabelsButtonToDefault, setRemoveLabelsButtonToDisabled } from '../../../../tools/toolkit/styling/state.js';
import { getLastMouseMoveEvent } from '../../../../keyEvents/mouse/mouseMove.js';
import {completePolygonImpl} from "../../../objects/polygon/alterPolygon/addPoint.js";
import {resetPolygonSelectableAreaImpl} from "../../../objects/polygon/alterPolygon/movePoint.js";

// Originally designed to be turned off after the points have been successfully added to a polygon
let selectedPolygonId = null;
let newPolygonSelected = false;
let canvas = null;
let addingPoints = false;
let selectedNothing = false;
let addFirstPointMode = false;
let coordinatesOfLastMouseHover = null;
let mouseIsDownOnTempPoint = false;
let activeShape = null;
let currentlyHoveredPoint = null;
let lastMouseEvent = null;
let mouseMoved = false;
let lastHoveredPoint = null;
let ignoredFirstMouseMovement = false;
let addPointsLineState = false;
let addPointsLinePointers = [];
let linePointIdFinal = undefined;

// only for the first point, which is located on polygon or line
// reacts for each mouse down
// returns target: null if to click outside the polygon area or new part of line
// that means that before evoking this function event doesn't return target
function pointMouseDownEvents(event) {
  if (!addingPoints) {
    if (event.target) {
      enableActiveObjectsAppearInFront(canvas);
      if ((event.target.shapeName === 'point'))
      {
        if (activeShape) {
          let pointsArrayLength = activeShape.points.length;
          if ((activeShape.previousShapeName === 'newLine')
              && (
                  (event.target.pointId === 0)
                  || (event.target.pointId === (pointsArrayLength - 1))
                  || (event.target.pointId === (pointsArrayLength / 2))
                  || (event.target.pointId === (pointsArrayLength / 2 - 1))
              ) )
          {
            setAddPointsLineState(true);
            const pointer = canvas.getPointer(event.e);
            // whether it is the initial point of the original line
            if ( (event.target.pointId === 0)  || (event.target.pointId === (pointsArrayLength - 1) ) ) {
              linePointIdFinal = false;
            }
            // whether it is the final point of the original line
            else{
              linePointIdFinal = true;
            }
            initializeAddNewPoints(event.target, pointer);
            addingPoints = true;
            addFirstPointMode = true;
          }
          else if (activeShape.previousShapeName === 'polygon') {
            const pointer = canvas.getPointer(event.e);
            initializeAddNewPoints(event.target, pointer);
            addingPoints = true;
            addFirstPointMode = true;
          }
        }
        else {
          if (event.target.shapeName === 'polygon') {
            newPolygonSelected = (event.target.id !== selectedPolygonId);
          }
          preventActiveObjectsAppearInFront(canvas);
        }
        selectedNothing = false;
      }

      else {
        selectedNothing = true;
      }
    }
  }
  // adds the points starting from outside of polygon or line, and ending by point on polygon or line
  else {
    addPoints(event);
    if (activeShape.previousShapeName === 'newLine') {
      resetPolygonSelectableAreaImpl(canvas, activeShape);
    }
  }
}

// only for line mode
function addLineLastPoint(){
  addingPoints = false;
  let finalPoint = addPointsLinePointers.slice(addPointsLinePointers.length - 1);
  let finalPointLeftTop = {
    left: finalPoint[0].x,
    top: finalPoint[0].y
  };
  let eventTarget =  getPointInArrayClosestToGivenCoordinates(getPolygonPointsArray(), finalPointLeftTop);
  completePolygonImpl(activeShape, activeShape.points, eventTarget, addPointsLinePointers, linePointIdFinal);
  prepareToAddPolygonPoints(activeShape);
  currentlyHoveredPoint = getPointInArrayClosestToGivenCoordinates(getPolygonPointsArray(), finalPointLeftTop);
  setSessionDirtyState(true);
  addPointsLinePointers = [];
}

// adding points to existing object
// line or polygon
function addPoints(event) {
  // first point
  if (addFirstPointMode) {
    if ((event && !event.target)
        || (event && event.target && (event.target.shapeName !== 'point' && event.target.shapeName !== 'initialAddPoint'))
    ) {
      const pointer = canvas.getPointer(event.e);
      if (!isRightMouseButtonClicked(pointer)) {
        addFirstPoint(event);
        addFirstPointMode = false;
        if (activeShape.previousShapeName === 'newLine'){
          addPointsLinePointers.push(pointer);
        }
      }
    }
  }
  else if (event && event.target && event.target.shapeName === 'point' && (activeShape.previousShapeName !== 'newLine') ) {
    addingPoints = false;
    completePolygon(event.target);
    prepareToAddPolygonPoints(activeShape);
    currentlyHoveredPoint = getPointInArrayClosestToGivenCoordinates(getPolygonPointsArray(), event.target);
    setSessionDirtyState(true);
  }

  // starting from second point
  else if (!event.target
      || (event.target && (event.target.shapeName !== 'initialAddPoint' && event.target.shapeName !== 'tempPoint'))) {
    const pointer = canvas.getPointer(event.e);
    if (!isRightMouseButtonClicked(pointer)) {
      addPoint(pointer);

      if (activeShape.previousShapeName === 'newLine'){
        setActiveShape(activeShape);
        addPointsLinePointers.push(pointer);
      }
    }
  }

  else if (event.target && event.target.shapeName === 'tempPoint') {
    mouseIsDownOnTempPoint = true;
  }
}

// For enter key
function setAddPointsLineState(state){
  addPointsLineState = state;
}

function getAddPointsLineState(){
  return addPointsLineState;
}

function setActiveShape(currentActiveShape){
  activeShape = currentActiveShape;
}

// can get shapeId from arguments
function selectShape(shapeId) {
  highlightLabelInTheList(shapeId);
  setRemoveLabelsButtonToDefault();
}

function deselectShape() {
  removeHighlightOfListLabel();
  setRemoveLabelsButtonToDisabled();
}

function isRightMouseButtonClicked(pointer) {
  if (coordinatesOfLastMouseHover.x !== pointer.x) {
    return true;
  }
  return false;
}

function mouseOverEvents(event) {
  addPointsMouseOver(event);
  if (event.target && event.target.shapeName === 'point') {
    currentlyHoveredPoint = event.target;
  }
}

function setAddPointsEventsCanvas(canvasObj) {
  canvas = canvasObj;
  activeShape = getPolygonIfEditing();
  selectedPolygonId = getPolygonIdIfEditing();
  addingPoints = false;
  addFirstPointMode = false;
  mouseMoved = false;
  lastHoveredPoint = null;
  ignoredFirstMouseMovement = false;
  currentlyHoveredPoint = null;
  resetAddPointProperties(canvasObj);
  if (selectedPolygonId !== null && selectedPolygonId !== undefined) {
    selectShape(selectedPolygonId);
  }
}

function moveAddPoints(event) {
  if (addingPoints) {
    moveAddablePoint(event);
  }
}

function mouseMove(event) {
  if (addingPoints) {
    const pointer = canvas.getPointer(event.e);
    coordinatesOfLastMouseHover = pointer;
    drawLineOnMouseMove(pointer);
  }
  if (ignoredFirstMouseMovement) {
    mouseMoved = true;
  } else {
    ignoredFirstMouseMovement = true;
  }
  lastMouseEvent = event;
}

function setPolygonNotEditableOnClick() {
  removePolygonPoints();
  selectedPolygonId = null;
  deselectShape();
}

function getPointInArrayClosestToGivenCoordinates(pointArray, { left, top }) {
  for (let i = 0; i < pointArray.length; i += 1) {
    const point = pointArray[i];
    if (left === point.left) {
      if (top === point.top) {
        setAddPointsLineState(false);
          return point;
      }
    }
  }
  return pointArray[0];
}

function addPointViaKeyboard() {
  if (!addingPoints) {
    if (!mouseMoved) {
      if (lastHoveredPoint && lastHoveredPoint.shapeName === 'point') {
        const pointer = canvas.getPointer(lastMouseEvent.e);
        initializeAddNewPoints(lastHoveredPoint, pointer);
        addingPoints = true;
        addFirstPointMode = true;
        selectedNothing = false;
      } else if (currentlyHoveredPoint) {
        const pointer = canvas.getPointer(getLastMouseMoveEvent());
        initializeAddNewPoints(currentlyHoveredPoint, pointer);
        addingPoints = true;
        addFirstPointMode = true;
        selectedNothing = false;
      }
      mouseMoved = true;
    } else if (lastMouseEvent && lastMouseEvent.target && lastMouseEvent.target.shapeName === 'point') {
      const pointer = canvas.getPointer(lastMouseEvent.e);
      initializeAddNewPoints(lastMouseEvent && lastMouseEvent.target, pointer);
      addingPoints = true;
      addFirstPointMode = true;
      selectedNothing = false;
    }
  } else {
    addPoints(lastMouseEvent);
  }
}

function mouseOutEvents(event) {
  addPointsMouseOut(event);
  if (event.target) {
    const { target } = event;
    if (target.shapeName === 'point') {
      if (!mouseMoved) {
        lastHoveredPoint = target;
      }
    } else if (target.shapeName === 'tempPoint' && target.hoverCursor === 'default') {
      target.hoverCursor = 'move';
    }
  }
  currentlyHoveredPoint = null;
}

function getSelectedPolygonIdForAddPoints() {
  return selectedPolygonId;
}

function getScrollWidth() {
  console.log("??? Get scroll width.");
  // create a div with the scroll
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  // must put it in the document, otherwise sizes will be 0
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth * 2;
}

function topOverflowScroll(event, zoomOverflowElement) {
  console.log("??? Top Over Flow Scroll.");
  const currentScrollTopOffset = zoomOverflowElement.scrollTop / getCurrentZoomState();
  const newPositionTop = canvas.getPointer(event.e).y - currentScrollTopOffset;
  if (mouseIsDownOnTempPoint && event.target && event.target.shapeName === 'tempPoint') {
    event.target.top = newPositionTop;
    moveAddablePoint(event);
  }
  drawLineOnMouseMove({ x: canvas.getPointer(event.e).x, y: newPositionTop });
}

function bottomOverflowScroll(event, zoomOverflowElement, stubHeight, scrollWidth) {
  console.log("??? Bottom Over flow Scroll.");
  const canvasHeight = stubHeight + scrollWidth;
  const canvasBottom = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
  const result = canvasHeight - canvasBottom;
  const newPositionTop = canvas.getPointer(event.e).y + (result / getCurrentZoomState());
  if (mouseIsDownOnTempPoint && event.target && event.target.shapeName === 'tempPoint') {
    event.target.top = newPositionTop;
    moveAddablePoint(event);
  }
  drawLineOnMouseMove({ x: canvas.getPointer(event.e).x, y: newPositionTop });
}

function defaultScroll(event) {
  const currentVerticalScrollDelta = event.e.deltaY / getCurrentZoomState();
  const newPositionTop = canvas.getPointer(event.e).y + currentVerticalScrollDelta;
  if (mouseIsDownOnTempPoint && event.target && event.target.shapeName === 'tempPoint') {
    event.target.top = newPositionTop;
    moveAddablePoint(event);
  }
  drawLineOnMouseMove({ x: canvas.getPointer(event.e).x, y: newPositionTop });
}

// didn't go for scrolling when resizing bounding box, because when holding lower corner
// and scrolling up above it, the lower corner doesn't change to upper corner, causing the rectangle
// to move the bottom corner to the top corner
function shapeScrollEvents(event) {
  const currentZoom = getCurrentZoomState();
  if (currentZoom > 1.00001) {
    const stubElement = document.getElementById('stub');
    const stubMarginTop = stubElement.style.marginTop;
    const stubHeightSubstring = stubMarginTop.substring(0, stubMarginTop.length - 2);
    const stubHeight = parseInt(stubHeightSubstring, 10);
    const zoomOverflowElement = document.getElementById('zoom-overflow');
    const currentBotLocation = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
    const futureBotLocation = currentBotLocation + event.e.deltaY;
    const scrollWidth = getDoubleScrollCanvasState() ? getScrollWidth() : getScrollWidth() / 2;
    if (zoomOverflowElement.scrollTop + event.e.deltaY < 0) {
      topOverflowScroll(event, zoomOverflowElement);
    } else if (futureBotLocation > stubHeight + scrollWidth) {
      bottomOverflowScroll(event, zoomOverflowElement, stubHeight, scrollWidth);
    } else {
      defaultScroll(event);
    }
  }
}

// without first point
function pointMouseUpEvents(event) {
  mouseIsDownOnTempPoint = false;

  // hitting/tapping of existing points of polygon or line
  if (event.target && event.target.shapeName === 'polygon' && (newPolygonSelected || selectedNothing)) {
    activeShape = event.target;
    prepareToAddPolygonPoints(event.target);
    selectedNothing = false;
    newPolygonSelected = false;
  }

  else if ((!event.target && getPolygonEditingStatus()) || (event.target && event.target.shapeName === 'bndBox') ) {
    if (!addingPoints) {
      setPolygonNotEditableOnClick();
    }
  }
}

// executed after hitting/tapping Add Points and hitting/tapping the polygon or line
function prepareToAddPolygonPoints(shape) {
  removePolygonPoints();
  removeEditedPolygonId();
  setEditablePolygon(canvas, shape, false, false, true);
  selectedPolygonId = shape.id;
  selectShape(selectedPolygonId);
  lastMouseEvent = null;
  mouseMoved = false;
  lastHoveredPoint = null;
  ignoredFirstMouseMovement = false;
}

export {
  mouseMove,
  moveAddPoints,
  mouseOutEvents,
  mouseOverEvents,
  shapeScrollEvents,
  pointMouseUpEvents,
  addPointViaKeyboard,
  pointMouseDownEvents,
  setAddPointsEventsCanvas,
  setPolygonNotEditableOnClick,
  getSelectedPolygonIdForAddPoints,

  setAddPointsLineState,
  getAddPointsLineState,
  addLineLastPoint,
};