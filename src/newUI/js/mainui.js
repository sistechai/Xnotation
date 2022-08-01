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
        
        const zoomOverflowWrapperParent = window.document.createElement("div");
        zoomOverflowWrapperParent.id = "zoom-overflow-wrapper-parent";
        zoomOverflowWrapperParent.onmousemove = trackMouseMoveEvents;

        const zoomOverflowWrapperInnerContainer = window.document.createElement("div");
        zoomOverflowWrapperInnerContainer.id = "zoom-overflow-wrapper-inner-container";

        const zoomOverflowWrapper = window.document.createElement("div");
        zoomOverflowWrapper.id = "zoom-overflow-wrapper";

        const zoomOverflow = window.document.createElement("div");
        zoomOverflow.id = "zoom-overflow";
        zoomOverflow.onscroll = zoom
        
        this.container.appendChild(mainPanel);
    }
    //#endregion


}
