import { getTestDrawLineState, setTestDrawLineState } from '../../../tools/state.js';

const polygonProperties = {};
let pointStrokedWidth = 0.6;
let augmentPolygonPointRadius = 4.1;
let defaultPointRadius = 3.5;
let invisiblePointRadius = 3.9;
let disabledNewPointRadius = 3.7;
let disabledAddPointRadius = 3;
let disabledRemovePointRadius = 3.7;
let newPolygonStrokeWidth = 4;
let tempPolygonStrokeWidth = 2;
let newLineStrokeWidth = 2;
let polygonPadding = 0;

// polygonProperties.disabledRemovePoint
function generateDisabledRemovePoint() {
  return {
    fill: 'black',
    radius: disabledRemovePointRadius,
  };
}

// polygonProperties.removablePoint = generateRemovablePoint;
// have not found when it is executed
function generateRemovablePoint() {
  return {
    radius: augmentPolygonPointRadius,
    fill: 'red',
    selectable: true,
  };
}

// polygonProperties.removableLinePoint = generateRemovableLinePoint;
function generateRemovableLinePoint(pointId, pointCoordinates, totalPointNumber) {
  const returnObj = {
    radius: augmentPolygonPointRadius,
    fill: 'red',
    stroke: '#133333',
    strokeWidth: pointStrokedWidth,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    shapeName: 'point',
    previousShapeName: 'newLine',
    objectCaching: false,
    pointId,
    perPixelTargetFind: true,
    lockMovementX: true,
    lockMovementY: true,
    hoverCursor: 'default',
  };
  if (pointCoordinates) {
    returnObj.left = pointCoordinates.x;
    returnObj.top = pointCoordinates.y;
    if (totalPointNumber < 5) {
      returnObj.fill = 'black';
      returnObj.radius = disabledNewPointRadius;
    }
  }
  return returnObj;
}

// polygonProperties.removablePolygonPoint = generateRemovablePolygonPoint;
// executed after hitting Remove points
function generateRemovablePolygonPoint(pointId, pointCoordinates, totalPointNumber) {
  const returnObj = {
    radius: augmentPolygonPointRadius,
    fill: 'red',
    stroke: '#333333',
    strokeWidth: pointStrokedWidth,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    shapeName: 'point',
    objectCaching: false,
    pointId,
    perPixelTargetFind: true,
    lockMovementX: true,
    lockMovementY: true,
    hoverCursor: 'default',
  };
  if (pointCoordinates) {
    returnObj.left = pointCoordinates.x;
    returnObj.top = pointCoordinates.y;
    if (totalPointNumber < 4) {
      returnObj.fill = 'black';
      returnObj.radius = disabledNewPointRadius;
    }
  }
  return returnObj;
}

function generateSelectedStartingAddPoint() {
  return {
    shapeName: 'initialAddPoint',
    radius: defaultPointRadius,
  };
}

function getPolygonAlignmentAfterPointMove() {
  return polygonPadding;
}

// executed if to hit remove points button while drawing polygon
function changeRemovablePointToTemp(pointId) {
  return {
    radius: defaultPointRadius,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: pointStrokedWidth,
    selectable: true,
    shapeName: 'tempPoint',
    pointId,
    lockMovementX: false,
    lockMovementY: false,
    hoverCursor: 'move',
  };
}

// executed after hitting Edit button, only for line and polygon
function generateExistingPolygonPoint(pointId, pointCoordinates) {
  return {
    radius: defaultPointRadius,
    fill: 'blue',
    stroke: '#333333',
    strokeWidth: pointStrokedWidth,
    left: pointCoordinates.x,
    top: pointCoordinates.y,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    shapeName: 'point',
    objectCaching: false,
    pointId,
    perPixelTargetFind: true,
    hoverCursor: 'move',
  };
}

