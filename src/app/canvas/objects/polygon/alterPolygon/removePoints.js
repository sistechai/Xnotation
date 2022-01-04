function removePolygonPointsImpl(canvas, polygonPoints) {

  console.log("########## just remove points from scene");

  if ( (polygonPoints.length !== 0) ) {
    polygonPoints.forEach((point) => {
      canvas.remove(point);
    });
    canvas.renderAll();
    return [];
  }
  return polygonPoints;
}

export { removePolygonPointsImpl as default };