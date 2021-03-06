/* 
 This file was generated by Dashcode and is covered by the 
 license.txt included in the project.  You may edit this file, 
 however it is recommended to first turn off the Dashcode 
 code generator otherwise the changes will be lost.
 */

// Note: The Header part is considered private and subject to change in future Dashcode releases.
// Note: Properties and methods beginning with underbar ("_") are considered private and subject to change in future Dashcode releases.

function CreateHeader(elementOrID, spec) {
    var headerElement = elementOrID;
    if (elementOrID.nodeType != Node.ELEMENT_NODE) {
        headerElement = document.getElementById(elementOrID);
	}
	
    if (!headerElement.loaded) {
        headerElement.loaded = true;
        headerElement.object = new Header(headerElement, spec);
        return headerElement.object;
    }
}

function Header(headerElement, spec)
{
    var styleElement = headerElement;
	var firstChild = headerElement.children[0];
	
    // when cloning template, get size from original
    if (spec.originalID) {
        styleElement = document.getElementById(spec.originalID);
    }
    
    this._headerHeight = dashcode.getElementHeight(styleElement) || 20;
    this._paddingSides = 5;
    this._backButtonLeftPadding = 13;
    this._useTransforms = Transition.areTransformsSupported();
    
    this._inDesign = window.dashcode && window.dashcode.inDesign;
    this.element = headerElement;
    if (!this._inDesign) {
        headerElement.style.overflow = "hidden";
    }
    
	// Find the "back button" template
	for( var i = 0; i < headerElement.children.length; i++ ){
		var child = headerElement.children[i];
		var elemClass = child.getAttribute("class");
        
		if( elemClass && elemClass.indexOf("dashcode-header-backbutton") > -1 ){
			this._backButtonTemplate = child;
		}
	}
	
	
    // create elements and add them to the header
    this._topSeparatorElement = this._makeSeparator("TOP");
    this._bottomSeparatorElement = this._makeSeparator("BOTTOM");
    this._title1 = this._makeTitle();
    this._title2 = this._makeTitle();
    this._backButton1 = this._makeBackButton(this._backButtonTemplate);
    this._backButton2 = this._makeBackButton(this._backButtonTemplate);
	
    this.element.insertBefore(this._topSeparatorElement,firstChild);
    this.element.insertBefore(this._bottomSeparatorElement,firstChild);
    this.element.insertBefore(this._title1,firstChild);
    this.element.insertBefore(this._title2,firstChild);
	if( !this._inDesign ){
		this._backButtonTemplate.style.display = "none";
		this.element.insertBefore(this._backButton1,firstChild);
		this._backButton1.object.setImagePosition(PushButton.IMAGE_POSITION_NONE);
		this.element.insertBefore(this._backButton2,firstChild);
		this._backButton2.object.setImagePosition(PushButton.IMAGE_POSITION_NONE);
    }
	
    // Set up click handler for back buttons
    var self = this;
    var onclickHandler = function (event) {
        self._goBack();
    }
	this._backButton1.object.buttonEventHandler.setActionCallback(onclickHandler);
	this._backButton2.object.buttonEventHandler.setActionCallback(onclickHandler);
    
    if (this._useTransforms) {
        // Some default parameters for animation
        this._animationProperties = '-webkit-transform, opacity';
        this._setAnimationDuration(2.25);
        this._setAnimationTiming('ease');
    }
    
    // Init stack and set up root level
    this._stack = [];
    var rootTitle = spec.rootTitle || 'Home';
	this._goForward(rootTitle, null);
    
    // On orientation change, adjust elements
    window.addEventListener('orientationchange', function() {
                            self._sizeChanged();
                            }, false);
}

Header.prototype._makeBackButton = function(templateButton) {
	var newElem = dashcode.cloneTemplateElement(templateButton,false);
	//newElem.setAttribute("class","apple-hidden");
    
    newElem.style.opacity = 0;
    
    if (this._useTransforms) {
        // Make sure the element gets a layer if we are going to use transitions
        newElem.style.webkitTransform = this._translateOp(0, 0);
    }    
    
    return newElem;
}

Header.prototype._makeTitle = function() {
    var newElem = document.createElement("div");
    var height = this._headerHeight;
    
    newElem.style.position = 'absolute';
    newElem.style.top = 0;
    newElem.style.height = height+'px';
    if (this._useTransforms) {
        // Make sure the element gets a layer if we are going to use transitions
        newElem.style.webkitTransform = this._translateOp(0, 0);
    }
    
    newElem.style.lineHeight = height+'px';
    newElem.style.textAlign = 'center';
	newElem.style.textOverflow = 'ellipsis';
	newElem.style.whiteSpace = 'nowrap';
	
    newElem.style.overflow = 'hidden';
    
    // Start out transparent
    newElem.style.opacity = 0;
    
	newElem.setAttribute("class","apple-hidden");
    
    return newElem;
}

