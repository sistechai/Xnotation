const numberOfShapeTypes = { polygons: 0, boundingBoxes: 0 };

function incrementShapeType(shapeObj) {
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^6 increment shapeObj", shapeObj);
  if (shapeObj.shapeName === 'polygon') {
    numberOfShapeTypes.polygons += 1;
  } else if (shapeObj.shapeName === 'bndBox') {
    numberOfShapeTypes.boundingBoxes += 1;
  }
  console.log("^^^^^^^^^^^^^^^ INCREMENT numberOfShapeTypes", numberOfShapeTypes);
}

function decrementShapeType(shapeObj) {
  console.log("^^^^^^^^^^^^^^^^^^^^^^ decrement shapeObj", shapeObj);
  if (shapeObj.shapeName === 'polygon') {
    numberOfShapeTypes.polygons -= 1;
  } else if (shapeObj.shapeName === 'bndBox') {
    numberOfShapeTypes.boundingBoxes -= 1;
  }
  console.log("^^^^^^^^^^^^^^^ DECREMENT numberOfShapeTypes", numberOfShapeTypes);
}

function getNumberOfShapeTypes() {
  console.log("^^^^^^^^^^^^^^^ get numberOfShapeTypes", numberOfShapeTypes);
  return numberOfShapeTypes;
}

export { incrementShapeType, decrementShapeType, getNumberOfShapeTypes };
