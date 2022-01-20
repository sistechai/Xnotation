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

  console.log("0 iteratedObj startingPoint", startingPoint.pointId);

  let id=0;
  canvas.forEachObject((iteratedObj) => {

    id++;
    console.log("0 iteratedObj iteratedObj.points id ", id, iteratedObj);

    // for line only
    if ( (iteratedObj.previousShapeName === "newLine") && ( (startingPoint.pointId === 0) || (startingPoint.pointId === iteratedObj.points) ) ){

      console.log("!!!!!!!! iterated", iteratedObj.previousShapeName);
    }

    if (iteratedObj.shapeName === 'point') {
      console.log("2 if iteratedObj.shapeName.previousShapeName iffffffff", iteratedObj.previousShapeName);
      iteratedObj.set(polygonProperties.disabledAddPoint());
    } else if (iteratedObj.shapeName === 'polygon' || iteratedObj.shapeName === 'bndBox') {
      iteratedObj.hoverCursor = 'crosshair';
      console.log("1 else iteratedObj previousShapeName", iteratedObj.previousShapeName);
    }
    iteratedObj.selectable = false;
  });

  startingPoint.set(polygonProperties.selectedStartingAddPoint());
  canvas.renderAll();
}


function changeDrawingPolygonPointsToRemovableImpl(canvas, polygon) {
  let pointId = 0;
  const polygonPoints = [];
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

function changePolygonPointsToAddImpl(canvas) {

  console.log("---------- changePolygonPointsToAddImpl");

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
  if (canvas) {
    canvas.forEachObject((iteratedObj) => {
      prepareObjectsForEditablePolygonPoints(iteratedObj, isDrawing);
      if (iteratedObj.shapeName === 'point') {
        iteratedObj.set(polygonProperties.removablePoint());
        polygonPoints[iteratedObj.pointId] = iteratedObj;
      }
    });
  }
  if (polygonPoints.length < 4) {
    polygonPoints.forEach((point) => {
      point.set(polygonProperties.disabledRemovePoint());
    });
  }
  canvas.renderAll();
  return polygonPoints;
}

export {
  displayPolygonPointsWithStyleImpl,
  changePolygonPointsToWaitForAddingFirstPointImpl,
  changeDrawingPolygonPointsToRemovableImpl,
  changeObjectsToPolygonPointsToDefaultImpl,
  changeObjectsToPolygonPointsRemovaleImpl,
  changePolygonPointsToAddImpl,
};