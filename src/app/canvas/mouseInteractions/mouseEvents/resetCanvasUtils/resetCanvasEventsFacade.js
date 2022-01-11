import setDrawingMode from './setDrawingMode.js';
import { removeEditedPolygonId } from '../eventWorkers/defaultEventsWorker.js';
import { getLastDrawingModeState } from '../../../../tools/state.js';

let resetCanvasEventsFunc = null;
let canvas = null;

// at the very beginning, and if to change the images between each other
function setResetCanvasEventsToDefaultFunc(func, canvasObj) {
  resetCanvasEventsFunc = func;
  canvas = canvasObj;
}

function resetCanvasEventsToDefault() {
  removeEditedPolygonId();
  resetCanvasEventsFunc(canvas);
}

function setContinuousDrawingModeToLast() {
  setDrawingMode(getLastDrawingModeState(), canvas);
}

export {
  setResetCanvasEventsToDefaultFunc,
  resetCanvasEventsToDefault,
  setContinuousDrawingModeToLast,
};