// Executed after hitting/tapping Add points button, and after adding the last additional point for polygon
function generatestartingAddPolygonPoint(pointId, pointCoordinates) {
  const returnObj = {
    radius: augmentPolygonPointRadius,
    fill: 'green',
    stroke: '#333333',
    strokeWidth: pointStrokedWidth,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    shapeName: 'point',
    objectCaching: false,
    pointId,
    perPixelTargetFind: true,
    lockMovementX: true,
    lockMovementY: true,
  };
  if (pointCoordinates) {
    returnObj.left = pointCoordinates.x;
    returnObj.top = pointCoordinates.y;
  }
  return returnObj;
}

// executed to define all points of polygons, except the initial point
function generateAdditionalPoint() {
  return {
    fill: 'green',
    radius: augmentPolygonPointRadius,
    hoverCursor: 'default',
  };
}

// ???
function generateDefaultPoint() {
  return {
    fill: 'blue',
    radius: defaultPointRadius,
    hoverCursor: 'move',
  };
}

function generateNewLine() {
  return {
    strokeWidth: newLineStrokeWidth,
    fill: '#999999',
    stroke: '#999999',
    class: 'line',
    originX: 'center',
    originY: 'center',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false,
    shapeName: 'addPointsLine',
  };
}

// Executed while drawing polygon's or line's temporary points.
// The PointId starts from 0 for Polygon.
// However, after drawing line the queue of pointId continue both for line and polygon.
// That means after finishing drawing polygon the pointId = 0.
function generateNewPoint(pointId, pointer, isNewPoint) {
  return {
    radius: defaultPointRadius,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: pointStrokedWidth,
    left: pointer.x,
    top: pointer.y,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    shapeName: 'tempPoint',
    pointId,
    objectCaching: false,
    hoverCursor: isNewPoint ? 'default' : 'move',
  };
}

// executed to draw first point for polygon
// executed to draw each point for line
function generateInvisiblePoint(pointer) {
  if (getTestDrawLineState()){
    return {
      previousShapeName: 'newLine',
      radius: invisiblePointRadius,
      fill: 'green',
      stroke: '#333333',
      left: pointer.x,
      top: pointer.y,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'invisiblePoint',
      objectCaching: false,
      opacity: 0,
      hoverCursor: 'default',
      lockMovementX: true,
      lockMovementY: true,
    };
  }
  else {
    setTestDrawLineState(false);
    return {
      previousShapeName: 'polygon',
      radius: invisiblePointRadius,
      fill: 'green',
      stroke: '#333333',
      left: pointer.x,
      top: pointer.y,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'invisiblePoint',
      objectCaching: false,
      opacity: 0,
      hoverCursor: 'default',
    };
  }
}

// after 'enter' generates Polygon,
// in addition, reacts on moving line or polygon
function generateNewPolygon() {
  if (!getTestDrawLineState()) {
    setTestDrawLineState(false);
    return {
      previousShapeName: 'polygon',
      stroke: 'hsla(186, 8%, 50%, 1)',
      strokeWidth: newPolygonStrokeWidth,
      fill: 'rgba(237, 237, 237, 0.01)',
      perPixelTargetFind: true,
      hasBorders: false,
      hasControls: false,
      shapeName: 'polygon',
      selectable: false,
      evented: true,
      objectCaching: false,
      numberOfNullPolygonPoints: 0,
    };
  }
  /// Line Mode
  if (getTestDrawLineState()) {
    setTestDrawLineState(false);
    return {
      previousShapeName: 'newLine',
      stroke: 'hsla(186, 8%, 50%, 1)',
      strokeWidth: newPolygonStrokeWidth,
      fill: 'rgba(237, 237, 237, 0.01)',
      perPixelTargetFind: true,
      hasBorders: false,
      hasControls: false,
      shapeName: 'polygon',
      selectable: false,
      evented: true,
      objectCaching: false,
      numberOfNullPolygonPoints: 0,
      lockMovementX: true,
      lockMovementY: true,
    };
  }
}

