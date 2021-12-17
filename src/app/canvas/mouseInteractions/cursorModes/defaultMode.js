import { changePolygonPointsPropertiesToDefault } from '../../objects/polygon/alterPolygon/alterPolygon.js';
import { setObjectPropertiesToDefaultWhenReadyToDraw } from '../../objects/objectsProperties/changeProperties.js';
import { getMovableObjectsState, getTestDrawLineState } from '../../../tools/state.js';
import { setCreateNewLineButtonToActive } from '../../../tools/toolkit/styling/state.js';

// Activates after switching from one image to another. First activates after uploading first image, then activates 2 times, after having 2 images as minumum
function setDefaultCanvasCursors(canvas) {
  canvas.defaultCursor = 'default';
  if (getMovableObjectsState()) {
    canvas.hoverCursor = 'move';
  } else {
    canvas.hoverCursor = 'default';
  }
  canvas.renderAll();
}

// important to remember that this will reset perPixelTargetFind to true
// only when the mode is being reset to default
function setDefaultCursorMode(canvas) {
  canvas.forEachObject((iteratedObj) => {
    if (iteratedObj.shapeName !== 'bndBox') {
      iteratedObj.perPixelTargetFind = true;
    }
    iteratedObj.selectable = true;
    if (getMovableObjectsState()) {
      iteratedObj.hoverCursor = 'move';
    } else {
      iteratedObj.hoverCursor = 'default';
    }
  });
  setDefaultCanvasCursors(canvas);
}

function setDefaultCursorModeAfterAlteringPolygonPoints(canvas) {
  console.log("?????????????????????????? setDefaultCursorModeAfterAlteringPolygonPoints---------------");
  changePolygonPointsPropertiesToDefault(canvas);
  setDefaultCanvasCursors(canvas);
}

function setDefaultCursorModeWhenReadyToDrawShapes(canvas) {
  console.log("??????????????????? setDefaultCursorModeWhenReadyToDrawShapes------------------");
  setObjectPropertiesToDefaultWhenReadyToDraw(canvas);
  setDefaultCanvasCursors(canvas);
}

export {
  setDefaultCursorMode,
  setDefaultCursorModeWhenReadyToDrawShapes,
  setDefaultCursorModeAfterAlteringPolygonPoints,
};
