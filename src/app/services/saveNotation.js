import { getStatementsForCurrentImageToJSON } from '../canvas/objects/allShapes/allShapes.js';
import {getAllImageData} from '../tools/imageList/imageList.js';
import datasetObjectManager from '../tools/uploadDatasetsModal/views/uploadDatasets/datasetObjectManagers/COCOJSONDatasetObjectManager.js';

function initDataSerice() {
    const saveBtn = document.getElementById('saveNotation');

    saveBtn.addEventListener('click', () => {
        var images = getAllImageData();
        var annotJson = getStatementsForCurrentImageToJSON(images);
        var data = [];
        Object.keys(annotJson).forEach(function(key) {
            let elm = annotJson[key];
            if (elm.hasOwnProperty('annotation') && elm.annotation !== null && elm.annotation !== undefined) {
                let item = elm.annotation;
                if (item.rectangles.length > 0 || item.polygons.length > 0 || item.lines.length > 0) {
                    data.push(elm);
                }
            }
        });
        
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

        console.log(dataStr);
    
    });
}



export {
    initDataSerice,
}