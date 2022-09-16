import { incrementShapeType, decrementShapeType } from '../../../tools/globalStatistics/globalStatistics.js';
import { getCurrentImageId } from '../../../tools/state.js';
import {getImageProperties} from '../../../tools/imageList/uploadImages/drawImageOnCanvas.js';

let shapes = {};
let canvas = null;
let polygons = [];
let lines = [];
let rectangles = [];

// Array of objects comprises:
// 'file_name' and 'annotation'.
let imagesInformationArray = [];
let imageId = null;

// executed if to cover the name of shape on Labels Menu
function getShapeById(id) {
  highlightShapeFill(id);
  return shapes[id].shapeRef;
}

function getShapeVisibilityById(id) {
  return shapes[id].shapeRef.visible;
}

function highlightShapeFill(id) {
 if (shapes[id]) {
   const highlightColor = shapes[id].color.highlight;
   if (shapes[id].shapeRef.previousShapeName === 'newLine'){
     shapes[id].shapeRef.set('fill', '');
   }
   else {
     shapes[id].shapeRef.set('fill', highlightColor);
     canvas.renderAll();
   }
 }
}

function defaultShapeFill(id) {
  const defaultColor = shapes[id].color.default;
  if (shapes[id].shapeRef.previousShapeName === 'newLine') {
    shapes[id].shapeRef.set('fill', defaultColor);
  }
  else {
    shapes[id].shapeRef.set('fill', defaultColor);
  }
  highlightShapeFill(id);
  canvas.renderAll();
}

