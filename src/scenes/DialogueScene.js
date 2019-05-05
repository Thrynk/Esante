import Phaser from "phaser";
import  { CST } from "../CST";

export class DialogueScene extends Phaser.Scene {
  constructor(){
    super({
        key: CST.SCENES.DIALOGUE
    })
    this.sentence="";
  }
  init(sentence){
    this.sentence = sentence;
  }

  preload(){

  }
  create(){
    console.log(this.sentence);
  }
}
