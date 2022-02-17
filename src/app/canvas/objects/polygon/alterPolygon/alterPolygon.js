import polygonProperties from '../properties.js';
import sendPolygonPointsToFrontImpl from './stackPoints.js';
import removePolygonPointsImpl from './removePoints.js';
import removePolygonImpl from './removePolygon.js';
import {
  initializeAddNewPointsImpl, addFirstPointImpl, resetAddPointPropertiesImpl,
  completePolygonImpl, drawLineImpl, clearAllAddPointsDataImpl,
  moveAddablePointImpl, addPointsMouseOverImpl, addPointImpl,
  resetAddPointsImpl, isAddingPointsToPolygonImpl, addPointsMouseOutImpl,
} from './addPoint.js';
import { displayPolygonPointsAfterMoveImpl, resetPolygonSelectableAreaImpl, movePolygonPointImpl } from './movePoint.js';
import { removePolygonPointImpl, getCleanPolygonPointsArrayImpl } from './removePoint.js';
import {
  displayPolygonPointsWithStyleImpl,
  changeDrawingPolygonPointsToRemovableImpl,
  changeObjectsToPolygonPointsToDefaultImpl,
  changeObjectsToPolygonPointsRemovaleImpl,
} from './changePointsStyle.js';
import {
  getEditingLabelId, getLastPolygonActionWasMoveState,
  getNewShapeSelectedViaLabelListState, setNewShapeSelectedViaLabelListState, setTestDrawLineState, getTestDrawLineState,
} from '../../../../tools/state.js';
import { highlightShapeFill, defaultShapeFill } from '../../allShapes/allShapes.js';

// this is the polygonInteractionsManager

let canvas = null;
let polygon = null;
let polygonPoints = [];
let editingPolygon = false;
let preventNewPolygonInitialisation = false;

function displayPolygonPoints() {
  setTestDrawLineState(false);
  if (!preventNewPolygonInitialisation) {
    if (polygon.previousShapeName === 'polygon') {
      polygonPoints = displayPolygonPointsWithStyleImpl(
          canvas, polygon, polygonProperties.existingPolygonPoint,
      );
    }
    // line Mode
    else {
      polygonPoints = displayPolygonPointsWithStyleImpl(
          canvas, polygon, polygonProperties.existingLinePoint,
      );
    }
  }
  else {
    preventNewPolygonInitialisation = false;
    sendPolygonPointsToFront();
  }
}

function displayStartingAddPolygonPoints() {
  if (polygon.previousShapeName === 'polygon') {
    polygonPoints = displayPolygonPointsWithStyleImpl(
        canvas, polygon, polygonProperties.startingAddPolygonPoint,
    );
  }
  else {
    polygonPoints = displayPolygonPointsWithStyleImpl(
        canvas, polygon, polygonProperties.startingAddLinePoint,
    );
  }
}

function displayRemovablePolygonPoints() {
  if (polygon.previousShapeName === 'polygon') {
    polygonPoints = displayPolygonPointsWithStyleImpl(
        canvas, polygon, polygonProperties.removablePolygonPoint,
    );
  }
  // line Mode
  else {
    polygonPoints = displayPolygonPointsWithStyleImpl(
        canvas, polygon, polygonProperties.removableLinePoint,
    );
  }
}

function setEditablePolygon(canvasObj, polygonObj, removablePoints, creatingPolygon, addingPoints) {
  setSelectedObjects(canvasObj, polygonObj);
  canvasObj.discardActiveObject();
  if (polygon) {
    polygon.bringToFront();
  }
  // edit this
  if (addingPoints) {
    displayStartingAddPolygonPoints();
  } else if (!removablePoints) {
    displayPolygonPoints();
  }

  // on created polygon
  else if (!creatingPolygon) {
    displayRemovablePolygonPoints();
  }
  // during drawing polygon or line
  else {
    changeDrawingPolygonPointsToRemovable();
  }
  setPolygonEditingStatus(true);
}

function setSelectedObjects(activeCanvasObj, activePolygonObject) {
  canvas = activeCanvasObj;
  polygon = activePolygonObject;
  if (polygon.previousShapeName === 'newLine'){
   polygon.set({
     lockMovementX: true,
     lockMovementY: true,
     selectable: false,
   });
  }
}

function setPolygonEditingStatus(status) {
  editingPolygon = status;
}

function initializeAddNewPoints(shape, pointer) {
  initializeAddNewPointsImpl(shape, pointer, canvas);
}

function addFirstPoint(event) {
  addFirstPointImpl(event);
}

function addPoint(pointer) {
  addPointImpl(pointer);
}

function drawLineOnMouseMove(pointer) {
  drawLineImpl(pointer);
}

function moveAddablePoint(event) {
  moveAddablePointImpl(event);
}

function addPointsMouseOver(event) {
  addPointsMouseOverImpl(event);
}

function resetAddPointProperties(canvasObj) {
  resetAddPointPropertiesImpl(canvasObj);
}

function clearAllAddPointsData() {
  clearAllAddPointsDataImpl();
}

function resetAddPoints() {
  resetAddPointsImpl();
}

