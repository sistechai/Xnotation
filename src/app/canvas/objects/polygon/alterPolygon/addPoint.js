// import fabric from 'fabric.js';
import polygonProperties from '../properties.js';
import labelProperties from '../../label/properties.js';
import setAddPointsMode from '../../../mouseInteractions/cursorModes/addPointsMode.js';
import { changePolygonPointsToAddImpl } from './changePointsStyle.js';
import { getLabelById } from '../../label/label.js';
import { preventOutOfBoundsPointsOnMove } from '../../sharedUtils/moveBlockers.js';
import setInitialStageOfAddPointsOnExistingPolygonMode from '../../../mouseInteractions/cursorModes/initialiseAddPointsOnExistingPolygonMode.js';
import {getTestDrawLineState } from '../../../../tools/state.js';

let canvas = null;
let activeLine = null;
let lineArray = [];
let tempPointIndex = 0;
let initialPoint = null;
let pointsArray = [];
let defaultPointHoverMode = true;

let linePointersArray = [];

/// Draws temporary activeLine ONLY for Add Points event
// Active Line is a temporary line
function drawLineImpl(pointer) {
  activeLine.set({ x2: pointer.x, y2: pointer.y });
  activeLine.setCoords();
  canvas.renderAll();
}

// Changes the polygon's borders after mouse over polygon.
function addPointsMouseOverImpl(event) {
  if (defaultPointHoverMode && event.target && event.target.shapeName === 'point')
  {
    event.target.stroke = 'green';
    canvas.renderAll();
  }
}

function addPointsMouseOutImpl(event) {
  if (event.target && event.target.shapeName === 'point') {
    event.target.stroke = '#333333';
    canvas.renderAll();
  }
}

function createNewLine(...coordinates) {
  activeLine = new fabric.Line(coordinates, polygonProperties.newLine());
  if (!getTestDrawLineState()) {
    canvas.add(activeLine);
    canvas.renderAll();
  }
}
// pointer is initial point
function initializeAddNewPointsImpl(shape, pointer, canvasObj) {
    shape.stroke = '#333333';
    canvas = canvasObj;
    setAddPointsMode(canvas, shape);
    createNewLine(shape.left, shape.top, pointer.x, pointer.y);
    initialPoint = shape;
    //if ()
  console.log("%%%%%%%%% initialPoint", initialPoint);
  console.log("%%%%%%%%% pointer", pointer);
  //linePointersArray.push(pointer);
    canvas.bringToFront(initialPoint);
    defaultPointHoverMode = false;
}

function addFirstPointImpl(event) {
  changePolygonPointsToAddImpl(canvas);
  const pointer = canvas.getPointer(event.e);
  console.log("%%%%%%%%%2222222222 pointer", pointer);
  linePointersArray.push(pointer);
  lineArray.push(activeLine);
  createNewLine(pointer.x, pointer.y, pointer.x, pointer.y);
  const isNewPoint = true;
  const point = new fabric.Circle(polygonProperties.newPoint(tempPointIndex, pointer, isNewPoint));
  canvas.add(point);
  pointsArray.push(point);
  tempPointIndex += 1;
  canvas.bringToFront(initialPoint);
  defaultPointHoverMode = true;
}

function addPointImpl(pointer) {
  linePointersArray.push(pointer);
  console.log("%%%%%%%%%3333333333332 pointer", pointer);
  console.log("%%%%%%%%%3333333333332 linePointersArray", linePointersArray);
  lineArray.push(activeLine);
  createNewLine(pointer.x, pointer.y, pointer.x, pointer.y);
  const isNewPoint = true;
  const point = new fabric.Circle(polygonProperties.newPoint(tempPointIndex, pointer, isNewPoint));
  canvas.add(point);
  pointsArray.push(point);
  preventOutOfBoundsPointsOnMove(point, canvas);
  tempPointIndex += 1;
}