// executed for generating temporary points while drawing line or polygon
function generateNewTempPolygon() {
  if (!getTestDrawLineState()) {
    return {
      previousShapeName: 'polygon',
      stroke: '#333333',
      strokeWidth: tempPolygonStrokeWidth,
      fill: '#cccccc',
      opacity: 0.3,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      objectCaching: false,
      numberOfNullPolygonPoints: 0,
      shapeName: 'tempPolygon',
    };
  }
  /// Line Mode
  if (getTestDrawLineState()) {
    //setTestDrawLineState(false);
    return {
      previousShapeName: 'newLine',
      stroke: '#F50A3D',
      strokeWidth: tempPolygonStrokeWidth,
      fill: '#cccccc',
      //opacity: 0,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      objectCaching: false,
      numberOfNullPolygonPoints: 0,
      shapeName: 'tempPolygon',
      lockMovementX: true,
      lockMovementY: true,
    };
  }
}

// Only for polygon's first point
function generateNewFirstPoint() {
  return {
    previousShapeName: 'polygon',
    fill: 'red',
    shapeName: 'firstPoint',
    lockMovementX: true,
    lockMovementY: true,
  };
}

// handles invocation of on initial point for adding points
// each points becomes white
function generateDisabledAddPoint() {
  return {
    fill: 'white',
    radius: disabledAddPointRadius,
  };
}

function setZoomInProperties(pointRatio, polygonRatio) {
  defaultPointRadius -= defaultPointRadius * pointRatio;
  pointStrokedWidth -= pointStrokedWidth * pointRatio;
  augmentPolygonPointRadius -= augmentPolygonPointRadius * pointRatio;
  invisiblePointRadius -= invisiblePointRadius * pointRatio;
  disabledNewPointRadius -= disabledNewPointRadius * pointRatio;
  disabledAddPointRadius -= disabledAddPointRadius * pointRatio;
  disabledRemovePointRadius -= disabledRemovePointRadius * pointRatio;
  newPolygonStrokeWidth -= newPolygonStrokeWidth * polygonRatio;
  tempPolygonStrokeWidth -= tempPolygonStrokeWidth * polygonRatio;
  newLineStrokeWidth -= newLineStrokeWidth * polygonRatio;
  polygonPadding += 0.05;
}

function setZoomOutProperties(pointRatio, polygonRatio) {
  pointStrokedWidth *= pointRatio;
  augmentPolygonPointRadius *= polygonRatio;
  defaultPointRadius *= pointRatio;
  invisiblePointRadius *= pointRatio;
  disabledNewPointRadius *= pointRatio;
  disabledAddPointRadius *= pointRatio;
  disabledRemovePointRadius *= pointRatio;
  newPolygonStrokeWidth *= polygonRatio;
  tempPolygonStrokeWidth *= polygonRatio;
  newLineStrokeWidth *= polygonRatio;
  polygonPadding -= 0.05;
}

(function setProperties() {
  polygonProperties.newPolygon = generateNewPolygon;
  polygonProperties.newTempPolygon = generateNewTempPolygon;
  polygonProperties.newLine = generateNewLine;
  polygonProperties.firstPoint = generateNewFirstPoint;
  polygonProperties.defaultPoint = generateDefaultPoint;
  polygonProperties.additionalPoint = generateAdditionalPoint;
  polygonProperties.disabledAddPoint = generateDisabledAddPoint;
  polygonProperties.selectedStartingAddPoint = generateSelectedStartingAddPoint;
  polygonProperties.newPoint = generateNewPoint;
  polygonProperties.invisiblePoint = generateInvisiblePoint;
  polygonProperties.changeRemovablePointToTemp = changeRemovablePointToTemp;
  polygonProperties.existingPolygonPoint = generateExistingPolygonPoint;

  polygonProperties.removablePolygonPoint = generateRemovablePolygonPoint;
  polygonProperties.removableLinePoint = generateRemovableLinePoint;
  polygonProperties.disabledRemovePoint = generateDisabledRemovePoint;
  polygonProperties.removablePoint = generateRemovablePoint;

  polygonProperties.startingAddPolygonPoint = generatestartingAddPolygonPoint;
  polygonProperties.setZoomInProperties = setZoomInProperties;
  polygonProperties.setZoomOutProperties = setZoomOutProperties;
  polygonProperties.getPolygonAlignmentAfterPointMove = getPolygonAlignmentAfterPointMove;
}());

export { polygonProperties as default };