Header.prototype._makeSeparator = function(type) {
    var newElem = document.createElement("div");
    newElem.style.position = 'absolute';
    newElem.style.left = '0px';
    newElem.style.right = '0px';
    newElem.style.width = 'auto';
    newElem.style.height = '1px';
    if (type == "TOP") {
        newElem.style.top = '0px';
        newElem.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    } else {
        newElem.style.bottom = '0px';
        newElem.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    }
    
	newElem.setAttribute("class","apple-hidden");
    
    return newElem;
}

Header.prototype._disableTransitions = function(elements) {
    if (this._useTransforms) {
        for (var i=0; i<elements.length; i++) {
            elements[i].style.webkitTransitionProperty = 'none';
        }
    }
}

Header.prototype._enableTransitions = function(elements) {
    if (this._useTransforms) {
        for (var i=0; i<elements.length; i++) {
            elements[i].style.webkitTransitionProperty = this._animationProperties;
            elements[i].style.webkitTransitionDuration = this._animationDurations;
            elements[i].style.webkitTransitionTimingFunction = this._animationTimings;
        }
    }
}

Header.prototype._translateOp = function(xPixels, yPixels) {
    return 'translate(' + xPixels + 'px, ' + yPixels + 'px)';
}

Header.prototype._setAnimationDuration = function(duration) {
    if (this._useTransforms) {
        this._animationDuration = duration;
        this._animationDurations = duration + "s, " + duration + "s";
    }
}

Header.prototype._setAnimationTiming = function(timing) {
    if (this._useTransforms) {
        this._animationTimings = timing + ', linear';
    }
}

Header.prototype._sizeChanged = function() {
    var currentEntry = this._stack[this._stack.length-1];
    var currentTitle = currentEntry.titleElement;
    var currentButton = currentEntry.backButtonElement;
    currentTitle.style.width = "";

    // get elements sizes
    var elementsToMeasure = [this.element, currentButton, currentTitle];
    var sizes = dashcode.getElementSizesWithAncestor(elementsToMeasure, this.element);
    var headerWidth = sizes[0].width;
    var currentButtonWidth = sizes[1].width;
    var currentTitleWidth = sizes[2].width;
    
    // adjust the title position and width
    var minTitleX = Math.max(currentEntry.backButtonX + currentButtonWidth, 0) + this._paddingSides;
    var titlePosition = this._adjustedTitlePosition(currentTitleWidth, headerWidth, minTitleX);
    this._disableTransitions([currentTitle]);
    if (titlePosition.width != null) {
        currentTitle.style.width = titlePosition.width + "px";
    }
    if (this._useTransforms) {
        currentTitle.style.webkitTransform = this._translateOp(titlePosition.x, 0);
    } else {
        currentTitle.style.left = titlePosition.x + 'px';
    }
    currentEntry.titleX = titlePosition.x;
}

Header.prototype._adjustedTitlePosition = function(titleWidth, headerWidth, minTitleX) {
    var result = {};
    // adjust title position and width
    result.x = (headerWidth / 2) - (titleWidth / 2);
    
    if (minTitleX > result.x) {
        result.x = minTitleX + this._paddingSides;
        var maxTitleWidth = headerWidth - result.x - this._paddingSides;
        if (titleWidth > maxTitleWidth) {
            result.width = maxTitleWidth;
        }
    }
    return result;
}

Header.prototype._performTransition = function(transforms) {
    var total = transforms.length;
    for (var f = 0; f<total; f++) {
        var transform = transforms[f];
        var element = transform.element;
        
        // perform translate transitions
        if (this._useTransforms) {
            // enable transitions
            element.style.webkitTransform = this._translateOp(transform.translateX, 0);
        } else {
            element.style.left = transform.translateX + 'px';
        }
        
        // perform opacity transitions
        if (transform.opacity != null) {
            element.style.opacity = transform.opacity;
        }
    }
}

Header.prototype._goForward = function (newTitle, goBackCallback) {
    this._navigate(true, newTitle, goBackCallback);
}

Header.prototype._goBack = function () {
    this._navigate(false);
}

