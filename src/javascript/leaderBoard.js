import Phaser from "phaser";
import { getScores } from "./database.js";

let background;

class LeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: "LeaderBoard" });
  }

  create() {
    const num = 100;
    const x = 10;
    background = this.add.tileSprite(230, 320, 460, 640, "background");

    this.add
      .bitmapText(230, 50, "press-start-2p", "LeaderBoard", 35)
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
    this.add.rectangle(70 + x, 180 - num, 1, 440, 0xffffff).setOrigin(0);
    this.add.rectangle(245 + x, 180 - num, 1, 440, 0xffffff).setOrigin(0);
    this.add.rectangle(230, 620 - num, 460, 1, 0xffffff);

    let y = 130;
    const getScoreBoard = getScores().slice(0, 13);
    for (let i = 0; i < 13; i += 1) {
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
  }

  update() {
    background.tilePositionY += 2;
    background.tilePositionX += 2;
  }
}

export default LeaderBoard;
