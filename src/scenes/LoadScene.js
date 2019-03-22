import Phaser from "phaser";
import  { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
  constructor(){
    super({
        key: CST.SCENES.LOAD
    })
  }

  init(){

  }

  preload(){
    /*let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });*/

    /*this.load.on("progress", function(percentage){
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percentage, 50);
    });*/
  }

  create(){
    this.scene.start(CST.SCENES.MENU, "hello world from LoadScene");
  }
}
