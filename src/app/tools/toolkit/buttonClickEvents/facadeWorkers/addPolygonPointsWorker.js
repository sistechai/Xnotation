import purgeCanvasMouseEvents from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/purgeAllMouseHandlers.js';
import {

  getTestDrawLineState, setTestDrawLineState,

  setAddingPolygonPointsState, getAddingPolygonPointsState, setDefaultState,
  getContinuousDrawingState, getLastDrawingModeState, getCancelledReadyToDrawState,
  getRemovingPointsAfterCancelDrawState,
} from '../../../state.js';
import assignAddPointsOnExistingPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/addPointsEventHandlers.js';
import setInitialStageOfAddPointsOnExistingPolygonMode from '../../../../canvas/mouseInteractions/cursorModes/initialiseAddPointsOnExistingPolygonMode.js';
import { setDefaultCursorModeAfterAlteringPolygonPoints } from '../../../../canvas/mouseInteractions/cursorModes/defaultMode.js';
import { getSelectedPolygonIdForAddPoints } from '../../../../canvas/mouseInteractions/mouseEvents/eventWorkers/addPointsEventsWorker.js';
import assignDefaultEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/defaultEventHandlers.js';
import { resetAddPoints, isAddingPointsToPolygon, removePolygonPoints } from '../../../../canvas/objects/polygon/alterPolygon/alterPolygon.js';
import assignDrawPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawPolygonEventHandlers.js';
import assignDrawBoundingBoxEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawBndBoxEventHandlers.js';
import {
  setAddPointsButtonToActive, setAddPointsButtonToDefault,
  setEditShapesButtonToActive, setEditShapesButtonToDefault,
  setCreateBoundingBoxButtonToActive, setCreatePolygonButtonToActive,

  setCreateNewLineToDisabled,
  setCreateNewLineToDefault,
  setCreateNewLineToGrey,
  setCreateNewLineButtonToActive,

} from '../../styling/state.js';

// Originally designed to be turned off after the points have been successfully added to a polygon

function discardAddPointsEvents(canvas) {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@ getlast");
  if (getContinuousDrawingState()
  && (getCancelledReadyToDrawState() || getRemovingPointsAfterCancelDrawState())) {
    removePolygonPoints();
    if (getLastDrawingModeState() === 'polygon') {
      assignDrawPolygonEvents(canvas);
      setCreatePolygonButtonToActive();
    }

    else if (getLastDrawingModeState() === 'newLine'){
      console.log("getlast");
      setCreateNewLineButtonToActive();
      testDrawLine();
    }

    else if (getLastDrawingModeState() === 'boundingBox') {
      assignDrawBoundingBoxEvents(canvas);
      setCreateBoundingBoxButtonToActive();
    }
  } else {
    setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
    const currentlySelectedPolygonId = getSelectedPolygonIdForAddPoints();
    assignDefaultEvents(canvas, currentlySelectedPolygonId);
    setEditShapesButtonToActive();
    setDefaultState(true);
  }
}

function initiateAddPolygonPointsEvents(canvas) {
  canvas.discardActiveObject();

  ///// New Line
  if (getTestDrawLineState()){
    setCreateNewLineButtonToActive(); // On Left menu
    purgeCanvasMouseEvents(canvas);
    assignAddPointsOnExistingPolygonEvents(canvas); // calls function pointMouseDownEvents from /canvas/mouseInteractions/mouseEvents/eventWorkers/addPointsEventsWorker.js

    setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
    setEditShapesButtonToDefault();
    setDefaultState(false);
    setAddingPolygonPointsState(true);
  }

  else if (!getAddingPolygonPointsState()) {
    purgeCanvasMouseEvents(canvas);
    assignAddPointsOnExistingPolygonEvents(canvas);

    console.log("!!! add to polygon", setAddPointsButtonToActive());
    setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
    setAddPointsButtonToActive();
    setEditShapesButtonToDefault();
    setDefaultState(false);
    setAddingPolygonPointsState(true);
  }
  else if (isAddingPointsToPolygon()) {
    purgeCanvasMouseEvents(canvas);
    assignAddPointsOnExistingPolygonEvents(canvas);
    resetAddPoints();
    setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
  } else {
    resetAddPoints();
    setAddPointsButtonToDefault();
    setAddingPolygonPointsState(false);
    purgeCanvasMouseEvents(canvas);
    discardAddPointsEvents(canvas);
  }
}

export { initiateAddPolygonPointsEvents as default };
