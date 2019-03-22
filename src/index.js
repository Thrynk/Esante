import Phaser from "phaser";

import { GameScene } from "./scenes/GameScene";

import { LoadScene } from "./scenes/LoadScene";

import { MenuScene } from "./scenes/MenuScene";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
      LoadScene,
      MenuScene,
      GameScene
    ]
};

let game = new Phaser.Game(config);
