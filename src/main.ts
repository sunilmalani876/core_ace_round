import { Application } from "pixi.js";
import { designConfig } from "./designConfig";

export const app = new Application<HTMLCanvasElement>({
  resolution: Math.max(window.devicePixelRatio, 2),
  backgroundColor: 0x0d92f4,
});

function resize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const minWidth = designConfig.content.width;
  const minHeight = designConfig.content.height;

  // Calculate renderer and canvas sizes based on current dimensions
  const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
  const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
  const scale = scaleX > scaleY ? scaleX : scaleY;
  const width = windowWidth * scale;
  const height = windowHeight * scale;

  // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
  app.renderer.view.style.width = `${windowWidth}px`;
  app.renderer.view.style.height = `${windowHeight}px`;
  window.scrollTo(0, 0);

  // Update renderer and navigation screens dimensions
  app.renderer.resize(width, height);
  // navigation.init();
  // navigation.resize(width, height);
}

/** Setup app and initialise assets */
async function init() {
  document.body.appendChild(app.view);

  // Whenever the window resizes, call the 'resize' function
  window.addEventListener("resize", resize);

  // Trigger the first
  resize();

  // await initAssets();

  // Set the default local storage data if needed
  // storage.readyStorage();

  // Navigate to the spin wheel screen
  // await navigation.goToScreen(ResultScreen);
  // await navigation.goToScreen(Background);
  // await navigation.goToScreen(PrimaryBtn);
}

await init();
