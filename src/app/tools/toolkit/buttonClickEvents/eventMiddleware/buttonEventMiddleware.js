import { isLabelling } from '../../../labellerModal/labellingProcess.js';
import {
  interruptAllCanvasEvents, interruptCanvasToStartAddPoints,
} from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/resetCanvasState.js';
import { getRemovingPolygonPointsState, getPolygonDrawingInProgressState, setTestDrawLineState } from '../../../state.js';
import { removeActiveButtonPopover } from '../../../globalStyling/buttons/popovers.js';
import isLeftMouseButtonClick from '../../../utils/buttons/clickEvents.js';
import isElement from '../../../utils/elementType.js';
import { setCreateNewLineToDefault, setCreateNewLineToDisabled, setCreateNewLineButtonToActive} from '../../styling/state.js';

function interruptAllCanvasEventsBeforeFunc(func, event) {
  if (event && !isLeftMouseButtonClick(event)) {
    return;
  }
  removeActiveButtonPopover();
  interruptAllCanvasEvents();
  if (func) {
    func();
  }
}

function interruptAllCanvasEventsBeforeMultipleFunc(funcs, event) {
  console.log("Before multiple function 64646464444444444664646466444444");
  if (event && !isLeftMouseButtonClick(event)) return;
  removeActiveButtonPopover();
  interruptAllCanvasEvents();
  funcs.forEach((func) => { func(); });
}

function doNothingIfLabellingInProgress(func, element, event) {
  if (event && !isLeftMouseButtonClick(event)) return;
  if (isElement(element) && element.classList.contains('toolkit-button-disabled')) return;
  removeActiveButtonPopover();
  if (!isLabelling()) {
    if (func) func();
  }
}

function func1IfDrawRemovePointsElseInterruptAllWthFunc2(func1, func2, event) {

  if (event && !isLeftMouseButtonClick(event)) {
    console.log("11111111111111111 !isLeftMouseButtonClick 88888888888888888888888888888888");
    return;
  }
  removeActiveButtonPopover();
  if (getRemovingPolygonPointsState() && getPolygonDrawingInProgressState()) {
    console.log("111111111111111  ififififififi 88888888888888888888888888888888");
    if (func1) {
      func1();
    }
  } else if (func2) {

    if (func2() === 'testDrawLine'){
      setTestDrawLineState(true);
    }
    else {
      setTestDrawLineState(false);
    }

    interruptAllCanvasEvents();
    func2();
  }
}

function doNothingIfLabellingOrAddingNewPoints(func, element, event) {
  if (event && !isLeftMouseButtonClick(event)) {
    console.log("! is left Mouse do nothing interrupt canvas to start");
    return;
  }
  if (isElement(element) && element.classList.contains('toolkit-button-disabled')) {
    return;
  }
  removeActiveButtonPopover();
  if (!isLabelling() && !getPolygonDrawingInProgressState()) {
    interruptCanvasToStartAddPoints();
    if (func) func();
  }
}

function interruptAllCanvasEventsIfLabellingInProgress(func) {
  console.log("iiiiiiiii interupt!");
  removeActiveButtonPopover();
  if (isLabelling()) {
    interruptAllCanvasEvents();
  }
  if (func) func();
}

export {
  doNothingIfLabellingInProgress,
  interruptAllCanvasEventsBeforeFunc,
  doNothingIfLabellingOrAddingNewPoints,
  interruptAllCanvasEventsBeforeMultipleFunc,
  interruptAllCanvasEventsIfLabellingInProgress,
  func1IfDrawRemovePointsElseInterruptAllWthFunc2,
};