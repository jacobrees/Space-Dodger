import Phaser from "phaser";

let background;

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  create() {
    background = this.add.tileSprite(230, 320, 460, 640, "background");

    this.add
      .bitmapText(230, 50, "press-start-2p", "SpaceDodger", 35)
      .setOrigin(0.5);

    this.add.image(230, 240, "rocket").setScale(0.5).setAngle(135);

    const rocketFlicker = this.add
      .sprite(134, 144, "rocket-flicker", 0)
      .setScale(0.25)
      .setAngle(135);

    this.add
      .rectangle(230, 380, 248, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("GameSettings");
      });
    this.add
      .bitmapText(230, 380, "press-start-2p", "Settings", 28)
      .setOrigin(0.5);

    this.add
      .rectangle(230, 470, 327, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("LeaderBoard");
      });
    this.add
      .bitmapText(230, 470, "press-start-2p", "LeaderBoard", 28)
      .setOrigin(0.5);

    this.add
      .rectangle(230, 560, 277, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("GamePlay");
      });
    this.add
      .bitmapText(230, 560, "press-start-2p", "StartGame", 28)
      .setOrigin(0.5);

    this.anims.create({
      key: "rocketFlicker",
      frames: this.anims.generateFrameNumbers("rocket-flicker"),
      frameRate: 10,
      repeat: -1,
    });

    rocketFlicker.play("rocketFlicker");
  }

  update() {
    background.tilePositionY += 7;
    background.tilePositionX += 7;
  }
}

export default MainMenu;
