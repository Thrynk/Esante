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
    //Tilesets
    this.load.image('indoor2', 'src/assets/tileset2.png');
    this.load.image('tilesetpokemon', 'src/assets/tilesetpokemon.png');
    this.load.image('tilsetwall', 'src/assets/tilsetwall.png');
    this.load.image('indoor', 'src/assets/indoor.png');
    this.load.image('bed3', 'src/assets/bed3.png');
    this.load.image('shower', 'src/assets/shower.png');
    this.load.image('shower2', 'src/assest/shower2.png');


    //Map
    this.load.tilemapTiledJSON("map", 'src/assets/map.json');

    //Player
    this.load.image('player', 'src/assets/player.png');
    this.load.spritesheet('player_spritesheet', 'src/assets/player_spritesheet.png', { frameWidth: 16, frameHeight: 16 });

    //Music
    this.load.audio('audio', 'src/assets/background_sound.ogg');

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    this.load.on("progress", function(percentage){
      loadingBar.fillRect(0, this.scene.game.renderer.height / 2, this.scene.game.renderer.width * percentage, 50);
    });

    this.load.on('complete', function(){
      this.scene.scene.start(CST.SCENES.MENU, "hello world from LoadScene");
    });
  }

  create(){

  }
}
