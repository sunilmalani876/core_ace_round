import { Spine } from "@pixi/spine-pixi";
import gsap from "gsap";
import { Assets, Container, Sprite } from "pixi.js";

export class Cauldron extends Container {
  /** Inner container for the cauldron */
  private container: Container;
  /** The optional cauldron shadow, displayed in game screen */
  private shadow: Sprite;
  /** The cauldron spine animation */
  private spine: Spine;
  /** Optional content attached to the cauldron, that will follow its animation */
  private content?: Container;

  constructor(shadow = false) {
    super();

    this.container = new Container();
    this.addChild(this.container);

    this.shadow = Sprite.from("circle");
    this.shadow.anchor.set(0.5);
    this.shadow.width = 180;
    this.shadow.height = 40;
    this.shadow.tint = 0x262626;
    this.shadow.alpha = 0.2;
    this.shadow.y = 40;
    this.shadow.visible = shadow;
    this.container.addChild(this.shadow);

    this.spine = Spine.from({
      skeleton: "preload/cauldron-skeleton.json",
      atlas: "preload/cauldron-skeleton.atlas",
    });

    console.log(this.spine);

    this.spine.autoUpdate = true;
    this.spine.y = 50;
    this.spine.state.setAnimation(0, "animation", true);
    this.container.addChild(this.spine);

    // this.onRender = () => this.renderUpdate();
  }

  public async show(animated = true) {
    gsap.killTweensOf(this.container.scale);

    this.visible = true;
    if (animated) {
      this.container.scale.set(0);
      await gsap.to(this.container.scale, {
        x: 1,
        y: 1,
        duration: 0.3,
        ease: "back.out",
      });
    } else {
      this.container.scale.set(1);
    }
  }
}
