const numberOfShapeTypes = { polygons: 0, boundingBoxes: 0, newLines: 0 };

function incrementShapeType(shapeObj) {
  if (shapeObj.shapeName === 'polygon') {
    numberOfShapeTypes.polygons += 1;
  } else if (shapeObj.shapeName === 'bndBox') {
    numberOfShapeTypes.boundingBoxes += 1;
  }
  else if (shapeObj.shapeName === 'newLine') {
    numberOfShapeTypes.newLines += 1;
  }
  console.log("^^^^^^^^^^^^^^^ INCREMENT numberOfShapeTypes", numberOfShapeTypes);
}

function decrementShapeType(shapeObj) {
  if (shapeObj.shapeName === 'polygon') {
    numberOfShapeTypes.polygons -= 1;
  } else if (shapeObj.shapeName === 'bndBox') {
    numberOfShapeTypes.boundingBoxes -= 1;
  }
  else if (shapeObj.shapeName === 'newLine') {
    numberOfShapeTypes.newLines -= 1;
  }
  console.log("^^^^^^^^^^^^^^^ DECREMENT numberOfShapeTypes", numberOfShapeTypes);
}

function getNumberOfShapeTypes() {
  return numberOfShapeTypes;
}

export { incrementShapeType, decrementShapeType, getNumberOfShapeTypes };