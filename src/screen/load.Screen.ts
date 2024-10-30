import { Container } from "pixi.js";
import { Cauldron } from "../ui/Cauldron";

/** Screen shown while loading assets */
export class LoadScreen extends Container {
  public static assetBundles = ["preload"];

  /** ANimated cauldron */
  private cauldron: Cauldron;

  constructor() {
    super();

    this.cauldron = new Cauldron();
    this.addChild(this.cauldron);
  }
}
