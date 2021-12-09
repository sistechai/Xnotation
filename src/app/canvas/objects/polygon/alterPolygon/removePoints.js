import { getTestDrawLineState } from '../../../../tools/state.js';

function removePolygonPointsImpl(canvas, polygonPoints) {

  console.log("iiiiif remove polygonPoints", polygonPoints);
  if ( (polygonPoints.length !== 0) || ( (getTestDrawLineState()) && (polygonPoints.length !== 0)) ) {
    console.log("iiiiif removeeeeeeeeeeeeeeeeeeeeee");
    polygonPoints.forEach((point) => {
      canvas.remove(point);
    });
    canvas.renderAll();
    return [];
  }
  return polygonPoints;
}

export { removePolygonPointsImpl as default };