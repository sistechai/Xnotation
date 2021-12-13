// import fabric from 'fabric.js';
import polygonProperties from './properties.js';
import { setDrawCursorMode, resetObjectCursors } from '../../mouseInteractions/cursorModes/drawMode.js';
import { showLabellerModal } from '../../../tools/labellerModal/style.js';
import { prepareLabelShape } from '../../../tools/labellerModal/labellingProcess.js';
import {
  setPolygonDrawingInProgressState, setAddingPolygonPointsState,
  getMovableObjectsState, getAddingPolygonPointsState, setSessionDirtyState,
  setReadyToDrawShapeState, getCurrentZoomState, getDoubleScrollCanvasState,

  getTestDrawLineState, setTestDrawLineState,

} from '../../../tools/state.js';

import { isAddingPointsToPolygonImpl, createNewLine, } from './alterPolygon/addPoint.js';
import { preventOutOfBoundsPointsOnMove } from '../sharedUtils/moveBlockers.js';
import { preventOutOfBoundsOnNewObject } from '../sharedUtils/newObjectBlockers.js';

import {
  setAddPointsButtonToDefault, setRemovePointsButtonToDefault,
  setRemoveLabelsButtonToDefault, setCreatePolygonButtonToActive,

  setCreateNewLineToDisabled, setCreateNewLineToDefault, setCreateNewLineToGrey, setCreateNewLineButtonToActive,
  setCreatePolygonButtonToDefault,

} from '../../../tools/toolkit/styling/state.js';
import { getLastMouseMoveEvent } from '../../../keyEvents/mouse/mouseMove.js';

let canvas = null;
let pointArray = [];

let pointArrayNewLine = [];

let polygonMode = true;
let activeShape = null;
let pointId = 0;
let mouseUpClick = null;
let lastMouseEvent = null;
let lastHoveredPoint = null;
let mouseMoved = false;
let invisiblePoint = null;
let drawingFinished = false;
let currentlyHoveredPoint = null;
let ignoredFirstMouseMovement = false;
let lastNewPointPosition = { x: -1, y: -1 };

let lastPointer;

let movedOverflowScroll = false;
let createdInvisiblePoint = false;
let mouseIsDownOnTempPoint = false;

function isRightMouseButtonClicked(pointer) {
  if (activeShape && (canvas.getPointer(lastMouseEvent.e).x !== pointer.x)) {
    return true;
  }
  return false;
}

function movePoints(event) {
  if (activeShape) {
    preventOutOfBoundsPointsOnMove(event.target, canvas);
    const xCenterPoint = event.target.getCenterPoint().x;
    const yCenterPoint = event.target.getCenterPoint().y;
    activeShape.points[event.target.pointId] = {
      x: xCenterPoint, y: yCenterPoint,
    };
  }
}

function removeActiveShape() {
  canvas.remove(activeShape);
  activeShape = null;
}

function repositionCrosshair(pointer) {
  const points = activeShape.get('points');
  points[pointArray.length] = {
    x: pointer.x,
    y: pointer.y,
  };
  activeShape.set({
    points,
  });
  const polygon = new fabric.Polygon(activeShape.get('points'), polygonProperties.newTempPolygon());
  removeActiveShape();
  activeShape = polygon;
  canvas.add(polygon);
  polygon.sendToBack();
  setPolygonDrawingInProgressState(true);
}

function drawTemporaryShape(pointer) {
  if (activeShape) {
    if (!movedOverflowScroll) {
      const points = activeShape.get('points');
      points[pointArray.length] = {
        x: pointer.x,
        y: pointer.y,
      };
      activeShape.set({
        points,
      });
      canvas.renderAll();
    } else {
      repositionCrosshair(pointer);
      movedOverflowScroll = false;
    }
  }
}

function drawPolygon(event) {
  if (ignoredFirstMouseMovement) {
    mouseMoved = true;
  } else {
    ignoredFirstMouseMovement = true;
  }
  lastMouseEvent = event;
  const pointer = canvas.getPointer(event.e);
  drawTemporaryShape(pointer);
}

function lockMovementIfAssertedByState(polygon) {
  if (!getMovableObjectsState()) {
    const immovableObjectProps = {
      lockMovementX: true,
      lockMovementY: true,
      hoverCursor: 'default',
    };
    polygon.set(immovableObjectProps);
  }
}

