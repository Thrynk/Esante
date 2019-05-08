import Phaser from "phaser";
import { CST } from "../CST";

export class HUDScene extends Phaser.Scene {
  constructor(){
    super({
      key: CST.SCENES.HUD
    })
    this.timerText;
    this.clock;
  }
  init(){

  }

  preload(){

  }

  create(){
    this.timerText = this.add.text(16, 16, '00:00', {fontSize: '32px', fill: '#fff' });
    this.timerText.setStroke("#000000", 0.8);
    this.clock = this.plugins.get('rexClock').add(this, {
      // timeScale: 1
    });
    this.clock.start();

    /*let menuScene = this.scene.get(CST.SCENES.MENU);
    menuScene.events.on('startGame', function(){}, this);*/

    var fullscreenButton = this.add.image(750, 50, "enterfullscreen");
    fullscreenButton.setScale(0.5);
    fullscreenButton.setInteractive();
    fullscreenButton.on('pointerdown', function(){
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        fullscreenButton.setTexture("enterfullscreen");
      } else {
        this.scale.startFullscreen();
        fullscreenButton.setTexture("exitfullscreen");
      }
    }, this);

    let ourGame = this.scene.get(CST.SCENES.GAME);

    ourGame.events.on('alreadyFull', function(){
      var text = this.add.text(270, 500, "Vous avez déjà un objet !", {fontSize: "30px", color: "#ffffff"});
      text.setStroke("#000000", 0.8);
      setTimeout(function(){text.destroy();}, 2500);

    }, this);
  }

  update(){
    var now = this.clock.now;
    //console.log(now);
    this.timerText.setText(this.getCleanTime(Math.floor(now/1000)));
  }

  getCleanTime(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    var secondsString = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    var minutesString = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    var fullTime = minutesString + ':' + secondsString;
    return fullTime;
  }

}