function resetAddPointPropertiesImpl(canvasObj) {
  canvas = canvasObj;
  defaultPointHoverMode = true;
}

function removeEditingPolygonPoints() {
  canvas.forEachObject((iteratedObj) => {
    if (iteratedObj.shapeName === 'point') {
      canvas.remove(iteratedObj);
    }

    else if (iteratedObj.shapeName === 'initialAddPoint') {
      canvas.remove(iteratedObj);
    }
  });
  canvas.renderAll();
}

function resetEditingPolygonPoints() {
  canvas.forEachObject((iteratedObj) => {
    if (iteratedObj.shapeName === 'initialAddPoint') {
      iteratedObj.shapeName = 'point';
    }
  });
  canvas.renderAll();
}

function clearTempPoints() {
  canvas.remove(activeLine);
  pointsArray.forEach((point) => {
    canvas.remove(point);
  });
  pointsArray = [];
  tempPointIndex = 0;
}

function clearLines() {
  lineArray.forEach((line) => {
    canvas.remove(line);
  });
  lineArray = [];
  activeLine = null;
}

function clearAllAddPointsDataImpl() {
  if (activeLine) {
    clearTempPoints();
    clearLines();
    removeEditingPolygonPoints();
  }
}

function resetAddPointsImpl() {
  if (activeLine) {
    clearTempPoints();
    clearLines();
    resetEditingPolygonPoints();
  }
}

// pointsArray keeps temporary points, which will be added to final shape
// in which x: pointsArray[i].left, y: pointsArray[i].top
// points in pointsArray are keeping order
// newPointsArray is not doubling points for Line object
function addNewPointsByTheirAddDirection(newPointsArray, firstPointId, lastPointId, polygon) {
  let pointId = 0;
  /////////////////////////////////////////////
  if (polygon.previousShapeName === 'newLine'){
  }
////////////////////////////////////////////////
  else {
    if (firstPointId < lastPointId) {
        pointsArray.forEach((point) => {
        newPointsArray.push({x: point.left, y: point.top});
      });
    } else {
      for (pointId = pointsArray.length - 1; pointId > -1; pointId -= 1) {
        newPointsArray.push({x: pointsArray[pointId].left, y: pointsArray[pointId].top});
      }
    }
  }
}

