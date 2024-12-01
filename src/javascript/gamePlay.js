import Phaser from "phaser";
import globalState from "./globalState.js";

let background;
let stars;

class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlay" });
  }

  create() {
    const explosionSound = this.sound.add("explosion", { volume: 0.19 });
    const pickupSound = this.sound.add("pickup", { volume: 0.18 });

    const gameMusic = this.sound.add("game-music", {
      loop: true,
      volume: 0.16,
    });
    if (globalState.music) {
      gameMusic.play();
    } else {
      gameMusic.stop();
    }

    if (!globalState.effects) {
      explosionSound.volume = 0;
      pickupSound.volume = 0;
    }

    let score = 0;
    background = this.add.tileSprite(230, 320, 460, 640, "gamePlayBackground");

    const setRocketSpawnX = () => {
      if (this.input.mousePointer.x !== 0) {
        return this.input.mousePointer.x;
      }
      return 230;
    };

    const rocket = this.physics.add
      .image(setRocketSpawnX(), 130, "rocket")
      .setScale(0.36)
      .setAngle(180);
    rocket.body
      .setSize(rocket.width - 350, rocket.height - 200, true)
      .setOffset(178, 135);

    const rocketFlicker = this.add
      .sprite(setRocketSpawnX(), 29, "rocket-flicker", 0)
      .setScale(0.2)
      .setAngle(180);

    this.anims.create({
      key: "rocketFlicker",
      frames: this.anims.generateFrameNumbers("rocket-flicker"),
      frameRate: 16,
      repeat: -1,
    });

    rocketFlicker.play("rocketFlicker");

    this.input.on(
      "pointermove",
      (pointer) => {
        this.tweens.add(
          {
            targets: rocket,
            x: Phaser.Math.Clamp(pointer.x, 50, 410),
            y: 130,
            duration: 100,
            ease: "Sine.easeOut",
          },
          this
        );
        this.tweens.add(
          {
            targets: rocketFlicker,
            x: Phaser.Math.Clamp(pointer.x, 50, 410),
            y: 29,
            duration: 100,
            ease: "Sine.easeOut",
          },
          this
        );
      },
      this
    );

    const randomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    this.anims.create({
      key: "asteroid",
      frames: this.anims.generateFrameNumbers("asteroid"),
      frameRate: 16,
      repeat: -1,
    });

    const asteroids = this.physics.add.group({
      key: "asteroid",
      repeat: 2,
      setXY: { x: 230, y: 2500 },
    });

    asteroids.children.iterate((asteroid) => {
      asteroid.setScale(0.48);
      asteroid.setAngle(90);
      asteroid.body
        .setSize(asteroid.width - 320, asteroid.height - 200, true)
        .setOffset(150, -20);
      asteroid.play("asteroid");
      asteroid.x = randomNumber(50, 410);
      asteroid.y = randomNumber(950, 2500);
      asteroid.setVelocityY(randomNumber(-200, -1000));
    });

    stars = this.physics.add.group({
      key: "star",
      repeat: 1,
      setXY: { x: 230, y: 2500 },
    });

    stars.children.iterate((star) => {
      star.setScale(0.085);
      star.body.setSize(star.width - 125, star.height - 125, true);
      star.x = randomNumber(50, 410);
      star.y = randomNumber(800, 2500);
      star.setVelocityY(randomNumber(-200, -700));
    });

    const resetBlock = this.add
      .rectangle(0, -300, 460, 18, 0x6666ff)
      .setOrigin(0);
    this.physics.add.existing(resetBlock);

    const scoreText = this.add
      .bitmapText(10, 10, "press-start-2p", `Score:${score}`, 27)
      .setOrigin(0);

    const resetStarPosition = (object, resetStar) => {
      resetStar.x = randomNumber(50, 410);
      resetStar.y = randomNumber(800, 2500);
      resetStar.setVelocityY(randomNumber(-200, -700));
    };

    const handleCollectStar = (object, resetStar) => {
      resetStarPosition(null, resetStar);
      pickupSound.play();
      score += 10;
      scoreText.text = `Score:${score}`;
    };

    this.physics.add.overlap(rocket, stars, handleCollectStar, undefined);

    this.physics.add.overlap(resetBlock, stars, resetStarPosition, undefined);

    const resetAsteroidPosition = (object, resetAsteroid) => {
      resetAsteroid.x = randomNumber(50, 410);
      resetAsteroid.y = randomNumber(950, 2500);
      resetAsteroid.setVelocityY(randomNumber(-200, -1000));
    };

    const gameOver = () => {
      gameMusic.stop();
      explosionSound.play();
      this.scene.start("GameOver", `${score}`);
    };

    this.physics.add.overlap(
      resetBlock,
      asteroids,
      resetAsteroidPosition,
      undefined
    );
    this.physics.add.overlap(rocket, asteroids, gameOver, undefined);
  }

  update() {
    background.tilePositionY += 20;
    stars.children.iterate((star) => {
      star.angle += 2;
    });
  }
}

export default GamePlay;
