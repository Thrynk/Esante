import Phaser from "phaser";
import { CST } from "../CST";

export class GameScene extends Phaser.Scene {
  
  constructor(){
    super({
      key: CST.SCENES.GAME
    });
  }

  preload(){
    this.load.image('kenney', 'src/assets/tileset.png');
    this.load.tilemapTiledJSON("map", 'src/assets/map.json');
    this.load.image('player', 'src/assets/player.png');
  }

  create(){
    this.map = this.add.tilemap("map");
    this.tileset = this.map.addTilesetImage("indoor", "kenney");
    this.layer = this.map.createStaticLayer("furnitures", this.tileset, 0, 0);

    this.map.setCollisionByProperty({collides: "true"});


    this.player = this.physics.add.sprite(64, 200, 'player');

    this.player.setScale(0.2);

    this.physics.add.collider(this.player, this.layer);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.layer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  update(){
    var accel = 100;

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-accel);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(accel);
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(accel);
    }
    else if (this.cursors.up.isDown)
    {
      this.player.setVelocityY(-accel);
    }
  }
}