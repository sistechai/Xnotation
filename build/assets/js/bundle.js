(function () {
  'use strict';

  const INDEX_OF_BUTTON_STATE_CLASS = 1;

  function isElement$1(element) {
    return element instanceof Element || element instanceof HTMLDocument;
  }

  function setButtonToActive(button) {
    if (isElement$1(button) && button.classList[INDEX_OF_BUTTON_STATE_CLASS] === 'toolkit-button-active') return;
    button.classList.replace(button.classList[1], 'toolkit-button-active');
    button.childNodes[INDEX_OF_BUTTON_STATE_CLASS].style.filter = 'invert(54%) sepia(52%) saturate(682%) hue-rotate(163deg) brightness(95%) contrast(87%)';
    button.style.backgroundColor = '#f1f5fd';
  }

  function setButtonToDefault(button) {
    if (isElement$1(button) && button.classList[INDEX_OF_BUTTON_STATE_CLASS] === 'toolkit-button-default') return;
    button.classList.replace(button.classList[1], 'toolkit-button-default');
    button.childNodes[INDEX_OF_BUTTON_STATE_CLASS].style.filter = '';
    button.style.backgroundColor = '';
  }

  function setButtonToGreyDefault(button) {
    if (isElement$1(button) && button.classList[INDEX_OF_BUTTON_STATE_CLASS] === 'toolkit-button-default') return;
    if (button) {
      button.classList.replace(button.classList[1], 'toolkit-button-default');
      button.childNodes[INDEX_OF_BUTTON_STATE_CLASS].style.filter = 'invert(42%) sepia(0%) saturate(1409%) hue-rotate(134deg) brightness(100%) contrast(77%)';
      button.style.backgroundColor = '';
    }
  }

  function setButtonToDisabled(button) {
    if (isElement$1(button) && button.classList[INDEX_OF_BUTTON_STATE_CLASS] === 'toolkit-button-disabled') return;
    if (button) {
      button.classList.replace(button.classList[1], 'toolkit-button-disabled');
      button.childNodes[INDEX_OF_BUTTON_STATE_CLASS].style.filter = 'invert(77%) sepia(0%) saturate(716%) hue-rotate(155deg) brightness(92%) contrast(83%)';
      button.style.backgroundColor = '';
    }
  }

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
  }

  function getNumberOfShapeTypes() {
    return numberOfShapeTypes;
  }

  function isCurrentBrowserFireFox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  const IS_FIREFOX = isCurrentBrowserFireFox();

  function loadSuccess() {
    //refreshExportDatasetsPopover();
  }

  function loadFailed() {
    console.error('Failed to load custom fonts');
  }

  // fix for a bug where the loading of the script would stop all elements from being
  // dynamic and the browser would not render them when screen dimensions are changed
  function firefoxBugFix(document, url, relationship) {
    const div = document.createElement('div');
    div.innerHTML = `<link rel="${relationship}" href="${url}">`;
    document.head.appendChild(div);
  }

  function downloadFonts() {
    // potential alternative
    // <link href="https://fonts.googleapis.com/css?family=Alef|Archivo|Average|Barlow+Semi+Condensed|Basic|Cantarell|Chivo|Hind+Madurai|IBM+Plex+Serif|K2D|M+PLUS+1p|Mada|Palanquin|Pavanam|Source+Sans+Pro|Yantramanav&display=swap" rel="stylesheet">
    const url = 'https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap';
    const relationship = 'stylesheet';
    const link = document.createElement('link');
    link.onload = loadSuccess;
    link.onerror = loadFailed;
    link.rel = relationship;
    link.href = url;
    document.head.appendChild(link);
    if (IS_FIREFOX) firefoxBugFix(document, url, relationship);
  }

  let screenSizeDelta = 1;

  // when setting delta to bigger than 1.1, will need to consider zoom,
  // image thumbnail width, left side bar border,
  // labeller modal options width and modal buttons height

  // delta uses screen width only
  function calculateDesiredScreenSizeDelta() {
    const defaultScreenWidth = 1920;
    const currentScreenWidth = window.screen.width;
    const quotient = defaultScreenWidth / currentScreenWidth;
    return quotient > 1.1 ? 1.1 : quotient;
  }

  function getScreenSizeDelta() {
    return screenSizeDelta;
  }

  function setScreenSizeDelta() {
    screenSizeDelta = calculateDesiredScreenSizeDelta();
    document.documentElement.style.setProperty('--screen-size-delta', screenSizeDelta);
    return screenSizeDelta;
  }

  let keyDownEventTimeout = 0;

  function setKeyDownEventTimeOut(isFirefox) {
    keyDownEventTimeout = isFirefox ? 10 : 0;
  }

  function getKeyDownEventTimeout() {
    return keyDownEventTimeout;
  }

  function applyStylingToElementsArray(elementsArray, property, value) {
    for (let i = 0; i < elementsArray.length; i += 1) {
      elementsArray[i].style[property] = value;
    }
  }

  function applyLargeScreenButtonsStyle(buttonElements) {
    buttonElements.labellerModalSubmitButtonElement.style.paddingBottom = '4px';
    buttonElements.labellerModalCancelButtonElement.style.paddingBottom = '4px';
    applyStylingToElementsArray(buttonElements.buttonClassElements, 'lineHeight', 1.35);
    applyStylingToElementsArray(buttonElements.popupLabelButtonClassElements, 'paddingTop', '6px');
    applyStylingToElementsArray(buttonElements.popupLabelDisabledButtonClassElements, 'paddingTop', '6px');
    // if (IS_FIREFOX) {
    //   // buttonElements.exportDatasetsPopupExportButton.style.paddingTop = '5px';
    //   // buttonElements.exportDatasetsPopupExportButton.style.paddingBottom = '7px';
    // } else {
    //   // buttonElements.exportDatasetsPopupExportButton.style.paddingTop = '6px';
    // }
  }

  function applySmallScreenButtonsStyle(buttonElements, screenSizeDelta) {
    buttonElements.labellerModalSubmitButtonElement.style.paddingBottom = `${5 / screenSizeDelta}px`;
    buttonElements.labellerModalCancelButtonElement.style.paddingBottom = `${5 / screenSizeDelta}px`;
    applyStylingToElementsArray(buttonElements.buttonClassElements, 'lineHeight', 'initial');
    applyStylingToElementsArray(buttonElements.popupLabelButtonClassElements, 'paddingTop', `${7 / screenSizeDelta}px`);
    applyStylingToElementsArray(buttonElements.popupLabelDisabledButtonClassElements, 'paddingTop', `${7 / screenSizeDelta}px`);
    buttonElements.exportDatasetsPopupExportButton.style.paddingTop = `${6 / screenSizeDelta}px`;
    if (!IS_FIREFOX) buttonElements.welcomeModalStartButton.style.marginTop = `${3.5 / screenSizeDelta}px`;
  }

  function getButtonElements() {
    const buttons = {};
    buttons.welcomeModalStartButton = document.getElementById('welcome-modal-start-button');
    buttons.labellerModalSubmitButtonElement = document.getElementById('labeller-modal-submit-button');
    buttons.labellerModalCancelButtonElement = document.getElementById('labeller-modal-cancel-button');
    buttons.buttonClassElements = document.getElementsByClassName('buttons');
    buttons.popupLabelButtonClassElements = document.getElementsByClassName('popup-label-button');
    buttons.popupLabelDisabledButtonClassElements = document.getElementsByClassName('popup-label-button-disabled');
    // buttons.exportDatasetsPopupExportButton = document.getElementById('export-datasets-popup-export-button');
    return buttons;
  }

  function setButtonsStyle(screenSizeDelta) {
    const buttonElements = getButtonElements();
    if (screenSizeDelta > 1.000001) {
      applySmallScreenButtonsStyle(buttonElements, screenSizeDelta);
    } else {
      applyLargeScreenButtonsStyle(buttonElements);
    }
  }

  let displayingDimensionsOverlay = false;

  function validateClientBrowserDimensions() {
    if (window.innerHeight < 500 || window.innerWidth < 800) {
      // code to not overwrite the overlay if already shown by browser support module
      const inadequateClientResourcesOverlay = document.getElementById('inadequate-client-resources-overlay');
      if (inadequateClientResourcesOverlay.style.display === 'block') return;
      const inadequateClientResourcesOverlayText = document.getElementById('inadequate-client-resources-overlay-text');
      inadequateClientResourcesOverlayText.innerHTML = 'Minimum window size to use MyVision is 500 x 800 px';
      inadequateClientResourcesOverlayText.style.marginLeft = '-28px';
      inadequateClientResourcesOverlayText.style.maxWidth = 'none';
      inadequateClientResourcesOverlay.style.display = 'block';
      displayingDimensionsOverlay = true;
    } else {
      if (!displayingDimensionsOverlay) return;
      const inadequateClientResourcesOverlay = document.getElementById('inadequate-client-resources-overlay');
      inadequateClientResourcesOverlay.style.display = 'none';
      displayingDimensionsOverlay = false;
    }
  }

  /**
   * @author Bryan & Julianna
   * @version 0.1
   * @description This is online Image annotation tool.
   * 
   */
  let leftSideBar = null;
  let rightSideBar = null;

  function windowHasScrollbar() {
    return document.body.scrollHeight < document.documentElement.scrollHeight;
  }

  function getLeftSideBarWidth() {
    return leftSideBar.offsetWidth;
  }

  function getRightSideBarWidth() {
    return rightSideBar.offsetWidth;
  }

  function findWindowElements() {
    document.getElementById('canvas-wrapper-parent');
    document.getElementById('zoom-overflow-wrapper-parent');
    leftSideBar = document.getElementById('left-side-bar');
    rightSideBar = document.getElementById('right-side-bar');
  }

  function getFirefoxScrollBarWidth() {
    // create a div with the scroll
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    const browserScrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return browserScrollWidth / 2;
  }

  function getChromiumScrollBarWidth() {
    return 6;
  }

  function getScrollbarWidth() {
    if (IS_FIREFOX) {
      return getFirefoxScrollBarWidth();
    }
    return getChromiumScrollBarWidth();
  }

  function applyStyling() {
    validateClientBrowserDimensions();
    findWindowElements();
    downloadFonts();
    const screenSizeDelta = setScreenSizeDelta();
    setButtonsStyle(screenSizeDelta);
    setKeyDownEventTimeOut(IS_FIREFOX);
  }

  // import fabric from 'fabric.js';

  const initialFileStatus = {};
  const newFileStatus = { uploaded: false, name: null };
  const canvasProperties$3 = {};
  let canvas$s = null;
  let currentImage = null;
  let canvasOuterMargin = true;

  // only for uploading process
  // currentImage is a base64 encoded image
  function onImageLoad(arg) {

    newFileStatus.uploaded = true;
    currentImage = this ? this : arg;
    draw();
    canvas$s.setZoom(1);
  }
  // ------------

  // These functions instantly evoked for each uploading and switching on new image
  function draw() {
    setNewCanvasProperties();
    if (canvasProperties$3.maximumCanvasHeight < currentImage.height) {
      let newImageDimensions = resizeWhenImageExceedsMaxHeight();
      if (canvasProperties$3.maximumCanvasWidth < newImageDimensions.width) {
        newImageDimensions = resizeWhenImageExceedsMaxWidth(newImageDimensions);
      }
      drawImageOnCanvas(newImageDimensions);
    } else if (canvasProperties$3.maximumCanvasWidth < currentImage.width) {
      const newImageDimensions = resizeWhenImageExceedsMaxWidth(currentImage);
      drawImageOnCanvas(newImageDimensions);
    } else {
      drawImageOnCanvas();
    }
    setCanvasWrapperMaximumDimensions();
    initialFileStatus.width = newFileStatus.width;
    initialFileStatus.height = newFileStatus.height;
  }

  function setNewCanvasProperties() {
    const sideToolsTotalWidth = getLeftSideBarWidth() + getRightSideBarWidth();
    const innerHeight = window.innerHeight - Math.ceil(35 + (29 / getScreenSizeDelta()));
    const innerWidth = window.innerWidth - sideToolsTotalWidth;
    canvasProperties$3.maximumCanvasHeight = canvasOuterMargin
        ? innerHeight - (window.innerHeight * 0.0382263)
        : innerHeight;
    if (IS_FIREFOX) {
      canvasProperties$3.maximumCanvasWidth = canvasOuterMargin
          ? innerWidth - 0.5 - (window.innerWidth * 0.020237453)
          : innerWidth - 0.5;
    } else {
      canvasProperties$3.maximumCanvasWidth = canvasOuterMargin
          ? innerWidth - (window.innerWidth * 0.020237453)
          : innerWidth;
    }
  }

  function setCanvasWrapperMaximumDimensions() {
    const canvasWrapper = document.getElementById('canvas-wrapper');
    canvasWrapper.style.maxWidth = `${canvasProperties$3.maximumCanvasWidth}px`;
    canvasWrapper.style.maxHeight = `${canvasProperties$3.maximumCanvasHeight}px`;
  }

  function enableCanvasOuterMargin() {
    canvasOuterMargin = true;
    setNewCanvasProperties();
  }

  // investigate quality
  function drawImageFromList(selectedImage) {
    currentImage = selectedImage;
    draw();
  }

  function drawResizedImage(newImageDimensions) {
    canvas$s.setWidth(Math.ceil(newImageDimensions.width));
    canvas$s.setHeight(Math.ceil(newImageDimensions.height));
    //console.log("currentImage.src", currentImage.src);
    fabric.Image.fromURL(currentImage.src, (img) => {
      newFileStatus.scaleX = canvas$s.width / img.width;
      newFileStatus.scaleY = canvas$s.height / img.height;
      newFileStatus.originalWidth = img.width;
      newFileStatus.originalHeight = img.height;
      canvas$s.setBackgroundImage(img, canvas$s.renderAll.bind(canvas$s), {
        scaleX: newFileStatus.scaleX,
        scaleY: newFileStatus.scaleY,
      });
    });
    newFileStatus.width = newImageDimensions.width;
    newFileStatus.height = newImageDimensions.height;
  }
  // ----------

  // before uploading image
  function assignCanvasForDrawingImage(canvasObj) {
    canvas$s = canvasObj;
  }

  function drawImageOnCanvas(newImageDimensions) {
    if (newImageDimensions) {
      drawResizedImage(newImageDimensions);
    } else {
      drawOriginalImage();
    }
  }

  // instant access to resizing process
  function getCurrentImage() {
    return currentImage;
  }

  function resizeWhenImageExceedsMaxHeight() {
    const newImageDimensions = {};
    const heightRatio = canvasProperties$3.maximumCanvasHeight / currentImage.height;
    newImageDimensions.height = canvasProperties$3.maximumCanvasHeight;
    newImageDimensions.width = currentImage.width * heightRatio;
    return newImageDimensions;
  }

  function resizeWhenImageExceedsMaxWidth(imageDimensions) {
    const newImageDimensions = {};
    const widthRatio = canvasProperties$3.maximumCanvasWidth / imageDimensions.width;
    /*
      code for not filling up the entire screen with the canvas
       newImageDimensions.width = canvasProperties.maximumCanvasWidth - 20;
       newImageDimensions.height = imageDimensions.height * widthRatio - 20;
    */
    newImageDimensions.width = canvasProperties$3.maximumCanvasWidth;
    newImageDimensions.height = imageDimensions.height * widthRatio;
    return newImageDimensions;
  }

  function resizeCanvasAndImage() {
    setNewCanvasProperties();
    if (currentImage) {
      if (canvasProperties$3.maximumCanvasHeight < currentImage.height) {
        let newImageDimensions = resizeWhenImageExceedsMaxHeight();
        if (canvasProperties$3.maximumCanvasWidth < newImageDimensions.width) {
          newImageDimensions = resizeWhenImageExceedsMaxWidth(newImageDimensions);
        }
        drawImageOnCanvas(newImageDimensions);
      } else if (canvasProperties$3.maximumCanvasWidth < currentImage.width) {
        const newImageDimensions = resizeWhenImageExceedsMaxWidth(currentImage);
        drawImageOnCanvas(newImageDimensions);
      } else {
        drawImageOnCanvas();
      }
    }
    return calculateNewFileSizeRatio();
  }

  // ???
  // instantly evoked by some type of images
  function drawOriginalImage() {
    canvas$s.setWidth(Math.ceil(currentImage.width));
    canvas$s.setHeight(Math.ceil(currentImage.height));
    fabric.Image.fromURL(currentImage.src, (img) => {
      newFileStatus.originalWidth = img.width;
      newFileStatus.originalHeight = img.height;
      canvas$s.setBackgroundImage(img, canvas$s.renderAll.bind(canvas$s), {});
    });
    newFileStatus.scaleX = 1;
    newFileStatus.scaleY = 1;
    newFileStatus.width = currentImage.width;
    newFileStatus.height = currentImage.height;
  }

  // For 45px margin instead
  // const sideToolsTotalWidth = getLeftSideBarWidth() + getRightSideBarWidth();
  // const innerHeight = window.innerHeight - 64;
  // const innerWidth = window.innerWidth - sideToolsTotalWidth;
  // canvasProperties.maximumCanvasHeight = canvasOuterMargin
  //   ? innerHeight - (window.innerHeight * 0.04587156)
  //   : innerHeight;
  // if (IS_FIREFOX) {
  //   canvasProperties.maximumCanvasWidth = canvasOuterMargin
  //     ? innerWidth - 0.5 - (window.innerWidth * 0.024284943)
  //     : innerWidth - 0.5;
  // } else {
  //   canvasProperties.maximumCanvasWidth = canvasOuterMargin
  //     ? innerWidth - (window.innerWidth * 0.024284943)
  //     : innerWidth;
  // }

  // ???
  function removeCanvasOuterMargin() {
    canvasOuterMargin = false;
    setNewCanvasProperties();
  }

  function getCanvasProperties() {
    return canvasProperties$3;
  }

  function calculateNewFileSizeRatio() {
    const newFileSizeRatio = {};
    newFileSizeRatio.width = newFileStatus.width / initialFileStatus.width;
    newFileSizeRatio.height = newFileStatus.height / initialFileStatus.height;
    initialFileStatus.width = newFileStatus.width;
    initialFileStatus.height = newFileStatus.height;
    return newFileSizeRatio;
  }
  /// ------

  // instantly evoked after uploading the second image and reacts on each image switch
  function getImageProperties() {
    return newFileStatus;
  }

  function calculateCurrentImageHeightRatio() {
    return newFileStatus.height / newFileStatus.originalHeight;
  }
  // ------------

  // ??
  function setCurrentImage(image) {
    currentImage = image;
  }

  function resizeCanvas() {
    setNewCanvasProperties();
    if (canvasProperties$3.maximumCanvasHeight < currentImage.height) {
      let newImageDimensions = resizeWhenImageExceedsMaxHeight();
      if (canvasProperties$3.maximumCanvasWidth < newImageDimensions.width) {
        newImageDimensions = resizeWhenImageExceedsMaxWidth(newImageDimensions);
      }
      canvas$s.setWidth(Math.ceil(newImageDimensions.width));
      canvas$s.setHeight(Math.ceil(newImageDimensions.height));
    } else if (canvasProperties$3.maximumCanvasWidth < currentImage.width) {
      const newImageDimensions = resizeWhenImageExceedsMaxWidth(currentImage);
      canvas$s.setWidth(Math.ceil(newImageDimensions.width));
      canvas$s.setHeight(Math.ceil(newImageDimensions.height));
    } else {
      canvas$s.setWidth(Math.ceil(currentImage.width));
      canvas$s.setHeight(Math.ceil(currentImage.height));
    }
    setCanvasWrapperMaximumDimensions();
  }

  let shapes = {};
  let canvas$r = null;
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
       canvas$r.renderAll();
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
    canvas$r.renderAll();
  }

  function changeShapeLabelText(id, newText) {
    shapes[id].shapeRef.set('shapeLabelText', newText);
    highlightShapeFill(id);
  }

  function removeShape(id) {
    decrementShapeType(shapes[id].shapeRef);
    // removes from the canvas the polygon
    canvas$r.remove(shapes[id].shapeRef);
    delete shapes[id];
  }

  function assignCanvasForShapeFillManipulation(canvasObj) {
    canvas$r = canvasObj;
  }

  function changeShapeColorById(id, color) {
    shapes[id].color = color;
    shapes[id].shapeRef.set('fill', color.default);
    shapes[id].shapeRef.set('stroke', color.stroke);
    canvas$r.renderAll();
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
      canvas$r.remove(shapes[key].shapeRef);
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
        colorHex = HSLToHex(currentShapes[key].color.stroke);
        for (let i=0; i< currentShapes[key].shapeRef.points.length; i++) {
          points.push(currentShapes[key].shapeRef.points[i].x, currentShapes[key].shapeRef.points[i].y);
        }

        for (let i=0; i<Math.floor(points.length/2); i++){
           let j = i*2;
           points_scaled[j] = Math.trunc(points[j]/imageDimensions.scaleX);
           points_scaled[j+1] = Math.trunc(points[j+1]/imageDimensions.scaleY);
        }

        polygons.push({
          "color": colorHex,
          'points': points_scaled
        });
        points = [];
        points_scaled = [];
      }

      if (currentShapes[key].shapeRef.previousShapeName === 'newLine') {
        colorHex = HSLToHex(currentShapes[key].color.stroke);
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
          "color": colorHex,
        });
        points = [];
        points_scaled = [];
      }

      if (currentShapes[key].shapeRef.shapeName === 'bndBox'){
        colorHex = HSLToHex(currentShapes[key].color.stroke);

        points.push(currentShapes[key].shapeRef.aCoords.tl.x, currentShapes[key].shapeRef.aCoords.tl.y);
        points.push(currentShapes[key].shapeRef.aCoords.br.x, currentShapes[key].shapeRef.aCoords.br.y);

        for (let i=0; i<Math.floor(points.length/2); i++){
             let j = i*2;
             points_scaled[j] = Math.trunc(points[j]/imageDimensions.scaleX);
             points_scaled[j+1] = Math.trunc(points[j+1]/imageDimensions.scaleY);
        }

        rectangles.push({
          "color": colorHex,
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
      };
    }
    return objectJSON;
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
    canvas$r.renderAll();
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

  const state = { 
    ACTIVE: 'active', 
    DEFAULT: 'default', 
    DISABLED: 'disabled' 
  };

  let removePointsState = state.DEFAULT;
  let createLineState = state.DEFAULT;
  let addPointsState = state.DEFAULT;
  let createBoundingBoxState = state.DEFAULT;
  let createPolygonState = state.DEFAULT;
  let editShapesState = state.DEFAULT;

  let removePolygonPointsButtonElement = null;
  let addPolygonPointsButtonElement = null;
  let removeLabelsButtonElement = null;
  let editShapesButtonElement = null;
  let createLineButtonElement = null;
  let zoomInButtonElement = null;
  let zoomOutButtonElement = null;
  let createBoundingBoxButtonElement = null;
  let createPolygonButtonElement = null;
  let removeImagesButtonElement = null;

  function polygonsPresentInCurrentImage() {
    const currentShapes = getAllExistingShapes();
    const shapeIds = Object.keys(currentShapes);
    for (let i = 0; i < shapeIds.length; i += 1) {
      if (currentShapes[shapeIds[i]].shapeRef.shapeName === 'polygon') return true;
    }
    return false;
  }

  function setEditShapesButtonToDefault() {
    setButtonToDefault(editShapesButtonElement);
    editShapesState = state.DEFAULT;
  }

  function setEditShapesButtonToDisabled() {
    setButtonToDisabled(editShapesButtonElement);
    editShapesState = state.DISABLED;
  }

  function getEditShapesButtonState() {
    return editShapesState;
  }

  // Box
  function setCreateBoundingBoxButtonToDefault() {
    setButtonToDefault(createBoundingBoxButtonElement);
    createBoundingBoxState = state.DEFAULT;
  }
  function setCreateBoundingBoxButtonToDisabled() {
    setButtonToDisabled(createBoundingBoxButtonElement);
    createBoundingBoxState = state.DISABLED;
    setCreateNewLineToDisabled();
  }
  function getCreateBoundingBoxButtonState() {
    return createBoundingBoxState;
  }

  //// Polygon
  // Polygon Default
  function setCreatePolygonButtonToDefault() {
    setButtonToDefault(createPolygonButtonElement);
    createPolygonState = state.DEFAULT;
  }
  // Polygon Disabled
  function setCreatePolygonButtonToDisabled() {
    setButtonToDisabled(createPolygonButtonElement);
    createPolygonState = state.DISABLED;
  }
  // Polygon get state
  function getCreatePolygonButtonState() {
    return createPolygonState;
  }

  //// New Line
  // New Line Default
  function setCreateNewLineToDefault(){
    setButtonToDefault(createLineButtonElement);
    createLineState = state.DEFAULT;
  }
  // New line Disabled
  function setCreateNewLineToDisabled() {
    setButtonToDisabled(createLineButtonElement);
    createLineState = state.DISABLED;
  }
  // New line get state
  function getCreateLineState() {
    return createLineState;
  }

  // Active states!!!
  function setCreateNewLineButtonToActive() {
    setButtonToActive(createLineButtonElement);
    createLineState = state.ACTIVE;
    editShapesState = state.DEFAULT;
    if (createBoundingBoxState === state.ACTIVE) setCreateBoundingBoxButtonToDefault();
    if (createPolygonState === state.ACTIVE) setCreatePolygonButtonToDefault();
    if (addPointsState === state.ACTIVE) setAddPointsButtonToDefault();
    if (removePointsState === state.ACTIVE) setRemovePointsDefault();
    //if (editShapesState === state.ACTIVE) setEditShapesButtonToDefault();
    //testDrawLine();
  }

  function setAddPointsActive() {
    setButtonToActive(addPolygonPointsButtonElement);
    addPointsState = state.ACTIVE;
    if (createPolygonState === state.ACTIVE) setCreatePolygonButtonToDefault();
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }

  function setCreatePolygonButtonToActive() {
    if (!getTestDrawLineState()) {
      setButtonToActive(createPolygonButtonElement);
      createPolygonState = state.ACTIVE;
    }
    if (createBoundingBoxState === state.ACTIVE) {
      setCreateBoundingBoxButtonToDefault();
    }
    if (editShapesState === state.ACTIVE) {
      setEditShapesButtonToDefault();
    }
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }

  function setRemovePointsActive() {
    setButtonToActive(removePolygonPointsButtonElement);
    removePointsState = state.ACTIVE;
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }


  function setEditShapesButtonToActive() {
    setButtonToActive(editShapesButtonElement);
    editShapesState = state.ACTIVE;
    if (createBoundingBoxState === state.ACTIVE) {
      setCreateBoundingBoxButtonToDefault();
    }
    if (createPolygonState === state.ACTIVE) {
      setCreatePolygonButtonToDefault();
    }
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }

  function setCreateBoundingBoxButtonToActive() {
    setButtonToActive(createBoundingBoxButtonElement);
    createBoundingBoxState = state.ACTIVE;
    if (editShapesState === state.ACTIVE) setEditShapesButtonToDefault();
    if (createPolygonState === state.ACTIVE) setCreatePolygonButtonToDefault();
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }

  function setAddPointsButtonToActive() {
    setAddPointsActive();
    if (createBoundingBoxState === state.ACTIVE) setCreateBoundingBoxButtonToDefault();
    if (createPolygonState === state.ACTIVE) setCreatePolygonButtonToDefault();
    if (removePointsState === state.ACTIVE) setRemovePointsDefault();
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }

  function setRemovePointsButtonToActive() {
    setRemovePointsActive();
    if (createBoundingBoxState === state.ACTIVE) setCreateBoundingBoxButtonToDefault();
    if (createPolygonState === state.ACTIVE
        && !getPolygonDrawingInProgressState()) setCreatePolygonButtonToDefault();
    if (addPointsState === state.ACTIVE) setAddPointsDefault();
    if (createLineState === state.ACTIVE) setCreateNewLineToDefault();
  }

  //
  function setRemoveImagesButtonDefault() {
    setButtonToGreyDefault(removeImagesButtonElement);
  }

  function setRemoveImagesButtonsDisabled() {
    setButtonToDisabled(removeImagesButtonElement);
  }

  function setAddPointsDefault() {
    setButtonToDefault(addPolygonPointsButtonElement);
    addPointsState = state.DEFAULT;
  }

  function setAddPointsDisabled() {
    setButtonToDisabled(addPolygonPointsButtonElement);
    addPointsState = state.DISABLED;
  }

  function getAddPointsButtonState() {
    return addPointsState;
  }

  // Remove Points
  function setRemovePointsDefault() {
    setButtonToDefault(removePolygonPointsButtonElement);
    removePointsState = state.DEFAULT;
  }

  function setRemovePointsDisabled() {
    setButtonToDisabled(removePolygonPointsButtonElement);
    removePointsState = state.DISABLED;
  }

  function getRemovePointsButtonState() {
    return removePointsState;
  }
  // Label
  function setRemoveLabelsButtonToDefault() {
    setButtonToDefault(removeLabelsButtonElement);
  }
  function setRemoveLabelsButtonToDisabled() {
    setButtonToDisabled(removeLabelsButtonElement);
  }
  // Zoom
  function setZoomInButtonToDefault() {
    setButtonToDefault(zoomInButtonElement);
  }
  function setZoomInButtonToDisabled() {
    setButtonToDisabled(zoomInButtonElement);
  }
  function setZoomOutButtonToDefault() {
    setButtonToDefault(zoomOutButtonElement);
  }
  function setZoomOutButtonToDisabled() {
    setButtonToDisabled(zoomOutButtonElement);
  }

  // Polygon Editing = Remove + Add Points
  function setPolygonEditingButtonsToDisabled() {
    if (!polygonsPresentInCurrentImage()) {
      setRemovePointsDisabled();
      setAddPointsDisabled();
      return true;
    }
    return false;
  }

  function setAddPointsButtonToDefault() {
    if (polygonsPresentInCurrentImage() && !getPolygonDrawingInProgressState()) {
      setAddPointsDefault();
    } else {
      setAddPointsDisabled();
    }
  }

  function setRemovePointsButtonToDefault() {
    if (polygonsPresentInCurrentImage() || getPolygonDrawingInProgressState()) {
      setRemovePointsDefault();
    } else {
      setRemovePointsDisabled();
    }
  }

  function setPolygonEditingButtonsToDefault() {
    setAddPointsButtonToDefault();
    setRemovePointsButtonToDefault();
  }

  function setInitialToolkitButtonStyling() {
    setAddPointsDisabled();
    setRemovePointsDisabled();
    setZoomInButtonToDisabled();
    setZoomOutButtonToDisabled();
    setEditShapesButtonToDisabled();
    setRemoveImagesButtonsDisabled();

    setCreatePolygonButtonToActive();

    setRemoveLabelsButtonToDisabled();
    setCreatePolygonButtonToDisabled();
    setCreateBoundingBoxButtonToDisabled();

    setCreateNewLineToDisabled();
  }

  function identifyToolkitButtons() {
    editShapesButtonElement = document.getElementById('edit-shapes-button');

    createLineButtonElement = document.getElementById('create-line-button');

    removePolygonPointsButtonElement = document.getElementById('remove-points-button');
    addPolygonPointsButtonElement = document.getElementById('add-points-button');
    removeLabelsButtonElement = document.getElementById('remove-labels-button');
    zoomInButtonElement = document.getElementById('zoom-in-button');
    zoomOutButtonElement = document.getElementById('zoom-out-button');
    createBoundingBoxButtonElement = document.getElementById('create-bounding-box-button');
    createPolygonButtonElement = document.getElementById('create-polygon-button');
    removeImagesButtonElement = document.getElementById('remove-images-button');
  }

  function initiateToolkitButtonsStyling() {
    identifyToolkitButtons();
    setInitialToolkitButtonStyling();
  }


  // function getSetterFunc(newState) {
  //   if (newState === state.ACTIVE) {
  //     return setButtonToActive;
  //   }
  //   if (newState === state.DEFAULT) {
  //     return setButtonToDefault;
  //   }
  //   return setButtonToDisabled;
  // }

  // function setPolygonEditingButtonsState(newState) {
  //   const setterFunc = getSetterFunc(state);
  //   setterFunc(removePolygonPointsButtonElement);
  //   removePointsState = newState;
  //   setterFunc(addPolygonPointsButtonElement);
  //   addPointsState = newState;
  // }

  let TestDrawLineState = false;
  let defaultState$1 = false;
  let removingPolygonPointsState = false;
  let addingPolygonPointsState = false;
  let movableObjectsState = true;
  let continuousDrawingState = true;
  let lastDrawingModeState = null;
  let readyToDrawShapeState = false;
  let cancelledReadyToDrawState = null;
  let removingPointsAfterCancelDrawState = null;
  let labelsVisibilityState = true;
  let editingLabelId = null;
  let lastPolygonActionWasMoveState = false;
  let newShapeSelectedViaLabelListState = false;
  let currentZoomState = 1;
  let doubleScrollCanvasState = false;
  let settingsPopupOpenState = false;
  let changingMLGeneratedLabelNamesState = false;
  let currentImageId = false;
  let labellerModalDisplayed = false;
  let uploadDatasetsModalDisplayedState = false;
  let machineLearningModalDisplayedState = false;
  let boundingBoxScalingState = false;
  let shapeMovingState = false;
  let polygonDrawingInProgressState = false;
  let boundingBoxDrawingInProgressState = false;
  let removeImageModalDisplayedState = false;
  let welcomeModalDisplayedState = false;
  let sessionDirty = false;
  let crosshairForBoundingBoxVisibleState = true;
  let crosshairUsedOnCanvasState = false;
  let boundingBoxCrosshairDropdownOpenState = false;

  function getLastDrawingModeState() {
    return lastDrawingModeState;
  }

  function setTestDrawLineState(state){
    TestDrawLineState = state;
    return state;
  }

  function getTestDrawLineState(){
    return TestDrawLineState;
  }

  function setCurrentImageId(id) {
    currentImageId = id;
    if (currentImageId == '0')
    {
      setCreateNewLineToDefault();
    }
  }

  function getCurrentImageId() {
    return currentImageId;
  }

  function getDefaultState() {
    return defaultState$1;
  }

  function getAlteringPolygonPointsState() {
    return removingPolygonPointsState || addingPolygonPointsState;
  }

  function getRemovingPolygonPointsState() {
    return removingPolygonPointsState;
  }

  function getAddingPolygonPointsState() {
      return addingPolygonPointsState;
  }

  function getMovableObjectsState() {
    return movableObjectsState;
  }

  function getContinuousDrawingState() {
    return continuousDrawingState;
  }

  function getReadyToDrawShapeState() {
    return readyToDrawShapeState;
  }

  function getCancelledReadyToDrawState() {
    return cancelledReadyToDrawState;
  }

  function getRemovingPointsAfterCancelDrawState() {
    return removingPointsAfterCancelDrawState;
  }

  function getLabelsVisibilityState() {
    return labelsVisibilityState;
  }

  function getEditingLabelId() {
    return editingLabelId;
  }

  function getLastPolygonActionWasMoveState() {
    return lastPolygonActionWasMoveState;
  }

  function getNewShapeSelectedViaLabelListState() {
    return newShapeSelectedViaLabelListState;
  }

  function getCurrentZoomState() {
    return currentZoomState;
  }

  function getDoubleScrollCanvasState() {
    return doubleScrollCanvasState;
  }

  function getSettingsPopupOpenState() {
    return settingsPopupOpenState;
  }

  function getChangingMLGeneratedLabelNamesState() {
    return changingMLGeneratedLabelNamesState;
  }

  function getLabellerModalDisplayedState() {
    return labellerModalDisplayed;
  }

  function getBoundingBoxScalingState() {
    return boundingBoxScalingState;
  }

  function getShapeMovingState() {
    return shapeMovingState;
  }

  function getPolygonDrawingInProgressState() {
    return polygonDrawingInProgressState;
  }

  function getBoundingBoxDrawingInProgressState() {
    return boundingBoxDrawingInProgressState;
  }

  function getUploadDatasetsModalDisplayedState() {
    return uploadDatasetsModalDisplayedState;
  }

  function getMachineLearningModalDisplayedState() {
    return machineLearningModalDisplayedState;
  }

  function getRemoveImageModalDisplayedState() {
    return removeImageModalDisplayedState;
  }

  function getWelcomeModalDisplayedState() {
    return welcomeModalDisplayedState;
  }

  function getSessionDirtyState() {
    return sessionDirty;
  }

  function getCrosshairForBoundingBoxVisibleState() {
    return crosshairForBoundingBoxVisibleState;
  }

  function getCrosshairUsedOnCanvasState() {
    return crosshairUsedOnCanvasState;
  }

  function getBoundingBoxCrosshairDropdownOpenState() {
    return boundingBoxCrosshairDropdownOpenState;
  }

  function setDefaultState(state) {
    defaultState$1 = state;
  }

  function setAlteringPolygonPointsState(state) {
    removingPolygonPointsState = state;
    addingPolygonPointsState = state;
  }

  function setRemovingPolygonPointsState(state) {
    removingPolygonPointsState = state;
  }

  function setAddingPolygonPointsState(state) {
    addingPolygonPointsState = state;
  }

  function setMovableObjectsState(state) {
    movableObjectsState = state;
  }

  function setContinuousDrawingState(state) {
    continuousDrawingState = state;
  }

  function setLastDrawingModeState(state) {
    lastDrawingModeState = state;
  }

  function setReadyToDrawShapeState(state) {
    readyToDrawShapeState = state;
  }

  function setCancelledReadyToDrawState(state) {
    cancelledReadyToDrawState = state;
  }

  function setRemovingPointsAfterCancelDrawState(state) {
    removingPointsAfterCancelDrawState = state;
  }

  function setLabelsVisibilityState(state) {
    labelsVisibilityState = state;
  }

  function setEditingLabelId(state) {
    editingLabelId = state;
  }

  function setLastPolygonActionWasMoveState(state) {
    lastPolygonActionWasMoveState = state;
  }

  function setNewShapeSelectedViaLabelListState(state) {
    newShapeSelectedViaLabelListState = state;
  }

  function setCurrentZoomState(state) {
    currentZoomState = state;
  }

  function setDoubleScrollCanvasState(state) {
    doubleScrollCanvasState = state;
  }

  function setSettingsPopupOpenState(state) {
    settingsPopupOpenState = state;
  }

  function setChangingMLGeneratedLabelNamesState(state) {
    changingMLGeneratedLabelNamesState = state;
  }

  function setLabellerModalDisplayedState(state) {
    labellerModalDisplayed = state;
  }

  function setBoundingBoxScalingState(state) {
    boundingBoxScalingState = state;
  }

  function setShapeMovingState(state) {
    shapeMovingState = state;
  }

  function setPolygonDrawingInProgressState(state) {
    polygonDrawingInProgressState = state;
  }

  function setBoundingBoxDrawingInProgressState(state) {
    boundingBoxDrawingInProgressState = state;
  }

  function setUploadDatasetsModalDisplayedState(state) {
    uploadDatasetsModalDisplayedState = state;
  }

  function setMachineLearningModalDisplayedState(state) {
    machineLearningModalDisplayedState = state;
  }

  function setRemoveImageModalDisplayedState(state) {
    removeImageModalDisplayedState = state;
  }

  function setSessionDirtyState(state) {
    sessionDirty = state;
  }

  function setCrosshairForBoundingBoxVisibleState(state) {
    crosshairForBoundingBoxVisibleState = state;
  }

  function setCrosshairUsedOnCanvasState(state) {
    crosshairUsedOnCanvasState = state;
  }

  function setBoundingBoxCrosshairDropdownOpenState(state) {
    boundingBoxCrosshairDropdownOpenState = state;
  }

  function setAllObjectsToUneditable$1(canvas) {

    canvas.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName !== 'tempPoint' && iteratedObj.shapeName !== 'firstPoint') {
        if (iteratedObj.shapeName !== 'bndBox') {
          iteratedObj.perPixelTargetFind = false;
        }
        iteratedObj.selectable = false;
        iteratedObj.hoverCursor = 'crosshair';
      }

      if (iteratedObj.previousShapeName === 'newLine'){
        iteratedObj.selectable = false;
      }
    });
  }

  function setDrawCursorMode(canvas) {
    canvas.discardActiveObject();
    setAllObjectsToUneditable$1(canvas);
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';
    canvas.renderAll();
  }

  function resetObjectCursors(canvas) {
    if (getMovableObjectsState()) {
      canvas.forEachObject((iteratedObj) => {
        iteratedObj.hoverCursor = null;
      });
    } else {
      canvas.forEachObject((iteratedObj) => {
        iteratedObj.hoverCursor = 'default';
      });
    }
    canvas.renderAll();
  }

  const DEFAULT_STROKE_WIDTH = 1;
  const DEFAULT_VERTICAL_DELTA = 0.7;
  const DEFAULT_HORIZONTAL_DELTA = 0.3;

  const crosshairProps = {};

  let strokeWidth = DEFAULT_STROKE_WIDTH;
  let verticalDelta$1 = DEFAULT_VERTICAL_DELTA;
  let horizontalDelta$1 = DEFAULT_HORIZONTAL_DELTA;

  function setZoomInProperties$3(crosshairRatio) {
    strokeWidth -= strokeWidth * crosshairRatio;
    verticalDelta$1 -= verticalDelta$1 * crosshairRatio;
    horizontalDelta$1 -= horizontalDelta$1 * crosshairRatio;
  }

  function setZoomOutProperties$3(crosshairRatio) {
    strokeWidth *= crosshairRatio;
    verticalDelta$1 *= crosshairRatio;
    horizontalDelta$1 *= crosshairRatio;
  }

  function getStrokeWidth() {
    return strokeWidth;
  }

  function getHorizontalDelta() {
    return horizontalDelta$1;
  }

  function getVerticalDelta() {
    return verticalDelta$1;
  }

  function getCrosshairProps() {
    const crosshairColor = document.getElementById('settings-popup-bounding-box-crosshair-color-picker').value;
    return {
      fill: crosshairColor,
      shapeName: 'crosshairLine',
      stroke: crosshairColor,
      strokeWidth,
      selectable: false,
      evented: false,
    };
  }

  // http://fabricjs.com/controls-customization
  (function setProperties() {
    crosshairProps.crosshairProps = getCrosshairProps;
    crosshairProps.strokeWidth = getStrokeWidth;
    crosshairProps.verticalDelta = getVerticalDelta;
    crosshairProps.horizontalDelta = getHorizontalDelta;
    crosshairProps.setZoomInProperties = setZoomInProperties$3;
    crosshairProps.setZoomOutProperties = setZoomOutProperties$3;
  }());

  let isMouseOnCanvasStatus = false;
  let mouseOverCallback = null;
  let mouseOutCallback = null;

  function getIsMouseOnCanvasStatus() {
    return isMouseOnCanvasStatus;
  }

  function removeExecutedFunctionOnMouseOver() {
    mouseOverCallback = null;
  }

  function removeExecutedFunctionOnMouseOut() {
    mouseOutCallback = null;
  }

  // addressing all mouse moves on the canvas
  // executed once, after entering on canvas
  function mouseOverCanvas() {
    isMouseOnCanvasStatus = true;
    if (mouseOverCallback) {
      mouseOverCallback();
      removeExecutedFunctionOnMouseOver();
    }
  }

  function mouseOutCanvas() {
    isMouseOnCanvasStatus = false;
    if (mouseOutCallback) mouseOutCallback();
  }

  function executeFunctionOnceOnMouseOver(func) {
    mouseOverCallback = func;
  }

  function executeFunctionOnMouseOut(func) {
    mouseOutCallback = func;
  }

  function registerMouseOverOutEvents() {
    window.mouseOverCanvas = mouseOverCanvas;
    window.mouseOutCanvas = mouseOutCanvas;
  }

  let lastMouseMoveEvent = null;

  // Reacts to each mouse move
  function onMouseMoveEvent(event) {
    lastMouseMoveEvent = event;
  }

  function getLastMouseMoveEvent() {
    return lastMouseMoveEvent;
  }

  // at the very beginning of process
  function registerMouseMoveEvents() {
    window.trackMouseMoveEvents = onMouseMoveEvent;
  }

  let canvasElement1Displaying = true;
  let oldCanvas = null;
  let canvas$q = null;
  let canvasContainerElement1 = null;
  let canvasContainerElement2 = null;
  let currentCanvasContainerElement = null;
  let timeoutMilliseconds = 0;

  function getCurrentCanvasContainerElement() {
    return currentCanvasContainerElement;
  }

  // Evokes only if to switch images
  function switchCurrentCanvasContainerElement() {
    currentCanvasContainerElement = canvasElement1Displaying
      ? canvasContainerElement2 : canvasContainerElement1;
  }

  function switchCanvasContainerElementsStyle() {
    setTimeout(() => {
      if (canvasElement1Displaying) {
        canvasContainerElement1.style.display = 'none';
        canvasContainerElement2.style.display = '';
        canvasContainerElement1.style.left = '50%';
        canvasContainerElement1.style.top = '50%';
        canvasElement1Displaying = false;
      } else {
        canvasContainerElement1.style.display = '';
        canvasContainerElement2.style.display = 'none';
        canvasContainerElement2.style.left = '50%';
        canvasContainerElement2.style.top = '50%';
        canvasElement1Displaying = true;
      }
      oldCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      oldCanvas.clear();
    }, timeoutMilliseconds);
  }

  // if for some reason the performance of switching/uploading images slows down, can
  // always switch back to the original implementation of setting canvas elements
  // Apr 23, 2020 - c33d736b928b9590c28ebd48f882cb2a6fac51aa
  function switchCanvasContainerElements() {
    switchCanvasContainerElementsStyle();
    switchCurrentCanvasContainerElement();
  }

  function enableActiveObjectsAppearInFront() {
    canvas$q.preserveObjectStacking = false;
  }

  function preventActiveObjectsAppearInFront() {
    if (canvas$q) { canvas$q.preserveObjectStacking = true; }
  }

  function assignNewCanvasForUtils(newCanvasObj) {
    oldCanvas = canvas$q;
    canvas$q = newCanvasObj;
  }

  function assignTimeoutMillisecondsDependingOnBrowser() {
    timeoutMilliseconds = IS_FIREFOX ? 12 : 0;
  }

  function assignCanvasForUtils(canvasObj) {
    canvas$q = canvasObj;
    canvas$q.randomProperty = 'test';
    canvasContainerElement1 = document.getElementById('canvas-absolute-container-1');
    canvasContainerElement2 = document.getElementById('canvas-absolute-container-2');
    currentCanvasContainerElement = canvasContainerElement1;
    assignTimeoutMillisecondsDependingOnBrowser();
  }

  // import fabric from 'fabric.js';

  let canvasRef = null;
  let canvasCrosshairLineX = null;
  let canvasCrosshairLineY = null;
  let outsideCrosshairLineXElement = null;
  let outsideCrosshairLineYElement = null;
  let canvasAbsolutelContainer1Element = null;
  let canvasAbsolutelContainer2Element = null;
  let moveCanvasCrosshairFunc = null;
  let moveOutsideCrosshairFunc = null;
  let horizontalDelta = null;
  let verticalDelta = null;

  const CROSSHAIR_DRAW_DELAY_MILLISECONDS = 15;
  const CROSSHAIR_DIMENSIONS_UPDATE_DELAY_MILLISECONDS = CROSSHAIR_DRAW_DELAY_MILLISECONDS + 1;

  function bringCanvasCrosshairToFront(canvas) {
    if (!canvasCrosshairLineX) return;
    canvas.bringToFront(canvasCrosshairLineX);
    canvas.bringToFront(canvasCrosshairLineY);
    canvas.renderAll();
  }

  function setCrosshairColor(element) {
    if (outsideCrosshairLineXElement) {
      outsideCrosshairLineXElement.style.backgroundColor = element.value;
      outsideCrosshairLineYElement.style.backgroundColor = element.value;
    }
    if (canvasCrosshairLineX) {
      canvasCrosshairLineX.set({ fill: element.value, stroke: element.value });
      canvasCrosshairLineY.set({ fill: element.value, stroke: element.value });
      canvasRef.renderAll();
    }
  }

  function setCanvasCrosshairCoordinates() {
    canvasCrosshairLineX.setCoords();
    canvasCrosshairLineY.setCoords();
  }

  function moveCanvasCrosshairDefault(event, canvas) {
    if (!event.pointer.x) return;
    canvasCrosshairLineX.set({
      x1: event.pointer.x + verticalDelta,
      x2: event.pointer.x + verticalDelta,
    });
    canvasCrosshairLineY.set({
      y1: event.pointer.y - horizontalDelta,
      y2: event.pointer.y - horizontalDelta,
    });
    setCanvasCrosshairCoordinates();
    canvas.renderAll();
  }

  function moveCanvasCrosshairOnZoom(event, canvas) {
    if (!event.pointer.x) return;
    if (event) {
      const pointer = canvas.getPointer(event.e);

      canvasCrosshairLineX.set({
        x1: pointer.x + verticalDelta,
        x2: pointer.x + verticalDelta,
      });
      canvasCrosshairLineY.set({
        y1: pointer.y - horizontalDelta - 1.2,
        y2: pointer.y - horizontalDelta - 1.2,
      });
      setCanvasCrosshairCoordinates();
      canvas.renderAll();
    }
  }

  function moveOutsideCrosshairDefault(event) {
    // the following check is used in the scenario where the mousemove event has been dispatched
    if (!event.pageY) { event = getLastMouseMoveEvent(); }
    outsideCrosshairLineXElement.style.top = `${event.pageY - horizontalDelta}px`;
    outsideCrosshairLineYElement.style.left = `${event.pageX + verticalDelta}px`;
  }

  function moveOutsideCrosshairZoom(event) {
    // the following check is used in the scenario where the mousemove event has been dispatched
    if (!event.pageY) { event = getLastMouseMoveEvent(); }
    outsideCrosshairLineXElement.style.top = `${event.pageY - horizontalDelta - 2.25}px`;
    outsideCrosshairLineYElement.style.left = `${event.pageX + verticalDelta}px`;
  }

  function setCrosshairAfterZoom() {
    moveCanvasCrosshairFunc = moveCanvasCrosshairOnZoom;
    moveOutsideCrosshairFunc = moveOutsideCrosshairZoom;
    verticalDelta = crosshairProps.verticalDelta();
    horizontalDelta = crosshairProps.horizontalDelta();
  }

  function hideCanvasCrosshair(canvas) {
    if (!canvasCrosshairLineX || !canvasCrosshairLineY) return;
    canvasCrosshairLineX.set({ x1: -10, x2: -10 });
    canvasCrosshairLineY.set({ y1: -10, y2: -10 });
    canvas.renderAll();
  }

  function hideOutsideCrosshair() {
    if (!outsideCrosshairLineXElement || !outsideCrosshairLineYElement) return;
    outsideCrosshairLineXElement.style.top = '-10px';
    outsideCrosshairLineYElement.style.left = '-10px';
  }

  function hideCrosshair(canvas) {
    hideCanvasCrosshair(canvas || canvasRef);
    hideOutsideCrosshair();
  }

  function resetMoveCrosshairFuncs() {
    if (getCurrentZoomState() > 1.000001) {
      moveCanvasCrosshairFunc = moveCanvasCrosshairOnZoom;
      moveOutsideCrosshairFunc = moveOutsideCrosshairZoom;
    } else {
      moveCanvasCrosshairFunc = moveCanvasCrosshairDefault;
      moveOutsideCrosshairFunc = moveOutsideCrosshairDefault;
    }
  }

  function moveCanvasCrosshair(event, canvas) {
    moveCanvasCrosshairFunc(event, canvas);
  }

  function moveOutsideCrosshair(event) {
    moveOutsideCrosshairFunc(event);
  }

  function removeMouseMoveEventListener(element) {
    if (element) element.removeEventListener('mousemove', moveOutsideCrosshair);
  }

  function removeOutsideCrosshairEventListeners() {
    removeMouseMoveEventListener(canvasAbsolutelContainer1Element);
    removeMouseMoveEventListener(canvasAbsolutelContainer2Element);
  }

  function addMouseMoveEventHandlerToElement(element) {
    element.addEventListener('mousemove', moveOutsideCrosshair);
  }

  function addCrosshairOutsideOfCanvas() {
    addMouseMoveEventHandlerToElement(canvasAbsolutelContainer1Element);
    addMouseMoveEventHandlerToElement(canvasAbsolutelContainer2Element);
  }

  function removeCrosshairLinesIfExisting(canvas) {
    if (canvasCrosshairLineX) canvas.remove(canvasCrosshairLineX);
    if (canvasCrosshairLineY) canvas.remove(canvasCrosshairLineY);
    removeOutsideCrosshairEventListeners();
  }

  function removeCrosshair(canvas) {
    removeCrosshairLinesIfExisting(canvas);
    hideOutsideCrosshair();
    removeOutsideCrosshairEventListeners();
  }

  function moveCanvasCrosshairViaLastCanvasPosition(canvas, func) {
    const lastMouseMoveEvent = getLastMouseMoveEvent();
    if (!lastMouseMoveEvent) return;
    const lastCanvasPointer = canvas.getPointer(lastMouseMoveEvent);
    const pointerEvent = { pointer: lastCanvasPointer };
    if (func) {
      func(pointerEvent, canvas);
    } else {
      moveCanvasCrosshair(pointerEvent, canvas);
    }
  }

  function moveCanvasCrosshairViaLastCanvasPositionAsync(canvas, func) {
    setTimeout(() => {
      const {
        left, top, right, bottom,
      } = getCurrentCanvasContainerElement().getBoundingClientRect();
      const { clientX, clientY } = getLastMouseMoveEvent();
      if (clientX <= right && clientX >= left && clientY >= top && clientY <= bottom) {
        moveCanvasCrosshairViaLastCanvasPosition(canvas || canvasRef, func);
      } else {
        hideCrosshair(canvas);
      }
    }, CROSSHAIR_DRAW_DELAY_MILLISECONDS);
  }

  function moveCrosshair(canvas, func) {
    moveCanvasCrosshairViaLastCanvasPosition(canvas || canvasRef, func);
    if (!canvasAbsolutelContainer1Element) return;
    canvasAbsolutelContainer1Element.dispatchEvent(new Event('mousemove'));
    canvasAbsolutelContainer2Element.dispatchEvent(new Event('mousemove'));
  }

  function resetCanvasCrosshairStrokeWidth(canvas) {
    if (!canvasCrosshairLineX) return;
    canvasCrosshairLineX.set({ strokeWidth: crosshairProps.strokeWidth() });
    canvasCrosshairLineY.set({ strokeWidth: crosshairProps.strokeWidth() });
    canvas.renderAll();
  }

  function updateLinesWithNewCanvasDimensions(canvas) {
    if (!canvasCrosshairLineX) return;
    canvasCrosshairLineX.set({ y2: canvas.height });
    canvasCrosshairLineY.set({ x2: canvas.width });
    canvas.renderAll();
  }

  function newCanvasCrosshairLine() {
    return new fabric.Line([0, 0, 0, 0], crosshairProps.crosshairProps());
  }

  function addCanvasCrosshairLines(canvas) {
    canvasCrosshairLineX = newCanvasCrosshairLine();
    canvasCrosshairLineY = newCanvasCrosshairLine();
    canvasCrosshairLineX.set({ orientation: 'x' });
    canvasCrosshairLineY.set({ orientation: 'y' });
    updateLinesWithNewCanvasDimensions(canvas);
    canvas.add(canvasCrosshairLineX);
    canvas.add(canvasCrosshairLineY);
    hideCanvasCrosshair(canvas);
  }

  // crosshair is not redrawn directly upon uploading an image because the browser cannot track mouse
  // movements during the time when the user is selecting an image on their personal machine
  function updateCrosshairDimensionsAndHideAsync(canvas) {
    setTimeout(() => {
      hideCrosshair(canvas);
      updateLinesWithNewCanvasDimensions(canvas || canvasRef);
    }, CROSSHAIR_DIMENSIONS_UPDATE_DELAY_MILLISECONDS);
  }

  function setAllObjectsToUneditable(canvas) {
    canvas.forEachObject((iteratedObj) => {
      iteratedObj.selectable = false;
      iteratedObj.hoverCursor = 'none';
    });
  }

  function assignLocalVariables$2() {
    verticalDelta = crosshairProps.verticalDelta();
    horizontalDelta = crosshairProps.horizontalDelta();
    outsideCrosshairLineXElement = document.getElementById('crosshair-line-x');
    outsideCrosshairLineYElement = document.getElementById('crosshair-line-y');
    canvasAbsolutelContainer1Element = document.getElementById('canvas-absolute-container-1');
    canvasAbsolutelContainer2Element = document.getElementById('canvas-absolute-container-2');
  }

  function setDrawWithCrosshairMode(canvas, resetting) {
    canvasRef = canvas;
    assignLocalVariables$2();
    canvas.discardActiveObject();
    canvas.defaultCursor = 'none';
    canvas.hoverCursor = 'none';
    setAllObjectsToUneditable(canvas);
    resetMoveCrosshairFuncs();
    setCrosshairColor(document.getElementById('settings-popup-bounding-box-crosshair-color-picker'));
    if (resetting) {
      // upon attempting to draw after labelling a shape, wait for the onmouseenter event
      // to be emitted by the canvas wrapper element
      executeFunctionOnceOnMouseOver(moveCrosshair);
      bringCanvasCrosshairToFront(canvas);
    } else {
      removeCrosshairLinesIfExisting(canvas);
      addCanvasCrosshairLines(canvas);
      addCrosshairOutsideOfCanvas();
      if (getIsMouseOnCanvasStatus()) moveCrosshair(canvas, moveCanvasCrosshairDefault);
      if (getCurrentZoomState() > 1.00001) setCanvasCrosshairCoordinates();
      executeFunctionOnMouseOut(hideCrosshair);
      canvas.renderAll();
    }
  }

  let defaultShapeColorIndex = 0;

  const defaultShapeColors = [
    'hsl(0, 100%, 48%',
    'hsl(321, 94%, 34%',
    'hsl(175, 75%, 51%',
    'hsl(241, 86%, 49%',
    'hsl(64, 99%, 40%',
    'hsl(106, 85%, 49%',
    'hsl(355, 80%, 56%',
    'hsl(182, 46%, 60%',
    'hsl(7, 93%, 41%',
    'hsl(220, 65%, 39%',
    'hsl(121, 60%, 39%',
    'hsl(220, 100%, 48%',
    'hsl(21, 65%, 33%',
    'hsl(82, 100%, 33%',
    'hsl(294, 100%, 37%',
  ];
  const defaultLabelOptions = [];
  // const defaultLabelOptions = [
  //   {
  //     text: 'class1',
  //     default: true,
  //     color: {
  //       default: 'hsl(82, 93%, 45%, 0.01)', highlight: 'hsl(82, 93%, 45%, 0.3)', stroke: 'hsl(82, 93%, 45%)', label: 'hsl(82, 93%, 45%, 0.25)',
  //     },
  //   },
  //   // default: 'hsl(186, 75%, 51%, 0.01)', highlight: 'hsl(186, 75%, 51%, 0.3)',
  //   // stroke: 'hsl(186, 75%, 51%)', label: 'hsl(186, 75%, 51%, 0.25)',
  //   {
  //     text: 'class2',
  //     default: true,
  //     color: {
  //       default: 'hsl(45, 77%, 53%, 0.01)', highlight: 'hsl(45, 77%, 53%, 0.3)', stroke: 'hsl(45, 77%, 53%)', label: 'hsl(45, 77%, 53%, 0.28)',
  //     },
  //   },
  //   {
  //     text: 'class3',
  //     default: true,
  //     color: {
  //       default: 'hsl(338 ,100%, 68%, 0.01)', highlight: 'hsl(338, 100%, 68%, 0.3)', stroke: 'hsl(338, 100%, 68%)', label: 'hsl(338, 100%, 68%, 0.28)',
  //     },
  //   },
  //   {
  //     text: 'class4',
  //     default: true,
  //     color: {
  //       default: 'hsl(198, 98%, 61%, 0.01)', highlight: 'hsl(198, 98%, 61% ,0.3)', stroke: 'hsl(198, 98%, 61%)', label: 'hsl(198, 98%, 61%, 0.25)',
  //     },
  //   },
  //   {
  //     text: 'class5',
  //     default: true,
  //     color: {
  //       default: 'hsl(21, 70%, 40%, 0.01)', highlight: 'hsl(21, 70%, 40% ,0.3)', stroke: 'hsl(21, 70%, 40%)', label: 'hsl(21, 70%, 40%, 0.25)',
  //     },
  //   },
  // ];

  const labelOptions = defaultLabelOptions;

  let limitLabelOptions = true;
  let numberOfRemovedOptions = 0;
  const maxLabelOptions = 6;

  function getNewShapeColor() {
    const palletteColor = defaultShapeColors[defaultShapeColorIndex];
    defaultShapeColorIndex += 1;
    return palletteColor;
  }

  function terminateLimitIfUsingDefault(id) {
    if (limitLabelOptions) {
      const selectedOption = labelOptions[id];
      let contains = false;
      for (let i = 0; i < labelOptions.length; i += 1) {
        if (selectedOption.text === labelOptions[i].text && labelOptions[i].default === true) {
          contains = true;
          break;
        }
      }
      if (contains) {
        limitLabelOptions = false;
      }
    }
  }

  function sendLabelOptionToFront(id) {
    terminateLimitIfUsingDefault(id);
    const firstObjectRef = labelOptions[id];
    for (let i = id; i > 0; i -= 1) {
      labelOptions[i] = labelOptions[i - 1];
    }
    labelOptions[0] = firstObjectRef;
  }


  function randomLightnessValue() {
    return Math.floor(Math.random() * (70 - 40) + 40);
  }

  function randomSaturationValue() {
    return Math.floor(Math.random() * (100 - 70) + 70);
  }

  function randomHueValue() {
    return Math.floor(Math.random() * (360 - 0) + 0);
  }

  function getDefaultShapeColor() {
    const rawHslColor = getNewShapeColor();
    const defaultFill = `${rawHslColor},0.01)`;
    const highlightFill = `${rawHslColor},0.3)`;
    const strokeFill = `${rawHslColor})`;
    const labelOptionFill = `${rawHslColor},0.28)`;
    return {
      default: defaultFill,
      highlight: highlightFill,
      stroke: strokeFill,
      label: labelOptionFill,
    };
  }

  function getRandomlyGeneratedShapeColor() {
    const hue = randomHueValue();
    const saturation = randomSaturationValue();
    const lightness = randomLightnessValue();
    const defaultFill = `hsl(${hue},${saturation}%,${lightness}%,0.01)`;
    const highlightFill = `hsl(${hue},${saturation}%,${lightness}%,0.3)`;
    const strokeFill = `hsl(${hue},${saturation}%,${lightness}%)`;
    const labelOptionFill = `hsl(${hue},${saturation}%,${lightness}%, 0.25)`;
    return {
      default: defaultFill,
      highlight: highlightFill,
      stroke: strokeFill,
      label: labelOptionFill,
    };
  }

  function getFirstNewLabelColor() {
    defaultShapeColorIndex += 1;
    return {
      default: 'hsl(154, 98%, 54%,0.01)', highlight: 'hsl(154, 98%, 54%,0.3)', stroke: 'hsl(154, 98%, 54%)', label: 'hsl(154, 98%, 54%,0.28)',
    };
  }

  function generateRandomHSLColor() {
    if (defaultShapeColorIndex === 0) {
      return getFirstNewLabelColor();
    }
    if (defaultShapeColorIndex < defaultShapeColors.length) {
      return getDefaultShapeColor();
    }
    return getRandomlyGeneratedShapeColor();
  }

  function addToLabelOptions(text) {
    let foundAtIndex;
    for (let i = 0; i < labelOptions.length; i += 1) {
      if (labelOptions[i].text === text) {
        foundAtIndex = i;
        break;
      }
    }
    if (foundAtIndex !== undefined) {
      sendLabelOptionToFront(foundAtIndex);
    } else {
      const color = generateRandomHSLColor();
      labelOptions.unshift({ text, color });
      if (limitLabelOptions && (labelOptions.length > maxLabelOptions)) {
        labelOptions.pop();
        numberOfRemovedOptions += 1;
        if (numberOfRemovedOptions === 5) {
          limitLabelOptions = false;
        }
      }
    }
  }

  function getLabelOptions() {
    return labelOptions;
  }

  function getLabelColor(text) {
    for (let i = 0; i < labelOptions.length; i += 1) {
      if (labelOptions[i].text === text) {
        return labelOptions[i].color;
      }
    }
    return { highlight: 'hsl(0, 100%, 50%, 0.2)', default: 'hsl(0, 100%, 50%, 0.01)' };
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  shuffle(defaultShapeColors);

  const QUICK_LIGHTUP_MILLISECONDS = 200;
  const SLOW_LIGHTUP_MILLISECONDS = 500;
  const QUICK_DIM_SECONDS = 0.25;
  const SLOW_DIM_SECONDS = 0.5;
  const THICK_DIM = 'rgba(0,0,0,0.25)';
  const THIN_DIM = 'rgba(0,0,0,0.09)';

  let windowDimElement = null;
  let canvas$p = null;

  function initiateLightUp(transitionDurationMilliseconds) {
    windowDimElement.style.backgroundColor = 'rgba(0,0,0,0)';
    window.setTimeout(() => {
      windowDimElement.style.position = 'unset';
      // if the mouse is not refreshing correctly, consider setting a timeout for dispatch event
      canvas$p.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    }, transitionDurationMilliseconds);
  }

  function overrideLightUpIfSpecialState() {
    // if the modal is not being closed fast enough for the crosshair, consider setting this to 0 and
    // using a lighter dim color - previous findings may favour such case for upload and ML modals
    if (getCrosshairUsedOnCanvasState()) {
      initiateLightUp(QUICK_LIGHTUP_MILLISECONDS);
      return true;
    }
    return false;
  }

  function lightUpWindow(transitionDurationMilliseconds, overrideMode) {
    const overriden = overrideLightUpIfSpecialState();
    if (overriden) return;
    initiateLightUp(transitionDurationMilliseconds);
  }

  function initiateDim(transitionDurationSeconds, backgroundColor) {
    windowDimElement.style.transitionDuration = `${transitionDurationSeconds}s`;
    windowDimElement.style.MozTransitionDuration = `${transitionDurationSeconds}s`;
    windowDimElement.style.position = 'absolute';
    windowDimElement.style.backgroundColor = backgroundColor;
  }

  function overrideDimIfSpecialState() {
    if (getCrosshairUsedOnCanvasState()) {
      initiateDim(QUICK_DIM_SECONDS, THIN_DIM);
      return true;
    }
    return false;
  }

  function dimWindow(transitionDurationSeconds, backgroundColor) {
    const overriden = overrideDimIfSpecialState();
    if (overriden) return;
    initiateDim(transitionDurationSeconds, backgroundColor);
  }

  function assignCanvasToDimWindowService(canvasObj) {
    canvas$p = canvasObj;
  }

  function addMouseMoveEventListener() {
    windowDimElement.addEventListener('mousemove', onMouseMoveEvent);
  }

  function assignLocalVariables$1() {
    windowDimElement = document.getElementById('window-dim');
  }

  function initialiseWindowDimService() {
    assignLocalVariables$1();
    addMouseMoveEventListener();
  }

  let parentElement = null;
  let optionsElement$1 = null;
  let submitButtonElement$2 = null;
  let inputElement = null;
  let defaultListHeightPx = 0;
  let addNewLabelDeltaHeight = 0;
  let currentListHeightPx = null;
  let heightIncreasedForNewLabel = false;
  let heightIncreasedForHorizontalScrollbar = false;
  let horizontalScrollSet = false;
  let fakeRightBorderAdded = false;
  let fakeBottomBorderAdded = false;
  let lightupTimePeriod = QUICK_LIGHTUP_MILLISECONDS;
  let dimTimePeriod = QUICK_DIM_SECONDS;
  let dimIntensity = THIN_DIM;
  let optionsListBorderWidth = 1;

  function initialiseParentElement$1() {
    return document.createElement('div');
  }

  function addLabelToList(labelText, color) {
    const labelElement = initialiseParentElement$1();
    labelElement.innerHTML = `<div class="labelDropdownOption" ondblclick="labelShape()" onmousedown="selectLabelOption(innerHTML, this, '${color}')">${labelText}</div>`;
    const newRow = optionsElement$1.insertRow(-1);
    const cell = newRow.insertCell(0);
    cell.onmouseenter = window.mouseEnterLabelDropdownOption.bind(this, cell, color);
    cell.onmouseleave = window.mouseLeaveLabelDropdownOption.bind(this, cell, false);
    cell.appendChild(labelElement);
  }

  function isVerticalScrollPresent$1() {
    return optionsElement$1.scrollHeight
    > optionsElement$1.clientHeight;
  }

  function isHorizontalScrollPresent$3() {
    return optionsElement$1.scrollWidth
    > optionsElement$1.clientWidth;
  }

  function addFakeRightBorder$1() {
    if (fakeRightBorderAdded) return;
    const chromiumFakeRightBorderFixElement = document.getElementById('chromium-fake-popup-table-right-border-fix');
    chromiumFakeRightBorderFixElement.style.height = `${currentListHeightPx}px`;
    chromiumFakeRightBorderFixElement.style.display = '';
    chromiumFakeRightBorderFixElement.style.right = getScreenSizeDelta() > 1.000001 ? `${9 / getScreenSizeDelta()}px` : '9.8px';
    fakeRightBorderAdded = true;
  }

  function addFakeBottomBorder$1() {
    if (fakeBottomBorderAdded) return;
    const chromiumFakeBottomBorderFixElement = document.getElementById('chromium-fake-popup-table-bottom-border-fix');
    const modalTitleElementHeight = document.getElementById('labeller-modal-title').getBoundingClientRect().height;
    const inputElementHeight = inputElement.getBoundingClientRect().height;
    const heightOfElementsAboveOptionsList = modalTitleElementHeight + inputElementHeight;
    const optionsListHeight = optionsElement$1.getBoundingClientRect().height;
    const optionsListPaddingTopHeight = 2 / getScreenSizeDelta();
    chromiumFakeBottomBorderFixElement.style.top = `${Math.floor(heightOfElementsAboveOptionsList + optionsListHeight
    + (getScrollbarWidth() * 2) - optionsListPaddingTopHeight + optionsListBorderWidth)}px`;
    chromiumFakeBottomBorderFixElement.style.display = '';
    optionsElement$1.style.paddingBottom = '0px';
    fakeBottomBorderAdded = true;
  }

  // the following is a bug fix for chromium based browsers where the scroll bars
  // do not cover the edge of the table body, meaning that upon hovering on them;
  // the mouse over events would be triggered on the body below it.
  // In this case, it would be the table element highlighting and cursor change
  function addFakeBordersForChromium() {
    if (!IS_FIREFOX) {
      if (isVerticalScrollPresent$1()) {
        addFakeRightBorder$1();
      }
      if (isHorizontalScrollPresent$3()) {
        addFakeBottomBorder$1();
      }
    }
  }

  function setLabelOptionsHeight() {
    if (!horizontalScrollSet) {
      let newHeight = currentListHeightPx;
      if (!heightIncreasedForHorizontalScrollbar && isHorizontalScrollPresent$3()) {
        newHeight += getScrollbarWidth();
        currentListHeightPx = newHeight;
        heightIncreasedForHorizontalScrollbar = true;
        horizontalScrollSet = true;
      }
      optionsElement$1.style.height = `${newHeight}px`;
    }
  }

  // should be in label list
  function deleteAndAddLastRowToRefreshDiv() {
    const labelOptions = getLabelOptions();
    optionsElement$1.deleteRow(labelOptions.length - 1);
    if (!heightIncreasedForNewLabel && labelOptions.length >= 6) {
      currentListHeightPx = defaultListHeightPx + addNewLabelDeltaHeight;
      heightIncreasedForHorizontalScrollbar = false;
      heightIncreasedForNewLabel = true;
      setLabelOptionsHeight();
    }
    if (labelOptions.length === 7) {
      addLabelToList('temp horizontal');
    }
    window.setTimeout(() => {
      const label = labelOptions[labelOptions.length - 1];
      if (label) {
        addLabelToList(label.text, label.color.label);
      }
      if (labelOptions.length === 7) {
        optionsElement$1.deleteRow(6);
      }
    }, 0);
  }

  function resetLabelOptionsListScroll() {
    optionsElement$1.scrollTop = 0;
    optionsElement$1.scrollLeft = 0;
  }

  function getLabellerModalInputText() {
    return inputElement.value;
  }

  function highlightInitialLabelOptionOnInit() {
    window.labellerModalKeyDown({ key: 'stub' });
  }

  function hideLabellerModal() {
    lightUpWindow(lightupTimePeriod);
    parentElement.style.display = 'none';
    inputElement.value = inputElement.value.trim();
    setLabellerModalDisplayedState(false);
  }

  function validateFullLabellerModalVisibile(isWindowResized) {
    if (windowHasScrollbar()) {
      parentElement.style.top = '';
      parentElement.style.bottom = '5px';
    } else if (!isWindowResized) {
      parentElement.style.bottom = '';
    }
  }

  // fix for a bug where the options list item color would not fill to the very end
  // when delta is 1.1 and the width is 150px as an example
  function setOptionsElementWidth() {
    optionsElement$1.style.width = getScreenSizeDelta() > 1.0000001 ? '150.4px' : '165px';
  }

  function setListHeightVariables() {
    if (IS_FIREFOX) {
      defaultListHeightPx = Math.ceil(107.5 / getScreenSizeDelta());
      addNewLabelDeltaHeight = Math.ceil(21.5 / getScreenSizeDelta());
    } else {
      defaultListHeightPx = Math.ceil(105 / getScreenSizeDelta());
      addNewLabelDeltaHeight = Math.ceil(21 / getScreenSizeDelta());
    }
    currentListHeightPx = defaultListHeightPx;
  }

  function setLocalVariables$1() {
    inputElement = document.getElementById('labeller-modal-input');
    parentElement = document.getElementById('labeller-modal-parent');
    optionsElement$1 = document.getElementById('labeller-modal-options');
    submitButtonElement$2 = document.getElementById('labeller-modal-submit-button');
    optionsListBorderWidth = Number(getComputedStyle(optionsElement$1, null).getPropertyValue('border-left-width').replace(/[^0-9.]+/g, ''));
    setListHeightVariables();
  }

  function initialiseLabellerModalOptionsList() {
    setLocalVariables$1();
    getLabelOptions().forEach((option) => {
      addLabelToList(option.text, option.color.label);
    });
    setOptionsElementWidth();
  }

  function purgeOptionsFromLabelElement() {
    optionsElement$1.innerHTML = '';
  }

  function changeStyleWhenInputEmpty() {
    submitButtonElement$2.style.backgroundColor = '';
    setTimeout(() => {
      submitButtonElement$2.classList.replace('popup-label-button', 'popup-label-button-disabled');
    });
  }

  function changeStyleWhenInputInvalid() {
    submitButtonElement$2.style.backgroundColor = '';
  }

  function changeStyleToAllowSubmit() {
    submitButtonElement$2.style.backgroundColor = 'rgb(169, 169, 205)';
    setTimeout(() => {
      submitButtonElement$2.classList.replace('popup-label-button-disabled', 'popup-label-button');
    });
  }

  function resetLabellerModalOptions() {
    purgeOptionsFromLabelElement();
    getLabelOptions().forEach((label) => {
      addLabelToList(label.text, label.color.label);
    });
  }

  function showLabellerModal() {
    dimWindow(dimTimePeriod, dimIntensity);
    const lastMouseMoveEvent = getLastMouseMoveEvent();
    parentElement.style.top = `${lastMouseMoveEvent.clientY}px`;
    parentElement.style.left = `${lastMouseMoveEvent.clientX}px`;
    deleteAndAddLastRowToRefreshDiv();
    parentElement.style.display = 'block';
    setLabelOptionsHeight();
    addFakeBordersForChromium();
    resetLabelOptionsListScroll();
    validateFullLabellerModalVisibile();
    setLabellerModalDisplayedState(true);
    window.setTimeout(() => {
      inputElement.select();
      highlightInitialLabelOptionOnInit();
    }, 0);
  }

  function setLabellerPopupDimProperties(lightupTimePeriodArg, dimTimePeriodArg, dimIntensityArg) {
    lightupTimePeriod = lightupTimePeriodArg;
    dimTimePeriod = dimTimePeriodArg;
    dimIntensity = dimIntensityArg;
  }

  const labelProperties = {};

  let fontSize = 20;
  let polygonLabelTop = 0;
  let polygonOffsetLeft = 10;
  let polygonOffsetTop = 12;

  function setZoomInProperties$2(fontRatio) {
    fontSize -= fontSize * fontRatio;
    polygonLabelTop += 0.5;
  }

  function setZoomOutProperties$2(fontRatio) {
    fontSize *= fontRatio;
    polygonLabelTop -= 0.5;
  }

  function getLabelProps(coordinates, attachedShape) {
    const returnObj = {
      fontSize,
      fill: 'yellow',
      left: coordinates.left,
      top: coordinates.top,
      shapeName: 'label',
      attachedShape,
      hasControls: false,
      selectable: false,
      hasBorders: false,
      objectCaching: false,
      evented: false,
    };
    return returnObj;
  }

  function generatePolygonOffsetProperties() {
    return {
      left: polygonOffsetLeft,
      top: polygonOffsetTop - polygonLabelTop,
    };
  }

  function updatePolygonOffsetProperties(newOffsetRatio) {
    polygonOffsetLeft *= newOffsetRatio.width;
    polygonOffsetTop *= newOffsetRatio.height;
  }

  function setPolygonOffsetProperties(newOffsetData) {
    polygonOffsetLeft = newOffsetData.width;
    polygonOffsetTop = newOffsetData.height;
  }

  function generateBoundingBoxOffsetProperties() {
    return {
      left: 2,
    };
  }

  (function setProperties() {
    labelProperties.pointOffsetProperties = generatePolygonOffsetProperties;
    labelProperties.boundingBoxOffsetProperties = generateBoundingBoxOffsetProperties;
    labelProperties.getLabelProps = getLabelProps;
    labelProperties.setZoomInProperties = setZoomInProperties$2;
    labelProperties.setZoomOutProperties = setZoomOutProperties$2;
    labelProperties.updatePolygonOffsetProperties = updatePolygonOffsetProperties;
    labelProperties.setPolygonOffsetProperties = setPolygonOffsetProperties;
  }());

  let canvas$o = null;
  // be careful about this as we will need to look into doing this for multiple
  let labelObjects = {};

  function addLabelRef(labelObj, id) {
    labelObjects[id] = labelObj;
  }

  function getLabelById(id) {
    return labelObjects[id];
  }

  function removeLabel(id) {
    canvas$o.remove(labelObjects[id]);
    delete labelObjects[id];
  }

  function setPolygonLabelOffsetProps(polygon, point) {
    polygon.labelOffsetLeft = polygon.left
      - (point.x - labelProperties.pointOffsetProperties().left);
    polygon.labelOffsetTop = polygon.top
      - (point.y - labelProperties.pointOffsetProperties().top);
  }

  function changeLabelText(id, text) {
    labelObjects[id].text = text;
    canvas$o.renderAll();
  }

  function changeVisibilityButtonActiveFlagById(id) {
    labelObjects[id].visibilityButtonActive = !labelObjects[id].visibilityButtonActive;
  }

  function changeLabelVisibilityById(id) {
    labelObjects[id].visible = !labelObjects[id].visible;
    canvas$o.renderAll();
  }

  function setAllLabelsVisibilityProperty(state) {
    Object.keys(labelObjects).forEach((label) => {
      if (!labelObjects[label].visibilityButtonActive) {
        labelObjects[label].visible = state;
      }
    });
    canvas$o.renderAll();
  }

  function assignCanvasForLabelManipulation(canvasObj) {
    canvas$o = canvasObj;
  }

  function removeAllLabelRefs() {
    labelObjects = {};
  }

  function retrieveAllLabelRefs() {
    const labelRefs = {};
    Object.keys(labelObjects).forEach((key) => {
      labelRefs[key] = labelObjects[key];
      canvas$o.remove(labelObjects[key]);
    });
    return labelRefs;
  }

  const polygonProperties$1 = {};
  let pointStrokedWidth = 0.6;
  let augmentPolygonPointRadius = 4.1;
  let defaultPointRadius = 3.5;
  let invisiblePointRadius = 3.9;
  let disabledNewPointRadius = 3.7;
  let disabledAddPointRadius = 3;
  let disabledRemovePointRadius = 3.7;
  let newPolygonStrokeWidth = 4;
  let tempPolygonStrokeWidth = 2;
  let newLineStrokeWidth = 2;
  let polygonPadding = 0;

  // polygonProperties.disabledRemovePoint
  function generateDisabledRemovePoint() {
    return {
      fill: 'black',
      radius: disabledRemovePointRadius,
    };
  }

  // polygonProperties.disabledRemoveLinePoint
  function generateDisabledRemoveLinePoint() {
    return {
      previousShapeName: 'newLine',
      fill: 'black',
      radius: disabledRemovePointRadius,
      lockMovementX: true,
      lockMovementY: true,
      selectable: false,
    };
  }

  // polygonProperties.removablePoint = generateRemovablePoint;
  // have not found when it is executed
  function generateRemovablePoint() {
    return {
      radius: augmentPolygonPointRadius,
      fill: 'red',
      selectable: true,
    };
  }

  // Line
  // polygonProperties.removableLinePoint = generateRemovableLinePoint;
  function generateRemovableLinePoint(pointId, pointCoordinates, totalPointNumber) {
    const returnObj = {
      radius: augmentPolygonPointRadius,
      fill: 'red',
      stroke: '#133333',
      strokeWidth: pointStrokedWidth,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'point',
      previousShapeName: 'newLine',
      objectCaching: false,
      pointId,
      perPixelTargetFind: true,
      lockMovementX: true,
      lockMovementY: true,
      hoverCursor: 'default',
    };
    if (pointCoordinates) {
      returnObj.left = pointCoordinates.x;
      returnObj.top = pointCoordinates.y;
      if (totalPointNumber < 5) {
        returnObj.fill = 'black';
        returnObj.radius = disabledNewPointRadius;
      }
    }
    return returnObj;
  }

  // Polygon
  // polygonProperties.removablePolygonPoint = generateRemovablePolygonPoint;
  // executed after hitting Remove points
  function generateRemovablePolygonPoint(pointId, pointCoordinates, totalPointNumber) {
    const returnObj = {
      radius: augmentPolygonPointRadius,
      fill: 'red',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'point',
      previousShapeName: 'polygon',
      objectCaching: false,
      pointId,
      perPixelTargetFind: true,
      lockMovementX: true,
      lockMovementY: true,
      hoverCursor: 'default',
    };
    if (pointCoordinates) {
      returnObj.left = pointCoordinates.x;
      returnObj.top = pointCoordinates.y;
      if (totalPointNumber < 4) {
        returnObj.fill = 'black';
        returnObj.radius = disabledNewPointRadius;
      }
    }
    return returnObj;
  }

  function generateSelectedStartingAddPoint() {
    return {
      shapeName: 'initialAddPoint',
      radius: defaultPointRadius,
    };
  }

  function getPolygonAlignmentAfterPointMove() {
    return polygonPadding;
  }

  // executed if to hit remove points button while drawing polygon
  function changeRemovablePointToTemp(pointId) {
    return {
      radius: defaultPointRadius,
      fill: '#ffffff',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      selectable: true,
      shapeName: 'tempPoint',
      pointId,
      lockMovementX: false,
      lockMovementY: false,
      hoverCursor: 'move',
    };
  }

  // polygonProperties.defaultPoint = generateDefaultPoint;
  // if to click Edit Shape after points being red or green
  function generateDefaultPoint() {
    return {
      fill: 'blue',
      radius: defaultPointRadius,
      hoverCursor: 'move',
    };
  }

  // polygonProperties.defaultLinePoint = generateDefaultLinePoint;
  function generateDefaultLinePoint() {
    return {
      lockMovementX: true,
      lockMovementY: true,
      fill: 'blue',
      radius: defaultPointRadius,
      hoverCursor: 'move',
    };
  }

  // Line
  // polygonProperties.existingPolygonPoint = generateExistingPolygonPoint;
  // executed after hitting Edit button, only for line and polygon
  // after selecting shape by mouse click
  function generateExistingLinePoint(pointId, pointCoordinates) {
    return {
      lockMovementX: true,
      lockMovementY: true,
      radius: defaultPointRadius,
      fill: 'blue',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      left: pointCoordinates.x,
      top: pointCoordinates.y,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'point',
      previousShapeName: 'newLine',
      objectCaching: false,
      pointId,
      perPixelTargetFind: true,
      hoverCursor: 'move',
    };
  }

  // Polygon
  // polygonProperties.existingPolygonPoint = generateExistingPolygonPoint;
  // executed after hitting Edit button, only for line and polygon
  // after selecting shape by mouse click
  function generateExistingPolygonPoint(pointId, pointCoordinates) {
    return {
      radius: defaultPointRadius,
      fill: 'blue',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      left: pointCoordinates.x,
      top: pointCoordinates.y,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'point',
      previousShapeName: 'polygon',
      objectCaching: false,
      pointId,
      perPixelTargetFind: true,
      hoverCursor: 'move',
    };
  }

  // line
  // polygonProperties.startingAddLinePoint = generatestartingAddLinePoint;
  // Executed after hitting/tapping Add points button, and after adding the last additional point for polygon
  function generatestartingAddLinePoint(pointId, pointCoordinates) {
    const returnObj = {
      radius: augmentPolygonPointRadius,
      fill: 'green',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'point',
      previousShapeName: 'newLine',
      objectCaching: false,
      pointId,
      perPixelTargetFind: true,
      lockMovementX: true,
      lockMovementY: true,
    };
    if (pointCoordinates) {
      returnObj.left = pointCoordinates.x;
      returnObj.top = pointCoordinates.y;
    }
    return returnObj;
  }

  // polygon
  // polygonProperties.startingAddPolygonPoint = generatestartingAddPolygonPoint;
  // Executed after hitting/tapping Add points button, and after adding the last additional point for polygon
  function generatestartingAddPolygonPoint(pointId, pointCoordinates) {
    const returnObj = {
      radius: augmentPolygonPointRadius,
      fill: 'green',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'point',
      previousShapeName: 'polygon',
      objectCaching: false,
      pointId,
      perPixelTargetFind: true,
      lockMovementX: true,
      lockMovementY: true,
    };
    if (pointCoordinates) {
      returnObj.left = pointCoordinates.x;
      returnObj.top = pointCoordinates.y;
    }
    return returnObj;
  }

  // executed to define all points of polygons, except the initial point
  function generateAdditionalPoint() {
    return {
      fill: 'green',
      radius: augmentPolygonPointRadius,
      hoverCursor: 'default',
    };
  }

  function generateNewLine() {
    return {
      strokeWidth: newLineStrokeWidth,
      fill: '#999999',
      stroke: '#999999',
      class: 'line',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      objectCaching: false,
      shapeName: 'addPointsLine',
    };
  }

  // Executed while drawing polygon's or line's temporary points.
  // The PointId starts from 0 for Polygon.
  // However, after drawing line the queue of pointId continue both for line and polygon.
  // That means after finishing drawing polygon the pointId = 0.
  function generateNewPoint(pointId, pointer, isNewPoint) {
    return {
      radius: defaultPointRadius,
      fill: '#ffffff',
      stroke: '#333333',
      strokeWidth: pointStrokedWidth,
      left: pointer.x,
      top: pointer.y,
      selectable: true,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      shapeName: 'tempPoint',
      pointId,
      objectCaching: false,
      hoverCursor: isNewPoint ? 'default' : 'move',
    };
  }

  // executed to draw first point for polygon
  // executed to draw each point for line
  function generateInvisiblePoint(pointer) {
    if (getTestDrawLineState()){
      return {
        previousShapeName: 'newLine',
        radius: invisiblePointRadius,
        fill: 'green',
        stroke: '#333333',
        left: pointer.x,
        top: pointer.y,
        selectable: true,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
        shapeName: 'invisiblePoint',
        objectCaching: false,
        opacity: 0,
        hoverCursor: 'default',
        lockMovementX: true,
        lockMovementY: true,
      };
    }
    else {
      setTestDrawLineState(false);
      return {
        previousShapeName: 'polygon',
        radius: invisiblePointRadius,
        fill: 'green',
        stroke: '#333333',
        left: pointer.x,
        top: pointer.y,
        selectable: true,
        hasBorders: false,
        hasControls: false,
        originX: 'center',
        originY: 'center',
        shapeName: 'invisiblePoint',
        objectCaching: false,
        opacity: 0,
        hoverCursor: 'default',
      };
    }
  }

  // Only for polygon's first point
  function generateNewFirstPoint() {
    return {
      previousShapeName: 'polygon',
      fill: 'red',
      shapeName: 'firstPoint',
      lockMovementX: true,
      lockMovementY: true,
    };
  }

  // handles invocation of on initial point for adding points
  // each points becomes white
  function generateDisabledAddPoint() {
    return {
      fill: 'white',
      radius: disabledAddPointRadius,
    };
  }

  function setZoomInProperties$1(pointRatio, polygonRatio) {
    defaultPointRadius -= defaultPointRadius * pointRatio;
    pointStrokedWidth -= pointStrokedWidth * pointRatio;
    augmentPolygonPointRadius -= augmentPolygonPointRadius * pointRatio;
    invisiblePointRadius -= invisiblePointRadius * pointRatio;
    disabledNewPointRadius -= disabledNewPointRadius * pointRatio;
    disabledAddPointRadius -= disabledAddPointRadius * pointRatio;
    disabledRemovePointRadius -= disabledRemovePointRadius * pointRatio;
    newPolygonStrokeWidth -= newPolygonStrokeWidth * polygonRatio;
    tempPolygonStrokeWidth -= tempPolygonStrokeWidth * polygonRatio;
    newLineStrokeWidth -= newLineStrokeWidth * polygonRatio;
    polygonPadding += 0.05;
  }

  function setZoomOutProperties$1(pointRatio, polygonRatio) {
    pointStrokedWidth *= pointRatio;
    augmentPolygonPointRadius *= polygonRatio;
    defaultPointRadius *= pointRatio;
    invisiblePointRadius *= pointRatio;
    disabledNewPointRadius *= pointRatio;
    disabledAddPointRadius *= pointRatio;
    disabledRemovePointRadius *= pointRatio;
    newPolygonStrokeWidth *= polygonRatio;
    tempPolygonStrokeWidth *= polygonRatio;
    newLineStrokeWidth *= polygonRatio;
    polygonPadding -= 0.05;
  }

  // after 'enter' generates Polygon,
  // in addition, reacts on moving line or polygon
  function generateNewPolygon$2() {
    if (!getTestDrawLineState()) {
      setTestDrawLineState(false);
      return {
        previousShapeName: 'polygon',
        stroke: 'hsla(186, 8%, 50%, 1)',
        strokeWidth: newPolygonStrokeWidth,
        fill: 'rgba(237, 237, 237, 0.01)',
        perPixelTargetFind: true,
        hasBorders: false,
        hasControls: false,
        shapeName: 'polygon',
        selectable: false,
        evented: true,
        objectCaching: false,
        numberOfNullPolygonPoints: 0,
      };
    }
    /// Line Mode
    if (getTestDrawLineState()) {
      setTestDrawLineState(false);
      return {
        previousShapeName: 'newLine',
        stroke: 'hsla(186, 8%, 50%, 1)',
        strokeWidth: newPolygonStrokeWidth,
        fill: 'rgba(237, 237, 237, 0.01)',
        perPixelTargetFind: true,
        hasBorders: false,
        hasControls: false,
        shapeName: 'polygon',
        //selectable: false,
        evented: true,
        objectCaching: false,
        numberOfNullPolygonPoints: 0,
        lockMovementX: true,
        lockMovementY: true,
      };
    }
  }

  // executed for generating temporary points while drawing line or polygon
  function generateNewTempPolygon() {
    if (!getTestDrawLineState()) {
      return {
        previousShapeName: 'polygon',
        stroke: '#333333',
        strokeWidth: tempPolygonStrokeWidth,
        fill: '#cccccc',
        opacity: 0.3,
        //selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
        objectCaching: false,
        numberOfNullPolygonPoints: 0,
        shapeName: 'tempPolygon',
      };
    }
    /// Line Mode
    if (getTestDrawLineState()) {
      //setTestDrawLineState(false);
      return {
        previousShapeName: 'newLine',
        stroke: '#F50A3D',
        strokeWidth: tempPolygonStrokeWidth,
        //fill: '#cccccc',
        //opacity: 0,
        //selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
        objectCaching: false,
        numberOfNullPolygonPoints: 0,
        shapeName: 'tempPolygon',
        lockMovementX: true,
        lockMovementY: true,
      };
    }
  }

  (function setProperties() {
    polygonProperties$1.newPolygon = generateNewPolygon$2;
    polygonProperties$1.newTempPolygon = generateNewTempPolygon;
    polygonProperties$1.newLine = generateNewLine;
    polygonProperties$1.firstPoint = generateNewFirstPoint;
    polygonProperties$1.additionalPoint = generateAdditionalPoint;
    polygonProperties$1.disabledAddPoint = generateDisabledAddPoint;
    polygonProperties$1.selectedStartingAddPoint = generateSelectedStartingAddPoint;
    polygonProperties$1.newPoint = generateNewPoint;
    polygonProperties$1.invisiblePoint = generateInvisiblePoint;
    polygonProperties$1.changeRemovablePointToTemp = changeRemovablePointToTemp;
    polygonProperties$1.existingPolygonPoint = generateExistingPolygonPoint;
    polygonProperties$1.existingLinePoint = generateExistingLinePoint;
    polygonProperties$1.defaultPoint = generateDefaultPoint;
    polygonProperties$1.defaultLinePoint = generateDefaultLinePoint;
    polygonProperties$1.removablePolygonPoint = generateRemovablePolygonPoint;
    polygonProperties$1.removableLinePoint = generateRemovableLinePoint;
    polygonProperties$1.disabledRemovePoint = generateDisabledRemovePoint;
    polygonProperties$1.disabledRemoveLinePoint = generateDisabledRemoveLinePoint;
    polygonProperties$1.removablePoint = generateRemovablePoint;
    polygonProperties$1.startingAddPolygonPoint = generatestartingAddPolygonPoint;
    polygonProperties$1.startingAddLinePoint = generatestartingAddLinePoint;
    polygonProperties$1.setZoomInProperties = setZoomInProperties$1;
    polygonProperties$1.setZoomOutProperties = setZoomOutProperties$1;
    polygonProperties$1.getPolygonAlignmentAfterPointMove = getPolygonAlignmentAfterPointMove;
  }());

  function sendPolygonPointsToFrontImpl(canvas, polygonPoints) {
    canvas.discardActiveObject();
    polygonPoints.forEach((point) => {
      if (point) {
        canvas.bringToFront(point);
      }
    });
  }

  function removePolygonPointsImpl(canvas, polygonPoints) {
    if (polygonPoints) {
      if ((polygonPoints.length !== 0)) {
        polygonPoints.forEach((point) => {
          canvas.remove(point);
        });
        canvas.renderAll();
        return [];
      }
      return polygonPoints;
    }
  }

  function removePolygonImpl(canvas, polygon) {
    const polygonId = polygon.id;
    removeShape(polygonId);
    removeLabel(polygonId);
  }

  function prepareObjectsForEditablePolygonPoints(object, isDrawing) {
    if (isDrawing) {
      if (object.shapeName !== 'bndBox') {
        object.perPixelTargetFind = true;
      }
    }
    if (object.shapeName === 'bndBox') {
      object.selectable = false;
    } else {
      object.lockMovementX = true;
      object.lockMovementY = true;
    }
  }

  function setObjectPropertiesToDefault(object) {
    if (getMovableObjectsState() || (object.shapeName !== 'bndBox' && object.shapeName !== 'polygon')) {
      object.lockMovementX = false;
      object.lockMovementY = false;
      object.hoverCursor = 'move';
    } else if (object.shapeName === 'bndBox') {
      object.lockMovementX = true;
      object.lockMovementY = true;
      object.hoverCursor = 'default';
    }
    object.selectable = true;
  }

  function setObjectsHoverCursorToDefault(canvas) {
    canvas.forEachObject((iteratedObj) => {
      iteratedObj.hoverCursor = 'default';
    });
  }

  function resetPolygonSelectableArea$1(currentPolygon) {
    const newPosition = currentPolygon._calcDimensions();
    currentPolygon.set({
      left: newPosition.left,
      top: newPosition.top,
      height: newPosition.height,
      width: newPosition.width,
      pathOffset: {
        x: newPosition.left + newPosition.width / 2,
        y: newPosition.top + newPosition.height / 2,
      },
    });
    currentPolygon.setCoords();
  }

  function crosshair(object, canvas) {
    if (object.orientation === 'x') {
      object.set({ y2: canvas.height });
    } else if (object.orientation === 'y') {
      object.set({ x2: canvas.width });
    }
  }

  function resizeAllObjectsDimensionsByDoubleScale(newFileSizeRatio, canvas) {
    canvas.forEachObject((object) => {
      switch (object.shapeName) {
        case 'polygon':
          object.points.forEach((point) => {
            point.x *= newFileSizeRatio.width;
            point.y *= newFileSizeRatio.height;
          });
          resetPolygonSelectableArea$1(object);
          setPolygonLabelOffsetProps(object, object.points[0]);
          break;
        case 'tempPolygon':
          object.points.forEach((point) => {
            point.x *= newFileSizeRatio.width;
            point.y *= newFileSizeRatio.height;
          });
          break;
        case 'point':
        case 'invisiblePoint':
        case 'firstPoint':
        case 'tempPoint':
        case 'initialAddPoint':
        case 'label':
          object.top *= newFileSizeRatio.height;
          object.left *= newFileSizeRatio.width;
          break;
        case 'addPointsLine':
          object.top *= newFileSizeRatio.height;
          object.left *= newFileSizeRatio.width;
          object.height *= newFileSizeRatio.height;
          object.width *= newFileSizeRatio.width;
          object.x1 *= newFileSizeRatio.width;
          object.x2 *= newFileSizeRatio.width;
          object.y1 *= newFileSizeRatio.height;
          object.y2 *= newFileSizeRatio.height;
          break;
        case 'bndBox':
          object.height *= newFileSizeRatio.height;
          object.width *= newFileSizeRatio.width;
          object.top *= newFileSizeRatio.height;
          object.left *= newFileSizeRatio.width;
          break;
      }
      if (object.shapeName === 'crosshairLine') {
        crosshair(object, canvas);
      } else {
        object.setCoords();
      }
    });
    canvas.renderAll();
  }

  function resizeLabelDimensionsBySingleScale(object, newFileSizeRatio) {
    object.top *= newFileSizeRatio;
    object.left *= newFileSizeRatio;
  }

  function resizeAllPassedObjectsDimensionsBySingleScale(object, newFileSizeRatio) {
    switch (object.shapeName) {
      case 'polygon':
        object.points.forEach((point) => {
          point.x *= newFileSizeRatio;
          point.y *= newFileSizeRatio;
        });
        resetPolygonSelectableArea$1(object);
        setPolygonLabelOffsetProps(object, object.points[0]);
        break;
      case 'tempPolygon':
        object.points.forEach((point) => {
          point.x *= newFileSizeRatio;
          point.y *= newFileSizeRatio;
        });
        break;
      case 'point':
      case 'invisiblePoint':
      case 'firstPoint':
      case 'tempPoint':
      case 'initialAddPoint':
      case 'label':
        resizeLabelDimensionsBySingleScale(object, newFileSizeRatio);
        break;
      case 'addPointsLine':
        object.top *= newFileSizeRatio;
        object.left *= newFileSizeRatio;
        object.height *= newFileSizeRatio;
        object.width *= newFileSizeRatio;
        object.x1 *= newFileSizeRatio;
        object.x2 *= newFileSizeRatio;
        object.y1 *= newFileSizeRatio;
        object.y2 *= newFileSizeRatio;
        break;
      case 'bndBox':
        object.height *= newFileSizeRatio;
        object.width *= newFileSizeRatio;
        object.top *= newFileSizeRatio;
        object.left *= newFileSizeRatio;
        break;
    }
    object.setCoords();
  }

  // when the line or polygon is clicked for
  // editing;
  // removing;
  // adding
  function displayPolygonPointsWithStyleImpl(canvas, polygon, polygonPointsProps) {
    setCreateNewLineToDefault();
    let pointId = 0;
    const polygonPoints = [];
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
            //selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            previousShapeName: 'newLine',
          });
        }
      }
    }
    return polygonPoints;
  }

  function changePolygonPointsToWaitForAddingFirstPointImpl(canvas, startingPoint) {
    canvas.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName === 'point') {
        iteratedObj.set(polygonProperties$1.disabledAddPoint());
      } else if (iteratedObj.shapeName === 'polygon' || iteratedObj.shapeName === 'bndBox') {
        iteratedObj.hoverCursor = 'crosshair';
      }
      iteratedObj.selectable = false;
    });
    startingPoint.set(polygonProperties$1.selectedStartingAddPoint());
    canvas.renderAll();
  }

  // handles invocation of removing points process during drawing new polygon
  function changeDrawingPolygonPointsToRemovableImpl(canvas, polygon) {
    let pointId = 0;
    const polygonPoints = [];

    if (polygon.previousShapeName === 'polygon') {
      canvas.forEachObject((iteratedObj) => {
        if (iteratedObj.shapeName === 'tempPoint' || iteratedObj.shapeName === 'firstPoint') {
          iteratedObj.set(polygonProperties$1.removablePolygonPoint(pointId));
          polygonPoints.push(iteratedObj);
          pointId += 1;
        }
      });
      if (polygonPoints.length < 4) {
        polygonPoints.forEach((point) => {
          point.set(polygonProperties$1.disabledRemovePoint());
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
        iteratedObj.set(polygonProperties$1.additionalPoint());
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
          iteratedObj.set(polygonProperties$1.defaultPoint());
        }
      });
    }
  }

  function changeObjectsToPolygonPointsRemovaleImpl(canvas) {
    const isDrawing = !(getDefaultState() || getAddingPolygonPointsState());
    const polygonPoints = [];
    let linePoints = false;
    if (canvas) {
      canvas.forEachObject((iteratedObj) => {

        prepareObjectsForEditablePolygonPoints(iteratedObj, isDrawing);
        if ( (iteratedObj.shapeName === 'point') ){

          if (iteratedObj.previousShapeName !== 'newLine')
          {
            iteratedObj.set(polygonProperties$1.removablePoint());
            polygonPoints[iteratedObj.pointId] = iteratedObj;
          }

          // Line mode
          else {
            iteratedObj.set(polygonProperties$1.removablePoint());
            polygonPoints[iteratedObj.pointId] = iteratedObj;
            linePoints = true;
          }
        }
      });
    }

    // Polygon mode
    if ( (polygonPoints.length < 4) && (!linePoints) ){
      polygonPoints.forEach((point) => {
        point.set(polygonProperties$1.disabledRemovePoint());
      });
    }

    // line mode
    if ( (polygonPoints.length < 5) && (linePoints) ){
      polygonPoints.forEach((point) => {
        point.set(polygonProperties$1.disabledRemovePoint());
      });
    }

    canvas.renderAll();
    return polygonPoints;
  }

  function setAddPointsMode(canvas, startingPoint) {
    changePolygonPointsToWaitForAddingFirstPointImpl(canvas, startingPoint);
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';
  }

  let rightBoundingBoxDelta$3 = 0;

  function validateAndFixOutOfBoundsPolygonShapePointsAfterMove(polygon) {
    polygon.points.forEach((point) => {
      if (point.x < 0) { point.x = 0; }
      if (point.y < 0) { point.y = 0; }
    });
  }

  function preventRightOutOfBoundsBoundingBoxOnMove(shape, canvas) {
    if (shape.left + shape.width > canvas.width - rightBoundingBoxDelta$3) {
      shape.left = Math.floor(canvas.width - shape.width - rightBoundingBoxDelta$3);
    }
  }

  function preventRightOutOfBoundsPolygonOnMove(shape, canvas) {
    if (shape.left + shape.width > canvas.width - 1.8) {
      shape.left = Math.floor(canvas.width - shape.width - 1.8);
    }
  }

  function preventOutOfBoundsShapesOnMove(shape, canvas) {
    shape.setCoords();
    // multiple if statements because of corners
    if (getCurrentZoomState() > 1.00001) {
      const { height, width } = getImageProperties();
      const imageHeight = height * getCurrentZoomState();
      const imageWidth = width * getCurrentZoomState();
      // right
      if (shape.left + shape.width > imageWidth / getCurrentZoomState()
      - (getCurrentZoomState())) {
        shape.left = imageWidth / getCurrentZoomState() - shape.width - 2;
      }
      // bottom
      if (shape.top + shape.height > imageHeight / getCurrentZoomState()
      - getCurrentZoomState()) {
        shape.top = imageHeight / getCurrentZoomState() - shape.height - 2;
      }
    } else {
      // right
      if (shape.shapeName === 'bndBox') {
        preventRightOutOfBoundsBoundingBoxOnMove(shape, canvas);
      } else if (shape.shapeName === 'polygon') {
        preventRightOutOfBoundsPolygonOnMove(shape, canvas);
      }
      // bottom
      if (shape.top + shape.height > canvas.height - 2) {
        shape.top = canvas.height - shape.height - 2;
      }
    }
    // top
    if (shape.top < 0) {
      shape.top = 0;
    }
    // left
    if (shape.left < 0) {
      shape.left = 0;
    }
  }

  function preventOutOfBoundsPointsOnMove(shape, canvas) {
    shape.setCoords();
    // multiple if statements because of corners
    if (getCurrentZoomState() > 1.00001) {
      const { height, width } = getImageProperties();
      const imageHeight = height * getCurrentZoomState();
      const imageWidth = width * getCurrentZoomState();
      // right
      if (shape.left + shape.width / 2
        > imageWidth / getCurrentZoomState() + 0.75) {
        shape.left = imageWidth / getCurrentZoomState() - shape.width / 2;
      }
      // bottom
      if (shape.top + shape.height / 2
        > imageHeight / getCurrentZoomState() + 1) {
        shape.top = imageHeight / getCurrentZoomState() - shape.height / 2 + 1;
      }
    } else {
      // right
      if (shape.left + shape.width / 2 > canvas.width + 1.5) {
        shape.left = canvas.width - shape.width / 2 + 1.5;
      }
      // bottom
      if (shape.top + shape.height / 2 > canvas.height + 1.5) {
        shape.top = canvas.height - shape.height / 2 + 1.5;
      }
    }
    // top
    if (shape.top + shape.height / 2 < 0) {
      shape.top = 0;
    }
    // left
    if (shape.left + shape.width / 2 < 0) {
      shape.left = 0;
    }
  }

  function setRightBoundingBoxMovingDelta(delta) {
    rightBoundingBoxDelta$3 = delta;
  }

  // change - objectsProperties
  // follow pattern used in remove points
  function changeOjectPropertiesForChoosingInitialPoint(canvas, isDrawing) {
    canvas.forEachObject((iteratedObj) => {
      if (isDrawing) {
        if (iteratedObj.shapeName !== 'bndBox') {

          iteratedObj.perPixelTargetFind = true;
        }
      }

      if (iteratedObj.shapeName === 'bndBox') {
        iteratedObj.selectable = false;
      } else {
        iteratedObj.lockMovementX = true;
        iteratedObj.lockMovementY = true;
      }
      if (iteratedObj.shapeName === 'point') {
        iteratedObj.set(polygonProperties$1.additionalPoint());
      }
      iteratedObj.hoverCursor = 'default';
    });
    canvas.renderAll();
  }

  function setInitialStageOfAddPointsOnExistingPolygonMode(canvas) {
    const isDrawing = !(getDefaultState() || getAddingPolygonPointsState());
    changeOjectPropertiesForChoosingInitialPoint(canvas, isDrawing);
    canvas.defaultCursor = 'default';
    canvas.hoverCursor = 'default';
  }

  let currentPolygon = null;
  let polygonPoints$1 = [];
  let canvas$n = null;
  let polygonProperties = null;
  let movePolygonPointOffsetReduction = 0;

  ///////////
  function setObjets(polygonObj, polygonPointsArray, canvasObj, polygonPropertiesObj) {
    currentPolygon = polygonObj;
    polygonPoints$1 = polygonPointsArray;
    canvas$n = canvasObj;
    polygonProperties = polygonPropertiesObj;
  }
  // for building up the polygon only after moving
  function generateNewPolygon$1() {
    // Polygon edited
    // fabric does ot build up offset of polygon
    const newPolygon = new fabric.Polygon([], polygonProperties.newPolygon(currentPolygon));
    if (currentPolygon.previousShapeName === 'newLine') {
      newPolygon.set({
        previousShapeName: 'newLine'
      });
    }
    else {
      newPolygon.set({
        previousShapeName: 'polygon'
      });
    }
    newPolygon.set({
      id: currentPolygon.id,
      selectable: true,
      hoverCursor: 'move',
      shapeLabelText: currentPolygon.shapeLabelText,
    });
    return newPolygon;
  }
  // building up only while moving polygon
  function calculateMovedPointsCoordinates() {
    const matrix = currentPolygon.calcTransformMatrix();
    const movedPoints = currentPolygon.get('points')
      .map(p => new fabric.Point(
        p.x - currentPolygon.pathOffset.x,
        p.y - currentPolygon.pathOffset.y,
      ))
      .map(p => fabric.util.transformPoint(p, matrix));
    return movedPoints;
  }
  function generateNewPoints(movedPoints) {
    let pointId = 0;
    const movedPointsCoordinates = [];
    movedPoints.forEach((p) => {
      const point = new fabric.Circle(polygonProperties.existingPolygonPoint(pointId, p, true));
      point.set('polygonMoved', true);
      canvas$n.add(point);
      polygonPoints$1.push(point);
      movedPointsCoordinates.push({ x: point.left - 1, y: point.top - 1 });
      pointId += 1;
    });
    return movedPointsCoordinates;
  }
  // Evoked after moving whole Polygon, not only one point
  // Works for Line too
  // Builds up new coordinates of polygon
  function movePolygonToNewPosition() {
    const newPosition = currentPolygon._calcDimensions();
    currentPolygon.set({
      left: newPosition.left,
      top: newPosition.top,
      height: newPosition.height,
      width: newPosition.width,
      pathOffset: {
        x: newPosition.left + newPosition.width / 2 - movePolygonPointOffsetReduction,
        y: newPosition.top + newPosition.height / 2 - movePolygonPointOffsetReduction,
      },
    });
    currentPolygon.setCoords();
    canvas$n.renderAll();
  }
  /////

  function generatePolygonAfterMove(polygonObj, polygonPointsArray, canvasObj, polygonPropertiesObj) {
    setObjets(polygonObj, polygonPointsArray, canvasObj, polygonPropertiesObj);
    const newPolygon = generateNewPolygon$1();
    canvas$n.add(newPolygon);
    const movedPoints = calculateMovedPointsCoordinates();
    const polygonPointsCoordinates = generateNewPoints(movedPoints);
    const currentPolygonColor = getShapeColorById(currentPolygon.id);
    removeShape(currentPolygon.id);
    addShape(newPolygon, currentPolygonColor, newPolygon.id);
    currentPolygon = newPolygon;
    currentPolygon.set('polygonMoved', true);
    currentPolygon.set('points', polygonPointsCoordinates);
    movePolygonToNewPosition();
    setPolygonLabelOffsetProps(currentPolygon, currentPolygon.points[0]);
    return currentPolygon;
  }

  function changeMovePolygonPathOffset(newOffsetReduction) {
    movePolygonPointOffsetReduction = newOffsetReduction;
  }

  function displayPolygonPointsAfterMoveImpl(canvasObj, polygonObj, polygonPoints) {
    return generatePolygonAfterMove(polygonObj, polygonPoints, canvasObj, polygonProperties$1);
  }

  function resetPolygonSelectableAreaImpl(canvas, polygon) {
    const newPosition = polygon._calcDimensions();
    const newPolygonProperties = {
      height: newPosition.height,
      width: newPosition.width,
      pathOffset: {
        x: newPosition.left + newPosition.width / 2,
        y: newPosition.top + newPosition.height / 2,
      },
    };
    if (polygon.polygonMoved) {
      const polygonPadding = polygonProperties$1.getPolygonAlignmentAfterPointMove();
      newPolygonProperties.left = newPosition.left + polygonPadding;
      newPolygonProperties.top = newPosition.top + polygonPadding;
    } else {
      newPolygonProperties.left = newPosition.left;
      newPolygonProperties.top = newPosition.top;
    }
    polygon.set(
      newPolygonProperties,
    );
    polygon.setCoords();
    setPolygonLabelOffsetProps(polygon, polygon.points[0]);
    canvas.renderAll();
  }

  function movePolygonPointImpl(event, polygon, labelObject) {
    const { left } = event.target;
    const { top } = event.target;
    const polygonPoint = event.target;
    if (polygon.polygonMoved) {
      const polygonPadding = polygonProperties$1.getPolygonAlignmentAfterPointMove();
      polygon.points[polygonPoint.pointId] = {
        x: left - polygonPadding, y: top - polygonPadding,
      };
    } else {
      polygon.points[polygonPoint.pointId] = {
        x: left, y: top,
      };
    }
    if (labelObject) {
      labelObject.left = left - labelProperties.pointOffsetProperties().left;
      labelObject.top = top - labelProperties.pointOffsetProperties().top;
    }
  }

  let canvas$m = null;
  let activeLine = null;
  let lineArray = [];
  let tempPointIndex = 0;
  let initialPoint = null;
  let pointsArray = [];
  let defaultPointHoverMode = true;
  let linePointersArray = [];

  function completePolygonImpl(polygon, originalPointsArray, finalPoint, addPointsLinePointers, linePointIdFinal) {
    let derefPointsArray = [];
    let newPointsArray = [];
    derefPointsArray =  originalPointsArray.slice();
    // Line mode
    if (polygon.previousShapeName === 'newLine') {
      let arrayMiddle = derefPointsArray.length/2;
      let tempArrayLine = [];
      // Final point is true
      if (linePointIdFinal) {
        derefPointsArray = originalPointsArray.slice(0, arrayMiddle);
        tempArrayLine = derefPointsArray.slice();
        tempArrayLine.push(...addPointsLinePointers);
        newPointsArray.push(...tempArrayLine);
        for (let i = tempArrayLine.length - 1; i > -1; i--) {
          newPointsArray.push(tempArrayLine[i]);
        }
      }
      // the additional points should be added to the initial point of the original line
      else {
        derefPointsArray = [];
        // new points
        for (let i = addPointsLinePointers.length - 1; i > -1; i--) {
          tempArrayLine.push(addPointsLinePointers[i]);
        }
        for (let i = originalPointsArray.length - 1; i > arrayMiddle-1; i--) {
          derefPointsArray.push(originalPointsArray[i]);
        }
          // original points
          tempArrayLine.push(...derefPointsArray);
          newPointsArray.push(...tempArrayLine);
          for (let i = tempArrayLine.length - 1; i > -1; i--) {
            newPointsArray.push(tempArrayLine[i]);
          }
        }
      }
  // polygon Mode
  else {
      let startingIdOfNewArray = Math.min(initialPoint.pointId, finalPoint.pointId);
      const endingIdIdOfNewArray = Math.max(initialPoint.pointId, finalPoint.pointId);
      const innerArray = [];
      for (let i = startingIdOfNewArray; i < endingIdIdOfNewArray + 1; i += 1) {
        innerArray.push(derefPointsArray[i]);
      }
      const innerArrayDistance = calculateTotalLineDistance(innerArray);
      const outerArray = [];
      for (let i = endingIdIdOfNewArray; i < derefPointsArray.length; i += 1) {
        outerArray.push(derefPointsArray[i]);
      }
      for (let i = 0; i < startingIdOfNewArray + 1; i += 1) {
        outerArray.push(derefPointsArray[i]);
      }
      const outerArrayDistance = calculateTotalLineDistance(outerArray);
      if (innerArrayDistance < outerArrayDistance) {
        startingIdOfNewArray += 1;
        newPointsArray = derefPointsArray.slice(0, startingIdOfNewArray);
        addNewPointsByTheirAddDirection(newPointsArray, initialPoint.pointId, finalPoint.pointId);
        for (let i = endingIdIdOfNewArray; i < derefPointsArray.length; i += 1) {
          newPointsArray.push(derefPointsArray[i]);
        }
      } else {
        newPointsArray = derefPointsArray.slice(startingIdOfNewArray, endingIdIdOfNewArray + 1);
        addNewPointsByTheirAddDirection(newPointsArray, finalPoint.pointId, initialPoint.pointId);
      }
    }

  // for both shapes
    linePointersArray = [];
    polygon.set({ points: newPointsArray });

      setInitialStageOfAddPointsOnExistingPolygonMode(canvas$m);
      clearAllAddPointsDataImpl();
      realignLabel(polygon);

      if (polygon.previousShapeName === 'newLine'){
        resetPolygonSelectableAreaImpl(canvas$m, polygon);
      }
  }

  /// Draws temporary activeLine ONLY for Add Points event
  // Active Line is a temporary line
  function drawLineImpl(pointer) {
    activeLine.set({ x2: pointer.x, y2: pointer.y });
    activeLine.setCoords();
    canvas$m.renderAll();
  }

  // Changes the polygon's borders after mouse over polygon.
  function addPointsMouseOverImpl(event) {
    if (defaultPointHoverMode && event.target && event.target.shapeName === 'point')
    {
      event.target.stroke = 'green';
      canvas$m.renderAll();
    }
  }

  function addPointsMouseOutImpl(event) {
    if (event.target && event.target.shapeName === 'point') {
      event.target.stroke = '#333333';
      canvas$m.renderAll();
    }
  }

  function createNewLine(...coordinates) {
    activeLine = new fabric.Line(coordinates, polygonProperties$1.newLine());
    if (!getTestDrawLineState()) {
      canvas$m.add(activeLine);
      canvas$m.renderAll();
    }
  }

  // pointer is initial point
  function initializeAddNewPointsImpl(shape, pointer, canvasObj) {
      shape.stroke = '#333333';
      canvas$m = canvasObj;
      setAddPointsMode(canvas$m, shape);
      createNewLine(shape.left, shape.top, pointer.x, pointer.y);
      initialPoint = shape;
      canvas$m.bringToFront(initialPoint);
      defaultPointHoverMode = false;
  }

  function addFirstPointImpl(event) {
    changePolygonPointsToAddImpl(canvas$m);
    const pointer = canvas$m.getPointer(event.e);
    linePointersArray.push(pointer);
    lineArray.push(activeLine);
    createNewLine(pointer.x, pointer.y, pointer.x, pointer.y);
    const isNewPoint = true;
    const point = new fabric.Circle(polygonProperties$1.newPoint(tempPointIndex, pointer, isNewPoint));
    canvas$m.add(point);
    pointsArray.push(point);
    tempPointIndex += 1;
    canvas$m.bringToFront(initialPoint);
    defaultPointHoverMode = true;
  }

  function addPointImpl(pointer) {
    linePointersArray.push(pointer);
    lineArray.push(activeLine);
    createNewLine(pointer.x, pointer.y, pointer.x, pointer.y);
    const isNewPoint = true;
    const point = new fabric.Circle(polygonProperties$1.newPoint(tempPointIndex, pointer, isNewPoint));
    canvas$m.add(point);
    pointsArray.push(point);
    preventOutOfBoundsPointsOnMove(point, canvas$m);
    tempPointIndex += 1;
  }

  function resetAddPointPropertiesImpl(canvasObj) {
    canvas$m = canvasObj;
    defaultPointHoverMode = true;
  }

  function removeEditingPolygonPoints() {
    canvas$m.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName === 'point') {
        canvas$m.remove(iteratedObj);
      }

      else if (iteratedObj.shapeName === 'initialAddPoint') {
        canvas$m.remove(iteratedObj);
      }
    });
    canvas$m.renderAll();
  }

  function resetEditingPolygonPoints() {
    canvas$m.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName === 'initialAddPoint') {
        iteratedObj.shapeName = 'point';
      }
    });
    canvas$m.renderAll();
  }

  function clearTempPoints() {
    canvas$m.remove(activeLine);
    pointsArray.forEach((point) => {
      canvas$m.remove(point);
    });
    pointsArray = [];
    tempPointIndex = 0;
  }

  function clearLines() {
    lineArray.forEach((line) => {
      canvas$m.remove(line);
    });
    lineArray = [];
    activeLine = null;
  }

  function clearAllAddPointsDataImpl() {
    if (activeLine) {
      clearTempPoints();
      clearLines();
      removeEditingPolygonPoints();
    }
  }

  function resetAddPointsImpl() {
    if (activeLine) {
      clearTempPoints();
      clearLines();
      resetEditingPolygonPoints();
    }
  }

  // pointsArray keeps temporary points, which will be added to final shape
  // in which x: pointsArray[i].left, y: pointsArray[i].top
  // points in pointsArray are keeping order
  // newPointsArray is not doubling points for Line object
  function addNewPointsByTheirAddDirection(newPointsArray, firstPointId, lastPointId, polygon) {
    let pointId = 0;
      if (firstPointId < lastPointId) {
          pointsArray.forEach((point) => {
          newPointsArray.push({x: point.left, y: point.top});
        });
      }
      else {
        for (pointId = pointsArray.length - 1; pointId > -1; pointId -= 1) {
          newPointsArray.push({x: pointsArray[pointId].left, y: pointsArray[pointId].top});
        }
      }
  }

  // ???
  function moveAddablePointImpl(event) {
    preventOutOfBoundsPointsOnMove(event.target, canvas$m);
    const xCenterPoint = event.target.getCenterdrawLineOnMouseMovePoint().x;
    const yCenterPoint = event.target.getCenterPoint().y;
    const { pointId } = event.target;
    lineArray[pointId].set({ x2: xCenterPoint, y2: yCenterPoint });
    if ((pointId + 1) !== tempPointIndex) {
      lineArray[pointId + 1].set({ x1: xCenterPoint, y1: yCenterPoint });
    } else {
      activeLine.set({ x1: xCenterPoint, y1: yCenterPoint });
    }
  }

  function realignLabel(polygon) {
    const labelShape = getLabelById(polygon.id);
    labelShape.left = polygon.points[0].x - labelProperties.pointOffsetProperties().left;
    labelShape.top = polygon.points[0].y - labelProperties.pointOffsetProperties().top;
  }
  function calculateTotalLineDistance(pointsArr) {
    let totalDistance = 0;
    for (let i = 0; i < pointsArr.length - 1; i += 1) {
      const distance = Math.hypot(pointsArr[i + 1].x - pointsArr[i].x,
          pointsArr[i + 1].y - pointsArr[i].y);
      totalDistance += distance;
    }
    return totalDistance;
  }
  // did not find where it is used
  function isAddingPointsToPolygonImpl() {
    return activeLine;
  }

  function realignLabelToLowestPointLocation(polygon) {
    let lowestPointIndex = 0;
    while (Object.keys(polygon.points[lowestPointIndex]).length === 0) {
      lowestPointIndex += 1;
    }
    const labelObject = getLabelById(polygon.id);
    labelObject.left = polygon.points[lowestPointIndex].x
      - labelProperties.pointOffsetProperties().left;
    labelObject.top = polygon.points[lowestPointIndex].y
      - labelProperties.pointOffsetProperties().top;
    setPolygonLabelOffsetProps(polygon, polygon.points[lowestPointIndex]);
  }

  function checkIfLowestPoint(polygon, pointId) {
    for (let i = 0; i < pointId; i += 1) {
      if (Object.keys(polygon.points[i]).length !== 0) {
        return false;
      }
    }
    return true;
  }

  function ifExistingPolygonIsLowestPoint(existingPolygon, polygon, pointId) {
    if (existingPolygon) {
      return checkIfLowestPoint(polygon, pointId);
    }
    return false;
  }

  // handles invocation of removing points, when the shape has more than 3 points
  function removePolygonPointImpl(canvas, polygon, polygonPoints, pointId, existingPolygon) {
    const realignLabel = ifExistingPolygonIsLowestPoint(existingPolygon, polygon, pointId);
    if (polygon.previousShapeName === 'polygon') {
      if (polygon.points.length - polygon.numberOfNullPolygonPoints > 3) {
        // the final point is removed already
        if (Object.keys(polygon.points[pointId]).length === 0) {
          /* when the last polygons are removed, the ones before it are moved
          // to the last position - thus causing the possibility of getting nulls
           TIP - when point is null - it was already moved to the last element */
          for (let i = pointId - 1; i > -1; i -= 1) {
            if (Object.keys(polygon.points[i]).length !== 0) {
              polygon.points[polygon.points.length - 1] = polygon.points[i];
              polygon.points[i] = {};
              break;
            }
          }
        }
        // the final point is equal to point id
        else if ((polygon.points.length - 1) === pointId) {
          /* when last element - remove and find the next not null below it to
          to be the last element in order to enable the polygon to stay */
          for (let i = pointId - 1; i > -1; i -= 1) {
            if (Object.keys(polygon.points[i]).length !== 0) {
              polygon.points[pointId] = polygon.points[i];
              polygon.points[i] = {};
              break;
            }
          }
        }
        // if pointID is not final point, even it is the fourth point to remove
        //
        else {
          polygon.points[pointId] = {};
        }
        canvas.remove(polygonPoints[pointId]);
        polygonPoints[pointId] = null;
        polygon.numberOfNullPolygonPoints += 1;
        if (polygon.points.length - polygon.numberOfNullPolygonPoints === 3) {
            polygonPoints.forEach((point) => {
              if (point) point.set(polygonProperties$1.disabledRemovePoint());
            });
        }
      }
    }
  // Line Mode
    if (polygon.previousShapeName === 'newLine'){
      let extraPointRemoveFromLine = polygon.points.length - 1 - pointId;
      if (polygon.points.length - polygon.numberOfNullPolygonPoints > 4) {
        // we do not use this condition, because, if it is final point, the initial points becomes null;
        // therefore pointID = pointID -1, and it is not empty
        if (Object.keys(polygon.points[pointId]).length === 0) {
          for (let i = pointId - 1; i > -1; i -= 1) {
            if (Object.keys(polygon.points[i]).length !== 0) {
              polygon.points[polygon.points.length - 1] = polygon.points[i];
              polygon.points[i] = {};
              break;
            }
          }
        }
        // if it is final point of the line
        else if ((polygon.points.length - 1) === pointId){
          for (let i = pointId - 1; i > -1; i -= 1) {
            if (Object.keys(polygon.points[i]).length !== 0) {
              polygon.points[pointId] = polygon.points[i];
              polygon.points[i] = {};
              polygon.points[extraPointRemoveFromLine] = {};
              break;
            }
          }
        }
        // if it is not the last point
        else //if ( (pointId !== 0) || (pointId !== polygon.points.length-1) )//|| (pointId !== ) )
        {
          polygon.points[pointId] = {};
          polygon.points[extraPointRemoveFromLine] = {};
        }
        canvas.remove(polygonPoints[pointId]);
        canvas.remove(polygonPoints[extraPointRemoveFromLine]);
        polygonPoints[pointId] = null;
        polygonPoints[extraPointRemoveFromLine] = null;
        polygon.numberOfNullPolygonPoints += 2;
        if (polygon.points.length - polygon.numberOfNullPolygonPoints === 4) {
          polygonPoints.forEach((point) => {
            if (point) {
              point.set(polygonProperties$1.disabledRemovePoint());
            }
          });
        }
      }
    }

    if (realignLabel) {
      realignLabelToLowestPointLocation(polygon);
    }
    canvas.renderAll();
  }

  function refreshPolygonPointIds(noNullPointsRef) {
    let pointId = 0;
    noNullPointsRef.forEach((point) => {
      point.pointId = pointId;
      pointId += 1;
    });
    return noNullPointsRef;
  }

  function getCleanPolygonPointsArrayImpl(polygon, pointsObjects) {
    const noNullPointsRef = [];
    pointsObjects.forEach((point) => {
      if (point) noNullPointsRef.push(point);
    });
    if (!polygon) return [];
    const polygonPoints = polygon.points;
    const noNullPolygonPoints = [];
    for (let i = 0; i < polygonPoints.length; i += 1) {
      if (Object.keys(polygonPoints[i]).length !== 0) {
        noNullPolygonPoints.push(polygonPoints[i]);
      }
    }
    polygon.set('points', noNullPolygonPoints);
    polygon.numberOfNullPolygonPoints = 0;
    refreshPolygonPointIds(noNullPointsRef);
    return noNullPointsRef;
  }

  // this is the polygonInteractionsManager

  let canvas$l = null;
  let polygon = null;
  let polygonPoints = [];
  let editingPolygon = false;
  let preventNewPolygonInitialisation = false;

  function displayPolygonPoints() {
    setTestDrawLineState(false);
    if (!preventNewPolygonInitialisation) {
      if (polygon.previousShapeName === 'polygon') {
        polygonPoints = displayPolygonPointsWithStyleImpl(
            canvas$l, polygon, polygonProperties$1.existingPolygonPoint,
        );
      }
      // line Mode
      else {
        polygonPoints = displayPolygonPointsWithStyleImpl(
            canvas$l, polygon, polygonProperties$1.existingLinePoint,
        );
      }
    }
    else {
      preventNewPolygonInitialisation = false;
      sendPolygonPointsToFront();
    }
  }

  function displayStartingAddPolygonPoints() {
    if (polygon.previousShapeName === 'polygon') {
      polygonPoints = displayPolygonPointsWithStyleImpl(
          canvas$l, polygon, polygonProperties$1.startingAddPolygonPoint,
      );
    }
    else {
      polygonPoints = displayPolygonPointsWithStyleImpl(
          canvas$l, polygon, polygonProperties$1.startingAddLinePoint,
      );
    }
  }

  function displayRemovablePolygonPoints() {
    if (polygon.previousShapeName === 'polygon') {
      polygonPoints = displayPolygonPointsWithStyleImpl(
          canvas$l, polygon, polygonProperties$1.removablePolygonPoint,
      );
    }
    // line Mode
    else {
      polygonPoints = displayPolygonPointsWithStyleImpl(
          canvas$l, polygon, polygonProperties$1.removableLinePoint,
      );
    }
  }

  function setEditablePolygon(canvasObj, polygonObj, removablePoints, creatingPolygon, addingPoints) {
    setSelectedObjects(canvasObj, polygonObj);
    canvasObj.discardActiveObject();
    if (polygon) {
      polygon.bringToFront();
    }
    // edit this
    if (addingPoints) {
      displayStartingAddPolygonPoints();
    } else if (!removablePoints) {
      displayPolygonPoints();
    }

    // on created polygon
    else if (!creatingPolygon) {
      displayRemovablePolygonPoints();
    }
    // during drawing polygon or line
    else {
      changeDrawingPolygonPointsToRemovable();
    }
    setPolygonEditingStatus(true);
  }

  function setSelectedObjects(activeCanvasObj, activePolygonObject) {
    canvas$l = activeCanvasObj;
    polygon = activePolygonObject;
    if (polygon.previousShapeName === 'newLine'){
     polygon.set({
       lockMovementX: true,
       lockMovementY: true,
       selectable: false,
     });
    }
  }

  function setPolygonEditingStatus(status) {
    editingPolygon = status;
  }

  function initializeAddNewPoints(shape, pointer) {
    initializeAddNewPointsImpl(shape, pointer, canvas$l);
  }

  function addFirstPoint(event) {
    addFirstPointImpl(event);
  }

  function addPoint$1(pointer) {
    addPointImpl(pointer);
  }

  function drawLineOnMouseMove(pointer) {
    drawLineImpl(pointer);
  }

  function moveAddablePoint(event) {
    moveAddablePointImpl(event);
  }

  function addPointsMouseOver(event) {
    addPointsMouseOverImpl(event);
  }

  function resetAddPointProperties(canvasObj) {
    resetAddPointPropertiesImpl(canvasObj);
  }

  function clearAllAddPointsData() {
    clearAllAddPointsDataImpl();
  }

  function resetAddPoints() {
    resetAddPointsImpl();
  }

  function addPointsMouseOut(event) {
    addPointsMouseOutImpl(event);
  }

  function isAddingPointsToPolygon() {
    return isAddingPointsToPolygonImpl();
  }

  // the final point is the last point to add to polygon
  function completePolygon(finalPoint) {
    completePolygonImpl(polygon, polygon.points, finalPoint);
    polygonPoints = [];
    resetPolygonSelectableArea();
    setPolygonEditingStatus(false);
  }

  // if to add points
  function getPolygonIfEditing() {
    if (editingPolygon) {
      return polygon;
    }
    return null;
  }

  function getPolygonIdIfEditing() {
    if (editingPolygon) {
      return polygon.id;
    }
    return null;
  }

  function getPolygonEditingStatus() {
    return editingPolygon;
  }

  function sendPolygonPointsToFront(canvasArg) {
    canvas$l = canvas$l || canvasArg;
    sendPolygonPointsToFrontImpl(canvas$l, polygonPoints);
    setPolygonEditingStatus(true);
  }

  ///////////
  function changeDrawingPolygonPointsToRemovable() {
    polygonPoints = changeDrawingPolygonPointsToRemovableImpl(canvas$l, polygon);
  }
  // change existing objects for removable points
  function changeExistingPolygonPointsToRemovable(canvasObj) {
    polygonPoints = changeObjectsToPolygonPointsRemovaleImpl(canvasObj);
  }
  function cleanPolygonPointsArray() {
    polygonPoints = getCleanPolygonPointsArrayImpl(polygon, polygonPoints);
  }
  function getPolygonPointsArray() {
    return polygonPoints;
  }

  // complicated function
  // evoked by many functions
  // if to call New Line function for the first time is evoked 2 times
  // if to call Polygon function is evoked 1 time
  // if to hit Remove Points evoked too
  function removePolygonPoints() {
    if (getLastPolygonActionWasMoveState()) {
      if (getEditingLabelId() === null || getNewShapeSelectedViaLabelListState()) {
        polygonPoints = removePolygonPointsImpl(canvas$l, polygonPoints);

        // 2 times for NEw Line?
        //polygonPoints = removePolygonPointsImpl(canvas, polygonPoints);
      } else {
        preventNewPolygonInitialisation = true;
      }
    }

    else {
      polygonPoints = removePolygonPointsImpl(canvas$l, polygonPoints);
      }
    setNewShapeSelectedViaLabelListState(false);
    setPolygonEditingStatus(false);
  }

  // After adding or removing points, if to press "Build up New box".
  // After pressing "Edit Shapes", if previous state was Add Points or Remove Points
  function changePolygonPointsPropertiesToDefault(canvasObj) {
    // naming convention?
    canvas$l = !canvasObj ? canvas$l : canvasObj;
    changeObjectsToPolygonPointsToDefaultImpl(canvas$l);
  }

  // After hitting Edit Shape, after moving polygon
  function displayPolygonPointsAfterMove() {
    polygon = displayPolygonPointsAfterMoveImpl(canvas$l, polygon, polygonPoints);
    setPolygonEditingStatus(true);
  }

  function setEditablePolygonAfterMoving(canvasObj, polygonObj) {
    setSelectedObjects(canvasObj, polygonObj);
    canvasObj.discardActiveObject();
    displayPolygonPointsAfterMove();
  }

  function resetPolygonSelectableArea() {
    resetPolygonSelectableAreaImpl(canvas$l, polygon);
  }

  function movePolygonPoint(event, labelObject) {
    movePolygonPointImpl(event, polygon, labelObject);
  }

  // removes shapes from Labels bar
  function removePolygon(lableObjectFromLabelList) {
    if (editingPolygon) {
      removePolygonImpl(canvas$l, polygon);
      return polygon.id;
    }
    if (lableObjectFromLabelList && lableObjectFromLabelList.shapeName === 'polygon') {
      removePolygonImpl(canvas$l, lableObjectFromLabelList);
      return lableObjectFromLabelList.id;
    }
    return null;
  }

  function removePolygonPoint(pointId, existingPolygon) {
    removePolygonPointImpl(canvas$l, polygon, polygonPoints, pointId, existingPolygon);
  }

  function highlightSelectedPolygonViaPoint() {
    highlightShapeFill(polygon.id);
  }

  function defaultFillSelectedPolygonViaPoint() {
    defaultShapeFill(polygon.id);
  }

  function isHorizontalScrollPresent$2(parentElement) {
    return parentElement.scrollWidth > parentElement.clientWidth;
  }

  function isElementHeightFullyVisibleInParent(childElement, parentElement) {
    const childBoundingRect = childElement.getBoundingClientRect();
    const parentBoundingRect = parentElement.getBoundingClientRect();
    if (childBoundingRect.top < parentBoundingRect.top) {
      return false;
    }
    if ((isHorizontalScrollPresent$2(parentElement)
      && childBoundingRect.bottom > parentBoundingRect.bottom - getScrollbarWidth())
      || (childBoundingRect.bottom > parentBoundingRect.bottom)) {
      return false;
    }
    return true;
  }

  function scrollIntoViewIfNeededPolyfill(childElement, parentElement) {
    if (!isElementHeightFullyVisibleInParent(childElement, parentElement)) {
      childElement.scrollIntoView();
    }
  }

  function scrollIntoViewIfNeeded(childElement, parentElement) {
    if (IS_FIREFOX) {
      scrollIntoViewIfNeededPolyfill(childElement, parentElement);
    } else {
      childElement.scrollIntoViewIfNeeded();
    }
  }

  let labelListElement$1 = null;
  let currentlyHighlightedElement = null;
  let highlightedElementOriginalColor = null;
  let labelListOverflowParentElement$1 = null;

  function setLabelListElementForHighlights(labelListElementRef, labelsListOverflowParentElementRef) {
    labelListElement$1 = labelListElementRef;
    labelListOverflowParentElement$1 = labelsListOverflowParentElementRef;
  }

  function removeHighlightOfListLabel() {
    if (currentlyHighlightedElement !== null) {
      currentlyHighlightedElement.style.backgroundColor = highlightedElementOriginalColor;
    }
    currentlyHighlightedElement = null;
  }

  function highlightLabelInTheList(id) {
    removeHighlightOfListLabel();
    [currentlyHighlightedElement] = labelListElement$1.getElementsByClassName(`label${id}`);
    highlightedElementOriginalColor = currentlyHighlightedElement.style.backgroundColor;
    const highlightColor = `${highlightedElementOriginalColor.substring(0, highlightedElementOriginalColor.length - 5)} 0.6)`;
    currentlyHighlightedElement.style.backgroundColor = highlightColor;
    scrollIntoViewIfNeeded(currentlyHighlightedElement, labelListOverflowParentElement$1);
  }

  function changeLabelColor(color) {
    highlightedElementOriginalColor = color;
    currentlyHighlightedElement.style.backgroundColor = color;
  }

  function getCurrentlyHighlightedElement() {
    return currentlyHighlightedElement;
  }

  let allImageDataRef = null;

  function displayTickSVGOverImageThumbnail$1(element) {
    element.style.display = 'block';
  }

  function setSelectedMLThumbnailColourOverlayBackToDefault$1(element) {
    if (element.classList.contains('image-list-thumbnail-machine-learning-selected')) {
      element.classList.replace('image-list-thumbnail-machine-learning-selected', 'image-list-thumbnail-default');
    }
  }

  function updateNumberOfUncheckedMLImages() {
    const currentImageId = getCurrentImageId();
    const currentImage = allImageDataRef[currentImageId];
    if (currentImage.numberOfMLGeneratedShapes > 0) {
      currentImage.numberOfMLGeneratedShapes -= 1;
      if (currentImage.numberOfMLGeneratedShapes === 0) {
        const thumbnailElements = currentImage.thumbnailElementRef.childNodes;
        setSelectedMLThumbnailColourOverlayBackToDefault$1(thumbnailElements[1]);
        displayTickSVGOverImageThumbnail$1(thumbnailElements[2]);
      }
    }
  }

  function initialiseImageListML(allImageDataObj) {
    allImageDataRef = allImageDataObj;
  }

  let originalBoundingBoxBottomCoordinate = 0;
  let originalBoundingBoxLeftCoordinate = 0;
  let originalBoundingBoxTopCoordinate = 0;
  let originalBoundingBoxRightCoordinate = 0;
  let rightBoundingBoxDelta$2 = 0;

  const controlSelected = {
    middleTop: false,
    topRight: false,
    middleRight: false,
    bottomRight: false,
    middleBottom: false,
    bottomLeft: false,
    middleLeft: false,
    topLeft: false,
  };

  function prepareBoundingBoxToBeEdited(boundingBox) {
    const { height, width } = getImageProperties();
    const currentZoomState = getCurrentZoomState();
    if (boundingBox.top + boundingBox.height > height * currentZoomState - 2) {
      boundingBox.height = (height * currentZoomState - 2) - boundingBox.top;
    } else if (boundingBox.left + boundingBox.width > width * currentZoomState - 2) {
      boundingBox.width = (width * currentZoomState - 2) - boundingBox.left;
    }
  }

  function setRightBoundingBoxScalingDelta(delta) {
    rightBoundingBoxDelta$2 = delta;
  }

  function clearControlSelectedObject() {
    Object.keys(controlSelected).forEach((key) => {
      controlSelected[key] = false;
    });
  }

  function setInitialBoundingBoxCoordinates(event) {
    setBoundingBoxScalingState(true);
    prepareBoundingBoxToBeEdited(event.target);
    switch (event.transform.corner) {
      case 'ml':
        originalBoundingBoxRightCoordinate = event.target.left + event.target.width;
        controlSelected.middleLeft = true;
        break;
      case 'mt':
        originalBoundingBoxBottomCoordinate = event.target.top + event.target.height;
        controlSelected.middleTop = true;
        break;
      case 'tl':
        originalBoundingBoxRightCoordinate = event.target.left + event.target.width;
        originalBoundingBoxBottomCoordinate = event.target.top + event.target.height;
        controlSelected.topLeft = true;
        break;
      case 'tr':
        originalBoundingBoxBottomCoordinate = event.target.top + event.target.height;
        originalBoundingBoxLeftCoordinate = event.target.left;
        controlSelected.topRight = true;
        // fix for when uploading dataset to a second canvas that has not been viewed and dragging
        // top right of a bbox that is on the right side of an image, thus going out of canvas
        // note that this does cause an initial scaling twitch but it is acceptable for now
        event.target.left = originalBoundingBoxLeftCoordinate + event.target.width;
        break;
      case 'mr':
        controlSelected.middleRight = true;
        break;
      case 'br':
        originalBoundingBoxLeftCoordinate = event.target.left;
        originalBoundingBoxTopCoordinate = event.target.top;
        controlSelected.bottomRight = true;
        break;
      case 'mb':
        controlSelected.middleBottom = true;
        break;
      case 'bl':
        originalBoundingBoxRightCoordinate = event.target.left + event.target.width;
        originalBoundingBoxTopCoordinate = event.target.top;
        controlSelected.bottomLeft = true;
        break;
      default:
        clearControlSelectedObject();
        break;
    }
  }

  function setDefaultScales(boundingBox) {
    boundingBox.scaleX = 1;
    boundingBox.scaleY = 1;
  }

  function setDefaultScalingValues(boundingBox, labelObject, labelLeftOffset, pointer) {
    if (controlSelected.topLeft) {
      if (boundingBox.width <= 0) {
        boundingBox.left = originalBoundingBoxRightCoordinate;
        boundingBox.width = 1;
      } else {
        boundingBox.left = pointer.x;
        boundingBox.width = originalBoundingBoxRightCoordinate - pointer.x;
      }
      if (boundingBox.height <= 0) {
        boundingBox.top = originalBoundingBoxBottomCoordinate;
        boundingBox.height = 1;
      } else {
        boundingBox.top = pointer.y;
        boundingBox.height = originalBoundingBoxBottomCoordinate - pointer.y;
      }
    } else if (controlSelected.topRight) {
      if (boundingBox.width <= 0) {
        boundingBox.left = originalBoundingBoxLeftCoordinate;
        boundingBox.width = 1;
      } else {
        boundingBox.left = originalBoundingBoxLeftCoordinate;
        boundingBox.width = pointer.x - originalBoundingBoxLeftCoordinate;
      }
      if (boundingBox.height <= 0) {
        boundingBox.top = originalBoundingBoxBottomCoordinate;
        boundingBox.height = 1;
      } else {
        boundingBox.top = pointer.y;
        boundingBox.height = originalBoundingBoxBottomCoordinate - pointer.y;
      }
    } else if (controlSelected.bottomLeft) {
      if (boundingBox.width <= 0) {
        boundingBox.left = originalBoundingBoxRightCoordinate;
        boundingBox.width = 1;
      } else {
        boundingBox.left = pointer.x;
        boundingBox.width = originalBoundingBoxRightCoordinate - pointer.x;
      }
      if (boundingBox.height <= 0) {
        boundingBox.top = originalBoundingBoxTopCoordinate;
        boundingBox.height = 1;
      } else {
        boundingBox.top = originalBoundingBoxTopCoordinate;
        boundingBox.height = pointer.y - originalBoundingBoxTopCoordinate;
      }
    } else if (controlSelected.bottomRight) {
      if (boundingBox.width <= 0) {
        boundingBox.left = originalBoundingBoxLeftCoordinate;
        boundingBox.width = 1;
      } else {
        boundingBox.left = originalBoundingBoxLeftCoordinate;
        boundingBox.width = pointer.x - originalBoundingBoxLeftCoordinate;
      }
      if (boundingBox.height <= 0) {
        boundingBox.top = originalBoundingBoxTopCoordinate;
        boundingBox.height = 1;
      } else {
        boundingBox.top = originalBoundingBoxTopCoordinate;
        boundingBox.height = pointer.y - originalBoundingBoxTopCoordinate;
      }
    } else {
      boundingBox.width *= boundingBox.scaleX;
      boundingBox.height *= boundingBox.scaleY;
    }
    setDefaultScales(boundingBox);
    labelObject.left = boundingBox.left + labelLeftOffset;
    labelObject.top = boundingBox.top;
  }

  function handleBoundingBoxScalingEvents(event, labelObject, canvas) {
    if (event.target.shapeName !== 'bndBox') return;
    const labelLeftOffset = labelProperties.boundingBoxOffsetProperties().left;
    const { height, width } = getImageProperties();
    const currentZoomState = getCurrentZoomState();
    const pointer = canvas.getPointer(canvas.e);
    const imageHeight = height * currentZoomState;
    const imageWidth = width * currentZoomState;
    const boundingBox = event.target;
    boundingBox.setCoords();
    let blocking = false;
    let blockingTop = false;
    let blockingRight = false;
    let blockingLeft = false;
    // repeating changes variable and setDefaultScales function logic as the object could already
    // be at the boundary without having to use any of the conditional controls
    // top
    if (boundingBox.top <= 0) {
      // console.log('1');
      blockingTop = true;
      if (controlSelected.topLeft) {
        blocking = true;
        boundingBox.top = 0;
        boundingBox.height = originalBoundingBoxBottomCoordinate;
        if (boundingBox.width <= 0) {
          boundingBox.left = originalBoundingBoxRightCoordinate - 1;
          boundingBox.width = 1;
        } else {
          boundingBox.left = pointer.x;
          boundingBox.width = originalBoundingBoxRightCoordinate - pointer.x;
        }
        labelObject.left = boundingBox.left + labelLeftOffset;
        labelObject.top = boundingBox.top;
        setDefaultScales(boundingBox);
      } else if (controlSelected.topRight) {
        blocking = true;
        boundingBox.height = originalBoundingBoxBottomCoordinate;
        boundingBox.top = 0;
        if (boundingBox.width <= 0) {
          boundingBox.left = originalBoundingBoxLeftCoordinate;
          boundingBox.width = 1;
        } else {
          boundingBox.left = originalBoundingBoxLeftCoordinate;
          boundingBox.width = pointer.x - originalBoundingBoxLeftCoordinate;
        }
        labelObject.left = boundingBox.left + labelLeftOffset;
        labelObject.top = boundingBox.top;
        setDefaultScales(boundingBox);
      } else if (controlSelected.middleTop) {
        blocking = true;
        boundingBox.top = 0;
        boundingBox.height = originalBoundingBoxBottomCoordinate;
        setDefaultScales(boundingBox);
      }
    } else if (controlSelected.middleTop) {
      boundingBox.height = originalBoundingBoxBottomCoordinate - pointer.y;
    }
    // left
    if (boundingBox.left <= 0) {
      blockingLeft = true;
      if (controlSelected.topLeft) {
        blocking = true;
        if (!blockingTop) {
          if (boundingBox.height <= 0) {
            boundingBox.top = originalBoundingBoxBottomCoordinate - 1;
            boundingBox.height = 1;
          } else {
            boundingBox.top = pointer.y;
            boundingBox.height = originalBoundingBoxBottomCoordinate - pointer.y;
          }
        }
        boundingBox.left = 0;
        boundingBox.width = originalBoundingBoxRightCoordinate;
        labelObject.left = boundingBox.left + labelLeftOffset;
        labelObject.top = boundingBox.top;
        setDefaultScales(boundingBox);
      } else if (controlSelected.bottomLeft) {
        blocking = true;
        if (boundingBox.height <= 0) {
          boundingBox.top = originalBoundingBoxTopCoordinate;
          boundingBox.height = 1;
        } else {
          boundingBox.top = originalBoundingBoxTopCoordinate;
          boundingBox.height = pointer.y - originalBoundingBoxTopCoordinate;
        }
        boundingBox.left = 0;
        boundingBox.width = originalBoundingBoxRightCoordinate;
        labelObject.left = boundingBox.left + labelLeftOffset;
        labelObject.top = boundingBox.top;
        setDefaultScales(boundingBox);
      } else if (controlSelected.middleLeft) {
        blocking = true;
        boundingBox.left = 0;
        setDefaultScales(boundingBox);
        boundingBox.width = originalBoundingBoxRightCoordinate;
      }
    } else if (controlSelected.middleLeft) {
      boundingBox.width = originalBoundingBoxRightCoordinate - pointer.x;
    }
    if (currentZoomState > 1.00001) {
      // right
      if ((boundingBox.width + boundingBox.left) > imageWidth / currentZoomState - 1) {
        // console.log('3');
        blockingRight = true;
        if (controlSelected.topRight) {
          blocking = true;
          if (!blockingTop) {
            if (boundingBox.height <= 0) {
              boundingBox.top = originalBoundingBoxBottomCoordinate - 1;
              boundingBox.height = 1;
            } else {
              boundingBox.top = pointer.y;
              boundingBox.height = originalBoundingBoxBottomCoordinate - pointer.y;
            }
          }
          boundingBox.width = imageWidth / currentZoomState - boundingBox.left - 2;
          boundingBox.left = originalBoundingBoxLeftCoordinate;
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else if (controlSelected.bottomRight) {
          blocking = true;
          if (boundingBox.height <= 0) {
            boundingBox.top = originalBoundingBoxTopCoordinate;
            boundingBox.height = 1;
          } else {
            boundingBox.top = originalBoundingBoxTopCoordinate;
            boundingBox.height = pointer.y - originalBoundingBoxTopCoordinate;
          }
          boundingBox.width = imageWidth / currentZoomState - boundingBox.left - 2;
          boundingBox.left = originalBoundingBoxLeftCoordinate;
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else {
          boundingBox.width = imageWidth / currentZoomState - boundingBox.left - 2;
        }
      }
      // bottom
      if ((boundingBox.height + boundingBox.top) > imageHeight / currentZoomState - 2) {
      //   console.log('4');
        if (controlSelected.bottomRight) {
          blocking = true;
          if (!blockingRight) {
            if (boundingBox.width <= 0) {
              boundingBox.left = originalBoundingBoxLeftCoordinate;
              boundingBox.width = 1;
            } else {
              boundingBox.left = originalBoundingBoxLeftCoordinate;
              boundingBox.width = pointer.x - originalBoundingBoxLeftCoordinate;
            }
          }
          boundingBox.height = imageHeight / currentZoomState - boundingBox.top - 2;
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else if (controlSelected.bottomLeft) {
          blocking = true;
          if (!blockingLeft) {
            if (boundingBox.width <= 0) {
              boundingBox.left = originalBoundingBoxRightCoordinate - 1;
              boundingBox.width = 1;
            } else {
              boundingBox.width = originalBoundingBoxRightCoordinate - pointer.x;
              boundingBox.left = pointer.x;
            }
          }
          boundingBox.height = imageHeight / currentZoomState - boundingBox.top - 2;
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else {
          boundingBox.height = imageHeight / currentZoomState - boundingBox.top - 2;
        }
      }
    } else {
      // right
      if ((boundingBox.width + boundingBox.left) > canvas.width - rightBoundingBoxDelta$2) {
        // console.log('5');
        blockingRight = true;
        if (controlSelected.topRight) {
          blocking = true;
          if (!blockingTop) {
            if (boundingBox.height <= 0) {
              boundingBox.top = originalBoundingBoxBottomCoordinate - 1;
              boundingBox.height = 1;
            } else {
              boundingBox.top = pointer.y;
              boundingBox.height = originalBoundingBoxBottomCoordinate - pointer.y;
            }
          }
          boundingBox.width = Math.floor(canvas.width - boundingBox.left - rightBoundingBoxDelta$2);
          boundingBox.left = originalBoundingBoxLeftCoordinate;
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else if (controlSelected.bottomRight) {
          blocking = true;
          if (boundingBox.height <= 0) {
            boundingBox.top = originalBoundingBoxTopCoordinate;
            boundingBox.height = 1;
          } else {
            boundingBox.top = originalBoundingBoxTopCoordinate;
            boundingBox.height = pointer.y - originalBoundingBoxTopCoordinate;
          }
          boundingBox.width = Math.floor(canvas.width - boundingBox.left - rightBoundingBoxDelta$2);
          boundingBox.left = originalBoundingBoxLeftCoordinate;
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else {
          boundingBox.width = Math.floor(canvas.width - boundingBox.left - rightBoundingBoxDelta$2);
        }
      }
      // bottom
      if ((boundingBox.height + boundingBox.top) > canvas.height - 2) {
        // console.log('6');
        if (controlSelected.bottomRight) {
          blocking = true;
          if (!blockingRight) {
            if (boundingBox.width <= 0) {
              boundingBox.left = originalBoundingBoxLeftCoordinate;
              boundingBox.width = 1;
            } else {
              boundingBox.left = originalBoundingBoxLeftCoordinate;
              boundingBox.width = pointer.x - originalBoundingBoxLeftCoordinate;
            }
          }
          boundingBox.height = Math.floor(canvas.height - boundingBox.top - 2);
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else if (controlSelected.bottomLeft) {
          blocking = true;
          if (!blockingLeft) {
            if (boundingBox.width <= 0) {
              boundingBox.left = originalBoundingBoxRightCoordinate - 1;
              boundingBox.width = 1;
            } else {
              boundingBox.width = originalBoundingBoxRightCoordinate - pointer.x;
              boundingBox.left = pointer.x;
            }
          }
          boundingBox.height = Math.floor(canvas.height - boundingBox.top - 2);
          labelObject.left = boundingBox.left + labelLeftOffset;
          labelObject.top = boundingBox.top;
        } else {
          boundingBox.height = canvas.height - boundingBox.top - 2;
        }
      }
    }
    if (!blocking) {
      // console.log('7');
      setDefaultScalingValues(boundingBox, labelObject, labelLeftOffset, pointer);
    }
  }

  let canvas$k = null;
  let labelObject = null;
  let polygonMoved = false;
  let polygonPointMoved = false;
  let selectedShapeId = null;
  let shapeSetToInvisible = false;
  let newPolygonSelected$2 = false;
  let setEditablePolygonOnClick = null;
  let finishedAddingNewPoints = false;
  let lastShapeSelectedIsBoundingBox = false;
  let removeBoundingBoxFillWhenScaling = false;
  let mouseIsDown = false;
  let zoomOverflowElement$3 = null;

  function programaticallySelectBoundingBox(boundingBoxObj) {
    canvas$k.setActiveObject(boundingBoxObj);
  }

  function programaticallyDeselectBoundingBox() {
    canvas$k.discardActiveObject();
    canvas$k.renderAll();
  }

  function selectShape$3(shape) {
    highlightLabelInTheList(shape);
    setRemoveLabelsButtonToDefault();

    // different values of shape and selectedShapeId
    highlightShapeFill(shape);
    highlightShapeFill(selectedShapeId);
  }

  function deselectShape$3() {
    removeHighlightOfListLabel();
    setRemoveLabelsButtonToDisabled();

    highlightShapeFill(selectedShapeId);
  }

  function setEditablePolygonOnClickFunc(event) {
    if (getPolygonEditingStatus()) {
      // selecting another polygon without moving the first one
      removePolygonPoints();
    }
    setEditablePolygon(canvas$k, event.target);
    if (event.target) {
      selectedShapeId = event.target.id;
    }
  }

  function setEditablePolygonWhenPolygonMoved(event) {
    if (newPolygonSelected$2) {
      setEditablePolygonAfterMoving(canvas$k, event.target);
      selectedShapeId = event.target.id;
    } else {
      displayPolygonPointsAfterMove();
    }
  }

  function resetPolygonSelectableAreaAfterPointMoved() {
    resetPolygonSelectableArea();
    polygonPointMoved = false;
  }

  function setPolygonNotEditableOnClick$2() {
    removePolygonPoints();
    selectedShapeId = null;
  }

  // smart system where label would readjust upon mouse up if it's edges are outside of canvas
  // stop shapes from being able to move outside of canvas

  // validation for label (not empty string etc.)

  // upon selecting-dragging a polygon does not remove the active label of the previous shape on list
  // whereas rectangle is immediate, only way this can be mitigated is by removing rectangle controls
  // on moving it in order to have delay the label change too, or you can display polygon points
  // on mouse down click and upon moving the polygon

  // use different colours for different labels
  // investigate the potential of having a rightclick menu to manipulate shapes
  // in add or remove points modes, send all objects to the front

  // think about adding a screen wide scrosshair and show coordinates to the user

  function setMLGeneratedPalletteToOriginal$1(shape) {
    updateNumberOfUncheckedMLImages();
    shape.fill = shape.trueFill;
    shape.stroke = shape.trueStroke;
    shape.MLPallette = false;
  }

  // reduce nested if statements in code
  function polygonMouseDownEvents(event) {
    mouseIsDown = true;
    if (event.target) {
      enableActiveObjectsAppearInFront();
      if (event.target.shapeName === 'bndBox') {
        deselectShape$3();
        highlightShapeFill(event.target.id);
        if (event.target.MLPallette) {
          setMLGeneratedPalletteToOriginal$1(event.target);
          highlightShapeFill(event.target.id);
        }
        if (event.transform && event.transform.corner) {
          setInitialBoundingBoxCoordinates(event);
        }
        selectShape$3(event.target.id);
        if (getPolygonEditingStatus()) {
          setPolygonNotEditableOnClick$2();
          newPolygonSelected$2 = false;
        }
        labelObject = getLabelById(event.target.id);
        selectedShapeId = event.target.id;
        lastShapeSelectedIsBoundingBox = true;
        preventActiveObjectsAppearInFront();
      }

      else {
        if (event.target.shapeName === 'polygon' && event.target.id !== selectedShapeId) {
          setTestDrawLineState(false);
          if (lastShapeSelectedIsBoundingBox) {
            deselectShape$3();
            highlightShapeFill(event.target.id);
            lastShapeSelectedIsBoundingBox = false;
          }
          labelObject = getLabelById(event.target.id);
          newPolygonSelected$2 = true;
        }

        else {
          newPolygonSelected$2 = false;
        }
        preventActiveObjectsAppearInFront();
      }
    } else {
      newPolygonSelected$2 = false;
    }
    if ((newPolygonSelected$2 || lastShapeSelectedIsBoundingBox)
      && getRemovingPointsAfterCancelDrawState()) {
      setRemovingPointsAfterCancelDrawState(false);
    }
  }

  function handleShapeFillAfterMove(event) {
    const pointer = canvas$k.getPointer(canvas$k.e);
    const currentZoomState = getCurrentZoomState();
    const { height, width } = getImageProperties();
    const imageHeight = height * currentZoomState;
    const imageWidth = width * currentZoomState;

      if (pointer.x < 0 || imageWidth / currentZoomState < pointer.x
          || pointer.y < 0 || imageHeight / currentZoomState < pointer.y) {
        if (event.target.shapeName === 'point') {
          defaultFillSelectedPolygonViaPoint();
        } else {
          defaultShapeFill(event.target.id);
        }
      }
      setShapeMovingState(false);
  }

  function shapeMouseOutEvents(event) {
    highlightShapeFill(event.target.id);
    if (!getBoundingBoxScalingState() && !getShapeMovingState()) {
      if (event.target.shapeName === 'point') {
        defaultFillSelectedPolygonViaPoint();
      } else {
        defaultShapeFill(event.target.id);
      }
    } else {
      removeBoundingBoxFillWhenScaling = true;
    }
    highlightShapeFill(event.target.id);
  }

  // look at this
  // reacts if to press on shape: polygon, bndbox, tempPoint - points of Line, point - points of polygon
  function polygonMouseUpEvents(event) {
    setTestDrawLineState(false);
    mouseIsDown = false;
    if (event.target && event.target.shapeName === 'bndBox') {
      if (getBoundingBoxScalingState()) {
        setBoundingBoxScalingState(false);
        if (removeBoundingBoxFillWhenScaling) {
          shapeMouseOutEvents(event);
          removeBoundingBoxFillWhenScaling = false;
        }
      }
      canvas$k.bringToFront(event.target);
      canvas$k.bringToFront(labelObject);
      clearControlSelectedObject();
    }

    else if (polygonMoved) {
      validateAndFixOutOfBoundsPolygonShapePointsAfterMove(event.target);

      setEditablePolygonWhenPolygonMoved(event);

      highlightShapeFill(event.target.id);
      canvas$k.bringToFront(labelObject);
      setLastPolygonActionWasMoveState(true);
    }

    else if (newPolygonSelected$2) {
      if (finishedAddingNewPoints) {
        finishedAddingNewPoints = false;
      } else {
        if (event.target) {
          selectShape$3(event.target.id);
        }
      }
      canvas$k.bringToFront(event.target);
      setEditablePolygonOnClick(event);
      canvas$k.bringToFront(labelObject);
    }

    else if (polygonPointMoved) {
      resetPolygonSelectableAreaAfterPointMoved();
      setSessionDirtyState(true);
    }

    else if (event.target && event.target.shapeName === 'polygon') {
      selectShape$3(event.target.id);
      sendPolygonPointsToFront(canvas$k);
    }

    else if (!event.target && getPolygonEditingStatus()) {
      deselectShape$3();
      setPolygonNotEditableOnClick$2();
    }

    else if (selectedShapeId != null || shapeSetToInvisible) {
      deselectShape$3();
      shapeSetToInvisible = false;
    }

    if (getShapeMovingState()) {
      handleShapeFillAfterMove(event);
      if (polygonMoved) { polygonMoved = false; }
      setSessionDirtyState(true);
    }
  }

  function polygonMoveEvents(event) {
    if (event.target) {
      setShapeMovingState(true);
      const { shapeName } = event.target;
      if (shapeName === 'polygon') {
        preventOutOfBoundsShapesOnMove(event.target, canvas$k);
        if (getPolygonEditingStatus()) {
          removePolygonPoints();
        }
        labelObject.setCoords();
        labelObject.top = event.target.top - event.target.labelOffsetTop;
        labelObject.left = event.target.left - event.target.labelOffsetLeft;
        polygonMoved = true;
      } else if (shapeName === 'point') {
        preventOutOfBoundsPointsOnMove(event.target, canvas$k);
        if (event.target.pointId === 0) {
          movePolygonPoint(event, labelObject);
        } else {
          movePolygonPoint(event);
        }
        resetPolygonSelectableAreaAfterPointMoved();
        polygonPointMoved = true;
      } else if (shapeName === 'bndBox') {
        preventOutOfBoundsShapesOnMove(event.target, canvas$k);
        labelObject.setCoords();
        labelObject.top = event.target.top;
        labelObject.left = event.target.left + labelProperties.boundingBoxOffsetProperties().left;
        if (event.target.isGeneratedViaML) {
          event.target.isGeneratedViaML = false;
        }
      }
    }
  }

  function boundingBoxScalingEvents(event) {
    handleBoundingBoxScalingEvents(event, labelObject, canvas$k);
    setSessionDirtyState(true);
  }

  function shapeMouseOverEvents(event) {
    if (event.target && event.target.shapeName !== 'label') {
      highlightShapeFill(event.target.id);
      if (event.target.MLPallette) {
        setMLGeneratedPalletteToOriginal$1(event.target);
      }
      if (event.target.shapeName === 'point') {
        highlightSelectedPolygonViaPoint();
        highlightShapeFill(event.target.id);
      }
      else {
        highlightShapeFill(event.target.id);
      }
      highlightShapeFill(event.target.id);
    }
  }

  function removeEditedPolygonId() {
    selectedShapeId = null;
  }

  function setShapeToInvisible() {
    selectedShapeId = null;
    shapeSetToInvisible = true;
  }

  function assignSetEditablePolygonOnClickFunc$1() {
    setEditablePolygonOnClick = setEditablePolygonOnClickFunc;
  }

  function skipMouseUpEvent$2() {
    canvas$k.__eventListeners['mouse:down'] = [];
    canvas$k.on('mouse:down', (e) => {
      polygonMouseDownEvents(e);
    });
    assignSetEditablePolygonOnClickFunc$1();
  }

  function removeActiveLabelObject() {
    labelObject = null;
  }

  // After choosing Edit Shape option
  function prepareCanvasForDefaultEvents(canvasObj, polygonObjId, afterAddPoints) {
    canvas$k = canvasObj;
    zoomOverflowElement$3 = document.getElementById('zoom-overflow');
    // selected add then remove -> remve will null it
    // selected remove then add -> add will null it
    // selected
    if (polygonObjId !== undefined && polygonObjId !== null) {
      selectedShapeId = polygonObjId;
      labelObject = getLabelById(selectedShapeId);
      selectShape$3(selectedShapeId);
    }
    if (afterAddPoints) {
      selectedShapeId = null;
      newPolygonSelected$2 = true;
      finishedAddingNewPoints = true;
      lastShapeSelectedIsBoundingBox = false;
      setEditablePolygonOnClick = skipMouseUpEvent$2;
    } else {
      setEditablePolygonOnClick = setEditablePolygonOnClickFunc;
    }
    setRemovingPointsAfterCancelDrawState(false);
  }

  // function validateBoundingBoxFullyOnCanvas(boundingBox) {
  //   if (boundingBox.left + boundingBox.width > canvas.width) {
  //     const surplus = boundingBox.left + boundingBox.width - canvas.width;
  //     boundingBox.width -= surplus + 2;
  //   } else if (boundingBox.top + boundingBox.height > canvas.height) {
  //     const surplus = boundingBox.top + boundingBox.height - canvas.height;
  //     boundingBox.height -= surplus + 2;
  //   }
  // }
  // remove this if the bug is fixed for scaling in top-right/bottom-left

  function getLastSelectedShapeId() {
    return selectedShapeId;
  }

  function getScrollWidth$3() {
    // create a div with the scroll
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    // must put it in the document, otherwise sizes will be 0
    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth * 2;
  }

  function boundingBoxScalingWhenScrolling(event, newPositionTop) {
    if (event.transform.corner === 'mb') {
      if (event.target.top < newPositionTop) {
        event.target.set({ top: event.target.top });
      }
      event.target.set({ height: Math.abs(event.target.top - newPositionTop) });
    } else if (event.transform.corner === 'mt') {
      if (event.target.top > newPositionTop) {
        const newHeight = Math.abs(event.target.top - newPositionTop + event.target.height);
        event.target.set({ height: newHeight });
        event.target.set({ top: newPositionTop });
      } else if (newPositionTop < event.target.top + event.target.height) {
        const newHeight = Math.abs(event.target.height - (newPositionTop - event.target.top));
        event.target.set({ height: newHeight });
        event.target.set({ top: newPositionTop });
      }
    }
  }

  function topOverflowScroll$3(event) {
    const currentScrollTopOffset = zoomOverflowElement$3.scrollTop / getCurrentZoomState();
    const newPositionTop = canvas$k.getPointer(event.e).y - currentScrollTopOffset;
    if (event.target.shapeName === 'bndBox') {
      if (event.transform.action === 'scaleY') {
        boundingBoxScalingWhenScrolling(event, newPositionTop);
      } else {
        event.target.top = newPositionTop - event.transform.offsetY;
      }
    } else
    if (event.target.shapeName === 'polygon') {
      event.target.top = newPositionTop - event.transform.offsetY;
    } else if (event.target.shapeName === 'point') {
      event.target.top = newPositionTop;
    }
  }

  function bottomOverflowScroll$3(event, stubHeight, scrollWidth) {
    const canvasHeight = stubHeight + scrollWidth;
    const canvasBottom = zoomOverflowElement$3.scrollTop + zoomOverflowElement$3.offsetHeight;
    const result = canvasHeight - canvasBottom;
    const newPositionTop = canvas$k.getPointer(event.e).y + (result / getCurrentZoomState());
    if (event.target.shapeName === 'bndBox') {
      if (event.transform.action === 'scaleY') {
        boundingBoxScalingWhenScrolling(event, newPositionTop);
      } else {
        event.target.top = newPositionTop - event.transform.offsetY;
      }
    } else if (event.target.shapeName === 'polygon') {
      event.target.top = newPositionTop - event.transform.offsetY;
    } else if (event.target.shapeName === 'point') {
      event.target.top = newPositionTop;
    }
  }

  function defaultScroll$3(event) {
    const currentVerticalScrollDelta = event.e.deltaY / getCurrentZoomState();
    const newPositionTop = canvas$k.getPointer(event.e).y + currentVerticalScrollDelta;
    if (event.target.shapeName === 'bndBox') {
      if (event.transform.action === 'scaleY') {
        boundingBoxScalingWhenScrolling(event, newPositionTop);
      } else {
        event.target.top = newPositionTop - event.transform.offsetY;
      }
    } else if (event.target.shapeName === 'polygon') {
      event.target.top = newPositionTop - event.transform.offsetY;
    } else if (event.target.shapeName === 'point') {
      const currentHorizontalScrollDelta = event.e.deltaX / getCurrentZoomState();
      event.target.left = canvas$k.getPointer(event.e).x + currentHorizontalScrollDelta;
      event.target.top = newPositionTop;
    }
  }

  function shapeScrollEvents$3(event) {
    if (mouseIsDown) {
      if (event.target.shapeName === 'point' || event.target.shapeName === 'polygon' || event.target.shapeName === 'bndBox') {
        const currentZoom = getCurrentZoomState();
        if (currentZoom > 1.00001) {
          const stubElement = document.getElementById('stub');
          const stubMarginTop = stubElement.style.marginTop;
          const stubHeightSubstring = stubMarginTop.substring(0, stubMarginTop.length - 2);
          const stubHeight = parseInt(stubHeightSubstring, 10);
          const currentBotLocation = zoomOverflowElement$3.scrollTop + zoomOverflowElement$3.offsetHeight;
          const futureBotLocation = currentBotLocation + event.e.deltaY;
          const scrollWidth = getDoubleScrollCanvasState() ? getScrollWidth$3() : getScrollWidth$3() / 2;
          if (zoomOverflowElement$3.scrollTop + event.e.deltaY < 0) {
            topOverflowScroll$3(event);
          } else if (futureBotLocation > stubHeight + scrollWidth) {
            bottomOverflowScroll$3(event, stubHeight, scrollWidth);
          } else {
            defaultScroll$3(event);
          }
          polygonMoveEvents(event);
        }
      }
    }
  }

  let selectedPolygonId$1 = null;
  let newPolygonSelected$1 = false;
  let canvas$j = null;
  let removedPolygonPoints = false;
  let selectedNothing$1 = false;
  let ignoredFirstMouseMovement$3 = false;
  let currentlyHoveredPoint$3 = null;
  let lastHoveredPoint$3 = null;
  let mouseMoved$3 = false;

  function selectShape$2(shapeId) {
    highlightLabelInTheList(shapeId);
    setRemoveLabelsButtonToDefault();
  }

  // after highlighting points to remove
  function deselectShape$2() {
    removeHighlightOfListLabel();
    setRemoveLabelsButtonToDisabled();
  }

  function setRemovablePointsEventsCanvas$1(canvasObj) {
    changeExistingPolygonPointsToRemovable(canvasObj);
    canvas$j = canvasObj;
    selectedPolygonId$1 = getPolygonIdIfEditing();
    ignoredFirstMouseMovement$3 = false;
    currentlyHoveredPoint$3 = null;
    lastHoveredPoint$3 = null;
    mouseMoved$3 = false;
    if (selectedPolygonId$1 !== null && selectedPolygonId$1 !== undefined) {
      selectShape$2(selectedPolygonId$1);
    }
  }

  function prepareToEditPolygonPoints(event) {
    if (removedPolygonPoints) {
      cleanPolygonPointsArray();
      removedPolygonPoints = false;
    }
    removePolygonPoints();
    removeEditedPolygonId();
    setEditablePolygon(canvas$j, event.target, true);
    selectedPolygonId$1 = event.target.id;
    selectShape$2(selectedPolygonId$1);
    ignoredFirstMouseMovement$3 = false;
    currentlyHoveredPoint$3 = null;
    lastHoveredPoint$3 = null;
    mouseMoved$3 = false;
  }

  function setPolygonNotEditableOnClick$1() {
    removePolygonPoints();
    selectedPolygonId$1 = null;
    deselectShape$2();
  }

  function pointMouseDownEvents$2(event) {
    if (event.target) {
      enableActiveObjectsAppearInFront();
      if (event.target.shapeName === 'point') {
        removePolygonPoint(event.target.pointId, true);
        removedPolygonPoints = true;
        currentlyHoveredPoint$3 = null;
        setSessionDirtyState(true);
      } else {
        if (event.target.shapeName === 'polygon') {
          newPolygonSelected$1 = (event.target.id !== selectedPolygonId$1);
        }
        preventActiveObjectsAppearInFront();
      }
      selectedNothing$1 = false;
    } else {
      selectedNothing$1 = true;
    }
  }

  function removePointViaKeyboard() {
    if (!mouseMoved$3) {
      if (lastHoveredPoint$3) {
        removePolygonPoint(lastHoveredPoint$3.pointId);
        setSessionDirtyState(true);
      }
      mouseMoved$3 = true;
    } else if (currentlyHoveredPoint$3) {
      removePolygonPoint(currentlyHoveredPoint$3.pointId, true);
      setSessionDirtyState(true);
    }
    currentlyHoveredPoint$3 = null;
  }

  function pointMouseOverEvents$1(event) {
    if (event.target && event.target.shapeName === 'point' && event.target.fill === 'red') {
      event.target.stroke = 'red';
      canvas$j.renderAll();
      currentlyHoveredPoint$3 = event.target;
    }
  }

  function pointMouseUpEvents$1(event) {
    if (event.target && event.target.shapeName === 'polygon' && (selectedNothing$1 || newPolygonSelected$1)) {
      // subset can be reused
      prepareToEditPolygonPoints(event);
    } else if ((!event.target && getPolygonEditingStatus()) || (event.target && event.target.shapeName === 'bndBox')) {
      setPolygonNotEditableOnClick$1();
    }
  }

  function pointMouseOutEvents$1(event) {
    if (event.target && event.target.shapeName === 'point' && event.target.fill === 'red') {
      event.target.stroke = 'black';
      canvas$j.renderAll();
      currentlyHoveredPoint$3 = null;
      // fix for the bug where upon hovering over a point in another mode and switching it to this
      // mode - the mouse out event is triggered, highlighting the last hovered shape
      if (!mouseMoved$3) lastHoveredPoint$3 = event.target;
    }
  }

  function pointMouseMoveEvents$1() {
    if (ignoredFirstMouseMovement$3) {
      mouseMoved$3 = true;
    } else {
      ignoredFirstMouseMovement$3 = true;
    }
  }

  // Originally designed to be turned off after the points have been successfully added to a polygon
  let selectedPolygonId = null;
  let newPolygonSelected = false;
  let canvas$i = null;
  let addingPoints = false;
  let selectedNothing = false;
  let addFirstPointMode = false;
  let coordinatesOfLastMouseHover = null;
  let mouseIsDownOnTempPoint$1 = false;
  let activeShape$2 = null;
  let currentlyHoveredPoint$2 = null;
  let lastMouseEvent$2 = null;
  let mouseMoved$2 = false;
  let lastHoveredPoint$2 = null;
  let ignoredFirstMouseMovement$2 = false;
  let addPointsLineState = false;
  let addPointsLinePointers = [];
  let linePointIdFinal = undefined;

  // only for the first point, which is located on polygon or line
  // reacts for each mouse down
  // returns target: null if to click outside the polygon area or new part of line
  // that means that before evoking this function event doesn't return target
  function pointMouseDownEvents$1(event) {
    if (!addingPoints) {
      if (event.target) {
        enableActiveObjectsAppearInFront();
        if ((event.target.shapeName === 'point'))
        {
          if (activeShape$2) {
            let pointsArrayLength = activeShape$2.points.length;
            if ((activeShape$2.previousShapeName === 'newLine')
                && (
                    (event.target.pointId === 0)
                    || (event.target.pointId === (pointsArrayLength - 1))
                    || (event.target.pointId === (pointsArrayLength / 2))
                    || (event.target.pointId === (pointsArrayLength / 2 - 1))
                ) )
            {
              setAddPointsLineState(true);
              const pointer = canvas$i.getPointer(event.e);
              // whether it is the initial point of the original line
              if ( (event.target.pointId === 0)  || (event.target.pointId === (pointsArrayLength - 1) ) ) {
                linePointIdFinal = false;
              }
              // whether it is the final point of the original line
              else {
                linePointIdFinal = true;
              }
              initializeAddNewPoints(event.target, pointer);
              addingPoints = true;
              addFirstPointMode = true;
            }
            else if (activeShape$2.previousShapeName === 'polygon') {
              const pointer = canvas$i.getPointer(event.e);
              initializeAddNewPoints(event.target, pointer);
              addingPoints = true;
              addFirstPointMode = true;
            }
          }
          else {
            if (event.target.shapeName === 'polygon') {
              newPolygonSelected = (event.target.id !== selectedPolygonId);
            }
            preventActiveObjectsAppearInFront();
          }
          selectedNothing = false;
        }

        else {
          selectedNothing = true;
        }
      }
    }
    // adds the points starting from outside of polygon or line, and ending by point on polygon or line
    else {
      addPoints(event);
      if (activeShape$2.previousShapeName === 'newLine') {
        resetPolygonSelectableAreaImpl(canvas$i, activeShape$2);
      }
    }
  }

  // only for line mode
  function addLineLastPoint(){
    addingPoints = false;
    let finalPoint = addPointsLinePointers.slice(addPointsLinePointers.length - 1);
    let finalPointLeftTop = {
      left: finalPoint[0].x,
      top: finalPoint[0].y
    };
    let eventTarget =  getPointInArrayClosestToGivenCoordinates(getPolygonPointsArray(), finalPointLeftTop);
    completePolygonImpl(activeShape$2, activeShape$2.points, eventTarget, addPointsLinePointers, linePointIdFinal);
    prepareToAddPolygonPoints(activeShape$2);
    currentlyHoveredPoint$2 = getPointInArrayClosestToGivenCoordinates(getPolygonPointsArray(), finalPointLeftTop);
    setSessionDirtyState(true);
    addPointsLinePointers = [];
  }

  // adding points to existing object
  // line or polygon
  function addPoints(event) {
    // first point
    if (addFirstPointMode) {
      if ((event && !event.target)
          || (event && event.target && (event.target.shapeName !== 'point' && event.target.shapeName !== 'initialAddPoint'))
      ) {
        const pointer = canvas$i.getPointer(event.e);
        if (!isRightMouseButtonClicked$1(pointer)) {
          addFirstPoint(event);
          addFirstPointMode = false;
          if (activeShape$2.previousShapeName === 'newLine'){
            addPointsLinePointers.push(pointer);
          }
        }
      }
    }
    else if (event && event.target && event.target.shapeName === 'point' && (activeShape$2.previousShapeName !== 'newLine') ) {
      addingPoints = false;
      completePolygon(event.target);
      prepareToAddPolygonPoints(activeShape$2);
      currentlyHoveredPoint$2 = getPointInArrayClosestToGivenCoordinates(getPolygonPointsArray(), event.target);
      setSessionDirtyState(true);
    }

    // starting from second point
    else if (!event.target
        || (event.target && (event.target.shapeName !== 'initialAddPoint' && event.target.shapeName !== 'tempPoint'))) {
      const pointer = canvas$i.getPointer(event.e);
      if (!isRightMouseButtonClicked$1(pointer)) {
        addPoint$1(pointer);

        if (activeShape$2.previousShapeName === 'newLine'){
          setActiveShape(activeShape$2);
          addPointsLinePointers.push(pointer);
        }
      }
    }

    else if (event.target && event.target.shapeName === 'tempPoint') {
      mouseIsDownOnTempPoint$1 = true;
    }
  }

  // For enter key
  function setAddPointsLineState(state){
    addPointsLineState = state;
  }

  function getAddPointsLineState(){
    return addPointsLineState;
  }

  function setActiveShape(currentActiveShape){
    activeShape$2 = currentActiveShape;
  }

  // can get shapeId from arguments
  function selectShape$1(shapeId) {
    highlightLabelInTheList(shapeId);
    setRemoveLabelsButtonToDefault();
  }

  function deselectShape$1() {
    removeHighlightOfListLabel();
    setRemoveLabelsButtonToDisabled();
  }

  function isRightMouseButtonClicked$1(pointer) {
    if (coordinatesOfLastMouseHover.x !== pointer.x) {
      return true;
    }
    return false;
  }

  function mouseOverEvents(event) {
    addPointsMouseOver(event);
    if (event.target && event.target.shapeName === 'point') {
      currentlyHoveredPoint$2 = event.target;
    }
  }

  function setAddPointsEventsCanvas(canvasObj) {
    canvas$i = canvasObj;
    activeShape$2 = getPolygonIfEditing();
    selectedPolygonId = getPolygonIdIfEditing();
    addingPoints = false;
    addFirstPointMode = false;
    mouseMoved$2 = false;
    lastHoveredPoint$2 = null;
    ignoredFirstMouseMovement$2 = false;
    currentlyHoveredPoint$2 = null;
    resetAddPointProperties(canvasObj);
    if (selectedPolygonId !== null && selectedPolygonId !== undefined) {
      selectShape$1(selectedPolygonId);
    }
  }

  function moveAddPoints(event) {
    if (addingPoints) {
      moveAddablePoint(event);
    }
  }

  function mouseMove(event) {
    if (addingPoints) {
      const pointer = canvas$i.getPointer(event.e);
      coordinatesOfLastMouseHover = pointer;
      drawLineOnMouseMove(pointer);
    }
    if (ignoredFirstMouseMovement$2) {
      mouseMoved$2 = true;
    } else {
      ignoredFirstMouseMovement$2 = true;
    }
    lastMouseEvent$2 = event;
  }

  function setPolygonNotEditableOnClick() {
    removePolygonPoints();
    selectedPolygonId = null;
    deselectShape$1();
  }

  function getPointInArrayClosestToGivenCoordinates(pointArray, { left, top }) {
    for (let i = 0; i < pointArray.length; i += 1) {
      const point = pointArray[i];
      if (left === point.left) {
        if (top === point.top) {
          setAddPointsLineState(false);
            return point;
        }
      }
    }
    return pointArray[0];
  }

  function addPointViaKeyboard$1() {
    if (!addingPoints) {
      if (!mouseMoved$2) {
        if (lastHoveredPoint$2 && lastHoveredPoint$2.shapeName === 'point') {
          const pointer = canvas$i.getPointer(lastMouseEvent$2.e);
          initializeAddNewPoints(lastHoveredPoint$2, pointer);
          addingPoints = true;
          addFirstPointMode = true;
          selectedNothing = false;
        } else if (currentlyHoveredPoint$2) {
          const pointer = canvas$i.getPointer(getLastMouseMoveEvent());
          initializeAddNewPoints(currentlyHoveredPoint$2, pointer);
          addingPoints = true;
          addFirstPointMode = true;
          selectedNothing = false;
        }
        mouseMoved$2 = true;
      } else if (lastMouseEvent$2 && lastMouseEvent$2.target && lastMouseEvent$2.target.shapeName === 'point') {
        const pointer = canvas$i.getPointer(lastMouseEvent$2.e);
        initializeAddNewPoints(lastMouseEvent$2 && lastMouseEvent$2.target, pointer);
        addingPoints = true;
        addFirstPointMode = true;
        selectedNothing = false;
      }
    } else {
      addPoints(lastMouseEvent$2);
    }
  }

  function mouseOutEvents(event) {
    addPointsMouseOut(event);
    if (event.target) {
      const { target } = event;
      if (target.shapeName === 'point') {
        if (!mouseMoved$2) {
          lastHoveredPoint$2 = target;
        }
      } else if (target.shapeName === 'tempPoint' && target.hoverCursor === 'default') {
        target.hoverCursor = 'move';
      }
    }
    currentlyHoveredPoint$2 = null;
  }

  function getSelectedPolygonIdForAddPoints() {
    return selectedPolygonId;
  }

  function getScrollWidth$2() {
    console.log("??? Get scroll width.");
    // create a div with the scroll
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    // must put it in the document, otherwise sizes will be 0
    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth * 2;
  }

  function topOverflowScroll$2(event, zoomOverflowElement) {
    console.log("??? Top Over Flow Scroll.");
    const currentScrollTopOffset = zoomOverflowElement.scrollTop / getCurrentZoomState();
    const newPositionTop = canvas$i.getPointer(event.e).y - currentScrollTopOffset;
    if (mouseIsDownOnTempPoint$1 && event.target && event.target.shapeName === 'tempPoint') {
      event.target.top = newPositionTop;
      moveAddablePoint(event);
    }
    drawLineOnMouseMove({ x: canvas$i.getPointer(event.e).x, y: newPositionTop });
  }

  function bottomOverflowScroll$2(event, zoomOverflowElement, stubHeight, scrollWidth) {
    console.log("??? Bottom Over flow Scroll.");
    const canvasHeight = stubHeight + scrollWidth;
    const canvasBottom = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
    const result = canvasHeight - canvasBottom;
    const newPositionTop = canvas$i.getPointer(event.e).y + (result / getCurrentZoomState());
    if (mouseIsDownOnTempPoint$1 && event.target && event.target.shapeName === 'tempPoint') {
      event.target.top = newPositionTop;
      moveAddablePoint(event);
    }
    drawLineOnMouseMove({ x: canvas$i.getPointer(event.e).x, y: newPositionTop });
  }

  function defaultScroll$2(event) {
    const currentVerticalScrollDelta = event.e.deltaY / getCurrentZoomState();
    const newPositionTop = canvas$i.getPointer(event.e).y + currentVerticalScrollDelta;
    if (mouseIsDownOnTempPoint$1 && event.target && event.target.shapeName === 'tempPoint') {
      event.target.top = newPositionTop;
      moveAddablePoint(event);
    }
    drawLineOnMouseMove({ x: canvas$i.getPointer(event.e).x, y: newPositionTop });
  }

  // didn't go for scrolling when resizing bounding box, because when holding lower corner
  // and scrolling up above it, the lower corner doesn't change to upper corner, causing the rectangle
  // to move the bottom corner to the top corner
  function shapeScrollEvents$2(event) {
    const currentZoom = getCurrentZoomState();
    if (currentZoom > 1.00001) {
      const stubElement = document.getElementById('stub');
      const stubMarginTop = stubElement.style.marginTop;
      const stubHeightSubstring = stubMarginTop.substring(0, stubMarginTop.length - 2);
      const stubHeight = parseInt(stubHeightSubstring, 10);
      const zoomOverflowElement = document.getElementById('zoom-overflow');
      const currentBotLocation = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
      const futureBotLocation = currentBotLocation + event.e.deltaY;
      const scrollWidth = getDoubleScrollCanvasState() ? getScrollWidth$2() : getScrollWidth$2() / 2;
      if (zoomOverflowElement.scrollTop + event.e.deltaY < 0) {
        topOverflowScroll$2(event, zoomOverflowElement);
      } else if (futureBotLocation > stubHeight + scrollWidth) {
        bottomOverflowScroll$2(event, zoomOverflowElement, stubHeight, scrollWidth);
      } else {
        defaultScroll$2(event);
      }
    }
  }

  // without first point
  function pointMouseUpEvents(event) {
    mouseIsDownOnTempPoint$1 = false;

    // hitting/tapping of existing points of polygon or line
    if (event.target && event.target.shapeName === 'polygon' && (newPolygonSelected || selectedNothing)) {
      activeShape$2 = event.target;
      prepareToAddPolygonPoints(event.target);
      selectedNothing = false;
      newPolygonSelected = false;
    }

    else if ((!event.target && getPolygonEditingStatus()) || (event.target && event.target.shapeName === 'bndBox') ) {
      if (!addingPoints) {
        setPolygonNotEditableOnClick();
      }
    }
  }

  // executed after hitting/tapping Add Points and hitting/tapping the polygon or line
  function prepareToAddPolygonPoints(shape) {
    removePolygonPoints();
    removeEditedPolygonId();
    setEditablePolygon(canvas$i, shape, false, false, true);
    selectedPolygonId = shape.id;
    selectShape$1(selectedPolygonId);
    lastMouseEvent$2 = null;
    mouseMoved$2 = false;
    lastHoveredPoint$2 = null;
    ignoredFirstMouseMovement$2 = false;
  }

  function highlightDefaultIcon(element) {
    element.childNodes[1].style.display = 'none';
    element.childNodes[3].style.display = '';
  }

  function dimDefaultIcon(element) {
    element.childNodes[1].style.display = '';
    element.childNodes[3].style.display = 'none';
  }

  function highlightActiveIcon(element) {
    element.childNodes[5].style.display = 'none';
    element.childNodes[7].style.display = '';
  }

  function dimActiveIcon(element) {
    element.childNodes[5].style.display = '';
    element.childNodes[7].style.display = 'none';
  }

  function switchToDefaultIcon(activeEditLabelButton) {
    activeEditLabelButton.childNodes[1].style.display = '';
    activeEditLabelButton.childNodes[5].style.display = 'none';
  }

  function switchToActiveIcon(element) {
    element.childNodes[1].style.display = 'none';
    element.childNodes[5].style.display = '';
  }

  function switchToHighlightedActiveIcon(element) {
    element.childNodes[3].style.display = 'none';
    element.childNodes[7].style.display = '';
  }

  function switchToHighlightedDefaultIcon(activeEditLabelButton) {
    activeEditLabelButton.childNodes[3].style.display = '';
    activeEditLabelButton.childNodes[7].style.display = 'none';
  }

  function switchToHighlightedDefaultVisibilityIcon(element) {
    element.childNodes[3].style.display = '';
    element.childNodes[7].style.display = 'none';
  }

  // test this in different browsers
  function getDefaultFont(element) {
    const defaultSyle = window.getComputedStyle(element, null);
    const size = defaultSyle.getPropertyValue('font-size');
    const fontFamily = defaultSyle.getPropertyValue('font-family');
    return `${size} ${fontFamily}`;
  }

  function emptyContentEditableFirefoxBugFix(div) {
    if (div.innerHTML === '<br>') div.innerHTML = '';
  }

  function isVerticalScrollPresent(element) {
    return element.scrollHeight > element.clientHeight;
  }

  function setCarretPosition(index, contentEditableElement) {
    let range;
    if (document.createRange) {
      // Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange();
      // false means collapse to end rather than the start
      range.setStart(contentEditableElement.childNodes[0], index);
      range.collapse(false);
      const selection = window.getSelection();
      // remove any selections already made
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.selection) { // IE 8 and lower
      range = document.body.createTextRange();
      range.moveToElementText(contentEditableElement);
      // false means collapse to end rather than the start
      range.collapse(false);
      // make it the visible selection
      range.select();
    }
  }

  function setCaretPositionOnDiv(index, contentEditableElement, space, scrollHorintallyFunc) {
    try {
      setCarretPosition(index, contentEditableElement);
      if (!space) { scrollHorintallyFunc(contentEditableElement.innerHTML.substring(0, index)); }
    } catch (err) {
      setCarretPosition(0, contentEditableElement);
      if (!space) { scrollHorintallyFunc(''); }
    }
  }

  function getCaretPositionOnDiv(editableDiv, paste) {
    const currentCaretPosition = { position: 0, highlightRangeOnPaste: 0 };
    let range = null;
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount) {
        range = selection.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode === editableDiv) {
          currentCaretPosition.position = range.endOffset;
        }
        if (paste) {
          currentCaretPosition.highlightRangeOnPaste = Math.abs(selection.focusOffset
            - selection.anchorOffset);
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() === editableDiv) {
        const tempElement = document.createElement('span');
        editableDiv.insertBefore(tempElement, editableDiv.firstChild);
        const tempRange = range.duplicate();
        tempRange.moveToElementText(tempRange);
        tempRange.setEndPoint('EndToEnd', range);
        currentCaretPosition.position = tempRange.text.length;
      }
    }
    return currentCaretPosition;
  }

  function preprocessPastedText(text) {
    const noReturnChars = text.replace(/(\r\n|\n|\r)/gm, '');
    // code for converting spaces to hythons
    // const spacesToHythons = noReturnChars.replace(/\s/g, '-');
    return noReturnChars;
  }

  function preprocessLabelText(text) {
    return text.trim();
  }

  const buttonPopovers = {};
  const HOVER_TIMEOUT = 500;
  const SWITCH_BUTTON_DISPLAY_PERSISTANCE_TIMEOUT = 200;
  let hasUploadImagesButtonBeenClicked = false;

  const pendingbuttonPopovers = [];
  let activePopover = null;
  let persistButtonPopoverDisplay = false;
  let doNotDisplayButtonAfterTimeoutState = false;

  function setDoNotDisplayButtonAfterTimeoutStateToFalse() {
    doNotDisplayButtonAfterTimeoutState = false;
  }

  function assignLeftSideBarMouseEnterEvent() {
    document.getElementById('left-side-bar').addEventListener('mouseenter', () => {
      doNotDisplayButtonAfterTimeoutState = false;
    });
  }

  function checkIfSettingsButtonNotUp(event) {
    if (event.target.id === 'settings-button') {
      if (!getSettingsPopupOpenState()) {
        return true;
      }
      return false;
    }
    return true;
  }

  function checkIfExportDatasetsButtonNotUp(event) {
    if (event.target.id === 'export-datasets-button') {
      {
        return true;
      }
    }
    return true;
  }

  function displayPopover(middlewareChecks, id) {
    for (let i = 0; i < middlewareChecks.length; i += 1) {
      if (!middlewareChecks[i]()) return;
    }
    pendingbuttonPopovers[0].style.display = 'block';
    activePopover = buttonPopovers[id];
  }

  function checkIfButtonShouldBeDisplayedAfterAfterTimeout() {
    // in firefox, removeActiveButtonPopover is only triggered when an image/images
    // have started to upload, resultantly setting the doNotDisplayButtonAfterTimeoutState
    // property after mouseleave has been triggered, this is a fix to the issue
    if (IS_FIREFOX && hasUploadImagesButtonBeenClicked) {
      hasUploadImagesButtonBeenClicked = false;
      return false;
    }
    return true;
  }

  function removeActiveButtonPopover() {
    if (checkIfButtonShouldBeDisplayedAfterAfterTimeout()) {
      doNotDisplayButtonAfterTimeoutState = true;
    }
    if (activePopover) {
      activePopover.style.display = 'none';
      activePopover = null;
    }
  }

  function checkIfSettingsButtonNotUpMiddleware(event) {
    return checkIfSettingsButtonNotUp(event);
  }

  function checkIfExportDatasetsButtonNotUpMiddleware(event) {
    return checkIfExportDatasetsButtonNotUp(event);
  }

  function mouseEnterCoreButton(event, id) {
    const { tagName } = event.target;
    if (tagName === 'BUTTON' || tagName === 'A') {
      pendingbuttonPopovers.unshift(buttonPopovers[id]);
      if (persistButtonPopoverDisplay) {
        displayPopover([checkIfSettingsButtonNotUpMiddleware.bind(this, event),
          checkIfExportDatasetsButtonNotUpMiddleware.bind(this, event)], id);
      } else {
        setTimeout(() => {
          if (pendingbuttonPopovers.length === 1 && buttonPopovers[id] === pendingbuttonPopovers[0]
              && !doNotDisplayButtonAfterTimeoutState) {
            displayPopover([checkIfSettingsButtonNotUp.bind(this, event),
              checkIfExportDatasetsButtonNotUp.bind(this, event)], id);
          }
          doNotDisplayButtonAfterTimeoutState = false;
        }, HOVER_TIMEOUT);
      }
    }
  }

  // Mouse event on button, pop up  information
  function mouseLeaveCoreButton(event) {
    const { tagName } = event.target;
    if (tagName === 'BUTTON' || tagName === 'A') {
      if (activePopover !== null) {
        activePopover.style.display = 'none';
        activePopover = null;
        persistButtonPopoverDisplay = true;
        setTimeout(() => {
          persistButtonPopoverDisplay = false;
        }, SWITCH_BUTTON_DISPLAY_PERSISTANCE_TIMEOUT);
      }
      pendingbuttonPopovers.pop();
    }
    doNotDisplayButtonAfterTimeoutState = false;
  }

  function addPopoverFunctionalityToButton(buttonElementId, popoverElementId) {
    const buttonElement = document.getElementById(buttonElementId);
    const popoverElement = document.getElementById(popoverElementId);
    if (buttonElement) {
      buttonElement.addEventListener('mouseenter', (event) => {
        if (popoverElement) {
          mouseEnterCoreButton(event, popoverElement.id);
        }
      });
      buttonElement.addEventListener('mouseleave', (event) => {
        mouseLeaveCoreButton(event);
      });
      if (popoverElement) {
        buttonPopovers[popoverElement.id] = popoverElement;
      }
    }
  }

  // firefox bug fix for displaying popovers after uploading an image
  function removeUploadImagesButtonPopoverBugFix() {
    const uploadDatasetsButton = document.getElementById('upload-images-button');
    uploadDatasetsButton.addEventListener('mouseup', () => {
      hasUploadImagesButtonBeenClicked = true;
    });
  }

  function addPopoverFunctionalityToButtons() {
    addPopoverFunctionalityToButton('edit-shapes-button', 'default-button-popover');

    addPopoverFunctionalityToButton('create-line-button', 'line-button-popover');

    addPopoverFunctionalityToButton('create-bounding-box-button', 'bounding-box-button-popover');
    addPopoverFunctionalityToButton('create-polygon-button', 'polygon-button-popover');

    addPopoverFunctionalityToButton('add-points-button', 'add-points-button-popover');
    addPopoverFunctionalityToButton('remove-points-button', 'remove-points-button-popover');
    // addPopoverFunctionalityToButton('upload-datasets-button', 'upload-datasets-button-popover');
    // addPopoverFunctionalityToButton('export-datasets-button', 'export-datasets-button-popover');
    //addPopoverFunctionalityToButton('machine-learning-button', 'machine-learning-button-popover');
    addPopoverFunctionalityToButton('zoom-in-button', 'zoom-in-button-popover');
    addPopoverFunctionalityToButton('zoom-out-button', 'zoom-out-button-popover');
    addPopoverFunctionalityToButton('settings-button', 'settings-button-popover');
    addPopoverFunctionalityToButton('upload-images-button', 'upload-images-button-popover');
    addPopoverFunctionalityToButton('remove-labels-button', 'remove-labels-button-popover');
    addPopoverFunctionalityToButton('remove-images-button', 'remove-images-button-popover');
    addPopoverFunctionalityToButton('previous-image-button', 'previous-image-button-popover');
    addPopoverFunctionalityToButton('next-image-button', 'next-image-button-popover');
    //addPopoverFunctionalityToButton('title-github-mark-container', 'github-mark-button-popover');
  }

  function initialiseCoreButtonPopovers() {
    addPopoverFunctionalityToButtons();
    assignLeftSideBarMouseEnterEvent();
    if (IS_FIREFOX) removeUploadImagesButtonPopoverBugFix();
  }

  let isEditingLabel = false;
  let keyDownEventTimeOut$1 = 0;
  let isVisibilitySelected = false;
  let isVisibilityRestored = false;
  let activeDropdownElements = null;
  let activeLabelTextElement = null;
  let activeLabelId = null;
  let deselectedEditing = false;
  let labelHasBeenDeselected = false;
  let activeShape$1 = null;
  let activeLabelElementId = null;
  let activeEditLabelButton = null;
  let labelListElement = null;
  let currentTableElementScrollPosition = 0;
  let popuplabelOptionsElement = null;
  let lastSelectedLabelOption = null;
  let originalLabelText = null;
  let availableListOptions = [];
  let dropdownElementsWidthDefault = 0;
  let dropdownElementsWidthFull = 0;
  let labelListOverflowParentElement = null;
  let horizontalScrollPresentWhenEditAndScroll = false;
  let mouseHoveredOnLabelEditButton = false;
  let currentlyActiveLabelOptionIndex = 0;
  let chromiumFakeDropdownRightBorderElement = null;
  let chromiumFakeDrodownBottomBorderElement = null;
  let chromiumFakeDropdownBorderElementTopDelta = 0;
  let newFakeDropdownBottomBorderDeltaGenerated = false;
  let chromiumFakeDrodownBottomBorderTopDimension = null;
  let originalActiveDropdownHeight = 0;
  const NEW_ITEM_ANIMATION_DURATION_MILLISECONDS = 300;
  const LABEL_CONTAINER_ELEMENT_ID_PREFIX = 'label-container-';

  function setDropdownElementWidthVariables() {
    if (IS_FIREFOX) {
      dropdownElementsWidthDefault = 171;
      dropdownElementsWidthFull = 206;
    } else {
      dropdownElementsWidthDefault = 170;
      dropdownElementsWidthFull = 205;
    }
  }

  function findLabelListElement() {
    labelListElement = document.getElementById('label-list');
    labelListOverflowParentElement = document.getElementById('label-list-overflow-parent');
  }

  function findPopupElement() {
    popuplabelOptionsElement = document.getElementById('labeller-modal-options');
  }

  function initialiseLabelList() {
    findLabelListElement();
    findPopupElement();
    setDropdownElementWidthVariables();
    setLabelListElementForHighlights(labelListElement, labelListOverflowParentElement);
    keyDownEventTimeOut$1 = getKeyDownEventTimeout();
  }

  function createNewDropdown() {
    const labelDropdownOptions = getLabelOptions();
    let dropdown = '<tbody>';
    for (let i = 0; i < labelDropdownOptions.length; i += 1) {
      const dropdownElement = `<tr><td><div id="labelOption${i}" onMouseEnter="mouseEnterLabelDropdownOption(this, '${labelDropdownOptions[i].color.label}')" onMouseLeave="mouseLeaveLabelDropdownOption(this, true)" class="labelDropdownOption">${labelDropdownOptions[i].text}</div></td></tr>\n`;
      dropdown += dropdownElement;
    }
    dropdown += '</tbody>';
    return dropdown;
  }

  function repopulateDropdown() {
    const dropdown = createNewDropdown();
    const dropdownParentElements = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdownParentElements.length; i += 1) {
      dropdownParentElements[i].innerHTML = dropdown;
    }
  }

  function generateLabelVisibilityMarkup(shapeVisibile) {
    if (shapeVisibile === 'default') {
      return `
      <img class="defaultVisibilityIcon" src="assets/svg/visibility-button.svg" alt="visibility">
      <img class="highlightedVisibilityIcon" src="assets/svg/visibility-button-highlighted.svg" style="display: none" alt="visibility">
      <img class="defaultVisibilityIcon" src="assets/svg/invisible-button.svg" style="display: none" alt="visibility">
      <img class="highlightedVisibilityIcon" src="assets/svg/invisible-button-highlighted.svg" style="display: none" alt="visibility">
    `;
    }
    return `
    <img class="defaultVisibilityIcon" src="assets/svg/visibility-button.svg" style="display: none" alt="visibility">
    <img class="highlightedVisibilityIcon" src="assets/svg/visibility-button-highlighted.svg" style="display: none" alt="visibility">
    <img class="defaultVisibilityIcon" src="assets/svg/invisible-button.svg" alt="visibility">
    <img class="highlightedVisibilityIcon" src="assets/svg/invisible-button-highlighted.svg" style="display: none" alt="visibility">
  `;
  }

  // change to label list item click
  function createLabelElementMarkup$1(labelText, id, backgroundColor, visibility) {
    return `
  <div id="labelId${id}" onMouseEnter="mouseEnterLabel(${id})" onMouseLeave="mouseLeaveLabel(${id})" onClick="labelBtnClick(${id})" class="label${id} labelListItem" style="background-color: ${backgroundColor}; transition: ${NEW_ITEM_ANIMATION_DURATION_MILLISECONDS / 1000}s; transform: translateX(-100%);">
    <div id="${visibility}" onMouseEnter="mouseEnterVisibilityBtn(id, this)" onMouseLeave="mouseLeaveVisibilityBtn(id, this)" onClick="visibilityBtnClick(${id}, this)" style="float:left; user-select: none; padding-right: 5px; width: 12px; cursor: pointer; padding-top: 1px">
      ${generateLabelVisibilityMarkup(visibility)}
    </div>
    <div id="editButton${id}" onMouseEnter="mouseEnterLabelEditBtn(this)" onMouseLeave="mouseLeaveLabelEditBtn(this)" onClick="labelEditBtnClick(${id}, this)" style="float:left; user-select: none; padding-right: 5px; width: 11px; cursor: pointer; padding-top: ${getScreenSizeDelta() > 1.000001 ? 0.5 : 0}px">
      <img class="defaultLabelEditIcon" id="editButton${id}" src="assets/svg/edit.svg" style="padding-left: 1px" alt="edit">
      <img class="highlightedLabelEditIcon" id="editButton${id}" src="assets/svg/edit-highlighted.svg" style="display: none" alt="edit">
      <img class="defaultLabelEditIcon" id="editButton${id}" src="assets/svg/done-tick.svg" style="display: none" alt="edit">
      <img class="highlightedLabelEditTickIcon" id="editButton${id}" src="assets/svg/done-tick-highlighted.svg" style="display: none" alt="edit">
    </div>
    <div id="labelText${id}" spellcheck="false" onkeydown="labelTextKeyDown(event)" ondblclick="labelDblClicked(${id})" class="labelText" contentEditable="false" style="user-select: none; padding-right: 32px; border: 1px solid transparent; display: flow-root; padding-top: ${getScreenSizeDelta() > 1 ? 2 : 0}px;">${labelText}</div>
      <table class="dropdown-content labelDropdown${id}">
      </table>
      <div id="chromium-fake-dropdown-border-fix${id}">
        <div class="chromium-fake-dropdown-border-fix chromium-fake-dropdown-border-fix-width chromium-right-border-fix" style="display: none"></div>
        <div class="chromium-fake-dropdown-border-fix chromium-bottom-border-fix" style="display: none"></div>
      </div>
    </div>
  </div>
  `;
  }

  function initialiseParentElement() {
    return document.createElement('div');
  }

  function scrollHorizontallyToAppropriateWidth(text) {
    let myCanvas = document.createElement('canvas');
    const context = myCanvas.getContext('2d');
    context.font = getDefaultFont(activeLabelTextElement);
    const metrics = context.measureText(text);
    if (isVerticalScrollPresent(labelListOverflowParentElement)
        && metrics.width > 170 - getScrollbarWidth()) {
      labelListOverflowParentElement.scrollLeft = metrics.width - 165 + getScrollbarWidth() / 2;
    } else if (!isVerticalScrollPresent(labelListOverflowParentElement) && metrics.width > 170) {
      labelListOverflowParentElement.scrollLeft = metrics.width - 165;
    } else {
      labelListOverflowParentElement.scrollLeft = 0;
    }
    myCanvas = null;
  }

  function isHorizontalScrollPresent$1() {
    return labelListOverflowParentElement.scrollWidth > labelListOverflowParentElement.clientWidth;
  }

  function pasteHandlerOnDiv(event) {
    event.stopPropagation();
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    const caretOnPaste = getCaretPositionOnDiv(activeLabelTextElement, true);
    const caretPositionEnd = caretOnPaste.position;
    const caretPositionStart = caretPositionEnd - caretOnPaste.highlightRangeOnPaste;
    const preprocessedPastedData = preprocessPastedText(pastedData);
    activeLabelTextElement.innerHTML = activeLabelTextElement.innerHTML.slice(0, caretPositionStart)
     + preprocessedPastedData + activeLabelTextElement.innerHTML.slice(caretPositionEnd);
    setCaretPositionOnDiv(caretPositionStart + preprocessedPastedData.length,
      activeLabelTextElement, false, scrollHorizontallyToAppropriateWidth);
  }

  function unsetAnimationProperties(labelInnerElement) {
    // remove animation properties to prevent dropdown aligment issues and further animations
    labelInnerElement.style.transform = '';
    labelInnerElement.style.transition = '';
  }

  function triggerSlideAnimation(labelId) {
    const labelInnerElement = document.getElementById(`labelId${labelId}`);
    setTimeout(() => {
      // begin animation once the element has been added
      labelInnerElement.style.transform = 'translateX(0%)';
    });
    setTimeout(() => {
      unsetAnimationProperties(labelInnerElement);
    }, NEW_ITEM_ANIMATION_DURATION_MILLISECONDS);
  }

  // the reason for using this is because firefox label list options overlap during bulk animation
  function triggerAnimationChromeOnly(labelId) {
    if (IS_FIREFOX) {
      const labelInnerElement = document.getElementById(`labelId${labelId}`);
      unsetAnimationProperties(labelInnerElement);
    } else {
      triggerSlideAnimation(labelId);
    }
  }

  function addNewLabelToListFromPopup(labelText, id, labelColor) {
    const labelElement = initialiseParentElement();
    labelElement.id = `${LABEL_CONTAINER_ELEMENT_ID_PREFIX}${id}`;
    labelElement.innerHTML = createLabelElementMarkup$1(labelText, id, labelColor, 'default');
    const newRow = labelListElement.insertRow(-1);
    const cell = newRow.insertCell(0);
    cell.appendChild(labelElement);
    labelListElement.scrollLeft = 0;
    labelElement.childNodes[1].addEventListener('paste', pasteHandlerOnDiv);
    repopulateDropdown();
    triggerSlideAnimation(id);
    cell.scrollIntoView();
  }

  function addExistingLabelToList(labelText, id, labelColor, shapeVisible) {
    const labelElement = initialiseParentElement();
    labelElement.id = `${LABEL_CONTAINER_ELEMENT_ID_PREFIX}${id}`;
    let visibility = null;
    if (shapeVisible === true) {
      visibility = 'default';
    } else {
      visibility = 'highlighted';
    }
    labelElement.innerHTML = createLabelElementMarkup$1(labelText, id, labelColor, visibility);
    const newRow = labelListElement.insertRow(-1);
    const cell = newRow.insertCell(0);
    cell.appendChild(labelElement);
    labelElement.childNodes[1].addEventListener('paste', pasteHandlerOnDiv);
    repopulateDropdown();
    triggerAnimationChromeOnly(id);
    cell.scrollIntoView();
  }

  function removeLabelFromListOnShapeDelete(id) {
    if (id != null) {
      let index = 0;
      const parentElementId = `${LABEL_CONTAINER_ELEMENT_ID_PREFIX}${id}`;
      const tableList = labelListElement.childNodes[0].childNodes;
      while (index !== tableList.length) {
        if (tableList[index].childNodes[0].childNodes[0].id === parentElementId) {
          tableList[index].remove();
          break;
        }
        index += 1;
      }
      activeShape$1 = null;
    }
  }

  function updateAssociatedLabelObjectsText(text) {
    changeLabelText(activeLabelId, text);
    changeShapeLabelText(activeLabelId, text);
    highlightShapeFill(activeLabelId);
  }

  function addLabelToDropdown(labelText, dropdownLabelsElem, id, color) {
    const labelElement = initialiseParentElement();
    labelElement.innerHTML = `<div class="labelDropdownOption" id="labelOption${id}" onMouseEnter="mouseEnterLabelDropdownOption(this, '${color}')" onMouseLeave="mouseLeaveLabelDropdownOption(this, true)">${labelText}</div>`;
    const newRow = dropdownLabelsElem.insertRow(-1);
    const cell = newRow.insertCell(0);
    cell.appendChild(labelElement);
  }

  function highlightSelectedLabelOptionOnEditInit() {
    window.labelTextKeyDown({ key: 'stub' });
  }

  function positionDropDownCorrectlyOnScreen() {
    if (activeLabelTextElement) {
      const dropdownElementPosition = activeLabelTextElement.getBoundingClientRect();
      const dropDownOffset = dropdownElementPosition.height + dropdownElementPosition.top;
      if (activeDropdownElements && activeDropdownElements[0]) {
        activeDropdownElements[0].style.top = `${dropDownOffset}px`;
      }
    }
  }

  function deleteAndAddLastRowToRefreshDropdownDiv(dropdownLabelsElement) {
    const labelOptions = getLabelOptions();
    dropdownLabelsElement.deleteRow(labelOptions.length - 1);
    if (labelOptions.length === 6) {
      popuplabelOptionsElement.style.height = '126px';
    } else if (labelOptions.length === 7) {
      addLabelToDropdown('temp horizontal', dropdownLabelsElement);
    }
    window.setTimeout(() => {
      const lastLabel = labelOptions[labelOptions.length - 1];
      addLabelToDropdown(lastLabel.text, dropdownLabelsElement,
        labelOptions.length - 1, lastLabel.color.label);
      if (labelOptions.length === 7) {
        dropdownLabelsElement.deleteRow(6);
      }
      highlightSelectedLabelOptionOnEditInit();
    }, 0);
  }

  function isDropdownVerticalScrollPresent() {
    return activeDropdownElements[0].scrollHeight > activeDropdownElements[0].clientHeight;
  }

  function isDropdownHorizontalScrollPresent() {
    return activeDropdownElements[0].scrollWidth > activeDropdownElements[0].clientWidth;
  }

  function addFakeRightBorder(activeDropdownElementPosition) {
    chromiumFakeDropdownRightBorderElement.style.top = `${activeDropdownElementPosition.top}px`;
    chromiumFakeDropdownRightBorderElement.style.height = `${activeDropdownElementPosition.height}px`;
    chromiumFakeDropdownRightBorderElement.style.display = '';
  }

  function removeFakeBottomBorderOnExistingDropdown() {
    chromiumFakeDrodownBottomBorderElement.style.display = 'none';
    activeDropdownElements[0].style.borderBottom = '';
    // the following do not need to be refreshed on removeChromiumFakeBorderFix() because
    // once the delta has been generated, it is used the same for all the dropdowns that
    // have the horizontal dropdown
    chromiumFakeDropdownBorderElementTopDelta = 0;
    newFakeDropdownBottomBorderDeltaGenerated = false;
  }

  function addFakeBottomBorder(activeDropdownElementPosition) {
    if (activeDropdownElements[0].style.borderBottom === 'none') {
    // the reason why we have a delta here is because activeDropdownElements remembers the height
    // before the bottom border is removed, hence when getBoundingClientRect is called
    // the next time, the height presented is smaller
      if (!newFakeDropdownBottomBorderDeltaGenerated) {
        chromiumFakeDropdownBorderElementTopDelta = originalActiveDropdownHeight
          - activeDropdownElementPosition.height;
        if (isDropdownVerticalScrollPresent() && chromiumFakeDropdownBorderElementTopDelta < 1) {
          chromiumFakeDropdownBorderElementTopDelta = 1;
        }
        newFakeDropdownBottomBorderDeltaGenerated = true;
      }
    }
    const dropdownElementWidthInt = parseInt(activeDropdownElements[0].style.width, 10);
    chromiumFakeDrodownBottomBorderElement.style.width = `${dropdownElementWidthInt}px`;
    if (!chromiumFakeDrodownBottomBorderTopDimension) {
      chromiumFakeDrodownBottomBorderTopDimension = activeDropdownElementPosition.height
      + activeDropdownElementPosition.top + chromiumFakeDropdownBorderElementTopDelta - 0.6;
    }
    chromiumFakeDrodownBottomBorderElement.style.top = `${chromiumFakeDrodownBottomBorderTopDimension}px`;
    originalActiveDropdownHeight = parseInt(activeDropdownElementPosition.height, 10);
    activeDropdownElements[0].style.borderBottom = 'none';
    chromiumFakeDrodownBottomBorderElement.style.display = '';
  }

  // the following is a bug fix for chromium based browsers where the scroll bars
  // do not cover the edge of the table body, meaning that upon hovering on them;
  // the mouse over events would be triggered on the body below it.
  // In this case, it would be the table element highlighting and cursor change
  function setFakeDropdownBorderFixForChromium(id) {
    if (!IS_FIREFOX) {
      const fakeBorderElements = document.getElementById(`chromium-fake-dropdown-border-fix${id}`);
      const activeDropdownElementPosition = activeDropdownElements[0].getBoundingClientRect();
      if (isDropdownVerticalScrollPresent()) {
        chromiumFakeDropdownRightBorderElement = fakeBorderElements.childNodes[1];
        addFakeRightBorder(activeDropdownElementPosition);
      }
      if (isDropdownHorizontalScrollPresent()) {
        chromiumFakeDrodownBottomBorderElement = fakeBorderElements.childNodes[3];
        addFakeBottomBorder(activeDropdownElementPosition);
      } else if (chromiumFakeDrodownBottomBorderElement) {
        removeFakeBottomBorderOnExistingDropdown();
      }
    }
  }

  function changeActiveDropdownElementStyling() {
    const labelListElementScrollLeftVSDropdownMarginLeft = Math.max(-4,
      31 - labelListOverflowParentElement.scrollLeft);
    const labelListElementScrollLeftVSDropdownWidth = Math.min(dropdownElementsWidthFull,
      dropdownElementsWidthDefault + labelListOverflowParentElement.scrollLeft);
    activeDropdownElements[0].style.marginLeft = `${labelListElementScrollLeftVSDropdownMarginLeft}px`;
    activeDropdownElements[0].style.width = `${labelListElementScrollLeftVSDropdownWidth}px`;
    setFakeDropdownBorderFixForChromium(activeLabelId);
  }

  function prepareLabelDivForEditing(id) {
    activeLabelTextElement = document.getElementById(`labelText${id}`);
    activeLabelTextElement.contentEditable = true;
    activeLabelTextElement.style.backgroundColor = 'white';
    activeLabelTextElement.style.borderColor = '#a39f9e';
    activeLabelTextElement.style.paddingLeft = '2px';
    activeEditLabelButton = document.getElementById(`editButton${id}`);
    activeEditLabelButton.style.paddingRight = '3px';
    activeLabelId = id;
    setCaretPositionOnDiv(activeLabelTextElement.innerHTML.length,
      activeLabelTextElement, false, scrollHorizontallyToAppropriateWidth);
    activeDropdownElements = document.getElementsByClassName(`labelDropdown${id}`);
    chromiumFakeDrodownBottomBorderTopDimension = null;
    changeActiveDropdownElementStyling();
    activeDropdownElements[0].classList.toggle('show');
    activeDropdownElements[0].scrollTop = 0;
    activeDropdownElements[0].scrollLeft = 0;
  }

  function initLabelEditing(id) {
    prepareLabelDivForEditing(id);
    deleteAndAddLastRowToRefreshDropdownDiv(activeDropdownElements[0]);
    scrollIntoViewIfNeeded(activeLabelTextElement, labelListOverflowParentElement);
    positionDropDownCorrectlyOnScreen();
    // change this to match wider div
    // const labelDropdownOptions = getLabelOptions();
    // if (labelDropdownOptions.length > 5) {
    //   activeDropdownElements[0].style = 'width: 150px';
    // }
    originalLabelText = activeLabelTextElement.innerHTML;

    // USE THESE TO SEE IF CONTENT VISIBLE, THEN SCROLL TO APPROPRIATE HEIGHT
    // POTENTIALLY CAN CHECK SCROLL HEIGHT AGAINST OVERFLOW ELEMENT HEIGHT WITH SCROLL WIDTH
    // AND THEN SCROLL FURTHER

    availableListOptions = getLabelOptions();
    currentTableElementScrollPosition = labelListOverflowParentElement.scrollTop;
    horizontalScrollPresentWhenEditAndScroll = isHorizontalScrollPresent$1();
    isEditingLabel = true;
  }

  function setToShapeEditModeWhenDrawing() {
    if (!getAddingPolygonPointsState()) {
      if (getRemovingPolygonPointsState()) {
        if (getPolygonDrawingInProgressState()) {
          window.editShapes();
          setDoNotDisplayButtonAfterTimeoutStateToFalse();
        }
      } else {
        window.editShapes();
        setDoNotDisplayButtonAfterTimeoutStateToFalse();
      }
    }
  }

  function getCurrentlySelectedLabelShape() {
    return activeShape$1;
  }

  function selectShape() {
    const eventShape = {};
    eventShape.target = activeShape$1;
    if (getRemovingPolygonPointsState()) {
      pointMouseDownEvents$2(eventShape);
      pointMouseUpEvents$1(eventShape);
    } else if (getAddingPolygonPointsState()) {
      if (isAddingPointsToPolygon()) window.addPoints();
      pointMouseDownEvents$1(eventShape);
      pointMouseUpEvents(eventShape);
    } else {
      polygonMouseDownEvents(eventShape);
      polygonMouseUpEvents(eventShape);
    }
    if (activeShape$1 && activeShape$1.shapeName === 'bndBox') {
      if (!getRemovingPolygonPointsState() && !getAddingPolygonPointsState()) {
        programaticallySelectBoundingBox(activeShape$1);
      }
    }
  }

  function deselectShape() {
    removeHighlightOfListLabel();
    setRemoveLabelsButtonToDisabled();
    if (getRemovingPolygonPointsState()) {
      pointMouseDownEvents$2({});
      pointMouseUpEvents$1({});
    } else if (getAddingPolygonPointsState()) {
      pointMouseDownEvents$1({});
      pointMouseUpEvents({});
    } else {
      polygonMouseDownEvents({});
      polygonMouseUpEvents({});
    }
    if (activeShape$1 && activeShape$1.shapeName === 'bndBox') {
      programaticallyDeselectBoundingBox();
    }
  }

  function selectShapeBeforeLabelEdit(id) {
    if (id !== getLastSelectedShapeId()) {
      setNewShapeSelectedViaLabelListState(true);
    } else {
      setNewShapeSelectedViaLabelListState(false);
    }
    setEditingLabelId(id);
    activeShape$1 = getShapeById(id);
    selectShape();
    initLabelEditing(id);
    labelHasBeenDeselected = false;
    activeLabelElementId = `labelId${id}`;
  }

  function removeChromiumFakeBorderFix() {
    if (chromiumFakeDropdownRightBorderElement) {
      chromiumFakeDropdownRightBorderElement.style.display = 'none';
    }
    if (chromiumFakeDrodownBottomBorderElement) {
      chromiumFakeDrodownBottomBorderElement.style.display = 'none';
    }
  }

  function removeLabelDropDownContent() {
    if (activeDropdownElements[0].classList.contains('show')) {
      activeDropdownElements[0].classList.remove('show');
    }
    removeChromiumFakeBorderFix();
    isEditingLabel = false;
  }

  function resetLabelElement() {
    removeLabelDropDownContent();
    activeLabelTextElement.contentEditable = false;
    activeLabelTextElement.style.backgroundColor = null;
    activeLabelTextElement.style.borderColor = 'transparent';
    activeLabelTextElement.style.paddingLeft = '';
    activeEditLabelButton.style.paddingRight = '5px';
    labelListOverflowParentElement.scrollLeft = 0;
    setEditingLabelId(null);
  }

  function moveSelectedLabelToFrontOfLabelOptions(id, text) {
    if (id !== 0) {
      sendLabelOptionToFront(id);
      const newLabelColor = getLabelColor(text);
      changeShapeColorById(activeLabelId, newLabelColor);
      changeLabelColor(newLabelColor.label);
      repopulateDropdown();
      resetLabellerModalOptions();
    }
  }

  function addNewLabelToLabelOptions(text) {
    const preprocessedText = preprocessLabelText(text);
    if (activeLabelTextElement.innerHTML !== originalLabelText) {
      if (preprocessedText === '') {
        activeLabelTextElement.innerHTML = originalLabelText;
      } else {
        activeLabelTextElement.innerHTML = preprocessedText;
        addToLabelOptions(preprocessedText);
        const newLabelColor = getLabelColor(preprocessedText);
        changeShapeColorById(activeLabelId, newLabelColor);
        changeLabelColor(newLabelColor.label);
        repopulateDropdown();
        resetLabellerModalOptions();
      }
    }
    highlightShapeFill(activeLabelId);
  }

  function stopEditing() {
    activeShape$1 = null;
    switchToDefaultIcon(activeEditLabelButton);
    resetLabelElement();
  }

  function highlightDropdownLabelOption(labelOptionsIndex, divIndex) {
    const [currentlyAvailableDropdownElements] = activeDropdownElements[0].childNodes;
    const labelParenElement = currentlyAvailableDropdownElements.childNodes[divIndex];
    [lastSelectedLabelOption] = labelParenElement.childNodes[0].childNodes;
    const labelColor = availableListOptions[labelOptionsIndex].color.label;
    lastSelectedLabelOption.style.backgroundColor = labelColor;
    scrollIntoViewIfNeeded(lastSelectedLabelOption, activeDropdownElements[0]);
    currentlyActiveLabelOptionIndex = labelOptionsIndex;
  }

  function wasLabelListHorizontalScrollManipulated() {
    if (!horizontalScrollPresentWhenEditAndScroll && isHorizontalScrollPresent$1()) {
      currentTableElementScrollPosition = labelListOverflowParentElement.scrollTop;
      horizontalScrollPresentWhenEditAndScroll = true;
      positionDropDownCorrectlyOnScreen();
      return true;
    }
    if (horizontalScrollPresentWhenEditAndScroll && !isHorizontalScrollPresent$1()) {
      currentTableElementScrollPosition = labelListOverflowParentElement.scrollTop;
      horizontalScrollPresentWhenEditAndScroll = false;
      positionDropDownCorrectlyOnScreen();
      return true;
    }
    return false;
  }

  function removeAllLabelListItems() {
    const newtbody = document.createElement('tbody');
    if (labelListElement.childNodes[0]) {
      labelListElement.replaceChild(newtbody, labelListElement.childNodes[0]);
    }
  }

  function setMLGeneratedPalletteToOriginal(shape) {
    updateNumberOfUncheckedMLImages();
    shape.fill = shape.trueFill;
    shape.stroke = shape.trueStroke;
    shape.MLPallette = false;
  }

  function highlightLabel(currentlySelectedShapeName, idArg) {
    const id = idArg !== undefined ? idArg : activeLabelId;
    if (getRemovingPolygonPointsState() || getAddingPolygonPointsState()) {
      if (currentlySelectedShapeName !== 'bndBox') {
        highlightLabelInTheList(id);
        setRemoveLabelsButtonToDefault();
      }
    } else {
      highlightLabelInTheList(id);
      setRemoveLabelsButtonToDefault();
    }
  }

  function cancelEditingLabelInLabelList() {
    deselectedEditing = true;
    const currentlySelectedShapeName = activeShape$1.shapeName;
    activeShape$1 = null;
    if (mouseHoveredOnLabelEditButton) {
      switchToHighlightedDefaultIcon(activeEditLabelButton);
    } else {
      switchToDefaultIcon(activeEditLabelButton);
    }
    addNewLabelToLabelOptions(activeLabelTextElement.innerHTML);
    resetLabelElement();
    highlightLabel(currentlySelectedShapeName);
  }

  function isEditingLabelInLabelList() {
    return isEditingLabel;
  }

  function finishEditingLabelList(event) {
    if (isEditingLabel) {
      if (event.target.matches('.labelDropdownOption')) {
        const currentlySelectedShapeName = activeShape$1 ? activeShape$1.shapeName : null;
        const newText = event.target.innerHTML;
        activeLabelTextElement.innerHTML = newText;
        updateAssociatedLabelObjectsText(newText);
        highlightShapeFill(activeLabelId);
        removeLabelDropDownContent();
        stopEditing();
        moveSelectedLabelToFrontOfLabelOptions(event.target.id.substring(11, 12), newText);
        highlightLabel(currentlySelectedShapeName, activeLabelId);
      } else if (event.target.id === `labelText${activeLabelId}` || event.target.matches('.dropdown-content')
        || event.target.matches('.chromium-fake-dropdown-border-fix')) ; else if (event.target.id === `editButton${activeLabelId}`) {
        if (!labelHasBeenDeselected) {
          deselectedEditing = true;
          switchToHighlightedDefaultIcon(activeEditLabelButton);
          addNewLabelToLabelOptions(activeLabelTextElement.innerHTML);
          resetLabelElement();
        }
      } else if (event.target.nodeName === 'CANVAS' || event.target.className === 'toolkit-button-icon'
          || event.target.className === 'toolkit-button-text' || event.target.id === activeLabelElementId) {
        addNewLabelToLabelOptions(activeLabelTextElement.innerHTML);
        stopEditing();
      } else {
        addNewLabelToLabelOptions(activeLabelTextElement.innerHTML);
        stopEditing();
        deselectShape();
      }
    }
  }

  function cancelEditingViaKeyboard() {
    activeLabelTextElement.innerHTML = originalLabelText;
    cancelEditingLabelInLabelList();
  }

  function arrowKeyEventsForLabelList(key) {
    const currentlyHighlightedElement = getCurrentlyHighlightedElement()
      .parentElement.parentElement.parentElement;
    if (key === 'ArrowDown') {
      if (currentlyHighlightedElement.nextSibling) {
        currentlyHighlightedElement.nextSibling.childNodes[0].childNodes[0].childNodes[1].dispatchEvent(new Event('click'));
      }
    } else if (key === 'ArrowUp') {
      if (currentlyHighlightedElement.previousSibling) {
        currentlyHighlightedElement.previousSibling.childNodes[0].childNodes[0].childNodes[1].dispatchEvent(new Event('click'));
      }
    }
  }

  // the labelTextKeyDown event handles the update of a new text word
  function arrowKeyEventsForLabelOtionsList(key) {
    if (key === 'ArrowDown') {
      if (currentlyActiveLabelOptionIndex !== null) {
        const isBeforeLastElement = currentlyActiveLabelOptionIndex
          === availableListOptions.length - 2;
        const lastElementIndex = isBeforeLastElement ? currentlyActiveLabelOptionIndex * 2 + 1
          : currentlyActiveLabelOptionIndex * 2;
        const { nextSibling } = activeDropdownElements[0].childNodes[0]
          .childNodes[lastElementIndex].nextSibling;
        if (nextSibling) {
          const optionElement = nextSibling.childNodes[0].childNodes[0];
          const text = isBeforeLastElement ? optionElement.childNodes[0].innerHTML
            : optionElement.innerHTML;
          activeLabelTextElement.innerHTML = text;
        }
      } else {
        activeLabelTextElement.innerHTML = activeDropdownElements[0].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].innerHTML;
      }
    } else if (key === 'ArrowUp') {
      if (currentlyActiveLabelOptionIndex !== null) {
        const { previousSibling } = activeDropdownElements[0].childNodes[0]
          .childNodes[currentlyActiveLabelOptionIndex * 2];
        if (previousSibling) {
          activeLabelTextElement.innerHTML = previousSibling.previousSibling.childNodes[0]
            .childNodes[0].innerHTML;
        }
      } else {
        activeLabelTextElement.innerHTML = activeDropdownElements[0].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].innerHTML;
      }
    }
  }

  window.labelTextKeyDown = (event) => {
    if (event.key === 'Delete') return;
    if (event.key === 'Enter') {
      cancelEditingLabelInLabelList();
    } else {
      window.setTimeout(() => {
        if (event.code === 'Space') {
          const currentCaretPosition = getCaretPositionOnDiv(activeLabelTextElement).position;
          setCaretPositionOnDiv(currentCaretPosition, activeLabelTextElement,
            true, scrollHorizontallyToAppropriateWidth);
        }
        if (IS_FIREFOX && event.code === 'Backspace') emptyContentEditableFirefoxBugFix(activeLabelTextElement);
        if (lastSelectedLabelOption) {
          lastSelectedLabelOption.style.backgroundColor = '';
        }
        let found = false;
        for (let i = 0; i < availableListOptions.length - 1; i += 1) {
          if (availableListOptions[i].text === activeLabelTextElement.innerHTML) {
            highlightDropdownLabelOption(i, i * 2);
            found = true;
            break;
          }
        }
        if (!found) {
          const lastLabelOptionIndex = availableListOptions.length - 1;
          currentlyActiveLabelOptionIndex = null;
          if (availableListOptions[lastLabelOptionIndex].text === activeLabelTextElement.innerHTML) {
            highlightDropdownLabelOption(lastLabelOptionIndex, lastLabelOptionIndex * 2 + 1);
          }
        }
        changeActiveDropdownElementStyling();
        updateAssociatedLabelObjectsText(activeLabelTextElement.innerHTML);
      }, keyDownEventTimeOut$1);
    }
  };

  window.labelBtnClick = (id) => {
    setToShapeEditModeWhenDrawing();
    activeShape$1 = getShapeById(id);
    highlightLabel(activeShape$1.shapeName, id);
    if (!isVisibilitySelected) {
      if (getShapeVisibilityById(id)) {
        selectShape();
      } else if (activeShape$1 && activeShape$1.shapeName === 'bndBox') {
        programaticallyDeselectBoundingBox();
      } else {
        removePolygonPoints();
        if (getRemovingPolygonPointsState()) {
          setPolygonNotEditableOnClick$1();
        } else if (getAddingPolygonPointsState()) {
          setPolygonNotEditableOnClick();
        } else {
          removeEditedPolygonId();
          setShapeToInvisible();
        }
      }
    } else {
      if (isVisibilityRestored) {
        if (getRemovingPolygonPointsState()) {
          setPolygonNotEditableOnClick$1();
        } else if (getAddingPolygonPointsState()) {
          setPolygonNotEditableOnClick();
        }
        selectShape();
      } else {
        removePolygonPoints();
        setShapeToInvisible();
        if (activeShape$1 && activeShape$1.shapeName === 'bndBox') {
          programaticallyDeselectBoundingBox();
        }
      }
      isVisibilitySelected = false;
    }
  };

  window.labelListScroll = () => {
    if (currentTableElementScrollPosition !== labelListOverflowParentElement.scrollTop) {
      if (!wasLabelListHorizontalScrollManipulated()) {
        if (activeDropdownElements && activeDropdownElements[0] && activeDropdownElements[0].classList.contains('show')) {
          addNewLabelToLabelOptions(activeLabelTextElement.innerHTML);
          stopEditing();
        }
      }
    }
  };

  window.mouseEnterLabelDropdownOption = (element, color) => {
    element.style.backgroundColor = color;
  };

  window.mouseLeaveLabelDropdownOption = (element, labelOption) => {
    if (labelOption) {
      const idNumber = parseInt(element.id.match(/\d+$/)[0], 10);
      if (currentlyActiveLabelOptionIndex !== idNumber) {
        element.style.backgroundColor = '';
      }
    } else if (element.id !== 'used') {
      element.style.backgroundColor = '';
    }
  };

  window.mouseEnterVisibilityBtn = (id, element) => {
    if (id === 'default') {
      highlightDefaultIcon(element);
    } else {
      highlightActiveIcon(element);
    }
  };

  window.mouseLeaveVisibilityBtn = (id, element) => {
    if (id === 'default') {
      dimDefaultIcon(element);
    } else {
      dimActiveIcon(element);
    }
  };

  window.visibilityBtnClick = (id, element) => {
    isVisibilityRestored = changeShapeVisibilityById(id);
    if (getLabelsVisibilityState()) changeLabelVisibilityById(id);
    changeVisibilityButtonActiveFlagById(id);
    isVisibilitySelected = true;
    if (element.id === 'default') {
      element.id = 'highlighted';
      if (getRemovingPolygonPointsState()) {
        setPolygonNotEditableOnClick$1();
      } else if (getAddingPolygonPointsState()) {
        if (isAddingPointsToPolygon()) window.addPoints();
        setPolygonNotEditableOnClick();
      }
      switchToHighlightedActiveIcon(element);
    } else {
      element.id = 'default';
      switchToHighlightedDefaultVisibilityIcon(element);
    }
  };

  window.mouseEnterLabelEditBtn = (element) => {
    if (isEditingLabel) {
      mouseHoveredOnLabelEditButton = element.id === `editButton${activeLabelId}`;
    } else {
      mouseHoveredOnLabelEditButton = true;
    }
    if (!isEditingLabel) {
      highlightDefaultIcon(element);
    } else if (activeEditLabelButton.id !== element.id) {
      highlightDefaultIcon(element);
    } else {
      highlightActiveIcon(element);
    }
  };

  window.mouseLeaveLabelEditBtn = (element) => {
    mouseHoveredOnLabelEditButton = false;
    if (!isEditingLabel) {
      dimDefaultIcon(element);
    } else if (activeEditLabelButton.id !== element.id) {
      dimDefaultIcon(element);
    } else {
      dimActiveIcon(element);
    }
  };

  window.labelEditBtnClick = (id, element) => {
    if (id !== activeLabelId) {
      selectShapeBeforeLabelEdit(id);
      switchToHighlightedActiveIcon(element);
    } else if (deselectedEditing) {
      deselectedEditing = false;
      labelHasBeenDeselected = true;
    } else if (!deselectedEditing) {
      selectShapeBeforeLabelEdit(id);
      switchToHighlightedActiveIcon(element);
    }
  };

  window.labelDblClicked = (id) => {
    if (!isEditingLabel) {
      initLabelEditing(id);
      const editElement = document.getElementById(`editButton${id}`);
      switchToActiveIcon(editElement);
      labelHasBeenDeselected = false;
    }
  };

  window.mouseEnterLabel = (id) => {
    if (!getBoundingBoxScalingState() && !getShapeMovingState()) {
      if (getShapeById(id).MLPallette) {
        setMLGeneratedPalletteToOriginal(getShapeById(id));
      }
      highlightShapeFill(id);
    }
  };

  window.mouseLeaveLabel = (id) => {
    if (!getBoundingBoxScalingState() && !getShapeMovingState()) {
      defaultShapeFill(id);
    }
  };

  let rightBoundingBoxDelta$1 = 0;

  function preventTopOutOfBoundsBoundingBoxOnNewObject(shape) {
    if (shape.top < 0) {
      shape.top = 0;
    }
  }

  function preventTopOutOfBoundsPolygonOnNewObject(shape) {
    if (shape.top < 0) {
      shape.points.forEach((point) => {
        if (point.y < 0) {
          point.y = 0;
        }
      });
    }
  }

  function preventLeftOutOfBoundsBoundingBoxOnNewObject(shape) {
    if (shape.left < 0) {
      shape.left = 0;
    }
  }

  function preventLeftOutOfBoundsPolygonOnNewObject(shape) {
    if (shape.left < 0) {
      shape.points.forEach((point) => {
        if (point.x < 0) {
          point.x = 0;
        }
      });
    }
  }

  function preventRightOutOfBoundsBoundingBoxOnNewObject(shape, imageWidth) {
    if (shape.left + shape.width > imageWidth - rightBoundingBoxDelta$1) {
      shape.width = imageWidth - shape.left - 2.4;
    }
  }

  function preventRightOutOfBoundsPolygonOnNewObject(shape, imageWidth) {
    if (shape.left + shape.width > imageWidth - 1.8) {
      shape.points.forEach((point) => {
        if (point.x + 1 > imageWidth - 1.8) {
          point.x -= 1.8;
        }
      });
    }
  }

  function preventBottomOutOfBoundsBoundingBoxOnNewObject(shape, imageHeight) {
    if (shape.top + shape.height > imageHeight - 2) {
      shape.height = imageHeight - shape.top - 2;
    }
  }

  function preventBottomOutOfBoundsPolygonOnNewObject(shape, imageHeight) {
    if (shape.top + shape.height > imageHeight - 2) {
      shape.points.forEach((point) => {
        if (point.y + 1 > imageHeight - 2) {
          point.y -= 1.8;
        }
      });
    }
  }

  function preventOutOfBoundsOnNewObject(shape, imageScalingDimensions, imageLengthDimensions) {
    const imageHeight = imageLengthDimensions.height * imageScalingDimensions.scaleY;
    const imageWidth = imageLengthDimensions.width * imageScalingDimensions.scaleX;
    shape.setCoords();
    if (shape.shapeName === 'bndBox') {
      preventRightOutOfBoundsBoundingBoxOnNewObject(shape, imageWidth);
      preventBottomOutOfBoundsBoundingBoxOnNewObject(shape, imageHeight);
      preventTopOutOfBoundsBoundingBoxOnNewObject(shape);
      preventLeftOutOfBoundsBoundingBoxOnNewObject(shape);
    } else if (shape.shapeName === 'polygon') {
      preventRightOutOfBoundsPolygonOnNewObject(shape, imageWidth);
      preventBottomOutOfBoundsPolygonOnNewObject(shape, imageHeight);
      preventTopOutOfBoundsPolygonOnNewObject(shape);
      preventLeftOutOfBoundsPolygonOnNewObject(shape);
    }
  }

  function setRightBoundingBoxNewObjectDelta(delta) {
    rightBoundingBoxDelta$1 = delta;
  }

  // import fabric from 'fabric.js';

  let canvas1 = null;
  let canvas2 = null;
  let activeCanvasRef = null;

  function setBoundingBoxEditToolsToBeTransparent() {
    fabric.Object.prototype.transparentCorners = false;
  }

  function createNewCanvas() {
    canvas1 = new fabric.Canvas('c', { selection: false, width: 1, height: 1 });
    canvas2 = new fabric.Canvas('d', { selection: false, width: 1, height: 1 });
    activeCanvasRef = 'canvas1';
    return canvas1;
  }

  function reasignCanvas() {
    if (activeCanvasRef === 'canvas1') {
      activeCanvasRef = 'canvas2';
      return canvas2;
    }
    activeCanvasRef = 'canvas1';
    return canvas1;
  }

  function getCanvasReferences() {
    return { canvas1, canvas2 };
  }

  // the following is used to fix bounding box stretching bugs within a canvas
  // and when switching between older and newer ones
  function setScalingEventListeners() {
    const { canvas1, canvas2 } = getCanvasReferences();
    if (canvas1 && canvas1.__eventListeners
      && canvas1.__eventListeners['object:scaling'] && canvas1.__eventListeners['object:scaling'].length > 1) {
      canvas1.__eventListeners['object:scaling'].pop();
    }
    if (canvas2 && canvas2.__eventListeners
     && canvas2.__eventListeners['object:scaling'].length > 1) {
      canvas2.__eventListeners['object:scaling'].pop();
    }
  }

  // Before every Mode
  function purgeCanvasMouseEvents(canvas) {
    if (canvas.__eventListeners) {
      canvas.__eventListeners['mouse:down'] = [];
      canvas.__eventListeners['mouse:over'] = [];
      canvas.__eventListeners['mouse:out'] = [];
      canvas.__eventListeners['mouse:move'] = [];
      canvas.__eventListeners['mouse:up'] = [];
      canvas.__eventListeners['mouse:wheel'] = [];
      canvas.__eventListeners['object:moving'] = [];
      setScalingEventListeners();
    }
  }

  const boundingBoxProps$1 = {};

  let tempBoundingBoxStrokeWidth = 2;
  let finalBoundingBoxStrokeWidth = 1.75;

  function setZoomInProperties(boundingBoxRatio) {
    tempBoundingBoxStrokeWidth -= tempBoundingBoxStrokeWidth * boundingBoxRatio;
    finalBoundingBoxStrokeWidth -= finalBoundingBoxStrokeWidth * boundingBoxRatio;
  }

  function setZoomOutProperties(boundingBoxRatio) {
    tempBoundingBoxStrokeWidth *= boundingBoxRatio;
    finalBoundingBoxStrokeWidth *= boundingBoxRatio;
  }

  function getTempBoundingBoxProps(coordinates) {
    return {
      left: coordinates.origX,
      top: coordinates.origY,
      stroke: 'hsla(112, 57%, 50%, 1)',
      strokeWidth: tempBoundingBoxStrokeWidth,
      fill: 'rgba(255,0,0,0)',
      shapeName: 'bndBoxTemp',
      objectCaching: false,
    };
  }

  function getFinalBoundingBoxProps() {
    return {
      shapeName: 'bndBox',
      objectCaching: false,
      selectable: false,
      hasRotatingPoint: false,
      perPixelTargetFind: false,
      cornerSize: 8,
      strokeWidth: finalBoundingBoxStrokeWidth,
      lockScalingFlip: true,
    };
  }

  function getStandaloneBoundingBoxProperties(imageDimensions) {
    return {
      shapeName: 'bndBox',
      objectCaching: false,
      selectable: false,
      hasRotatingPoint: false,
      perPixelTargetFind: false,
      cornerSize: 8,
      strokeWidth: finalBoundingBoxStrokeWidth,
      left: imageDimensions.left * imageDimensions.scaleX,
      top: imageDimensions.top * imageDimensions.scaleY,
      width: imageDimensions.width * imageDimensions.scaleX,
      height: imageDimensions.height * imageDimensions.scaleY,
      stroke: 'hsla(112, 57%, 50%, 1)',
      fill: 'rgba(255,0,0,0)',
      lockScalingFlip: true,
    };
  }

  // http://fabricjs.com/controls-customization
  (function setProperties() {
    boundingBoxProps$1.tempBoundingBoxProps = getTempBoundingBoxProps;
    boundingBoxProps$1.finalBoundingBoxProps = getFinalBoundingBoxProps;
    boundingBoxProps$1.setZoomInProperties = setZoomInProperties;
    boundingBoxProps$1.setZoomOutProperties = setZoomOutProperties;
    boundingBoxProps$1.getStandaloneBoundingBoxProperties = getStandaloneBoundingBoxProperties;
  }());

  // import fabric from 'fabric.js';

  let canvas$h = null;
  let createNewBoundingBoxBtnClicked = false;
  let leftMouseBtnDown = false;
  const boundingBoxProps = {};
  let boundingBox = null;
  let lastMouseEvent$1 = null;
  let drawingFinished$1 = false;
  let finishDrawingBoundingBoxClick = null;
  let rightBoundingBoxDelta = 0;

  function checkCanvasBoundaries(pointer) {
    if (getCurrentZoomState() > 1.00001) {
      const { height, width } = getImageProperties();
      const imageHeight = height * getCurrentZoomState();
      const imageWidth = width * getCurrentZoomState();
      if (pointer.x > imageWidth / getCurrentZoomState() - getCurrentZoomState()) {
        pointer.x = imageWidth / getCurrentZoomState() - 2;
      }
      if (pointer.y > imageHeight / getCurrentZoomState() - getCurrentZoomState()) {
        pointer.y = imageHeight / getCurrentZoomState() - 1.5;
      }
    } else {
      if (pointer.x > canvas$h.width - rightBoundingBoxDelta) {
        pointer.x = canvas$h.width - rightBoundingBoxDelta;
      }
      if (pointer.y > canvas$h.height - 1.5) {
        pointer.y = canvas$h.height - 1.5;
      }
    }
  }

  function instantiateNewBoundingBox() {
    if (createNewBoundingBoxBtnClicked && !getBoundingBoxDrawingInProgressState()) {
      let pointer = canvas$h.getPointer(lastMouseEvent$1.e);
      if (!pointer.x || !pointer.y) {
        const lastMouseMoveEvent = getLastMouseMoveEvent();
        const lastCanvasPointer = canvas$h.getPointer(lastMouseMoveEvent);
        if (!lastCanvasPointer.x || !lastCanvasPointer.y) return;
        pointer = canvas$h.getPointer(lastMouseMoveEvent);
      }
      checkCanvasBoundaries(pointer);
      leftMouseBtnDown = true;
      boundingBoxProps.origX = pointer.x < 0 ? 0 : pointer.x;
      boundingBoxProps.origY = pointer.y < 0 ? 0 : pointer.y;
      boundingBox = new fabric.Rect(boundingBoxProps$1.tempBoundingBoxProps(boundingBoxProps));
      canvas$h.add(boundingBox);
      setBoundingBoxDrawingInProgressState(true);
    }
  }

  function deselectBoundingBox() {
    if (canvas$h) {
      canvas$h.discardActiveObject();
      canvas$h.renderAll();
    }
  }

  function setCursorMode$1(resetting) {
    if (getCrosshairForBoundingBoxVisibleState()) {
      setDrawWithCrosshairMode(canvas$h, resetting);
      setCrosshairUsedOnCanvasState(true);
    } else {
      setDrawCursorMode(canvas$h);
    }
  }

  function resetDrawBoundingBoxMode() {
    setCreateBoundingBoxButtonToActive();
    setReadyToDrawShapeState(true);
    setCursorMode$1(true);
    createNewBoundingBoxBtnClicked = true;
    drawingFinished$1 = false;
    setBoundingBoxDrawingInProgressState(false);
  }

  function clearBoundingBoxData() {
    if (getBoundingBoxDrawingInProgressState()) {
      canvas$h.remove(boundingBox);
      boundingBox = null;
      resetDrawBoundingBoxMode();
      leftMouseBtnDown = false;
    }
    setBoundingBoxDrawingInProgressState(false);
    setCrosshairUsedOnCanvasState(false);
    removeExecutedFunctionOnMouseOver();
    removeExecutedFunctionOnMouseOut();
    removeCrosshair(canvas$h);
  }

  // if the right or bottom side of the drawn bounding box look a bit too far,
  // then reduce the delta values

  // create button to toggle crosshair in settings
  // if going with an expanding button, consider whether the bbox draw button should stay blue after
  // clicking it again, also consider screen size scaling

  let mouseMovedLeft = false;
  let mouseMovedTop = false;

  function drawBoundingBox(event) {
    lastMouseEvent$1 = event;
    if (getCrosshairUsedOnCanvasState()) moveCanvasCrosshair(event, canvas$h);
    if (!leftMouseBtnDown) return;
    const pointer = canvas$h.getPointer(event.e);
    if (getCurrentZoomState() > 1.00001) {
      const { height, width } = getImageProperties();
      const imageHeight = height * getCurrentZoomState();
      const imageWidth = width * getCurrentZoomState();
      // right
      if (boundingBoxProps.origX < pointer.x) {
        if (pointer.x > imageWidth / getCurrentZoomState() - getCurrentZoomState()) {
          boundingBox.set(
            { width: imageWidth / getCurrentZoomState() - boundingBoxProps.origX - 2 },
          );
        } else if (mouseMovedLeft) {
          boundingBox.set({ left: boundingBoxProps.origX });
          boundingBox.set({ width: pointer.x - boundingBoxProps.origX });
          mouseMovedLeft = false;
        } else {
          boundingBox.set({ width: pointer.x - boundingBoxProps.origX });
        }
      }
      // bottom
      if (boundingBoxProps.origY < pointer.y) {
        if (pointer.y > imageHeight / getCurrentZoomState() - getCurrentZoomState()) {
          boundingBox.set(
            { height: imageHeight / getCurrentZoomState() - boundingBoxProps.origY - 1.5 },
          );
        } else if (mouseMovedTop) {
          boundingBox.set({ top: boundingBoxProps.origY });
          boundingBox.set({ height: pointer.y - boundingBoxProps.origY - 1.5 });
          mouseMovedTop = false;
        } else {
          boundingBox.set({ height: pointer.y - boundingBoxProps.origY - 1.5 });
        }
      }
    } else {
      // right
      if (boundingBoxProps.origX < pointer.x) {
        if (pointer.x > canvas$h.width - rightBoundingBoxDelta) {
          boundingBox.set({
            width: Math.floor(canvas$h.width - boundingBoxProps.origX - rightBoundingBoxDelta),
          });
        } else if (mouseMovedLeft) {
          boundingBox.set({ left: boundingBoxProps.origX });
          boundingBox.set({ width: pointer.x - boundingBoxProps.origX + 0.5 });
          mouseMovedLeft = false;
        } else {
          boundingBox.set({ width: pointer.x - boundingBoxProps.origX + 0.5 });
        }
      }
      // bottom
      if (boundingBoxProps.origY < pointer.y) {
        if (pointer.y > canvas$h.height) {
          boundingBox.set({ height: canvas$h.height - boundingBoxProps.origY - 1.5 });
        } else if (mouseMovedTop) {
          boundingBox.set({ top: boundingBoxProps.origY });
          boundingBox.set({ height: pointer.y - boundingBoxProps.origY - 1.5 });
          mouseMovedTop = false;
        } else {
          boundingBox.set({ height: pointer.y - boundingBoxProps.origY - 1.5 });
        }
      }
    }
    // top
    if (boundingBoxProps.origY > pointer.y) {
      if (pointer.y < 0) {
        boundingBox.set(({ top: 0 }));
        boundingBox.set({ height: boundingBoxProps.origY });
      } else {
        boundingBox.set({ top: pointer.y });
        boundingBox.set({ height: boundingBoxProps.origY - pointer.y });
        mouseMovedTop = true;
      }
    }
    // left
    if (boundingBoxProps.origX > pointer.x) {
      if (pointer.x < 0) {
        boundingBox.set(({ left: 0 }));
        boundingBox.set(({ width: boundingBoxProps.origX }));
      } else {
        boundingBox.set({ left: pointer.x });
        boundingBox.set({ width: boundingBoxProps.origX - pointer.x });
        mouseMovedLeft = true;
      }
    }
    canvas$h.renderAll();
  }

  function lockMovementIfAssertedByState$1(boundingBoxObj) {
    if (!getMovableObjectsState()) {
      const immovableObjectProps = {
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'default',
      };
      boundingBoxObj.set(immovableObjectProps);
    }
  }

  function isBoundingBoxDrawingFinished() {
    return drawingFinished$1;
  }

  function finishDrawingBoundingBoxFunc() {
    if (leftMouseBtnDown && getBoundingBoxDrawingInProgressState()) {
      createNewBoundingBoxBtnClicked = false;
      leftMouseBtnDown = false;
      boundingBox.setCoords();
      boundingBox.set(boundingBoxProps$1.finalBoundingBoxProps());
      lockMovementIfAssertedByState$1(boundingBox);
      drawingFinished$1 = true;
      setReadyToDrawShapeState(false);
      prepareLabelShape(boundingBox, canvas$h);
      const pointer = canvas$h.getPointer(lastMouseEvent$1.e);
      showLabellerModal(pointer.x, pointer.y);
      setBoundingBoxDrawingInProgressState(false);
      boundingBox = null;
      setSessionDirtyState(true);
    }
  }

  function finishDrawingBoundingBox() {
    finishDrawingBoundingBoxClick();
  }

  function assignSetEditablePolygonOnClickFunc() {
    finishDrawingBoundingBoxClick = finishDrawingBoundingBoxFunc;
  }

  function skipMouseUpEvent$1() {
    canvas$h.__eventListeners['mouse:down'] = [];
    canvas$h.on('mouse:down', () => {
      instantiateNewBoundingBox();
    });
    assignSetEditablePolygonOnClickFunc();
  }

  function setRightBoundingBoxDrawingDelta(delta) {
    rightBoundingBoxDelta = delta;
  }

  function prepareCanvasForNewBoundingBox(canvasObj) {
    canvas$h = canvasObj;
    createNewBoundingBoxBtnClicked = true;
    drawingFinished$1 = false;
    setCursorMode$1();
    setReadyToDrawShapeState(true);
    canvas$h.discardActiveObject();
    if (getAddingPolygonPointsState()) {
      setAddPointsButtonToDefault();
      setAddingPolygonPointsState(false);
      finishDrawingBoundingBoxClick = skipMouseUpEvent$1;
    } else {
      finishDrawingBoundingBoxClick = finishDrawingBoundingBoxFunc;
    }
  }

  function prepareCanvasForNewBoundingBoxesFromExternalSources(canvasObj) {
    canvas$h = canvasObj;
    setDrawCursorMode(canvas$h);
  }

  function topOverflowScroll$1(event, zoomOverflowElement) {
    const currentScrollTopOffset = zoomOverflowElement.scrollTop / getCurrentZoomState();
    const newPositionTop = canvas$h.getPointer(event.e).y - currentScrollTopOffset;
    if (boundingBoxProps.origY > newPositionTop) {
      boundingBox.set({ top: newPositionTop });
    } else if (boundingBoxProps.origY < newPositionTop) {
      boundingBox.set({ top: boundingBoxProps.origY });
    }
    boundingBox.set({ height: Math.abs(boundingBoxProps.origY - newPositionTop) });
  }

  function bottomOverflowScroll$1(event, zoomOverflowElement, stubHeight, scrollWidth) {
    const canvasHeight = stubHeight + scrollWidth;
    const canvasBottom = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
    const result = canvasHeight - canvasBottom;
    const newPositionTop = canvas$h.getPointer(event.e).y + (result / getCurrentZoomState());
    if (boundingBoxProps.origY > newPositionTop) {
      boundingBox.set({ top: newPositionTop });
    } else if (boundingBoxProps.origY < newPositionTop) {
      boundingBox.set({ top: boundingBoxProps.origY });
    }
    boundingBox.set({ height: Math.abs(boundingBoxProps.origY - newPositionTop) });
  }

  function defaultScroll$1(event) {
    const currentVerticalScrollDelta = event.e.deltaY / getCurrentZoomState();
    const newPositionTop = canvas$h.getPointer(event.e).y + currentVerticalScrollDelta;
    if (boundingBoxProps.origY > newPositionTop) {
      boundingBox.set({ top: newPositionTop });
    } else if (boundingBoxProps.origY < newPositionTop) {
      boundingBox.set({ top: boundingBoxProps.origY });
    }
    boundingBox.set({ height: Math.abs(boundingBoxProps.origY - newPositionTop) });
  }

  function shapeScrollEvents$1(event) {
    const currentZoom = getCurrentZoomState();
    if (leftMouseBtnDown) {
      if (currentZoom > 1.00001) {
        const stubElement = document.getElementById('stub');
        const stubMarginTop = stubElement.style.marginTop;
        const stubHeightSubstring = stubMarginTop.substring(0, stubMarginTop.length - 2);
        const stubHeight = parseInt(stubHeightSubstring, 10);
        const zoomOverflowElement = document.getElementById('zoom-overflow');
        const currentBotLocation = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
        const futureBotLocation = currentBotLocation + event.e.deltaY;
        // if the scrolling brings issues where the bottom of the bounding box is not at
        // the right position, then go with the original implementation:
        // 9ff478d8ac4e06eeae9d472ef49b3387682e12b6
        const scrollWidth = getDoubleScrollCanvasState() ? getScrollbarWidth() * 4
          : getScrollbarWidth() * 2;
        if (zoomOverflowElement.scrollTop + event.e.deltaY < 0) {
          topOverflowScroll$1(event, zoomOverflowElement);
        } else if (futureBotLocation > stubHeight + scrollWidth) {
          bottomOverflowScroll$1(event, zoomOverflowElement, stubHeight, scrollWidth);
        } else {
          defaultScroll$1(event);
        }
        canvas$h.renderAll();
      }
    }
    if (getCrosshairUsedOnCanvasState() && currentZoom > 1.00001) {
      moveCanvasCrosshairViaLastCanvasPositionAsync(canvas$h, moveCanvasCrosshairDefault);
    }
  }

  function createNewBoundingBoxFromCoordinates(left, top, width, height,
    imageScalingDimensions, imageLengthDimensions) {
    boundingBoxProps.left = left;
    boundingBoxProps.top = top;
    boundingBoxProps.width = width;
    boundingBoxProps.height = height;
    boundingBoxProps.scaleX = imageScalingDimensions.scaleX;
    boundingBoxProps.scaleY = imageScalingDimensions.scaleY;
    const newBoundingBox = new fabric.Rect(
      boundingBoxProps$1.getStandaloneBoundingBoxProperties(boundingBoxProps),
    );
    preventOutOfBoundsOnNewObject(newBoundingBox, imageScalingDimensions, imageLengthDimensions);
    lockMovementIfAssertedByState$1(newBoundingBox);
    return newBoundingBox;
  }

  function assignDrawBoundingBoxEvents(canvas) {
    prepareCanvasForNewBoundingBox(canvas);

    canvas.on('mouse:down', () => {
      instantiateNewBoundingBox();
    });

    canvas.on('mouse:move', (e) => {
      drawBoundingBox(e);
    });

    canvas.on('mouse:up', () => {
      finishDrawingBoundingBox();
    });

    canvas.on('mouse:wheel', (e) => {
      shapeScrollEvents$1(e);
    });
  }

  function initiateCreateNewBndBoxEvents(canvas) {
    // cancel drawing polygon
    // or hold on since polygons will not be drawin with no canvas
    if (canvas.backgroundImage) {
      purgeCanvasMouseEvents(canvas);
      assignDrawBoundingBoxEvents(canvas);
      if (getCrosshairUsedOnCanvasState()) executeFunctionOnceOnMouseOver(moveCrosshair);
      setEditShapesButtonToDefault();
      setDefaultState(false);
      setCreateBoundingBoxButtonToActive();
      setPolygonEditingButtonsToDefault();
      setAlteringPolygonPointsState(false);
      setLastDrawingModeState('boundingBox');
    }
  }

  // import fabric from 'fabric.js';

  let canvas$g = null;
  let pointArray = [];

  let pointArrayNewLine = [];
  let pointArrayNewLineCopyToClearCanvas = [];
  let activeShape = null;
  let activeShapeNewLineArray = [];

  let polygonMode = true;

  let pointId = 0;
  let mouseUpClick = null;
  let lastMouseEvent = null;
  let lastHoveredPoint$1 = null;
  let mouseMoved$1 = false;
  let invisiblePoint = null;
  let drawingFinished = false;
  let currentlyHoveredPoint$1 = null;
  let ignoredFirstMouseMovement$1 = false;
  let lastNewPointPosition = { x: -1, y: -1 };

  let movedOverflowScroll = false;
  let createdInvisiblePoint = false;
  let mouseIsDownOnTempPoint = false;

  // Being evoked in initialization and generation process of Polygon. At the second time Active shape is null.
  // For Line Mode is evoked only initialization
  // Active shape consider all grey lines and Active Line - for Polygon Mode.
  // Active shape consider only last line with two points forming considered line.
  // Removes the last Active Line for Line Mode and Polygon Mode.
  function removeActiveShape() {
    // Polygon Mode
    if (!getTestDrawLineState()) {
      canvas$g.remove(activeShape);
      activeShape = null;
    }
    // Line Mode
    else {
      canvas$g.remove(activeShape);
      activeShape = null;
      activeShapeNewLineArray.forEach((points) => {
        canvas$g.remove(points);
      });
      pointArrayNewLine.forEach( (points) => {
        canvas$g.remove(points);
      });
    }
  }

  /* initial point should begin with one color and switch when there are 3
   points to indicate that a new polygon can be created
  let points = [pointer.x, pointer.y, pointer.x, pointer.y];
  if (pointArray.length === 0) {
    const polygon = new fabric.Polygon(points, polygonProperties.newTempPolygon);
    canvas.add(polygon);
  }
  if (pointArray.length === 2) {
    pointArray[0].set(polygonProperties.firstPoint);
  }
  */

  ////////////// Also for New Line
  function addPoint(pointer) {
    const isNewPoint = true;
    const point = new fabric.Circle(polygonProperties$1.newPoint(pointId, pointer, isNewPoint));
    setPolygonDrawingInProgressState(true);
    pointId += 1;
    let points = [pointer.x, pointer.y, pointer.x, pointer.y];

    if (getTestDrawLineState()){
      setCreateNewLineButtonToActive();
      setTestDrawLineState(true);
      point.stroke = 'violet';
      point.fill = 'white';
    }

    else
    {
      setCreatePolygonButtonToActive();
      setTestDrawLineState(false);
    }

    // Only for polygon mode. Activates, if it has 2 points as minimum
    if ( (activeShape) && (!getTestDrawLineState()) ) {
      points = activeShape.get('points');
      points.push({
        x: pointer.x,
        y: pointer.y,
      });
      const polygon = new fabric.Polygon(points, polygonProperties$1.newTempPolygon());

      // Reduces the opacity of temporary Polygon and removes at the end the temporary Polygon
      canvas$g.remove(activeShape);
      canvas$g.add(polygon); // Adds lines and temporary polygon
      activeShape = polygon;
      currentlyHoveredPoint$1 = point;
      canvas$g.renderAll();
    }

    // Line mode + polygon mode
    // if there is 1 point on the scene
    else {
      // polyPoint array keeps for line in i=0 - the active Line's direction, the pointer (mouse move), in i=1 - the yellow point of line
      // polyPoint array keeps for Polygon its points, within last point, instead of last point - another point?
      const polyPoint = [{
        x: pointer.x,
        y: pointer.y,
      }];
      const polygon = new fabric.Polygon(polyPoint, polygonProperties$1.newTempPolygon()); /// activeLine
      activeShape = polygon;
      activeShapeNewLineArray.push(polygon);

      // Line mode
      if (getTestDrawLineState())
      {
        canvas$g.add(polygon);
        points.push({
          x: pointer.x,
          y: pointer.y,
        });

        // for Line Mode it is essential
        pointArray = [];
      }
      else {
        canvas$g.add(polygon);
      }
    }
    canvas$g.add(point); // adds the points where the 'mouse down' event happened
    // if only 1 point on the scene
    // Polygon mode
    if ((pointArray.length === 0) && (!getTestDrawLineState()) ) {
      invisiblePoint = new fabric.Circle(polygonProperties$1.invisiblePoint(pointer));
      canvas$g.add(invisiblePoint);
      point.set(polygonProperties$1.firstPoint());
      setAddPointsButtonToDefault();
      setRemovePointsButtonToDefault();
      setRemoveLabelsButtonToDefault();
    }

    // Line Mode
    if (getTestDrawLineState()){
      invisiblePoint = new fabric.Circle(polygonProperties$1.invisiblePoint(pointer));
      canvas$g.add(invisiblePoint);
      setAddPointsButtonToDefault();
      setRemovePointsButtonToDefault();
      setRemoveLabelsButtonToDefault();
      pointArrayNewLine.push(point);
      pointArrayNewLineCopyToClearCanvas.push(point);
    }
    preventOutOfBoundsPointsOnMove(point, canvas$g);
    pointArray.push(point);
    drawTemporaryShape(pointer);
    activeShape.sendToBack();
    canvas$g.selection = false;
    const { x, y } = pointer;
    lastNewPointPosition = { x, y };
    if (getTestDrawLineState()){
      pointArray = []; // to delete last point of New line
    }
  }

  // To delete points on new canvas
  // Only after uploading new image
  function clearLineData(){
    if (pointArrayNewLine[0]) {
      pointArrayNewLine.forEach((point) => {
        canvas$g.remove(point);
      });
    }
  }

  // at the beginning, after choosing Line or Polygon option
  function resetNewPolygonData() {
    if (canvas$g) resetObjectCursors(canvas$g);
    clearPolygonData();
  }

  function changeInitialPointColour(colour) {
    if (pointArray.length > 2) {
      pointArray[0].stroke = colour;
    }
  }

  // draws Polygon with green borders
  // Activates by 'enter' event
  function generatePolygon() {

    const points = [];
    pointArray.forEach((point) => {
      points.push({
        x: point.left,
        y: point.top,
      });
      canvas$g.remove(point);
    });
    const pointsNewLine = [];
    pointArrayNewLineCopyToClearCanvas.forEach((point) => {
      pointsNewLine.push({
        x: point.left,
        y: point.top,
      });
      //canvas.remove(point);
    });

    let polygon = null; // the entire polygon, and New line
    // For Polygon mode
    if (!getTestDrawLineState()) {
      // if to comment further line, the active shape remains on the scene, but it implies that it doesn't move with main polygon
      removeActiveShape();
      polygon = new fabric.Polygon(points, polygonProperties$1.newPolygon(polygon)); // for now, got it from if cycle above
      lockMovementIfAssertedByState(polygon);
      canvas$g.add(polygon);
    }

    // For Line Mode
    else {
      // essential to remove Active shape - it is an Active line, otherwise the red line with mouse pointer remains
      removeActiveShape();
      const lengthArray = pointsNewLine.length;
      let i;
      let tempArrayLine = [];
      tempArrayLine.push(...pointsNewLine);
      for (i = lengthArray- 1; i>-1; i--) {
          tempArrayLine.push(pointsNewLine[i]);
      }
      polygon = new fabric.Polygon(tempArrayLine, polygonProperties$1.newPolygon(polygon));
      canvas$g.add(polygon);
      lockMovementIfAssertedByState(polygon);
      pointId = 0;
      resetDrawLineMode();
    }

    activeShape = null;
    polygonMode = false;
    drawingFinished = true;
    prepareLabelShape(polygon, canvas$g);
    showLabellerModal();
    setPolygonDrawingInProgressState(false);
    setSessionDirtyState(true);
    pointArrayNewLine = [];
    pointArrayNewLineCopyToClearCanvas = [];
  }

  // Being invoked only in Line Mode.
  // Only after button 'enter' being hit for Polygon.
  // But before choosing an option for label name
  function resetDrawLineMode() {
    setTestDrawLineState(true);
    setCreateNewLineButtonToActive();
    polygonMode = true;
    setReadyToDrawShapeState(true);
    drawingFinished = false;
    clearPolygonData();
    setDrawCursorMode(canvas$g);
  }

  // Being invoked only in Polygon Mode.
  // Only after button 'enter' being hit for Polygon.
  function resetDrawPolygonMode() {
      polygonMode = true;
      setCreatePolygonButtonToActive();
      setReadyToDrawShapeState(true);
      drawingFinished = false;
      clearPolygonData();
      setDrawCursorMode(canvas$g);
  }

  // at the end and the beginning of drawing polygon, line
  // at the beginning for rectangle
  function clearPolygonData() {
    pointId = 0;
    if (pointArray[0]) {
      pointArray.forEach((point) => {
        canvas$g.remove(point);
      });
      invisiblePoint = null;
      removeActiveShape();
      pointArray = [];
      activeShape = null;
      mouseMoved$1 = false;
      drawingFinished = false;
      ignoredFirstMouseMovement$1 = false;
      setPolygonDrawingInProgressState(false);
      lastMouseEvent = null;
      createdInvisiblePoint = false;
      lastNewPointPosition = { x: -1, y: -1 };
    }
  }

  // ???
  function getTempPolygon() {
    if (activeShape) {
      const points = activeShape.get('points');
      points.length -= 1;
      return activeShape;
    }
    return null;
  }
  // ???
  function getCurrentlyHoveredDrawPoint() {
    return currentlyHoveredPoint$1;
  }
  // ???
  function isPolygonDrawingFinished() {
    return drawingFinished;
  }

  // mouse over the shape
  function polygonMouseOverEvents(event) {
    if (event.target && event.target.selectable && event.target.shapeName === 'invisiblePoint') {
      changeInitialPointColour('red');
    }
  }

  function polygonMouseOutEvents(event) {
    if (event.target) {
      const { target } = event;
      if (target.shapeName === 'invisiblePoint') {
        changeInitialPointColour('#333333');
      } else if (target.shapeName === 'tempPoint' && target.hoverCursor === 'default') {
        target.hoverCursor = 'move';
      }
      if (!mouseMoved$1) {
        lastHoveredPoint$1 = event.target;
      }
      currentlyHoveredPoint$1 = null;
    }
  }

  function generatePolygonViaKeyboard() {
    if ( (pointArray.length > 2) || (getTestDrawLineState() && (pointArrayNewLine.length > 1)) )
    {
      generatePolygon();
      //pointArrayNewLine = [];
    }
  }

  function addPointViaKeyboard() {
    if (!mouseMoved$1) {
      if (lastHoveredPoint$1 && lastHoveredPoint$1.shapeName === 'tempPoint') {
        return;
      }
      mouseMoved$1 = true;
    }
    if (lastMouseEvent) {
      let pointer = canvas$g.getPointer(lastMouseEvent.e || lastMouseEvent);
      if (lastMouseEvent.target && lastMouseEvent.target.shapeName === 'invisiblePoint') {
        if (pointArray.length > 2) {
          generatePolygon();
        }
      } else if (
          (pointer.x === lastNewPointPosition.x && pointer.y === lastNewPointPosition.y)
          || (lastMouseEvent.target && lastMouseEvent.target.shapeName === 'tempPoint')
          || (createdInvisiblePoint && Number.isNaN(pointer.x))) ; else {
        if (!pointer.x || !pointer.y) {
          const lastMouseMoveEvent = getLastMouseMoveEvent();
          const lastCanvasPointer = canvas$g.getPointer(lastMouseMoveEvent);
          if (!lastCanvasPointer.x || !lastCanvasPointer.y) return;
          pointer = canvas$g.getPointer(lastMouseMoveEvent);
        }
        setReadyToDrawShapeState(false);
        addPoint(pointer);
        createdInvisiblePoint = true;
      }
    }
  }

  // React on each mouse down, after new point
  // Both for Polygon and Line modes
  // Checks whether mouse down occurs on Polygon, invisible point or temporary point of inferior polygon
  function instantiatePolygon(event) {
    const pointer = canvas$g.getPointer(event.e);
    if (!isRightMouseButtonClicked(pointer)) {
      //started to draw
      setReadyToDrawShapeState(false);
      // only if polygon exists and we draw on it new points of polygon, place of intersection
      if (event.target && event.target.shapeName) {
        if (event.target.shapeName === 'invisiblePoint') {
          // if to press on the beginning point of the Polygon, it finishes the Polygon
          // does not work with Line Mode
          if ( (pointArray.length > 2) ) {
            generatePolygon();
          }
        }

        else if (event.target.shapeName === 'tempPoint') {
          mouseIsDownOnTempPoint = true;
        }

        // works inside the polygon
        else if (polygonMode) {
          addPoint(pointer);
        }
      }

      // Here the place of drawing line for polygon
      else if (polygonMode) {
        addPoint(pointer);
      }
      lastMouseEvent = event;
    }
  }

  function isRightMouseButtonClicked(pointer) {
    if (activeShape && (canvas$g.getPointer(lastMouseEvent.e).x !== pointer.x)) {
      return true;
    }
    return false;
  }

  // Active for each movement of mouse
  // Active Shape for polygon consists of all points
  // Active Shape for line consists of 1 or 2 points
  function drawTemporaryShape(pointer) {
    if (activeShape) {
      if (!movedOverflowScroll) {
        const points = activeShape.get('points');
        points[pointArray.length] = {
          x: pointer.x,
          y: pointer.y,
        };
        activeShape.set({
          points,
        });
        canvas$g.renderAll();
      } else {
        repositionCrosshair(pointer);
        movedOverflowScroll = false;
      }
    }
  }

  // Reacts on each mouse move, while drawing polygon and line, until 'enter'
  // draws the line for New line process
  function drawPolygon(event) {
    if (ignoredFirstMouseMovement$1) {
      mouseMoved$1 = true;
    } else {
      ignoredFirstMouseMovement$1 = true;
    }
    lastMouseEvent = event;
    const pointer = canvas$g.getPointer(event.e);
    drawTemporaryShape(pointer);
  }

  // sets the points of polygon or line as immovable object
  // for setting this property, need to hit check box in settings - 'movable object'
  function lockMovementIfAssertedByState(polygon) {
    if (!getMovableObjectsState()) {
      const immovableObjectProps = {
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'default',
      };
      polygon.set(immovableObjectProps);
    }
  }

  // Being evoked 2 times before Polygon Mode
  // Being evoked 2 times before Line Mode + after 'enter' at the end of process
  // Being evoked 2 times after loading new image
  function prepareCanvasForNewPolygon(canvasObj) {
    canvas$g = canvasObj;
    polygonMode = true;
    drawingFinished = false;
    canvas$g.discardActiveObject();
    setDrawCursorMode(canvas$g);
    setReadyToDrawShapeState(true);
    if (getAddingPolygonPointsState()){ //|| getTestDrawLineState() ) {
      setAddPointsButtonToDefault();
      setAddingPolygonPointsState(false);
      mouseUpClick = skipMouseUpEvent;
    } else {
      mouseUpClick = placeHolderFunc;
    }
  }

  function repositionCrosshair(pointer) {
    const points = activeShape.get('points');
    points[pointArray.length] = {
      x: pointer.x,
      y: pointer.y,
    };
    activeShape.set({
      points,
    });
    const polygon = new fabric.Polygon(activeShape.get('points'), polygonProperties$1.newTempPolygon());
    removeActiveShape();
    activeShape = polygon;
    canvas$g.add(polygon);
    polygon.sendToBack();
    setPolygonDrawingInProgressState(true);
  }

  function movePoints(event) {
    if (activeShape) {
      preventOutOfBoundsPointsOnMove(event.target, canvas$g);
      const xCenterPoint = event.target.getCenterPoint().x;
      const yCenterPoint = event.target.getCenterPoint().y;
      activeShape.points[event.target.pointId] = {
        x: xCenterPoint, y: yCenterPoint,
      };
    }
  }

  function placeHolderFunc() {}

  function assignMouseUpClickFunc() {
    mouseUpClick = placeHolderFunc;
  }

  function placeholderToAddMouseDownEvents() {
    mouseIsDownOnTempPoint = false;
    mouseUpClick();
  }

  function skipMouseUpEvent() {
    canvas$g.__eventListeners['mouse:down'] = [];
    canvas$g.on('mouse:down', (e) => {
      if (!e.target || (e.target && e.target.shapeName !== 'tempPoint')) {
        instantiatePolygon(e);
      }
    });
    assignMouseUpClickFunc();
  }

  function prepareCanvasForNewPolygonsFromExternalSources(canvasObj) {
    canvas$g = canvasObj;
    setDrawCursorMode(canvas$g);
  }
  function cleanPolygonFromEmptyPoints() {
    const polygonPoints = activeShape.get('points');
    const points = [];
    polygonPoints.forEach((point) => {
      if (Object.keys(point).length > 0) {
        points.push({
          x: point.x,
          y: point.y,
        });
      }
    });
    activeShape.set({
      points,
    });
    canvas$g.renderAll();
    let currentPointId = 0;
    const tempPointArray = [];
    canvas$g.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName === 'point') {
        iteratedObj.set(polygonProperties$1.changeRemovablePointToTemp(currentPointId));
        if (currentPointId === 0) {
          iteratedObj.set(polygonProperties$1.firstPoint());
        }
        currentPointId += 1;
        tempPointArray.push(iteratedObj);
      }
    });
    pointArray = tempPointArray;
    pointId = currentPointId;
    canvas$g.renderAll();
    points[pointArray.length] = {
      x: points[0].x,
      y: points[0].y,
    };
    activeShape.set({
      points,
    });
    canvas$g.renderAll();
  }

  function resumeDrawingAfterRemovePoints() {
    mouseMoved$1 = false;
    ignoredFirstMouseMovement$1 = false;
    activeShape.numberOfNullPolygonPoints = 0;
    cleanPolygonFromEmptyPoints();
    setDrawCursorMode(canvas$g);
    if (pointArray.length !== 0) {
      const position = { x: pointArray[0].left, y: pointArray[0].top };
      invisiblePoint = new fabric.Circle(polygonProperties$1.invisiblePoint(position));
      canvas$g.add(invisiblePoint);
    }
    setTimeout(() => {
      const lastMouseMoveEvent = getLastMouseMoveEvent();
      if (currentlyHoveredPoint$1 && currentlyHoveredPoint$1.state === 'removed') lastNewPointPosition = { x: -1, y: -1 };
      currentlyHoveredPoint$1 = null;
      lastMouseEvent = lastMouseMoveEvent;
      const pointer = canvas$g.getPointer(lastMouseMoveEvent);
      drawTemporaryShape(pointer);
    });
  }

  function removeInvisiblePoint() {
    invisiblePoint = null;
  }

  function getScrollWidth$1() {
    // create a div with the scroll
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    // must put it in the document, otherwise sizes will be 0
    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth * 2;
  }

  function topOverflowScroll(event, zoomOverflowElement) {
    const currentScrollTopOffset = zoomOverflowElement.scrollTop / getCurrentZoomState();
    const newPositionTop = canvas$g.getPointer(event.e).y - currentScrollTopOffset;
    if (mouseIsDownOnTempPoint) {
      if (event.target.shapeName === 'tempPoint') {
        event.target.top = newPositionTop;
        activeShape.points[event.target.pointId].y = event.target.top;
      }
    }
    const points = activeShape.get('points');
    points[pointArray.length].y = newPositionTop;
    activeShape.set({
      points,
    });
  }

  function bottomOverflowScroll(event, zoomOverflowElement, stubHeight, scrollWidth) {
    const canvasHeight = stubHeight + scrollWidth;
    const canvasBottom = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
    const result = canvasHeight - canvasBottom;
    const newPositionTop = canvas$g.getPointer(event.e).y + (result / getCurrentZoomState());
    if (mouseIsDownOnTempPoint) {
      if (event.target.shapeName === 'tempPoint') {
        event.target.top = newPositionTop;
        activeShape.points[event.target.pointId].y = newPositionTop;
      }
    }
    const points = activeShape.get('points');
    points[pointArray.length] = {
      x: canvas$g.getPointer(event.e).x,
      y: newPositionTop,
    };
    activeShape.set({
      points,
    });
  }

  function defaultScroll(event) {
    const currentVerticalScrollDelta = event.e.deltaY / getCurrentZoomState();
    const newPositionTop = canvas$g.getPointer(event.e).y + currentVerticalScrollDelta;
    const currentHorizontalScrollDelta = event.e.deltaX / getCurrentZoomState();
    if (mouseIsDownOnTempPoint) {
      if (event.target.shapeName === 'tempPoint') {
        event.target.left = canvas$g.getPointer(event.e).x + currentHorizontalScrollDelta;
        event.target.top = newPositionTop;
        activeShape.points[event.target.pointId] = {
          x: event.target.left, y: event.target.top,
        };
      }
    }
    const points = activeShape.get('points');
    points[pointArray.length] = {
      x: canvas$g.getPointer(event.e).x + currentHorizontalScrollDelta,
      y: newPositionTop,
    };
    activeShape.set({
      points,
    });
  }

  function shapeScrollEvents(event) {
    const currentZoom = getCurrentZoomState();
    if (currentZoom > 1.00001) {
      if (activeShape || (mouseIsDownOnTempPoint && event.target.shapeName === 'tempPoint')) {
        const stubElement = document.getElementById('stub');
        const stubMarginTop = stubElement.style.marginTop;
        const stubHeightSubstring = stubMarginTop.substring(0, stubMarginTop.length - 2);
        const stubHeight = parseInt(stubHeightSubstring, 10);
        const zoomOverflowElement = document.getElementById('zoom-overflow');
        const currentBotLocation = zoomOverflowElement.scrollTop + zoomOverflowElement.offsetHeight;
        const futureBotLocation = currentBotLocation + event.e.deltaY;
        const scrollWidth = getDoubleScrollCanvasState() ? getScrollWidth$1() : getScrollWidth$1() / 2;
        if (zoomOverflowElement.scrollTop + event.e.deltaY < 0) {
          topOverflowScroll(event, zoomOverflowElement);
        } else if (futureBotLocation > stubHeight + scrollWidth) {
          bottomOverflowScroll(event, zoomOverflowElement, stubHeight, scrollWidth);
        } else {
          defaultScroll(event);
        }
        const polygon = new fabric.Polygon(activeShape.get('points'), polygonProperties$1.newTempPolygon());
        removeActiveShape();
        activeShape = polygon;
        canvas$g.add(polygon);
        polygon.sendToBack();
      }
    }
  }

  function scrolledViaScrollbar() {
    if (activeShape) {
      movedOverflowScroll = true;
    }
  }

  function createNewPolygonFromCoordinates(points, imageScalingDimensions, imageLengthDimensions) {
    const polygon = new fabric.Polygon(points, polygonProperties$1.newPolygon());
    preventOutOfBoundsOnNewObject(polygon, imageScalingDimensions, imageLengthDimensions);
    lockMovementIfAssertedByState(polygon);
    return polygon;
  }

  // should be moved to event worker
  function assignDrawPolygonEvents(canvas, resume) {
    if (!resume) {
      prepareCanvasForNewPolygon(canvas);
    } else {
      resumeDrawingAfterRemovePoints();
    }
    canvas.on('mouse:down', (e) => {
      instantiatePolygon(e);
    });

    canvas.on('object:moving', (e) => {
      movePoints(e);
    });

    canvas.on('mouse:move', (e) => {
      drawPolygon(e);
    });

    canvas.on('mouse:up', () => {
      placeholderToAddMouseDownEvents();
    });

    canvas.on('mouse:wheel', (e) => {
      shapeScrollEvents(e);
    });

    canvas.on('mouse:over', (e) => {
      polygonMouseOverEvents(e);
    });

    canvas.on('mouse:out', (e) => {
      polygonMouseOutEvents(e);
    });
  }

  function initiateCreateNewPolygonEvents(canvas) {
    canvas.discardActiveObject();
    if (canvas.backgroundImage) {
      purgeCanvasMouseEvents(canvas);
      assignDrawPolygonEvents(canvas);
      setEditShapesButtonToDefault();
      setDefaultState(false);
      setAlteringPolygonPointsState(false);

      if (!getTestDrawLineState()) {
        setLastDrawingModeState('polygon');
        setTestDrawLineState(false);
        setCreatePolygonButtonToActive();
      }

      else {
        setLastDrawingModeState('line');
        setTestDrawLineState(true);
        //setCreateNewLineButtonToActive();
      }
    }
  }

  function assignAddPointsOnExistingPolygonEvents(canvas) {
    setAddPointsEventsCanvas(canvas);
    canvas.on('mouse:down', (e) => {
      pointMouseDownEvents$1(e);
    });

    canvas.on('mouse:over', (e) => {
      mouseOverEvents(e);
    });

    canvas.on('mouse:move', (e) => {
      mouseMove(e);
    });

    canvas.on('object:moving', (e) => {
      moveAddPoints(e);
    });

    canvas.on('mouse:up', (e) => {
      pointMouseUpEvents(e);
    });

    canvas.on('mouse:out', (e) => {
      mouseOutEvents(e);
    });

    canvas.on('mouse:wheel', (e) => {
      shapeScrollEvents$2(e);
    });
  }

  // Activates after switching from one image to another. First activates after uploading first image, then activates 2 times, after having 2 images as minumum
  function setDefaultCanvasCursors(canvas) {
    canvas.defaultCursor = 'default';
    if (getMovableObjectsState()) {
      canvas.hoverCursor = 'move';
    } else {
      canvas.hoverCursor = 'default';
    }
    canvas.renderAll();
  }

  // important to remember that this will reset perPixelTargetFind to true
  // only when the mode is being reset to default
  function setDefaultCursorMode(canvas) {
    canvas.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName !== 'bndBox') {
        iteratedObj.perPixelTargetFind = true;
      }
      iteratedObj.selectable = true;
      if (getMovableObjectsState()) {
        iteratedObj.hoverCursor = 'move';
      } else {
        iteratedObj.hoverCursor = 'default';
      }
    });
    setDefaultCanvasCursors(canvas);
  }

  function setDefaultCursorModeAfterAlteringPolygonPoints(canvas) {
    changePolygonPointsPropertiesToDefault(canvas);
    setDefaultCanvasCursors(canvas);
  }

  // not just for polygon
  function assignDefaultEvents(canvas, polygonId, afterAddPoints) {
    prepareCanvasForDefaultEvents(canvas, polygonId, afterAddPoints);

    canvas.on('mouse:down', (e) => {
      polygonMouseDownEvents(e);
    });

    canvas.on('mouse:up', (e) => {
      polygonMouseUpEvents(e);
    });

    canvas.on('object:moving', (e) => {
      polygonMoveEvents(e);
    });

    canvas.on('object:scaling', (e) => {
      boundingBoxScalingEvents(e);
    });

    canvas.on('mouse:over', (e) => {
      shapeMouseOverEvents(e);
    });

    canvas.on('mouse:wheel', (e) => {
      shapeScrollEvents$3(e);
    });

    // edit this
    canvas.on('mouse:out', (e) => {
      if (e.target) {
        shapeMouseOutEvents(e);
      }
    });
  }

  // Originally designed to be turned off after the points have been successfully added to a polygon

  function discardAddPointsEvents(canvas) {
    if (getContinuousDrawingState()
    && (getCancelledReadyToDrawState() || getRemovingPointsAfterCancelDrawState())) {
      removePolygonPoints();
      if (getLastDrawingModeState() === 'polygon') {
        assignDrawPolygonEvents(canvas);
        setCreatePolygonButtonToActive();
      }

      else if (getLastDrawingModeState() === 'boundingBox') {
        assignDrawBoundingBoxEvents(canvas);
        setCreateBoundingBoxButtonToActive();
      }
    } else {
      setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
      const currentlySelectedPolygonId = getSelectedPolygonIdForAddPoints();
      assignDefaultEvents(canvas, currentlySelectedPolygonId);
      setEditShapesButtonToActive();
      setDefaultState(true);
    }
  }

  function initiateAddPolygonPointsEvents(canvas) {
    canvas.discardActiveObject();

    // after initialization of Add points event
    if (!getAddingPolygonPointsState()) {
      purgeCanvasMouseEvents(canvas);
      assignAddPointsOnExistingPolygonEvents(canvas);
      setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
      setAddPointsButtonToActive();
      setEditShapesButtonToDefault();
      setDefaultState(false);
      setAddingPolygonPointsState(true);
    }
    // if to hit button AddPoints while adding points process
    else if (isAddingPointsToPolygon()) {
      purgeCanvasMouseEvents(canvas);
      assignAddPointsOnExistingPolygonEvents(canvas);
      resetAddPoints();
      setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
    }
    // to set up another Mode - different from Add points
    else {
      resetAddPoints();
      setAddPointsButtonToDefault();
      setAddingPolygonPointsState(false);
      purgeCanvasMouseEvents(canvas);
      discardAddPointsEvents(canvas);
    }
  }

  // New states after loading new image
  function setNewState(canvas) {
    if (getContinuousDrawingState()) {
      purgeCanvasMouseEvents(canvas);

      if (getLastDrawingModeState() === 'polygon') {
        assignDrawPolygonEvents(canvas);
      }

      else if (getLastDrawingModeState() === 'boundingBox') {
        assignDrawBoundingBoxEvents(canvas);
        if (getCrosshairUsedOnCanvasState()) {
          executeFunctionOnceOnMouseOver(moveCrosshair);
        }
      }

      else if (getLastDrawingModeState() === 'line'){
        //setLastDrawingModeState("?");
        console.log("at average probability that is here");
        setCreateNewLineButtonToActive();
        assignDrawPolygonEvents(canvas);
        testDrawLine();
      }

      setDefaultState(false);
    }

    else {

      assignDefaultEvents(canvas, null, getAddingPolygonPointsState());
      purgeCanvasMouseEvents(true);
      if (getCurrentImage()) {
        setEditShapesButtonToActive();
        setCreatePolygonButtonToDefault();
        setCreateBoundingBoxButtonToDefault();

        setCreateNewLineToDefault();

      }
    }
  }

  // if to switch to the images, or load the image
  function initiateResetCanvasEventsToDefaultEvent(canvas) {

    // ?? anyway deletes Line from previous image.
    // ?? Polygon and box remain.
    //canvas.discardActiveObject();

    if (!getDefaultState()) {
      purgeCanvasMouseEvents(canvas);
      if (getAddingPolygonPointsState()) {
        setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
      } else {
        setDefaultCursorMode(canvas);
      }
      if (getAlteringPolygonPointsState()) {
        setPolygonEditingButtonsToDefault();
        setAlteringPolygonPointsState(false);
      }

      // To delete New line points
      clearLineData();

      setNewState(canvas);
    }
  }

  function setRemovePointsOnDrawNewPolygonMode(canvas) {
    canvas.defaultCursor = 'default';
    canvas.hoverCursor = 'default';
    canvas.renderAll();
    canvas.forEachObject((iteratedObj) => {
      if (iteratedObj.shapeName === 'polygon' || iteratedObj.shapeName === 'bndBox') {
        iteratedObj.hoverCursor = 'default';
      }
    });
  }

  function setRemovePointsOnExistingPolygonMode(canvas) {
    canvas.defaultCursor = 'default';
    canvas.hoverCursor = 'default';
    setObjectsHoverCursorToDefault(canvas);
  }

  function assignRemovePointsOnExistingPolygonEvents(canvas) {
    setRemovablePointsEventsCanvas$1(canvas);

    canvas.on('mouse:down', (e) => {
      pointMouseDownEvents$2(e);
    });

    canvas.on('mouse:over', (e) => {
      pointMouseOverEvents$1(e);
    });

    canvas.on('mouse:up', (e) => {
      pointMouseUpEvents$1(e);
    });

    canvas.on('mouse:out', (e) => {
      pointMouseOutEvents$1(e);
    });

    canvas.on('mouse:move', (e) => {
      pointMouseMoveEvents$1();
    });
  }

  let canvas$f = null;
  let currentlyHoveredPoint = null;
  let ignoredFirstMouseMovement = false;
  let lastHoveredPoint = null;
  let mouseMoved = false;

  // initiated, if during drawing polygon to press Remove points
  function setRemovablePointsEventsCanvas(canvasObj, polygonObj) {
    canvas$f = canvasObj;
    ignoredFirstMouseMovement = false;
    currentlyHoveredPoint = null;
    lastHoveredPoint = null;
    mouseMoved = false;
    // edit this
    if (polygonObj) {
      setEditablePolygon(canvas$f, polygonObj, true, true);
    }
  }

  function pointMouseDownEvents(event) {
    if (event.target && event.target.shapeName === 'point') {
      removePolygonPoint(event.target.pointId);
      currentlyHoveredPoint = null;
    }
  }

  function removeTempPointViaKeyboard() {
    if (!mouseMoved) {
      if (lastHoveredPoint) {
        removePolygonPoint(lastHoveredPoint.pointId);
      } else {
        const currentlyHoveredDrawingPoint = getCurrentlyHoveredDrawPoint();
        if (currentlyHoveredDrawingPoint) {
          removePolygonPoint(currentlyHoveredDrawingPoint.pointId);
          currentlyHoveredDrawingPoint.state = 'removed';
        }
      }
      mouseMoved = true;
    } else if (currentlyHoveredPoint) {
      removePolygonPoint(currentlyHoveredPoint.pointId);
    }
    currentlyHoveredPoint = null;
  }

  function pointMouseOverEvents(event) {
    if (event.target && event.target.shapeName === 'point' && event.target.fill === 'red') {
      event.target.stroke = 'red';
      canvas$f.renderAll();
      currentlyHoveredPoint = event.target;
    }
  }

  function pointMouseOutEvents(event) {
    if (event.target && event.target.shapeName === 'point') {
      event.target.stroke = 'black';
      canvas$f.renderAll();
      currentlyHoveredPoint = null;
      // fix for the bug where upon hovering over a point in another mode and switching it to this
      // mode - the mouse out event is triggered, highlighting the last hovered shape
      if (!mouseMoved) lastHoveredPoint = event.target;
    }
  }

  function pointMouseMoveEvents() {
    if (ignoredFirstMouseMovement) {
      mouseMoved = true;
    } else {
      ignoredFirstMouseMovement = true;
    }
  }

  function assignRemovePointsOnDrawPolygonEvents(canvas) {
    setRemovablePointsEventsCanvas(canvas, getTempPolygon());

    canvas.on('mouse:down', (e) => {
      pointMouseDownEvents(e);
    });

    canvas.on('mouse:over', (e) => {
      pointMouseOverEvents(e);
    });

    canvas.on('mouse:up', (e) => {
    });

    canvas.on('mouse:out', (e) => {
      pointMouseOutEvents(e);
    });

    canvas.on('mouse:move', (e) => {
      pointMouseMoveEvents();
    });
  }

  function setRemovePointsCursorMode(canvas) {
    const isDrawingPolygon = getPolygonDrawingInProgressState();
    if (isDrawingPolygon) {
      setRemovePointsOnDrawNewPolygonMode(canvas);
    } else if (!isDrawingPolygon) {
      setRemovePointsOnExistingPolygonMode(canvas);
    }
  }

  function assignRemovePointsEvents(canvas) {
    const isDrawingPolygon = getPolygonDrawingInProgressState();
    if (isDrawingPolygon) {
      removeInvisiblePoint();
      assignRemovePointsOnDrawPolygonEvents(canvas);
    } else if (!isDrawingPolygon) {
      assignRemovePointsOnExistingPolygonEvents(canvas);
    }
  }

  function discardRemovePointsEvents(canvas) {
    console.log("discardRemovePointsEvents -------------");
    // is this still drawing after manually removing all polygon points
    const isDrawingPolygon = getPolygonDrawingInProgressState();
    if (isDrawingPolygon) {
      assignDrawPolygonEvents(canvas, true);
      setEditShapesButtonToDefault();
      setDefaultState(false);
    } else if (getContinuousDrawingState() && getCancelledReadyToDrawState()) {
      cleanPolygonPointsArray();
      removePolygonPoints();
      if (getLastDrawingModeState() === 'polygon') {
        assignDrawPolygonEvents(canvas);
        setCreatePolygonButtonToActive();
      } else if (getLastDrawingModeState() === 'boundingBox') {
        assignDrawBoundingBoxEvents(canvas);
        setCreateBoundingBoxButtonToActive();
      }
    } else {
      cleanPolygonPointsArray();
      setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
      assignDefaultEvents(canvas, getPolygonIdIfEditing());
      setEditShapesButtonToActive();
      setDefaultState(true);
    }
  }

  // split up to more readable
  function initiateRemovePolygonPointsEvents(canvas) {
    canvas.discardActiveObject();
    removeHighlightOfListLabel();
    removeEditedPolygonId();
    if (!getRemovingPolygonPointsState()) {
      if (getAddingPolygonPointsState()) {
        setAddingPolygonPointsState(false);
        resetAddPoints();
      }
      purgeCanvasMouseEvents(canvas);
      assignRemovePointsEvents(canvas);
      setRemovePointsCursorMode(canvas);
      if (getReadyToDrawShapeState()) {
        setCancelledReadyToDrawState(true);
        setRemovingPointsAfterCancelDrawState(true);
      }
      setRemovePointsButtonToActive();
      setEditShapesButtonToDefault();
      setDefaultState(false);
      setReadyToDrawShapeState(false);
      setRemovingPolygonPointsState(true);
    } else {
      purgeCanvasMouseEvents(canvas);
      discardRemovePointsEvents(canvas);
      setRemovePointsButtonToDefault();
      setRemovingPolygonPointsState(false);
    }
  }

  function calculateElementOffset(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  function setPopupPosition(element, elementButton) {
    const divOffset = calculateElementOffset(elementButton);
    element.style.top = `${divOffset.top}px`;
  }

  function setStickyPopupProperties(element, elementButton, stickyProperties) {
    const settingPopupBottom = element.getBoundingClientRect().bottom;
    if (!stickyProperties.isPopupSticky) {
      if (settingPopupBottom + 5 > document.body.scrollHeight) {
        element.style.top = '';
        element.style.bottom = stickyProperties.bottomPxOverride || '5px';
        stickyProperties.stickCoordinates = settingPopupBottom + 6;
        stickyProperties.isPopupSticky = true;
      }
    }
    if (stickyProperties.isPopupSticky
        && stickyProperties.stickCoordinates < document.body.scrollHeight) {
      // the bounding box crosshair dropdown does not require a reset due to its own bottom px
      if (stickyProperties.bottomPxOverride === undefined) {
        setPopupPosition(element, elementButton);
        element.style.bottom = '';
      }
      stickyProperties.isPopupSticky = false;
    }
  }

  let checkmarkElement = null;
  let nextButtonElement$2 = null;
  let descriptionElement$5 = null;
  let loadingTextElement = null;
  let loadingWheelElement = null;
  let buttonsGroupElement$4 = null;
  let submitButtonElement$1 = null;
  let cancelButtonElement$2 = null;
  let errorMessagesElement = null;
  let checkmarkParentElement = null;
  let progressMessagesElement = null;

  function removeProgressMessage() {
    progressMessagesElement.style.display = 'none';
    progressMessagesElement.style.color = '';
    progressMessagesElement.innerHTML = '';
  }

  // bug fix where the yet not displayed checkmark would get toggled via esc
  // and cause it to not display when needed
  function removeCheckMark() {
    if (checkmarkParentElement.style.display === '') {
      checkmarkParentElement.style.display = 'none';
      checkmarkElement.classList.toggle('checkmark');
    }
  }

  function removeErrorMessage() {
    errorMessagesElement.style.display = 'none';
    errorMessagesElement.innerHTML = '';
    buttonsGroupElement$4.style.marginTop = '';
  }

  function removeRetryButton() {
    document.getElementById('machine-learning-modal-initiate-retry-button').style.display = 'none';
    descriptionElement$5.style.marginBottom = '';
  }

  function displayDescription$3() {
    descriptionElement$5.style.display = '';
  }

  function displayAllButtons() {
    buttonsGroupElement$4.style.marginTop = `${-4 / getScreenSizeDelta()}px`;
    buttonsGroupElement$4.style.display = '';
  }

  function removeAllButtons() {
    buttonsGroupElement$4.style.marginTop = '';
    buttonsGroupElement$4.style.display = 'none';
  }

  function removeLoadingText() {
    loadingTextElement.style.display = 'none';
  }

  function removeLoadingWheel() {
    loadingWheelElement.style.display = 'none';
    cancelButtonElement$2.style.marginRight = '';
    descriptionElement$5.style.marginBottom = '';
  }

  function removeLoadingContent() {
    removeLoadingWheel();
    removeLoadingText();
  }

  function removeNextButton() {
    nextButtonElement$2.style.display = 'none';
    descriptionElement$5.style.marginBottom = `${7 / getScreenSizeDelta()}px`;
  }

  function displayCancelButton() {
    cancelButtonElement$2.style.marginRight = '';
    cancelButtonElement$2.style.display = '';
  }

  function displayStartButton() {
    submitButtonElement$1.style.display = '';
  }

  function setDefaultDescriptionElementMarginBottom() {
    descriptionElement$5.style.marginBottom = '';
  }

  function hideInitiateMachineLearningViewAssets() {
    removeErrorMessage();
    removeRetryButton();
    removeNextButton();
    removeProgressMessage();
    removeCheckMark();
    removeAllButtons();
    descriptionElement$5.style.marginBottom = '';
  }

  function getDefaultDescriptionMarkup$1() {
    return `
    You can use a pre-trained Machine Learning model to automatically annotate objects with bounding boxes!
    <div class="upload-datasets-modal-description-break"></div>
    Click 'Start' to download the 'COCO-SSD' model and use it to generate bounding boxes for your images.
    <div class="upload-datasets-modal-description-break"></div>
    In addition, because this model operates locally on the browser, your data will never leave the privacy of your computer.`;
  }

  function prepareInstantiateMachineLearningView() {
    setDefaultDescriptionElementMarginBottom();
    descriptionElement$5.innerHTML = getDefaultDescriptionMarkup$1();
    displayDescription$3();
    displayStartButton();
    displayCancelButton();
    displayAllButtons();
    removeLoadingContent();
  }

  let activeTextRow = null;
  let activeTextElement = null;
  let maxWidthStyleAppended = false;
  let overflowScrollWidth = 0;
  let objectNames$1 = null;
  let tableMaxWidth = null;
  let isTableMaxHeightSet = false;

  let generatedLabelsParentElement = null;
  let generatedLabelsTableElement = null;
  let generatedLabelsOuterContainerElement = null;
  let submitButtonElement = null;
  let descriptionElement$4 = null;

  function updateGeneratedLabelsElementWidth() {
    generatedLabelsParentElement.style.width = `${activeTextRow.clientWidth + overflowScrollWidth}px`;
    if (!maxWidthStyleAppended
        && parseInt(generatedLabelsParentElement.style.width, 10) > tableMaxWidth) {
      generatedLabelsParentElement.style.maxWidth = `${tableMaxWidth}px`;
      generatedLabelsParentElement.style.overflowX = 'auto';
      maxWidthStyleAppended = true;
    } else if (maxWidthStyleAppended
        && parseInt(generatedLabelsParentElement.style.width, 10) < tableMaxWidth) {
      generatedLabelsParentElement.style.maxWidth = '';
      generatedLabelsParentElement.style.overflowX = 'hidden';
      maxWidthStyleAppended = false;
    }
  }

  function changeEditedLabelText(text) {
    activeTextElement.innerHTML = text;
    window.setTimeout(() => {
      updateGeneratedLabelsElementWidth();
    }, 1);
  }

  function setEditingStateToFalse() {
    setTimeout(() => {
      activeTextRow = null;
      activeTextElement = null;
    }, 1);
  }

  function stopEditingActiveTextElement() {
    activeTextElement.contentEditable = false;
    activeTextRow.style.backgroundColor = '';
    activeTextRow.childNodes[1].style.display = '';
    {
      activeTextRow.childNodes[5].style.display = 'none';
    }
    activeTextRow.style.cursor = 'pointer';
    setEditingStateToFalse();
  }

  function getLastDigitFromText(text) {
    if (text.match(/\d+$/)) {
      return text.match(/\d+$/)[0];
    }
    return -1;
  }

  function isElementIdNotTheGeneratedLabelsElementId(element) {
    if (element.id.startsWith('MLLabel')) {
      const elementIdNumber = getLastDigitFromText(element.id);
      const activeTextElementIdNumber = getLastDigitFromText(activeTextElement.id);
      return elementIdNumber !== activeTextElementIdNumber;
    }
    return true;
  }

  function isElementNotTheCurrentlyActiveTextRow(element) {
    return activeTextRow && activeTextRow !== element;
  }

  function isElementNotTheCurrentlyActiveTextElement(element) {
    return activeTextElement && activeTextElement !== element;
  }

  function canChangeRowToStopEdit(element) {
    if (isElementNotTheCurrentlyActiveTextElement(element)
      && isElementNotTheCurrentlyActiveTextRow(element)
      && isElementIdNotTheGeneratedLabelsElementId(element)) {
      return true;
    }
    return false;
  }

  function updateGeneratedLabelsParentElementWidthOnStartup() {
    activeTextRow = generatedLabelsTableElement.childNodes[1].childNodes[0].childNodes[0];
    updateGeneratedLabelsElementWidth();
    activeTextRow = null;
  }

  function calculateContainerDivHeight() {
    const numberOfRows = Object.keys(objectNames$1).length;
    const baseHeight = numberOfRows > 1 ? 104 : 114;
    const numberOfVisibleRows = numberOfRows > 5 ? 5 : numberOfRows;
    const newNameHeight = baseHeight / getScreenSizeDelta() + numberOfVisibleRows * 10;
    return `${newNameHeight}px`;
  }

  function setLabelsParentElementMaxHeight() {
    const tableElement = generatedLabelsParentElement.childNodes[1].childNodes[1];
    if (tableElement.childNodes.length > 0) {
      generatedLabelsParentElement.style.maxHeight = `${generatedLabelsParentElement.childNodes[1].childNodes[1].childNodes[0].getBoundingClientRect().height * 5}px`;
      isTableMaxHeightSet = true;
    }
  }

  function changeElementsToVisible() {
    generatedLabelsOuterContainerElement.style.display = '';
    generatedLabelsOuterContainerElement.style.height = calculateContainerDivHeight();
  }

  function changeElementsToMoveListUpwards() {
    submitButtonElement.style.marginTop = `${2 / getScreenSizeDelta()}px`;
    submitButtonElement.style.marginBottom = `${6 / getScreenSizeDelta()}px`;
    descriptionElement$4.style.marginBottom = `${6 / getScreenSizeDelta()}px`;
  }

  function resetElementsToMoveListToDefaultPosition() {
    submitButtonElement.style.marginTop = '';
    submitButtonElement.style.marginBottom = '';
    descriptionElement$4.style.marginBottom = '';
  }

  function createLabelElementMarkup(labelText, id) {
    return `
    <div class="machine-learning-modal-generated-labels-row" onClick="editMachineLearningLabel(this)" onMouseEnter="displayMachineLearningModalEditLabelButton(this)" onMouseLeave="hideMachineLearningModalEditLabelButton(this)">
      <img class="defaultLabelEditIcon machine-learning-modal-generated-labels-edit-icon" src="assets/svg/edit-disabled.svg" alt="edit">
      <img id="MLLabelHighlightedEditButton${id}" class="defaultLabelEditIcon machine-learning-modal-generated-labels-edit-icon" style="display: none" src="assets/svg/edit.svg" alt="edit">
      <img id="MLLabelActiveEditButton${id}" class="defaultLabelEditIcon machine-learning-modal-generated-labels-edit-icon reverse-icon" style="display: none" src="assets/svg/edit-blue.svg" alt="edit">
      <img id="MLLabelDisabledEditButton${id}" class="defaultLabelEditIcon machine-learning-modal-generated-labels-edit-icon reverse-icon" style="display: none" src="assets/svg/edit-red.svg" alt="edit">
      <div id="MLLabelText${id}" class="machine-learning-modal-generated-labels-input" spellcheck="false" onkeydown="MLLabelTextKeyDown(event)" onpaste="MLLabelTextPaste(event)">${labelText}</div>
    </div>
  `;
  }

  // fix for chrome where upon clicking on a row to edit, the row height
  // would get smaller
  function triggerContentEditableOnce(cell) {
    const textInput = cell.childNodes[1].childNodes[9];
    textInput.contentEditable = true;
    setTimeout(() => {
      textInput.contentEditable = false;
    });
  }

  function changeModalStylingOnGeneratedLabelData(numberOfItems, longestName) {
    if (numberOfItems > 4) {
      changeElementsToMoveListUpwards();
    } else {
      resetElementsToMoveListToDefaultPosition();
    }
    generatedLabelsTableElement.style.marginLeft = longestName <= 3 ? 'unset' : 'auto';
  }

  function populateGeneratedLabelsTable() {
    let index = 0;
    let longestName = 0;
    Object.keys(objectNames$1).forEach((key) => {
      const newNameRow = generatedLabelsTableElement.insertRow(-1);
      const cell = newNameRow.insertCell(0);
      cell.innerHTML = createLabelElementMarkup(objectNames$1[key].pendingName, index);
      index += 1;
      if (longestName < objectNames$1[key].pendingName.length) {
        longestName = objectNames$1[key].pendingName.length;
      }
      triggerContentEditableOnce(cell);
    });
    changeModalStylingOnGeneratedLabelData(index, longestName);
  }

  function changeModalDescription$1() {
    descriptionElement$4.innerHTML = 'The following names were automatically assigned to the generated objects, you can edit them below:';
  }

  function displayDescription$2() {
    descriptionElement$4.style.display = '';
  }

  function setLocalVariables() {
    overflowScrollWidth = getScrollbarWidth();
  }

  function displayViewElements(objectNamesArg) {
    objectNames$1 = objectNamesArg;
    setLocalVariables();
    changeModalDescription$1();
    displayDescription$2();
    populateGeneratedLabelsTable();
    changeElementsToVisible();
    if (!isTableMaxHeightSet) setLabelsParentElementMaxHeight();
    updateGeneratedLabelsParentElementWidthOnStartup();
  }

  function removeGeneratedLabelsTableRows() {
    const newtbody = document.createElement('tbody');
    if (generatedLabelsTableElement.childNodes[1]) {
      generatedLabelsTableElement.replaceChild(newtbody, generatedLabelsTableElement.childNodes[1]);
    }
  }

  function hideGeneratedLabelsViewAssets() {
    generatedLabelsOuterContainerElement.style.display = 'none';
    removeGeneratedLabelsTableRows();
  }

  let activeLabelInitialText = '';
  let activeLabelElement = null;
  let generatedObjects = null;
  let objectNames = null;

  function setNewLabelName() {
    if (activeLabelElement.innerHTML !== activeLabelInitialText) {
      Object.keys(objectNames).forEach((key) => {
        if (objectNames[key].pendingName === activeLabelInitialText) {
          objectNames[key].pendingName = activeLabelElement.innerHTML;
        }
      });
    }
  }

  function displayInitialTextIfEmpty() {
    if (activeLabelElement.innerHTML === '') {
      changeEditedLabelText(activeLabelInitialText);
    }
  }

  function trimText() {
    activeLabelElement.innerHTML = activeLabelElement.innerHTML.trim();
  }

  function saveLabelName() {
    trimText();
    displayInitialTextIfEmpty();
    setNewLabelName();
  }

  function setActivePropertiesToNull() {
    activeLabelInitialText = '';
    activeLabelElement = null;
  }

  function stopEditingMLGeneratedLabelName() {
    saveLabelName();
    stopEditingActiveTextElement();
    setActivePropertiesToNull();
  }

  function stopEditingMLGeneratedLabelNameBtnClick(element) {
    if (canChangeRowToStopEdit(element)) {
      stopEditingMLGeneratedLabelName();
    }
  }

  function createObjectNamesObject() {
    const currentNameToPending = {};
    Object.keys(generatedObjects).forEach((key) => {
      const predictions = generatedObjects[key];
      for (let i = 0; i < predictions.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(currentNameToPending, predictions[i].class)) {
          currentNameToPending[predictions[i].class] = { pendingName: predictions[i].class };
        }
      }
    });
    return currentNameToPending;
  }

  function displayGeneratedLabelsView(generatedObjectsArg) {
    generatedObjects = generatedObjectsArg;
    objectNames = createObjectNamesObject();
    displayViewElements(objectNames);
    setChangingMLGeneratedLabelNamesState(true);
  }

  let descriptionElement$3 = null;
  let buttonGroupElement = null;

  function changeModalDescription() {
    descriptionElement$3.innerHTML = 'The model has not identified any objects within the uploaded images.';
  }

  function displayDescription$1() {
    descriptionElement$3.style.display = '';
  }

  function setDescriptionElementMargins(top, bottom) {
    descriptionElement$3.style.marginTop = top;
    descriptionElement$3.style.marginBottom = bottom;
  }

  function setDefaultDescriptionElementMargins() {
    descriptionElement$3.style.marginTop = '';
    descriptionElement$3.style.marginBottom = '';
  }

  function displayButtonGroupElement() {
    buttonGroupElement.style.display = '';
  }

  function displayNoObjectsFoundView() {
    setDescriptionElementMargins(`${19 / getScreenSizeDelta()}px`, `${15 / getScreenSizeDelta()}px`);
    changeModalDescription();
    displayDescription$1();
    displayButtonGroupElement();
  }

  function hideNoObjectsFoundViewAssets() {
    setDefaultDescriptionElementMargins();
    buttonGroupElement.style.display = 'none';
  }

  let zoomOverflowWrapperElement$2;
  let zoomOverflowElement$2;
  let stubElement$2;

  let newCanvasWidth$1;
  let newCanvasHeight$1;
  let currentZoom$2 = 1;
  // should be 6, but currently the code has been optimised to work with 5
  const scrollWidth$1 = 5;

  let canvasProperties$2 = null;
  let canvas$e = null;

  function isHorizontalScrollPresent(element) {
    return element.scrollWidth > element.clientWidth;
  }

  function reduceCanvasDimensionsBy$1(width, height) {
    newCanvasWidth$1 -= width;
    newCanvasHeight$1 -= height;
  }

  function setCanvasElementProperties$2(left, top) {
    const canvasContainerElement = getCurrentCanvasContainerElement();
    canvasContainerElement.style.left = left || '50%';
    canvasContainerElement.style.top = top || '50%';
  }

  function setZoomOverFlowElementProperties$2(width, maxWidth, maxHeight) {
    zoomOverflowElement$2.style.width = width;
    zoomOverflowElement$2.style.maxWidth = maxWidth;
    zoomOverflowElement$2.style.maxHeight = maxHeight;
  }

  function setZoomOverFlowWrapperElementProperties$2(width, height, left, marginLeft, marginTop) {
    zoomOverflowWrapperElement$2.style.width = width;
    zoomOverflowWrapperElement$2.style.height = height;
    zoomOverflowWrapperElement$2.style.marginLeft = marginLeft;
    zoomOverflowWrapperElement$2.style.marginTop = marginTop;
    zoomOverflowWrapperElement$2.style.left = left || '50%';
  }

  function setStubElementProperties$2(width, height, marginLeft, marginTop) {
    stubElement$2.style.width = width;
    stubElement$2.style.height = height;
    stubElement$2.style.marginLeft = marginLeft;
    stubElement$2.style.marginTop = marginTop;
  }

  function setDarkZoomOverflowBackground$1() {
    zoomOverflowElement$2.style.backgroundColor = '#b1b1b1';
  }

  function setDefaultZoomOverflowBackground$2() {
    zoomOverflowElement$2.style.backgroundColor = '';
  }

  function setAllElementPropertiesToDefault$2(switchImage) {
    setZoomOverFlowElementProperties$2('', '', '');
    setStubElementProperties$2('', '', '', '');
    setZoomOverFlowWrapperElementProperties$2('', '', '', '', '');
    if (!switchImage) {
      setCanvasElementProperties$2('', '');
    }
    setDefaultZoomOverflowBackground$2();
  }

  function widthOverlapWithOneVerticalScrollBarOverlap$1(originalWidth, originalHeight) {
    const zoomOverflowMaxWidth = `${canvasProperties$2.maximumCanvasWidth}px`;
    const zoomOverflowMaxHeight = `${Math.round(canvasProperties$2.maximumCanvasHeight)}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${Math.round(scrollWidth$1 / 2) - 2}px)`;
    const zoomOverflowWrapperMarginLeft = `${Math.round(scrollWidth$1 / 2) - 2}px`;
    const stubMarginLeft = `${Math.round(originalWidth) - 1.5}px`;
    const stubMarginTop = `${originalHeight - 17.5}px`;
    const canvasLeft = `calc(50% - ${scrollWidth$1 / 2 + 0.5}px)`;
    const canvasTop = `calc(50% - ${Math.round(scrollWidth$1 / 2) + 0.5}px)`;
    const horizontalScrollOverlap = (Math.round(newCanvasHeight$1) + scrollWidth$1)
      - canvasProperties$2.maximumCanvasHeight + 1.75;
    setZoomOverFlowElementProperties$2('', zoomOverflowMaxWidth, zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$2('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$2('', '', stubMarginLeft, stubMarginTop);
    setCanvasElementProperties$2(canvasLeft, canvasTop);
    reduceCanvasDimensionsBy$1(scrollWidth$1 + 3, horizontalScrollOverlap);
    setDarkZoomOverflowBackground$1();
  }

  function widthOverflowDoubleVerticalScrollBarOverlap$1(originalWidth, originalHeight) {
    const zoomOverflowMaxWidth = `${newCanvasWidth$1 - 1}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${scrollWidth$1 / 2}px)`;
    const zoomOverflowWrapperMarginLeft = `${(scrollWidth$1 / 2)}px`;
    const stubWidth = `${originalWidth - 1}px`;
    const stubMarginTop = `${originalHeight - 18}px`;
    const canvasTop = `calc(50% - ${Math.round((scrollWidth$1 / 2))}px)`;
    setZoomOverFlowElementProperties$2('', zoomOverflowMaxWidth, '');
    setZoomOverFlowWrapperElementProperties$2('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$2(stubWidth, '', '', stubMarginTop);
    setCanvasElementProperties$2('', canvasTop);
    setDarkZoomOverflowBackground$1();
  }

  function widthOverflowDefault$1(originalWidth, originalHeight) {
    const zoomOverflowMaxWidth = `${newCanvasWidth$1 - 1}px`;
    const zoomOverflowWrapperLeft = 'calc(50% + 1px)';
    const zoomOverflowWrapperMarginTop = `${Math.round(scrollWidth$1 / 2) - 0.1}px`;
    const stubMarginLeft = `${originalWidth - 5}px`;
    const stubMarginTop = `${originalHeight - 14}px`;
    const canvasLeft = 'calc(50% + 0.5px)';
    const canvasTop = 'calc(50% + 1px)';
    setZoomOverFlowElementProperties$2('', zoomOverflowMaxWidth, '');
    setZoomOverFlowWrapperElementProperties$2('', '', zoomOverflowWrapperLeft, '', zoomOverflowWrapperMarginTop);
    setStubElementProperties$2('', '', stubMarginLeft, stubMarginTop);
    setCanvasElementProperties$2(canvasLeft, canvasTop);
    setDefaultZoomOverflowBackground$2();
  }

  function heightOverlapWithOneVerticalScrollBarOverlap$1(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${canvasProperties$2.maximumCanvasWidth}px`;
    const zoomOverflowMaxHeight = `${canvasProperties$2.maximumCanvasHeight}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${scrollWidth$1 - 1}px)`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth$1}px`;
    const stubWidth = `${Math.round(originalWidth) + 1.5}px`;
    const stubMarginTop = `${originalHeight - 18}px`;
    const canvasLeft = `calc(50% - ${Math.round(scrollWidth$1 / 2) - 0.5}px)`;
    const canvasTop = `calc(50% - ${Math.round(scrollWidth$1 / 2)}px)`;
    const verticalScrollOverlap = originalWidth + scrollWidth$1
      - canvasProperties$2.maximumCanvasWidth + 2.3;
    // bug fix for Chrome as sometimes the horizontal scroll does not render
    isHorizontalScrollPresent(zoomOverflowElement$2);
    setZoomOverFlowElementProperties$2(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$2('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$2(stubWidth, '', '', stubMarginTop);
    setCanvasElementProperties$2(canvasLeft, canvasTop);
    reduceCanvasDimensionsBy$1(verticalScrollOverlap, scrollWidth$1 + 2);
    setDarkZoomOverflowBackground$1();
  }

  function heightOverflowDoubleVerticalScrollBarOverlap$1(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${Math.round(originalWidth) + 0.3}px`;
    const zoomOverflowMaxHeight = `${newCanvasHeight$1}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${scrollWidth$1 / 2}px)`;
    const zoomOverflowWrapperWidth = `${originalWidth - 1}px`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth$1}px`;
    const canvasLeft = `calc(50% - ${(scrollWidth$1 / 2) + 1.5}px)`;
    const stubMarginTop = `${originalHeight - 18}px`;
    setZoomOverFlowElementProperties$2(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$2(zoomOverflowWrapperWidth, '', zoomOverflowWrapperLeft,
      zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$2('', '', '', stubMarginTop);
    setCanvasElementProperties$2(canvasLeft, '');
    setDarkZoomOverflowBackground$1();
  }

  function heightOverflowDefault$1(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${originalWidth + 0.5}px`;
    const zoomOverflowMaxHeight = `${newCanvasHeight$1}px`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth$1 + 2}px`;
    const stubMarginTop = `${originalHeight - scrollWidth$1 - 13}px`;
    setZoomOverFlowElementProperties$2(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$2('', '', '', zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$2('', '', '', stubMarginTop);
    setCanvasElementProperties$2('', '');
    setDarkZoomOverflowBackground$1();
  }

  // the use of current zoom may be the secret key for tighter zoom overflow wrap
  function fullOverflowOfWidthAndHeight$1(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${Math.round(newCanvasWidth$1 - 1)}px`;
    const zoomOverflowMaxHeight = `${Math.round(newCanvasHeight$1)}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${Math.round(scrollWidth$1 / 2 + 2)}px)`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth$1 / 2 + 3}px`;
    const stubMarginLeft = `${Math.round(originalWidth) - 4}px`;
    // will need work here if delta is 1.2
    const stubMarginTop = `${Math.round(originalHeight) - 12 - (currentZoom$2 + (4.5 / getScreenSizeDelta()))}px`;
    const canvasLeft = `calc(50% - ${3.25 * getScreenSizeDelta()}px)`;
    const canvasTop = 'calc(50% - 3.2px)';
    setZoomOverFlowElementProperties$2(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$2('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$2('', '', stubMarginLeft, stubMarginTop);
    setCanvasElementProperties$2(canvasLeft, canvasTop);
    reduceCanvasDimensionsBy$1(scrollWidth$1 + 2, scrollWidth$1 + 2);
    setDarkZoomOverflowBackground$1();
  }

  function setTempValues$1(newCanvasWidthArg, newCanvasHeightArg, canvasPropertiesArg, currentZoomArg) {
    newCanvasWidth$1 = newCanvasWidthArg;
    newCanvasHeight$1 = newCanvasHeightArg;
    canvasProperties$2 = canvasPropertiesArg;
    currentZoom$2 = currentZoomArg;
  }

  function changeElementPropertiesChromium(heightOverflowed, widthOverflowed, originalWidth,
    originalHeight, newCanvasWidthArg, newCanvasHeightArg, canvasPropertiesArg, currentZoomArg) {
    setTempValues$1(newCanvasWidthArg, newCanvasHeightArg, canvasPropertiesArg, currentZoomArg);
    if (heightOverflowed) {
      if (widthOverflowed) {
        setDoubleScrollCanvasState(true);
        fullOverflowOfWidthAndHeight$1(originalWidth, originalHeight);
      } else {
        setDoubleScrollCanvasState(false);
        heightOverflowDefault$1(originalWidth, originalHeight);
        if (Math.round(newCanvasWidth$1) + (scrollWidth$1 * 2)
          >= canvasProperties$2.maximumCanvasWidth - 1) {
          heightOverflowDoubleVerticalScrollBarOverlap$1(originalWidth, originalHeight);
          if (Math.round(newCanvasWidth$1) + scrollWidth$1 >= canvasProperties$2.maximumCanvasWidth - 1) {
            setDoubleScrollCanvasState(true);
            heightOverlapWithOneVerticalScrollBarOverlap$1(originalWidth, originalHeight);
          }
        }
      }
    } else if (widthOverflowed) {
      setDoubleScrollCanvasState(false);
      widthOverflowDefault$1(originalWidth, originalHeight);
      if (newCanvasHeight$1 + (scrollWidth$1 * 2) > canvasProperties$2.maximumCanvasHeight - 4) {
        widthOverflowDoubleVerticalScrollBarOverlap$1(originalWidth, originalHeight);
        if (newCanvasHeight$1 + (scrollWidth$1) > canvasProperties$2.maximumCanvasHeight - 1) {
          setDoubleScrollCanvasState(true);
          widthOverlapWithOneVerticalScrollBarOverlap$1(originalWidth, originalHeight);
        }
      }
    } else {
      setDoubleScrollCanvasState(false);
      setAllElementPropertiesToDefault$2();
    }
    const finalImageDimensions = {
      width: newCanvasWidth$1,
      height: newCanvasHeight$1,
    };
    canvas$e.setDimensions(finalImageDimensions);
  }

  function setDOMElementsChromium(stubElementArg, zoomOverflowElementArg,
    zoomOverflowWrapperElementArg) {
    stubElement$2 = stubElementArg;
    zoomOverflowElement$2 = zoomOverflowElementArg;
    zoomOverflowWrapperElement$2 = zoomOverflowWrapperElementArg;
  }

  function initialiseVariablesChromium(canvasArg) {
    canvas$e = canvasArg;
  }

  let zoomOverflowWrapperElement$1;
  let zoomOverflowElement$1;
  let stubElement$1;

  let newCanvasWidth;
  let newCanvasHeight;
  let currentZoom$1 = 1;
  const scrollWidthDefault = 6;
  let scrollWidth = scrollWidthDefault;

  let canvasProperties$1 = null;
  let canvas$d = null;

  function reduceCanvasDimensionsBy(width, height) {
    newCanvasWidth -= width;
    newCanvasHeight -= height;
  }

  function setCanvasElementProperties$1(left, top) {
    const canvasContainerElement = getCurrentCanvasContainerElement();
    canvasContainerElement.style.left = left || '50%';
    canvasContainerElement.style.top = top || '50%';
  }

  function setZoomOverFlowElementProperties$1(width, maxWidth, maxHeight) {
    zoomOverflowElement$1.style.width = width;
    zoomOverflowElement$1.style.maxWidth = maxWidth;
    zoomOverflowElement$1.style.maxHeight = maxHeight;
  }

  function setZoomOverFlowWrapperElementProperties$1(width, height, left, marginLeft, marginTop) {
    zoomOverflowWrapperElement$1.style.width = width;
    zoomOverflowWrapperElement$1.style.height = height;
    zoomOverflowWrapperElement$1.style.marginLeft = marginLeft;
    zoomOverflowWrapperElement$1.style.marginTop = marginTop;
    zoomOverflowWrapperElement$1.style.left = left || '50%';
  }

  function setStubElementProperties$1(width, height, marginLeft, marginTop) {
    stubElement$1.style.width = width;
    stubElement$1.style.height = height;
    stubElement$1.style.marginLeft = marginLeft;
    stubElement$1.style.marginTop = marginTop;
  }

  function setDarkZoomOverflowBackground() {
    zoomOverflowElement$1.style.backgroundColor = '#b1b1b1';
  }

  function setDefaultZoomOverflowBackground$1() {
    zoomOverflowElement$1.style.backgroundColor = '';
  }

  function setAllElementPropertiesToDefault$1(switchImage) {
    setZoomOverFlowElementProperties$1('', '', '');
    setStubElementProperties$1('', '', '', '');
    setZoomOverFlowWrapperElementProperties$1('', '', '', '', '');
    if (!switchImage) {
      setCanvasElementProperties$1('', '');
    }
    setDefaultZoomOverflowBackground$1();
  }

  function widthOverlapWithOneVerticalScrollBarOverlap(originalWidth, originalHeight) {
    const zoomOverflowMaxWidth = `${canvasProperties$1.maximumCanvasWidth - 1}px`;
    const zoomOverflowMaxHeight = `${Math.round(canvasProperties$1.maximumCanvasHeight - 2)}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${Math.round(scrollWidth / 2) - 2.5}px)`;
    const zoomOverflowWrapperMarginLeft = `${Math.round(scrollWidth / 2) - 2}px`;
    const stubMarginLeft = `${Math.round(originalWidth) - 5}px`;
    const stubMarginTop = `${originalHeight - 19}px`;
    const canvasLeft = `calc(50% - ${scrollWidth / 2}px)`;
    const canvasTop = `calc(50% - ${Math.round(scrollWidth / 2) + 0.5}px)`;
    const horizontalScrollOverlap = (Math.round(newCanvasHeight) + scrollWidth)
      - canvasProperties$1.maximumCanvasHeight + 2;
    setZoomOverFlowElementProperties$1('', zoomOverflowMaxWidth, zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$1('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$1('', '', stubMarginLeft, stubMarginTop);
    setCanvasElementProperties$1(canvasLeft, canvasTop);
    reduceCanvasDimensionsBy(scrollWidth + 0.5, horizontalScrollOverlap);
    setDarkZoomOverflowBackground();
  }

  function widthOverflowDoubleVerticalScrollBarOverlap(originalWidth, originalHeight) {
    const zoomOverflowMaxWidth = `${newCanvasWidth - 1}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${scrollWidth / 2}px)`;
    const zoomOverflowWrapperMarginLeft = `${(scrollWidth / 2)}px`;
    const stubWidth = `${originalWidth - 0.5}px`;
    const stubMarginTop = `${originalHeight - 18}px`;
    const canvasTop = `calc(50% - ${Math.round((scrollWidth / 2))}px)`;
    setZoomOverFlowElementProperties$1('', zoomOverflowMaxWidth, '');
    setZoomOverFlowWrapperElementProperties$1('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$1(stubWidth, '', '', stubMarginTop);
    setCanvasElementProperties$1('', canvasTop);
    setDarkZoomOverflowBackground();
  }

  function widthOverflowDefault(originalWidth, originalHeight) {
    const zoomOverflowMaxWidth = `${newCanvasWidth - 1}px`;
    const zoomOverflowWrapperLeft = 'calc(50% + 1px)';
    const zoomOverflowWrapperMarginTop = `${Math.round(scrollWidth / 2) - 1.5}px`;
    const stubMarginLeft = `${originalWidth - 4}px`;
    const stubMarginTop = `${originalHeight - 15}px`;
    setZoomOverFlowElementProperties$1('', zoomOverflowMaxWidth, '');
    setZoomOverFlowWrapperElementProperties$1('', '', zoomOverflowWrapperLeft, '', zoomOverflowWrapperMarginTop);
    setStubElementProperties$1('', '', stubMarginLeft, stubMarginTop);
    setCanvasElementProperties$1('', '');
    setDefaultZoomOverflowBackground$1();
  }

  function heightOverlapWithOneVerticalScrollBarOverlap(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${canvasProperties$1.maximumCanvasWidth + 0.5}px`;
    const zoomOverflowMaxHeight = `${canvasProperties$1.maximumCanvasHeight - 1}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${scrollWidth}px)`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth}px`;
    const stubWidth = `${Math.round(originalWidth) + 1}px`;
    const stubMarginTop = `${originalHeight - 19}px`;
    const canvasLeft = `calc(50% - ${Math.round(scrollWidth / 2)}px)`;
    const canvasTop = `calc(50% - ${Math.round(scrollWidth / 2) + 0.5}px)`;
    const verticalScrollOverlap = originalWidth + scrollWidth
      - canvasProperties$1.maximumCanvasWidth + 0.5;
    setZoomOverFlowElementProperties$1(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$1('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$1(stubWidth, '', '', stubMarginTop);
    setCanvasElementProperties$1(canvasLeft, canvasTop);
    reduceCanvasDimensionsBy(verticalScrollOverlap, scrollWidth + 1);
    setDarkZoomOverflowBackground();
  }

  function heightOverflowDoubleVerticalScrollBarOverlap(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${Math.round(originalWidth)}px`;
    const zoomOverflowMaxHeight = `${newCanvasHeight}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${scrollWidth / 2 - 0.5}px)`;
    const zoomOverflowWrapperWidth = `${originalWidth - 1}px`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth}px`;
    const canvasLeft = `calc(50% - ${scrollWidth / 2}px)`;
    const stubMarginTop = `${originalHeight - 18}px`;
    setZoomOverFlowElementProperties$1(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$1(zoomOverflowWrapperWidth, '', zoomOverflowWrapperLeft,
      zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$1('', '', '', stubMarginTop);
    setCanvasElementProperties$1(canvasLeft, '');
    setDarkZoomOverflowBackground();
  }

  function heightOverflowDefault(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${Math.round(originalWidth) - 1}px`;
    const zoomOverflowMaxHeight = `${newCanvasHeight}px`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth + 1}px`;
    // will need some work here if delta 1.2
    const stubMarginTop = getScreenSizeDelta() > 1.000001
      ? `${originalHeight - scrollWidth - (10 / getScreenSizeDelta())}px`
      : `${originalHeight - scrollWidth - 13}px`;
    setZoomOverFlowElementProperties$1(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$1('', '', '', zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$1('', '', '', stubMarginTop);
    setCanvasElementProperties$1('', '');
    setDarkZoomOverflowBackground();
  }

  // the use of current zoom may be the secret key for tighter zoom overflow wrap
  function fullOverflowOfWidthAndHeight(originalWidth, originalHeight) {
    const zoomOverflowWidth = `${newCanvasWidth + 0.5}px`;
    const zoomOverflowMaxHeight = `${newCanvasHeight}px`;
    const zoomOverflowWrapperLeft = `calc(50% - ${Math.round(scrollWidth / 2) - 1.25}px)`;
    const zoomOverflowWrapperMarginLeft = `${scrollWidth / 2 - 1}px`;
    const stubMarginLeft = getScreenSizeDelta() > 1.000001
      ? `${Math.round(originalWidth) - (3 / getScreenSizeDelta())}px`
      : `${Math.round(originalWidth) - 4.5}px`;
    const stubMarginTop = `${Math.round(originalHeight) - 16.5 - (currentZoom$1)}px`;
    const canvasLeft = `calc(50% - ${Math.round(scrollWidth / 2)}px)`;
    const canvasTop = `calc(50% - ${Math.round(scrollWidth / 2) + 0.5}px)`;
    setZoomOverFlowElementProperties$1(zoomOverflowWidth, '', zoomOverflowMaxHeight);
    setZoomOverFlowWrapperElementProperties$1('', '', zoomOverflowWrapperLeft, zoomOverflowWrapperMarginLeft, '');
    setStubElementProperties$1('', '', stubMarginLeft, stubMarginTop);
    setCanvasElementProperties$1(canvasLeft, canvasTop);
    reduceCanvasDimensionsBy(scrollWidth + 0.25, scrollWidth + 0.2);
    setDarkZoomOverflowBackground();
  }

  function setTempValues(newCanvasWidthArg, newCanvasHeightArg, canvasPropertiesArg, currentZoomArg) {
    newCanvasWidth = newCanvasWidthArg;
    newCanvasHeight = newCanvasHeightArg;
    canvasProperties$1 = canvasPropertiesArg;
    currentZoom$1 = currentZoomArg;
  }

  function getScrollWidth() {
    // create a div with the scroll
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    const browserScrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return browserScrollWidth;
  }

  function changeElementPropertiesFirefox(heightOverflowed, widthOverflowed, originalWidth,
    originalHeight, newCanvasWidthArg, newCanvasHeightArg, canvasPropertiesArg, currentZoomArg) {
    if (getScreenSizeDelta() > 1.000001) { newCanvasHeightArg += 1; }
    setTempValues(newCanvasWidthArg, newCanvasHeightArg, canvasPropertiesArg, currentZoomArg);
    scrollWidth = getScrollWidth() / 2;
    if (heightOverflowed) {
      if (widthOverflowed) {
        setDoubleScrollCanvasState(true);
        fullOverflowOfWidthAndHeight(originalWidth, originalHeight);
      } else {
        setDoubleScrollCanvasState(false);
        heightOverflowDefault(originalWidth, originalHeight);
        if (Math.round(newCanvasWidth) + (scrollWidth * 2)
          >= canvasProperties$1.maximumCanvasWidth - 1) {
          heightOverflowDoubleVerticalScrollBarOverlap(originalWidth, originalHeight);
          if (Math.round(newCanvasWidth) + scrollWidth >= canvasProperties$1.maximumCanvasWidth) {
            setDoubleScrollCanvasState(true);
            heightOverlapWithOneVerticalScrollBarOverlap(originalWidth, originalHeight);
          }
        }
      }
    } else if (widthOverflowed) {
      setDoubleScrollCanvasState(false);
      widthOverflowDefault(originalWidth, originalHeight);
      if (newCanvasHeight + (scrollWidth * 2) > canvasProperties$1.maximumCanvasHeight - 1) {
        widthOverflowDoubleVerticalScrollBarOverlap(originalWidth, originalHeight);
        if (newCanvasHeight + (scrollWidth) > canvasProperties$1.maximumCanvasHeight) {
          setDoubleScrollCanvasState(true);
          widthOverlapWithOneVerticalScrollBarOverlap(originalWidth, originalHeight);
        }
      }
    } else {
      setDoubleScrollCanvasState(false);
      setAllElementPropertiesToDefault$1();
    }
    const finalImageDimensions = {
      width: newCanvasWidth,
      height: newCanvasHeight,
    };
    canvas$d.setDimensions(finalImageDimensions);
  }

  function setDOMElementsFirefox(stubElementArg, zoomOverflowElementArg,
    zoomOverflowWrapperElementArg) {
    stubElement$1 = stubElementArg;
    zoomOverflowElement$1 = zoomOverflowElementArg;
    zoomOverflowWrapperElement$1 = zoomOverflowWrapperElementArg;
  }

  function initialiseVariablesFirefox(canvasArg) {
    canvas$d = canvasArg;
  }

  let currentZoom = null;
  let canvas$c = null;
  let canvasProperties = null;
  let imageProperties = null;

  let stubElement;
  let zoomOverflowElement;
  let zoomOverflowWrapperElement;
  let changeElementPropertiesOnZoomFunc = null;

  let timesZoomedIn = 0;
  let scrollWheelUsed = false;
  let movedPolygonPathOffsetReduced = false;

  const reduceShapeSizeRatios = {};
  const increaseShapeSizeRatios = {
    polygon: 0.104, point: 0.1, label: 0.08, bndBox: 0.104, popup: 0.1, crosshair: 0.104,
  };

  function updateShapesPropertiesForZoomOut() {
    polygonProperties$1.setZoomOutProperties(
      reduceShapeSizeRatios.point, reduceShapeSizeRatios.polygon,
    );
    labelProperties.setZoomOutProperties(reduceShapeSizeRatios.label);
    boundingBoxProps$1.setZoomOutProperties(reduceShapeSizeRatios.bndBox);
    crosshairProps.setZoomOutProperties(reduceShapeSizeRatios.crosshair);
  }

  function calculateNewShapeSizeRatios() {
    polygonProperties$1.setZoomInProperties(
      increaseShapeSizeRatios.point, increaseShapeSizeRatios.polygon,
    );
    labelProperties.setZoomInProperties(increaseShapeSizeRatios.label);
    boundingBoxProps$1.setZoomInProperties(increaseShapeSizeRatios.bndBox);
    crosshairProps.setZoomInProperties(increaseShapeSizeRatios.crosshair);
  }

  function zoomInObjects() {
    calculateNewShapeSizeRatios();
    canvas$c.forEachObject((iteratedObj) => {
      switch (iteratedObj.shapeName) {
        case 'polygon':
          iteratedObj.strokeWidth -= iteratedObj.strokeWidth * increaseShapeSizeRatios.polygon;
          iteratedObj.labelOffsetTop = iteratedObj.top
          - (iteratedObj.points[0].y - labelProperties.pointOffsetProperties().top);
          break;
        case 'tempPolygon':
        case 'addPointsLine':
          iteratedObj.strokeWidth -= iteratedObj.strokeWidth * increaseShapeSizeRatios.polygon;
          break;
        case 'point':
        case 'invisiblePoint':
        case 'firstPoint':
        case 'tempPoint':
        case 'initialAddPoint':
          iteratedObj.radius -= iteratedObj.radius * increaseShapeSizeRatios.point;
          iteratedObj.strokeWidth -= iteratedObj.strokeWidth * increaseShapeSizeRatios.point;
          if (iteratedObj.polygonMoved) {
            iteratedObj.left -= 0.05;
            iteratedObj.top -= 0.05;
          }
          break;
        case 'label':
          iteratedObj.fontSize -= iteratedObj.fontSize * increaseShapeSizeRatios.label;
          if (iteratedObj.attachedShape === 'polygon') {
            iteratedObj.top += 0.5;
          }
          break;
        case 'bndBox':
          iteratedObj.strokeWidth -= iteratedObj.strokeWidth * increaseShapeSizeRatios.bndBox;
          break;
        case 'crosshairLine':
          iteratedObj.strokeWidth -= iteratedObj.strokeWidth * increaseShapeSizeRatios.crosshair;
          break;
      }
    });
    canvas$c.renderAll();
  }

  function zoomOutLabel(label) {
    label.fontSize *= reduceShapeSizeRatios.label;
    if (label.attachedShape === 'polygon') {
      label.top -= 0.5;
    }
  }

  function zoomOutObject(object) {
    switch (object.shapeName) {
      case 'polygon':
        object.strokeWidth *= reduceShapeSizeRatios.polygon;
        object.labelOffsetTop = object.top
        - (object.points[0].y - labelProperties.pointOffsetProperties().top);
        break;
      case 'tempPolygon':
      case 'addPointsLine':
        object.strokeWidth *= reduceShapeSizeRatios.polygon;
        break;
      case 'point':
      case 'invisiblePoint':
      case 'firstPoint':
      case 'tempPoint':
      case 'initialAddPoint':
        object.radius *= reduceShapeSizeRatios.point;
        object.strokeWidth *= reduceShapeSizeRatios.point;
        if (object.polygonMoved) {
          object.left += 0.05;
          object.top += 0.05;
        }
        break;
      case 'label':
        zoomOutLabel(object);
        break;
      case 'bndBox':
        object.strokeWidth *= reduceShapeSizeRatios.bndBox;
        break;
      case 'crosshairLine':
        object.strokeWidth *= reduceShapeSizeRatios.crosshair;
        break;
    }
  }

  function zoomOutObjects() {
    updateShapesPropertiesForZoomOut();
    canvas$c.forEachObject((iteratedObj) => {
      zoomOutObject(iteratedObj);
    });
    canvas$c.renderAll();
  }

  function zoomOutObjectsOnImageSelect(previousShapes, previousLabels) {
    Object.keys(previousShapes).forEach((key) => {
      zoomOutObject(previousShapes[key].shapeRef);
      zoomOutLabel(previousLabels[key]);
    });
  }

  // explore zoomToPoint
  // option to always highlight
  // need to click twice on polygon for points to be above label

  function setNewCanvasDimensions(changeElements) {
    let heightOverflowed = false;
    let widthOverflowed = false;
    let newCanvasWidth = imageProperties.width * currentZoom;
    const originalWidth = newCanvasWidth;
    let newCanvasHeight = imageProperties.height * currentZoom;
    const originalHeight = newCanvasHeight;
    if (canvasProperties.maximumCanvasHeight < newCanvasHeight) {
      newCanvasHeight = canvasProperties.maximumCanvasHeight;
      heightOverflowed = true;
    }
    if (canvasProperties.maximumCanvasWidth < newCanvasWidth) {
      newCanvasWidth = canvasProperties.maximumCanvasWidth;
      widthOverflowed = true;
    }
    if (currentZoom === 1) {
      newCanvasWidth = Math.ceil(newCanvasWidth);
      newCanvasHeight = Math.ceil(newCanvasHeight);
    }
    if (changeElements) {
      changeElementPropertiesOnZoomFunc(heightOverflowed, widthOverflowed, originalWidth,
        originalHeight, newCanvasWidth, newCanvasHeight, canvasProperties, currentZoom);
    }
    return !widthOverflowed && !heightOverflowed;
  }

  function resetObjectsCoordinates() {
    canvas$c.forEachObject((iteratedObj) => {
      iteratedObj.setCoords();
    });
    canvas$c.renderAll();
  }

  function changeCanvas() {
    setNewCanvasDimensions(true);
    resetObjectsCoordinates();
    setCurrentZoomState(currentZoom);
  }

  function reduceMovePolygonPathOffset() {
    if (currentZoom > 2 && !movedPolygonPathOffsetReduced) {
      changeMovePolygonPathOffset(0.6);
      movedPolygonPathOffsetReduced = true;
    }
  }

  function increaseMovePolygonPathOffset() {
    if (currentZoom <= 2 && movedPolygonPathOffsetReduced) {
      changeMovePolygonPathOffset(0);
      movedPolygonPathOffsetReduced = false;
    }
  }

  function resetCanvasToDefault() {
    enableCanvasOuterMargin();
    currentZoom = 1;
    canvas$c.setZoom(currentZoom);
    while (timesZoomedIn !== 0) {
      timesZoomedIn -= 1;
      zoomOutObjects();
      increaseMovePolygonPathOffset();
    }
    const newFileSizeRatio = resizeCanvasAndImage();
    labelProperties.updatePolygonOffsetProperties(newFileSizeRatio);
    resizeAllObjectsDimensionsByDoubleScale(newFileSizeRatio, canvas$c);
    setZoomInButtonToDefault();
    setZoomOutButtonToDisabled();
    movedPolygonPathOffsetReduced = false;
  }

  function zoomOut() {
    if (!stubElement.style.marginTop && imageProperties.scaleX < 1) {
      resetCanvasToDefault();
    } else {
      timesZoomedIn -= 1;
      currentZoom -= 0.2;
      zoomOutObjects();
      increaseMovePolygonPathOffset();
      if (currentZoom < 1.0001) {
        enableCanvasOuterMargin();
        const newFileSizeRatio = resizeCanvasAndImage();
        labelProperties.updatePolygonOffsetProperties(newFileSizeRatio);
        resizeAllObjectsDimensionsByDoubleScale(newFileSizeRatio, canvas$c);
        canvas$c.setZoom(currentZoom);
        setZoomOutButtonToDisabled();
      } else if (setNewCanvasDimensions() && imageProperties.scaleX < 1) {
        resetCanvasToDefault();
      } else {
        setZoomInButtonToDefault();
        canvas$c.setZoom(currentZoom);
      }
    }
    changeCanvas();
  }

  function zoomIn() {
    if (currentZoom < 1.0001) removeCanvasOuterMargin();
    timesZoomedIn += 1;
    currentZoom += 0.2;
    canvas$c.setZoom(currentZoom);
    zoomInObjects();
    reduceMovePolygonPathOffset();
    changeCanvas();
    setZoomOutButtonToDefault();
    if (currentZoom >= 3.69999) {
      setZoomInButtonToDisabled();
    }
  }

  function calculateReduceShapeSizeFactor() {
    Object.keys(increaseShapeSizeRatios).forEach((key) => {
      const ratioToOriginalShapeSize = (1 / increaseShapeSizeRatios[key]);
      const originalShapeSizeToReducedShape = ratioToOriginalShapeSize - 1;
      reduceShapeSizeRatios[key] = ratioToOriginalShapeSize / originalShapeSizeToReducedShape;
    });
  }

  // first parameter still required?
  function zoomCanvas(canvasObj, action, windowResize) {
    if (windowResize) {
      canvasProperties = getCanvasProperties();
      imageProperties = getImageProperties();
      setNewCanvasDimensions(true);
    } else {
      canvasProperties = getCanvasProperties();
      imageProperties = getImageProperties();
      calculateReduceShapeSizeFactor();
      if (action === 'in' && currentZoom < 3.7) {
        zoomIn();
      } else if (action === 'out' && currentZoom > 1.0001) {
        zoomOut();
      }
      if (getCrosshairUsedOnCanvasState()) setCrosshairAfterZoom();
    }
  }

  function setCanvasElementProperties(left, top) {
    const canvasContainerElement = getCurrentCanvasContainerElement();
    canvasContainerElement.style.left = left || '50%';
    canvasContainerElement.style.top = top || '50%';
  }

  function setZoomOverFlowElementProperties(width, maxWidth, maxHeight) {
    zoomOverflowElement.style.width = width;
    zoomOverflowElement.style.maxWidth = maxWidth;
    zoomOverflowElement.style.maxHeight = maxHeight;
  }

  function setZoomOverFlowWrapperElementProperties(width, height, left, marginLeft, marginTop) {
    zoomOverflowWrapperElement.style.width = width;
    zoomOverflowWrapperElement.style.height = height;
    zoomOverflowWrapperElement.style.marginLeft = marginLeft;
    zoomOverflowWrapperElement.style.marginTop = marginTop;
    zoomOverflowWrapperElement.style.left = left || '50%';
  }

  function setStubElementProperties(width, height, marginLeft, marginTop) {
    stubElement.style.width = width;
    stubElement.style.height = height;
    stubElement.style.marginLeft = marginLeft;
    stubElement.style.marginTop = marginTop;
  }

  function setDefaultZoomOverflowBackground() {
    zoomOverflowElement.style.backgroundColor = '';
  }

  function setAllElementPropertiesToDefault(switchImage) {
    setZoomOverFlowElementProperties('', '', '');
    setStubElementProperties('', '', '', '');
    setZoomOverFlowWrapperElementProperties('', '', '', '', '');
    if (!switchImage) {
      setCanvasElementProperties('', '');
    }
    setDefaultZoomOverflowBackground();
  }

  function resetZoom(switchImage) {
    currentZoom = 1;
    const timesNeededToZoomOut = timesZoomedIn;
    while (timesZoomedIn !== 0) {
      timesZoomedIn -= 1;
      updateShapesPropertiesForZoomOut();
      increaseMovePolygonPathOffset();
    }
    setAllElementPropertiesToDefault(switchImage);
    setDoubleScrollCanvasState(false);
    setCurrentZoomState(currentZoom);
    enableCanvasOuterMargin();
    setZoomOutButtonToDisabled();
    if (getCrosshairUsedOnCanvasState()) {
      setCrosshairAfterZoom();
      resetCanvasCrosshairStrokeWidth(canvas$c);
    }
    return timesNeededToZoomOut;
  }

  function zoomOutObjectOnImageSelect(previousShapes, previousLabels, timesToZoomOut) {
    while (timesToZoomOut !== 0) {
      timesToZoomOut -= 1;
      zoomOutObjectsOnImageSelect(previousShapes, previousLabels);
    }
  }

  function loadCanvasElements(browserSpecificSetterCallback) {
    stubElement = document.getElementById('stub');
    zoomOverflowElement = document.getElementById('zoom-overflow');
    zoomOverflowWrapperElement = document.getElementById('zoom-overflow-wrapper');
    browserSpecificSetterCallback(stubElement, zoomOverflowElement, zoomOverflowWrapperElement);
  }

  function initialiseZoomVariables(canvasObj) {
    canvas$c = canvasObj;
    currentZoom = getCurrentZoomState();
    if (IS_FIREFOX) {
      initialiseVariablesFirefox(canvas$c);
      loadCanvasElements(setDOMElementsFirefox);
      changeElementPropertiesOnZoomFunc = changeElementPropertiesFirefox;
    } else {
      initialiseVariablesChromium(canvas$c);
      loadCanvasElements(setDOMElementsChromium);
      changeElementPropertiesOnZoomFunc = changeElementPropertiesChromium;
    }
  }

  function initiateZoomOverflowScroll(event) {
    zoomOverflowElement.scrollTop += event.deltaY;
    zoomOverflowElement.scrollTop += event.deltaX;
    scrollWheelUsed = true;
  }

  window.zoomOverflowScroll = (element) => {
    canvas$c.viewportTransform[4] = -element.scrollLeft;
    canvas$c.viewportTransform[5] = -element.scrollTop;
    if (!scrollWheelUsed) {
      scrolledViaScrollbar();
    } else {
      scrollWheelUsed = false;
    }
    resetObjectsCoordinates();
  };

  let nextButtonElement$1 = null;
  let previousButtonElement = null;
  let imageNameElement = null;
  let imageNameElementMinWidth = 0;
  let imageElementSidePaddingLength = 37;

  const ACTIVE_COLOR = 'black';
  const DEFAULT_IMAGE_NAME = 'Image name';
  const ENABLED_TOOLKIT_BUTTON_CLASS = 'toolkit-button-default';
  const DISABLED_TOOLKIT_BUTTON_CLASS = 'toolkit-button-disabled';
  const ENABLED_IMAGE_SWITCH_BUTTON_CLASS = 'image-switch-button-enabled';

  function disableButton(element) {
    element.classList.replace(ENABLED_TOOLKIT_BUTTON_CLASS, DISABLED_TOOLKIT_BUTTON_CLASS);
    element.classList.remove(ENABLED_IMAGE_SWITCH_BUTTON_CLASS);
  }

  function enableButton(element) {
    element.classList.replace(DISABLED_TOOLKIT_BUTTON_CLASS, ENABLED_TOOLKIT_BUTTON_CLASS);
    element.classList.add(ENABLED_IMAGE_SWITCH_BUTTON_CLASS);
  }

  function setImageNameElementToActive() {
    imageNameElement.style.color = ACTIVE_COLOR;
  }

  function setImageNameElementToDefault() {
    imageNameElement.innerHTML = DEFAULT_IMAGE_NAME;
    imageNameElement.style.color = '';
  }

  function setNameElementMinWidth() {
    const imageNameElementWidth = imageNameElement.clientWidth - imageElementSidePaddingLength;
    if (imageNameElementWidth > imageNameElementMinWidth) {
      imageNameElement.style.minWidth = `${imageNameElementWidth}px`;
      imageNameElementMinWidth = imageNameElementWidth;
    }
  }

  function updateImageNameElement(imageName, images, currentlySelectedImageId, isfirstFromMany) {
    imageNameElement.innerHTML = imageName;
    setNameElementMinWidth();
    if (images.length === 1) {
      setImageNameElementToActive();
      if (isfirstFromMany) {
        enableButton(nextButtonElement$1);
      } else {
        disableButton(nextButtonElement$1);
        disableButton(previousButtonElement);
      }
    } else if (images.length > 1) {
      if (images.length - 1 === currentlySelectedImageId) {
        if (isfirstFromMany) {
          enableButton(nextButtonElement$1);
        } else {
          disableButton(nextButtonElement$1);
        }
        enableButton(previousButtonElement);
      } else if (currentlySelectedImageId === 0) {
        disableButton(previousButtonElement);
        enableButton(nextButtonElement$1);
      } else {
        enableButton(nextButtonElement$1);
        enableButton(previousButtonElement);
      }
    }
  }

  function findImageSwitchElements() {
    imageNameElement = document.getElementById('image-name');
    [previousButtonElement, nextButtonElement$1] = document.getElementsByClassName('image-switch-button');
  }

  function initialiseImageSwitchPanelFunctionality() {
    findImageSwitchElements();
    imageElementSidePaddingLength /= getScreenSizeDelta();
  }

  function changeExistingImagesMovability(shapes) {
    setTestDrawLineState(false);
    // to set up shapes movable
    if (getMovableObjectsState()) {
      Object.keys(shapes).forEach((key) => {
        const object = shapes[key].shapeRef;
        // line immovable, uneditable
        if (object.previousShapeName === 'newLine') {
          object.lockMovementX = true;
          object.lockMovementY = true;
          if (getDefaultState()) {
            // hoverCursor appears over a given object as a mouse moves on it
            object.hoverCursor = 'default';
          }
        }
        if (object.previousShapeName === 'polygon' || object.shapeName === 'bndBox') {
          object.lockMovementX = false;
          object.lockMovementY = false;
          if (getDefaultState()) object.hoverCursor = 'move';
        }
      });
    }
    // to set up immovable
    else {
      Object.keys(shapes).forEach((key) => {
        const object = shapes[key].shapeRef;
        if (object.shapeName === 'polygon' || object.shapeName === 'bndBox') {
          object.lockMovementX = true;
          object.lockMovementY = true;
          if (getDefaultState()) object.hoverCursor = 'default';
        }
      });
    }
  }

  function changeMovaleObjectsSetting() {
    if (getMovableObjectsState()) {
      setMovableObjectsState(false);
    } else {
      setMovableObjectsState(true);
    }
    const currentCanvasShapes = getAllExistingShapes();
    changeExistingImagesMovability(currentCanvasShapes);
  }

  let watermarkDisplayed = false;

  function drawWatermarkOnCanvasAreaBackground() {
    if (watermarkDisplayed) return;
    const canvasWrapperParentElement = document.getElementById('canvas-wrapper-parent');
    canvasWrapperParentElement.style.backgroundImage = 'url(\'assets/svg/watermark 1.svg\')';
    canvasWrapperParentElement.style.backgroundAttachment = 'fixed';
    canvasWrapperParentElement.style.backgroundPosition = 'center';
    canvasWrapperParentElement.style.backgroundPositionX = 'calc((100% - 210px - (59px / var(--screen-size-delta))) / 2 + 70px)';
    canvasWrapperParentElement.style.backgroundSize = '500px 220px';
    canvasWrapperParentElement.style.backgroundRepeat = 'no-repeat';
    watermarkDisplayed = true;
  }

  function removeWatermarkFromCanvasAreaBackground() {
    if (!watermarkDisplayed) return;
    const canvasWrapperParentElement = document.getElementById('canvas-wrapper-parent');
    canvasWrapperParentElement.style.backgroundImage = '';
    canvasWrapperParentElement.style.backgroundAttachment = '';
    canvasWrapperParentElement.style.backgroundPosition = '';
    canvasWrapperParentElement.style.backgroundPositionX = '';
    canvasWrapperParentElement.style.backgroundSize = '';
    canvasWrapperParentElement.style.backgroundRepeat = '';
    watermarkDisplayed = false;
  }

  let currentlyActiveElement = null;
  let imageContainerElement = null;
  const images = [];
  let currentlySelectedImageId = 0;
  let canvas$b = null;
  let newImageId = 0;
  const ANIMATION_DURATION_MILLISECONDS = 300;

  function initialiseImageElement() {
    return document.createElement('img');
  }

  function appendAnimationReadyStyling(imageThumbnailElement) {
    imageThumbnailElement.style.transition = `${ANIMATION_DURATION_MILLISECONDS / 1000}s`;
    imageThumbnailElement.style.maxHeight = '0%';
  }

  function initiateDivElement() {
    return document.createElement('div');
  }

  function triggerAnimation(imageThumbnailElement) {
    setTimeout(() => {
      imageThumbnailElement.style.maxHeight = '100%';
      setTimeout(() => {
        imageThumbnailElement.style.transition = '';
      }, ANIMATION_DURATION_MILLISECONDS);
    });
  }

  // imageData is a base64 encoded image is necessary for adding image to image list
  // TODO: to find place where image was converted into base64
  function addNewImage(imageName, imageData) {

    const thumbnailElementRef = addNewItemToImageList(imageData);
    const imageObject = {
      data: imageData, name: imageName, shapes: {}, labels: {}, thumbnailElementRef,
    };
    images.push(imageObject);
  }

  function changeCurrentImageNameElementText(imageName, isfirstFromMany) {
    updateImageNameElement(imageName, images, currentlySelectedImageId, isfirstFromMany);
  }

  function displayUploadedImage(imageMetadata, isfirstFromMany) {
    highlightImageThumbnail(images[newImageId].thumbnailElementRef.childNodes[1]);
    saveAndRemoveCurrentImageDetails();
    changeCurrentImageNameElementText(imageMetadata.name, isfirstFromMany);
    images[newImageId].thumbnailElementRef.scrollIntoView();
    removeWatermarkFromCanvasAreaBackground();
    setToolkitStylingOnNewImage();
    if (getCrosshairUsedOnCanvasState()) updateCrosshairDimensionsAndHideAsync(canvas$b);
  }

  function setDefaultImageProperties(image, imageMetadata) {
    image.imageDimensions = { scaleX: 1, scaleY: 1 };
    image.shapes = {};
    image.labels = {};
    image.size = imageMetadata.size;
    image.numberOfMLGeneratedShapes = 0;
    image.analysedByML = false;
  }

  ////  unnecessary to consider
  function setCurrentlyActiveElementToInvisible() {
    if (currentlyActiveElement) {
      currentlyActiveElement.style.display = 'none';
      setSelectedMLThumbnailColourOverlayBackToDefault(currentlyActiveElement);
    }
  }

  function highlightImageThumbnail(element) {
    setCurrentlyActiveElementToInvisible();
    setMLThumbnailOverlayToMLSelected(element);
    element.style.display = 'block';
    currentlyActiveElement = element;
  }

  function addNewItemToImageList(imageData) {
    const imageThumbnailElement = initialiseImageElement();
    imageThumbnailElement.id = newImageId;
    imageThumbnailElement.classList.add('image-list-thumbnail-image');

    // console.log("imageData.src", imageData.src);

    imageThumbnailElement.src = imageData.src;
    imageThumbnailElement.setAttribute('draggable', false);
    imageThumbnailElement.setAttribute('ondragstart', 'return false'); // for firefox
    appendAnimationReadyStyling(imageThumbnailElement);
    const colorOverlayElement = initiateDivElement();
    colorOverlayElement.classList.add('image-list-thumbnail-color-overlay');
    colorOverlayElement.classList.add('image-list-thumbnail-default');
    const tickSVGElement = initialiseImageElement();
    tickSVGElement.classList.add('image-list-thumbnail-SVG-tick-icon');
    tickSVGElement.src = 'assets/svg/done-tick-highlighted.svg';
    const parentThumbnailDivElement = initiateDivElement();
    parentThumbnailDivElement.classList.add('image-list-thumbnail');
    parentThumbnailDivElement.onclick = window.switchImage.bind(this, newImageId);
    parentThumbnailDivElement.appendChild(imageThumbnailElement);
    parentThumbnailDivElement.appendChild(colorOverlayElement);
    parentThumbnailDivElement.appendChild(tickSVGElement);
    imageContainerElement.appendChild(parentThumbnailDivElement);
    triggerAnimation(imageThumbnailElement);
    return parentThumbnailDivElement;
  }

  function displayTickSVGOverImageThumbnail(id) {
    const imageId = id !== undefined ? id : currentlySelectedImageId;
    if (images[imageId]) images[imageId].thumbnailElementRef.childNodes[2].style.display = 'block';
  }

  function removeTickSVGOverImageThumbnail(id) {
    images[id].thumbnailElementRef.childNodes[2].style.display = 'none';
  }

  function getLastImageIdByName(imageName) {
    for (let i = images.length - 1; i >= 0; i -= 1) {
      if (imageName === images[i].name) {
        return i;
      }
    }
    return null;
  }

  function findImageContainerElement() {
    imageContainerElement = document.getElementById('image-list-image-container');
  }

  function initialiseImageList() {
    findImageContainerElement();
    initialiseImageListML(images);
  }

  function getAllImageData() {
    return images;
  }

  function updateCurrentImageIds(currentId, newId) {
    currentlySelectedImageId = currentId;
    newImageId = newId;
  }

  function assignCanvasToImageList(canvasObj) {
    canvas$b = canvasObj;
  }

  function addSingleImageToList(imageMetadata, imageData) {
    addNewImage(imageMetadata.name, imageData);
    setDefaultImageProperties(images[newImageId], imageMetadata);
    displayUploadedImage(imageMetadata, false);
    newImageId += 1;
  }

  function  addImageFromMultiUploadToList(imageMetadata, imageData, isfirstFromMany) {
    addNewImage(imageMetadata.name, imageData);
    setDefaultImageProperties(images[newImageId], imageMetadata);
    if (images.length === 1 || isfirstFromMany) {
      displayUploadedImage(imageMetadata, isfirstFromMany);
    }
    newImageId += 1;
  }

  // to replicate the bug, carry out the following:
  // upload image, draw bounding box, upload new image, come back to the first
  // and use diagonal scaling to the right edge
  // NOTE: some of the code to fix a similar bug is located in the purgeAllMouseEvents.js file
  function fixForObjectScalingBugOnCanvasSwitch() {
    const { canvas1, canvas2 } = getCanvasReferences();
    if (canvas1 && canvas1.__eventListeners && canvas1.__eventListeners['object:scaling'] && canvas1.__eventListeners['object:scaling'].length > 1) {
      assignDefaultEvents(canvas2, null, false);
    }
  }

  // the following function is implemented to set properties for unseen shapes that have been
  // uploaded where I had to originally setDefault(false) in order to trigger some of the contained
  // functions in order to set the objects correctly. There is still some scepticism for whether
  // this is working correctly, hence please be cautions.
  function resetCanvasForUnseenShapes() {
    purgeCanvasMouseEvents(canvas$b);
    setDefaultCursorMode(canvas$b);
    assignDefaultEvents(canvas$b, null, false);
  }

  // the reason why we do not use scaleX/scaleY is because these are returned in
  // a promise as the image is drawn hence we do not have it at this time
  // (for the new image)
  function changeToExistingImage(id) {
    if (currentlySelectedImageId >= 0) { captureCurrentImageData$1(); }
    removeAllLabelListItems();
    const timesZoomedOut = resetZoom(true);
    drawImageFromList(images[id].data);
    repopulateLabelAndShapeObjects(images[id].shapes, images[id].labels,
      images[id].imageDimensions, images[id].data);
    switchCanvasContainerElements();
    changeExistingImagesMovability(images[id].shapes);
    if (currentlySelectedImageId >= 0) {
      zoomOutObjectOnImageSelect(images[currentlySelectedImageId].shapes,
        images[currentlySelectedImageId].labels, timesZoomedOut);
    }
    setCurrentImageId(id);
    highlightImageThumbnail(images[id].thumbnailElementRef.childNodes[1]);
    scrollIntoViewIfNeeded(images[id].thumbnailElementRef, imageContainerElement);
    fixForObjectScalingBugOnCanvasSwitch();
    currentlySelectedImageId = id;
    changeCurrentImageNameElementText(images[currentlySelectedImageId].name);
    resetCanvasForUnseenShapes();
    setToolkitStylingOnNewImage();
    if (getCrosshairUsedOnCanvasState()) moveCanvasCrosshairViaLastCanvasPositionAsync();
  }

  function switchImage$1(direction) {
    if (direction === 'previous') {
      if (currentlySelectedImageId !== 0) {
        changeToExistingImage(currentlySelectedImageId - 1);
      }
    } else if (direction === 'next') {
      if (currentlySelectedImageId !== images.length - 1) {
        changeToExistingImage(currentlySelectedImageId + 1);
      }
    } else if (direction !== currentlySelectedImageId) {
      changeToExistingImage(direction);
    }
  }

  function canSwitchImage(direction) {
    if (direction === 'previous') {
      return currentlySelectedImageId > 0;
    }
    if (direction === 'next') {
      return currentlySelectedImageId < (images.length - 1);
    }
    return direction !== currentlySelectedImageId;
  }

  function saveAndRemoveCurrentImageDetails() {
    if (images.length > 1) {
      captureCurrentImageData$1();
    } else {
      setEditShapesButtonToActive();
    }
    removeAllLabelListItems();
    const timesZoomedOut = resetZoom(false);
    zoomOutObjectOnImageSelect(images[currentlySelectedImageId].shapes,
        images[currentlySelectedImageId].labels, timesZoomedOut);
    setMLGeneratedShapesToOriginalColorPallette();
    currentlySelectedImageId = newImageId;
    setCurrentImageId(newImageId);
  }

  function setToolkitStylingOnNewImage() {
    if (!getDefaultState() && getContinuousDrawingState()) {
      const lastDrawnShapeState = getLastDrawingModeState();
      if (lastDrawnShapeState === 'polygon') {
        setCreatePolygonButtonToActive();
        setCreateBoundingBoxButtonToDefault();
      } else if (lastDrawnShapeState === 'boundingBox') {
        setCreateBoundingBoxButtonToActive();
        setCreatePolygonButtonToDefault();
      } else {
        assignDefaultEvents(canvas$b, null, false);
        setCreatePolygonButtonToDefault();
        setCreateBoundingBoxButtonToDefault();
      }
    } else {
      setCreatePolygonButtonToDefault();
      setCreateBoundingBoxButtonToDefault();
    }
    setPolygonEditingButtonsToDefault();
    setRemoveImagesButtonDefault();
    setZoomInButtonToDefault();
  }

  function removeMLThumbnailHighlight(element) {
    element.childNodes[1].classList.replace('image-list-thumbnail-machine-learning', 'image-list-thumbnail-default');
    element.childNodes[1].style.display = 'none';
  }

  function removeSelectedMLThumbnailHighlight(element) {
    element.childNodes[1].classList.replace('image-list-thumbnail-machine-learning-selected', 'image-list-thumbnail-default');
  }

  function setMLThumbnailOverlayToMLSelected(element) {
    if (element.classList.contains('image-list-thumbnail-machine-learning')) {
      element.classList.replace('image-list-thumbnail-machine-learning', 'image-list-thumbnail-machine-learning-selected');
    }
  }

  function setSelectedMLThumbnailColourOverlayBackToDefault(element) {
    if (element.classList.contains('image-list-thumbnail-machine-learning-selected')) {
      element.classList.replace('image-list-thumbnail-machine-learning-selected', 'image-list-thumbnail-default');
      displayTickSVGOverImageThumbnail();
    }
  }

  function setMLGeneratedShapesToOriginalColorPallette() {
    if (images[currentlySelectedImageId].numberOfMLGeneratedShapes > 0) {
      Object.keys(images[currentlySelectedImageId].shapes).forEach((key) => {
        const shape = images[currentlySelectedImageId].shapes[key].shapeRef;
        if (shape.MLPallette) {
          shape.fill = shape.trueFill;
          shape.stroke = shape.trueStroke;
          shape.MLPallette = false;
        }
      });
      images[currentlySelectedImageId].numberOfMLGeneratedShapes = 0;
    }
  }

  // making JSON file
  function exportJSON(){
    let objectJSON = {};
    objectJSON = getStatementsForCurrentImageToJSON(images);
    writeJSON(objectJSON);
  }

  function writeJSON(objectJSON){
    const stringJSON = JSON.stringify(objectJSON);
    const stringJSONparsed = JSON.parse(stringJSON);

  // Start file download.
    download("annotation.json", stringJSON);
    
    if (wondow.DEBUG) {
      console.log("stringJSONparsed", stringJSONparsed);
    }

    return stringJSONparsed;
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  // evoked before uploading new image or swithching the images
  function captureCurrentImageData$1() {

    getStatementsForCurrentImageToJSON(images);

    images[currentlySelectedImageId].labels = retrieveAllLabelRefs();
    images[currentlySelectedImageId].shapes = retrieveAllShapeRefs();
    removeAllLabelRefs();
    removeAllShapeRefs();
    const currentlySelectedImageProperties = getImageProperties();
    const imageDimensions = {};
    imageDimensions.scaleX = currentlySelectedImageProperties.scaleX;
    imageDimensions.scaleY = currentlySelectedImageProperties.scaleY;
    imageDimensions.originalWidth = currentlySelectedImageProperties.originalWidth;
    imageDimensions.originalHeight = currentlySelectedImageProperties.originalHeight;
    imageDimensions.oldImageHeightRatio = calculateCurrentImageHeightRatio();
    imageDimensions.polygonOffsetLeft = labelProperties.pointOffsetProperties().left;
    imageDimensions.polygonOffsetTop = labelProperties.pointOffsetProperties().top;
    images[currentlySelectedImageId].imageDimensions = imageDimensions;
  }

  let canvas$a = null;

  function removeBoundingBox(mLGeneratedObject) {
    const activeObject = mLGeneratedObject || canvas$a.getActiveObject()
      || getCurrentlySelectedLabelShape();
    if (activeObject && activeObject.shapeName === 'bndBox') {
      removeShape(activeObject.id);
      removeLabel(activeObject.id);
      removeActiveLabelObject();
      removeLabelFromListOnShapeDelete(activeObject.id);
      clearBoundingBoxData();
      return true;
    }
    if (getBoundingBoxDrawingInProgressState()) {
      clearBoundingBoxData();
      return true;
    }
    return false;
  }

  function removeIfContinuousDrawing() {
    if (getContinuousDrawingState()) {
      if (isLabelling()) {
        if (isPolygonDrawingFinished()) {
          hideLabellerModal();
          removeTargetShape();
          resetDrawPolygonMode();
        } else if (isBoundingBoxDrawingFinished()) {
          hideLabellerModal();
          removeTargetShape();
          resetDrawBoundingBoxMode();
        }
        return true;
      }
      if (getPolygonDrawingInProgressState()) {
        if (getRemovingPolygonPointsState()) {
          setRemovePointsButtonToDefault();
          setRemovingPolygonPointsState(false);
        }
        resetNewPolygonData();
        purgeCanvasMouseEvents(canvas$a);
        assignDrawPolygonEvents(canvas$a);
        return true;
      }
    }
    return false;
  }

  function removeActiveLabel() {
    if (!removeIfContinuousDrawing() && !removeBoundingBox()) {
      if (isAddingPointsToPolygon()) {
        purgeCanvasMouseEvents(canvas$a);
        assignAddPointsOnExistingPolygonEvents(canvas$a);
        clearAllAddPointsData();
        setInitialStageOfAddPointsOnExistingPolygonMode(canvas$a);
      } else if (getAddingPolygonPointsState()) {
        clearAllAddPointsData();
      }
      const polygonId = removePolygon(getCurrentlySelectedLabelShape());
      removeLabelFromListOnShapeDelete(polygonId);
      removePolygonPoints();
      removeEditedPolygonId();
      if (setPolygonEditingButtonsToDisabled()) window.editShapes();
    }
    if (getAllImageData().length > 0 && getNumberOfShapes() === 0) {
      removeTickSVGOverImageThumbnail(getCurrentImageId());
    }
    setRemoveLabelsButtonToDisabled();
  }

  function assignCanvasForRemovingLabels(canvasObj) {
    canvas$a = canvasObj;
  }

  let canvas$9 = null;
  const tempShapes = [];

  function newLabelShapeGroup(shape, shapeCoordinates, isCurrentlySelectedImage,
    isUsingMachineLearning, image) {
    if (isCurrentlySelectedImage) {
      generateLabelShapeGroup(shape, shapeCoordinates.class,
        null, isUsingMachineLearning);
      canvas$9.add(shape);
    } else {
      generateLabelShapeGroup(shape, shapeCoordinates.class,
        image, isUsingMachineLearning);
    }
  }

  function generateNewBoundingBox(shapeCoordinates, imageScalingDimensions,
    imageLengthDimensions) {
    const boundingBoxShape = createNewBoundingBoxFromCoordinates(
      shapeCoordinates.bbox[0],
      shapeCoordinates.bbox[1],
      shapeCoordinates.bbox[2],
      shapeCoordinates.bbox[3],
      imageScalingDimensions,
      imageLengthDimensions,
    );
    return boundingBoxShape;
  }

  function generateNewPolygon(shapeCoordinates, imageScalingDimensions, imageLengthDimensions) {
    console.log("!!!!!!!!!!generateNewPolygon");
    const points = [];
    for (let i = 0; i < shapeCoordinates.points.length; i += 2) {
      points.push({
        x: shapeCoordinates.points[i] * imageScalingDimensions.scaleX,
        y: shapeCoordinates.points[i + 1] * imageScalingDimensions.scaleY,
      });
    }
    return createNewPolygonFromCoordinates(points, imageScalingDimensions, imageLengthDimensions);
  }

  function generateImageShapesForML(image, isCurrentlySelectedImage, predictedShapeCoordinates,
    imageScalingDimensions, imageLengthDimensions, isUsingMachineLearning) {
    predictedShapeCoordinates.forEach((shapeCoordinates) => {
      const boundingBox = generateNewBoundingBox(shapeCoordinates, imageScalingDimensions,
        imageLengthDimensions);
      newLabelShapeGroup(boundingBox, shapeCoordinates, isCurrentlySelectedImage,
        isUsingMachineLearning, image);
    });
    image.numberOfMLGeneratedShapes = predictedShapeCoordinates.length;
  }

  function getImageScalingDimensions(image) {
    if (image && image.imageDimensions && Object.keys(image.imageDimensions).length > 0) {
      return image.imageDimensions;
    }
    return { scaleX: 1, scaleY: 1 };
  }

  function getImageLengthDimensions(image) {
    if (image && image.data) {
      return { height: image.data.height, width: image.data.width };
    }
    return { height: 1, width: 1 };
  }

  function removeMLShapesOnImage(imageData, currentImage) {
    const shapes = currentImage ? getAllExistingShapes() : imageData.shapes;
    Object.keys(shapes).forEach((key) => {
      const shape = shapes[key].shapeRef;
      if (shape.isGeneratedViaML) {
        if (currentImage) {
          removeBoundingBox(shape);
        } else {
          delete shapes[key];
        }
      }
    });
    canvas$9.renderAll();
    imageData.numberOfMLGeneratedShapes = 0;
  }

  function generateNewShapesForML(predictedShapeCoordinatesForImages, allImageData,
    currentlySelectedImageId, isUsingMachineLearning) {
    removeMLShapesOnImage(allImageData[currentlySelectedImageId], true);
    Object.keys(predictedShapeCoordinatesForImages).forEach((key) => {
      removeMLShapesOnImage(allImageData[key]);
      const image = allImageData[key];
      const imageScalingDimensions = getImageScalingDimensions(image);
      const isCurrentlySelectedImage = currentlySelectedImageId === parseInt(key, 10);
      const imageLengthDimensions = getImageLengthDimensions(allImageData[key]);
      const predictedShapeCoordinates = predictedShapeCoordinatesForImages[key];
      if (predictedShapeCoordinates.length > 0) {
        generateImageShapesForML(image, isCurrentlySelectedImage, predictedShapeCoordinates,
          imageScalingDimensions, imageLengthDimensions, isUsingMachineLearning);
      }
    });
  }

  function captureCurrentImageData(allImageData, currentlySelectedImageId) {
    const currentlySelectedImageProperties = getImageProperties();
    const imageDimensions = {};
    imageDimensions.scaleX = currentlySelectedImageProperties.scaleX;
    imageDimensions.scaleY = currentlySelectedImageProperties.scaleY;
    allImageData[currentlySelectedImageId].imageDimensions = imageDimensions;
  }

  function getImageData() {
    const allImageData = getAllImageData();
    const currentlySelectedImageId = getCurrentImageId();
    return { allImageData, currentlySelectedImageId };
  }

  function removeImageThumbnails() {
    const { allImageData, currentlySelectedImageId } = getImageData();
    allImageData.forEach((image, index) => {
      if (currentlySelectedImageId === index) {
        removeSelectedMLThumbnailHighlight(image.thumbnailElementRef);
      } else {
        removeMLThumbnailHighlight(image.thumbnailElementRef);
      }
      if (Object.keys(image.shapes).length === 0) removeTickSVGOverImageThumbnail(index);
    });
  }

  function removeTempShapes() {
    tempShapes.forEach((shape) => {
      canvas$9.remove(shape);
    });
    canvas$9.renderAll();
  }

  function generateShapeForFileUpload(shapeData, imageData, isCurrentlySelectedImage) {
    const imageScalingDimensions = getImageScalingDimensions(imageData);
    const imageLengthDimensions = getImageLengthDimensions(imageData);
    if (shapeData.type === 'boundingBox') {
      const shape = generateNewBoundingBox(shapeData.coordinates, imageScalingDimensions,
        imageLengthDimensions);
      newLabelShapeGroup(shape, shapeData.coordinates, isCurrentlySelectedImage,
        false, imageData);
    } else if (shapeData.type === 'polygon') {
      const shape = generateNewPolygon(shapeData.coordinates, imageScalingDimensions,
        imageLengthDimensions);
      newLabelShapeGroup(shape, shapeData.coordinates, isCurrentlySelectedImage,
        false, imageData);
    }
  }

  function generateNewShapesForFileUpload(shapes, allImageData, currentlySelectedImageId,
    reuseAlreadyUploadedImages) {
    for (let i = 0; i < shapes.length; i += 1) {
      for (let y = allImageData.length - 1; y >= 0; y -= 1) {
        if (shapes[i].imageName === allImageData[y].name) {
          const isCurrentlySelectedImage = currentlySelectedImageId === y;
          generateShapeForFileUpload(shapes[i], allImageData[y], isCurrentlySelectedImage);
          displayTickSVGOverImageThumbnail(getLastImageIdByName(allImageData[y].name));
          if (!reuseAlreadyUploadedImages) { break; }
        }
      }
    }
  }

  function drawShapesForFileUpload(shapesData, allImageData, currentlySelectedImageId,
    reuseAlreadyUploadedImages) {
    if (shapesData.boundingBoxes.length > 0) {
      prepareCanvasForNewBoundingBoxesFromExternalSources(canvas$9);
      generateNewShapesForFileUpload(shapesData.boundingBoxes, allImageData,
        currentlySelectedImageId, reuseAlreadyUploadedImages);
    }
    if (shapesData.polygons.length > 0) {
      prepareCanvasForNewPolygonsFromExternalSources(canvas$9);
      generateNewShapesForFileUpload(shapesData.polygons, allImageData,
        currentlySelectedImageId, reuseAlreadyUploadedImages);
    }
  }

  function drawShapesForML(shapesData, allImageData, currentlySelectedImageId,
    isUsingMachineLearning) {
    // check bugs with label list options order after ML
    // check how fast the labelling is, what if the user cancels half way through,
    // do you undo the labels that
    prepareCanvasForNewBoundingBoxesFromExternalSources(canvas$9);
    generateNewShapesForML(shapesData, allImageData,
      currentlySelectedImageId, isUsingMachineLearning);
    removeTempShapes();
  }


  function assignCanvasEvents() {
    if (getNumberOfShapeTypes().boundingBoxes === 0) {
      const { canvas1 } = getCanvasReferences();
      // fix for bug where upon generating ML shapes, clicking finish would have two event listeners
      purgeCanvasMouseEvents(canvas1);
      // fix for a bug where the newly generated shapes would not adhere to
      // the boundaries when scaling
      assignDefaultEvents(canvas1, null, false);
    }
  }

  function resetCursor() {
    setDefaultCursorMode(canvas$9);
  }

  function drawShapesViaCoordinates(shapesData, isUsingMachineLearning, reuseAlreadyUploadedImages) {
    const { allImageData, currentlySelectedImageId } = getImageData();
    assignCanvasEvents();
    captureCurrentImageData(allImageData, currentlySelectedImageId);
    if (!isUsingMachineLearning) {
      drawShapesForFileUpload(shapesData, allImageData, currentlySelectedImageId,
        reuseAlreadyUploadedImages);
    } else {
      drawShapesForML(shapesData, allImageData, currentlySelectedImageId, isUsingMachineLearning);
    }
    repopulateDropdown();
    resetLabellerModalOptions();
    resetCursor();
    initiateResetCanvasEventsToDefaultEvent(canvas$9);
  }

  function assignCanvasForDrawingShapesViaCoordinates(canvasObj) {
    canvas$9 = canvasObj;
  }

  ({ element: document.createElement('script'), status: { download: 'waiting' } });
  ({ element: document.createElement('script'), status: { download: 'waiting' } });

  let currentViewNumber$1 = 1;
  let machineLearningData = {};
  let modalElement$1 = null;
  let closeModalFunc$1 = null;

  function isMachineLearningObjectEmpty() {
    if (Object.keys(machineLearningData).length === 0 && machineLearningData.constructor === Object) {
      return true;
    }
    let isEmpty = true;
    Object.keys(machineLearningData).forEach((key) => {
      if (machineLearningData[key].length > 0) {
        isEmpty = false;
      }
    });
    return isEmpty;
  }

  function displayNextView$1() {
    switch (currentViewNumber$1) {
      case 1:
        prepareInstantiateMachineLearningView();
        closeModalFunc$1 = () => {
          hideInitiateMachineLearningViewAssets();
          resetCursor();
          removeTempShapes();
          removeImageThumbnails();
          return true;
        };
        currentViewNumber$1 += 1;
        break;
      case 2:
        if (isMachineLearningObjectEmpty()) {
          displayNoObjectsFoundView();
          closeModalFunc$1 = () => {
            resetCursor();
            hideNoObjectsFoundViewAssets();
            return true;
          };
        } else {
          displayGeneratedLabelsView(machineLearningData);
          closeModalFunc$1 = () => {
            resetCursor();
            removeTempShapes();
            removeImageThumbnails();
            hideGeneratedLabelsViewAssets();
            return true;
          };
        }
        currentViewNumber$1 += 1;
        break;
      case 3:
        currentViewNumber$1 += 1;
        break;
    }
  }

  function displayModal$2() {
    setTimeout(() => {
      modalElement$1.style.display = '';
      setMachineLearningModalDisplayedState(true);
    }, 60);
    dimWindow(SLOW_DIM_SECONDS, THICK_DIM);
  }

  // need to use window functions because when the escape button is clicked after
  // the temp shapes have been drawn, the existing shapes are still selecatble
  function resetContinuousShapeButtons$1() {
    if (getContinuousDrawingState()) {
      if (getLastDrawingModeState() === 'polygon') {
        window.createNewPolygon();
      } else if (getLastDrawingModeState() === 'boundingBox') {
        window.createNewBndBox();
      }
    }
  }

  function setButtons$1(isCancel) {
    if (isCancel) {
      resetContinuousShapeButtons$1();
    } else {
      window.editShapes();
    }
  }

  function closeModal$1(isCancel) {
    setButtons$1(isCancel);
    modalElement$1.style.display = 'none';
    lightUpWindow(SLOW_LIGHTUP_MILLISECONDS);
    currentViewNumber$1 = 1;
    displayNextView$1();
    setMachineLearningModalDisplayedState(false);
  }

  function closeModalViaKeyboard$1() {
    const shouldCloseModal = closeModalFunc$1();
    if (shouldCloseModal) {
      closeModal$1(true);
    } else {
      currentViewNumber$1 = 1;
      displayNextView$1();
    }
  }

  function displayMachineLearningModal() {
    displayModal$2();
  }

  let boundingBoxCrosshairDropdownTriggerElement = null;
  let boundingBoxCrosshairDropdownElement = null;
  let settingsPopUpElement = null;
  const stickyProperties$1 = { 
    isPopupSticky: false, 
    stickCoordinates: 0, 
    bottomPxOverride: '-1px' 
  };

  function setPopoverPosition() {
    boundingBoxCrosshairDropdownElement.style.right = `-${(settingsPopUpElement.getBoundingClientRect().width + 2) / 2 + (11.5 * getScreenSizeDelta())}px`;
    boundingBoxCrosshairDropdownElement.style.top = `${document.getElementsByClassName('settings-table-row-data')[0].getBoundingClientRect().height * 3 + 3}px`;
    boundingBoxCrosshairDropdownElement.style.bottom = '';
  }

  function setStickyBoundingBoxCrosshairDropdownProperties() {
    setStickyPopupProperties(boundingBoxCrosshairDropdownElement,
      boundingBoxCrosshairDropdownTriggerElement, stickyProperties$1);
  }

  function setDisplayToBlock() {
    boundingBoxCrosshairDropdownElement.style.display = 'block';
  }

  function setTriggerElementToDefault() {
    boundingBoxCrosshairDropdownTriggerElement.style.color = '#747474';
  }

  function setTriggerElementToActive() {
    boundingBoxCrosshairDropdownTriggerElement.style.color = '#c4c4c4';
  }

  function displayBoundingBoxCrosshairDropdown() {
    setPopoverPosition();
    setDisplayToBlock();
    setTriggerElementToActive();
    setStickyBoundingBoxCrosshairDropdownProperties();
    setBoundingBoxCrosshairDropdownOpenState(true);
  }

  function hideDropdownElement() {
    boundingBoxCrosshairDropdownElement.style.display = 'none';
    boundingBoxCrosshairDropdownElement.style.bottom = '';
  }

  function hideBoundingBoxCrosshairDropdown$1() {
    hideDropdownElement();
    setTriggerElementToDefault();
    stickyProperties$1.isPopupSticky = false;
    setBoundingBoxCrosshairDropdownOpenState(false);
  }

  function triggerBoundingBoxCrosshairDropdown() {
    if (getBoundingBoxCrosshairDropdownOpenState()) {
      hideBoundingBoxCrosshairDropdown$1();
    } else {
      displayBoundingBoxCrosshairDropdown();
    }
  }

  function setInitialCheckBoxInputValues$1() {
    document.getElementById('settings-popup-bounding-box-crosshair-visibility-checkbox').checked = true;
  }

  function assignBoundingBoxCrosshairDropdownLocalVariables() {
    settingsPopUpElement = document.getElementById('settings-popup');
    boundingBoxCrosshairDropdownElement = document.getElementById('bounding-box-crosshair-dropdown');
    boundingBoxCrosshairDropdownTriggerElement = document.getElementById('settings-popup-bounding-box-crosshair-dropdown-trigger');
  }

  function initialiseBoundingBoxCrosshairDropdownStyling() {
    assignBoundingBoxCrosshairDropdownLocalVariables();
    setInitialCheckBoxInputValues$1();
  }

  let settingsPopupElement = null;
  let settingsToolkitButtonElement = null;
  const stickyProperties = { isPopupSticky: false, stickCoordinates: 0 };

  function setStickySettingsPopupProperties() {
    setStickyPopupProperties(settingsPopupElement,
      settingsToolkitButtonElement, stickyProperties);
  }

  function setDisplayPropertyToBlock() {
    settingsPopupElement.style.display = 'block';
  }

  function hidePopup() {
    settingsPopupElement.style.display = 'none';
    settingsPopupElement.style.bottom = '';
  }

  function displaySettingsPopup() {
    setPopupPosition(settingsPopupElement, settingsToolkitButtonElement);
    setDisplayPropertyToBlock();
    setStickySettingsPopupProperties();
    setSettingsPopupOpenState(true);
  }

  function hideSettingsPopup() {
    hidePopup();
    stickyProperties.isPopupSticky = false;
    setSettingsPopupOpenState(false);
    hideBoundingBoxCrosshairDropdown$1();
  }

  function setInitialCheckBoxInputValues() {
    document.getElementById('settings-popup-movable-objects-checkbox').checked = true;
    document.getElementById('settings-popup-continuous-drawing-checkbox').checked = true;
    document.getElementById('settings-popup-labels-visibility-checkbox').checked = true;
  }

  function assignSettingsPopupElementLocalVariables() {
    settingsPopupElement = document.getElementById('settings-popup');
    settingsToolkitButtonElement = document.getElementById('settings-button');
  }

  function initialiseSettingsPopupStyling() {
    assignSettingsPopupElementLocalVariables();
    setInitialCheckBoxInputValues();
  }

  function toggleSettingsPopup() {
    if (!getSettingsPopupOpenState()) {
      displaySettingsPopup();
    } else {
      hideSettingsPopup();
    }
  }

  // evoked only if Add Points was active
  function dismissAddPointsEvents(canvas) {
    if (isAddingPointsToPolygon()) {
      assignAddPointsOnExistingPolygonEvents(canvas);
      resetAddPoints();
      setInitialStageOfAddPointsOnExistingPolygonMode(canvas);
    }
    resetAddPoints();
    setAddingPolygonPointsState(false);
    purgeCanvasMouseEvents(canvas);
    setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
    assignDefaultEvents(canvas, getPolygonIdIfEditing());
  }

  function dismissRemovePointsEvents(canvas) {
    if (getPolygonDrawingInProgressState()) {
      resetNewPolygonData();
      setRemoveLabelsButtonToDisabled();
    }
    purgeCanvasMouseEvents(canvas);
    cleanPolygonPointsArray();
    setDefaultCursorModeAfterAlteringPolygonPoints(canvas);
    assignDefaultEvents(canvas, getPolygonIdIfEditing());
    setRemovingPolygonPointsState(false);
  }

  function dismissOtherEvents(canvas) {
    if (getReadyToDrawShapeState()) {
      setCancelledReadyToDrawState(true);
    } else {
      setCancelledReadyToDrawState(false);
    }
    if (getPolygonDrawingInProgressState()) {
      resetNewPolygonData();
      setRemoveLabelsButtonToDisabled();
    }
    if (getBoundingBoxDrawingInProgressState() || getLastDrawingModeState() === 'boundingBox') {
      clearBoundingBoxData();
    }
    purgeCanvasMouseEvents(canvas);
    assignDefaultEvents(canvas, null, getAddingPolygonPointsState());
    setDefaultCursorMode(canvas);
  }

  function initiateEditShapesEvent(canvas) {
    canvas.discardActiveObject();
    if (!getDefaultState()) {
      if (getAddingPolygonPointsState()) {
        dismissAddPointsEvents(canvas);
      } else if (getRemovingPolygonPointsState()) {
        dismissRemovePointsEvents(canvas);
      } else {
        dismissOtherEvents(canvas);
      }
      if (getAlteringPolygonPointsState()) {
        setAlteringPolygonPointsState(false);
      }
      setEditShapesButtonToActive();
      setReadyToDrawShapeState(false);
      setDefaultState(true);
    }
    setPolygonEditingButtonsToDefault();
  }

  let descriptionElement$2 = null;
  let startButtonElement = null;
  let cancelButtonElement$1 = null;
  let buttonsGroupElement$3 = null;

  function displayCancelButtonElement$1() {
    cancelButtonElement$1.style.display = '';
  }

  function hideCancelButtonElement$1() {
    cancelButtonElement$1.style.display = 'none';
  }

  function displayStartButtonElement() {
    startButtonElement.style.display = '';
  }

  function hideStartButtonElement() {
    startButtonElement.style.display = 'none';
  }

  function moveButtonsGroupElementToLowerPosition() {
    buttonsGroupElement$3.style.marginTop = `${14 / getScreenSizeDelta()}px`;
  }

  function displayDescription() {
    descriptionElement$2.style.display = '';
  }

  function hideDescriptionElement$2() {
    descriptionElement$2.style.display = 'none';
  }

  function moveDescriptionToLowerPosition() {
    descriptionElement$2.style.marginTop = `${26 / getScreenSizeDelta()}px`;
  }

  function getDefaultDescriptionMarkup() {
    return `
    Upload existing images/datasets and continue working on them in MyVision.
    <br>
    <div class="upload-datasets-modal-description-break"></div>
    It is important to note that everything you upload will never leave the privacy of your computer.`;
  }

  function prepareDescriptionView() {
    descriptionElement$2.innerHTML = getDefaultDescriptionMarkup();
    displayDescription();
    moveDescriptionToLowerPosition();
    displayStartButtonElement();
    moveButtonsGroupElementToLowerPosition();
    displayCancelButtonElement$1();
  }

  function hideDescriptionViewAssets() {
    hideStartButtonElement();
    hideDescriptionElement$2();
    hideCancelButtonElement$1();
  }

  const ONE_ANNOTATION_FILE_ALLOWED_ERROR_MESSAGE = 'Only one annotation file is allowed per dataset (app version 1.0)';
  const ONE_CLASSES_FILE_ALLOWED_ERROR_MESSAGE = 'Only one classes file is allowed per dataset (app version 1.0)';
  const ANNOTATION_FILE_INDICATOR = 'annotation';
  const CLASSES_FILE_INDICATOR = 'classes';
  const IMAGE_FILE_INDICATOR = 'image';
  const CLASSES_TABLE_INDICATOR = 'classes';
  const ANNOTATIONS_TABLE_INDICATOR = 'annotations';
  const IMAGES_TABLE_INDICATOR = 'images';
  const ACTIVE_ANNOTATION_FILE = 'activeAnnotationFile';
  const VALID_ANNOTATION_FILES_ARRAY = 'validAnnotationFiles';
  const FALTY_ANNOTATION_FILES_ARRAY = 'faltyAnnotationFiles';
  const CLASSES_FILES_ARRAY = 'classesFiles';
  const ACTIVE_CLASSES_FILE = 'activeClassesFile';
  const IMAGE_FILES_OBJECT = 'imageFiles';
  const COCO_JSON_FORMAT = 'COCO JSON';
  const VGG_JSON_FORMAT = 'VGG JSON';
  const CSV_FORMAT = 'CSV';
  const VOC_XML_FORMAT = 'VOC XML';
  const YOLO_TXT_FORMAT = 'YOLO TXT';
  const ACCEPT_JSON_AND_IMG_FILES = '.json, image/*';
  const ACCEPT_CSV_AND_IMG_FILES = '.csv, image/*';
  const ACCEPT_XML_AND_IMG_FILES = '.xml, image/*';
  const ACCEPT_TXT_AND_IMG_FILES = '.txt, image/*';
  const JSON_POSTFIX = '.json';
  const XML_POSTFIX = '.xml';
  const TXT_POSTFIX = '.txt';
  const CSV_POSTFIX = '.csv';
  const TWO_TABLE_STRATEGY = 'two tables';
  const THREE_TABLE_STRATEGY = 'three tables';
  const PROPERTIES_STRING = 'properties';
  const ATTRIBUTES_STRING = 'attributes';
  const TAGS_STRING = 'tag(s)';

  const availableFormats = [
    COCO_JSON_FORMAT,
    VGG_JSON_FORMAT,
    CSV_FORMAT,
    VOC_XML_FORMAT,
    YOLO_TXT_FORMAT,
  ];
  const defaultState = COCO_JSON_FORMAT;
  let currentlySelectedFormat = defaultState;
  let reuseAlreadyUploadedImages = false;

  function setReuseAlreadyUploadedImagesState(reuseAlreadyUploadedImagesState) {
    reuseAlreadyUploadedImages = reuseAlreadyUploadedImagesState;
  }

  function getFormatState() {
    return currentlySelectedFormat;
  }

  function getReuseAlreadyUploadedImagesState() {
    return reuseAlreadyUploadedImages;
  }

  function getAvailableFormats() {
    return availableFormats;
  }

  let descriptionElement$1 = null;
  let cancelButtonElement = null;
  let buttonsGroupElement$2 = null;
  let nextButtonElement = null;
  let tableElement = null;
  let selectFormatOuterContainerElement = null;
  let formatsTablePopulated = false;

  function displaySelectFormatOuterContainerElementView() {
    selectFormatOuterContainerElement.style.display = '';
  }

  function hideSelectFormatOuterContainerElement() {
    selectFormatOuterContainerElement.style.display = 'none';
  }

  function displayCancelButtonElement() {
    cancelButtonElement.style.display = '';
  }

  function hideCancelButtonElement() {
    cancelButtonElement.style.display = 'none';
  }

  function displayNextButtonElement() {
    nextButtonElement.style.display = '';
  }

  function hideNextButtonElement() {
    nextButtonElement.style.display = 'none';
  }

  function hideDescriptionElement$1() {
    descriptionElement$1.style.display = 'none';
  }

  function setButtonGroupElementMarginTop$2(length) {
    buttonsGroupElement$2.style.marginTop = `${length / getScreenSizeDelta()}px`;
  }

  function resetButtonGroupElementMarginTop$2() {
    buttonsGroupElement$2.style.marginTop = '';
  }

  function createTableRow(format, index) {
    const paddingTop = index === 2 ? 5 / getScreenSizeDelta() : 3 / getScreenSizeDelta();
    return `
    <td style="padding-top: ${paddingTop}px" class="data-format-table-row-data">
      <div class="checkbox-text format-option-text upload-data-format-row-text">
        ${format}
      </div>
      <input class="checkbox upload-datasets-format-checkbox" type="checkbox" name="something" onclick="selectUploadDatasetsFormat('${format}', this)">
    </td>
  `;
  }

  function populateFormatsTable(formats) {
    formats.forEach((format, index) => {
      const row = tableElement.insertRow(-1);
      row.innerHTML = createTableRow(format, index);
    });
    formatsTablePopulated = true;
  }

  function prepareSelectFormatView() {
    displayNextButtonElement();
    setButtonGroupElementMarginTop$2(5);
    displayCancelButtonElement();
    if (!formatsTablePopulated) { populateFormatsTable(getAvailableFormats()); }
    displaySelectFormatOuterContainerElementView();
  }

  function hideSelectFormatViewAssets() {
    hideNextButtonElement();
    hideDescriptionElement$1();
    resetButtonGroupElementMarginTop$2();
    hideCancelButtonElement();
    hideSelectFormatOuterContainerElement();
  }

  let titleElement = null;
  let table1Element = null;
  let table2Element = null;
  let table3Element = null;
  let backButtonElement = null;
  let imagesTableElement = null;
  let classesTableElement = null;
  let finishButtonElement = null;
  let buttonsGroupElement$1 = null;
  let uploadButtonElement = null;
  let annotationsTableTitle = null;
  let annotationsTableElement = null;
  let uploadDatasetsModalElement = null;
  let allImagesStyleSetToDefault = null;
  let imagesTableOuterContainerElement = null;
  let uploadDatasetFilesTriggerElement = null;
  let uploadDatasetsOuterContainerElement = null;
  let annotationsTableOuterContainerElement = null;

  let popoverIndex = 0;
  const modalWidth = 678;
  const modalHeight = 390;
  let currentTableStrategy = TWO_TABLE_STRATEGY;
  let finishButtonEnabled = false;

  const POPOVER_LEFT_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-row-popover-left';
  const POPOVER_ARROW_LEFT_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-row-popover-arrow-left';
  const POPOVER_RIGHT_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-row-popover-right';
  const POPOVER_ARROW_RIGHT_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-row-popover-arrow-right';
  const POPOVER_CENTER_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-row-popover-center';
  const POPOVER_ARROW_CENTER_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-row-popover-arrow-center';
  const TWO_TABLE_STRATEGY_CLASS = 'upload-datsets-modal-upload-datasets-two-table-strategy-section';
  const THREE_TABLE_STRATEGY_CLASS = 'upload-datsets-modal-upload-datasets-three-table-strategy-section';
  const POPOVER_ERROR_THEME_CLASS = 'error-popover-color-theme';
  const POPOVER_ARROW_ERROR_THEME_CLASS = 'upload-datasets-modal-upload-datasets-table-error-row-popover-arrow';
  const POPOVER_INFORMATION_THEME_CLASS = 'information-popover-color-theme';
  const POPOVER_ARROW_INFORMATION_THEME_CLASS = 'upload-datasets-modal-upload-datasets-table-information-row-popover-arrow';
  const ERROR_TEXT_THEME_CLASS = 'upload-datasets-modal-upload-datasets-table-row-text-error';
  const PROCEED_BUTTON_CLASS = 'popup-proceed-button';
  const ACTIVE_BUTTON_CLASS = 'popup-label-button';
  const DISABLED_BUTTON_CLASS = 'popup-label-button-disabled';
  const CLASSES_FILE_POPUP_INFORMATION = 'If this file belongs in the annotations table, make sure that each row contains exactly 5 attributes: class x y width height';
  let currentAnnotationsPopoverPositionClass = null;
  let currentAnnotationsPopoverArrowPositionClass = null;

  function createTableRowElementMarkup(fileName, tableName) {
    return `
    <div class="upload-datasets-modal-upload-datasets-table-row">
        <div onmouseenter="displayActiveRemoveFileIcon(this)" onmouseleave="displayDefaultRemoveFileIcon(this)" onclick="removeFileFromUploadDatasetFiles('${fileName}', '${tableName}')">
          <img src="assets/svg/x-icon-default.svg" class="upload-datasets-modal-remove-file-button"  alt="remove">
          <img src="assets/svg/x-icon-active.svg" style="display: none" class="upload-datasets-modal-remove-file-button" alt="remove">
        </div>
      <div class="upload-datasets-modal-upload-datasets-table-row-text">${fileName}</div>
    </div>
  `;
  }

  function addPopoverArrowMarginLeftStyle(tableName) {
    if (currentTableStrategy === TWO_TABLE_STRATEGY
        && tableName === ANNOTATIONS_TABLE_INDICATOR) {
      return `style="margin-left: ${(((modalWidth / 2 / 2) - 20) / getScreenSizeDelta())}px;"`;
    }
    if (currentTableStrategy === THREE_TABLE_STRATEGY
      && tableName === CLASSES_TABLE_INDICATOR) {
      return `style="margin-left: ${(((modalWidth / 3 / 2) + 34) / getScreenSizeDelta())}px;"`;
    }
    return '';
  }

  function createTableRowElementMarkupWthPopover(fileName, message, popoverPositionClass,
    popoverArrowPositionClass, tableName, index, popoverColorThemeClass,
    popoverArrowTheme, textThemeClass) {
    return `
    <div id="upload-datasets-modal-file-popover-${index}" class="popover upload-datasets-modal-upload-datasets-table-row-popover ${popoverColorThemeClass} ${popoverPositionClass}">${message}</div>
    <div id="upload-datasets-modal-file-popover-arrow-${index}" ${addPopoverArrowMarginLeftStyle(tableName)} class="arrow ${popoverArrowTheme} ${popoverArrowPositionClass}"></div>
    <div class="upload-datasets-modal-upload-datasets-table-row">
        <div onmouseenter="displayActiveRemoveFileIcon(this)" onmouseleave="displayDefaultRemoveFileIcon(this)" onclick="removeFileFromUploadDatasetFiles('${fileName}', '${tableName}')">
          <img src="assets/svg/x-icon-default.svg" class="upload-datasets-modal-remove-file-button" alt="remove">
          <img src="assets/svg/x-icon-active.svg" style="display: none" class="upload-datasets-modal-remove-file-button" alt="remove">
        </div>
        <div class="upload-datasets-modal-upload-datasets-table-row-text ${textThemeClass}" onmouseenter="displayUploadDatasetsAnnotationFilePopover(${index}, '${tableName}')" onmouseleave="removeUploadDatasetsAnnotationFilePopover(${popoverIndex})">${fileName}</div>
    </div>
  `;
  }

  window.displayUploadDatasetsAnnotationFilePopover = (id, tableName) => {
    const tableOuterContainerElement = tableName === ANNOTATIONS_TABLE_INDICATOR
      ? annotationsTableOuterContainerElement : imagesTableOuterContainerElement;
    document.getElementById(`upload-datasets-modal-file-popover-${id}`).style.display = 'block';
    document.getElementById(`upload-datasets-modal-file-popover-${id}`).style.marginTop = `-${tableOuterContainerElement.scrollTop + 29.4 / getScreenSizeDelta()}px`;
    document.getElementById(`upload-datasets-modal-file-popover-arrow-${id}`).style.display = 'block';
    document.getElementById(`upload-datasets-modal-file-popover-arrow-${id}`).style.marginTop = `-${tableOuterContainerElement.scrollTop + 4 / getScreenSizeDelta()}px`;
  };

  window.removeUploadDatasetsAnnotationFilePopover = (id) => {
    document.getElementById(`upload-datasets-modal-file-popover-${id}`).style.display = 'none';
    document.getElementById(`upload-datasets-modal-file-popover-arrow-${id}`).style.display = 'none';
  };

  window.displayActiveRemoveFileIcon = (element) => {
    element.childNodes[1].style.display = 'none';
    element.childNodes[3].style.display = '';
  };

  window.displayDefaultRemoveFileIcon = (element) => {
    element.childNodes[1].style.display = '';
    element.childNodes[3].style.display = 'none';
  };

  function getFileName(tableBody, rowIndex) {
    if (tableBody.childNodes[rowIndex].childNodes[0].childNodes[1].classList[1] === 'upload-datasets-modal-upload-datasets-table-row-popover') {
      return {
        fileName: tableBody.childNodes[rowIndex].childNodes[0].childNodes[5].childNodes[3].innerHTML,
        currentRowHasError: true,
      };
    }
    return {
      fileName: tableBody.childNodes[rowIndex].childNodes[0].childNodes[1].childNodes[3].innerHTML,
      currentRowHasError: false,
    };
  }

  function getTableElement(tableName) {
    switch (tableName) {
      case ANNOTATIONS_TABLE_INDICATOR:
        return annotationsTableElement;
      case IMAGES_TABLE_INDICATOR:
        return imagesTableElement;
      case CLASSES_TABLE_INDICATOR:
        return classesTableElement;
      default:
        return annotationsTableElement;
    }
  }

  function removeRow(subjectFileName, tableName) {
    const tableElement = getTableElement(tableName);
    const tableBody = tableElement.childNodes[1];
    for (let i = 0; i < tableBody.childNodes.length; i += 1) {
      const { fileName } = getFileName(tableBody, i);
      if (subjectFileName === fileName) {
        tableBody.childNodes[i].remove();
        return true;
      }
    }
    return false;
  }

  function getTableName(tableId) {
    switch (tableId) {
      case 'upload-datsets-modal-upload-datasets-annotations-table':
        return ANNOTATIONS_TABLE_INDICATOR;
      case 'upload-datsets-modal-upload-datasets-images-table':
        return IMAGES_TABLE_INDICATOR;
      case 'upload-datsets-modal-upload-datasets-classes-table':
        return CLASSES_TABLE_INDICATOR;
      default:
        return ANNOTATIONS_TABLE_INDICATOR;
    }
  }

  function checkFileAlreadyInTable(newFileName, validationResult, tableElement,
    popoverPositionClass, popoverArrowPositionClass) {
    const tableBody = tableElement.childNodes[1];
    for (let i = 0; i < tableBody.childNodes.length; i += 1) {
      const { fileName, currentRowHasError } = getFileName(tableBody, i);
      if (newFileName === fileName) {
        const tableName = getTableName(tableElement.id);
        const rowParentElement = tableBody.childNodes[i].childNodes[0];
        if (validationResult.error) {
          rowParentElement.innerHTML = createTableRowElementMarkupWthPopover(
            newFileName, validationResult.message, popoverPositionClass, popoverArrowPositionClass,
            tableName, popoverIndex += 1, POPOVER_ERROR_THEME_CLASS, POPOVER_ARROW_ERROR_THEME_CLASS,
            ERROR_TEXT_THEME_CLASS,
          );
          if (tableName === IMAGES_TABLE_INDICATOR) {
            allImagesStyleSetToDefault = false;
          }
        } else if (validationResult.information) {
          rowParentElement.innerHTML = createTableRowElementMarkupWthPopover(
            newFileName, validationResult.message, popoverPositionClass, popoverArrowPositionClass,
            tableName, popoverIndex += 1, POPOVER_INFORMATION_THEME_CLASS,
            POPOVER_ARROW_INFORMATION_THEME_CLASS, '',
          );
        } else if (currentRowHasError && !validationResult.error) {
          rowParentElement.innerHTML = createTableRowElementMarkup(newFileName, tableName);
        }
        rowParentElement.scrollIntoView();
        return true;
      }
    }
    return false;
  }

  function insertRowToClassesTable(fileName, validationResult) {
    let popoverThemeClass;
    let popoverArrowThemeClass;
    let textThemeClass;
    if (!validationResult.error) {
      validationResult.information = true;
      validationResult.message = CLASSES_FILE_POPUP_INFORMATION;
      popoverThemeClass = POPOVER_INFORMATION_THEME_CLASS;
      popoverArrowThemeClass = POPOVER_ARROW_INFORMATION_THEME_CLASS;
      textThemeClass = '';
    } else {
      popoverThemeClass = POPOVER_ERROR_THEME_CLASS;
      popoverArrowThemeClass = POPOVER_ARROW_ERROR_THEME_CLASS;
      textThemeClass = ERROR_TEXT_THEME_CLASS;
    }
    if (!checkFileAlreadyInTable(fileName, validationResult,
      classesTableElement, POPOVER_LEFT_POSITION_CLASS,
      POPOVER_ARROW_LEFT_POSITION_CLASS)) {
      const row = classesTableElement.insertRow(-1);
      const cell = row.insertCell(0);
      cell.innerHTML = createTableRowElementMarkupWthPopover(fileName, validationResult.message,
        POPOVER_LEFT_POSITION_CLASS, POPOVER_ARROW_LEFT_POSITION_CLASS,
        CLASSES_TABLE_INDICATOR, popoverIndex += 1,
        popoverThemeClass, popoverArrowThemeClass, textThemeClass);
      cell.scrollIntoView();
    }
  }

  function insertRowToImagesTable(fileName, validationResult) {
    if (!checkFileAlreadyInTable(fileName, validationResult,
      imagesTableElement, POPOVER_RIGHT_POSITION_CLASS,
      POPOVER_ARROW_RIGHT_POSITION_CLASS)) {
      const row = imagesTableElement.insertRow(-1);
      const cell = row.insertCell(0);
      if (validationResult.error) {
        cell.innerHTML = createTableRowElementMarkupWthPopover(fileName, validationResult.message,
          POPOVER_RIGHT_POSITION_CLASS, POPOVER_ARROW_RIGHT_POSITION_CLASS,
          IMAGES_TABLE_INDICATOR, popoverIndex += 1,
          POPOVER_ERROR_THEME_CLASS, POPOVER_ARROW_ERROR_THEME_CLASS,
          ERROR_TEXT_THEME_CLASS);
        allImagesStyleSetToDefault = false;
      } else {
        cell.innerHTML = createTableRowElementMarkup(fileName, IMAGES_TABLE_INDICATOR);
      }
      cell.scrollIntoView();
    }
  }

  function changeAllImagesTableRowsToDefault() {
    if (!allImagesStyleSetToDefault) {
      const tableBody = imagesTableElement.childNodes[1];
      for (let i = 0; i < tableBody.childNodes.length; i += 1) {
        const rowParentElement = tableBody.childNodes[i].childNodes[0];
        const { fileName } = getFileName(tableBody, i);
        rowParentElement.innerHTML = createTableRowElementMarkup(fileName, IMAGES_TABLE_INDICATOR);
        rowParentElement.scrollIntoView();
      }
    }
    allImagesStyleSetToDefault = true;
  }

  function changeClassesRowToDefault(classesFileName) {
    const tableBody = classesTableElement.childNodes[1];
    for (let i = 0; i < tableBody.childNodes.length; i += 1) {
      const rowParentElement = tableBody.childNodes[i].childNodes[0];
      const { fileName } = getFileName(tableBody, i);
      if (classesFileName === fileName) {
        rowParentElement.innerHTML = createTableRowElementMarkup(
          classesFileName, CLASSES_TABLE_INDICATOR,
        );
        rowParentElement.scrollIntoView();
      }
    }
  }

  function changeAnnotationRowToDefault(annotationFileName) {
    const tableBody = annotationsTableElement.childNodes[1];
    for (let i = 0; i < tableBody.childNodes.length; i += 1) {
      const rowParentElement = tableBody.childNodes[i].childNodes[0];
      const { fileName } = getFileName(tableBody, i);
      if (annotationFileName === fileName) {
        rowParentElement.innerHTML = createTableRowElementMarkup(
          annotationFileName, ANNOTATIONS_TABLE_INDICATOR,
        );
        rowParentElement.scrollIntoView();
      }
    }
  }

  function insertRowToAnnotationsTable(fileName, validationResult) {
    if (!checkFileAlreadyInTable(fileName, validationResult,
      annotationsTableElement, currentAnnotationsPopoverPositionClass,
      currentAnnotationsPopoverArrowPositionClass)) {
      const row = annotationsTableElement.insertRow(-1);
      const cell = row.insertCell(0);
      if (validationResult.error) {
        cell.innerHTML = createTableRowElementMarkupWthPopover(fileName, validationResult.message,
          currentAnnotationsPopoverPositionClass, currentAnnotationsPopoverArrowPositionClass,
          ANNOTATIONS_TABLE_INDICATOR, popoverIndex += 1,
          POPOVER_ERROR_THEME_CLASS, POPOVER_ARROW_ERROR_THEME_CLASS, ERROR_TEXT_THEME_CLASS);
      } else {
        cell.innerHTML = createTableRowElementMarkup(fileName,
          ANNOTATIONS_TABLE_INDICATOR);
      }
      cell.scrollIntoView();
    }
  }

  function clearTable(tableElement) {
    const newTbody = document.createElement('tbody');
    if (tableElement.childNodes[1]) {
      tableElement.replaceChild(newTbody, tableElement.childNodes[1]);
    }
  }

  function clearAllTables() {
    clearTable(annotationsTableElement);
    clearTable(imagesTableElement);
    clearTable(classesTableElement);
  }

  function setTitleElement(title) {
    titleElement.innerHTML = title;
  }

  function setTitleElementMarginTop(length) {
    titleElement.style.marginTop = `${length / getScreenSizeDelta()}px`;
  }

  function resetTitleElementMarginTop() {
    titleElement.style.marginTop = '';
  }

  function displayTable1() {
    table1Element.style.display = '';
  }

  function hideTable1() {
    table1Element.style.display = 'none';
  }

  function changeTwoTableStrategyToThree() {
    table2Element.classList.replace(TWO_TABLE_STRATEGY_CLASS, THREE_TABLE_STRATEGY_CLASS);
    table3Element.classList.replace(TWO_TABLE_STRATEGY_CLASS, THREE_TABLE_STRATEGY_CLASS);
  }

  function changeThreeTableStrategyToTwo() {
    table2Element.classList.replace(THREE_TABLE_STRATEGY_CLASS, TWO_TABLE_STRATEGY_CLASS);
    table3Element.classList.replace(THREE_TABLE_STRATEGY_CLASS, TWO_TABLE_STRATEGY_CLASS);
  }

  function setAnnotationsTableTitle(format) {
    annotationsTableTitle.innerHTML = `Annotations (${format})`;
  }

  function setButtonGroupElementMarginTop$1(length) {
    buttonsGroupElement$1.style.marginTop = length;
  }

  function setButtonGroupElementMarginTopByBrowser() {
    if (!IS_FIREFOX) {
      setButtonGroupElementMarginTop$1(`${272 / getScreenSizeDelta()}px`);
    } else {
      setButtonGroupElementMarginTop$1('1px');
    }
  }

  function resetButtonGroupElementMarginTop$1() {
    buttonsGroupElement$1.style.marginTop = '';
  }

  function displayFinishButtonElement() {
    finishButtonElement.style.display = '';
  }

  function hideFinishButtonElement() {
    finishButtonElement.style.display = 'none';
  }

  function enableFinishButton() {
    if (!finishButtonEnabled) {
      finishButtonElement.classList.add(PROCEED_BUTTON_CLASS);
      finishButtonElement.classList.replace(DISABLED_BUTTON_CLASS, ACTIVE_BUTTON_CLASS);
      finishButtonEnabled = true;
    }
  }

  function disableFinishButton() {
    finishButtonElement.classList.remove(PROCEED_BUTTON_CLASS);
    finishButtonElement.classList.replace(ACTIVE_BUTTON_CLASS, DISABLED_BUTTON_CLASS);
    finishButtonEnabled = false;
  }

  function displayUploadButtonElement() {
    uploadButtonElement.style.display = '';
  }

  function hideUploadButtonElement() {
    uploadButtonElement.style.display = 'none';
  }

  function displayBackButton() {
    backButtonElement.style.display = '';
  }

  function hideBackButton() {
    backButtonElement.style.display = 'none';
  }

  function displayUploadDatasetsOuterContainerElement() {
    uploadDatasetsOuterContainerElement.style.display = '';
  }

  function hideUploadDatasetsOuterContainerElement() {
    uploadDatasetsOuterContainerElement.style.display = 'none';
  }

  function getAcceptedFileFormat() {
    return uploadDatasetFilesTriggerElement.accept;
  }

  function setAcceptedFileFormatTrigger(format) {
    uploadDatasetFilesTriggerElement.accept = format;
  }

  function changeUploadDatasetsModalElementDimensions(width, height) {
    uploadDatasetsModalElement.style.width = `${width / getScreenSizeDelta()}px`;
    uploadDatasetsModalElement.style.height = `${height / getScreenSizeDelta()}px`;
  }

  function resetUploadDatasetsModalElementDimensions() {
    uploadDatasetsModalElement.style.width = '';
    uploadDatasetsModalElement.style.height = '';
  }

  function displayTableStrategyRelevantAssets(tableStrategy) {
    if (tableStrategy === THREE_TABLE_STRATEGY) {
      displayTable1();
      displayUploadButtonElement();
      changeUploadDatasetsModalElementDimensions(977, modalHeight);
      changeTwoTableStrategyToThree();
      currentAnnotationsPopoverPositionClass = POPOVER_CENTER_POSITION_CLASS;
      currentAnnotationsPopoverArrowPositionClass = POPOVER_ARROW_CENTER_POSITION_CLASS;
    } else {
      displayUploadButtonElement();
      changeUploadDatasetsModalElementDimensions(modalWidth, modalHeight);
      currentAnnotationsPopoverPositionClass = POPOVER_LEFT_POSITION_CLASS;
      currentAnnotationsPopoverArrowPositionClass = POPOVER_ARROW_LEFT_POSITION_CLASS;
    }
    currentTableStrategy = tableStrategy;
  }

  function prepareUploadDatasetsView(formatName, acceptedFileFormats, annotationFileFormat,
    tableStrategy) {
    setTitleElementMarginTop(9);
    setTitleElement(formatName);
    setAnnotationsTableTitle(annotationFileFormat);
    setAcceptedFileFormatTrigger(acceptedFileFormats);
    displayBackButton();
    displayFinishButtonElement();
    setButtonGroupElementMarginTopByBrowser();
    displayTableStrategyRelevantAssets(tableStrategy);
    displayUploadDatasetsOuterContainerElement();
  }

  function hideUploadDatasetsViewAssets() {
    if (currentTableStrategy === THREE_TABLE_STRATEGY) {
      hideTable1();
      changeThreeTableStrategyToTwo();
      currentTableStrategy = TWO_TABLE_STRATEGY;
    }
    hideBackButton();
    hideUploadButtonElement();
    hideFinishButtonElement();
    disableFinishButton();
    resetTitleElementMarginTop();
    resetButtonGroupElementMarginTop$1();
    hideUploadDatasetsOuterContainerElement();
    resetUploadDatasetsModalElementDimensions();
    clearAllTables();
    popoverIndex = 0;
  }

  function parseImageData(fileMetaData, event) {
    const image = new Image();
    image.src = event.target.result;
    return { fileFormat: IMAGE_FILE_INDICATOR, body: { fileMetaData, imageElement: image } };
  }

  function parseJSON(fileMetaData, event) {
    try {
      const JSONObject = JSON.parse(event.target.result);
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData, annotationData: JSONObject },
      };
    } catch (errorMessage) {
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData },
        errorObj: { error: true, message: `Invalid JSON - ${errorMessage}` },
      };
    }
  }

  function isArrayOfStrings(rowsOfAttributes) {
    for (let i = 0; i < rowsOfAttributes.length; i += 1) {
      if (!Number.isNaN(parseInt(rowsOfAttributes[i], 10))) {
        return false;
      }
    }
    return true;
  }

  // for clarification - this is for Tensorflow CSV
  function parseCSV(fileMetaData, event) {
    try {
      const rows = event.target.result.split(/\r\n|\n/);
      const rowsOfAttributes = [];
      rows.forEach((line) => {
        const attributes = line.split(',').filter(entry => entry.trim() !== '');
        if (attributes.length > 0) { rowsOfAttributes.push(attributes); }
      });
      if (rowsOfAttributes[0].length === 8 && isArrayOfStrings(rowsOfAttributes[0])) {
        rowsOfAttributes.shift();
      }
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData, annotationData: rowsOfAttributes },
      };
    } catch (errorMessage) {
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData },
        errorObj: { error: true, message: `Invalid CSV - ${errorMessage}` },
      };
    }
  }

  function xmlToJson(xml) {
    let resultJSONobject = {};
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        resultJSONobject['@attributes'] = {};
        for (let i = 0; i < xml.attributes.length; i += 1) {
          const attribute = xml.attributes.item(i);
          resultJSONobject['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      resultJSONobject = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i += 1) {
        const item = xml.childNodes.item(i);
        const { nodeName } = item;
        if (typeof (resultJSONobject[nodeName]) === 'undefined') {
          resultJSONobject[nodeName] = xmlToJson(item);
        } else {
          if (typeof (resultJSONobject[nodeName].push) === 'undefined') {
            const oldObject = resultJSONobject[nodeName];
            resultJSONobject[nodeName] = [];
            resultJSONobject[nodeName].push(oldObject);
          }
          resultJSONobject[nodeName].push(xmlToJson(item));
        }
      }
    }
    return resultJSONobject;
  }

  function parseXML(fileMetaData, event) {
    try {
      const parser = new DOMParser();
      const JSONObject = xmlToJson(parser.parseFromString(event.target.result, 'application/xml'));
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData, annotationData: JSONObject },
      };
    } catch (errorMessage) {
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData },
        errorObj: { error: true, message: `Invalid XML - ${errorMessage}` },
      };
    }
  }

  function txtToJSON(result, fileMetaData) {
    const lines = result.split('\n');
    let fileEmpty = true;
    let isAnnotationsFile = true;
    const linesOfAttributes = [];
    lines.forEach((line) => {
      const attributes = line
        .split(' ')
        .filter(entry => entry.trim() !== '')
        .map((entry) => {
          const number = Number.parseFloat(entry, 10);
          if (!Number.isNaN(number)) { return number; }
          return entry;
        });
      if (attributes.length > 0) {
        fileEmpty = false;
        if (attributes.length !== 5) {
          isAnnotationsFile = false;
        }
        linesOfAttributes.push(attributes);
      }
    });
    if (fileEmpty) {
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData },
        errorObj: { error: true, message: 'Text file is empty', parsingError: true },
      };
    }
    const fileFormat = isAnnotationsFile ? ANNOTATION_FILE_INDICATOR : CLASSES_FILE_INDICATOR;
    return { fileFormat, body: { fileMetaData, annotationData: linesOfAttributes } };
  }

  function parseTXT(fileMetaData, event) {
    try {
      return txtToJSON(event.target.result, fileMetaData);
    } catch (errorMessage) {
      return {
        fileFormat: ANNOTATION_FILE_INDICATOR,
        body: { fileMetaData },
        errorObj: { error: true, message: `Invalid text file - ${errorMessage}`, parsingError: true },
      };
    }
  }

  function parseAllFiles(fileMetaData, event) {
    if (fileMetaData.type.startsWith('image/')) {
      return parseImageData(fileMetaData, event);
    }
    if (fileMetaData.name.endsWith('.json')) {
      return parseJSON(fileMetaData, event);
    }
    if (fileMetaData.name.endsWith('.csv')) {
      return parseCSV(fileMetaData, event);
    }
    if (fileMetaData.name.endsWith('.xml')) {
      return parseXML(fileMetaData, event);
    }
    if (fileMetaData.name.endsWith('.txt')) {
      return parseTXT(fileMetaData, event);
    }
    return {};
  }

  let addFileFunc = null;
  let tableUpdaterFunc = null;
  let formatValidatorFunc = null;

  function onFileLoad(fileMetaData, event) {
    const parsedFileObj = parseAllFiles(fileMetaData, event);
    let { errorObj } = parsedFileObj;
    errorObj = formatValidatorFunc(parsedFileObj, errorObj);
    addFileFunc(parsedFileObj, errorObj);
    tableUpdaterFunc(parsedFileObj, errorObj);
  }

  function readFile(reader, file) {
    if (file.name.endsWith('.json') || file.name.endsWith('.csv')
      || file.name.endsWith('.xml') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }

  function getAcceptedDataFormat() {
    const rawFileFormatString = getAcceptedFileFormat().split(',')[0];
    return rawFileFormatString.substring(1, rawFileFormatString.length);
  }

  function validateFileFormat(file, acceptedDataFormat) {
    return file.type.includes(acceptedDataFormat) || file.type.includes('image/');
  }

  function uploadDatasetFilesHandler(uploadData) {
    if (uploadData.files && uploadData.files.length > 0) {
      const acceptedDataFormat = getAcceptedDataFormat();
      for (let i = 0; i < uploadData.files.length; i += 1) {
        if (validateFileFormat(uploadData.files[i], acceptedDataFormat)) {
          const reader = new FileReader();
          reader.onload = onFileLoad.bind(this, uploadData.files[i]);
          readFile(reader, uploadData.files[i]);
        }
      }
    }
  }

  function addAlreadyUploadedImages(images) {
    images.forEach((image) => {
      const parsedFileObj = {
        fileFormat: IMAGE_FILE_INDICATOR,
        body: { fileMetaData: { name: image.name }, imageElement: image.data },
      };
      const errorObj = { error: false, message: '', alreadyUploaded: true };
      addFileFunc(parsedFileObj, errorObj);
      tableUpdaterFunc(parsedFileObj, errorObj);
    });
  }

  function setFormatValidator(formatValidatorFuncArg) {
    formatValidatorFunc = formatValidatorFuncArg;
  }

  function setTableUpdater(tableUpdaterFuncArg) {
    tableUpdaterFunc = tableUpdaterFuncArg;
  }

  function setAddFile(addFileFuncArg) {
    addFileFunc = addFileFuncArg;
  }

  let finalObjectAssemblerFunc = null;

  function drawImages(images) {
    for (let i = 0; i < images.length; i += 1) {
      if (!images[i].alreadyUploaded) {
        const { fileMetaData, imageElement } = images[i].body;
        const firstImage = i === 0;
        addImageFromMultiUploadToList(fileMetaData, imageElement, firstImage);
        if (firstImage) { onImageLoad(imageElement); }
      }
    }
  }

  function drawShapesAndImages() {
    const { images, shapes } = finalObjectAssemblerFunc();
    drawImages(images);
    setTimeout(() => {
      const isUsingMachineLearning = false;
      drawShapesViaCoordinates(shapes, isUsingMachineLearning, getReuseAlreadyUploadedImagesState());
    }, 0);
  }

  function setFinalObjectAssembler(finalObjectAssemblerFuncArg) {
    finalObjectAssemblerFunc = finalObjectAssemblerFuncArg;
  }

  function triggerUploadDatasetFiles() {
    document.getElementById('upload-datasets-modal-upload-datasets-upload-trigger').click();
  }

  function removeFile$1(removeFileHandlerFunc, fileName, objectName) {
    removeFileHandlerFunc(fileName, objectName);
  }

  function moveToNextView(nextViewCallback, clearDatasetObjectFunc) {
    drawShapesAndImages();
    hideUploadDatasetsViewAssets();
    clearDatasetObjectFunc();
    nextViewCallback(false);
  }

  function goBackToSelectFormatView(selectFormatViewCallback, clearDatasetObjectFunc) {
    hideUploadDatasetsViewAssets();
    clearDatasetObjectFunc();
    selectFormatViewCallback();
  }

  function registerButtonEventHandlers(nextViewCallback, removeFileHandlerFunc,
    clearDatasetObjectFunc, selectFormatViewCallback) {
    window.triggerUploadDatasetFiles = triggerUploadDatasetFiles;
    window.uploadDatasetFilesHandler = uploadDatasetFilesHandler;
    window.drawShapesAndImages = moveToNextView.bind(this, nextViewCallback, clearDatasetObjectFunc);
    window.removeFileFromUploadDatasetFiles = removeFile$1.bind(this, removeFileHandlerFunc);
    window.goBackToSelectFormatView = goBackToSelectFormatView.bind(this,
      selectFormatViewCallback, clearDatasetObjectFunc);
  }

  let yesButtonElement = null;
  let noButtonElement = null;
  let descriptionElement = null;
  let buttonsGroupElement = null;
  const DESCRIPTION_TEXT = 'Reuse already uploaded images?';

  function displayYesButtonElement() {
    yesButtonElement.style.display = '';
  }

  function hideYesButtonElement() {
    yesButtonElement.style.display = 'none';
  }

  function displayNoButtonElement() {
    noButtonElement.style.display = '';
  }

  function hideNoButtonElement() {
    noButtonElement.style.display = 'none';
  }

  function setDescriptionElementMarginTop(length) {
    descriptionElement.style.marginTop = `${length / getScreenSizeDelta()}px`;
  }

  function resetDescriptionElementMarginTop() {
    descriptionElement.style.marginTop = '';
  }

  function setDescriptionElementText(text) {
    descriptionElement.innerHTML = text;
  }

  function centerDescriptionElementText() {
    descriptionElement.style.textAlign = 'center';
  }

  function resetDescriptionElementTextAlign() {
    descriptionElement.style.textAlign = '';
  }

  function displayDescriptionElement() {
    descriptionElement.style.display = '';
  }

  function hideDescriptionElement() {
    descriptionElement.style.display = 'none';
  }

  function setButtonGroupElementMarginTop(length) {
    buttonsGroupElement.style.marginTop = `${length / getScreenSizeDelta()}px`;
  }

  function resetButtonGroupElementMarginTop() {
    buttonsGroupElement.style.marginTop = '';
  }

  function prepareUseExistingImagesQstnView() {
    setDescriptionElementText(DESCRIPTION_TEXT);
    centerDescriptionElementText();
    setDescriptionElementMarginTop(61);
    displayYesButtonElement();
    displayNoButtonElement();
    displayDescriptionElement();
    setButtonGroupElementMarginTop(5);
  }

  function hideUseExistingImagesViewAssets() {
    resetDescriptionElementTextAlign();
    resetDescriptionElementMarginTop();
    hideDescriptionElement();
    hideYesButtonElement();
    hideNoButtonElement();
    resetButtonGroupElementMarginTop();
  }

  function validateExistingImagesWhenMultipleAnnotationFilesAllowed(datasetObject,
    updateImageFileErrorStatusFunc, validateFileFunc) {
    if (datasetObject[VALID_ANNOTATION_FILES_ARRAY].length > 0) {
      let foundValid = false;
      Object.keys(datasetObject[IMAGE_FILES_OBJECT]).forEach((key) => {
        const imageFile = datasetObject[IMAGE_FILES_OBJECT][key];
        const validationResult = validateFileFunc(imageFile);
        if (!validationResult.error) { foundValid = true; }
        const { name } = imageFile.body.fileMetaData;
        insertRowToImagesTable(name, validationResult);
        updateImageFileErrorStatusFunc(name, validationResult.error);
      });
      if (foundValid) {
        enableFinishButton();
      } else {
        disableFinishButton();
      }
    } else {
      changeAllImagesTableRowsToDefault();
      disableFinishButton();
    }
  }

  function validateExistingImagesWhenOneAnnotationFileAllowed(datasetObject,
    updateImageFileErrorStatusFunc, validateFileFunc) {
    let foundValid = false;
    Object.keys(datasetObject[IMAGE_FILES_OBJECT]).forEach((key) => {
      const imageFile = datasetObject[IMAGE_FILES_OBJECT][key];
      const validationResult = validateFileFunc(imageFile);
      if (!validationResult.error) { foundValid = true; }
      const { name } = imageFile.body.fileMetaData;
      insertRowToImagesTable(name, validationResult);
      updateImageFileErrorStatusFunc(name, validationResult.error);
    });
    if (foundValid) {
      enableFinishButton();
    } else {
      disableFinishButton();
    }
  }

  function reValidateExistingAnnotations(annotationFiles, validateFileFunc) {
    annotationFiles.forEach((annotationFile) => {
      const validationResult = validateFileFunc(annotationFile);
      const { name } = annotationFile.body.fileMetaData;
      if (!validationResult.error) {
        validationResult.error = true;
        validationResult.message = ONE_ANNOTATION_FILE_ALLOWED_ERROR_MESSAGE;
      }
      insertRowToAnnotationsTable(name, validationResult);
    });
  }

  function checkAnnotationAlreadyInTable(validationResult, datasetObject,
    updateImageFileErrorStatusFunc, validateFileFunc) {
    const activeAnnotationFile = datasetObject[ACTIVE_ANNOTATION_FILE];
    const validAnnotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
    if (!validationResult.error) {
      reValidateExistingAnnotations(validAnnotationFiles, validateFileFunc);
      validateExistingImagesWhenOneAnnotationFileAllowed(datasetObject,
        updateImageFileErrorStatusFunc, validateFileFunc);
      return validationResult;
    }
    if (validAnnotationFiles.length > 0) {
      if (activeAnnotationFile && activeAnnotationFile.newlyActive) {
        changeAnnotationRowToDefault(activeAnnotationFile.body.fileMetaData.name);
        activeAnnotationFile.newlyActive = false;
        validateExistingImagesWhenOneAnnotationFileAllowed(datasetObject,
          updateImageFileErrorStatusFunc, validateFileFunc);
      }
      return { error: true, message: validationResult.message };
    }
    changeAllImagesTableRowsToDefault();
    return validationResult;
  }

  function updateAnnotationTableWhenOneAnnotationFileAllowed(fileName, validationResult,
    datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc) {
    const newValidationResult = checkAnnotationAlreadyInTable(
      validationResult, datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc,
    );
    // whilst the reValidateExistingAnnotations inserts the new annotation,
    // this overwrites it if it has been incorrectly set with an error
    insertRowToAnnotationsTable(fileName, newValidationResult);
  }

  function updateAnnotationTableWhenMultipleAnnotationFilesAllowed(fileName, validationResult,
    datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc) {
    validateExistingImagesWhenMultipleAnnotationFilesAllowed(datasetObject,
      updateImageFileErrorStatusFunc, validateFormatFunc);
    // whilst the reValidateExistingAnnotations inserts the new annotation,
    // this overwrites it if it has been incorrectly set with an error
    insertRowToAnnotationsTable(fileName, validationResult);
  }

  function updateTables$1(parsedObj, validationResult) {
    if (!parsedObj.body) return;
    const fileName = parsedObj.body.fileMetaData.name;
    const datasetObject = this.datasetObjectManager.getDatasetObject();
    if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      insertRowToImagesTable(fileName, validationResult);
      if (validationResult.valid) { enableFinishButton(); }
    }
    if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
      this.updateAnnotationTableFunc(fileName, validationResult, datasetObject,
        this.datasetObjectManager.updateImageFileErrorStatus, this.validateFormat);
    }
  }

  function buildTableUpdaterForMultipleAnnotationFilesStrategy(datasetObjectManager,
    validateFormat) {
    const updateAnnotationTableFunc = updateAnnotationTableWhenMultipleAnnotationFilesAllowed;
    return updateTables$1.bind(
      { datasetObjectManager, validateFormat, updateAnnotationTableFunc },
    );
  }

  function buildTableUpdaterForOneAnnotationFileStrategy(datasetObjectManager, validateFormat) {
    const updateAnnotationTableFunc = updateAnnotationTableWhenOneAnnotationFileAllowed;
    return updateTables$1.bind(
      { datasetObjectManager, validateFormat, updateAnnotationTableFunc },
    );
  }

  const TableUpdaterGenericBuilder = {
    buildTableUpdaterForOneAnnotationFileStrategy,
    buildTableUpdaterForMultipleAnnotationFilesStrategy,
  };

  const datasetObject = { };
  datasetObject[ACTIVE_ANNOTATION_FILE] = null;
  datasetObject[VALID_ANNOTATION_FILES_ARRAY] = [];
  datasetObject[FALTY_ANNOTATION_FILES_ARRAY] = [];
  datasetObject[ACTIVE_CLASSES_FILE] = null;
  datasetObject[CLASSES_FILES_ARRAY] = [];
  datasetObject[IMAGE_FILES_OBJECT] = {};

  function clearDatasetObject() {
    datasetObject[CLASSES_FILES_ARRAY] = [];
    datasetObject[ACTIVE_CLASSES_FILE] = null;
    datasetObject[VALID_ANNOTATION_FILES_ARRAY] = [];
    datasetObject[FALTY_ANNOTATION_FILES_ARRAY] = [];
    datasetObject[IMAGE_FILES_OBJECT] = {};
  }

  function getIndexOfFileInArray(fileName, subjectArray) {
    for (let i = 0; i < subjectArray.length; i += 1) {
      if (subjectArray[i].body.fileMetaData.name === fileName) {
        return i;
      }
    }
    return undefined;
  }

  function removeFile(fileName, objectName) {
    if (Array.isArray(datasetObject[objectName])) {
      const subjectArray = datasetObject[objectName];
      const foundIndex = getIndexOfFileInArray(fileName, subjectArray);
      if (foundIndex !== undefined) {
        subjectArray.splice(
          foundIndex, 1,
        );
      }
    } else if (datasetObject[objectName]) {
      delete datasetObject[objectName][fileName];
    }
  }

  function replaceActiveFileIfRemoving(fileName, arrayName, activeFileName) {
    if (datasetObject[activeFileName]
      && datasetObject[activeFileName].body.fileMetaData.name === fileName) {
      let newActiveAnnotationFile = null;
      for (let i = 0; i < datasetObject[arrayName].length; i += 1) {
        if (datasetObject[arrayName][i].body.fileMetaData.name !== fileName) {
          newActiveAnnotationFile = datasetObject[arrayName][i];
        }
      }
      datasetObject[activeFileName] = newActiveAnnotationFile;
      if (datasetObject[activeFileName]) {
        datasetObject[activeFileName].newlyActive = true;
      }
    }
  }

  function addNewClassesFile(fileName, classesFileObj) {
    const existingFileIndex = getIndexOfFileInArray(fileName,
      datasetObject[CLASSES_FILES_ARRAY]);
    if (existingFileIndex === undefined) {
      const classesFiles = datasetObject[CLASSES_FILES_ARRAY];
      classesFiles.push(classesFileObj);
      datasetObject[ACTIVE_CLASSES_FILE] = classesFiles[classesFiles.length - 1];
    } else {
      datasetObject[ACTIVE_CLASSES_FILE] = datasetObject[
        CLASSES_FILES_ARRAY][existingFileIndex];
    }
  }

  function addClassesFile(classesFileObj, error) {
    const { name } = classesFileObj.body.fileMetaData;
    if (!error) {
      addNewClassesFile(name, classesFileObj);
    } else {
      replaceActiveFileIfRemoving(name, CLASSES_FILES_ARRAY,
        ACTIVE_CLASSES_FILE);
      removeFile(name, CLASSES_FILES_ARRAY);
    }
  }

  function addFaltyAnnotationFile(fileName, annotationFileObj) {
    if (getIndexOfFileInArray(fileName, datasetObject[
      FALTY_ANNOTATION_FILES_ARRAY]) === undefined) {
      datasetObject[FALTY_ANNOTATION_FILES_ARRAY].push(annotationFileObj);
    }
  }

  function addValidAnnotationFileWhenOneAllowed(fileName, annotationFileObj) {
    const existingFileIndex = getIndexOfFileInArray(fileName,
      datasetObject[VALID_ANNOTATION_FILES_ARRAY]);
    if (existingFileIndex === undefined) {
      const annotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      annotationFiles.push(annotationFileObj);
      datasetObject[ACTIVE_ANNOTATION_FILE] = annotationFiles[
        annotationFiles.length - 1];
    } else {
      datasetObject[ACTIVE_ANNOTATION_FILE] = datasetObject[
        VALID_ANNOTATION_FILES_ARRAY][existingFileIndex];
    }
  }

  function addValidAnnotationFileWhenMultipleAllowed(fileName, annotationFileObj) {
    const existingFileIndex = getIndexOfFileInArray(fileName,
      datasetObject[VALID_ANNOTATION_FILES_ARRAY]);
    if (existingFileIndex === undefined) {
      const annotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      annotationFiles.push(annotationFileObj);
    }
  }

  function addAnnotationFileWhenOneAllowed(annotationFileObj, error) {
    const { name } = annotationFileObj.body.fileMetaData;
    if (!error) {
      addValidAnnotationFileWhenOneAllowed(name, annotationFileObj);
      removeFile(name, FALTY_ANNOTATION_FILES_ARRAY);
    } else {
      replaceActiveFileIfRemoving(name, VALID_ANNOTATION_FILES_ARRAY,
        ACTIVE_ANNOTATION_FILE);
      removeFile(name, VALID_ANNOTATION_FILES_ARRAY);
      addFaltyAnnotationFile(name, annotationFileObj);
    }
  }

  function addAnnotationFileWhenMultipleAllowed(annotationFileObj, error) {
    const { name } = annotationFileObj.body.fileMetaData;
    if (!error) {
      addValidAnnotationFileWhenMultipleAllowed(name, annotationFileObj);
    } else {
      removeFile(name, VALID_ANNOTATION_FILES_ARRAY);
    }
  }

  function addAnnotationFileWhenMultipleAllowedInclClasses(annotationFileObj, erroObj) {
    const { name } = annotationFileObj.body.fileMetaData;
    if (!erroObj.error) {
      addValidAnnotationFileWhenMultipleAllowed(name, annotationFileObj);
    } else {
      if (!erroObj.parsingError) {
        addFaltyAnnotationFile(name, annotationFileObj);
      }
      removeFile(name, VALID_ANNOTATION_FILES_ARRAY);
    }
  }


  function moveAnnotationFileToFaltyArray(file) {
    const { name } = file.body.fileMetaData;
    removeFile(name, VALID_ANNOTATION_FILES_ARRAY);
    datasetObject[FALTY_ANNOTATION_FILES_ARRAY].push(file);
  }

  function moveAnnotationFileToValidArray(file) {
    const { name } = file.body.fileMetaData;
    removeFile(name, FALTY_ANNOTATION_FILES_ARRAY);
    datasetObject[VALID_ANNOTATION_FILES_ARRAY].push(file);
  }

  function isInImagesList(name) {
    return datasetObject[IMAGE_FILES_OBJECT][name];
  }

  function updateImageFileErrorStatus(name, errorStatus) {
    datasetObject[IMAGE_FILES_OBJECT][name].error = errorStatus;
  }

  function addImageFile(imageFileObj, errorObject) {
    if (!isInImagesList(imageFileObj.body.fileMetaData.name)) {
      // the error property is used to draw shapes on valid images only
      imageFileObj.error = errorObject.error;
      imageFileObj.alreadyUploaded = errorObject.alreadyUploaded;
      datasetObject[IMAGE_FILES_OBJECT][
        imageFileObj.body.fileMetaData.name] = imageFileObj;
    }
  }

  function addFileWhenOneAnnotationFileAllowed(file, errorObject) {
    if (file.fileFormat === IMAGE_FILE_INDICATOR) {
      addImageFile(file, errorObject);
    } else if (file.fileFormat === ANNOTATION_FILE_INDICATOR) {
      addAnnotationFileWhenOneAllowed(file, errorObject.error);
    }
  }

  function addFileWhenMultipleAnnotationFilesAllowed(file, errorObject) {
    if (file.fileFormat === IMAGE_FILE_INDICATOR) {
      addImageFile(file, errorObject);
    } else if (file.fileFormat === ANNOTATION_FILE_INDICATOR) {
      addAnnotationFileWhenMultipleAllowed(file, errorObject.error);
    }
  }

  function addFileWhenMultipleAnnotationsInclClasses(file, errorObject) {
    if (file.fileFormat === IMAGE_FILE_INDICATOR) {
      addImageFile(file, errorObject);
    } else if (file.fileFormat === ANNOTATION_FILE_INDICATOR) {
      addAnnotationFileWhenMultipleAllowedInclClasses(file, errorObject);
    } else if (file.fileFormat === CLASSES_FILE_INDICATOR) {
      addClassesFile(file, errorObject.error);
    }
  }

  function getActiveAnnotationFile() {
    return datasetObject[ACTIVE_ANNOTATION_FILE];
  }

  function getAnnotationFiles() {
    return datasetObject[VALID_ANNOTATION_FILES_ARRAY];
  }

  function getFaltyAnnotationFiles() {
    return datasetObject[FALTY_ANNOTATION_FILES_ARRAY];
  }

  function getImageFiles() {
    return datasetObject[IMAGE_FILES_OBJECT];
  }

  function getDatasetObject() {
    return datasetObject;
  }

  const oneAnnotationFileStrategyObjectManager = {
    removeFile,
    addImageFile,
    getImageFiles,
    getDatasetObject,
    clearDatasetObject,
    getAnnotationFiles,
    getFaltyAnnotationFiles,
    getActiveAnnotationFile,
    updateImageFileErrorStatus,
    replaceActiveFileIfRemoving,
    addFile: addFileWhenOneAnnotationFileAllowed,
    addAnnotationFile: addAnnotationFileWhenOneAllowed,
  };

  const multipleAnnotationFilesStrategyObjectManager = {
    removeFile,
    addImageFile,
    getImageFiles,
    getDatasetObject,
    getAnnotationFiles,
    clearDatasetObject,
    getActiveAnnotationFile,
    getFaltyAnnotationFiles,
    updateImageFileErrorStatus,
    replaceActiveFileIfRemoving,
    addFile: addFileWhenMultipleAnnotationFilesAllowed,
    addAnnotationFile: addAnnotationFileWhenMultipleAllowed,
  };

  const multipleAnnotationFilesInclClassesStrategyObjectManager = {
    removeFile,
    addImageFile,
    getImageFiles,
    getDatasetObject,
    getAnnotationFiles,
    clearDatasetObject,
    getFaltyAnnotationFiles,
    getActiveAnnotationFile,
    updateImageFileErrorStatus,
    replaceActiveFileIfRemoving,
    moveAnnotationFileToFaltyArray,
    moveAnnotationFileToValidArray,
    addFile: addFileWhenMultipleAnnotationsInclClasses,
    addAnnotationFile: addAnnotationFileWhenMultipleAllowedInclClasses,
  };


  function buildObjectManagerForOneAnnotationFileStrategy() {
    return { ...oneAnnotationFileStrategyObjectManager };
  }

  function buildObjectManagerForMultipleAnnotationFilesStrategy() {
    return { ...multipleAnnotationFilesStrategyObjectManager };
  }

  function buildObjectManagerForMultipleAnnotationFilesInclClassesStrategy() {
    return { ...multipleAnnotationFilesInclClassesStrategyObjectManager };
  }

  const DatasetObjectManagerBuilder = {
    buildObjectManagerForOneAnnotationFileStrategy,
    buildObjectManagerForMultipleAnnotationFilesStrategy,
    buildObjectManagerForMultipleAnnotationFilesInclClassesStrategy,
  };

  const datasetObjectManager$4 = DatasetObjectManagerBuilder
    .buildObjectManagerForOneAnnotationFileStrategy();

  function checkNumberOrStringTypeByFormat(subjectVariable, format) {
    switch (format) {
      case XML_POSTFIX:
        return typeof subjectVariable['#text'] === 'string' || !Number.isNaN(parseInt(subjectVariable['#text'], 10));
      default:
        return typeof subjectVariable === 'string' || typeof subjectVariable === 'number';
    }
  }

  function checkStringTypeByFormat(subjectVariable, format) {
    switch (format) {
      case XML_POSTFIX:
        return typeof subjectVariable['#text'] === 'string';
      default:
        return typeof subjectVariable === 'string';
    }
  }

  function checkNumberTypeByFormat(subjectVariable, format) {
    switch (format) {
      case CSV_POSTFIX:
        return !Number.isNaN(Number.parseInt(subjectVariable, 10)) && typeof Number.parseInt(subjectVariable, 10) === 'number';
      case TXT_POSTFIX:
        return !Number.isNaN(subjectVariable) && typeof subjectVariable === 'number';
      case XML_POSTFIX:
        return !Number.isNaN(parseInt(subjectVariable['#text'], 10));
      default:
        return typeof subjectVariable === 'number';
    }
  }

  // important - does not check for length
  function assertObjectType(expectedType, subjectVariable, format) {
    switch (expectedType) {
      case 'number':
        return checkNumberTypeByFormat(subjectVariable, format);
      case 'string':
        return checkStringTypeByFormat(subjectVariable, format);
      case 'number|string':
        return checkNumberOrStringTypeByFormat(subjectVariable, format);
      case 'object':
        return typeof subjectVariable === 'object';
      case 'array':
        return Array.isArray(subjectVariable);
      case 'array:number':
        return Array.isArray(subjectVariable) && subjectVariable.filter(entry => typeof entry !== 'number').length === 0;
      case 'array:object':
        return Array.isArray(subjectVariable) && subjectVariable.filter(entry => typeof entry !== 'object').length === 0;
      default:
        return true;
    }
  }

  function checkArrayElements(array, name, format, {
    elementsType, length, maxLength, minLength, evenOdd,
  }) {
    if (length && array.length !== length) {
      return { error: true, message: `${name} array must contain ${length} elements but instead found ${array.length}` };
    }
    if (maxLength && array.length > maxLength) {
      return { error: true, message: `${name} array must contain ${maxLength} elements at most but instead found ${array.length}` };
    }
    if (minLength && array.length < minLength) {
      return { error: true, message: `${name} array must contain at least ${minLength} elements but instead found ${array.length}` };
    }
    if (evenOdd && ((evenOdd === 'even' && array.length % 2 === 1) || (evenOdd === 'odd' && array.length % 2 === 0))) {
      return { error: true, message: `${name} array must contain an even number of elements but instead found ${array.length}` };
    }
    if (elementsType && !assertObjectType(elementsType, array, format)) {
      return { error: true, message: `${name} array contains elements of incorrect type` };
    }
    return { error: false, message: '' };
  }

  function checkObjectProperties(requiredProperties, subjectObject, format, entitiesType) {
    const undefinedProperties = [];
    Object.keys(requiredProperties).forEach((property) => {
      if (subjectObject[property] === undefined) {
        undefinedProperties.push(property);
      }
    });
    if (undefinedProperties.length > 0) {
      return { error: true, message: `The following ${entitiesType} have not been found: ${undefinedProperties.join(', ')}` };
    }
    const nullProperties = [];
    Object.keys(requiredProperties).forEach((property) => {
      if (subjectObject[property] === null) {
        nullProperties.push(property);
      }
    });
    if (nullProperties.length > 0) {
      return { error: true, message: `The following ${entitiesType} are null: ${nullProperties}` };
    }
    const incorrectTypeProperties = [];
    Object.keys(requiredProperties).forEach((property) => {
      if (!assertObjectType(requiredProperties[property], subjectObject[property], format)) {
        incorrectTypeProperties.push(property);
      }
    });
    if (incorrectTypeProperties.length > 0) {
      return { error: true, message: `The following ${entitiesType} contain an incorrect type: ${incorrectTypeProperties}` };
    }
    return { error: false, message: '' };
  }

  function checkAnnotationsMapToCategories(parsedObj) {
    const { annotations, categories } = parsedObj;
    for (let i = 0; i < annotations.length; i += 1) {
      const annotation = annotations[i];
      let categoryIdValid = false;
      for (let y = 0; y < categories.length; y += 1) {
        const category = categories[y];
        if (annotation.category_id === category.id) {
          categoryIdValid = true;
          break;
        }
      }
      if (!categoryIdValid) {
        return { error: true, message: `The following category_id has not been found: ${annotation.category_id} -> in categories` };
      }
    }
    return { error: false, message: '' };
  }

  function checkAnnotationsMapToImages(parsedObj) {
    const { annotations, images } = parsedObj;
    for (let i = 0; i < annotations.length; i += 1) {
      const annotation = annotations[i];
      let imageIdValid = false;
      for (let y = 0; y < images.length; y += 1) {
        const image = images[y];
        if (annotation.image_id === image.id) {
          imageIdValid = true;
          break;
        }
      }
      if (!imageIdValid) {
        return { error: true, message: `The following image_id has not been found: ${annotation.image_id} -> in annotations` };
      }
    }
    return { error: false, message: '' };
  }

  function checkImagesProperty(parsedObj) {
    const requiredProperties = { id: 'number|string', file_name: 'string' };
    const { images } = parsedObj;
    for (let i = 0; i < images.length; i += 1) {
      const result = checkObjectProperties(requiredProperties, images[i],
        JSON_POSTFIX, PROPERTIES_STRING);
      if (result.error) {
        result.message += ' -> in images';
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function checkSegmentationArray(segmentationArray) {
    const arrayName = 'Segmentation';
    const elementsType = 'array:number';
    if (segmentationArray.length > 1) {
      const result = checkArrayElements(segmentationArray, arrayName,
        JSON_POSTFIX, { elementsType, length: 8 });
      if (result.error) { return result; }
    } else if (segmentationArray.length === 1) {
      const polygonCoordinatesArray = segmentationArray[0];
      let result = {};
      result = checkArrayElements(polygonCoordinatesArray, arrayName,
        JSON_POSTFIX, { elementsType: 'array' });
      if (result.error) { return result; }
      result = checkArrayElements(polygonCoordinatesArray, arrayName,
        JSON_POSTFIX, { elementsType, minLength: 6, evenOdd: 'even' });
      if (result.error) { return result; }
    }
    if (segmentationArray.length < 1) {
      return { error: true, message: `${arrayName} array is empty` };
    }
    return { error: false, message: '' };
  }

  function checkAnnotationsProperty(parsedObj) {
    const requiredProperties = {
      id: 'number|string', image_id: 'number|string', category_id: 'number|string', segmentation: 'array', bbox: 'array:number',
    };
    const { annotations } = parsedObj;
    for (let i = 0; i < annotations.length; i += 1) {
      const annotation = annotations[i];
      let result = checkObjectProperties(requiredProperties, annotation,
        JSON_POSTFIX, PROPERTIES_STRING);
      if (result.error) {
        result.message += ' -> in annotations';
        return result;
      }
      result = checkSegmentationArray(annotation.segmentation);
      if (result.error) {
        result.message += ' -> in annotations';
        return result;
      }
      result = checkArrayElements(annotation.bbox, 'bbox', JSON_POSTFIX, { length: 4 });
      if (result.error) {
        result.message += ' -> in annotations';
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function checkCategoriesProperty(parsedObj) {
    const requiredProperties = { id: 'number|string', name: 'number|string' };
    const { categories } = parsedObj;
    for (let i = 0; i < categories.length; i += 1) {
      const result = checkObjectProperties(requiredProperties, categories[i],
        JSON_POSTFIX, PROPERTIES_STRING);
      if (result.error) {
        result.message += ' -> in categories';
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function checkParentProperties$1(parsedObj) {
    const requiredProperties = { images: 'array:object', annotations: 'array:object', categories: 'array:object' };
    let result = {};
    result = checkObjectProperties(requiredProperties, parsedObj,
      JSON_POSTFIX, PROPERTIES_STRING);
    if (result.error) { return result; }
    result = checkArrayElements(parsedObj.images, 'images', JSON_POSTFIX, { minLength: 1 });
    if (result.error) { return result; }
    result = checkArrayElements(parsedObj.annotations, 'annotations', JSON_POSTFIX, { minLength: 1 });
    if (result.error) { return result; }
    result = checkArrayElements(parsedObj.categories, 'categories', JSON_POSTFIX, { minLength: 1 });
    if (result.error) { return result; }
    return { error: false, message: '' };
  }

  function checkObject$4(JSONObject, validators) {
    for (let i = 0; i < validators.length; i += 1) {
      const result = validators[i](JSONObject.annotationData);
      if (result.error) {
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function setCurrentAnnotationFilesToInactive$3(annotationFiles) {
    annotationFiles.forEach((annotationFile) => {
      annotationFile.active = false;
    });
  }

  function isImageAlreadyUploaded$4(newImageName) {
    const images = getAllImageData();
    for (let i = 0; i < images.length; i += 1) {
      if (newImageName === images[i].name) {
        return true;
      }
    }
    return false;
  }

  function validateImageFile$4(parsedObj, validAnnotationFiles, activeAnnotationFile) {
    const imageName = parsedObj.body.fileMetaData.name;
    const alreadyUploaded = getReuseAlreadyUploadedImagesState()
      ? isImageAlreadyUploaded$4(imageName) : false;
    if (validAnnotationFiles.length > 0) {
      const { annotationData } = activeAnnotationFile.body;
      for (let i = 0; i < annotationData.images.length; i += 1) {
        if (imageName === annotationData.images[i].file_name) {
          return {
            error: false, message: '', alreadyUploaded, valid: true,
          };
        }
      }
      return { error: true, message: 'This image is not specified in the annotations file(s)', alreadyUploaded };
    }
    return { error: false, message: '', alreadyUploaded };
  }

  function validateAnnotationsFile$5(parsedObj, validAnnotationFiles) {
    const validators = [
      checkParentProperties$1,
      checkCategoriesProperty,
      checkAnnotationsProperty,
      checkImagesProperty,
      checkAnnotationsMapToImages,
      checkAnnotationsMapToCategories,
    ];
    const validationResult = checkObject$4(parsedObj.body, validators);
    if (!validationResult.error) {
      setCurrentAnnotationFilesToInactive$3(validAnnotationFiles);
      parsedObj.active = true;
    }
    return validationResult;
  }

  function validateCOCOJSONFormat(parsedObj, errorObj) {
    if (!errorObj) {
      const datasetObject = datasetObjectManager$4.getDatasetObject();
      const activeAnnotationFile = datasetObject[ACTIVE_ANNOTATION_FILE];
      const validAnnotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
        return validateAnnotationsFile$5(parsedObj, validAnnotationFiles);
      }
      if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
        return validateImageFile$4(parsedObj, validAnnotationFiles, activeAnnotationFile);
      }
    }
    if (getReuseAlreadyUploadedImagesState()
      && parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      const imageName = parsedObj.body.fileMetaData.name;
      if (isImageAlreadyUploaded$4(imageName)) {
        return { error: false, message: '', alreadyUploaded: true };
      }
    }
    return errorObj;
  }

  const tableUpdater$4 = TableUpdaterGenericBuilder
    .buildTableUpdaterForOneAnnotationFileStrategy(datasetObjectManager$4, validateCOCOJSONFormat);

  const datasetObjectManager$3 = DatasetObjectManagerBuilder
    .buildObjectManagerForOneAnnotationFileStrategy();

  function setCurrentAnnotationFilesToInactive$2(annotationFiles) {
    annotationFiles.forEach((annotationFile) => {
      annotationFile.active = false;
    });
  }

  function isImageAlreadyUploaded$3(newImageName) {
    const images = getAllImageData();
    for (let i = 0; i < images.length; i += 1) {
      if (newImageName === images[i].name) {
        return true;
      }
    }
    return false;
  }

  function validateImageFile$3(parsedObj, validAnnotationFiles, activeAnnotationFile) {
    const imageName = parsedObj.body.fileMetaData.name;
    const alreadyUploaded = getReuseAlreadyUploadedImagesState()
      ? isImageAlreadyUploaded$3(imageName) : false;
    if (validAnnotationFiles.length > 0) {
      const { annotationData } = activeAnnotationFile.body;
      const annotationDataKeys = Object.keys(annotationData);
      for (let i = 0; i < annotationDataKeys.length; i += 1) {
        const { filename } = annotationData[annotationDataKeys[i]];
        if (imageName === filename) {
          return {
            error: false, message: '', alreadyUploaded, valid: true,
          };
        }
      }
      return { error: true, message: 'This image is not specified in the annotations file(s)', alreadyUploaded };
    }
    return { error: false, message: '', alreadyUploaded };
  }

  function checkObjectHasProperties(object, objectName) {
    if (Object.keys(object).length > 0) {
      return { error: false, message: '' };
    }
    return { error: true, message: `The ${objectName} object does not contain any properties` };
  }

  function checkRegionAttributesProperty(parsedObj) {
    const objectKeyNames = Object.keys(parsedObj);
    for (let i = 0; i < objectKeyNames.length; i += 1) {
      const { regions } = parsedObj[objectKeyNames[i]];
      for (let y = 0; y < regions.length; y += 1) {
        const requiredProperties = { name: 'number|string' };
        const result = checkObjectProperties(requiredProperties, regions[y].region_attributes,
          JSON_POSTFIX, PROPERTIES_STRING);
        if (result.error) {
          result.message += ' -> in region_attributes';
          return result;
        }
      }
    }
    return { error: false, message: '' };
  }

  function checkShapeAttributesPolygonProperty(region) {
    const elementsType = 'array:number';
    const requiredProperties = {
      all_points_x: elementsType, all_points_y: elementsType,
    };
    let result = checkObjectProperties(requiredProperties, region.shape_attributes,
      JSON_POSTFIX, PROPERTIES_STRING);
    if (result.error) { return result; }
    if (region.shape_attributes.all_points_x.length
        !== region.shape_attributes.all_points_y.length) {
      return { error: true, message: 'all_points_x and all_points_y arrays must have equal size' };
    }
    result = checkArrayElements(region.shape_attributes.all_points_x, 'all_points_x', JSON_POSTFIX,
      { elementsType, minLength: 3 });
    if (result.error) { return result; }
    result = checkArrayElements(region.shape_attributes.all_points_y, 'all_points_y', JSON_POSTFIX,
      { elementsType, minLength: 3 });
    if (result.error) { return result; }
    return { error: false, message: '' };
  }

  function checkShapeAttributesRectProperty(region) {
    const requiredProperties = {
      x: 'number', y: 'number', width: 'number', height: 'number',
    };
    const result = checkObjectProperties(requiredProperties, region.shape_attributes,
      JSON_POSTFIX, PROPERTIES_STRING);
    if (result.error) { return result; }
    return { error: false, message: '' };
  }

  function checkShapeAttributesProperty(parsedObj) {
    const objectKeyNames = Object.keys(parsedObj);
    for (let i = 0; i < objectKeyNames.length; i += 1) {
      const { regions } = parsedObj[objectKeyNames[i]];
      for (let y = 0; y < regions.length; y += 1) {
        const region = regions[y];
        const requiredProperties = { name: 'string' };
        let result = checkObjectProperties(requiredProperties, region.shape_attributes,
          JSON_POSTFIX, PROPERTIES_STRING);
        if (result.error) {
          result.message += ' -> in shape_attributes';
          return result;
        }
        if (region.shape_attributes.name === 'rect') {
          result = checkShapeAttributesRectProperty(region);
          if (result.error) {
            result.message += ' -> in shape_attributes';
            return result;
          }
        } else if (region.shape_attributes.name === 'polygon') {
          result = checkShapeAttributesPolygonProperty(region);
          if (result.error) {
            result.message += ' -> in shape_attributes';
            return result;
          }
        } else {
          return { error: true, message: `The following shape type is not supported: ${region.shape_attributes.name} -> in shape_attributes` };
        }
      }
    }
    return { error: false, message: '' };
  }

  function checkRegionsProperty(parsedObj) {
    const requiredProperties = { shape_attributes: 'object', region_attributes: 'object' };
    const objectKeyNames = Object.keys(parsedObj);
    for (let i = 0; i < objectKeyNames.length; i += 1) {
      const { regions } = parsedObj[objectKeyNames[i]];
      for (let y = 0; y < regions.length; y += 1) {
        const result = checkObjectProperties(requiredProperties, regions[y],
          JSON_POSTFIX, PROPERTIES_STRING);
        if (result.error) {
          result.message += ' -> in regions';
          return result;
        }
      }
    }
    return { error: false, message: '' };
  }

  function checkAnnotationObjectsProperties(parsedObj) {
    const requiredProperties = { filename: 'string', regions: 'array:object' };
    const objectKeyNames = Object.keys(parsedObj);
    for (let i = 0; i < objectKeyNames.length; i += 1) {
      const result = checkObjectProperties(requiredProperties, parsedObj[objectKeyNames[i]],
        JSON_POSTFIX, PROPERTIES_STRING);
      if (result.error) {
        result.message += ' -> in annotation object';
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function checkParentProperties(parsedObj) {
    return checkObjectHasProperties(parsedObj, 'parent');
  }

  function checkObject$3(JSONObject, validators) {
    for (let i = 0; i < validators.length; i += 1) {
      const result = validators[i](JSONObject.annotationData);
      if (result.error) {
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function validateAnnotationsFile$4(parsedObj, validAnnotationFiles) {
    const validators = [
      checkParentProperties,
      checkAnnotationObjectsProperties,
      checkRegionsProperty,
      checkShapeAttributesProperty,
      checkRegionAttributesProperty,
    ];
    const validationResult = checkObject$3(parsedObj.body, validators);
    if (!validationResult.error) {
      setCurrentAnnotationFilesToInactive$2(validAnnotationFiles);
      parsedObj.active = true;
    }
    return validationResult;
  }

  function validateVGGJSONFormat(parsedObj, errorObj) {
    if (!errorObj) {
      const datasetObject = datasetObjectManager$3.getDatasetObject();
      const activeAnnotationFile = datasetObject[ACTIVE_ANNOTATION_FILE];
      const validAnnotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
        return validateAnnotationsFile$4(parsedObj, validAnnotationFiles);
      }
      if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
        return validateImageFile$3(parsedObj, validAnnotationFiles, activeAnnotationFile);
      }
    }
    if (getReuseAlreadyUploadedImagesState()
      && parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      const imageName = parsedObj.body.fileMetaData.name;
      if (isImageAlreadyUploaded$3(imageName)) {
        return { error: false, message: '', alreadyUploaded: true };
      }
    }
    return errorObj;
  }

  const tableUpdater$3 = TableUpdaterGenericBuilder
    .buildTableUpdaterForOneAnnotationFileStrategy(datasetObjectManager$3, validateVGGJSONFormat);

  const datasetObjectManager$2 = DatasetObjectManagerBuilder
    .buildObjectManagerForMultipleAnnotationFilesStrategy();

  function setCurrentAnnotationFilesToInactive$1(annotationFiles) {
    annotationFiles.forEach((annotationFile) => {
      annotationFile.active = false;
    });
  }

  function isImageAlreadyUploaded$2(newImageName) {
    const images = getAllImageData();
    for (let i = 0; i < images.length; i += 1) {
      if (newImageName === images[i].name) {
        return true;
      }
    }
    return false;
  }

  function validateImageFile$2(parsedObj, validAnnotationFiles) {
    const imageName = parsedObj.body.fileMetaData.name;
    const parsedImageName = imageName.substring(0, imageName.indexOf('.'));
    const alreadyUploaded = getReuseAlreadyUploadedImagesState()
      ? isImageAlreadyUploaded$2(imageName) : false;
    if (validAnnotationFiles.length > 0) {
      for (let i = 0; i < validAnnotationFiles.length; i += 1) {
        const annotationName = validAnnotationFiles[i].body.fileMetaData.name;
        const parsedAnnotationName = annotationName.substring(0, annotationName.indexOf('.xml'));
        if (parsedImageName === parsedAnnotationName) {
          return {
            error: false, message: '', alreadyUploaded, valid: true,
          };
        }
      }
      return { error: true, message: 'This image is not specified in any of the valid annotations file(s)', alreadyUploaded };
    }
    return { error: false, message: '', alreadyUploaded };
  }

  function checkbndBoxTag(object) {
    const requiredProperties = {
      xmin: 'number', ymin: 'number', xmax: 'number', ymax: 'number',
    };
    const result = checkObjectProperties(requiredProperties, object,
      XML_POSTFIX, TAGS_STRING);
    if (result.error) { return result; }
    return { error: false, message: '' };
  }

  function checkObjectTagChildTags(parsedObj) {
    const requiredProperties = { name: 'number|string', bndbox: 'object' };
    const objectTag = parsedObj.annotation.object;
    if (Array.isArray(objectTag)) {
      for (let i = 0; i < objectTag.length; i += 1) {
        const object = objectTag[i];
        let result = checkObjectProperties(requiredProperties, object,
          XML_POSTFIX, TAGS_STRING);
        if (result.error) { return result; }
        result = checkbndBoxTag(object.bndbox);
        if (result.error) { return result; }
      }
    } else {
      let result = checkObjectProperties(requiredProperties, objectTag,
        XML_POSTFIX, TAGS_STRING);
      if (result.error) { return result; }
      result = checkbndBoxTag(objectTag.bndbox);
      if (result.error) { return result; }
    }
    return { error: false, message: '' };
  }

  function checkObjectTag(parsedObj) {
    const requiredProperties = { object: 'object|array' };
    return checkObjectProperties(requiredProperties, parsedObj.annotation,
      XML_POSTFIX, TAGS_STRING);
  }

  function checkParentTag(parsedObj) {
    const requiredProperties = { annotation: 'object' };
    return checkObjectProperties(requiredProperties, parsedObj,
      XML_POSTFIX, TAGS_STRING);
  }

  function checkObject$2(object, validators) {
    for (let i = 0; i < validators.length; i += 1) {
      const result = validators[i](object.annotationData);
      if (result.error) {
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function validateAnnotationsFile$3(parsedObj, validAnnotationFiles) {
    const validators = [
      checkParentTag,
      checkObjectTag,
      checkObjectTagChildTags,
    ];
    const validationResult = checkObject$2(parsedObj.body, validators);
    if (!validationResult.error) {
      setCurrentAnnotationFilesToInactive$1(validAnnotationFiles);
      parsedObj.active = true;
    }
    return validationResult;
  }

  function validateVOCXMLFormat(parsedObj, errorObj) {
    if (!errorObj) {
      const datasetObject = datasetObjectManager$2.getDatasetObject();
      const validAnnotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
        return validateAnnotationsFile$3(parsedObj, validAnnotationFiles);
      }
      if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
        return validateImageFile$2(parsedObj, validAnnotationFiles);
      }
    }
    if (getReuseAlreadyUploadedImagesState()
      && parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      const imageName = parsedObj.body.fileMetaData.name;
      if (isImageAlreadyUploaded$2(imageName)) {
        return { error: false, message: '', alreadyUploaded: true };
      }
    }
    return errorObj;
  }

  const tableUpdater$2 = TableUpdaterGenericBuilder
    .buildTableUpdaterForMultipleAnnotationFilesStrategy(datasetObjectManager$2, validateVOCXMLFormat);

  function validateExistingImages$2(datasetObject, validateFileFunc, updateImageFileErrorStatusFunc) {
    if (datasetObject[VALID_ANNOTATION_FILES_ARRAY].length > 0) {
      let foundValid = false;
      Object.keys(datasetObject[IMAGE_FILES_OBJECT]).forEach((key) => {
        const imageFile = datasetObject[IMAGE_FILES_OBJECT][key];
        const validationResult = validateFileFunc(imageFile);
        if (!validationResult.error) { foundValid = true; }
        const { name } = imageFile.body.fileMetaData;
        insertRowToImagesTable(name, validationResult);
        updateImageFileErrorStatusFunc(name, validationResult.error);
      });
      if (foundValid) {
        enableFinishButton();
      } else {
        disableFinishButton();
      }
    } else {
      changeAllImagesTableRowsToDefault();
      disableFinishButton();
    }
  }

  function validateAnnotationsFiles(annotationsArray, filesToBeMovedArray,
    moveWhenFalty, validateFileFunc) {
    let foundValid = false;
    annotationsArray.forEach((annotationFile) => {
      const validationResult = validateFileFunc(annotationFile);
      const { name } = annotationFile.body.fileMetaData;
      insertRowToAnnotationsTable(name, validationResult);
      if (!validationResult.error) {
        foundValid = true;
        if (!moveWhenFalty) { filesToBeMovedArray.push(annotationFile); }
      } else if (moveWhenFalty) {
        filesToBeMovedArray.push(annotationFile);
      }
    });
    return foundValid;
  }

  function validateExistingAnnotations$1(datasetObject, validateFileFunc,
    moveAnnotationFileToValidArrayFunc, moveAnnotationFileToFaltyArrayFunc) {
    const filesToBeMovedToFaltyArray = [];
    const filesToBeMovedToValidArray = [];
    const foundValidInValidArray = validateAnnotationsFiles(
      datasetObject[VALID_ANNOTATION_FILES_ARRAY], filesToBeMovedToFaltyArray,
      true, validateFileFunc,
    );
    const foundValidInFaltyArray = validateAnnotationsFiles(
      datasetObject[FALTY_ANNOTATION_FILES_ARRAY], filesToBeMovedToValidArray,
      false, validateFileFunc,
    );
    filesToBeMovedToFaltyArray.forEach((annotationFile) => {
      moveAnnotationFileToFaltyArrayFunc(annotationFile);
    });
    filesToBeMovedToValidArray.forEach((annotationFile) => {
      moveAnnotationFileToValidArrayFunc(annotationFile);
    });
    if (foundValidInValidArray || foundValidInFaltyArray) {
      enableFinishButton();
    } else {
      disableFinishButton();
    }
  }

  function validateExistingClassesFiles(classesFiles, validateFileFunc) {
    classesFiles.forEach((classesFile) => {
      const validationResult = validateFileFunc(classesFile);
      const { name } = classesFile.body.fileMetaData;
      if (!validationResult.error) {
        validationResult.error = true;
        validationResult.message = ONE_CLASSES_FILE_ALLOWED_ERROR_MESSAGE;
      }
      insertRowToClassesTable(name, validationResult);
    });
  }

  function removeFileFromAnnotations(fileName, removeFileFunc) {
    if (removeRow(fileName, ANNOTATIONS_TABLE_INDICATOR)) {
      removeFileFunc(fileName, VALID_ANNOTATION_FILES_ARRAY);
      removeFileFunc(fileName, FALTY_ANNOTATION_FILES_ARRAY);
    }
  }

  function validateAllFiles(validationResult, datasetObject, fileName,
    validateFileFunc, updateImageFileErrorStatusFunc, moveAnnotationFileToValidArrayFunc,
    moveAnnotationFileToFaltyArrayFunc, removeFileFunc) {
    const classFiles = datasetObject[CLASSES_FILES_ARRAY];
    // the general expectation is that class files would not have errors (no validation)
    if (!validationResult.error) {
      removeFileFromAnnotations(fileName, removeFileFunc);
      validateExistingClassesFiles(classFiles, validateFileFunc);
      validateExistingAnnotations$1(datasetObject, validateFileFunc,
        moveAnnotationFileToValidArrayFunc, moveAnnotationFileToFaltyArrayFunc);
      validateExistingImages$2(datasetObject, validateFileFunc, updateImageFileErrorStatusFunc);
    }
    return validationResult;
  }

  function removeFileFromClasses(fileName, removeFileHandlerFunc) {
    if (removeRow(fileName, CLASSES_TABLE_INDICATOR)) {
      removeFileHandlerFunc(fileName, CLASSES_FILE_INDICATOR);
      return true;
    }
    return false;
  }

  function updateTables(parsedObj, validationResult) {
    const datasetObject = this.datasetObjectManager.getDatasetObject();
    const fileName = parsedObj.body.fileMetaData.name;
    if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      insertRowToImagesTable(fileName, validationResult);
      if (validationResult.valid) { enableFinishButton(); }
    } else if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
      if (!removeFileFromClasses(fileName, this.removeFileHandler)) {
        validateExistingImages$2(datasetObject, this.validateFormat,
          this.datasetObjectManager.updateImageFileErrorStatus);
        insertRowToAnnotationsTable(fileName, validationResult);
      }
    } else if (parsedObj.fileFormat === CLASSES_FILE_INDICATOR) {
      const newValidationResult = validateAllFiles(
        validationResult, datasetObject, fileName,
        this.validateFormat,
        this.datasetObjectManager.updateImageFileErrorStatus,
        this.datasetObjectManager.moveAnnotationFileToValidArray,
        this.datasetObjectManager.moveAnnotationFileToFaltyArray,
        this.datasetObjectManager.removeFile,
      );
      // whilst the validateExistingClassesFiles inserts the new class into the table,
      // this overwrites without the error of more than 1 class
      insertRowToClassesTable(fileName, newValidationResult);
    }
  }

  function buildTableUpdaterInclClassesTable(datasetObjectManager,
    validateFormat, removeFileHandler) {
    return updateTables.bind({ datasetObjectManager, validateFormat, removeFileHandler });
  }

  const TableUpdaterInclClassesBuilder = {
    buildTableUpdaterInclClassesTable,
  };

  const datasetObjectManager$1 = DatasetObjectManagerBuilder
    .buildObjectManagerForMultipleAnnotationFilesInclClassesStrategy();

  function isImageAlreadyUploaded$1(newImageName) {
    const images = getAllImageData();
    for (let i = 0; i < images.length; i += 1) {
      if (newImageName === images[i].name) {
        return true;
      }
    }
    return false;
  }

  function validateImageFile$1(parsedObj, validAnnotationFiles) {
    const imageName = parsedObj.body.fileMetaData.name;
    const parsedImageName = imageName.substring(0, imageName.indexOf('.'));
    const alreadyUploaded = getReuseAlreadyUploadedImagesState()
      ? isImageAlreadyUploaded$1(imageName) : false;
    if (validAnnotationFiles.length > 0) {
      for (let i = 0; i < validAnnotationFiles.length; i += 1) {
        const annotationName = validAnnotationFiles[i].body.fileMetaData.name;
        const parsedAnnotationName = annotationName.substring(0, annotationName.indexOf('.txt'));
        if (parsedImageName === parsedAnnotationName) {
          return {
            error: false, message: '', alreadyUploaded, valid: true,
          };
        }
      }
      return { error: true, message: 'This image is not specified in any of the valid annotations file(s)', alreadyUploaded };
    }
    return { error: false, message: '', alreadyUploaded };
  }

  function checkObject$1(object, validators) {
    for (let i = 0; i < validators.length; i += 1) {
      const result = validators[i](object.annotationData);
      if (result.error) {
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function checkAllRows$1(rows) {
    for (let i = 0; i < rows.length; i += 1) {
      const attributes = rows[i];
      const annotationFields = {};
      annotationFields['class (1)'] = attributes[0];
      annotationFields['x (2)'] = attributes[1];
      annotationFields['y (3)'] = attributes[2];
      annotationFields['width (4)'] = attributes[3];
      annotationFields['height (5)'] = attributes[4];
      const requiredProperties = {
        'class (1)': 'number', 'x (2)': 'number', 'y (3)': 'number', 'width (4)': 'number', 'height (5)': 'number',
      };
      const result = checkObjectProperties(requiredProperties, annotationFields,
        TXT_POSTFIX, ATTRIBUTES_STRING);
      if (result.error) {
        result.message += ` -> on row ${i + 1}`;
        return result;
      }
    }
    return { error: false, message: '' };
  }

  // check if setCurrentAnnotationFilesToInactive is actually doing something for other formats
  // as the active property may not be used

  function validateAnnotationsAgainstActiveClassesFile(parsedObj, activeClassesFile) {
    const { annotationData } = parsedObj.body;
    const numberOfClasses = activeClassesFile.body.annotationData.length;
    for (let i = 0; i < annotationData.length; i += 1) {
      if (Math.abs(annotationData[i][0]) > numberOfClasses - 1) {
        return { error: true, message: `This file contains a class number of ${annotationData[i][0]}, however the classes file only contains ${numberOfClasses} class(es) with the first reference starting from 0` };
      }
    }
    return { error: false, message: '', valid: true };
  }

  function validateAnnotationsFile$2(parsedObj, activeClassesFile) {
    const validators = [
      checkAllRows$1,
    ];
    const validationResult = checkObject$1(parsedObj.body, validators);
    if (!validationResult.error && activeClassesFile) {
      return validateAnnotationsAgainstActiveClassesFile(parsedObj, activeClassesFile);
    }
    return validationResult;
  }

  function validateYOLOTXTFormat(parsedObj, errorObj) {
    if (!errorObj) {
      const datasetObject = datasetObjectManager$1.getDatasetObject();
      const activeClassesFile = datasetObject[ACTIVE_CLASSES_FILE];
      const validAnnotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
        return validateAnnotationsFile$2(parsedObj, activeClassesFile);
      }
      if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
        return validateImageFile$1(parsedObj, validAnnotationFiles);
      }
      // do not need any validation for a classes file
      if (parsedObj.fileFormat === CLASSES_FILE_INDICATOR) {
        return { error: false, message: '' };
      }
    }
    if (getReuseAlreadyUploadedImagesState()
      && parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      const imageName = parsedObj.body.fileMetaData.name;
      if (isImageAlreadyUploaded$1(imageName)) {
        return { error: false, message: '', alreadyUploaded: true };
      }
    }
    return errorObj;
  }

  function validateExistingImages$1(datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc) {
    if (datasetObject[VALID_ANNOTATION_FILES_ARRAY].length > 0) {
      let foundValid = false;
      Object.keys(datasetObject[IMAGE_FILES_OBJECT]).forEach((key) => {
        const imageFile = datasetObject[IMAGE_FILES_OBJECT][key];
        const validationResult = validateFormatFunc(imageFile);
        if (!validationResult.error) { foundValid = true; }
        const { name } = imageFile.body.fileMetaData;
        insertRowToImagesTable(name, validationResult);
        updateImageFileErrorStatusFunc(name, validationResult.error);
      });
      if (!foundValid) {
        disableFinishButton();
      }
    } else {
      changeAllImagesTableRowsToDefault();
      disableFinishButton();
    }
  }

  function validateAnnotationsFile$1(annotationsArray, filesToBeMovedArray, moveWhenFalty,
    validateFormatFunc) {
    let foundValid = false;
    annotationsArray.forEach((annotationsFile) => {
      const validationResult = validateFormatFunc(annotationsFile);
      const { name } = annotationsFile.body.fileMetaData;
      insertRowToAnnotationsTable(name, validationResult);
      if (!validationResult.error) {
        foundValid = true;
        if (!moveWhenFalty) { filesToBeMovedArray.push(annotationsFile); }
      } else if (moveWhenFalty) {
        filesToBeMovedArray.push(annotationsFile);
      }
    });
    return foundValid;
  }

  function validateExistingAnnotations(datasetObject, moveAnnotationFileToValidArrayFunc,
    moveAnnotationFileToFaltyArrayFunc, validateFormatFunc) {
    const filesToBeMovedToFaltyArray = [];
    const filesToBeMovedToValidArray = [];
    const foundValidInValidArray = validateAnnotationsFile$1(
      datasetObject[VALID_ANNOTATION_FILES_ARRAY], filesToBeMovedToFaltyArray,
      true, validateFormatFunc,
    );
    const foundValidInFaltyArray = validateAnnotationsFile$1(
      datasetObject[FALTY_ANNOTATION_FILES_ARRAY], filesToBeMovedToValidArray,
      false, validateFormatFunc,
    );
    filesToBeMovedToFaltyArray.forEach((annotationFile) => {
      moveAnnotationFileToFaltyArrayFunc(annotationFile);
    });
    filesToBeMovedToValidArray.forEach((annotationFile) => {
      moveAnnotationFileToValidArrayFunc(annotationFile);
    });
    if ((!foundValidInValidArray && !foundValidInFaltyArray)
      || !datasetObject[ACTIVE_CLASSES_FILE]) {
      disableFinishButton();
    } else {
      enableFinishButton();
    }
  }

  function setNewActiveClassesFileRow(activeClassesFile, datasetObject,
    updateImageFileErrorStatusFunc, validateFormatFunc, moveAnnotationFileToValidArrayFunc,
    moveAnnotationFileToFaltyArrayFunc) {
    changeClassesRowToDefault(activeClassesFile.body.fileMetaData.name);
    activeClassesFile.newlyActive = false;
    validateExistingAnnotations(datasetObject, moveAnnotationFileToValidArrayFunc,
      moveAnnotationFileToFaltyArrayFunc, validateFormatFunc);
    validateExistingImages$1(datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc);
  }

  function removeFileHandlerWthClasses(fileName, tableName, errorMessage) {
    const datasetObject = this.datasetObjectManager.getDatasetObject();
    if (tableName === ANNOTATIONS_TABLE_INDICATOR) {
      this.datasetObjectManager.removeFile(fileName,
        VALID_ANNOTATION_FILES_ARRAY);
      this.datasetObjectManager.removeFile(fileName,
        FALTY_ANNOTATION_FILES_ARRAY);
      if (!errorMessage) {
        if (datasetObject[VALID_ANNOTATION_FILES_ARRAY].length === 0) {
          disableFinishButton();
          changeAllImagesTableRowsToDefault();
        } else {
          validateExistingImages$1(datasetObject,
            this.datasetObjectManager.updateImageFileErrorStatus,
            this.validateFormat);
        }
      }
    } else if (tableName === IMAGES_TABLE_INDICATOR) {
      this.datasetObjectManager.removeFile(fileName, IMAGE_FILES_OBJECT);
      if (Object.keys(datasetObject[IMAGE_FILES_OBJECT])
        .filter((key => !datasetObject[IMAGE_FILES_OBJECT][key].error))
        .length === 0) {
        disableFinishButton();
      }
    } else if (tableName === CLASSES_TABLE_INDICATOR) {
      this.datasetObjectManager.removeFile(fileName, CLASSES_FILES_ARRAY);
      if (!errorMessage) {
        this.datasetObjectManager.replaceActiveFileIfRemoving(fileName,
          CLASSES_FILES_ARRAY, ACTIVE_CLASSES_FILE);
        if (datasetObject[ACTIVE_CLASSES_FILE] !== null) {
          setNewActiveClassesFileRow(datasetObject[ACTIVE_CLASSES_FILE],
            datasetObject, this.datasetObjectManager.updateImageFileErrorStatus, this.validateFormat,
            this.datasetObjectManager.moveAnnotationFileToValidArray,
            this.datasetObjectManager.moveAnnotationFileToFaltyArray);
        } else {
          validateExistingAnnotations(datasetObject,
            this.datasetObjectManager.moveAnnotationFileToValidArray,
            this.datasetObjectManager.moveAnnotationFileToFaltyArray,
            this.validateFormat);
          validateExistingImages$1(datasetObject,
            this.datasetObjectManager.updateImageFileErrorStatus,
            this.validateFormat);
        }
      }
    }
    removeRow(fileName, tableName);
  }

  function buildRemoveFileHandlerInclClasses(datasetObjectManager, validateFormat) {
    return removeFileHandlerWthClasses.bind({ datasetObjectManager, validateFormat });
  }

  const RemoveFileHandlerInclClassesBuilder = {
    buildRemoveFileHandlerInclClasses,
  };

  const removeFileHandler$5 = RemoveFileHandlerInclClassesBuilder
    .buildRemoveFileHandlerInclClasses(datasetObjectManager$1, validateYOLOTXTFormat);

  const tableUpdater$1 = TableUpdaterInclClassesBuilder
    .buildTableUpdaterInclClassesTable(datasetObjectManager$1, validateYOLOTXTFormat, removeFileHandler$5);

  const datasetObjectManager = DatasetObjectManagerBuilder
    .buildObjectManagerForOneAnnotationFileStrategy();

  function checkObject(JSONObject, validators) {
    for (let i = 0; i < validators.length; i += 1) {
      const result = validators[i](JSONObject.annotationData);
      if (result.error) {
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function setCurrentAnnotationFilesToInactive(annotationFiles) {
    annotationFiles.forEach((annotationFile) => {
      annotationFile.active = false;
    });
  }

  function isImageAlreadyUploaded(newImageName) {
    const images = getAllImageData();
    for (let i = 0; i < images.length; i += 1) {
      if (newImageName === images[i].name) {
        return true;
      }
    }
    return false;
  }

  function validateImageFile(parsedObj, validAnnotationFiles, activeAnnotationFile) {
    const imageName = parsedObj.body.fileMetaData.name;
    const alreadyUploaded = getReuseAlreadyUploadedImagesState()
      ? isImageAlreadyUploaded(imageName) : false;
    if (validAnnotationFiles.length > 0) {
      const { annotationData } = activeAnnotationFile.body;
      for (let i = 0; i < annotationData.length; i += 1) {
        if (imageName === annotationData[i][0]) {
          return {
            error: false, message: '', alreadyUploaded, valid: true,
          };
        }
      }
      return { error: true, message: 'This image is not specified in the annotations file(s)', alreadyUploaded };
    }
    return { error: false, message: '', alreadyUploaded };
  }

  function checkAllRows(rows) {
    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i].length !== 8) {
        return { error: true, message: `Row ${i + 1} contains ${rows[i].length} attributes, but the expected number is 8` };
      }
      const attributes = rows[i];
      const annotationFields = {};
      annotationFields['filename(1)'] = attributes[0];
      annotationFields['width(2)'] = attributes[1];
      annotationFields['height(3)'] = attributes[2];
      annotationFields['class(4)'] = attributes[3];
      annotationFields['xmin(5)'] = attributes[4];
      annotationFields['ymin(6)'] = attributes[5];
      annotationFields['xmax(7)'] = attributes[6];
      annotationFields['ymax(8)'] = attributes[7];
      const requiredProperties = {
        'filename(1)': 'string',
        'width(2)': 'number',
        'height(3)': 'number',
        'class(4)': 'number|string',
        'xmin(5)': 'number',
        'ymin(6)': 'number',
        'xmax(7)': 'number',
        'ymax(8)': 'number',
      };
      const result = checkObjectProperties(requiredProperties, annotationFields,
        CSV_POSTFIX, PROPERTIES_STRING);
      if (result.error) {
        result.message += ` -> on row ${i + 1}`;
        return result;
      }
    }
    return { error: false, message: '' };
  }

  function validateAnnotationsFile(parsedObj, validAnnotationFiles) {
    const validators = [
      checkAllRows,
    ];
    const validationResult = checkObject(parsedObj.body, validators);
    if (!validationResult.error) {
      setCurrentAnnotationFilesToInactive(validAnnotationFiles);
      parsedObj.active = true;
    }
    return validationResult;
  }

  function validateCSVFormat(parsedObj, errorObj) {
    if (!errorObj) {
      const datasetObject = datasetObjectManager.getDatasetObject();
      const activeAnnotationFile = datasetObject[ACTIVE_ANNOTATION_FILE];
      const validAnnotationFiles = datasetObject[VALID_ANNOTATION_FILES_ARRAY];
      if (parsedObj.fileFormat === ANNOTATION_FILE_INDICATOR) {
        return validateAnnotationsFile(parsedObj, validAnnotationFiles);
      }
      if (parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
        return validateImageFile(parsedObj, validAnnotationFiles, activeAnnotationFile);
      }
    }
    if (getReuseAlreadyUploadedImagesState()
      && parsedObj.fileFormat === IMAGE_FILE_INDICATOR) {
      const imageName = parsedObj.body.fileMetaData.name;
      if (isImageAlreadyUploaded(imageName)) {
        return { error: false, message: '', alreadyUploaded: true };
      }
    }
    return errorObj;
  }

  const tableUpdater = TableUpdaterGenericBuilder
    .buildTableUpdaterForOneAnnotationFileStrategy(datasetObjectManager, validateCSVFormat);

  // pontential to move this out into shared validate logic
  // can't at the moment because validate is just one default function
  function validateExistingImages(datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc) {
    let foundValid = false;
    Object.keys(datasetObject[IMAGE_FILES_OBJECT]).forEach((key) => {
      const imageFile = datasetObject[IMAGE_FILES_OBJECT][key];
      const validationResult = validateFormatFunc(imageFile);
      if (!validationResult.error) { foundValid = true; }
      const { name } = imageFile.body.fileMetaData;
      insertRowToImagesTable(name, validationResult);
      updateImageFileErrorStatusFunc(name, validationResult.error);
    });
    if (foundValid) {
      enableFinishButton();
    } else {
      disableFinishButton();
    }
  }

  function setNewActiveAnnotationFileRow(activeAnnotationFile, datasetObject,
    updateImageFileErrorStatusFunc, validateFormatFunc) {
    if (activeAnnotationFile) {
      changeAnnotationRowToDefault(activeAnnotationFile.body.fileMetaData.name);
      activeAnnotationFile.newlyActive = false;
      validateExistingImages(datasetObject, updateImageFileErrorStatusFunc, validateFormatFunc);
    }
  }

  function removeAnnotationFileWhenMultipleAnnotationFilesAllowed(fileName,
    errorMessage, datasetObject) {
    if (errorMessage) {
      const annotationsArrayName = VALID_ANNOTATION_FILES_ARRAY;
      this.datasetObjectManager.removeFile(fileName, annotationsArrayName);
    } else {
      this.datasetObjectManager.removeFile(fileName,
        VALID_ANNOTATION_FILES_ARRAY);
      if (datasetObject[VALID_ANNOTATION_FILES_ARRAY].length === 0) {
        disableFinishButton();
        changeAllImagesTableRowsToDefault();
      } else {
        validateExistingImages(datasetObject, this.datasetObjectManager.updateImageFileErrorStatus,
          this.validateFormat);
      }
    }
  }

  function removeAnnotationFileWhenOneAnnotationFileAllowed(fileName, errorMessage, datasetObject) {
    if (errorMessage) {
      let annotationsArrayName;
      if (errorMessage === ONE_ANNOTATION_FILE_ALLOWED_ERROR_MESSAGE) {
        annotationsArrayName = VALID_ANNOTATION_FILES_ARRAY;
      } else {
        annotationsArrayName = FALTY_ANNOTATION_FILES_ARRAY;
      }
      this.datasetObjectManager.removeFile(fileName, annotationsArrayName);
    } else {
      this.datasetObjectManager.replaceActiveFileIfRemoving(fileName,
        VALID_ANNOTATION_FILES_ARRAY,
        ACTIVE_ANNOTATION_FILE);
      this.datasetObjectManager.removeFile(fileName,
        VALID_ANNOTATION_FILES_ARRAY);
      if (this.datasetObjectManager.getActiveAnnotationFile() !== null) {
        setNewActiveAnnotationFileRow(this.datasetObjectManager.getActiveAnnotationFile(),
          datasetObject, this.datasetObjectManager.updateImageFileErrorStatus, this.validateFormat);
      } else {
        disableFinishButton();
        changeAllImagesTableRowsToDefault();
      }
    }
  }

  function removeFileHandler$4(fileName, tableName, errorMessage) {
    const datasetObject = this.datasetObjectManager.getDatasetObject();
    if (tableName === ANNOTATIONS_TABLE_INDICATOR) {
      this.removeAnnotationFileFunc(fileName, errorMessage, datasetObject);
    } else if (tableName === IMAGES_TABLE_INDICATOR) {
      this.datasetObjectManager.removeFile(fileName, IMAGE_FILES_OBJECT);
      if (Object.keys(datasetObject[IMAGE_FILES_OBJECT])
        .filter((key => !datasetObject[IMAGE_FILES_OBJECT][key].error))
        .length === 0) {
        disableFinishButton();
      }
    }
    removeRow(fileName, tableName);
  }

  function buildRemoveFileHandlerForMultipleAnnotationFilesStrategy(datasetObjectManager,
    validateFormat) {
    const removeAnnotationFileFunc = removeAnnotationFileWhenMultipleAnnotationFilesAllowed;
    return removeFileHandler$4.bind({ datasetObjectManager, validateFormat, removeAnnotationFileFunc });
  }

  function buildRemoveFileHandlerForOneAnnotationFileStrategy(datasetObjectManager, validateFormat) {
    const removeAnnotationFileFunc = removeAnnotationFileWhenOneAnnotationFileAllowed;
    return removeFileHandler$4.bind({ datasetObjectManager, validateFormat, removeAnnotationFileFunc });
  }

  const RemoveFileHandlerGenericBuilder = {
    buildRemoveFileHandlerForOneAnnotationFileStrategy,
    buildRemoveFileHandlerForMultipleAnnotationFilesStrategy,
  };

  const removeFileHandler$3 = RemoveFileHandlerGenericBuilder
    .buildRemoveFileHandlerForOneAnnotationFileStrategy(datasetObjectManager$4, validateCOCOJSONFormat);

  const removeFileHandler$2 = RemoveFileHandlerGenericBuilder
    .buildRemoveFileHandlerForOneAnnotationFileStrategy(datasetObjectManager$3, validateVGGJSONFormat);

  const removeFileHandler$1 = RemoveFileHandlerGenericBuilder
    .buildRemoveFileHandlerForOneAnnotationFileStrategy(datasetObjectManager, validateCSVFormat);

  const removeFileHandler = RemoveFileHandlerGenericBuilder
    .buildRemoveFileHandlerForMultipleAnnotationFilesStrategy(datasetObjectManager$2, validateVOCXMLFormat);

  function isBoundingBox(segmentation, bbox) {
    if (segmentation.length === 8) {
      const [left, top, width, height] = bbox;
      if (segmentation[0] === left && segmentation[1] === top
        && segmentation[2] === (left + width) && segmentation[3] === top
        && segmentation[4] === (left + width) && segmentation[5] === (top + height)
        && segmentation[6] === left && segmentation[7] === (top + height)) {
        return true;
      }
    }
    return false;
  }

  function assembleNewFinalShape(annotationData, datasetObject, imageName, shapes) {
    const shapeObj = {
      type: null, coordinates: {}, imageName,
    };
    const { categories } = datasetObject[ACTIVE_ANNOTATION_FILE].body.annotationData;
    for (let i = 0; i < categories.length; i += 1) {
      if (annotationData.category_id === categories[i].id) {
        shapeObj.coordinates.class = categories[i].name.toString();
        break;
      }
    }
    if (isBoundingBox(annotationData.segmentation[0], annotationData.bbox)) {
      shapeObj.coordinates.bbox = annotationData.bbox;
      shapeObj.type = 'boundingBox';
      shapes.boundingBoxes.push(shapeObj);
    } else {
      shapeObj.coordinates.points = annotationData.segmentation[0];
      shapeObj.type = 'polygon';
      shapes.polygons.push(shapeObj);
    }
  }

  function addShapeToShapesArray(imageId, annotations, shapes, datasetObject, imageName) {
    for (let i = 0; i < annotations.length; i += 1) {
      if (imageId === annotations[i].image_id) {
        assembleNewFinalShape(annotations[i], datasetObject, imageName, shapes);
      }
    }
  }

  function getShapes$4(datasetObject, validImages) {
    const shapes = { boundingBoxes: [], polygons: [] };
    const { annotations, images } = datasetObject[ACTIVE_ANNOTATION_FILE].body.annotationData;
    validImages.forEach((validImage) => {
      for (let i = 0; i < images.length; i += 1) {
        const imageName = validImage.body.fileMetaData.name;
        if (imageName === images[i].file_name) {
          addShapeToShapesArray(images[i].id, annotations, shapes, datasetObject, imageName);
        }
      }
    });
    return shapes;
  }

  function getImages$4(imageFiles) {
    const images = [];
    Object.keys(imageFiles).forEach((key) => {
      if (!imageFiles[key].error) {
        images.push(imageFiles[key]);
      }
    });
    return images;
  }

  function assembleFinalObjectFromCOCOJSON() {
    const finalObject = { images: [], shapes: [] };
    const datasetObject = datasetObjectManager$4.getDatasetObject();
    finalObject.images = getImages$4(datasetObject[IMAGE_FILES_OBJECT]);
    finalObject.shapes = getShapes$4(datasetObject, finalObject.images);
    return finalObject;
  }

  function assembleShapes$2(regions, shapes, imageName) {
    for (let i = 0; i < regions.length; i += 1) {
      const shapeObj = {
        type: null, coordinates: {}, imageName,
      };
      const region = regions[i];
      shapeObj.coordinates.class = region.region_attributes.name.toString();
      if (region.shape_attributes.name === 'polygon') {
        const points = [];
        region.shape_attributes.all_points_x.forEach((x, index) => {
          points.push(x);
          points.push(region.shape_attributes.all_points_y[index]);
        });
        shapeObj.coordinates.points = points;
        shapeObj.type = 'polygon';
        shapes.polygons.push(shapeObj);
      } else {
        const bbox = [];
        bbox[0] = region.shape_attributes.x;
        bbox[1] = region.shape_attributes.y;
        bbox[2] = region.shape_attributes.width;
        bbox[3] = region.shape_attributes.height;
        shapeObj.coordinates.bbox = bbox;
        shapeObj.type = 'boundingBox';
        shapes.boundingBoxes.push(shapeObj);
      }
    }
  }

  function getShapes$3(datasetObject, validImages) {
    const shapes = { boundingBoxes: [], polygons: [] };
    const annotationObjects = datasetObject[ACTIVE_ANNOTATION_FILE].body.annotationData;
    validImages.forEach((validImage) => {
      for (let i = 0; i < Object.keys(annotationObjects).length; i += 1) {
        const imageName = validImage.body.fileMetaData.name;
        if (imageName === annotationObjects[Object.keys(annotationObjects)[i]].filename) {
          const { regions } = annotationObjects[Object.keys(annotationObjects)[i]];
          assembleShapes$2(regions, shapes, imageName);
        }
      }
    });
    return shapes;
  }

  function getImages$3(imageFiles) {
    const images = [];
    Object.keys(imageFiles).forEach((key) => {
      if (!imageFiles[key].error) {
        images.push(imageFiles[key]);
      }
    });
    return images;
  }

  function assembleFinalObjectFromVGGJSON() {
    const finalObject = { images: [], shapes: [] };
    const datasetObject = datasetObjectManager$3.getDatasetObject();
    finalObject.images = getImages$3(datasetObject[IMAGE_FILES_OBJECT]);
    finalObject.shapes = getShapes$3(datasetObject, finalObject.images);
    return finalObject;
  }

  function addNewShapeToArray(annotationData, imageName, shapes) {
    const shapeObj = { type: null, coordinates: {}, imageName };
    const bbox = [];
    bbox[0] = annotationData[4];
    bbox[1] = annotationData[5];
    bbox[2] = annotationData[6] - annotationData[4];
    bbox[3] = annotationData[7] - annotationData[5];
    shapeObj.coordinates.bbox = bbox;
    shapeObj.coordinates.class = annotationData[3].toString();
    shapeObj.type = 'boundingBox';
    shapes.boundingBoxes.push(shapeObj);
  }

  function getShapes$2(datasetObject, validImages) {
    const shapes = { boundingBoxes: [], polygons: [] };
    const { annotationData } = datasetObject[ACTIVE_ANNOTATION_FILE].body;
    validImages.forEach((validImage) => {
      for (let i = 0; i < annotationData.length; i += 1) {
        const imageName = validImage.body.fileMetaData.name;
        if (imageName === annotationData[i][0]) {
          addNewShapeToArray(annotationData[i], imageName, shapes);
        }
      }
    });
    return shapes;
  }

  function getImages$2(imageFiles) {
    const images = [];
    Object.keys(imageFiles).forEach((key) => {
      if (!imageFiles[key].error) {
        images.push(imageFiles[key]);
      }
    });
    return images;
  }

  function assembleFinalObjectFromCSV() {
    const finalObject = { images: [], shapes: [] };
    const datasetObject = datasetObjectManager.getDatasetObject();
    finalObject.images = getImages$2(datasetObject[IMAGE_FILES_OBJECT]);
    finalObject.shapes = getShapes$2(datasetObject, finalObject.images);
    return finalObject;
  }

  function assembleShape$1(object, shapes, imageName) {
    const shapeObj = { type: null, coordinates: {}, imageName };
    const bbox = [];
    bbox[0] = parseInt(object.bndbox.xmin['#text'], 10);
    bbox[1] = parseInt(object.bndbox.ymin['#text'], 10);
    bbox[2] = parseInt(object.bndbox.xmax['#text'], 10) - parseInt(object.bndbox.xmin['#text'], 10);
    bbox[3] = parseInt(object.bndbox.ymax['#text'], 10) - parseInt(object.bndbox.ymin['#text'], 10);
    shapeObj.coordinates.bbox = bbox;
    shapeObj.coordinates.class = object.name['#text'].toString();
    shapeObj.type = 'boundingBox';
    shapes.boundingBoxes.push(shapeObj);
  }

  function assembleShapes$1(objects, shapes, imageName) {
    if (Array.isArray(objects)) {
      for (let i = 0; i < objects.length; i += 1) {
        assembleShape$1(objects[i], shapes, imageName);
      }
    } else {
      assembleShape$1(objects, shapes, imageName);
    }
  }

  function getShapes$1(datasetObject, validImages) {
    const shapes = { boundingBoxes: [], polygons: [] };
    validImages.forEach((validImage) => {
      const imageName = validImage.body.fileMetaData.name;
      const parsedImageName = imageName.substring(0, imageName.indexOf('.'));
      for (let i = 0; i < datasetObject[VALID_ANNOTATION_FILES_ARRAY].length; i += 1) {
        const annotationName = datasetObject[VALID_ANNOTATION_FILES_ARRAY][i].body.fileMetaData.name;
        const parsedAnnotationName = annotationName.substring(0, annotationName.indexOf('.'));
        if (parsedImageName === parsedAnnotationName) {
          const { object } = datasetObject[VALID_ANNOTATION_FILES_ARRAY][i].body
            .annotationData.annotation;
          assembleShapes$1(object, shapes, imageName);
        }
      }
    });
    return shapes;
  }

  function getImages$1(imageFiles) {
    const images = [];
    Object.keys(imageFiles).forEach((key) => {
      if (!imageFiles[key].error) {
        images.push(imageFiles[key]);
      }
    });
    return images;
  }

  function assembleFinalObjectFromVOCXML() {
    const finalObject = { images: [], shapes: [] };
    const datasetObject = datasetObjectManager$2.getDatasetObject();
    finalObject.images = getImages$1(datasetObject[IMAGE_FILES_OBJECT]);
    finalObject.shapes = getShapes$1(datasetObject, finalObject.images);
    return finalObject;
  }

  function assembleShape(object, shapes, imageName, classes, imageElement) {
    const shapeObj = { type: null, coordinates: {}, imageName };
    const bbox = [];
    const { width, height } = imageElement;
    bbox[0] = (object[1] - object[3] / 2) * width;
    bbox[1] = (object[2] - object[4] / 2) * height;
    bbox[2] = object[3] * width;
    bbox[3] = object[4] * height;
    shapeObj.coordinates.bbox = bbox;
    shapeObj.coordinates.class = classes[object[0]][0].toString();
    shapeObj.type = 'boundingBox';
    shapes.boundingBoxes.push(shapeObj);
  }

  function assembleShapes(objects, shapes, imageName, classes, imageElement) {
    for (let i = 0; i < objects.length; i += 1) {
      assembleShape(objects[i], shapes, imageName, classes, imageElement);
    }
  }

  function getShapes(datasetObject, validImages) {
    const shapes = { boundingBoxes: [], polygons: [] };
    const classes = datasetObject[ACTIVE_CLASSES_FILE].body.annotationData;
    validImages.forEach((validImage) => {
      const imageName = validImage.body.fileMetaData.name;
      const { imageElement } = validImage.body;
      const parsedImageName = imageName.substring(0, imageName.indexOf('.'));
      for (let i = 0; i < datasetObject[VALID_ANNOTATION_FILES_ARRAY].length; i += 1) {
        const annotationName = datasetObject[VALID_ANNOTATION_FILES_ARRAY][i].body.fileMetaData.name;
        const parsedAnnotationName = annotationName.substring(0, annotationName.indexOf('.'));
        if (parsedImageName === parsedAnnotationName) {
          const objects = datasetObject[VALID_ANNOTATION_FILES_ARRAY][i].body.annotationData;
          assembleShapes(objects, shapes, imageName, classes, imageElement);
        }
      }
    });
    return shapes;
  }

  function getImages(imageFiles) {
    const images = [];
    Object.keys(imageFiles).forEach((key) => {
      if (!imageFiles[key].error) {
        images.push(imageFiles[key]);
      }
    });
    return images;
  }

  function assembleFinalObjectFromYOLOTXT() {
    const finalObject = { images: [], shapes: [] };
    const datasetObject = datasetObjectManager$1.getDatasetObject();
    finalObject.images = getImages(datasetObject[IMAGE_FILES_OBJECT]);
    finalObject.shapes = getShapes(datasetObject, finalObject.images);
    return finalObject;
  }

  let currentViewNumber = 1;
  let modalElement = null;
  let hideViewOnCancelFunc = null;
  let closeModalFunc = null;
  let goBackToSelectFormatViewFunc = null;

  function prepareChosenFormatFunctionality() {
    switch (getFormatState()) {
      case COCO_JSON_FORMAT:
        setAddFile(datasetObjectManager$4.addFile);
        setTableUpdater(tableUpdater$4);
        setFormatValidator(validateCOCOJSONFormat);
        setFinalObjectAssembler(assembleFinalObjectFromCOCOJSON);
        registerButtonEventHandlers(closeModalFunc, removeFileHandler$3,
          datasetObjectManager$4.clearDatasetObject, goBackToSelectFormatViewFunc);
        prepareUploadDatasetsView(
          COCO_JSON_FORMAT, ACCEPT_JSON_AND_IMG_FILES, JSON_POSTFIX, TWO_TABLE_STRATEGY,
        );
        break;
      case VGG_JSON_FORMAT:
        setAddFile(datasetObjectManager$3.addFile);
        setTableUpdater(tableUpdater$3);
        setFormatValidator(validateVGGJSONFormat);
        setFinalObjectAssembler(assembleFinalObjectFromVGGJSON);
        registerButtonEventHandlers(closeModalFunc, removeFileHandler$2,
          datasetObjectManager$3.clearDatasetObject, goBackToSelectFormatViewFunc);
        prepareUploadDatasetsView(
          VGG_JSON_FORMAT, ACCEPT_JSON_AND_IMG_FILES, JSON_POSTFIX, TWO_TABLE_STRATEGY,
        );
        break;
      case CSV_FORMAT:
        setAddFile(datasetObjectManager.addFile);
        setTableUpdater(tableUpdater);
        setFormatValidator(validateCSVFormat);
        setFinalObjectAssembler(assembleFinalObjectFromCSV);
        registerButtonEventHandlers(closeModalFunc, removeFileHandler$1,
          datasetObjectManager.clearDatasetObject, goBackToSelectFormatViewFunc);
        prepareUploadDatasetsView(
          CSV_FORMAT, ACCEPT_CSV_AND_IMG_FILES, CSV_POSTFIX, TWO_TABLE_STRATEGY,
        );
        break;
      case VOC_XML_FORMAT:
        setAddFile(datasetObjectManager$2.addFile);
        setTableUpdater(tableUpdater$2);
        setFormatValidator(validateVOCXMLFormat);
        setFinalObjectAssembler(assembleFinalObjectFromVOCXML);
        registerButtonEventHandlers(closeModalFunc, removeFileHandler,
          datasetObjectManager$2.clearDatasetObject, goBackToSelectFormatViewFunc);
        prepareUploadDatasetsView(
          VOC_XML_FORMAT, ACCEPT_XML_AND_IMG_FILES, XML_POSTFIX, TWO_TABLE_STRATEGY,
        );
        break;
      case YOLO_TXT_FORMAT:
        setAddFile(datasetObjectManager$1.addFile);
        setTableUpdater(tableUpdater$1);
        setFormatValidator(validateYOLOTXTFormat);
        setFinalObjectAssembler(assembleFinalObjectFromYOLOTXT);
        registerButtonEventHandlers(closeModalFunc, removeFileHandler$5,
          datasetObjectManager$1.clearDatasetObject, goBackToSelectFormatViewFunc);
        prepareUploadDatasetsView(
          YOLO_TXT_FORMAT, ACCEPT_TXT_AND_IMG_FILES, TXT_POSTFIX, THREE_TABLE_STRATEGY,
        );
        break;
    }
  }

  function displayNextView() {
    switch (currentViewNumber) {
      case 1:
        prepareDescriptionView();
        hideViewOnCancelFunc = hideDescriptionViewAssets;
        currentViewNumber += 1;
        break;
      case 2:
        prepareSelectFormatView();
        hideViewOnCancelFunc = hideSelectFormatViewAssets;
        currentViewNumber += 1;
        break;
      case 3:
        currentViewNumber += 1;
        if (getAllImageData().length > 0) {
          prepareUseExistingImagesQstnView();
          hideViewOnCancelFunc = hideUseExistingImagesViewAssets;
        } else {
          setReuseAlreadyUploadedImagesState(false);
          displayNextView();
        }
        break;
      case 4:
        prepareChosenFormatFunctionality();
        if (getReuseAlreadyUploadedImagesState()) {
          addAlreadyUploadedImages(getAllImageData());
        }
        hideViewOnCancelFunc = hideUploadDatasetsViewAssets;
        currentViewNumber += 1;
        break;
    }
  }

  function getCurrentViewNumber() {
    return currentViewNumber;
  }

  function displayModal$1() {
    setTimeout(() => {
      modalElement.style.display = '';
      setUploadDatasetsModalDisplayedState(true);
    }, 60);
    dimWindow(SLOW_DIM_SECONDS, THICK_DIM);
  }

  function resetContinuousShapeButtons() {
    if (getContinuousDrawingState()) {
      if (getLastDrawingModeState() === 'polygon') {
        setCreatePolygonButtonToActive();
      } else if (getLastDrawingModeState() === 'boundingBox') {
        if (getCrosshairUsedOnCanvasState()) executeFunctionOnceOnMouseOver(moveCrosshair);
        setCreateBoundingBoxButtonToActive();
      }
    }
  }

  function setButtons(isCancel) {
    if (isCancel) {
      resetContinuousShapeButtons();
    } else {
      setTimeout(() => {
        window.editShapes();
      }, 0);
    }
  }

  function closeModal(isCancel) {
    setButtons(isCancel);
    modalElement.style.display = 'none';
    lightUpWindow(SLOW_LIGHTUP_MILLISECONDS);
    hideViewOnCancelFunc();
    currentViewNumber = 1;
    displayNextView();
    setUploadDatasetsModalDisplayedState(false);
  }

  function closeModalViaKeyboard() {
    closeModal(true);
  }

  function displayUploadDatasetsModal() {
    displayModal$1();
  }

  let canvas$8 = null;

  // Image upload
  function resetCanvasEventsToDefault() {
    initiateResetCanvasEventsToDefaultEvent(canvas$8);
  }

  // New Line
  function testDrawLine() {
    setTestDrawLineState(true);
    initiateCreateNewPolygonEvents(canvas$8);
    return 'line';
  }

  ////// Polygon
  function createNewPolygonBtnClick() {
    initiateCreateNewPolygonEvents(canvas$8);
  }

  function createNewBndBoxBtnClick() {
    initiateCreateNewBndBoxEvents(canvas$8);
  }

  function addPointsBtnClick() {
    initiateAddPolygonPointsEvents(canvas$8);
  }

  // unimportant
  function removePolygonPointBtnClick() {
    initiateRemovePolygonPointsEvents(canvas$8);
  }

  function assignCanvasMouseEvents(canvasObj) {
    canvas$8 = canvasObj;
  }

  function zoomBtnClick(activity) {
    zoomCanvas(canvas$8, activity);
  }

  function settingsBtnClick() {
    toggleSettingsPopup();
  }

  function editShapesBtnClick() {
    initiateEditShapesEvent(canvas$8);
  }

  function uploadDatasetsBtnClick() {
    displayUploadDatasetsModal();
  }

  function machineLearningBtnClick() {
    displayMachineLearningModal();
  }

  // import fabric from 'fabric.js';

  let currentId = 0;
  let canvas$7 = null;

  function setShapeEditingIcons(shape) {
    if (shape.shapeName === 'polygon') {
      setPolygonEditingButtonsToDefault();
      setRemoveLabelsButtonToDisabled();
      setTestDrawLineState(false);
    }

    if ( (getTestDrawLineState()) && (shape.shapeName !== 'bndBox') )
    {
      setCreateNewLineButtonToActive();
      testDrawLine();
    }
    else {
      setTestDrawLineState(false);
    }
  }

  function findInitialLabelLocation(shape) {
    const locationObj = {};
    if (shape.shapeName === 'bndBox') {
      locationObj.left = shape.left + labelProperties.boundingBoxOffsetProperties().left;
      locationObj.top = shape.top;
    } else if (shape.shapeName === 'polygon' || shape.shapeName === 'newLine') {
      const left = shape.points[0].x - labelProperties.pointOffsetProperties().left;
      const top = shape.points[0].y - labelProperties.pointOffsetProperties().top;
      locationObj.left = left;
      locationObj.top = top;
      setPolygonLabelOffsetProps(shape, shape.points[0]);
    }
    return locationObj;
  }

  function generateLabel(label, objectVisibility) {
    label.visible = (objectVisibility === undefined || objectVisibility)
        && getLabelsVisibilityState();
    label.setVisibilityButtonActiveFlagById = false;
    canvas$7.add(label);
    canvas$7.bringToFront(label);
  }

  //has not been evoked
  function populateImageProperties(image, shapeRefObject, label, id) {
    image.shapes[id] = shapeRefObject;
    image.labels[id] = label;
  }

  function replaceCurrentShapeColourPropertiesWithMLPallette(shape) {
    shape.set('isGeneratedViaML', true);
    shape.set('MLPallette', true);
    shape.set('trueFill', shape.fill);
    shape.set('trueStroke', shape.stroke);
    shape.set('fill', 'rgb(88, 202, 75, 0.3)');
    shape.set('stroke', 'rgb(88, 202, 75)');
  }

  function generateLabelShapeGroup(shape, text, image, isUsingMachineLearning) {
    const preprocessedText = preprocessLabelText(text);
    shape.set('id', currentId);
    shape.set('shapeLabelText', preprocessedText);

    // for line it doen't generate location
    const initialLocation = findInitialLabelLocation(shape);

    const textShape = new fabric.Text(preprocessedText,
        labelProperties.getLabelProps(initialLocation, shape.shapeName));
    addToLabelOptions(textShape.text);
    const shapeColor = getLabelColor(textShape.text);
    addLabelRef(textShape, currentId);

    // sending image reference when not current image
    if (image) {
      const shapeRefObject = addShapeForInvisibleImage(shape, shapeColor);
      populateImageProperties(image, shapeRefObject, textShape, currentId);
    } else {
      generateLabel(textShape);
      // the place for defining color
      addShape(shape, shapeColor, currentId);
      addNewLabelToListFromPopup(textShape.text, currentId, shapeColor.label);

      if (shape.shapeName === 'newLine') {
        shape.set('shapeName', 'polygon');
        shape.set('ownCaching', false);
        shape.set('shapeLabelText', preprocessedText);
        const strokeColor = shape.stroke;
        shape.set('stroke', strokeColor);
      }
    }

    setShapeEditingIcons(shape);
    if (isUsingMachineLearning) {
      replaceCurrentShapeColourPropertiesWithMLPallette(shape);
    }
    currentId += 1;
  }

  function repopulateLabelShapeGroup(shapeObj, label, id, newFileSizeRatio) {
    canvas$7.add(shapeObj.shapeRef);
    resizeLabelDimensionsBySingleScale(label, newFileSizeRatio);
    generateLabel(label, shapeObj.visibility);
    addExistingShape(shapeObj, id);
    addLabelRef(label, id);
    const shapeColor = getLabelColor(shapeObj.shapeRef.shapeLabelText);
    addExistingLabelToList(shapeObj.shapeRef.shapeLabelText, id,
        shapeColor.label, shapeObj.visibility);
  }

  function repopulateVisibleLabelShapeGroup(shapeObj, label, id, newFileSizeRatio) {
    resizeAllPassedObjectsDimensionsBySingleScale(shapeObj.shapeRef, newFileSizeRatio);
    repopulateLabelShapeGroup(shapeObj, label, id, newFileSizeRatio);
  }

  function repopoulateHiddenLabelShapeGroup(shapeObj, label, id,
                                            imageDimensions, newFileSizeRatio) {
    resizeAllPassedObjectsDimensionsBySingleScale(shapeObj.shapeRef, newFileSizeRatio);
    const imageScalingDimensions = { scaleX: newFileSizeRatio, scaleY: newFileSizeRatio };
    const imageLengthDimensions = {
      height: imageDimensions.originalHeight, width: imageDimensions.originalWidth,
    };
    preventOutOfBoundsOnNewObject(shapeObj.shapeRef, imageScalingDimensions, imageLengthDimensions);
    repopulateLabelShapeGroup(shapeObj, label, id, newFileSizeRatio);
  }

  function calculateNewImageHeightRatio(imageDimensions) {
    return canvas$7.height / imageDimensions.originalHeight;
  }

  function repopulateHiddenImageObjects(newImageDimensions, existingShapes, existingLabels) {
    const imageDimensions = {
      originalHeight: newImageDimensions.height,
      originalWidth: newImageDimensions.width,
    };
    const newFileSizeRatio = calculateNewImageHeightRatio(imageDimensions);
    const newPolygonOffsetProperties = { width: newFileSizeRatio, height: newFileSizeRatio };
    labelProperties.setPolygonOffsetProperties(newPolygonOffsetProperties);
    Object.keys(existingShapes).forEach((key) => {
      repopoulateHiddenLabelShapeGroup(existingShapes[key], existingLabels[key], key,
          imageDimensions, newFileSizeRatio);
    });
  }

  // being evoked after every switching the images
  function repopulateVisibleImageObjects(previousDimensions, existingShapes, existingLabels) {
    const newFileSizeRatio = calculateNewImageHeightRatio(previousDimensions)
        / previousDimensions.oldImageHeightRatio;
    const newPolygonOffsetProperties = {
      width: newFileSizeRatio * previousDimensions.polygonOffsetLeft,
      height: newFileSizeRatio * previousDimensions.polygonOffsetTop,
    };
    labelProperties.setPolygonOffsetProperties(newPolygonOffsetProperties);
    Object.keys(existingShapes).forEach((key) => {
      repopulateVisibleLabelShapeGroup(existingShapes[key], existingLabels[key], key,
          newFileSizeRatio);
    });
    canvas$7.renderAll();
  }

  // After switching the images
  function repopulateLabelAndShapeObjects(existingShapes, existingLabels,
                                          previousDimensions, newImageDimensions) {
    if (previousDimensions && previousDimensions.originalHeight) {
      repopulateVisibleImageObjects(previousDimensions, existingShapes, existingLabels);
    } else if (Object.keys(existingShapes).length > 0) {
      repopulateHiddenImageObjects(newImageDimensions, existingShapes, existingLabels);
    }
  }

  function assignCanvasForLabelAndShapeBuilder(canvasObj) {
    canvas$7 = canvasObj;
  }

  function waitingForLabelCursorMode(canvas) {
    canvas.forEachObject((iteratedObj) => {
      iteratedObj.hoverCursor = 'default';
    });
    canvas.defaultCursor = 'default';
  }

  let labellingState = false;
  let targetShape = null;
  let canvas$6 = null;

  // if to press 'enter', for choosing the class of shape
  function prepareLabelShape(shape, canvasObj) {
    waitingForLabelCursorMode(canvasObj);
    targetShape = shape;
    canvas$6 = canvasObj;
    labellingState = true;
  }

  // if to press 'cancel' on 'label choosing  bar'
  // the line and points should be removed
  function removeTargetShape() {
    canvas$6.remove(targetShape);
    labellingState = false;
  }

  function setCursorMode() {
    if (getCrosshairUsedOnCanvasState()) {
      setAllObjectsToUneditable(canvas$6);
    } else {
      resetObjectCursors(canvas$6);
    }
  }

  function createLabelShape() {
    hideLabellerModal();
    generateLabelShapeGroup(targetShape, getLabellerModalInputText());
    setCursorMode();
    resetLabellerModalOptions();
    labellingState = false;
  }

  function isLabelling() {
    return labellingState;
  }

  let keyDownEventTimeOut = 0;
  let textInputElement = null;
  let optionsElement = null;
  let oneOrMoreLabelsAdded = false;
  let currentlySelectedLabelOption = null;

  function changeSubmitButtonStyling() {
    const prepocessedText = preprocessLabelText(textInputElement.value);
    if (prepocessedText === '') {
      changeStyleWhenInputEmpty();
    } else if (prepocessedText === 'new label') {
      changeStyleWhenInputInvalid();
    } else {
      changeStyleToAllowSubmit();
    }
  }

  function initialiseLabellerModalLocalVariables() {
    textInputElement = document.getElementById('labeller-modal-input');
    optionsElement = document.getElementById('labeller-modal-options');
    keyDownEventTimeOut = getKeyDownEventTimeout();
  }

  function resetDrawingMode() {
    if (!getContinuousDrawingState()) {
      resetCanvasEventsToDefault();
      if (getCrosshairUsedOnCanvasState()) {
        removeOutsideCrosshairEventListeners();
      }
    }
    else if  (getLastDrawingModeState() === 'polygon') {
      resetDrawPolygonMode();
    }
    else if (getLastDrawingModeState() === 'boundingBox') {
      resetDrawBoundingBoxMode();
    }
    else if (getLastDrawingModeState() === 'line') {
      setTestDrawLineState(true);
      testDrawLine();
    }
  }

  function labelShape() {
    const preprocessedText = preprocessLabelText(textInputElement.value);
    if (preprocessedText !== '') {
      createLabelShape();
      resetDrawingMode();
      displayTickSVGOverImageThumbnail();
      oneOrMoreLabelsAdded = true;
    }
  }

  function cancelLabellingProcess() {
    if (isLabelling()) {
      hideLabellerModal();
      removeTargetShape();
      resetDrawingMode();
    }
  }

  function selectLabelOption(text, element, color) {
    if (currentlySelectedLabelOption) {
      currentlySelectedLabelOption.id = '';
      currentlySelectedLabelOption.style.backgroundColor = '';
    }
    const { parentElement } = element.parentElement;
    parentElement.id = 'used';
    parentElement.style.backgroundColor = color;
    currentlySelectedLabelOption = parentElement;
    textInputElement.value = text;
    changeSubmitButtonStyling();
  }

  function setCaretPosition(caretPos) {
    textInputElement.value = textInputElement.value;
    if (textInputElement.createTextRange) {
      const range = textInputElement.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    }
    if (textInputElement.selectionStart || textInputElement.selectionStart === 0) {
      textInputElement.focus();
      textInputElement.setSelectionRange(caretPos, caretPos);
      return true;
    }
    textInputElement.focus();
    return false;
  }

  function getOptionsElementList() {
    if (!oneOrMoreLabelsAdded && optionsElement.childNodes[1]) {
      oneOrMoreLabelsAdded = true;
      return optionsElement.childNodes[1].childNodes;
    }
    return optionsElement.childNodes[0].childNodes;
  }

  // at the moment if the mouse hovers over an option, then the user types in that option
  // and changes something again -> the highlight will disappear as the currentlySelectedLabelOption
  // is blanked. The only way this can be prevented is adding a special indicator for when
  // that element is being highlighted
  function inputKeyDown(event) {
    if (event.key !== 'Enter') {
      window.setTimeout(() => {
        if (event.code === 'Space') {
          const initialCaretLocation = textInputElement.selectionStart;
          setCaretPosition(initialCaretLocation);
        }
        if (currentlySelectedLabelOption) {
          currentlySelectedLabelOption.style.backgroundColor = '';
          currentlySelectedLabelOption.id = '';
          currentlySelectedLabelOption = null;
        }
        const optionsElementList = getOptionsElementList();
        for (let i = 0; i < optionsElementList.length; i += 1) {
          if (optionsElementList[i].childNodes[0].childNodes[0].childNodes[0].innerHTML
              === textInputElement.value) {
            [currentlySelectedLabelOption] = optionsElementList[i].childNodes;
            currentlySelectedLabelOption.style.backgroundColor = getLabelOptions()[i].color.label;
            currentlySelectedLabelOption.id = 'used';
            scrollIntoViewIfNeeded(currentlySelectedLabelOption, optionsElement);
            break;
          }
        }
        changeSubmitButtonStyling();
      }, keyDownEventTimeOut);
    }
  }

  function arrowKeyEvents(key) {
    if (currentlySelectedLabelOption) {
      if (key === 'ArrowDown') {
        const { nextSibling } = currentlySelectedLabelOption.parentElement;
        if (nextSibling) {
          nextSibling.childNodes[0].childNodes[0].childNodes[0].dispatchEvent(new Event('mousedown'));
        }
      } else if (key === 'ArrowUp') {
        const { previousSibling } = currentlySelectedLabelOption.parentElement;
        if (previousSibling) {
          previousSibling.childNodes[0].childNodes[0].childNodes[0].dispatchEvent(new Event('mousedown'));
        }
      }
    } else {
      const optionsElementList = optionsElement.childNodes[0].childNodes[0]
        || optionsElement.childNodes[1].childNodes[0];
      optionsElementList.childNodes[0].childNodes[0].childNodes[0].dispatchEvent(new Event('mousedown'));
    }
    changeSubmitButtonStyling();
  }

  function pasteLabelText() {
    window.setTimeout(() => {
      const initialCaretLocation = textInputElement.selectionStart;
      textInputElement.value = preprocessPastedText(textInputElement.value);
      setCaretPosition(initialCaretLocation);
    }, 0);
  }

  let modalParentElement = null;

  function displayRemoveImagesModal() {
    dimWindow(SLOW_DIM_SECONDS, THICK_DIM);
    modalParentElement.style.display = 'block';
    setRemoveImageModalDisplayedState(true);
  }

  function closeRemoveImagesModal() {
    modalParentElement.style.display = 'none';
    setRemoveImageModalDisplayedState(false);
    lightUpWindow(SLOW_LIGHTUP_MILLISECONDS);
    if (getCrosshairUsedOnCanvasState()) executeFunctionOnceOnMouseOver(moveCrosshair);
  }

  function setInitialCheckBoxInputValue() {
    document.getElementById('remove-images-modal-checkbox').checked = false;
  }

  function assignRemoveImagesModalLocalVariables() {
    modalParentElement = document.getElementById('remove-images-modal-parent');
  }

  function initialiseRemoveImagesModalStyling() {
    assignRemoveImagesModalLocalVariables();
    setInitialCheckBoxInputValue();
  }

  function closeAllPopups(event) {
    event = event || { target: { classList: [] } };
    if (isEditingLabelInLabelList()) {
      finishEditingLabelList(event);
    } else if (getSettingsPopupOpenState()) {
      if (event.target.classList[0] !== 'settings-popup-item') hideSettingsPopup();
    } else ;
  }

  /**
   * @author Bryan & Julianna
   * @version 0.1
   * @description This is online Image annotation tool.
   * 
   */

  let userOS = null;
  const availableOSs = ['Win', 'Linux', 'Mac'];
  const DEFAULT_OS = 'Win';

  function findUserOS() {
    userOS = availableOSs.find(os => navigator.appVersion.indexOf(os) !== -1) || DEFAULT_OS;
  }

  function getUserOS() {
    return userOS;
  }

  function isAnyModalOpen() {
    return getLabellerModalDisplayedState()
    || getUploadDatasetsModalDisplayedState()
    || getMachineLearningModalDisplayedState()
    || getRemoveImageModalDisplayedState()
    || getWelcomeModalDisplayedState();
  }

  let canvas$5 = null;
  let isRKeyUp = true;
  let wKeyHandler = null;
  let wKeyUpHandler = null;

  function enterKeyHandler() {
    if (getAddPointsLineState()) {
      addLineLastPoint();
    }

    // The Second process after presssing Enter
    if (getLabellerModalDisplayedState()) {
      labelShape();
    }
    else if (getRemoveImageModalDisplayedState()) {
      window.approveRemoveImage();
    } else if (getPolygonDrawingInProgressState() && !getRemovingPolygonPointsState()) {
      generatePolygonViaKeyboard();
    }
  }

  function rKeyUpHandler() {
    isRKeyUp = true;
  }

  function qKeyHandler() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && getCreatePolygonButtonState() !== 'disabled') {
      window.onmousedown();
      if (((getPolygonDrawingInProgressState() && !getRemovingPolygonPointsState())
      || (getReadyToDrawShapeState() && getLastDrawingModeState() === 'polygon'))) {
        addPointViaKeyboard();
      } else {
        window.createNewPolygon();

        removeFillForAllShapes();
        canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
      }
    }
  }

  // Line handler
  function lKeyHandler() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && getCreateLineState() !== 'disabled') {
      window.onmousedown();
      closeAllPopups();

      setCreateNewLineButtonToActive();
      testDrawLine();

      removeFillForAllShapes();
      canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    }
  }

  function eKeyHandler() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && !getDefaultState() && getEditShapesButtonState() !== 'disabled') {
      closeAllPopups();
      window.editShapes();
      canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    }
  }

  // click w to starting drawing bounding box and clicking again to finish drawing it
  function wKeyHandlerLinux() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList()
      && getCreateBoundingBoxButtonState() !== 'disabled') {
      closeAllPopups();
      if (getBoundingBoxDrawingInProgressState()) {
        finishDrawingBoundingBox();
      } else if (getReadyToDrawShapeState() && getLastDrawingModeState() === 'boundingBox') {
        instantiateNewBoundingBox();
      } else {
        window.createNewBndBox();
        removeFillForAllShapes();
        canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
      }
    }
  }

  // click w and hold to draw bounding box and release to finish drawing it
  function wKeyHandlerDefault() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList()
          && getCreateBoundingBoxButtonState() !== 'disabled') {
      closeAllPopups();
      if (getBoundingBoxDrawingInProgressState()) return;
      if (getReadyToDrawShapeState() && getLastDrawingModeState() === 'boundingBox') {
        instantiateNewBoundingBox();
      } else {
        window.createNewBndBox();
        removeFillForAllShapes();
        canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
      }
    }
  }

  function wKeyUpHandlerDefault() {
    if (getBoundingBoxDrawingInProgressState()) {
      finishDrawingBoundingBox();
    }
  }


  function rKeyHandler() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && !getShapeMovingState() && getRemovePointsButtonState() !== 'disabled') {
      closeAllPopups();
      if ((getPolygonDrawingInProgressState() && getRemovingPolygonPointsState())) {
        if (isRKeyUp) {
          removeTempPointViaKeyboard();
          isRKeyUp = false;
        }
      } else if (!getPolygonDrawingInProgressState() && getRemovingPolygonPointsState()) {
        if (isRKeyUp) {
          removePointViaKeyboard();
          isRKeyUp = false;
        }
      } else {
        window.removePoint(document.getElementById('remove-points-button'));
        removeFillForAllShapes();
        canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
      }
    }
  }

  function aKeyHandler() {
    // aware of when shape completed, not moving mouse, change to remove, but cannot remove
    // also if hovering point on edit, switched to remove, then add without move, can't add
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && !getShapeMovingState() && getAddPointsButtonState() !== 'disabled') {
      closeAllPopups();
      if (getAddingPolygonPointsState()) {
        addPointViaKeyboard$1();
      } else {
        window.addPoints(document.getElementById('add-points-button'));
        removeFillForAllShapes();
        canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
      }
    }
  }

  function arrowUpKeyHandler() {
    const arrowUp = 'ArrowUp';
    if (getLabellerModalDisplayedState()) {
      arrowKeyEvents(arrowUp);
    } else if (isEditingLabelInLabelList()) {
      arrowKeyEventsForLabelOtionsList(arrowUp);
    } else if (getCurrentlyHighlightedElement()) {
      arrowKeyEventsForLabelList(arrowUp);
    }
  }

  function arrowDownKeyHandler() {
    const arrowDown = 'ArrowDown';
    if (getLabellerModalDisplayedState()) {
      arrowKeyEvents(arrowDown);
    } else if (isEditingLabelInLabelList()) {
      arrowKeyEventsForLabelOtionsList(arrowDown);
    } else if (getCurrentlyHighlightedElement()) {
      arrowKeyEventsForLabelList(arrowDown);
    }
  }

  function arrowLeftKeyHandler() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && !getShapeMovingState()) {
      closeAllPopups();
      window.switchImage('previous');
    }
  }

  function arrowRightKeyHandler() {
    if (!isAnyModalOpen() && !isEditingLabelInLabelList() && !getShapeMovingState()) {
      closeAllPopups();
      window.switchImage('next');
    }
  }

  function removeKeyHandler() {
    if (isAnyModalOpen() || isEditingLabelInLabelList()) return;
    closeAllPopups();
    window.removeLabel();
    canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
  }

  function deleteKeyHandler() {
    removeKeyHandler();
  }

  function backspaceKeyHandler() {
    removeKeyHandler();
  }

  function escapeKeyHandler() {
    if (getSettingsPopupOpenState()) {
      window.toggleSettingsPopup();
    } else if (getLabellerModalDisplayedState()) {
      window.cancelLabellingProcess();
    } else if (getUploadDatasetsModalDisplayedState()) {
      closeModalViaKeyboard();
    } else if (getMachineLearningModalDisplayedState()) {
      closeModalViaKeyboard$1();
    } else if (getRemoveImageModalDisplayedState()) {
      closeRemoveImagesModal();
    } else if (getPolygonDrawingInProgressState()) {
      window.createNewPolygon();
      canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    } else if (getBoundingBoxDrawingInProgressState()) {
      window.createNewBndBox();
      canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    } else if (getAddingPolygonPointsState()) {
      window.addPoints(document.getElementById('add-points-button'));
      canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    } else if (getRemovingPolygonPointsState()) {
      window.removePoint(document.getElementById('remove-points-button'));
      canvas$5.upperCanvasEl.dispatchEvent(new Event('mousemove'));
    } else if (isEditingLabelInLabelList()) {
      cancelEditingViaKeyboard();
    }
  }

  function keyDownEventHandler(event) {
    switch (event.key.toLowerCase()) {
      case 'escape':
        escapeKeyHandler();
        break;
      case 'enter':
        enterKeyHandler();
        break;
      case 'delete':
        deleteKeyHandler();
        break;
      case 'backspace':
        backspaceKeyHandler();
        break;
      case 'arrowup':
        arrowUpKeyHandler();
        break;
      case 'arrowdown':
        arrowDownKeyHandler();
        break;
      case 'arrowleft':
        arrowLeftKeyHandler();
        break;
      case 'arrowright':
        arrowRightKeyHandler();
        break;
      case 'q':
        qKeyHandler();
        break;
      case 'l':
        lKeyHandler();
        break;
      case 'e':
        eKeyHandler();
        break;
      case 'w':
        wKeyHandler();
        break;
      case 'r':
        rKeyHandler();
        break;
      case 'a':
        aKeyHandler();
        break;
    }
  }

  function keyUpEventHandler(event) {
    switch (event.key.toLowerCase()) {
      case 'w':
        wKeyUpHandler();
        break;
      case 'r':
        rKeyUpHandler();
        break;
    }
  }

  function assignCanvasForHotKeys(canvasObj) {
    canvas$5 = canvasObj;
  }

  function assignOSSpecificFunctionality() {
    if (getUserOS() === 'Linux') {
      wKeyHandler = wKeyHandlerLinux;
      wKeyUpHandler = () => {};
    } else {
      wKeyHandler = wKeyHandlerDefault;
      wKeyUpHandler = wKeyUpHandlerDefault;
    }
  }

  function registerHotKeys() {
    document.addEventListener('keydown', keyDownEventHandler);
    document.addEventListener('keyup', keyUpEventHandler);
    assignOSSpecificFunctionality();
  }

  // react on all mouse down events
  function onMouseDown(event) {
    closeAllPopups(event);
    if (getChangingMLGeneratedLabelNamesState()) {
      stopEditingMLGeneratedLabelNameBtnClick(event.target);
    }
  }

  function registerMouseDownEvents() {
    window.onmousedown = onMouseDown;
  }

  // executed onl once after calling the app
  function registerWindowMouseEvents() {
    registerMouseDownEvents();
    registerMouseMoveEvents();
    registerMouseOverOutEvents();
  }

  let canvas$4 = null;

  window.windowResize = () => {
    validateClientBrowserDimensions();
    if (getCurrentZoomState() > 1) {
      resizeCanvas();
      zoomCanvas(canvas$4, null, true);
    } else if (getCurrentImage()) {
      const newFileSizeRatio = resizeCanvasAndImage();
      labelProperties.updatePolygonOffsetProperties(newFileSizeRatio);
      resizeAllObjectsDimensionsByDoubleScale(newFileSizeRatio, canvas$4);
    }
    if (getSettingsPopupOpenState()) {
      setStickySettingsPopupProperties();
      if (getBoundingBoxCrosshairDropdownOpenState()) {
        setStickyBoundingBoxCrosshairDropdownProperties();
      }
    }
    const isWindowResized = true;
    validateFullLabellerModalVisibile(isWindowResized);
  };

  function assignCanvasForResizeWhenWindowResize(canvasObj) {
    canvas$4 = canvasObj;
  }

  function changeContinuousDrawingSetting() {
    if (getContinuousDrawingState()) {
      setLabellerPopupDimProperties(SLOW_LIGHTUP_MILLISECONDS, SLOW_DIM_SECONDS, THICK_DIM);
      setContinuousDrawingState(false);
    } else {
      setLabellerPopupDimProperties(QUICK_LIGHTUP_MILLISECONDS, QUICK_DIM_SECONDS, THIN_DIM);
      setContinuousDrawingState(true);
    }
  }

  function changeLabelsVisibilitySetting(canvas) {
    if (getLabelsVisibilityState()) {
      setAllLabelsVisibilityProperty(false);
      setLabelsVisibilityState(false);
    } else {
      setAllLabelsVisibilityProperty(true);
      setLabelsVisibilityState(true);
    }
  }

  let canvas$3 = null;

  function assignCanvasForSettingsPopupOptionsClickEvents(canvasObj) {
    canvas$3 = canvasObj;
  }

  function hideBoundingBoxCrosshairDropdown() {
    if (getBoundingBoxCrosshairDropdownOpenState()) {
      hideBoundingBoxCrosshairDropdown$1();
    }
  }

  function assignSettingsPopupButtonHoverEventHandlers() {
    window.hideBoundingBoxCrosshairDropdown = hideBoundingBoxCrosshairDropdown;
  }

  function toggleCheckbox$1(func, isText) {
    func(canvas$3);
    if (isText) { this.checked = !this.checked; }
  }

  function assignSettingsPopupButtonClickEventHandlers() {
    window.toggleMovableObjects = toggleCheckbox$1.bind(
      document.getElementById('settings-popup-movable-objects-checkbox'), changeMovaleObjectsSetting,
    );
    window.toggleContinuousDrawing = toggleCheckbox$1.bind(
      document.getElementById('settings-popup-continuous-drawing-checkbox'), changeContinuousDrawingSetting,
    );
    window.toggleLabelsVisibility = toggleCheckbox$1.bind(
      document.getElementById('settings-popup-labels-visibility-checkbox'), changeLabelsVisibilitySetting,
    );
    window.toggleBoundingBoxCrosshairDropdown = triggerBoundingBoxCrosshairDropdown;
  }

  function assignSettingsPopupButtonEventHandlers() {
    assignSettingsPopupButtonClickEventHandlers();
    assignSettingsPopupButtonHoverEventHandlers();
  }

  let canvas$2 = null;

  function assignCanvasForCrosshairToggle(canvasObj) {
    canvas$2 = canvasObj;
  }

  function toggleCrosshair() {
    if (getCrosshairForBoundingBoxVisibleState()) {
      if (getCreateBoundingBoxButtonState() === 'active') {
        removeCrosshair(canvas$2);
        setDrawCursorMode(canvas$2);
      }
      setCrosshairUsedOnCanvasState(false);
      setCrosshairForBoundingBoxVisibleState(false);
    } else {
      if (getCreateBoundingBoxButtonState() === 'active') {
        setDrawWithCrosshairMode(canvas$2);
      }
      setCrosshairUsedOnCanvasState(true);
      setCrosshairForBoundingBoxVisibleState(true);
    }
  }

  function toggleCheckbox(func, isText) {
    func();
    if (isText) { this.checked = !this.checked; }
  }

  function assignBoundingBoxCrosshairDropdownButtonEventHandlers() {
    window.toggleCrosshair = toggleCheckbox.bind(
      document.getElementById('settings-popup-bounding-box-crosshair-visibility-checkbox'), toggleCrosshair,
    );
    window.crosshairColorChange = setCrosshairColor;
  }

  function assignCanvasForSettingsPopup(canvas) {
    assignCanvasForCrosshairToggle(canvas);
    assignCanvasForSettingsPopupOptionsClickEvents(canvas);
  }

  function initialiseSettingsPopup() {
    initialiseSettingsPopupStyling();
    assignSettingsPopupButtonEventHandlers();
    initialiseBoundingBoxCrosshairDropdownStyling();
    assignBoundingBoxCrosshairDropdownButtonEventHandlers();
  }

  function assignCanvasForLabelList(canvas) {
    assignCanvasForRemovingLabels(canvas);
  }

  let canvas$1 = null;

  function discardActiveObject() {
    canvas$1.discardActiveObject();
  }

  function assignCanvasForDiscardingObjects(canvasObj) {
    canvas$1 = canvasObj;
  }

  let doNotShowRemoveImageModalAgainState = false;

  function getDoNotShowRemoveImageModalAgainState() {
    return doNotShowRemoveImageModalAgainState;
  }

  function setDoNotShowRemoveImageModalAgainState(state) {
    doNotShowRemoveImageModalAgainState = state;
  }

  let canvas = null;

  function resetEverything() {
    resetZoom(false);
    updateCurrentImageIds(0, 0);
    const lastDrawingModeState = getContinuousDrawingState() ? getLastDrawingModeState : false;
    window.editShapes();
    // the following is preparation to set an active drawing mode on a new image upload
    if (lastDrawingModeState) setDefaultState(false);
    setImageNameElementToDefault();
    removeAllLabelListItems();
    drawWatermarkOnCanvasAreaBackground();
    setCreateBoundingBoxButtonToDisabled();
    setCreatePolygonButtonToDisabled();
    setRemoveImagesButtonsDisabled();
    setEditShapesButtonToDisabled();
    setZoomInButtonToDisabled();
    canvas.clear();
    // the following deals with an overflow bug when resizing an empty canvas with previous dimensions
    canvas.setDimensions({ width: 1, height: 1 });
    setCurrentImage(null);
  }

  function switchImage(index, allImageData, previousImageDataLength) {
    if (index < allImageData.length) {
      const nextImageId = (index - (previousImageDataLength - allImageData.length)) + 1;
      updateCurrentImageIds(-1, allImageData.length);
      window.switchImage(nextImageId);
    } else if (allImageData.length > 0) {
      updateCurrentImageIds(-1, allImageData.length);
      window.switchImage(allImageData.length - 1);
    } else {
      resetEverything();
    }
  }

  function removeAllShapes() {
    const allShapes = getAllExistingShapes();
    Object.keys(allShapes).forEach((key) => {
      decrementShapeType(allShapes[key].shapeRef);
    });
    removeAllShapeRefs();
  }

  function resetRemainingImageElements() {
    const imageNodes = document.getElementById('image-list-image-container').childNodes;
    for (let i = 0; i < imageNodes.length; i += 1) {
      const imageElement = imageNodes[i].childNodes[0];
      imageElement.id = i;
      imageNodes[i].onclick = window.switchImage.bind(this, i);
    }
  }

  function removeImage$1(allImageDataArr) {
    const allImageData = allImageDataArr || getAllImageData();
    const index = getCurrentImageId();
    document.getElementById(index).parentElement.remove();
    resetRemainingImageElements();
    const previousImageDataLength = allImageData.length;
    allImageData.splice(index, 1);
    removeAllLabelRefs();
    removeAllShapes();
    setPolygonEditingButtonsToDisabled();
    switchImage(index, allImageData, previousImageDataLength);
  }

  function triggerRemoveImage() {
    const allImageData = getAllImageData();
    if (allImageData.length > 0) {
      if (getDoNotShowRemoveImageModalAgainState()) {
        removeImage$1(allImageData);
      } else {
        displayRemoveImagesModal();
      }
    }
  }

  function assignCanvasForRemovingImages(canvasArg) {
    canvas = canvasArg;
  }

  // initial code to get started on the multi-image removal functionality

  // let imageRemoveList = [];

  // function removeImage() {
  //   const allImageData = getAllImageData();
  //   if (allImageData.length > 0) {
  //     const index = getCurrentImageId();
  //     const tempAllImageDataLength = allImageData.length;
  //     allImageData.splice(index, 1);
  //     document.getElementById(index).parentElement.remove();
  //     const imageNodes = document.getElementById('image-list-image-container').childNodes;
  //     for (let i = 1; i < imageNodes.length; i += 1) {
  //       const imageElement = imageNodes[i].childNodes[0];
  //       imageElement.id = i - 1;
  //       imageNodes[i].onclick = window.switchImage.bind(this, i - 1);
  //     }
  //     const newCurrentImageId = getCurrentImageId()
  //       - (tempAllImageDataLength - allImageData.length);
  //     if (index === getCurrentImageId()) {
  //       const afterRemoving = true;
  //       if (index < allImageData.length) {
  //         updateCurrentImageIds(newCurrentImageId, allImageData.length);
  //         window.switchImage('next', afterRemoving);
  //       } else if (allImageData.length > 0) {
  //         updateCurrentImageIds(-1, allImageData.length);
  //         window.switchImage(allImageData.length - 1);
  //       } else {
  //         updateCurrentImageIds(0, 0);
  //         canvas.clear();
  //       }
  //       removeAllLabelRefs();
  //       removeAllShapeRefs();
  //     }
  //   }
  // }

  // function removeImages() {
  //   const allImageData = getAllImageData();
  //   imageRemoveList.forEach((index) => {
  //     allImageData.splice(index, 1);
  //   });
  //   imageRemoveList = [];
  // }

  // function addImageIndexToRemoveList(index) {
  //   imageRemoveList.push(index);
  // }

  // function initialiseRemoveImagesFunctionality() {
  //   window.removeImage = removeImage;
  //   window.removeImages = removeImages;
  //   window.addImageIndexToRemoveList = addImageIndexToRemoveList;
  // }

  function assignCanvasForImageList(canvas) {
    assignCanvasForDiscardingObjects(canvas);
    assignCanvasForRemovingImages(canvas);
    assignCanvasForDrawingImage(canvas);
    assignCanvasToImageList(canvas);
  }

  let currentCanvasInstance = null;

  function repopulateCanvasReference(canvas) {
    assignCanvasMouseEvents(canvas);
    assignCanvasForHotKeys(canvas);
    assignCanvasToDimWindowService(canvas);
    assignCanvasForLabelManipulation(canvas);
    assignCanvasForShapeFillManipulation(canvas);
    assignCanvasForDrawingShapesViaCoordinates(canvas);
    assignCanvasForResizeWhenWindowResize(canvas);
    assignCanvasForLabelAndShapeBuilder(canvas);
    assignCanvasForSettingsPopup(canvas);
    assignCanvasForLabelList(canvas);
    assignCanvasForImageList(canvas);
    initialiseZoomVariables(canvas);
  }

  function constructCanvas() {
    setBoundingBoxEditToolsToBeTransparent();
    currentCanvasInstance = createNewCanvas();
    assignCanvasForUtils(currentCanvasInstance);
    repopulateCanvasReference(currentCanvasInstance);
  }

  // Activates on the scene after switching to another image, with another image id
  function reassignReferenceToNewCanvas() {
    currentCanvasInstance = reasignCanvas();
    assignNewCanvasForUtils(currentCanvasInstance);
    repopulateCanvasReference(currentCanvasInstance);
  }

  function isLeftMouseButtonClick(event) {
    return event.which === 1;
  }

  function removeButtonPopoverIfActive(func, event) {
    if (event && !isLeftMouseButtonClick(event)) return;
    removeActiveButtonPopover();
    if (func) func();
  }

  function doNothingIfNotLeftMouseButtonPress(func, event) {
    if (event && !isLeftMouseButtonClick(event)) return;
    if (func) func();
  }

  function doNothingIfNotLeftMouseButtonPressWthArg(func, funcArg1, event) {
    if (event && !isLeftMouseButtonClick(event)) return;
    if (func) func(funcArg1);
  }

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

  function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
  }

  function interruptAllCanvasEventsBeforeFunc(func, event) {
    if (event && !isLeftMouseButtonClick(event)) {
      return;
    }
    removeActiveButtonPopover();
    interruptAllCanvasEvents();
    if (func) {
      func();
    }
  }

  function interruptAllCanvasEventsBeforeMultipleFunc(funcs, event) {
    if (event && !isLeftMouseButtonClick(event)) return;
    removeActiveButtonPopover();
    interruptAllCanvasEvents();
    funcs.forEach((func) => { func(); });
  }

  function doNothingIfLabellingInProgress(func, element, event) {
    if (event && !isLeftMouseButtonClick(event)) return;
    if (isElement(element) && element.classList.contains('toolkit-button-disabled')) return;
    removeActiveButtonPopover();
    if (!isLabelling()) {
      if (func) func();
    }
  }

  function func1IfDrawRemovePointsElseInterruptAllWthFunc2(func1, func2, event) {

    if (event && !isLeftMouseButtonClick(event)) {
      return;
    }
    removeActiveButtonPopover();
    if (getRemovingPolygonPointsState() && getPolygonDrawingInProgressState()) {
      if (func1) {
        func1();
      }
    } else if (func2) {
      if (func2() === 'line'){
        setCreateNewLineButtonToActive();
        setTestDrawLineState(true);
      }
      else {
        setTestDrawLineState(false);
      }

      interruptAllCanvasEvents();
      func2();
    }
  }

  function doNothingIfLabellingOrAddingNewPoints(func, element, event) {
    setTestDrawLineState(false);
    if (event && !isLeftMouseButtonClick(event)) {
      return;
    }
    if (isElement(element) && element.classList.contains('toolkit-button-disabled')) {
      return;
    }
    removeActiveButtonPopover();
    if (!isLabelling() && !getPolygonDrawingInProgressState()) {
      interruptCanvasToStartAddPoints();
      if (func) func();
    }
  }

  function assignToolkitButtonClickEventHandlers() {
    window.editShapes = doNothingIfLabellingInProgress.bind(this, editShapesBtnClick);
    window.createNewLine = func1IfDrawRemovePointsElseInterruptAllWthFunc2.bind(this, removePolygonPointBtnClick, testDrawLine);
    window.createNewPolygon = func1IfDrawRemovePointsElseInterruptAllWthFunc2.bind(this, removePolygonPointBtnClick, createNewPolygonBtnClick);
    window.createNewBndBox = interruptAllCanvasEventsBeforeFunc.bind(this, createNewBndBoxBtnClick);
    window.addPoints = doNothingIfLabellingOrAddingNewPoints.bind(this, addPointsBtnClick);
    window.removePoint = doNothingIfLabellingInProgress.bind(this, removePolygonPointBtnClick);
    window.cancel = interruptAllCanvasEventsBeforeFunc.bind(this, resetCanvasEventsToDefault);
    window.toggleExportDatasetsPopup = removeButtonPopoverIfActive.bind(this, exportJSON);
    window.uploadDatasets = interruptAllCanvasEventsBeforeMultipleFunc.bind(this,[resetCanvasEventsToDefault, removeButtonPopoverIfActive, uploadDatasetsBtnClick]);
    window.displayMachineLearningModal = interruptAllCanvasEventsBeforeMultipleFunc.bind(this, [resetCanvasEventsToDefault, removeButtonPopoverIfActive, machineLearningBtnClick]);
    window.zoom = doNothingIfNotLeftMouseButtonPressWthArg.bind(this, zoomBtnClick);
    window.toggleSettingsPopup = removeButtonPopoverIfActive.bind(this, settingsBtnClick);
  }

  function initialiseToolkit() {
    initiateToolkitButtonsStyling();
    assignToolkitButtonClickEventHandlers();
  }

  function initialiseLabellerModal() {
    initialiseLabellerModalLocalVariables();
    initialiseLabellerModalOptionsList();
    window.labelShape = labelShape;
    window.cancelLabellingProcess = cancelLabellingProcess;
    window.labellerModalKeyDown = inputKeyDown;
    window.labellerModalInputPaste = pasteLabelText;
    window.selectLabelOption = selectLabelOption;
  }

  function assignWheelEvents() {
    const canvasWrapperParentElement = document.getElementById('canvas-wrapper-parent');
    canvasWrapperParentElement.addEventListener('wheel', initiateZoomOverflowScroll, { passive: true });
  }

  function assignPassiveEventListeners() {
    assignWheelEvents();
  }

  function initialiseShapeManipulationDeltas() {
    if (!IS_FIREFOX && window.screen.width < 1500) {
      setRightBoundingBoxDrawingDelta(2);
      setRightBoundingBoxMovingDelta(2);
      setRightBoundingBoxNewObjectDelta(2);
      setRightBoundingBoxScalingDelta(2);
    } else {
      setRightBoundingBoxDrawingDelta(2.3);
      setRightBoundingBoxMovingDelta(2.3);
      setRightBoundingBoxNewObjectDelta(2.3);
      setRightBoundingBoxScalingDelta(2.4);
    }
  }

  // import { removeNoImagesFoundOnMLModalStyle } from '../../machineLearningModal/views/initiateMachineLearning/style.js';

  // potential to undo and validate in the drag and drop logic,
  // depending on what is being used for upload datasets
  function isFormatValid(file) {
    return file.type.includes('image/');
  }

  // the only function which is exported
  // <input id='uploadImages' type='file' onchange="uploadImages(this)" multiple accept="image/*" hidden />
  // from index.html
  // onerror?
  function uploadImages(uploadData) {
    if (uploadData.files && uploadData.files.length > 0) {
      if (uploadData.files.length === 1) {
        uploadSingleImage(uploadData);
      } else {
        uploadMultipleImages(uploadData);
      }
    }
  }

  //
  // function uploadImages(uploadData) {
  //   console.log("uploadData files test", uploadData.files);
  //       uploadSingleImage(uploadData);
  //
  // }

  function uploadSingleImage(uploadData) {
    if (isFormatValid(uploadData.files[0])) {
      const reader = new FileReader();
      reader.onload = onSingleFileLoad.bind(this, uploadData.files[0]);
      reader.readAsDataURL(uploadData.files[0]);
    }
  }

  // executed from uploadSingleImage();
  // uploads single image
  function onSingleFileLoad(imageMetaData, e) {
    const image = new Image();
    image.src = e.target.result;
    image.onload = onImageLoad;
    addSingleImageToList(imageMetaData, image);
  }

  // uploads several images, but executed once
  function onMultiFileLoad(imageMetadata, isfirstImage, e) {
    const image = new Image();
    image.src = e.target.result;
    if (isfirstImage) {
      image.onload = onImageLoad;
    }
    addImageFromMultiUploadToList(imageMetadata, image, isfirstImage);
  }

  function uploadMultipleImages(uploadData) {

    for (let i = 0; i < uploadData.files.length; i += 1) {
      if (isFormatValid(uploadData.files[0])) {
        const reader = new FileReader();
        const isfirstImage = i === 0;
        reader.onload = onMultiFileLoad.bind(this, uploadData.files[i], isfirstImage);
        reader.readAsDataURL(uploadData.files[i]);
      }
    }
  }

  let bodyElement = null;
  let imageListDragAndDropOverlayElement = null;
  let windowDragAndDropOverlayElement = null;
  let uploadDatasetsDragAndDropOverlayElement = null;
  let uploadDatasetsTable2Element = null;
  let currentlyDisplayedOverlayElement = null;

  function dropHandler(event) {
    // console.log("event", event.dataTransfer);
    return;
   //  if (currentlyDisplayedOverlayElement) {
   //    if (currentlyDisplayedOverlayElement === imageListDragAndDropOverlayElement) {
   //      uploadImages(event.dataTransfer);
   //      console.log("if event", event.dataTransfer);
   //    } else if (currentlyDisplayedOverlayElement === uploadDatasetsDragAndDropOverlayElement) {
   //      uploadDatasetFilesHandler(event.dataTransfer);
   //      console.log("else");
   //    }
   //  }
  }

  function displayDragAndDropOverlays() {
    if (isAnyModalOpen()) {
      if (getUploadDatasetsModalDisplayedState() && getCurrentViewNumber() === 5) {
        windowDragAndDropOverlayElement.style.display = 'block';
        uploadDatasetsDragAndDropOverlayElement.style.height = `${uploadDatasetsTable2Element.clientHeight - 8}px`;
        uploadDatasetsDragAndDropOverlayElement.style.display = 'block';
        currentlyDisplayedOverlayElement = uploadDatasetsDragAndDropOverlayElement;
      }
    } else {
      windowDragAndDropOverlayElement.style.display = 'block';
      imageListDragAndDropOverlayElement.style.display = 'block';
      currentlyDisplayedOverlayElement = imageListDragAndDropOverlayElement;
    }
  }

  function hideDragAndDropOverlays() {
    if (currentlyDisplayedOverlayElement) {
      currentlyDisplayedOverlayElement.style.display = 'none';
      windowDragAndDropOverlayElement.style.display = 'none';
    }
    currentlyDisplayedOverlayElement = null;
  }

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function assignListener(element, events, handler) {
    events.forEach((event) => {
      element.addEventListener(event, handler, false);
    });
  }

  function assignEventListeners() {
    assignListener(windowDragAndDropOverlayElement, ['dragenter', 'dragover', 'dragleave', 'drop'], preventDefaults);
    assignListener(windowDragAndDropOverlayElement, ['drop'], dropHandler);
    assignListener(windowDragAndDropOverlayElement, ['dragleave', 'drop', 'mouseup'], hideDragAndDropOverlays);
    assignListener(bodyElement, ['dragenter'], displayDragAndDropOverlays);
  }

  function assignLocalVariables() {
    bodyElement = document.getElementsByTagName('body')[0];
    imageListDragAndDropOverlayElement = document.getElementById('image-list-drag-and-drop-overlay');
    windowDragAndDropOverlayElement = document.getElementById('window-drag-and-drop-overlay');
    uploadDatasetsDragAndDropOverlayElement = document.getElementById('upload-datasets-drag-and-drop-overlay');
    uploadDatasetsTable2Element = document.getElementById('upload-datasets-modal-upload-datasets-table-2');
  }

  function initialiseDragAndDropFunctionality() {
    assignLocalVariables();
    assignEventListeners();
  }

  function interruptAllCanvasEventsBeforeFuncWInputs( placeHolder, funcObj, input) {
    removeActiveButtonPopover();
    interruptAllCanvasEvents();
    funcObj.resetCanvasEventsToDefault();
    funcObj.uploadImageFiles(input);
  }

  function replaceExistingCanvas(func, func2, direction, event) {

    if (event && !isLeftMouseButtonClick(event)) return;
    removeActiveButtonPopover();
    if (canSwitchImage(direction)) {
      reassignReferenceToNewCanvas();
      interruptAllCanvasEvents();
      if (func) func(direction);
      if (func2) func2();
    }
  }

  function triggeUploadImagesButton() {
    document.getElementById('uploadImages').click();
  }

  function uploadImageFiles(uploadData) {
    discardActiveObject();
    uploadImages(uploadData);
  }

  function initialiseImageListButtonClickEvents() {

    window.switchImage = replaceExistingCanvas.bind(this, switchImage$1, resetCanvasEventsToDefault);
    
    // uploadImages button
    window.triggerImageUpload = removeButtonPopoverIfActive.bind(this, triggeUploadImagesButton);
    window.uploadImages = interruptAllCanvasEventsBeforeFuncWInputs.bind(this, this, { uploadImageFiles, resetCanvasEventsToDefault });
    window.removeImage = doNothingIfNotLeftMouseButtonPress.bind(this, triggerRemoveImage);
  }

  // Local files 
  window.localImageFiles = [
    "https://shekhrozx.github.io/Xnotation/src/storage/images/DJI_0898.JPG",
    "https://shekhrozx.github.io/Xnotation/src/storage/images/DJI_0899.JPG",
    "https://shekhrozx.github.io/Xnotation/src/storage/images/DJI_0900.JPG",
    "https://shekhrozx.github.io/Xnotation/src/storage/images/DJI_0901.JPG",
    "https://shekhrozx.github.io/Xnotation/src/storage/images/DJI_0902.JPG",
    "https://shekhrozx.github.io/Xnotation/src/storage/images/DJI_0903.JPG"
  ];


  // It was executed before uploading an image
  function initialiseImageListFunctionality() {
    initialiseImageList();
    initialiseImageListButtonClickEvents();
    uploadLocalImagesByPath();
  }


  async function uploadLocalImagesByPath(){
    let filePath, response;
    const dataTransfer = new DataTransfer();

    for (let i = 0; i < window.localImageFiles.length; i += 1) {
      filePath = window.localImageFiles[i];
      response = await (await fetch(filePath)).blob();
      const imgFile = new File([response], filePath.split('/').slice(-1), { type: 'image/jpeg' });
      dataTransfer.items.add(imgFile);
    }

    const inputFiles = document.getElementById('uploadImages');
    inputFiles.files = dataTransfer.files;
    uploadImageFiles(inputFiles);

  }

  function interruptNewShapeDrawingWthFunc1OrExecFunc2(func1, func2, element, event) {
    if (event && !isLeftMouseButtonClick(event)) return;
    if (isElement(element) && element.classList.contains('toolkit-button-disabled')) return;
    removeActiveButtonPopover();
    if ((getPolygonDrawingInProgressState() || isLabelling()) && !getContinuousDrawingState()) {
      interruptAllCanvasEvents();
      func1();
    } else if (func2) {
      func2();
    }
  }

  function removeActiveLabelBtnClick() {
    removeActiveLabel();
  }

  function initialiseLabelListButtonClickEvents() {
    window.removeLabel = interruptNewShapeDrawingWthFunc1OrExecFunc2.bind(this,
      resetCanvasEventsToDefault, removeActiveLabelBtnClick);
  }

  function initialiseLabelListFunctionality() {
    initialiseLabelList();
    initialiseLabelListButtonClickEvents();
  }

  function removeImage() {
    this.removeImageCallback();
    closeRemoveImagesModal();
  }

  function cancelRemoveImage() {
    closeRemoveImagesModal();
  }

  function toggleDoNotShowRemoveImageModalAgain() {
    setDoNotShowRemoveImageModalAgainState(!getDoNotShowRemoveImageModalAgainState());
  }

  function assignRemoveImagesModalButtonEventHandlers(removeImageCallback) {
    window.approveRemoveImage = removeImage.bind({ removeImageCallback });
    window.cancelRemoveImage = cancelRemoveImage;
    window.toggleDoNotShowRemoveImageModalAgain = toggleDoNotShowRemoveImageModalAgain;
  }

  function initialiseRemoveImagesModal() {
    initialiseRemoveImagesModalStyling();
    assignRemoveImagesModalButtonEventHandlers(removeImage$1);
  }

  function cancelPulseAnimation(element) {
  }

  function initialisePulseAnimationCancelling() {
    window.cancelPulseAnimation = cancelPulseAnimation;
  }

  // function highlightExportDatasetsButton() {
  //   const beginAnimationImmediately = false;
  //   initiateButtonPulseAnimation(document.getElementById('export-datasets-button'),
  //     'rgb(253 234 180)', 'white', 4, beginAnimationImmediately);
  // }
  // rgb(253 232 174)

  function displayModal(event) {
    event.preventDefault();
    event.returnValue = '';
  }

  function initialiseBrowserExitHandler() {
    window.onbeforeunload = (event) => {
      if (getSessionDirtyState()) {
        displayModal(event);
        //highlightExportDatasetsButton();
        setSessionDirtyState(false);
      }
    };
  }

  // Debugging Mode
  window.DEBUG = true;

  findUserOS();
  applyStyling();

  // Initialized only once, when the page id downloaded, before first image downloaded
  constructCanvas();

  registerHotKeys();
  initialiseToolkit();
  initialiseLabellerModal();
  initialiseSettingsPopup();
  registerWindowMouseEvents();
  initialiseWindowDimService();
  initialiseCoreButtonPopovers();
  assignPassiveEventListeners();
  initialiseRemoveImagesModal();
  initialiseImageListFunctionality();
  initialiseLabelListFunctionality();
  initialiseDragAndDropFunctionality();
  initialiseImageSwitchPanelFunctionality();
  initialisePulseAnimationCancelling();
  initialiseShapeManipulationDeltas();
  initialiseBrowserExitHandler();

})();
