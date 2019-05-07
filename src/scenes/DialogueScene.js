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
    var chatboxCadran = this.add.image(400, 550, "chatboxCadran");
    var sentence = this.add.text(20, 520, this.sentence, { fontSize: '16px', fill: '#000' });
    sentence.setWordWrapWidth(760);
    var scene = this.scene;
    setTimeout(function(){scene.stop(CST.SCENES.DIALOGUE);},5000,this);
    this.input.keyboard.on('keydown-' + 'F', function (event) {
      this.scene.stop(CST.SCENES.DIALOGUE);
    }, this);
  }
}
