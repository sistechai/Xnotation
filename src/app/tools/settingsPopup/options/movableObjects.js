import { 
  setTestDrawLineState, 
  getDefaultState, 
  getMovableObjectsState, 
  setMovableObjectsState 
} from '../../state.js';

import { getAllExistingShapes } from '../../../canvas/objects/allShapes/allShapes.js';

function changeExistingImagesMovability(shapes) {
  setTestDrawLineState(false);
  // to set up shapes movable
  if (getMovableObjectsState()) {
    Object.keys(shapes).forEach((key) => {
      const object = shapes[key].shapeRef;
      // line immovable, uneditable
      if (object.previousShapeName === 'newLine') {
        object.lockMovementX = true;
        object.lockMovementY = true;
        if (getDefaultState()) {
          // hoverCursor appears over a given object as a mouse moves on it
          object.hoverCursor = 'default';
        }
      }
      if (object.previousShapeName === 'polygon' || object.shapeName === 'bndBox') {
        object.lockMovementX = false;
        object.lockMovementY = false;
        if (getDefaultState()) object.hoverCursor = 'move';
      }
    });
  }
  // to set up immovable
  else {
    Object.keys(shapes).forEach((key) => {
      const object = shapes[key].shapeRef;
      if (object.shapeName === 'polygon' || object.shapeName === 'bndBox') {
        object.lockMovementX = true;
        object.lockMovementY = true;
        if (getDefaultState()) object.hoverCursor = 'default';
      }
    });
  }
}

function changeMovaleObjectsSetting() {
  if (getMovableObjectsState()) {
    setMovableObjectsState(false);
  } else {
    setMovableObjectsState(true);
  }
  const currentCanvasShapes = getAllExistingShapes();
  changeExistingImagesMovability(currentCanvasShapes);
}

export { changeMovaleObjectsSetting, changeExistingImagesMovability };