function completePolygonImpl(polygon, originalPointsArray, finalPoint) {
  let derefPointsArray = originalPointsArray.slice();
  let lineFinalPointId;
  lineFinalPointId = finalPoint.pointId;
  if (polygon.previousShapeName === 'newLine') {
    let arrayMiddle = derefPointsArray.length/2;
    derefPointsArray = originalPointsArray.slice(0, arrayMiddle);
    if (initialPoint.pointId > arrayMiddle-1) {
      initialPoint.pointId =originalPointsArray.length - initialPoint.pointId - 1;
    }
    if (finalPoint.pointId > arrayMiddle-1) {
      finalPoint.pointId =originalPointsArray.length - finalPoint.pointId - 1;
    }
  }
  let newPointsArray = [];
  let startingIdOfNewArray = Math.min(initialPoint.pointId, finalPoint.pointId);
  const endingIdIdOfNewArray = Math.max(initialPoint.pointId, finalPoint.pointId);
  const innerArray = [];
  for (let i = startingIdOfNewArray; i < endingIdIdOfNewArray + 1; i += 1) {
    innerArray.push(derefPointsArray[i]);
  }
  const innerArrayDistance = calculateTotalLineDistance(innerArray);

  const outerArray = [];
  for (let i = endingIdIdOfNewArray; i < derefPointsArray.length; i += 1) {
    outerArray.push(derefPointsArray[i]);
  }
  for (let i = 0; i < startingIdOfNewArray + 1; i += 1) {
    outerArray.push(derefPointsArray[i]);
  }
  const outerArrayDistance = calculateTotalLineDistance(outerArray);

  if (innerArrayDistance < outerArrayDistance) {
    startingIdOfNewArray += 1;
    newPointsArray = derefPointsArray.slice(0, startingIdOfNewArray);
    addNewPointsByTheirAddDirection(newPointsArray, initialPoint.pointId, finalPoint.pointId, polygon);
    for (let i = endingIdIdOfNewArray; i < derefPointsArray.length; i += 1) {
      newPointsArray.push(derefPointsArray[i]);
    }
  } else {
    newPointsArray = derefPointsArray.slice(startingIdOfNewArray, endingIdIdOfNewArray + 1);
    addNewPointsByTheirAddDirection(newPointsArray, finalPoint.pointId, initialPoint.pointId, polygon);
  }

  if (polygon.previousShapeName === 'newLine') {
    let lineFinalArray = [];
    lineFinalArray.push(newPointsArray[initialPoint.pointId]);

    // for (let i = 0; i < newPointsArray.length; i++) {
    //   if ((i !== initialPoint.pointId) && (i !== finalPoint.pointId)) {
    //     lineFinalArray.push(newPointsArray[i]);
    //   }
    // }
    for (let i = 0; i < linePointersArray.length; i++) {
      //if ((i !== initialPoint.pointId) && (i !== finalPoint.pointId)) {
        lineFinalArray.push(linePointersArray[i]);
      //}
    }

    lineFinalArray.push(newPointsArray[finalPoint.pointId]);

    console.log("^^ lineFinalArray", lineFinalArray);
    let tempArrayLine = [];

    tempArrayLine.push(...lineFinalArray);

    for (let i = lineFinalArray.length - 1; i > -1; i--) {
      tempArrayLine.push(lineFinalArray[i]);
    }
    console.log("^^111111111111 tempArrayLine", tempArrayLine);
    newPointsArray = tempArrayLine.slice();
    tempArrayLine = [];
    lineFinalArray = [];
    linePointersArray = [];
  }

  polygon.set({ points: newPointsArray });
  setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
  clearAllAddPointsDataImpl();
  realignLabel(polygon);
}

// ???
function moveAddablePointImpl(event) {
  preventOutOfBoundsPointsOnMove(event.target, canvas);
  const xCenterPoint = event.target.getCenterdrawLineOnMouseMovePoint().x;
  const yCenterPoint = event.target.getCenterPoint().y;
  const { pointId } = event.target;
  lineArray[pointId].set({ x2: xCenterPoint, y2: yCenterPoint });
  if ((pointId + 1) !== tempPointIndex) {
    lineArray[pointId + 1].set({ x1: xCenterPoint, y1: yCenterPoint });
  } else {
    activeLine.set({ x1: xCenterPoint, y1: yCenterPoint });
  }
}

//
function realignLabel(polygon) {
  const labelShape = getLabelById(polygon.id);
  labelShape.left = polygon.points[0].x - labelProperties.pointOffsetProperties().left;
  labelShape.top = polygon.points[0].y - labelProperties.pointOffsetProperties().top;
}
function calculateTotalLineDistance(pointsArr) {
  let totalDistance = 0;
  console.log("pointsArr", pointsArr);
  for (let i = 0; i < pointsArr.length - 1; i += 1) {
    const distance = Math.hypot(pointsArr[i + 1].x - pointsArr[i].x,
        pointsArr[i + 1].y - pointsArr[i].y);
    totalDistance += distance;
  }
  return totalDistance;
}
// did not find where it is used
function isAddingPointsToPolygonImpl() {
  return activeLine;
}
export {
  initializeAddNewPointsImpl,
  addFirstPointImpl,
  addPointImpl,
  completePolygonImpl,
  drawLineImpl,
  moveAddablePointImpl,
  addPointsMouseOverImpl,
  resetAddPointPropertiesImpl,
  isAddingPointsToPolygonImpl,
  clearAllAddPointsDataImpl,
  addPointsMouseOutImpl,
  resetAddPointsImpl,

  createNewLine,
};