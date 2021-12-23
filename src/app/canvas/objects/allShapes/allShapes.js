import { incrementShapeType, decrementShapeType } from '../../../tools/globalStatistics/globalStatistics.js';
import { getTestDrawLineState } from '../../../tools/state.js';
import { clearLineData } from '../polygon/polygon.js';

let shapes = {};
let canvas = null;

function createNewShapeObject(shapeObj, shapeColor) {
  const newShapeObject = { shapeRef: shapeObj, color: shapeColor, visibility: true };
  newShapeObject.shapeRef.set('fill', shapeColor.default);
  newShapeObject.shapeRef.set('stroke', shapeColor.stroke);
  return newShapeObject;
}

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

function getAllExistingShapes() {
  return shapes;
}

function removeAllShapeRefs() {
  console.log("???? removeAllShapeRefs shapes", shapes);
  shapes = {};
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

  if (!getTestDrawLineState()) {
    const highlightColor = shapes[id].color.highlight;
    shapes[id].shapeRef.set('fill', highlightColor);
  }
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
  if (shapes[id].shapeRef === 'newLine') {
    console.log("test polygon remove shape shapes[id].shapeRef", shapes[id].shapeRef);
    clearLineData();
  }

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
};