/* initial point should begin with one color and switch when there are 3
 points to indicate that a new polygon can be created
let points = [pointer.x, pointer.y, pointer.x, pointer.y];
if (pointArray.length === 0) {
  const polygon = new fabric.Polygon(points, polygonProperties.newTempPolygon);
  canvas.add(polygon);
}
if (pointArray.length === 2) {
  pointArray[0].set(polygonProperties.firstPoint);
}
*/

////////////// Also for New Line
function addPoint(pointer) {
  // if (!getTestDrawLineState()){
  //   setCreatePolygonButtonToActive();
  // }
  setPolygonDrawingInProgressState(true);
  const isNewPoint = true;
  const point = new fabric.Circle(polygonProperties.newPoint(pointId, pointer, isNewPoint));

  // if (getTestDrawLineState()) {
  //   setCreateNewLineButtonToActive();
  // }

  pointId += 1;
  let points = [pointer.x, pointer.y, pointer.x, pointer.y];

// Only for polygon mode
  // activeShape comprises all points of polygon. Activates if has 2 points as minimum
  if (activeShape && (!getTestDrawLineState()) ) {
    points = activeShape.get('points');
    points.push({
      x: pointer.x,
      y: pointer.y,
    });
    const polygon = new fabric.Polygon(points, polygonProperties.newTempPolygon());
  // Reduces the opacity of temporary Polygon and removes at the end the temporary Polygon
      canvas.remove(activeShape);
 // Adds lines and temporary polygon
      canvas.add(polygon);
      activeShape = polygon;
      currentlyHoveredPoint = point;
      canvas.renderAll();
  }

// Line mode + polygon mode
// if there is 1 point on the scene
   else {
    // if (!getTestDrawLineState()){
    //   setCreatePolygonButtonToActive();
    // }
    const polyPoint = [{
      x: pointer.x,
      y: pointer.y,
    }];
    const polygon = new fabric.Polygon(polyPoint, polygonProperties.newTempPolygon()); /// activeLine
    activeShape = polygon;
    canvas.add(polygon);

    //// Line mode === true
    if (getTestDrawLineState())
    {
      points.push({
        x: pointer.x,
        y: pointer.y,
      });

      pointArray = [];
      createNewLine(...points);
      canvas.add(polygon);
      canvas.renderAll();
      isAddingPointsToPolygonImpl();
      polygon.set({ x2: pointer.x, y2: pointer.y });
      polygon.setCoords();
    }
  }

  canvas.add(point);

  // if only 1 point on the scene
  if ( (pointArray.length === 0) || (getTestDrawLineState()) ) {
    invisiblePoint = new fabric.Circle(polygonProperties.invisiblePoint(pointer));
    canvas.add(invisiblePoint);

///// New Line mode
    if (getTestDrawLineState()){
      //setCreateNewLineButtonToActive();
      console.log("setCreateNewLineButtonToActive()", setCreateNewLineButtonToActive());
     // pointArrayNewLine.push(point);
    }
    else {
      point.set(polygonProperties.firstPoint());
      setAddPointsButtonToDefault();
      setRemovePointsButtonToDefault();
      setRemoveLabelsButtonToDefault();
      //setCreateNewLineToDefault();
    }
  }
  preventOutOfBoundsPointsOnMove(point, canvas);
  pointArrayNewLine.push(point);

  // Line Mode
   // let arrL = pointArrayNewLine.length;
    //
    // let arrPoints = pointArrayNewLine.slice(arrL-2, arrL);
    //
    // console.log("== *-*-*-*-*-*-*-*arrPoints", arrPoints);
    //
    // arrPoints.forEach((point) => {
    //   points.push({
    //     x: point.left,
    //     y: point.top,
    //   });
    //   //canvas.remove(point);
    // });

  pointArray.push(point);
  drawTemporaryShape(pointer);
  activeShape.sendToBack();
  canvas.selection = false;
  const { x, y } = pointer;
  lastNewPointPosition = { x, y };
}

// Initialized after "enter", and creates final polygon. 
// Check:
// 1. Last point for New Line has not been drawn;
// 2. Create an array with all points of line like pointArray;
// 3. States;
// 8. setLastDrawingModeState('newLine') - have to define this state

