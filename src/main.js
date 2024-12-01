import "./styles.scss";
import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin.js";
import MainMenu from "./javascript/mainMenu.js";
import GamePlay from "./javascript/gamePlay.js";
import LeaderBoard from "./javascript/leaderBoard.js";
import GameSettings from "./javascript/gameSettings.js";
import GameOver from "./javascript/gameOver.js";
import SetUsername from "./javascript/setUsername.js";
import Preload from "./javascript/preload.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI",
      },
    ],
    global: [
      {
        key: "rexInputTextPlugin",
        plugin: InputTextPlugin,
        start: true,
      },
    ],
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 460,
    height: 640,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  scene: [
    Preload,
    SetUsername,
    MainMenu,
    GameOver,
    LeaderBoard,
    GamePlay,
    GameSettings,
  ],
};

const game = new Phaser.Game(config); //eslint-disable-line
