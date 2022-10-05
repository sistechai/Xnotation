/**
 * @author Bryan & Julianna
 * @version 0.1
 * @description This is online Image annotation tool.
 * 
 */

import { findUserOS } from './tools/OS/OSManager.js';
import { applyStyling } from './tools/globalStyling/style.js';

import { constructCanvas } from './canvas/canvas.js';
import { registerHotKeys } from './keyEvents/keyboard/hotKeys.js';

import initialiseToolkit from './tools/toolkit/init.js';
import initialiseLabellerModal from './tools/labellerModal/buttons.js';
import { initialiseSettingsPopup } from './tools/settingsPopup/init.js';
import registerWindowMouseEvents from './keyEvents/mouse/registerEvents.js';
import { initialiseWindowDimService } from './tools/dimWindow/dimWindowService.js';
import { initialiseCoreButtonPopovers } from './tools/globalStyling/buttons/popovers.js';
import assignPassiveEventListeners from './tools/passiveEventListeners/passiveEventListeners.js';

import initialiseRemoveImagesModal from './tools/imageList/removeImages/modal/init.js';
import initialiseImageListFunctionality from './tools/imageList/init.js';
import initialiseLabelListFunctionality from './tools/labelList/init.js';
import initialiseDragAndDropFunctionality from './tools/dragAndDrop/dragAndDrop.js';
import { initialiseImageSwitchPanelFunctionality } from './tools/imageSwitchPanel/style.js';
import { initialisePulseAnimationCancelling } from './tools/utils/buttons/pulseAnimation.js';
import initialiseShapeManipulationDeltas from './canvas/objects/deltaValueSetters/initialiseShapeManipulationDeltas.js';
import initialiseBrowserExitHandler from './tools/browserExit/browserExitHandler.js';

// ------------------------------------------------------------
// Debugging Mode
window.DEBUG = true;


// ------------------------------------------------------------
// Temporarly uploaded image
var param = new URLSearchParams(window.location.search);

const imagePath = param.get('images') || null;
if (imagePath) {
    var imageNames = imagePath.split(',');
    window.localImageFiles = [];
    for (let i = 0; i < imageNames.length; i += 1) {
        window.localImageFiles.push('/src/storage/images/' + imageNames[i]);
    }
}
// ------------------------------------------------------------


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