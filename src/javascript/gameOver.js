import Phaser from "phaser";
import { postScore, getScores } from "./database.js";

let background;

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create(score) {
    postScore(Number(score));
    const num = 15;
    const x = 10;

    background = this.add.tileSprite(230, 320, 460, 640, "background");

    this.add
      .bitmapText(230, 50, "press-start-2p", "GameOver", 38)
      .setOrigin(0.5);
    this.add
      .bitmapText(230, 100, "press-start-2p", "YourScore", 25)
      .setOrigin(0.5);
    this.add
      .bitmapText(230, 140, "press-start-2p", `${score}`, 25)
      .setOrigin(0.5);
    this.add.rectangle(230, 180 - num, 460, 1, 0xffffff);

    this.add
      .bitmapText(5, 195 - num, "press-start-2p", "Rank", 16)
      .setOrigin(0);
    this.add
      .bitmapText(85 + x, 195 - num, "press-start-2p", "Username", 16)
      .setOrigin(0);
    this.add
      .bitmapText(260 + x, 195 - num, "press-start-2p", "Score", 16)
      .setOrigin(0);

    this.add.rectangle(230, 220 - num, 460, 1, 0xffffff);
    this.add.rectangle(70 + x, 180 - num, 1, 270, 0xffffff).setOrigin(0);
    this.add.rectangle(245 + x, 180 - num, 1, 270, 0xffffff).setOrigin(0);
    this.add.rectangle(230, 450 - num, 460, 1, 0xffffff);

    let y = 220;
    const getScoreBoard = getScores().slice(0, 7);
    for (let i = 0; i < 7; i += 1) {
      const arrRanks = ["st", "nd", "rd"];

      if (i < 3) {
        this.add
          .bitmapText(10, y, "press-start-2p", `${i + 1}${arrRanks[i]}`, 16)
          .setOrigin(0);
      } else {
        this.add
          .bitmapText(10, y, "press-start-2p", `${i + 1}th`, 16)
          .setOrigin(0);
      }

      this.add
        .bitmapText(
          85 + x,
          y,
          "press-start-2p",
          `${getScoreBoard[i].username}`,
          16
        )
        .setOrigin(0);

      this.add
        .bitmapText(
          260 + x,
          y,
          "press-start-2p",
          `${getScoreBoard[i].score}`,
          16
        )
        .setOrigin(0);

      y += 30;
    }

    this.add
      .rectangle(230, 560, 255, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("MainMenu");
      });
    this.add
      .bitmapText(230, 560, "press-start-2p", "MainMenu", 28)
      .setOrigin(0.5);

    this.add
      .rectangle(230, 480, 285, 52, 0x6666ff)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("GamePlay");
      });
    this.add
      .bitmapText(230, 480, "press-start-2p", "PlayAgain", 28)
      .setOrigin(0.5);
  }

  update() {
    background.tilePositionY += 2;
    background.tilePositionX += 2;
  }
}

export default GameOver;
