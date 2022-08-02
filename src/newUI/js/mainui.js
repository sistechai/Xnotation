const version = "0.1";

class Xnotation {
    constructor(config) {
        this.container = window.document.getElementById(config.container);
    }

    init() {
        this.initCrosshair(); // init crosshair line XY
        this.initHeaderPanel(); // init header panel
        this.initMainPanel(); // init main panel


        console.log(this.container)
    }

    //#region Crosshair
    initCrosshair() {
        const crossLineX = window.document.createElement("div");
        crossLineX.className = "crossshair-line";
        crossLineX.id = "crosshair-line-x";
        this.container.appendChild(crossLineX);

        const crossLineY = window.document.createElement("div");
        crossLineY.className = "crossshair-line";
        crossLineY.id = "crosshair-line-y";
        this.container.appendChild(crossLineY);
    }
    //#endregion
    //#region Header panel
    initHeaderPanel() {
        const headerPanel = window.document.createElement("div");
        headerPanel.id = "title-panel";
        
        const img = window.document.createElement("img");
        img.id = "title-logo";
        img.src = "../assets/svg/eye 88.svg";
        img.draggable = false;
        img.alt = "visibility";
        
        const titleText = window.document.createElement("div");
        titleText.id = "title-text";
        titleText.innerHTML = "Xnotation";
        
        headerPanel.appendChild(img);
        headerPanel.appendChild(titleText);
        this.container.appendChild(headerPanel);
    }
    //#endregion
    //#region Main panel
    initMainPanel() {
        const mainPanel = window.document.createElement("div");
        mainPanel.id = "base";
        
        mainPanel.appendChild(this.initZoomOverflowContainer());
        mainPanel.appendChild(this.initCanvasWrapperContainer());
        
        this.container.appendChild(mainPanel);
    }
    //#endregion
    //#region Zoom Overflow Container
    initZoomOverflowContainer() {
        const zoomOverflowWrapperParent = window.document.createElement("div");
        zoomOverflowWrapperParent.id = "zoom-overflow-wrapper-parent";
        // Todo: add zoom Wrapper mouse events
        // zoomOverflowWrapperParent.onmousemove = trackMouseMoveEvents;

        const zoomOverflowWrapperInnerContainer = window.document.createElement("div");
        zoomOverflowWrapperInnerContainer.id = "zoom-overflow-wrapper-inner-container";

        const zoomOverflowWrapper = window.document.createElement("div");
        zoomOverflowWrapper.id = "zoom-overflow-wrapper";

        const zoomOverflow = window.document.createElement("div");
        zoomOverflow.id = "zoom-overflow";
        // Todo: add zoom Overflow mouse events
        // zoomOverflow.onscroll = zoomOverflowScroll(zoomOverflow);

        const stub = window.document.createElement("div");
        stub.id = "stub";
        stub.innerHTML = ".";

        zoomOverflow.appendChild(stub);
        zoomOverflowWrapper.appendChild(zoomOverflow);
        zoomOverflowWrapperInnerContainer.appendChild(zoomOverflowWrapper);
        zoomOverflowWrapperParent.appendChild(zoomOverflowWrapperInnerContainer);
        return zoomOverflowWrapperParent;
    }
    //#endregion

    //#region Canvas Wrapper Container
    initCanvasWrapperContainer() {
        const canvasWrapperParent = window.document.createElement("div");
        canvasWrapperParent.id = "canvas-wrapper-parent";
        canvasWrapperParent.onmouseover = "return false";
        // Todo: add canvasWrapperParent mouse events
        // canvasWrapperParent.onmousemove = trackMouseMoveEvents;

        const canvasWrapper = window.document.createElement("div");
        canvasWrapper.id = "canvas-wrapper";
        // Todo: add canvasWrapper mouse events
        // canvasWrapper.onmouseover = mouseOverCanvas;
        // canvasWrapper.onmouseout = mouseOutCanvas;

        const canvasAbsoluteContainer2 = window.document.createElement("div");
        canvasAbsoluteContainer2.id = "canvas-absolute-container-2";
        canvasAbsoluteContainer2.className = "canvas-absolute-container";

        const canvasD = window.document.createElement("canvas");
        canvasD.id = "d";
        canvasAbsoluteContainer2.appendChild(canvasD);

        const canvasAbsoluteContainer1 = window.document.createElement("div");
        canvasAbsoluteContainer1.id = "canvas-absolute-container-1";
        canvasAbsoluteContainer1.className = "canvas-absolute-container";

        const canvasC = window.document.createElement("canvas");
        canvasC.id = "c";
        canvasAbsoluteContainer1.appendChild(canvasC);

        canvasWrapper.appendChild(canvasAbsoluteContainer2);
        canvasWrapper.appendChild(canvasAbsoluteContainer1);

        canvasWrapperParent.appendChild(canvasWrapper);

        return canvasWrapperParent;
    }
    //#endregion

    


}
