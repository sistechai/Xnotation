// const fileURI = {
//     "id": "7a6s87f8sd546as4da87sd",
//     "images": [
//         "DJI_0898.JPG",
//         "DJI_0899.JPG",
//         "DJI_0900.JPG",
//         "DJI_0901.JPG",
//         "DJI_0902.JPG",
//         "DJI_0903.JPG"
//     ]
// }

// const fileURI_encoded = "ewogICAgImlkIjogIjdhNnM4N2Y4c2Q1NDZhczRkYTg3c2QiLAogICAgImltYWdlcyI6IFsKICAgICAgICAiREpJXzA4OTguSlBHIiwKICAgICAgICAiREpJXzA4OTkuSlBHIiwKICAgICAgICAiREpJXzA5MDAuSlBHIiwKICAgICAgICAiREpJXzA5MDEuSlBHIiwKICAgICAgICAiREpJXzA5MDIuSlBHIiwKICAgICAgICAiREpJXzA5MDMuSlBHIgogICAgXQp9"


function fileLoader() {
    var param = new URLSearchParams(window.location.search);
    const imgData = param.get('data') || null;
    if (imgData) {
        try {
            const imgList = JSON.parse(atob(imgData));
            let slopeID = imgList.id;
            let imageNames = imgList.images;
            window.localImageFiles = [];
            for (let i = 0; i < imageNames.length; i += 1) {
                window.localImageFiles.push('/src/storage/images/' + imageNames[i]);
            }
            // console.log(slopeID);
        } catch (e) {
            // console.log(e);
            window.alert('Invalid URL. Please check the URL and try again.');
        }
    }
}


export default fileLoader;