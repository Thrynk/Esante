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
    this.load.image('shower2', 'src/assets/shower2.png');
    this.load.image('door', 'src/assets/door.png');
    this.load.image('fences', 'src/assets/fences.png');
    this.load.image('garden', 'src/assets/garden.png');
    this.load.image('outdoor', 'src/assets/outdoor.jpeg');
    this.load.image('trees', 'src/assets/trees.png');
    this.load.image('carpet&indoor', 'src/assets/carpet&indoor.png');


    //Map
    this.load.tilemapTiledJSON("map", 'src/assets/map.json');

    //Player
    this.load.image('player', 'src/assets/player.png');
    this.load.spritesheet('player_spritesheet', 'src/assets/player_spritesheet.png', { frameWidth: 16, frameHeight: 16 });

    //Grandmother NPC
    this.load.image('grandmother', 'src/assets/grandmother.png');
    /*this.load.spritesheet('grandmother_spritesheet', 'src/assets/grandmother_spritesheet.png',  { frameWidth: 64, frameHeight: 64 });*/

    //Mother NPC
    this.load.image('mother', 'src/assets/mother.png');
    /*this.load.spritesheet('grandmother_spritesheet', 'src/assets/mother_spritesheet.png', { frameWidth: 64, frameHeight: 64 });*/

    //GrandFather NPC
    this.load.image('grandfather', 'src/assets/grandfather.png');

    //Father NPC
    this.load.image('father', 'src/assets/father.png');

    //Sister NPC
    this.load.image('sister', 'src/assets/sister.png');

    //Music
    this.load.audio('audio', 'src/assets/background_sound.ogg');

    //Catchables
    this.load.image("beer-catchable", "src/assets/catchables/beer.png");
    this.load.image("watch", "src/assets/catchables/watch.png");
    this.load.image("thor", "src/assets/catchables/mjolnir.png");
    this.load.image("golfClub", "src/assets/catchables/golfclub.png");
    this.load.image("football", "src/assets/catchables/football.png");
    this.load.image("bow", "src/assets/catchables/bow.png");
    this.load.image("tensiometer", "src/assets/catchables/tensiometer.png");
    this.load.image("lens", "src/assets/catchables/lens.png");
    this.load.image("pillJars", "src/assets/catchables/pilulier.png");
    this.load.image("toothbrush", "src/assets/catchables/toothbrush.png");
    this.load.image('babySuit', "src/assets/catchables/babysuit.png");
    this.load.image('thermometer', 'src/assets/catchables/thermometer.png');
    this.load.image('sleepCaptor', 'src/assets/catchables/capteursom.png');


    //Buttons Fullscreen
    this.load.image("enterfullscreen", "src/assets/enterfullscreen.png");
    this.load.image("exitfullscreen", "src/assets/exitfullscreen.png");

    //INVENTORY
    this.load.image("inventory", "src/assets/inventory.png");

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
