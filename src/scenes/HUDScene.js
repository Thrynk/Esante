import Phaser from "phaser";
import { CST } from "../CST";

export class HUDScene extends Phaser.Scene {
  constructor(){
    super({
      key: CST.SCENES.HUD
    })
    this.timerText;
  }
  init(){

  }

  preload(){

  }

  create(){
    this.timerText = this.add.text(16, 16, '00:00', { fontSize: '32px', fill: '#000' });
    this.clock = this.plugins.get('rexClock').add(this, {
    // timeScale: 1
    });
    this.clock.start();
  }

  update(){
    var now = this.clock.now;
    //console.log(now);
    this.timerText.setText(getCleanTime(Math.floor(now/1000)));

  }
}

function getCleanTime(time){
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  var secondsString = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  var minutesString = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  var fullTime = minutesString + ':' + secondsString;
  return fullTime;
}
