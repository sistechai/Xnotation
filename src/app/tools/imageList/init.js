import { initialiseImageList } from './imageList.js';
import initialiseImageListButtonClickEvents from './panelButtons/buttonClickEvents.js';

// It was executed before uploading an image
function initialiseImageListFunctionality() {
  initialiseImageList();
  initialiseImageListButtonClickEvents();
}

export { initialiseImageListFunctionality as default };