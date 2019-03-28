import Phaser from "phaser";
import { CST } from "../CST";
import Player from "../entities/player";

export class GameScene extends Phaser.Scene {

  constructor(){
    super({
      key: CST.SCENES.GAME
    });

    this.tilesets = [];
    this.layers = [];
  }

  preload(){

  }

  create(){
    this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    this.tilesets.push(this.map.addTilesetImage('indoor2'));
    this.tilesets.push(this.map.addTilesetImage("tilesetpokemon"));
    this.tilesets.push(this.map.addTilesetImage("tilsetwall"));
    this.tilesets.push(this.map.addTilesetImage("indoor"));
    this.tilesets.push(this.map.addTilesetImage("bed3"));

    this.layers.push(this.map.createStaticLayer("collides", this.tilesets, 0, 0));

    this.map.setCollisionByProperty({collides: "true"});

    this.layers.push(this.map.createStaticLayer("ground", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("carpet", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("chairs", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("wall", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("window", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("plant", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("furnitures", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("surrounded", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("beer", this.tilesets, 0, 0));
    //this.scale.startFullscreen();
    //console.log(this.layers);

    this.player = new Player(this, 512, 688, 'player');

    this.player.setScale(1.8);

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 8, end: 11 }),
      frameRate: 10,
      repea t: 0
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: 0
    });

    this.physics.add.collider(this.player, this.layers[0]);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    /*const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.layers[0].renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });*/
    console.log(this.player.getBounds());
    console.log(this.player.getBounds().y - 32);
    console.log(this.layers[7]);
    console.log(this.layers[7].getTileAtWorldXY(this.player.getBounds().x, this.player.getBounds().y - 8));
    this.layers[7].getTileAtWorldXY(this.player.getBounds().x, this.player.getBounds().y - 8).setVisible(false);
  }

  update(){
    var accel = 200;

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-accel);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(accel);
      this.player.anims.play('right', true);
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(accel);
      if(this.cursors.right.isDown === false && this.cursors.left.isDown === false)
        this.player.anims.play('down', true);
    }
    else if (this.cursors.up.isDown)
    {
      this.player.setVelocityY(-accel);
      if(this.cursors.right.isDown === false && this.cursors.left.isDown === false)
        this.player.anims.play('up', true);
    }
  }
}
