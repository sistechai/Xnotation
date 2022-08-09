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
        mainPanel.appendChild(this.initSettingsPopupMenu());
        mainPanel.appendChild(this.initLeftMenuBar());
        mainPanel.appendChild(this.initRightSideBar());
        
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

                            // #region row1
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
                            // #endregion

                            // #region row2
                            const crosshairDropdownTableRow2 = window.document.createElement("tr");

                                const crosshairDropdownTableRow2Col1 = window.document.createElement("td");
                                crosshairDropdownTableRow2Col1.className = "settings-popup-item settings-table-row-data";

                                    const crosshairDropdownItem2 = window.document.createElement("div");
                                    crosshairDropdownItem2.className = "settings-popup-item checkbox-text";
                                    crosshairDropdownItem2.innerHTML = "Color";

                                    const crosshairColorPicker = window.document.createElement("input");
                                    crosshairColorPicker.id = "settings-popup-bounding-box-crosshair-color-picker";
                                    crosshairColorPicker.className = "settings-popup-item bounding-box-crosshair-dropdown-icon checkbox settings-checkbox";
                                    crosshairColorPicker.type = "color";
                                    crosshairColorPicker.value = "#ffffff";
                                    // Todo: add crosshairColorPicker mouse events
                                    // crosshairColorPicker.oninput = crosshairColorChange(this);
                                
                                crosshairDropdownTableRow2Col1.appendChild(crosshairDropdownItem2);
                                crosshairDropdownTableRow2Col1.appendChild(crosshairColorPicker);

                            crosshairDropdownTableRow2.appendChild(crosshairDropdownTableRow2Col1);
                            // #endregion

                        crosshairDropdownTable.appendChild(crosshairDropdownTableRow1);
                        crosshairDropdownTable.appendChild(crosshairDropdownTableRow2);
                    
                    crosshairDropdown.appendChild(crosshairDropdownTable);
                
                settingsTableRow4Col1.appendChild(settingsPopupItem4);
                settingsTableRow4Col1.appendChild(dropdownTrigger);
                settingsTableRow4Col1.appendChild(crosshairDropdown);

            settingsTableRow4.appendChild(settingsTableRow4Col1);
            // #endregion

        settingsTable.appendChild(settingsTableRow1);
        settingsTable.appendChild(settingsTableRow2);
        settingsTable.appendChild(settingsTableRow3);
        settingsTable.appendChild(settingsTableRow4);

        settingPopup.appendChild(settingsTable);

        return settingPopup;
    }
    // #endregion

    // #region Left menu bar
    initLeftMenuBar() {
        const leftSideBar = window.document.createElement("div");
        leftSideBar.id = "left-side-bar";

            const leftSideBarTopBorder = window.document.createElement("div");
            leftSideBarTopBorder.id = "left-side-bar-top-border";
            leftSideBar.appendChild(leftSideBarTopBorder);

            // ---------------------------------------------------------------------------------------------------------------------
            const editShapesBtn = window.document.createElement("button");
            editShapesBtn.id = "edit-shapes-button";
            editShapesBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add editShapesBtn mouse events
            // editShapesBtn.onmouseup = editShapes(this, event);
            
                const editShapesBtnIcon = window.document.createElement("img");
                editShapesBtnIcon.id = "edit-shapes-icon";
                editShapesBtnIcon.className = "toolkit-button-icon";
                editShapesBtnIcon.src = "../assets/svg/interface.svg";
                editShapesBtnIcon.alt = "visibility";
                editShapesBtnIcon.draggable = false;

            editShapesBtn.appendChild(editShapesBtnIcon);

            const editShapesBtnHover = window.document.createElement("div");
            editShapesBtnHover.id = "default-button-popover";
            editShapesBtnHover.className = "core-button-hover-popover";
            editShapesBtnHover.innerHTML = "Edit shapes (E)";

            leftSideBar.appendChild(editShapesBtn);
            leftSideBar.appendChild(editShapesBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const createLineBtn = window.document.createElement("button");
            createLineBtn.id = "create-line-button";
            createLineBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add createLineBtn mouse events
            // createLineBtn.onmouseup = createNewLine(event);

                const newLineBtnIcon = window.document.createElement("img");
                newLineBtnIcon.id = "new-line-icon";
                newLineBtnIcon.className = "toolkit-button-icon";
                newLineBtnIcon.src = "../assets/svg/line.svg";
                newLineBtnIcon.alt = "visibility";
                newLineBtnIcon.draggable = false;

            createLineBtn.appendChild(newLineBtnIcon);

            const newLineBtnHover = window.document.createElement("div");
            newLineBtnHover.id = "line-button-popover";
            newLineBtnHover.className = "core-button-hover-popover";
            newLineBtnHover.innerHTML = "New Line (L)";

            leftSideBar.appendChild(createLineBtn);
            leftSideBar.appendChild(newLineBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const boudingBoxBtn = window.document.createElement("button");
            boudingBoxBtn.id = "create-bounding-box-button";
            boudingBoxBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add boudingBoxBtn mouse events
            // boudingBoxBtn.onmouseup = createNewBndBox(event);

                const bndBoxBtnIcon = window.document.createElement("img");
                bndBoxBtnIcon.id = "new-bounding-box-icon";
                bndBoxBtnIcon.className = "toolkit-button-icon";
                bndBoxBtnIcon.src = "../assets/svg/method-draw-image (13).svg";
                bndBoxBtnIcon.alt = "visibility";
                bndBoxBtnIcon.draggable = false;

            boudingBoxBtn.appendChild(bndBoxBtnIcon);

            const bndBoxBtnHover = window.document.createElement("div");
            bndBoxBtnHover.id = "bounding-box-button-popover";
            bndBoxBtnHover.className = "core-button-hover-popover";
            bndBoxBtnHover.innerHTML = "New Bounding box (W)";

            leftSideBar.appendChild(boudingBoxBtn);
            leftSideBar.appendChild(bndBoxBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const createPolygonBtn = window.document.createElement("button");
            createPolygonBtn.id = "create-polygon-button";
            createPolygonBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            createPolygonBtn.type = "button";
            // Todo: add createPolygonBtn mouse events
            // createPolygonBtn.onmouseup = createNewPolygon(event);

                const newPolygonBtnIcon = window.document.createElement("img");
                newPolygonBtnIcon.id = "new-polygon-icon";
                newPolygonBtnIcon.className = "toolkit-button-icon";
                newPolygonBtnIcon.src = "../assets/svg/method-draw-image (60).svg";
                newPolygonBtnIcon.alt = "visibility";
                newPolygonBtnIcon.draggable = false;

            createPolygonBtn.appendChild(newPolygonBtnIcon);

            const newPolygonBtnHover = window.document.createElement("div");
            newPolygonBtnHover.id = "polygon-button-popover";
            newPolygonBtnHover.className = "core-button-hover-popover";
            newPolygonBtnHover.innerHTML = "New Polygon (Q)";

            leftSideBar.appendChild(createPolygonBtn);
            leftSideBar.appendChild(newPolygonBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const addPointsBtn = window.document.createElement("button");
            addPointsBtn.id = "add-points-button";
            addPointsBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add addPointBtn mouse events
            // addPointBtn.onmouseup = addPoints(event);

                const addPointsBtnIcon = window.document.createElement("img");
                addPointsBtnIcon.id = "add-points-icon";
                addPointsBtnIcon.className = "toolkit-button-icon";
                addPointsBtnIcon.src = "../assets/svg/method-draw-image (70).svg";
                addPointsBtnIcon.alt = "visibility";
                addPointsBtnIcon.draggable = false;

            addPointsBtn.appendChild(addPointsBtnIcon);

            const addPointsBtnHover = window.document.createElement("div");
            addPointsBtnHover.id = "add-points-button-popover";
            addPointsBtnHover.className = "core-button-hover-popover small-core-button-hover-popover-v-position";
            addPointsBtnHover.innerHTML = "Add points to Polygon (A)";

            leftSideBar.appendChild(addPointsBtn);
            leftSideBar.appendChild(addPointsBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const removePointsBtn = window.document.createElement("button");
            removePointsBtn.id = "remove-points-button";
            removePointsBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add removePointsBtn mouse events
            // removePointsBtn.onmouseup = removePoint(this, event);

                const removePointsBtnIcon = window.document.createElement("img");
                removePointsBtnIcon.id = "remove-points-icon";
                removePointsBtnIcon.className = "toolkit-button-icon";
                removePointsBtnIcon.src = "../assets/svg/method-draw-image (69).svg";
                removePointsBtnIcon.alt = "visibility";
                removePointsBtnIcon.draggable = false;

            removePointsBtn.appendChild(removePointsBtnIcon);

            const removePointsBtnHover = window.document.createElement("div");
            removePointsBtnHover.id = "remove-points-button-popover";
            removePointsBtnHover.className = "core-button-hover-popover small-core-button-hover-popover-v-position";
            removePointsBtnHover.innerHTML = "Remove Polygon Points (R)";

            leftSideBar.appendChild(removePointsBtn);
            leftSideBar.appendChild(removePointsBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const sideBarSeprator = window.document.createElement("div");
            sideBarSeprator.id = "left-side-bar-separator";
            leftSideBar.appendChild(sideBarSeprator);

            // ---------------------------------------------------------------------------------------------------------------------
            const zoomInBtn = window.document.createElement("button");
            zoomInBtn.id = "zoom-in-button";
            zoomInBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add zoomInBtn mouse events
            // zoomInBtn.onmouseup = zoom('in', event);

                const zoomInBtnIcon = window.document.createElement("img");
                zoomInBtnIcon.id = "zoom-in-icon";
                zoomInBtnIcon.className = "toolkit-button-icon";
                zoomInBtnIcon.src = "../assets/svg/multimedia (1).svg";
                zoomInBtnIcon.alt = "visibility";
                zoomInBtnIcon.draggable = false;

            zoomInBtn.appendChild(zoomInBtnIcon);

            const zoomInBtnHover = window.document.createElement("div");
            zoomInBtnHover.id = "zoom-in-button-popover";
            zoomInBtnHover.className = "core-button-hover-popover";
            zoomInBtnHover.innerHTML = "Zoom In";

            leftSideBar.appendChild(zoomInBtn);
            leftSideBar.appendChild(zoomInBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const zoomOutBtn = window.document.createElement("button");
            zoomOutBtn.id = "zoom-out-button";
            zoomOutBtn.className = "toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add zoomOutBtn mouse events
            // zoomOutBtn.onmouseup = zoom('out', event);

                const zoomOutBtnIcon = window.document.createElement("img");
                zoomOutBtnIcon.id = "zoom-out-icon";
                zoomOutBtnIcon.className = "toolkit-button-icon";
                zoomOutBtnIcon.src = "../assets/svg/magnifying-glass.svg";
                zoomOutBtnIcon.alt = "visibility";
                zoomOutBtnIcon.draggable = false;

            zoomOutBtn.appendChild(zoomOutBtnIcon);

            const zoomOutBtnHover = window.document.createElement("div");
            zoomOutBtnHover.id = "zoom-out-button-popover";
            zoomOutBtnHover.className = "core-button-hover-popover";
            zoomOutBtnHover.innerHTML = "Zoom Out";

            leftSideBar.appendChild(zoomOutBtn);
            leftSideBar.appendChild(zoomOutBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const settingsBtn = window.document.createElement("button");
            settingsBtn.id = "settings-button";
            settingsBtn.className = "settings-popup-item toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add settingsBtn mouse events
            // settingsBtn.onmouseup = toggleSettingsPopup(event);

                const settingsBtnIcon = window.document.createElement("img");
                settingsBtnIcon.id = "settings-icon";
                settingsBtnIcon.className = "settings-popup-item toolkit-button-icon";
                settingsBtnIcon.src = "../assets/svg/cogwheels.svg";
                settingsBtnIcon.alt = "visibility";
                settingsBtnIcon.draggable = false;

            settingsBtn.appendChild(settingsBtnIcon);

            const settingsBtnHover = window.document.createElement("div");
            settingsBtnHover.id = "upload-datasets-button-popover";
            settingsBtnHover.className = "core-button-hover-popover";
            settingsBtnHover.innerHTML = "Upload Datasets";

            leftSideBar.appendChild(settingsBtn);
            leftSideBar.appendChild(settingsBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------
            const exportDatasetsBtn = window.document.createElement("button");
            exportDatasetsBtn.id = "export-datasets-button";
            exportDatasetsBtn.className = "export-datasets-popup-item toolkit-button toolkit-button-default toolkit-button-table-cell";
            // Todo: add exportDatasetsBtn mouse events
            // exportDatasetsBtn.onmouseup = toggleExportDatasetsPopup(event);
            // exportdatasetsBtn.onmouseenter = cancelPulseAnimation(this);

                const exportDatasetsBtnIcon = window.document.createElement("img");
                exportDatasetsBtnIcon.id = "export-datasets-icon";
                exportDatasetsBtnIcon.className = "export-datasets-popup-item toolkit-button-icon";
                exportDatasetsBtnIcon.src = "../assets/svg/method-draw-image - 2020-05-03T194003.376.svg";
                exportDatasetsBtnIcon.alt = "visibility";
                exportDatasetsBtnIcon.draggable = false;

            exportDatasetsBtn.appendChild(exportDatasetsBtnIcon);

            const exportDatasetsBtnHover = window.document.createElement("div");
            exportDatasetsBtnHover.id = "settings-button-popover";
            exportDatasetsBtnHover.className = "core-button-hover-popover";
            exportDatasetsBtnHover.innerHTML = "Settings";

            leftSideBar.appendChild(exportDatasetsBtn);
            leftSideBar.appendChild(exportDatasetsBtnHover);

            // ---------------------------------------------------------------------------------------------------------------------

        return leftSideBar;
    }
    // #endregion

    // #region Right Side Bar
    initRightSideBar() {
        const rightSideBar = window.document.createElement("div");
        rightSideBar.id = "right-side-bar";

            const rightSideBarComponents = window.document.createElement("div");
            rightSideBarComponents.id = "right-side-bar-components";

                // ---------------------------------------------------------------------------------------------------------------------
                const labelListComponent = window.document.createElement("div");
                labelListComponent.id = "label-list-component";
                labelListComponent.className = "right-side-bar-component";

                    const labelListTitleParent = window.document.createElement("div");
                    labelListTitleParent.id = "label-list-title-parent";
                    labelListTitleParent.className = "right-side-bar-component-title";

                        const titleText = window.document.createElement("div");
                        titleText.className = "right-side-bar-title-text";
                        titleText.innerHTML = "Labels:";

                        const removeLabelBtnContainer = window.document.createElement("div");
                        removeLabelBtnContainer.id = "remove-labels-button-container";
                        removeLabelBtnContainer.className = "remove-objects-button-container";

                            const removeLabelsBtn = window.document.createElement("button");
                            removeLabelsBtn.id = "remove-labels-button";
                            removeLabelsBtn.className = "toolkit-button toolkit-button-default remove-objects-button";

                                const removeLabelsBtnIcon = window.document.createElement("img");
                                removeLabelsBtnIcon.className = "remove-objects-button-icon";
                                removeLabelsBtnIcon.src = "../assets/svg/rubbish-can.svg";
                                removeLabelsBtnIcon.alt = "visibility";
                                removeLabelsBtnIcon.draggable = false;
                                // Todo: add removeLabelsBtn mouse events
                                // removeLabelsBtn.onmouseup = removeLabels(this, event);

                            removeLabelsBtn.appendChild(removeLabelsBtnIcon);

                        removeLabelBtnContainer.appendChild(removeLabelsBtn);

                        const removeLabelsBtnPopover = window.document.createElement("div");
                        removeLabelsBtnPopover.id = "remove-labels-button-popover";
                        removeLabelsBtnPopover.className = "core-button-hover-popover label-list-button-hover-popover-v-poisition";
                        removeLabelsBtnPopover.innerHTML = "Remove Label";
                    
                    labelListTitleParent.appendChild(titleText);
                    labelListTitleParent.appendChild(removeLabelBtnContainer);
                    labelListTitleParent.appendChild(removeLabelsBtnPopover);

                    const labelListOverflowParent = window.document.createElement("div");
                    labelListOverflowParent.id = "label-list-overflow-parent";
                    // Todo: add labelListOverflowParent mouse events
                    // labelListOverflowParent.onmouseup = labelListScroll();

                        const labelListTable = window.document.createElement("table");
                        labelListTable.id = "label-list";

                    labelListOverflowParent.appendChild(labelListTable);

                labelListComponent.appendChild(labelListTitleParent);
                labelListComponent.appendChild(labelListOverflowParent);
                // ---------------------------------------------------------------------------------------------------------------------

                const imgListComponent = window.document.createElement("div");
                imgListComponent.id = "image-list-component";
                imgListComponent.className = "right-side-bar-component";

                    const imgListTitleParent = window.document.createElement("div");
                    imgListTitleParent.id = "image-list-title-parent";
                    imgListTitleParent.className = "right-side-bar-component-title";


                        const imgtitleText = window.document.createElement("div");
                        imgtitleText.className = "right-side-bar-title-text";
                        imgtitleText.innerHTML = "Images:";

                        const uploadImg = window.document.createElement("input");
                        uploadImg.id = "uploadImages";
                        uploadImg.type = "file";
                        uploadImg.multiple = true;
                        uploadImg.accept = "image/*";
                        uploadImg.hidden = true;
                        // Todo: add uploadImg mouse events
                        // uploadImg.onchange = uploadImages(this);

                        const uploadImgBtn = window.document.createElement("button");
                        uploadImgBtn.id = "upload-images-button";
                        uploadImgBtn.className = "toolkit-button toolkit-button-default";
                        uploadImgBtn.innerHTML = "Upload Images";
                        uploadImgBtn.style.paddingRight = "9px";
                        // Todo: add uploadImgBtn mouse events
                        // uploadImgBtn.onmouseup = triggerImageUpload(event);

                            const uploadImgBtnIcon = window.document.createElement("img");
                            uploadImgBtnIcon.id = "upload-images-icon";
                            uploadImgBtnIcon.src = "../assets/svg/method-draw-image - 2020-05-05T022144.694.svg";
                            uploadImgBtnIcon.alt = "visibility";
                            uploadImgBtnIcon.draggable = false;

                        uploadImgBtn.appendChild(uploadImgBtnIcon);

                        const uploadImgBtnPopover = window.document.createElement("div");
                        uploadImgBtnPopover.id = "upload-images-button-popover";
                        uploadImgBtnPopover.className = "core-button-hover-popover image-list-button-hover-popover-v-position";
                        uploadImgBtnPopover.innerHTML = "Upload Images";

                    imgListTitleParent.appendChild(imgtitleText);
                    imgListTitleParent.appendChild(uploadImg);
                    imgListTitleParent.appendChild(uploadImgBtn);
                    imgListTitleParent.appendChild(uploadImgBtnPopover);

                    const imgListDragDropOverlay = window.document.createElement("div");
                    imgListDragDropOverlay.id = "image-list-drag-and-drop-overlay";
                    imgListDragDropOverlay.style.display = "none";

                    const imgListContainer = window.document.createElement("div");
                    imgListContainer.id = "image-list-image-container";

                imgListComponent.appendChild(imgListTitleParent);
                imgListComponent.appendChild(imgListDragDropOverlay);
                imgListComponent.appendChild(imgListContainer);
                // ---------------------------------------------------------------------------------------------------------------------
            
            rightSideBarComponents.appendChild(labelListComponent);
            rightSideBarComponents.appendChild(imgListComponent);

        rightSideBar.appendChild(rightSideBarComponents);

        return rightSideBar;
    }
    // #endregion

    // #region Top panel Image switch panel
    initTopImageSwitchPanel() {
        const imgSwitchPanel = window.document.createElement("div");
        imgSwitchPanel.id = "image-switch-panel";

            const imgSwitchContents = window.document.createElement("div");
            imgSwitchContents.id = "image-switch-contents";

                const prvImgBtn = window.document.createElement("button");
                prvImgBtn.id = "previous-image-button";
                prvImgBtn.className = "toolkit-button toolkit-button-disabled image-switch-button image-switch-button-disabled";
                prvImgBtn.innerHTML = "&lt;";
                // Todo: add prvImgBtn mouse events
                // prvImgBtn.onclick = switchImage('previous', event);

                    const prvImgBtnPopover = window.document.createElement("div");
                    prvImgBtnPopover.id = "previous-image-button-popover";
                    prvImgBtnPopover.className = "core-button-hover-popover image-switch-button-hover-popover";
                    prvImgBtnPopover.innerHTML = "Previous Image (";
                    
                        const leftArrowBtn = window.document.createElement("div");
                        leftArrowBtn.id = "image-switch-button-popover-arrow-left";
                        leftArrowBtn.className = "image-switch-button-popover-arrow";
                        leftArrowBtn.innerHTML = "&lt;";

                        const prvImgBtnBrct = window.document.createElement("div");
                        prvImgBtnBrct.className = "image-switch-button-popover-closing-bracket";
                        prvImgBtnBrct.innerHTML = ")";

                    prvImgBtnPopover.appendChild(leftArrowBtn);
                    prvImgBtnPopover.appendChild(prvImgBtnBrct);

                prvImgBtn.appendChild(prvImgBtnPopover);

                const imgName = window.document.createElement("div");
                imgName.id = "image-name";
                imgName.innerHTML = "Image name";

                const nxtImgBtn = window.document.createElement("button");
                nxtImgBtn.id = "next-image-button";
                nxtImgBtn.className = "toolkit-button toolkit-button-disabled image-switch-button image-switch-button-disabled";
                nxtImgBtn.innerHTML = "&gt;";
                // Todo: add nxtImgBtn mouse events
                // nxtImgBtn.onclick = switchImage('next', event);

                    const nxtImgBtnPopover = window.document.createElement("div");
                    
    }
    // #endregion




}
