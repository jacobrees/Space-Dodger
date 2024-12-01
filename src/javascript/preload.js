import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {
    this.make
      .text({
        x: 460 / 2,
        y: 640 / 2 - 40,
        text: "LOADING...",
        style: {
          font: "25px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5);

    const loadingBar = this.add.graphics({ fillStyle: { color: 0xffffff } });
    const percentText = this.make
      .text({
        x: 460 / 2,
        y: 640 / 2 + 100,
        text: "",
        style: {
          font: "25px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5);
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, 340, 460 * percent, 50);
      percentText.text = `${(percent.toFixed(2) * 100).toFixed(0)}%`;
    });

    this.make
      .text({
        x: 460 / 2,
        y: 640 / 2 + 147,
        text: "loading asset:",
        style: {
          font: "25px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5);

    const fileText = this.make
      .text({
        x: 460 / 2,
        y: 640 / 2 + 180,
        text: "",
        style: {
          font: "25px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5);
    this.load.on("fileprogress", (file) => {
      fileText.text = `${file.key}`;
    });

    this.load.on("complete", () => {
      this.scene.start("SetUsername");
    });

    this.load.bitmapFont(
      "press-start-2p",
      "./assets/bitmap/PressStart2P.png",
      "./assets/bitmap/PressStart2P.xml"
    );
    this.load.image(
      "gamePlayBackground",
      "./assets/img/game-play-background.png"
    );
    this.load.spritesheet(
      "rocket-flicker",
      "./assets/spritesheet/rocket-flicker.png",
      { frameWidth: 256, frameHeight: 581 }
    );
    this.load.image("rocket", "./assets/img/rocket.png");
    this.load.image("star", "./assets/img/star.png");
    this.load.spritesheet("asteroid", "./assets/spritesheet/asteroid.png", {
      frameWidth: 512,
      frameHeight: 385.5,
    });
    this.load.audio("pickup", "./assets/audio/pickup.mp3");
    this.load.audio("explosion", "./assets/audio/explosion.mp3");
    this.load.audio("game-music", "./assets/audio/space-ranger.mp3");
    this.load.image("background", "./assets/img/menu-background.png");
  }

  create() {}
}

export default Preload;
