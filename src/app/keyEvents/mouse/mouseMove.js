let lastMouseMoveEvent = null;

// Reacts to each mouse move
function onMouseMoveEvent(event) {
  lastMouseMoveEvent = event;
}

function getLastMouseMoveEvent() {
  return lastMouseMoveEvent;
}

// at the very beginning of process
function registerMouseMoveEvents() {
  window.trackMouseMoveEvents = onMouseMoveEvent;
}

export { registerMouseMoveEvents, getLastMouseMoveEvent, onMouseMoveEvent };