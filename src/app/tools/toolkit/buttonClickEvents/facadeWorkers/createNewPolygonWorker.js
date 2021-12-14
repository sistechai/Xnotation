import purgeCanvasMouseEvents from '../../../../canvas/mouseInteractions/mouseEvents/resetCanvasUtils/purgeAllMouseHandlers.js';
import assignDrawPolygonEvents from '../../../../canvas/mouseInteractions/mouseEvents/eventHandlers/drawPolygonEventHandlers.js';
import {
  setDefaultState, setAlteringPolygonPointsState,
  setLastDrawingModeState, setHasDrawnShapeState,

  // New Line
  getTestDrawLineState, setTestDrawLineState,

} from '../../../state.js';
import removePoints from '../../../../canvas/objects/polygon/alterPolygon/removePoints.js';
import { setEditShapesButtonToDefault, setCreatePolygonButtonToActive, setCreateNewLineToDefault, setCreateNewLineButtonToActive,} from '../../styling/state.js';
import {testDrawLine} from '../facade.js';

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
      setTestDrawLineState(true);
      setCreateNewLineButtonToActive();
    }

    setHasDrawnShapeState(false);
  }
}

export { initiateCreateNewPolygonEvents as default };