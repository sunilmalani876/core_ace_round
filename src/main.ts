import { Application } from "pixi.js";
import { LoadScreen } from "./screen/load.Screen";

export const app = new Application();

function resize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const minWidth = 375;
  const minHeight = 700;

  // Calculate renderer and canvas sizes based on current dimensions
  const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
  const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
  const scale = scaleX > scaleY ? scaleX : scaleY;
  const width = windowWidth * scale;
  const height = windowHeight * scale;

  // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
  app.renderer.canvas.style.width = `${windowWidth}px`;
  app.renderer.canvas.style.height = `${windowHeight}px`;
  window.scrollTo(0, 0);

  // Update renderer  and navigation screens dimensions
  app.renderer.resize(width, height);
  // navigation.resize(width, height);
}

/** Fire when document visibility changes - lose or regain focus */
// function visibilityChange() {
//   if (document.hidden) {
//     sound.pauseAll();
//     navigation.blur();
//   } else {
//     sound.resumeAll();
//     navigation.focus();
//   }
// }

/** Setup app and initialise assets */
async function init() {
  // Initialize app
  await app.init({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0x7ed4ad,
  });

  document.body.appendChild(app.canvas);

  // Whenever the window resizes, call the 'resize' function
  window.addEventListener("resize", resize);

  // Trigger the first resize
  resize();

  const load = new LoadScreen();
  app.stage.addChild(load);
}

await init();
