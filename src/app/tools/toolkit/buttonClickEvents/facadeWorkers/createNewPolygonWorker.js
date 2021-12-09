import purgeCanvasMouseEvents from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/purgeAllMouseHandlers.js';
import assignDrawPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawPolygonEventHandlers.js';
import {
  setDefaultState, setAlteringPolygonPointsState,
  setLastDrawingModeState, setHasDrawnShapeState,

  getTestDrawLineState, setTestDrawLineState,

} from '../../../state.js';

import removePoints from '../../../../canvas/objects/polygon/alterPolygon/removePoints.js';

import { setEditShapesButtonToDefault, setCreatePolygonButtonToActive, setCreateNewLineToDefault, } from '../../styling/state.js';

function initiateCreateNewPolygonEvents(canvas) {
  if (canvas.backgroundImage) {
    if (!getTestDrawLineState()) {
      setCreatePolygonButtonToActive();
      setCreateNewLineToDefault();
    }
    purgeCanvasMouseEvents(canvas);
    assignDrawPolygonEvents(canvas);

    setEditShapesButtonToDefault();
    setDefaultState(false);
    setAlteringPolygonPointsState(false);

    if (!getTestDrawLineState()) {
      setLastDrawingModeState('polygon');
    }

    else {
      setLastDrawingModeState('newLine');
    }
    setHasDrawnShapeState(false);
  }
}

export { initiateCreateNewPolygonEvents as default };