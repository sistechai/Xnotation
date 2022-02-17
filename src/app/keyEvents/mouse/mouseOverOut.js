let isMouseOnCanvasStatus = false;
let mouseOverCallback = null;
let mouseOutCallback = null;

function getIsMouseOnCanvasStatus() {
  return isMouseOnCanvasStatus;
}

function removeExecutedFunctionOnMouseOver() {
  mouseOverCallback = null;
}

function removeExecutedFunctionOnMouseOut() {
  mouseOutCallback = null;
}

// addressing all mouse moves on the canvas
// executed once, after entering on canvas
function mouseOverCanvas() {
  isMouseOnCanvasStatus = true;
  if (mouseOverCallback) {
    mouseOverCallback();
    removeExecutedFunctionOnMouseOver();
  }
}

function mouseOutCanvas() {
  isMouseOnCanvasStatus = false;
  if (mouseOutCallback) mouseOutCallback();
}

function executeFunctionOnceOnMouseOver(func) {
  mouseOverCallback = func;
}

function executeFunctionOnMouseOut(func) {
  mouseOutCallback = func;
}

function registerMouseOverOutEvents() {
  window.mouseOverCanvas = mouseOverCanvas;
  window.mouseOutCanvas = mouseOutCanvas;
}

export {
  executeFunctionOnceOnMouseOver, registerMouseOverOutEvents,
  removeExecutedFunctionOnMouseOver, getIsMouseOnCanvasStatus,
  executeFunctionOnMouseOut, removeExecutedFunctionOnMouseOut,
};