import initiateCreateNewBndBoxEvents from './facadeWorkers/createNewBndBoxWorker.js';
import initiateCreateNewPolygonEvents from './facadeWorkers/createNewPolygonWorker.js';
import initiateAddPolygonPointsEvents from './facadeWorkers/addPolygonPointsWorker.js';
import initiateResetCanvasEventsToDefaultEvent from './facadeWorkers/resetCanvasEventsToDefaultWorker.js';
import initiateRemovePolygonPointsEvents from './facadeWorkers/removePolygonPointsWorker.js';
import toggleExportDatasetsPopup from './facadeWorkers/toggleExportDatasetsPopUpWorker.js';
import displayMachineLearningModal from './facadeWorkers/displayMLModalWorker.js';
import { zoomCanvas } from './facadeWorkers/zoomWorker.js';
import toggleSettingsPopup from './facadeWorkers/toggleSettingsPopUpWorker.js';
import initiateEditShapesEvent from './facadeWorkers/editShapesWorker.js';
import displayUploadDatasetsModal from './facadeWorkers/displayUploadDatasetsModalWorker.js';
import { setTestDrawLineState } from '../../state.js';
import { setCreateNewLineButtonToActive, getCreateLineState, setCreateNewLineToDefault, } from '../styling/state.js';
let canvas = null;

// Image upload
function resetCanvasEventsToDefault() {
  initiateResetCanvasEventsToDefaultEvent(canvas);
  //setCreateNewLineToDefault();
}

// New Line
function testDrawLine() {
  setTestDrawLineState(true);
  initiateCreateNewPolygonEvents(canvas);
  return 'line';
}

////// Polygon
function createNewPolygonBtnClick() {
  initiateCreateNewPolygonEvents(canvas);
}

function createNewBndBoxBtnClick() {
  initiateCreateNewBndBoxEvents(canvas);
}

function addPointsBtnClick() {
  initiateAddPolygonPointsEvents(canvas);
}

// unimportant
function removePolygonPointBtnClick() {
  initiateRemovePolygonPointsEvents(canvas);
}

function assignCanvasMouseEvents(canvasObj) {
  canvas = canvasObj;
}

function zoomBtnClick(activity) {
  zoomCanvas(canvas, activity);
}

function settingsBtnClick() {
  toggleSettingsPopup();
}

function editShapesBtnClick() {
  initiateEditShapesEvent(canvas);
}

function exportDatasetsBtnClick() {
  toggleExportDatasetsPopup(canvas);
}

function uploadDatasetsBtnClick() {
  displayUploadDatasetsModal();
}

function machineLearningBtnClick() {
  displayMachineLearningModal(canvas);
}

export {
  assignCanvasMouseEvents,
  createNewBndBoxBtnClick,
  createNewPolygonBtnClick,
  resetCanvasEventsToDefault,
  removePolygonPointBtnClick,
  exportDatasetsBtnClick,
  uploadDatasetsBtnClick,
  machineLearningBtnClick,
  addPointsBtnClick,
  zoomBtnClick,
  settingsBtnClick,
  editShapesBtnClick,
  testDrawLine,
};