import { incrementShapeType, decrementShapeType } from '../../../tools/globalStatistics/globalStatistics.js';
import { getTestDrawLineState, getCurrentImageId } from '../../../tools/state.js';
let shapes = {};
let canvas = null;

let polygons = [];
let lines = [];
let rectangles = [];

let annotation = {
  polygons: null,
  lines: null,
  rectangles: null
};
let imagesInformationArray = [];
let imageId = null;
//let file_name;

function createNewShapeObject(shapeObj, shapeColor) {
  const newShapeObject = { shapeRef: shapeObj, color: shapeColor, visibility: true };
  newShapeObject.shapeRef.set('fill', shapeColor.default);
  newShapeObject.shapeRef.set('stroke', shapeColor.stroke);
  //getStatementsForJSON();
  return newShapeObject;
}

function getStatementsForJSON(){//images) {
  let colorHex;
  let currentShapes = getAllExistingShapes();
  let key;

  polygons = [];
  lines = [];
  rectangles = [];
  for (key in currentShapes) {
    if (currentShapes[key].shapeRef.previousShapeName === 'polygon') {
      colorHex = HSLToHex(currentShapes[key].color.stroke);
      polygons.push({
        "points": currentShapes[key].shapeRef.points,
        "color": colorHex,
      });
    }
    if (currentShapes[key].shapeRef.previousShapeName === 'newLine') {
      colorHex = HSLToHex(currentShapes[key].color.stroke);
      lines.push({
        "points": currentShapes[key].shapeRef.points,
        "color": colorHex,
      });
    }
    if (currentShapes[key].shapeRef.shapeName === 'bndBox'){
      colorHex = HSLToHex(currentShapes[key].color.stroke);
      rectangles.push({
        "points": currentShapes[key].shapeRef.aCoords,
        "color": colorHex,
      });
    }
  }

  imageId = getCurrentImageId();

  //annotation.polygons = polygons;
  //annotation.lines = lines;
  //annotation.rectangles = rectangles;

  //imagesInformationArray[imageId] = {
    //"annotation": annotation,
   // 'file_name': images[imageId].name;,
  //};

  console.log("imagesInformationArray", imagesInformationArray);
  console.log("imagesInformationArray rectangles", rectangles);
  console.log("imagesInformationArray lines", lines);
  console.log("imagesInformationArray polygons", polygons);
}

function HSLToHex(hslColor) {
  // hslColor = hsl(154, 98%, 54%);
  // regular expression to get numbers;
  // numbers is array in format: ['154', '98', '54' ];
  const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
  const numbers = hslColor.match(NUMERIC_REGEXP);

  let h,s,l;

  h = numbers[0];
  s = numbers[1];
  l = numbers[2];

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function getAllExistingShapes() {
  return shapes;
}

// refactor the side effect of removing shape refs
function retrieveAllShapeRefs() {
  const shapeRefs = {};
  Object.keys(shapes).forEach((key) => {
    shapeRefs[key] = shapes[key];
    canvas.remove(shapes[key].shapeRef);
  });
  shapes = {};
  return shapeRefs;
}

// creates shape and changes its color
function addShape(shapeObj, shapeColor, id) {
  shapes[id] = createNewShapeObject(shapeObj, shapeColor);
  incrementShapeType(shapeObj);
}

function addShapeForInvisibleImage(shapeObj, shapeColor) {
  const newShapeObject = createNewShapeObject(shapeObj, shapeColor);
  incrementShapeType(shapeObj);
  return newShapeObject;
}

function addExistingShape(shapeObj, id) {
  shapes[id] = shapeObj;
}

function getShapeById(id) {
  return shapes[id].shapeRef;
}

function getNumberOfShapes() {
  return Object.keys(shapes).length;
}

function removeAllShapeRefs() {
  shapes = {};
}

function getShapeColorById(id) {
  return shapes[id].color;
}

function changeShapeVisibilityById(id) {
  shapes[id].shapeRef.visible = !shapes[id].shapeRef.visible;
  shapes[id].visibility = !shapes[id].visibility;
  return shapes[id].visibility;
}

function getShapeVisibilityById(id) {
  return shapes[id].shapeRef.visible;
}

function changeShapeColorById(id, color) {
  shapes[id].color = color;
  shapes[id].shapeRef.set('fill', color.default);
  shapes[id].shapeRef.set('stroke', color.stroke);
  canvas.renderAll();
}

function highlightShapeFill(id) {
    const highlightColor = shapes[id].color.highlight;
    shapes[id].shapeRef.set('fill', highlightColor);
    canvas.renderAll();
}

function defaultShapeFill(id) {
  if (!getTestDrawLineState()) {
    const defaultColor = shapes[id].color.default;
    shapes[id].shapeRef.set('fill', defaultColor);
  }
  canvas.renderAll();
}

function removeFillForAllShapes() {
  Object.keys(shapes).forEach((key) => {
    const defaultColor = shapes[key].color.default;
    shapes[key].shapeRef.set('fill', defaultColor);
  });
  canvas.renderAll();
}

function changeShapeLabelText(id, newText) {
  shapes[id].shapeRef.set('shapeLabelText', newText);
}

function removeShape(id) {
  decrementShapeType(shapes[id].shapeRef);
  // removes from the canvas the polygon
  canvas.remove(shapes[id].shapeRef);
  delete shapes[id];
}

function assignCanvasForShapeFillManipulation(canvasObj) {
  canvas = canvasObj;
}

export {
  changeShapeVisibilityById, getNumberOfShapes, getAllExistingShapes,
  removeShape, highlightShapeFill, defaultShapeFill, retrieveAllShapeRefs,
  removeFillForAllShapes, getShapeVisibilityById, addShapeForInvisibleImage,
  getShapeById, getShapeColorById, changeShapeColorById, changeShapeLabelText,
  addShape, addExistingShape, removeAllShapeRefs, assignCanvasForShapeFillManipulation,
  getStatementsForJSON
};