function changeShapeLabelText(id, newText) {
  shapes[id].shapeRef.set('shapeLabelText', newText);
  highlightShapeFill(id);
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

function changeShapeColorById(id, color) {
  shapes[id].color = color;
  shapes[id].shapeRef.set('fill', color.default);
  shapes[id].shapeRef.set('stroke', color.stroke);
  canvas.renderAll();
}

// executed after switching to new image
// saves the index of shape
// updates shapeRefs after removing shape, removing points, adding points
// refactor the side effect of removing shape refs
function retrieveAllShapeRefs() {
  const shapeRefs = {};
  Object.keys(shapes).forEach((key) => {
    shapeRefs[key] = shapes[key];
    // removes the shape
    canvas.remove(shapes[key].shapeRef);
  });
  shapes = {};
  return shapeRefs;
}

// When this function is executed?
function getNumberOfShapes() {
  return Object.keys(shapes).length;
}

// It is executed, if Edit Shape process is Active
// Only while moving whole shape
function getShapeColorById(id) {
  return shapes[id].color;
}

// Creates shape and changes its color;
// Executed only at the first time after hitting "enter" +
// after choosing an option for labeml name.
function addShape(shapeObj, shapeColor, id) {
  shapes[id] = createNewShapeObject(shapeObj, shapeColor);
  incrementShapeType(shapeObj);

  highlightShapeFill(id);
}

// executed:
// 4 times after uploading;
// 2 times after tapping/hitting polygon or line button
// 2 times after adding first red point for polygon
// 2 times after finishing drawing polygon or line
// 4 times after hitting rectangle button
// 2 times after adding each new point for line
function getAllExistingShapes() {
  return shapes;
}

// Executed only for the first time after the shape has been created
function createNewShapeObject(shapeObj, shapeColor) {
  const newShapeObject = { shapeRef: shapeObj, color: shapeColor, visibility: true };
  newShapeObject.shapeRef.set('fill', shapeColor.default);
  newShapeObject.shapeRef.set('stroke', shapeColor.stroke);
  return newShapeObject;
}

// saves each image information after choosing option to upload new image or
// after choosing Upload JSON object option
function getStatementsForCurrentImageToJSON(images) {
  let colorHex;
  let colorRGB;
  let currentShapes = getAllExistingShapes();
  let key;
  let points = [];

  let points_scaled = [];
  const currentlySelectedImageProperties = getImageProperties();
  const imageDimensions = {};
  imageDimensions.scaleX = currentlySelectedImageProperties.scaleX;
  imageDimensions.scaleY = currentlySelectedImageProperties.scaleY;

  polygons = [];
  lines = [];
  rectangles = [];
  for (key in currentShapes) {

    if (currentShapes[key].shapeRef.previousShapeName === 'polygon') {
      colorRGB = hslToRgb(currentShapes[key].color.stroke);
      for (let i=0; i< currentShapes[key].shapeRef.points.length; i++) {
        points.push(currentShapes[key].shapeRef.points[i].x, currentShapes[key].shapeRef.points[i].y);
      }

      for (let i=0; i<Math.floor(points.length/2); i++){
         let j = i*2;
         points_scaled[j] = Math.trunc(points[j]/imageDimensions.scaleX);
         points_scaled[j+1] = Math.trunc(points[j+1]/imageDimensions.scaleY);
      }

      polygons.push({
        "color": colorRGB,
        'points': points_scaled
      });
      points = [];
      points_scaled = [];
    }

    if (currentShapes[key].shapeRef.previousShapeName === 'newLine') {
      colorRGB = hslToRgb(currentShapes[key].color.stroke);
      for (let i=0; i< currentShapes[key].shapeRef.points.length; i++) {
        if ( (currentShapes[key].shapeRef.points[i].x) && (currentShapes[key].shapeRef.points[i].y) ) {
          points.push(currentShapes[key].shapeRef.points[i].x, currentShapes[key].shapeRef.points[i].y);
        }
      }

      points_scaled = points.slice(0, Math.floor(points.length/2));

      for (let i=0; i<Math.floor(points_scaled.length/2); i++){
          let j = i*2;
          points_scaled[j] = Math.trunc(points_scaled[j]/imageDimensions.scaleX);
          points_scaled[j+1] = Math.trunc(points_scaled[j+1]/imageDimensions.scaleY);
      }

      lines.push({
        'points': points_scaled,
        "color": colorRGB,
      });
      points = [];
      points_scaled = [];
    }

    if (currentShapes[key].shapeRef.shapeName === 'bndBox'){
      colorRGB = hslToRgb(currentShapes[key].color.stroke);

      points.push(currentShapes[key].shapeRef.aCoords.tl.x, currentShapes[key].shapeRef.aCoords.tl.y);
      points.push(currentShapes[key].shapeRef.aCoords.br.x, currentShapes[key].shapeRef.aCoords.br.y);

      for (let i=0; i<Math.floor(points.length/2); i++){
           let j = i*2;
           points_scaled[j] = Math.trunc(points[j]/imageDimensions.scaleX);
           points_scaled[j+1] = Math.trunc(points[j+1]/imageDimensions.scaleY);
      }

      rectangles.push({
        "color": colorRGB,
        'points': points_scaled
      });
      points = [];
      points_scaled = [];
    }
  }
  imageId = getCurrentImageId();
  let annotation = {
    polygons: null,
    lines: null,
    rectangles: null
  };

  annotation.polygons = polygons.slice(0);
  annotation.lines = lines.slice(0);
  annotation.rectangles = rectangles.slice(0);

  let copiedAnnotation = Object.assign({}, annotation);
  copiedAnnotation.polygons = annotation.polygons;
  copiedAnnotation.lines = annotation.lines;
  copiedAnnotation.rectangles = annotation.rectangles;

  imagesInformationArray[imageId] = {
    rectangles: copiedAnnotation.rectangles,
    polygons: copiedAnnotation.polygons,
    lines: copiedAnnotation.lines
  };

  let objectJSON = {};

  for (imageId = 0;imageId < imagesInformationArray.length; imageId++) {
    objectJSON[imageId] = {
      "annotation": imagesInformationArray[imageId],
      'file_name': images[imageId].name,
    }
  }
  return objectJSON;
}

function hslToRgb(hslColor){

    const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
    const numbers = hslColor.match(NUMERIC_REGEXP);
    let h,s,l;

    h = numbers[0];
    s = numbers[1];
    l = numbers[2];
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0)*10) / 10, Math.round(10 * f(8)) / 10, Math.round(10 * f(4)) / 10];
}

// executed after switching back to previous image and then shapes appear
function addExistingShape(shapeObj, id) {
  shapes[id] = shapeObj;
}

// after switching images
function removeAllShapeRefs() {
  shapes = {};
}

// ??
function removeFillForAllShapes() {
  Object.keys(shapes).forEach((key) => {
    const defaultColor = shapes[key].color.default;
    shapes[key].shapeRef.set('fill', defaultColor);
  });
  canvas.renderAll();
}

// ???
function addShapeForInvisibleImage(shapeObj, shapeColor) {
  const newShapeObject = createNewShapeObject(shapeObj, shapeColor);
  incrementShapeType(shapeObj);
  return newShapeObject;
}

function changeShapeVisibilityById(id) {
  shapes[id].shapeRef.visible = !shapes[id].shapeRef.visible;
  shapes[id].visibility = !shapes[id].visibility;
  return shapes[id].visibility;
}

export {
  changeShapeVisibilityById, getNumberOfShapes, getAllExistingShapes,
  removeShape, highlightShapeFill, defaultShapeFill, retrieveAllShapeRefs,
  removeFillForAllShapes, getShapeVisibilityById, addShapeForInvisibleImage,
  getShapeById, getShapeColorById, changeShapeColorById, changeShapeLabelText,
  addShape, addExistingShape, removeAllShapeRefs, assignCanvasForShapeFillManipulation,
  getStatementsForCurrentImageToJSON
};