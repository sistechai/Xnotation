import { resetObjectCursors as resetObjectCursorsForDefaultDraw } from '../../canvas/mouseInteractions/cursorModes/drawMode.js';
import { setAllObjectsToUneditable as resetObjectCursorsForCrosshairDraw } from '../../canvas/mouseInteractions/cursorModes/drawWithCrosshairMode.js';
import { getLabellerModalInputText, hideLabellerModal, resetLabellerModalOptions } from './style.js';
import { generateLabelShapeGroup } from '../../canvas/objects/allShapes/labelAndShapeBuilder.js';
import waitingForLabelCursorMode from '../../canvas/mouseInteractions/cursorModes/waitingForLabelSubmissionMode.js';
import { getCrosshairUsedOnCanvasState } from '../state.js';

let labellingState = false;
let targetShape = null;
let canvas = null;

// if to press 'enter', for choosing the class of shape
function prepareLabelShape(shape, canvasObj) {
  waitingForLabelCursorMode(canvasObj);
  targetShape = shape;
  canvas = canvasObj;
  labellingState = true;
}

// if to press 'cancel' on 'label choosing  bar'
// the line and points should be removed
// TODO: to remove also active Lines of new Line, and yellow points
function removeTargetShape() {
  canvas.remove(targetShape);
  labellingState = false;
  console.log("?? ^^ TODO: to remove also active Lines of new Line, and yellow points ^^^  targetShape", targetShape);
}

function setCursorMode() {
  if (getCrosshairUsedOnCanvasState()) {
    resetObjectCursorsForCrosshairDraw(canvas);
  } else {
    resetObjectCursorsForDefaultDraw(canvas);
  }
}

function createLabelShape() {
  hideLabellerModal();
  generateLabelShapeGroup(targetShape, getLabellerModalInputText());
  setCursorMode();
  resetLabellerModalOptions();
  labellingState = false;
}

function isLabelling() {
  return labellingState;
}

export {
  prepareLabelShape, createLabelShape, removeTargetShape, isLabelling,
};