// draws Polygon with green borders
function generatePolygon() {

  // To add last Point
  const points = [];
  pointArray.forEach((point) => {
    points.push({
      x: point.left,
      y: point.top,
    });
    canvas.remove(point);
  });

  canvas.remove(invisiblePoint);
  invisiblePoint = null;
  removeActiveShape();
  const polygon = new fabric.Polygon(points, polygonProperties.newPolygon());
  // find out why on add new polygon points, the cursor changes immediately after adding them

  lockMovementIfAssertedByState(polygon);
  canvas.add(polygon);

  activeShape = null;
  polygonMode = false;
  drawingFinished = true;
  prepareLabelShape(polygon, canvas);
  showLabellerModal();
  setPolygonDrawingInProgressState(false);
  setSessionDirtyState(true);

}

function clearPolygonData() {

  if (pointArray[0]) {
      pointArray.forEach((point) => {
      canvas.remove(point);
    });
    canvas.remove(invisiblePoint);
    invisiblePoint = null;
    removeActiveShape();

    pointArray = [];
    pointArrayNewLine = [];

    activeShape = null;
    pointId = 0;
    mouseMoved = false;
    drawingFinished = false;
    ignoredFirstMouseMovement = false;
    setPolygonDrawingInProgressState(false);
    lastMouseEvent = null;
    createdInvisiblePoint = false;
    lastNewPointPosition = { x: -1, y: -1 };
  }

  // if (getTestDrawLineState()){
  //   setCreateNewLineButtonToActive();
  //   setCreatePolygonButtonToDefault();
  //
  //   setTestDrawLineState(false);
  // }
}

function getTempPolygon() {
  if (activeShape) {
    const points = activeShape.get('points');
    points.length -= 1;
    return activeShape;
  }
  return null;
}

function getCurrentlyHoveredDrawPoint() {
  return currentlyHoveredPoint;
}

function isPolygonDrawingFinished() {
  return drawingFinished;
}

function resetNewPolygonData() {
  if (canvas) resetObjectCursors(canvas);
  clearPolygonData();
}

function changeInitialPointColour(colour) {
  if (pointArray.length > 2) {
    pointArray[0].stroke = colour;
  }
}

function polygonMouseOverEvents(event) {
  if (event.target && event.target.selectable && event.target.shapeName === 'invisiblePoint') {
    changeInitialPointColour('red');
  }
}

function polygonMouseOutEvents(event) {
  if (event.target) {
    const { target } = event;
    if (target.shapeName === 'invisiblePoint') {
      changeInitialPointColour('#333333');
    } else if (target.shapeName === 'tempPoint' && target.hoverCursor === 'default') {
      target.hoverCursor = 'move';
    }
    if (!mouseMoved) {
      lastHoveredPoint = event.target;
    }
    currentlyHoveredPoint = null;
  }
}

function generatePolygonViaKeyboard() {
  if ( (pointArray.length > 2) || (getTestDrawLineState()) ) 
  {
    generatePolygon();
  }
}

function addPointViaKeyboard() {
  if (!mouseMoved) {
    if (lastHoveredPoint && lastHoveredPoint.shapeName === 'tempPoint') {
      return;
    }
    mouseMoved = true;
  }
  if (lastMouseEvent) {
    let pointer = canvas.getPointer(lastMouseEvent.e || lastMouseEvent);
    if (lastMouseEvent.target && lastMouseEvent.target.shapeName === 'invisiblePoint') {
      if (pointArray.length > 2) {
        generatePolygon();
      }
    } else if (
      (pointer.x === lastNewPointPosition.x && pointer.y === lastNewPointPosition.y)
      || (lastMouseEvent.target && lastMouseEvent.target.shapeName === 'tempPoint')
      || (createdInvisiblePoint && Number.isNaN(pointer.x))) {
      // placeholder
    } else {
      if (!pointer.x || !pointer.y) {
        const lastMouseMoveEvent = getLastMouseMoveEvent();
        const lastCanvasPointer = canvas.getPointer(lastMouseMoveEvent);
        if (!lastCanvasPointer.x || !lastCanvasPointer.y) return;
        pointer = canvas.getPointer(lastMouseMoveEvent);
      }
      setReadyToDrawShapeState(false);
      addPoint(pointer);
      createdInvisiblePoint = true;
    }
  }
}

