import Phaser from "phaser";
import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
  constructor(){
    super({
      key: CST.SCENES.MENU
    })
  }
  init(){

  }

  preload(){

  }

  create(){
    var menuImg = this.add.image(0, 0, "menu");
    menuImg.setOrigin(0, 0);
    this.scene.launch(CST.SCENES.HUD);

    var buttonPlay = this.add.image(332, 235.5, "boutonjouer");
    buttonPlay.setOrigin(0, 0);
    buttonPlay.setInteractive();
    buttonPlay.on('pointerdown', function(){
      console.log("sent");
        this.scene.start(CST.SCENES.GAME);
        this.events.emit('startGame');
    }, this);

    var buttonQuit = this.add.image(320, 285.5, "boutonquitter");
    buttonQuit.setOrigin(0, 0);
    buttonQuit.setInteractive();
    buttonQuit.on('pointerdown', function(){
      this.scene.stop(CST.SCENES.HUD);
      this.scene.stop(CST.SCENES.MENU);
    }, this);

  }
}
