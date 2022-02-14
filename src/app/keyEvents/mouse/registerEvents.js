import registerMouseDownEvents from './mouseDown.js';
import { registerMouseMoveEvents } from './mouseMove.js';
import { registerMouseOverOutEvents } from './mouseOverOut.js';

// executed onl once after calling the app
function registerWindowMouseEvents() {
  registerMouseDownEvents();
  registerMouseMoveEvents();
  registerMouseOverOutEvents();
}

export { registerWindowMouseEvents as default };