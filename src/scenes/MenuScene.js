import Phaser from "phaser";
import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
  constructor(){
    super({
      key: CST.SCENES.MENU
    })
  }
  init(data){
    console.log(data);
    console.log("I GOT IT");
  }

  preload(){

  }

  create(){
    this.scene.launch(CST.SCENES.HUD);
    this.scene.start(CST.SCENES.GAME);
  }
}
