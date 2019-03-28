import Phaser from "phaser";
import { CST } from "../CST";
import Player from "../entities/player";
import Catchable from "../entities/catchable";

export class GameScene extends Phaser.Scene {


  constructor(){
    super({
      key: CST.SCENES.GAME
    });

    this.tilesets = [];
    this.layers = [];

    this.music;

    this.timerText;
  }

  preload(){

    this.music = this.sound.add('audio');
    this.music.play();

  }

  create(){
    this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    this.tilesets.push(this.map.addTilesetImage('indoor2'));
    this.tilesets.push(this.map.addTilesetImage("tilesetpokemon"));
    this.tilesets.push(this.map.addTilesetImage("tilsetwall"));
    this.tilesets.push(this.map.addTilesetImage("indoor"));
    this.tilesets.push(this.map.addTilesetImage("bed3"));
    this.tilesets.push(this.map.addTilesetImage("shower"));
    this.tilesets.push(this.map.addTilesetImage("shower2"));

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
    this.layers.push(this.map.createStaticLayer("wall2", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("furnitures2", this.tilesets, 0, 0));
    this.layers.push(this.map.createDynamicLayer("beer", this.tilesets,0, 0));
    //this.scale.startFullscreen();
    //console.log(this.layers);

    this.player = new Player(this, 512, 688, 'player');
    this.player.setScale(1.8);
    this.player.setSize(12, 12).setOffset(2,3);
    this.player.setDepth(2);

    this.pickups = this.add.group();


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
      repeat: 0
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

    this.timerText = this.add.text(530, 688, 'timer: 0', { fontSize: '32px', fill: '#000' });

    this.pickups.add(new Catchable(this, 525, 688, "beer-catchable"));

    console.log(this.pickups);

    /*const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.layers[0].renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });*/

    this.input.keyboard.on('keydown-' + 'E', function (event) {
      console.log("E");
      var playerCenter = this.player.getCenter();
      var circleAroundPlayer = new Phaser.Geom.Circle(playerCenter.x, playerCenter.y, 34);
      console.log(circleAroundPlayer);

      this.pickups.children.entries.forEach(function(object){
        console.log(object.getCenter());
        var objectCenterPoint = new Phaser.Geom.Point(object.getCenter().x, object.getCenter().y);
        console.log(Phaser.Geom.Circle.ContainsPoint(circleAroundPlayer, objectCenterPoint));
        if(Phaser.Geom.Circle.ContainsPoint(circleAroundPlayer, objectCenterPoint)){
          object.destroy();
        }
      });
      /*console.log(this.layers[11].getTileAtWorldXY(this.player.getBounds().x + 8, this.player.getBounds().y - 8));
      console.log(this.layers[11].getTileAtWorldXY(this.player.getBounds().x + 24, this.player.getBounds().y - 8));
      if(this.layers[11].getTileAtWorldXY(this.player.getBounds().x + 8, this.player.getBounds().y - 8) !== null){
        this.layers[11].removeTileAtWorldXY(this.player.getBounds().x + 8, this.player.getBounds().y - 8);
      }
      else if(this.layers[11].getTileAtWorldXY(this.player.getBounds().x + 24, this.player.getBounds().y - 8) !== null){
        this.layers[11].removeTileAtWorldXY(this.player.getBounds().x + 24, this.player.getBounds().y - 8);
      }*/
    }, this);

    this.clock = this.plugins.get('rexClock').add(this, {
    // timeScale: 1
    });
    this.clock.start();

  }

  update(){
    var now = this.clock.now;
    /*console.log(now);*/
    this.timerText.setText('Timer : ' + Math.floor(now/1000));
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
