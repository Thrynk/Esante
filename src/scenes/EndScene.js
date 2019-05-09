import Phaser from "phaser";
import  { CST } from "../CST";

export class EndScene extends Phaser.Scene {
  constructor(){
    super({
        key: CST.SCENES.END
    });
    this.time;
  }
  init(time){
    this.time = time;
  }

  preload(){

  }
  create(){
    var win = this.add.image(400, 300, "endGame");
    var textWin = this.add.text(220, 360, "Score : " + this.time + " secondes.", {fontSize: "30px"});
    textWin.setStroke("#000000", 0.8);
  }
}
