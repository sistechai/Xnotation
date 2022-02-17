import {
  changePolygonPointsPropertiesToDefault, removePolygonPoints,
  cleanPolygonPointsArray, clearAllAddPointsData,
} from '../../../objects/polygon/alterPolygon/alterPolygon.js';
import { resetNewPolygonData } from '../../../objects/polygon/polygon.js';
import { clearBoundingBoxData, deselectBoundingBox } from '../../../objects/boundingBox/boundingBox.js';
import { cancelLabellingProcess } from '../../../../tools/labellerModal/buttonEventHandlers.js';
import { removeEditedPolygonId } from '../eventWorkers/defaultEventsWorker.js';
import {
  getAddingPolygonPointsState, getRemovingPolygonPointsState, getAlteringPolygonPointsState,
  setAlteringPolygonPointsState, setReadyToDrawShapeState, setCancelledReadyToDrawState,
  getReadyToDrawShapeState,
} from '../../../../tools/state.js';
import { removeHighlightOfListLabel } from '../../../../tools/labelList/labelListHighlightUtils.js';
import { setPolygonEditingButtonsToDefault, setRemoveLabelsButtonToDisabled } from '../../../../tools/toolkit/styling/state.js';

// Before uploading image
// Before switching to another image
// Before: New Line, Polygon, Box and Add Point
function interruptCanvasEventsWithoutRemovingExistingPoints() {
  removeHighlightOfListLabel();
  resetNewPolygonData();
  clearBoundingBoxData();
  cancelLabellingProcess();
  removeEditedPolygonId();
  if (getReadyToDrawShapeState()) {
    setCancelledReadyToDrawState(true);
  } else {
    setCancelledReadyToDrawState(false);
  }
  setReadyToDrawShapeState(false);
  if (getAlteringPolygonPointsState()) {
    if (getRemovingPolygonPointsState()) {
      cleanPolygonPointsArray();
    }
    if (getAddingPolygonPointsState()) {
      clearAllAddPointsData();
    }
    changePolygonPointsPropertiesToDefault();
    setPolygonEditingButtonsToDefault();
    setAlteringPolygonPointsState(false);
  }

  setRemoveLabelsButtonToDisabled();
  setPolygonEditingButtonsToDefault();
}

function interruptAllCanvasEvents() {
  removePolygonPoints();
  deselectBoundingBox();
  interruptCanvasEventsWithoutRemovingExistingPoints();
}

// after hitting add points button
function interruptCanvasToStartAddPoints() {
  if (!getAddingPolygonPointsState()) {
    interruptCanvasEventsWithoutRemovingExistingPoints();
  }
}

export { interruptCanvasToStartAddPoints, interruptAllCanvasEvents };
