import purgeCanvasMouseEvents from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/purgeAllMouseHandlers.js';
import assignDrawPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawPolygonEventHandlers.js';
import {
  setDefaultState, setAlteringPolygonPointsState,
  setLastDrawingModeState, setHasDrawnShapeState,
  getTestDrawLineState, setTestDrawLineState,
} from '../../../state.js';
import { setEditShapesButtonToDefault, setCreatePolygonButtonToActive, setCreateNewLineToDefault, setCreateNewLineButtonToActive,} from '../../styling/state.js';

function initiateCreateNewPolygonEvents(canvas) {
  canvas.discardActiveObject();
  if (canvas.backgroundImage) {
    purgeCanvasMouseEvents(canvas);
    assignDrawPolygonEvents(canvas);

    setEditShapesButtonToDefault();
    setDefaultState(false);
    setAlteringPolygonPointsState(false);

    if (!getTestDrawLineState()) {
      setLastDrawingModeState('polygon');
      setTestDrawLineState(false);
      setCreatePolygonButtonToActive();
    }

    else {
      setLastDrawingModeState('line');
      setTestDrawLineState(true);
      setCreateNewLineButtonToActive();
    }

    setHasDrawnShapeState(false);
  }
}

export { initiateCreateNewPolygonEvents as default };