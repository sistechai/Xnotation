import { initialiseImageList } from './imageList.js';
import {
  initialiseImageListButtonClickEvents,
  uploadImageFiles
} from './panelButtons/buttonClickEvents.js';



// Local files 
// window.localImageFiles = [
//   "https://sistechai.github.io/Xnotation/src/storage/images/DJI_0898.JPG",
//   "https://sistechai.github.io/Xnotation/src/storage/images/DJI_0899.JPG",
//   "https://sistechai.github.io/Xnotation/src/storage/images/DJI_0900.JPG",
//   "https://sistechai.github.io/Xnotation/src/storage/images/DJI_0901.JPG",
//   "https://sistechai.github.io/Xnotation/src/storage/images/DJI_0902.JPG",
//   "https://sistechai.github.io/Xnotation/src/storage/images/DJI_0903.JPG"
// ];


// It was executed before uploading an image
function initialiseImageListFunctionality() {
  initialiseImageList();
  initialiseImageListButtonClickEvents();
  uploadLocalImagesByPath();
}


async function uploadLocalImagesByPath(){
  if (window.localImageFiles) {
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

}


export { initialiseImageListFunctionality as default };