// import fabric from 'fabric.js';
import polygonProperties from '../properties.js';
import {
  prepareObjectsForEditablePolygonPoints, setObjectPropertiesToDefault,
} from '../../objectsProperties/changeProperties.js';
import { getDefaultState, getAddingPolygonPointsState } from '../../../../tools/state.js';
import { setCreateNewLineToDefault } from '../../../../tools/toolkit/styling/state.js';

function displayPolygonPointsWithStyleImpl(canvas, polygon, polygonPointsProps) {

  setCreateNewLineToDefault();

  let pointId = 0;
  const polygonPoints = [];
  //const totalPointNumber;
  if (polygon){
    const totalPointNumber = polygon.points.length;

    polygon.get('points').forEach((point) => {
      const pointObj = new fabric.Circle(polygonPointsProps(pointId, point, totalPointNumber));
      if (polygon.polygonMoved) {
        pointObj.left += 1;
        pointObj.top += 1;
      }
      canvas.add(pointObj);
      polygonPoints.push(pointObj);
      pointId += 1;
    });

    if (polygon.previousShapeName === 'newLine') {
      for (let i = 0; i < polygonPoints.length; i++) {
        polygonPoints[i].set({
          selectable: false,
          previousShapeName: 'newLine',
        })
      }
    }
  }

  return polygonPoints;
}

function changePolygonPointsToWaitForAddingFirstPointImpl(canvas, startingPoint) {
  canvas.forEachObject((iteratedObj) => {
    if (iteratedObj.shapeName === 'point') {
      iteratedObj.set(polygonProperties.disabledAddPoint());
    } else if (iteratedObj.shapeName === 'polygon' || iteratedObj.shapeName === 'bndBox') {
      iteratedObj.hoverCursor = 'crosshair';
    }
    iteratedObj.selectable = false;
  });
  startingPoint.set(polygonProperties.selectedStartingAddPoint());
  canvas.renderAll();
}

// handles invocation of removing points process during drawing new polygon
function changeDrawingPolygonPointsToRemovableImpl(canvas, polygon) {
  let pointId = 0;
  const polygonPoints = [];

  if (polygon.previousShapeName === 'polygon') {
    canvas.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName === 'tempPoint' || iteratedObj.shapeName === 'firstPoint') {
      iteratedObj.set(polygonProperties.removablePolygonPoint(pointId));
      polygonPoints.push(iteratedObj);
      pointId += 1;
      }
    });
    if (polygonPoints.length < 4) {
      polygonPoints.forEach((point) => {
        point.set(polygonProperties.disabledRemovePoint());
      });
    }
    polygon.sendBackwards();
    return polygonPoints;
  }

  // for the line
  else {
    return;
  }
}

function changePolygonPointsToAddImpl(canvas) {
  canvas.forEachObject((iteratedObj) => {
    if (iteratedObj.shapeName === 'point') {
      iteratedObj.set(polygonProperties.additionalPoint());
    }
  });
  canvas.renderAll();
}

// Evoked after editing polygon, before box
function changeObjectsToPolygonPointsToDefaultImpl(canvas) {
  if (canvas) {
    canvas.forEachObject((iteratedObj) => {
      setObjectPropertiesToDefault(iteratedObj);
      if (iteratedObj.shapeName === 'point') {
        iteratedObj.set(polygonProperties.defaultPoint());
      }
    });
  }
}

function changeObjectsToPolygonPointsRemovaleImpl(canvas) {
  const isDrawing = !(getDefaultState() || getAddingPolygonPointsState());
  const polygonPoints = [];
  let invocationOfLineArray = [];

  if (canvas) {

    canvas.forEachObject((iteratedObj) => {
      prepareObjectsForEditablePolygonPoints(iteratedObj, isDrawing);
      if (iteratedObj.shapeName === 'point') {
        iteratedObj.set(polygonProperties.removablePoint());
        polygonPoints[iteratedObj.pointId] = iteratedObj;
      }


      if (iteratedObj.previousShapeName === 'newLine') {
        console.log("iteratedObj-------------------", iteratedObj);
        invocationOfLineArray[iteratedObj.pointId] =iteratedObj;
      }

    });

  }

  if (invocationOfLineArray.length < 5) {
    invocationOfLineArray.forEach((point) => {
      point.set(polygonProperties.disabledRemovePoint());
    });
    canvas.renderAll();
    return invocationOfLineArray;
  }

  //if (polygon.previousShapeName === 'polygon') {
    if (polygonPoints.length < 4) {
      polygonPoints.forEach((point) => {
        point.set(polygonProperties.disabledRemovePoint());
      });
      canvas.renderAll();
      return polygonPoints;
    }
  //}
  // else {
  //   if (polygonPoints.length < 3) {
  //     polygonPoints.forEach((point) => {
  //       point.set(polygonProperties.disabledRemovePoint());
  //     });
  //   }
  // }

}

export {
  displayPolygonPointsWithStyleImpl,
  changePolygonPointsToWaitForAddingFirstPointImpl,
  changeDrawingPolygonPointsToRemovableImpl,
  changeObjectsToPolygonPointsToDefaultImpl,
  changeObjectsToPolygonPointsRemovaleImpl,
  changePolygonPointsToAddImpl,
};