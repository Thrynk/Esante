import Phaser from "phaser";

import ClockPlugin from './plugins/clock.js';

import { GameScene } from "./scenes/GameScene";

import { LoadScene } from "./scenes/LoadScene";

import { MenuScene } from "./scenes/MenuScene";

import { InventoryScene } from "./scenes/InventoryScene";

import { HUDScene } from "./scenes/HUDScene";


window.onload = function(){
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: [
      LoadScene,
      MenuScene,
      GameScene,
      InventoryScene,
      HUDScene
    ],
    plugins: {
        global: [{
            key: 'rexClock',
            plugin: ClockPlugin,
            start: true
        }
        // ...
        ]
    }
  };

  let game = new Phaser.Game(config);
  /*resize();
  window.addEventListener("resize", resize, false);*/
}


/*function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}*/
