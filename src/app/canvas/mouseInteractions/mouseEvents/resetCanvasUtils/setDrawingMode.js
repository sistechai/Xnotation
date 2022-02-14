import assignDrawPolygonEvents from '../eventHandlers/drawPolygonEventHandlers.js';
import assignDrawBoundingBoxEvents from '../eventHandlers/drawBndBoxEventHandlers.js';
import purgeCanvasMouseEvents from './purgeAllMouseHandlers.js';

function setDrawingMode(mode, canvas) {
  purgeCanvasMouseEvents(canvas);
  if (mode === 'polygon') {
    assignDrawPolygonEvents(canvas);
  } else if (mode === 'boundingBox') {
    assignDrawBoundingBoxEvents(canvas);
  }
  else if (mode === 'line') {
    console.log("mode line???============", mode);
  }
}

export { setDrawingMode as default };