function instantiatePolygon(event) {
  const pointer = canvas.getPointer(event.e);
  if (!isRightMouseButtonClicked(pointer)) {
    setReadyToDrawShapeState(false);

// only if polygon exists and we draw on it new points of polygon, place of intersection
    if (event.target && event.target.shapeName) {
      if (event.target.shapeName === 'invisiblePoint') {
          if ( (pointArray.length > 2) ) { //&& (!getTestDrawLineState()) ) {
          generatePolygon();
        }
      } else if (event.target.shapeName === 'tempPoint') {
        mouseIsDownOnTempPoint = true;
      } else if (polygonMode) {
        addPoint(pointer);
      }
    }

// Here the place of drawing line for polygon
    else if (polygonMode) {
      addPoint(pointer);
    }
    // fix for double click to draw first point bug
    lastMouseEvent = event;
  }
}

function placeHolderFunc() {}

function assignMouseUpClickFunc() {
  mouseUpClick = placeHolderFunc;
}

function placeholderToAddMouseDownEvents() {
  mouseIsDownOnTempPoint = false;
  mouseUpClick();
}

function skipMouseUpEvent() {
  canvas.__eventListeners['mouse:down'] = [];
  canvas.on('mouse:down', (e) => {
    if (!e.target || (e.target && e.target.shapeName !== 'tempPoint')) {
      instantiatePolygon(e);
    }
  });
  assignMouseUpClickFunc();
}

function prepareCanvasForNewPolygon(canvasObj) {
  canvas = canvasObj;
  polygonMode = true;
  drawingFinished = false;
  canvas.discardActiveObject();
  setDrawCursorMode(canvas);
  setReadyToDrawShapeState(true);
  if (getAddingPolygonPointsState()) {
    setAddPointsButtonToDefault();
    setAddingPolygonPointsState(false);
    mouseUpClick = skipMouseUpEvent;
  } else {
    mouseUpClick = placeHolderFunc;
  }
}

function prepareCanvasForNewPolygonsFromExternalSources(canvasObj) {
  canvas = canvasObj;
  setDrawCursorMode(canvas);
}

function resetDrawPolygonMode() {
  polygonMode = true;
  setCreatePolygonButtonToActive();
  setReadyToDrawShapeState(true);
  drawingFinished = false;
  clearPolygonData();
  setDrawCursorMode(canvas);
}

function cleanPolygonFromEmptyPoints() {
  const polygonPoints = activeShape.get('points');
  const points = [];
  polygonPoints.forEach((point) => {
    if (Object.keys(point).length > 0) {
      points.push({
        x: point.x,
        y: point.y,
      });
    }
  });
  activeShape.set({
    points,
  });
  canvas.renderAll();

  let currentPointId = 0;
  const tempPointArray = [];
  canvas.forEachObject((iteratedObj) => {
    if (iteratedObj.shapeName === 'point') {
      iteratedObj.set(polygonProperties.changeRemovablePointToTemp(currentPointId));
      if (currentPointId === 0) {
        iteratedObj.set(polygonProperties.firstPoint());
      }
      currentPointId += 1;
      tempPointArray.push(iteratedObj);
    }
  });
  pointArray = tempPointArray;
  pointId = currentPointId;
  canvas.renderAll();
  points[pointArray.length] = {
    x: points[0].x,
    y: points[0].y,
  };
  activeShape.set({
    points,
  });
  canvas.renderAll();
}

function resumeDrawingAfterRemovePoints() {
  mouseMoved = false;
  ignoredFirstMouseMovement = false;
  activeShape.numberOfNullPolygonPoints = 0;
  cleanPolygonFromEmptyPoints();
  setDrawCursorMode(canvas);
  if (pointArray.length !== 0) {
    const position = { x: pointArray[0].left, y: pointArray[0].top };
    invisiblePoint = new fabric.Circle(polygonProperties.invisiblePoint(position));
    canvas.add(invisiblePoint);
  }
  setTimeout(() => {
    const lastMouseMoveEvent = getLastMouseMoveEvent();
    if (currentlyHoveredPoint && currentlyHoveredPoint.state === 'removed') lastNewPointPosition = { x: -1, y: -1 };
    currentlyHoveredPoint = null;
    lastMouseEvent = lastMouseMoveEvent;
    const pointer = canvas.getPointer(lastMouseMoveEvent);
    drawTemporaryShape(pointer);
  });
}