function addPointsMouseOut(event) {
  addPointsMouseOutImpl(event);
}

function isAddingPointsToPolygon() {
  return isAddingPointsToPolygonImpl();
}

// the final point is the last point to add to polygon
function completePolygon(finalPoint) {
  completePolygonImpl(polygon, polygon.points, finalPoint);
  polygonPoints = [];
  resetPolygonSelectableArea();
  setPolygonEditingStatus(false);
}

// if to add points
function getPolygonIfEditing() {
  if (editingPolygon) {
    return polygon;
  }
  return null;
}

function getPolygonIdIfEditing() {
  if (editingPolygon) {
    return polygon.id;
  }
  return null;
}

function getPolygonEditingStatus() {
  return editingPolygon;
}

function sendPolygonPointsToFront(canvasArg) {
  canvas = canvas || canvasArg;
  sendPolygonPointsToFrontImpl(canvas, polygonPoints);
  setPolygonEditingStatus(true);
}

///////////
function changeDrawingPolygonPointsToRemovable() {
  polygonPoints = changeDrawingPolygonPointsToRemovableImpl(canvas, polygon);
}
// change existing objects for removable points
function changeExistingPolygonPointsToRemovable(canvasObj) {
  polygonPoints = changeObjectsToPolygonPointsRemovaleImpl(canvasObj);
}
function cleanPolygonPointsArray() {
  polygonPoints = getCleanPolygonPointsArrayImpl(polygon, polygonPoints);
}
function getPolygonPointsArray() {
  return polygonPoints;
}

// complicated function
// evoked by many functions
// if to call New Line function for the first time is evoked 2 times
// if to call Polygon function is evoked 1 time
// if to hit Remove Points evoked too
function removePolygonPoints() {
  if (getLastPolygonActionWasMoveState()) {
    if (getEditingLabelId() === null || getNewShapeSelectedViaLabelListState()) {
      polygonPoints = removePolygonPointsImpl(canvas, polygonPoints);

      // 2 times for NEw Line?
      //polygonPoints = removePolygonPointsImpl(canvas, polygonPoints);
    } else {
      preventNewPolygonInitialisation = true;
    }
  }

  else {
    polygonPoints = removePolygonPointsImpl(canvas, polygonPoints);
    }
  setNewShapeSelectedViaLabelListState(false);
  setPolygonEditingStatus(false);
}

// After adding or removing points, if to press "Build up New box".
// After pressing "Edit Shapes", if previous state was Add Points or Remove Points
function changePolygonPointsPropertiesToDefault(canvasObj) {
  // naming convention?
  canvas = !canvasObj ? canvas : canvasObj;
  changeObjectsToPolygonPointsToDefaultImpl(canvas);
}

// After hitting Edit Shape, after moving polygon
function displayPolygonPointsAfterMove() {
  polygon = displayPolygonPointsAfterMoveImpl(canvas, polygon, polygonPoints);
  setPolygonEditingStatus(true);
}

function setEditablePolygonAfterMoving(canvasObj, polygonObj) {
  setSelectedObjects(canvasObj, polygonObj);
  canvasObj.discardActiveObject();
  displayPolygonPointsAfterMove();
}

function resetPolygonSelectableArea() {
  resetPolygonSelectableAreaImpl(canvas, polygon);
}

function movePolygonPoint(event, labelObject) {
  movePolygonPointImpl(event, polygon, labelObject);
}

// removes shapes from Labels bar
function removePolygon(lableObjectFromLabelList) {
  if (editingPolygon) {
    removePolygonImpl(canvas, polygon);
    return polygon.id;
  }
  if (lableObjectFromLabelList && lableObjectFromLabelList.shapeName === 'polygon') {
    removePolygonImpl(canvas, lableObjectFromLabelList);
    return lableObjectFromLabelList.id;
  }
  return null;
}

function removePolygonPoint(pointId, existingPolygon) {
  removePolygonPointImpl(canvas, polygon, polygonPoints, pointId, existingPolygon);
}

function highlightSelectedPolygonViaPoint() {
  highlightShapeFill(polygon.id);
}

function defaultFillSelectedPolygonViaPoint() {
  defaultShapeFill(polygon.id);
}

export {
  initializeAddNewPoints, addFirstPoint, addPoint,
  removePolygonPoints, displayPolygonPointsAfterMove,
  completePolygon, drawLineOnMouseMove, moveAddablePoint,
  resetAddPoints, isAddingPointsToPolygon, addPointsMouseOut,
  changeExistingPolygonPointsToRemovable, clearAllAddPointsData,
  changePolygonPointsPropertiesToDefault, getPolygonIdIfEditing,
  removePolygonPoint, getPolygonEditingStatus, getPolygonIfEditing,
  addPointsMouseOver, resetAddPointProperties, cleanPolygonPointsArray,
  setEditablePolygon, resetPolygonSelectableArea, getPolygonPointsArray,
  movePolygonPoint, sendPolygonPointsToFront, highlightSelectedPolygonViaPoint,
  setEditablePolygonAfterMoving, removePolygon, defaultFillSelectedPolygonViaPoint,
};