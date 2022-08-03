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
        mainPanel.appendChild(this.initLabellerModalContainer());
        mainPanel.appendChild(this.initRemoveImagePopupMenu());
        
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

    //#region Labeller modal 
    initLabellerModalContainer() {
        const labellerModalParent = window.document.createElement("div");
        labellerModalParent.hidden = true;
        // Todo: add labellerModalParent mouse events
        //labellerModalParent.onmousemove = trackMouseMoveEvents;
        
        const labellerModalTitle = window.document.createElement("div");
        labellerModalTitle.id = "labeller-modal-title";
        labellerModalTitle.className = "small-title";
        labellerModalTitle.innerHTML = "Label Name:";

        const labellerModalInput = window.document.createElement("input");
        labellerModalInput.id = "labeller-modal-input";
        labellerModalInput.type = "text";
        labellerModalInput.autocomplete = "off";
        labellerModalInput.name = "labelName";
        labellerModalInput.spellcheck = false;
        labellerModalInput.value = "new label";
        // Todo: add labellerModalInput mouse events
        // labellerModalInput.onpaste = labellerModalInputPaste;
        // labellerModalInput.onkeydown = labellerModalInputKeyDown(event, this);

        const labellerModalOptions = window.document.createElement("table");
        labellerModalOptions.id = "labeller-modal-options";

        const labellerChromePopupRight = window.document.createElement("div");
        labellerChromePopupRight.id = "chromium-fake-popup-table-right-border-fix";
        labellerChromePopupRight.className = "chromium-right-border-fix";
        labellerChromePopupRight.style.display = "none";

        const labellerChromePopupBottom = window.document.createElement("div");
        labellerChromePopupBottom.id = "chromium-fake-popup-table-bottom-border-fix";
        labellerChromePopupBottom.className = "chromium-bottom-border-fix";
        labellerChromePopupBottom.style.display = "none";

        const labellerModalButtons = window.document.createElement("div");
        labellerModalButtons.id = "labeller-modal-buttons";
        labellerModalButtons.className = "buttons popup-label-buttons";

        const labellerModalSubmitBtn = window.document.createElement("div");
        labellerModalSubmitBtn.id = "labeller-modal-submit-button";
        labellerModalSubmitBtn.className = "popup-label-button popup-proceed-button";
        labellerModalSubmitBtn.innerHTML = "Submit";
        // Todo: add labellerModalSubmitBtn mouse events
        // labellerModalSubmitBtn.onclick = labelShape;

        const labellerModalCancelBtn = window.document.createElement("div");
        labellerModalCancelBtn.id = "labeller-modal-cancel-button";
        labellerModalCancelBtn.className = "popup-label-button popup-cancel-button";
        labellerModalCancelBtn.innerHTML = "Cancel";

        labellerModalButtons.appendChild(labellerModalSubmitBtn);
        labellerModalButtons.appendChild(labellerModalCancelBtn);
        
        labellerModalParent.appendChild(labellerModalTitle);
        labellerModalParent.appendChild(labellerModalInput);
        labellerModalParent.appendChild(labellerModalOptions);
        labellerModalParent.appendChild(labellerChromePopupRight);
        labellerModalParent.appendChild(labellerChromePopupBottom);
        labellerModalParent.appendChild(labellerModalButtons);

        return labellerModalParent;
    }
    //#endregion

    //#region Remove Image popup menu
    initRemoveImagePopupMenu() {
        const removeImageModalParent = window.document.createElement("div");
        removeImageModalParent.id = "remove-image-modal-parent";
        removeImageModalParent.style.display = "none";
        removeImageModalParent.className = "modal-parent";
        // Todo: add removeImageModalParent mouse events
        // removeImageModalParent.onmousemove = trackMouseMoveEvents;

        const modalTitle = window.document.createElement("div");
        modalTitle.className = "modal-title small-title";
        modalTitle.innerHTML = "Remove Image";

        const modalTitleBorderLine = window.document.createElement("div");
        modalTitleBorderLine.className = "modal-title-border-line";

        const modalDesc = window.document.createElement("div");
        modalDesc.id = "remove-images-modal-description";
        modalDesc.className = "modal-description";
        modalDesc.innerHTML = "Are you sure you want to remove this image?";

        const modalButtons = window.document.createElement("div");
        modalButtons.id = "remove-images-modal-buttons";
        modalButtons.className = "buttons modal-buttons";

        const approveBtn = window.document.createElement("div");
        approveBtn.className = "popup-label-button popup-proceed-button";
        approveBtn.innerHTML = "Yes";
        // Todo: add approveBtn mouse events
        // approveBtn.onclick = approveRemoveImage;

        const canvelBtn = window.document.createElement("div");
        canvelBtn.className = "popup-label-button popup-cancel-button";
        canvelBtn.innerHTML = "No";
        // Todo: add canvelBtn mouse events
        // canvelBtn.onclick = cancelRemoveImage;

        modalButtons.appendChild(approveBtn);
        modalButtons.appendChild(canvelBtn);

        const modalCheckboxParent = window.document.createElement("div");
        modalCheckboxParent.id = "remove-images-modal-checkbox-parent";

        const modalCheckbox = window.document.createElement("input");
        modalCheckbox.id = "remove-images-modal-checkbox";
        modalCheckbox.type = "checkbox";
        modalCheckbox.className = "checkbox";
        modalCheckbox.name = "something";
        // Todo: add modalCheckbox mouse events
        // modalCheckbox.onclick = toggleDoNotShowRemoveImageModalAgain;

        modalCheckboxParent.appendChild(modalCheckbox);
        modalCheckboxParent.appendChild(window.document.createTextNode("Do not show this message again"));

        removeImageModalParent.appendChild(modalTitle);
        removeImageModalParent.appendChild(modalTitleBorderLine);
        removeImageModalParent.appendChild(modalDesc);
        removeImageModalParent.appendChild(modalButtons);
        removeImageModalParent.appendChild(modalCheckboxParent);

        return removeImageModalParent;
    }
    //#endregion

    // #region Settings popup menu
    initSettingsPopupMenu() {
        const settingPopup = window.document.createElement("div");
        settingPopup.id = "settings-popup";
        settingPopup.className = "settings-popup-item";

        const settingsTable = window.document.createElement("table");
        settingsTable.id = "settings-table";
        settingsTable.className = "settings-popup-item";

            // #region Settings Table Row 1 
            const settingsTableRow1 = window.document.createElement("tr");
            // Todo: add settingsTableRow1 mouse events
            // settingsTableRow1.onmouseenter = hideBoundingBoxCrosshairDropdown;
                
                const settingsTableRow1Col1 = window.document.createElement("td");
                settingsTableRow1Col1.className = "settings-popup-item settings-table-row-data";
                
                    const settingsPopupItem = window.document.createElement("div");
                    settingsPopupItem.className = "settings-popup-item checkbox-text";
                    settingsPopupItem.innerHTML = "Label Visibility";
                    // Todo: add settingsPopupItem mouse events
                    // settingsPopupItem.onclick = toggleLabelVisibility(true);

                    const visilityCheckbox = window.document.createElement("input");
                    visilityCheckbox.id = "settings-popup-labels-visibility-checkbox";
                    visilityCheckbox.className = "settings-popup-item checkbox settings-checkbox";
                    visilityCheckbox.type = "checkbox";
                    visilityCheckbox.name = "something";
                    // Todo: add visilityCheckbox mouse events
                    // visilityCheckbox.onclick = toggleLabelVisibility();


                settingsTableRow1Col1.appendChild(settingsPopupItem);
                settingsTableRow1Col1.appendChild(visilityCheckbox);
            
            settingsTableRow1.appendChild(settingsTableRow1Col1);
            // #endregion

            // #region Settings Table Row 2
            const settingsTableRow2 = window.document.createElement("tr");
            // Todo: add settingsTableRow2 mouse events
            // settingsTableRow2.onmouseenter = hideBoundingBoxCrosshairDropdown;

                const settingsTableRow2Col1 = window.document.createElement("td");
                settingsTableRow2Col1.className = "settings-popup-item settings-table-row-data";

                    const settingsPopupItem2 = window.document.createElement("div");
                    settingsPopupItem2.className = "settings-popup-item checkbox-text";
                    settingsPopupItem2.innerHTML = "movable Objects";
                    // Todo: add settingsPopupItem2 mouse events
                    // settingsPopupItem2.onclick = toggleMovableObjects(true);

                    const movableObjectsCheckbox = window.document.createElement("input");
                    movableObjectsCheckbox.id = "settings-popup-movable-objects-checkbox";
                    movableObjectsCheckbox.className = "settings-popup-item checkbox settings-checkbox";
                    movableObjectsCheckbox.type = "checkbox";
                    movableObjectsCheckbox.name = "something";
                    // Todo: add movableObjectsCheckbox mouse events
                    // movableObjectsCheckbox.onclick = toggleMovableObjects();
                
                settingsTableRow2Col1.appendChild(settingsPopupItem2);
                settingsTableRow2Col1.appendChild(movableObjectsCheckbox);

            settingsTableRow2.appendChild(settingsTableRow2Col1);
            // #endregion

            // #region Settings Table Row 3
            const settingsTableRow3 = window.document.createElement("tr");
            // Todo: add settingsTableRow3 mouse events
            // settingsTableRow3.onmouseenter = hideBoundingBoxCrosshairDropdown;

                const settingsTableRow3Col1 = window.document.createElement("td");
                settingsTableRow3Col1.className = "settings-popup-item settings-table-row-data";

                    const settingsPopupItem3 = window.document.createElement("div");
                    settingsPopupItem3.className = "settings-popup-item checkbox-text";
                    settingsPopupItem3.innerHTML = "Continuous Drawing";
                    // Todo: add settingsPopupItem3 mouse events
                    // settingsPopupItem3.onclick = toggleContinuousDrawing(true);

                    const continuousDrawingCheckbox = window.document.createElement("input");
                    continuousDrawingCheckbox.id = "settings-popup-continuous-drawing-checkbox";
                    continuousDrawingCheckbox.className = "settings-popup-item checkbox settings-checkbox";
                    continuousDrawingCheckbox.type = "checkbox";
                    continuousDrawingCheckbox.name = "something";
                    // Todo: add continuousDrawingCheckbox mouse events
                    // continuousDrawingCheckbox.onclick = toggleContinuousDrawing();

                settingsTableRow3Col1.appendChild(settingsPopupItem3);
                settingsTableRow3Col1.appendChild(continuousDrawingCheckbox);

            settingsTableRow3.appendChild(settingsTableRow3Col1);
            // #endregion

            // #region Settings Table Row 4
            const settingsTableRow4 = window.document.createElement("tr");

                const settingsTableRow4Col1 = window.document.createElement("td");
                settingsTableRow4Col1.className = "settings-popup-item settings-table-row-data";

                    const settingsPopupItem4 = window.document.createElement("div");
                    settingsPopupItem4.className = "settings-popup-item checkbox-text";
                    settingsPopupItem4.innerHTML = "Bounding box Crosshair";

                    const dropdownTrigger = window.document.createElement("div");
                    dropdownTrigger.className = "settings-popup-item checkbox settings-checkbox";
                    dropdownTrigger.id = "settings-popup-bounding-box-crosshair-dropdown-trigger";
                    dropdownTrigger.innerHTML = "&#x25BA;";
                    dropdownTrigger.name = "something";
                    // Todo: add dropdownTrigger mouse events
                    // dropdownTrigger.onclick = toggleBoundingBoxCrosshairDropdown;

                    const crosshairDropdown = window.document.createElement("div");
                    crosshairDropdown.id = "bounding-box-crosshair-dropdown";
                    crosshairDropdown.className = "settings-popup-item";

                        const crosshairDropdownTable = window.document.createElement("table");
                        crosshairDropdownTable.id = "bounding-box-crosshair-dropdown-table";
                        crosshairDropdownTable.className = "settings-popup-item";

                            const crosshairDropdownTableRow1 = window.document.createElement("tr");

                                const crosshairDropdownTableRow1Col1 = window.document.createElement("td");
                                crosshairDropdownTableRow1Col1.className = "settings-popup-item settings-table-row-data";

                                    const crosshairDropdownItem = window.document.createElement("div");
                                    crosshairDropdownItem.className = "settings-popup-item checkbox-text";
                                    crosshairDropdownItem.innerHTML = "Visibility";
                                    // Todo: add crosshairDropdownItem mouse events
                                    // crosshairDropdownItem.onclick = toggleCrosshair(true);

                                    const crosshairCheckbox = window.document.createElement("input");
                                    crosshairCheckbox.id = "settings-popup-bounding-box-crosshair-visibility-checkbox";
                                    crosshairCheckbox.className = "settings-popup-item bounding-box-crosshair-dropdown-icon checkbox settings-checkbox";
                                    crosshairCheckbox.type = "checkbox";
                                    crosshairCheckbox.name = "something";
                                    crosshairCheckbox.checked = true;
                                    // Todo: add crosshairCheckbox mouse events
                                    // crosshairCheckbox.onclick = toggleCrosshair();

                                crosshairDropdownTableRow1Col1.appendChild(crosshairDropdownItem);
                                crosshairDropdownTableRow1Col1.appendChild(crosshairCheckbox);

                            crosshairDropdownTableRow1.appendChild(crosshairDropdownTableRow1Col1);
                            



    }
    // #endregion



}
