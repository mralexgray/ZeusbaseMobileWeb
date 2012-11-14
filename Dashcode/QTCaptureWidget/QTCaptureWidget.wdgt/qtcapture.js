// This file was generated by Dashcode from Apple Inc.
// You may edit this file to customize your Dashboard widget.

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    setupParts();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));
	
	// stop capture when removed
	stopCapture();
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
	
	// stop capture while hiding
	stopCapture();
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
	
	// re-start capture when we come back from hiding
	startCapture();
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

//
// Function: startRecording(event)
// Called when the user clicks the "Start Recording" button
//
// event: onClick event from the "Start Recording" button
//

function startRecording(event)
{
    var qtcapture = window.qtcaptureplugin;
    qtcapture.StartRecording();
}

//
// Function: stopRecording(event)
// Called when the user clicks the "Stop Recording" button
//
// event: onClick event from the "Stop Recording" button
//

function stopRecording(event)
{
    var qtcapture = window.qtcaptureplugin;
    qtcapture.StopRecording();
}

//
// Function: stopCapture()
// Called to stop capture to prevent the system from using
// resources when not necessary (such as when the widget
// is hidden)
//

function stopCapture()
{
    var qtcapture = window.qtcaptureplugin;
    qtcapture.StopCapture();
}

//
// Function: startCapture()
// Called to start capture when the widget is made visible
// again (for example when coming back from being hidden)
//

function startCapture()
{
    var qtcapture = window.qtcaptureplugin;
    qtcapture.StartCapture();
}


//
// DeviceStateChange(value)
// Called by our plugin when device state changes. We will
// use this state information to set our device status control
// (text) value to one of "connected", "disconnected" or 
// "recording" or "stopped recording"

function DeviceStateChange(value)
{

	var textFieldValue = document.getElementById("deviceStatusText");
	textFieldValue.textContent = value;
}
