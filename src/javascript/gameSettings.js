import Phaser from "phaser";
import globalState from "./globalState.js";

let background;
let musicRectangle;
let effectsRectangle;

class GameSettings extends Phaser.Scene {
  constructor() {
    super({ key: "GameSettings" });
  }

  create() {
    background = this.add.tileSprite(230, 320, 460, 640, "background");

    this.add
      .bitmapText(230, 50, "press-start-2p", "Settings", 35)
      .setOrigin(0.5);

    this.add
      .rectangle(230, 135, 245, 70, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerup", () => {
        this.scene.start("SetUsername");
      });
    this.add
      .bitmapText(230, 120, "press-start-2p", "Update", 28)
      .setOrigin(0.5);
    this.add
      .bitmapText(230, 150, "press-start-2p", "Username", 28)
      .setOrigin(0.5);

    musicRectangle = this.add
      .rectangle(230, 230, 275, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerup", () => {
        globalState.music = !globalState.music;
      });
    this.add
      .bitmapText(230, 230, "press-start-2p", "GameMusic", 28)
      .setOrigin(0.5);

    effectsRectangle = this.add
      .rectangle(230, 310, 225, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerup", () => {
        globalState.effects = !globalState.effects;
      });
    this.add
      .bitmapText(230, 310, "press-start-2p", "GameSFX", 28)
      .setOrigin(0.5);

    this.add
      .rectangle(230, 560, 255, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("MainMenu");
      });
    this.add
      .bitmapText(230, 560, "press-start-2p", "MainMenu", 28)
      .setOrigin(0.5);
  }

  update() {
    background.tilePositionY += 2;
    background.tilePositionX += 2;

    if (globalState.music) {
      musicRectangle.setFillStyle(0x6666ff, 1.0);
    } else {
      musicRectangle.setFillStyle(0x4e4f51, 1.0);
    }

    if (globalState.effects) {
      effectsRectangle.setFillStyle(0x6666ff, 1.0);
    } else {
      effectsRectangle.setFillStyle(0x4e4f51, 1.0);
    }
  }
}

export default GameSettings;
