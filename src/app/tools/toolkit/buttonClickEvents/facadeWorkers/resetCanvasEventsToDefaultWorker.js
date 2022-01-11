import purgeCanvasMouseEvents from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/purgeAllMouseHandlers.js';
import { setDefaultCursorModeAfterAlteringPolygonPoints, setDefaultCursorMode } from '../../../../canvas/mouseInteractions/cursorModes/defaultMode.js';
import assignDefaultEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/defaultEventHandlers.js';
import {
  setPolygonEditingButtonsToDefault, setEditShapesButtonToActive,
  setCreateBoundingBoxButtonToDefault, setCreatePolygonButtonToDefault,
} from '../../styling/state.js';
import {
  getCrosshairUsedOnCanvasState, setAlteringPolygonPointsState,
  getDefaultState, getAddingPolygonPointsState, getLastDrawingModeState,
  setDefaultState, getAlteringPolygonPointsState, getContinuousDrawingState, setLastDrawingModeState,
} from '../../../state.js';
import assignDrawBoundingBoxEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawBndBoxEventHandlers.js';
import assignDrawPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawPolygonEventHandlers.js';
import { getCurrentImage } from '../../../imageList/uploadImages/drawImageOnCanvas.js';
import { moveCrosshair } from '../../../../canvas/mouseInteractions/cursorModes/drawWithCrosshairMode.js';
import { executeFunctionOnceOnMouseOver } from '../../../../keyEvents/mouse/mouseOverOut.js';

import { setCreateNewLineButtonToActive, setCreateNewLineToDefault, } from '../../styling/state.js';
import { testDrawLine } from '../facade.js';
import { clearLineData } from '../../../../canvas/objects/polygon/polygon.js';

// New states after loading new image
function setNewState(canvas) {
  if (getContinuousDrawingState()) {
    purgeCanvasMouseEvents(canvas);

    if (getLastDrawingModeState() === 'polygon') {
      assignDrawPolygonEvents(canvas);
    }

    else if (getLastDrawingModeState() === 'boundingBox') {
      assignDrawBoundingBoxEvents(canvas);
      if (getCrosshairUsedOnCanvasState()) {
        executeFunctionOnceOnMouseOver(moveCrosshair);
      }
    }

    else if (getLastDrawingModeState() === 'line'){
      //setLastDrawingModeState("?");
      console.log("at average probability that is here");
      setCreateNewLineButtonToActive();
      assignDrawPolygonEvents(canvas);
      testDrawLine();
    }

    setDefaultState(false);
  }

  else {

    assignDefaultEvents(canvas, null, getAddingPolygonPointsState());
    purgeCanvasMouseEvents(true);
    if (getCurrentImage()) {
      setEditShapesButtonToActive();
      setCreatePolygonButtonToDefault();
      setCreateBoundingBoxButtonToDefault();

      setCreateNewLineToDefault();

    }
  }
}

// if to switch to the images, or load the image
function initiateResetCanvasEventsToDefaultEvent(canvas) {

  // ?? anyway deletes Line from previous image.
  // ?? Polygon and box remain.
  //canvas.discardActiveObject();

  if (!getDefaultState()) {
    purgeCanvasMouseEvents(canvas);
    if (getAddingPolygonPointsState()) {
      setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
    } else {
      setDefaultCursorMode(canvas);
    }
    if (getAlteringPolygonPointsState()) {
      setPolygonEditingButtonsToDefault();
      setAlteringPolygonPointsState(false);
    }

    // To delete New line points
    clearLineData();

    setNewState(canvas);
  }
}

export { initiateResetCanvasEventsToDefaultEvent as default };