function removeInvisiblePoint() {
  canvas.remove(invisiblePoint);
  invisiblePoint = null;
}

function getScrollWidth() {
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
  const currentScrollTopOffset = zoomOverflowElement.scrollTop / getCurrentZoomState();
  const newPositionTop = canvas.getPointer(event.e).y - currentScrollTopOffset;
  if (mouseIsDownOnTempPoint) {
    if (event.target.shapeName === 'tempPoint') {
      event.target.top = newPositionTop;
      activeShape.points[event.target.pointId].y = event.target.top;
    }
  }
  const points = activeShape.get('points');
  points[pointArray.length].y = newPositionTop;
  activeShape.set({
    points,
  });
}

function bottomOverflowScroll(event, zoomOverflowElement, stubHeight, scrollWidth) {
  const canvasHeight = stubHeight + scrollWidth;
  const canvasBottom = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
  const result = canvasHeight - canvasBottom;
  const newPositionTop = canvas.getPointer(event.e).y + (result / getCurrentZoomState());
  if (mouseIsDownOnTempPoint) {
    if (event.target.shapeName === 'tempPoint') {
      event.target.top = newPositionTop;
      activeShape.points[event.target.pointId].y = newPositionTop;
    }
  }
  const points = activeShape.get('points');
  points[pointArray.length] = {
    x: canvas.getPointer(event.e).x,
    y: newPositionTop,
  };
  activeShape.set({
    points,
  });
}

function defaultScroll(event) {
  const currentVerticalScrollDelta = event.e.deltaY / getCurrentZoomState();
  const newPositionTop = canvas.getPointer(event.e).y + currentVerticalScrollDelta;
  const currentHorizontalScrollDelta = event.e.deltaX / getCurrentZoomState();
  if (mouseIsDownOnTempPoint) {
    if (event.target.shapeName === 'tempPoint') {
      event.target.left = canvas.getPointer(event.e).x + currentHorizontalScrollDelta;
      event.target.top = newPositionTop;
      activeShape.points[event.target.pointId] = {
        x: event.target.left, y: event.target.top,
      };
    }
  }
  const points = activeShape.get('points');
  points[pointArray.length] = {
    x: canvas.getPointer(event.e).x + currentHorizontalScrollDelta,
    y: newPositionTop,
  };
  activeShape.set({
    points,
  });
}

function shapeScrollEvents(event) {
  const currentZoom = getCurrentZoomState();
  if (currentZoom > 1.00001) {
    if (activeShape || (mouseIsDownOnTempPoint && event.target.shapeName === 'tempPoint')) {
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
      const polygon = new fabric.Polygon(activeShape.get('points'), polygonProperties.newTempPolygon());
      removeActiveShape();
      activeShape = polygon;
      canvas.add(polygon);
      polygon.sendToBack();
    }
  }
}

function scrolledViaScrollbar() {
  if (activeShape) {
    movedOverflowScroll = true;
  }
}

function createNewPolygonFromCoordinates(points, imageScalingDimensions, imageLengthDimensions) {
  const polygon = new fabric.Polygon(points, polygonProperties.newPolygon());
  preventOutOfBoundsOnNewObject(polygon, imageScalingDimensions, imageLengthDimensions);
  lockMovementIfAssertedByState(polygon);
  return polygon;
}

export {
  movePoints,
  drawPolygon,
  getTempPolygon,
  shapeScrollEvents,
  instantiatePolygon,
  addPointViaKeyboard,
  resetNewPolygonData,
  scrolledViaScrollbar,
  removeInvisiblePoint,
  resetDrawPolygonMode,
  polygonMouseOutEvents,
  polygonMouseOverEvents,
  changeInitialPointColour,
  isPolygonDrawingFinished,
  prepareCanvasForNewPolygon,
  generatePolygonViaKeyboard,
  getCurrentlyHoveredDrawPoint,
  resumeDrawingAfterRemovePoints,
  placeholderToAddMouseDownEvents,
  createNewPolygonFromCoordinates,
  prepareCanvasForNewPolygonsFromExternalSources,
};