Header.prototype._navigate = function(goFwd, newTitle, goBackCallback) {
    if (!goFwd && this._stack.length < 2) {
        return;
    }
    
    // cycle the buttons and titles
    var appearTitle, vanishTitle, appearButton, vanishButton;
    if (this._stack.length % 2 == 0) {
        appearTitle = this._title1;
        vanishTitle = this._title2;
        appearButton = this._backButton1;
        vanishButton = this._backButton2;
    } else {
        appearTitle = this._title2;
        vanishTitle = this._title1;
        appearButton = this._backButton2;
        vanishButton = this._backButton1;
    }
    
    // get current and previous entries
    var backEntry = null, vanishEntry = null, appearEntry = null;
    if (goFwd) {
        if (this._stack.length > 0) {
            backEntry = this._stack[this._stack.length-1];
        }
    } else {
        vanishEntry = this._stack.pop();
        appearEntry = this._stack[this._stack.length-1];
        if (this._stack.length > 1) {
            backEntry = this._stack[this._stack.length-2];
        }
        newTitle = appearEntry.title;
    }
    
    // set labels
	appearButton.object.setText(backEntry ? backEntry.title : "");
	appearButton.object.sizeToFit(40,100);
	appearTitle.style.width = '';
    appearTitle.innerHTML = newTitle;
    
    // get elements sizes
    var elementsToMeasure = [this.element, appearTitle];
    if (backEntry) {
        elementsToMeasure.push(appearButton);
        elementsToMeasure.push(vanishButton);
    }
    var sizes = dashcode.getElementSizesWithAncestor(elementsToMeasure, this.element);
    
    var headerWidth = sizes[0].width;
    var appearTitleWidth = sizes[1].width;
    var appearButtonWidth = backEntry ? sizes[2].width : headerWidth;
    var vanishButtonWidth = backEntry ? sizes[3].width : headerWidth;
    
    // determine appear elements position. prevent overlap title and back button
    var appearButtonX = backEntry ? this._paddingSides : -headerWidth;
    var minAppearTitleX = Math.max(appearButtonX + appearButtonWidth, 0) + this._paddingSides;
    var appearTitlePosition = this._adjustedTitlePosition(appearTitleWidth, headerWidth, minAppearTitleX);
    var appearTitleX = appearTitlePosition.x;
    if (appearTitlePosition.width != null) {
        appearTitle.style.width = appearTitlePosition.width+"px";
    }
    
    // determine vanish elements end position
    var vanishTitleX, vanishButtonX;
    if (goFwd) {
        vanishTitleX = this._paddingSides + this._backButtonLeftPadding;
        if (backEntry) { // never move vanishing title to the right
            vanishTitleX = Math.min(vanishTitleX, backEntry.titleX);
        }
        vanishButtonX = -(vanishButtonWidth + this._paddingSides);
    } else {
        vanishTitleX = headerWidth;
        vanishButtonX = Math.max(this._paddingSides, appearTitleX - this._backButtonLeftPadding);
    }
    
    // set initial state of buttons and titles
    this._disableTransitions([appearTitle, vanishTitle, appearButton, vanishButton]);
    appearButton.style.opacity = 0;
    appearButton.style.visibility = "visible";
    var appearTitleInitialOpacity = 0;
    var appearButtonInitialX, appearTitleInitialX;
    if (goFwd) {
        if (backEntry) {
            appearButtonInitialX = Math.max(appearButtonX, backEntry.titleX - this._backButtonLeftPadding);
            appearTitleInitialX = headerWidth;
        } else { // if in root state, initial state == end state
            appearButtonInitialX = appearButtonX;
            appearTitleInitialX = appearTitleX;
            if (!this._useTransforms) {
                appearTitle.style.left = appearTitleInitialX + 'px';
            }
            appearTitleInitialOpacity = 1;
        }
    } else {
        appearButtonInitialX = -(appearButtonWidth + this._paddingSides);
        appearTitleInitialX = this._paddingSides + this._backButtonLeftPadding
        appearTitleInitialX = Math.min(appearTitleInitialX, appearTitleX); // never move to the left
    }
    appearTitle.style.opacity = appearTitleInitialOpacity;
    if (this._useTransforms) {
        appearTitle.style.webkitTransform = this._translateOp(appearTitleInitialX, 0);
        appearButton.style.webkitTransform = this._translateOp(appearButtonInitialX, 0);
    }
    
    if (this._inDesign) {
        appearTitleX = this._useTransforms ? 0 : this._paddingSides;
        appearTitle.style.width = '';
        appearTitle.style.left = this._paddingSides+"px";
        appearTitle.style.right = this._paddingSides+"px";
    }    
    
    // let the transitions engine perform the transition
    var transforms = [
                      {element: appearTitle, translateX: appearTitleX, opacity: 1},
                      {element: vanishTitle, translateX: vanishTitleX, opacity: 0},
                      {element: appearButton, translateX: appearButtonX, opacity: backEntry != null ? 1 : 0},
                      {element: vanishButton, translateX: vanishButtonX, opacity: 0},
                      ];
    var self = this;
    Transition._addDelayedTransitionCallback(function() {
                                             self._enableTransitions([appearTitle, vanishTitle, appearButton, vanishButton]);
                                             self._performTransition(transforms)
                                             });
    
    this._checkedForEnded = false;
    this._vanishButton = vanishButton;
    // Register a generic callback for the end of the transition for clean up and/or resets
    vanishButton.addEventListener('webkitTransitionEnd', this, false);
    
    if (goFwd) {
        // push new state into stack
        var newStackEntry = { 
            title : newTitle, 
            titleX : appearTitleX,
        backButtonX: appearButtonX,
        titleElement: appearTitle,
        backButtonElement: appearButton,
            callback : goBackCallback
        };
        this._stack.push(newStackEntry);
    } else if (vanishEntry.callback) {
        vanishEntry.callback(vanishEntry.title, appearEntry.title);
    }
}

Header.prototype.handleEvent = function(event)
{
    if (!this._checkedForEnded) {
        switch (event.type) {
        case 'webkitTransitionEnd' :
            this._vanishButton.style.visibility = 'hidden';
            // Other end transition work can be done here.
            break;
        }
        
        this._checkedForEnded = true;
    }
}
