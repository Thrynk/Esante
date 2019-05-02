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
  }

  preload(){

    this.music = this.sound.add('audio');
    this.music.play();

    this.scene.launch(CST.SCENES.HUD);
    this.scene.bringToTop(CST.SCENES.HUD);

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
    this.tilesets.push(this.map.addTilesetImage("door"));
    this.tilesets.push(this.map.addTilesetImage("fences"));
    this.tilesets.push(this.map.addTilesetImage("outdoor"));
    this.tilesets.push(this.map.addTilesetImage("garden"));
    this.tilesets.push(this.map.addTilesetImage("trees"));

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

    /*this.layers[8].setDepth(3);*/
    this.layers.push(this.map.createStaticLayer("wall2", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("furnitures2", this.tilesets, 0, 0));
    this.layers.push(this.map.createStaticLayer("beer", this.tilesets,0, 0));
    //this.scale.startFullscreen();
    //console.log(this.layers);

    this.player = new Player(this, 512, 688, 'player');
    this.player.setScale(1.8);
    this.player.setSize(12, 12).setOffset(2,3);
    this.player.setDepth(2);

    this.player.items = [];

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

    var objects = require('../entities/Objects_Info.json');
    var spawns = require('../entities/Objects_Spawn.json');

    for(var name in objects){

      var randomRoomIndex = Math.floor(Math.random() * Math.floor(objects[name].spawnRoom.length));
      var randomRoom = objects[name].spawnRoom[randomRoomIndex];
      var roomObject = spawns.rooms.find(function(room){
        return room.name === randomRoom;
      });
      while(roomObject.spawns.length === 0){
        randomRoomIndex = Math.floor(Math.random() * Math.floor(objects[name].spawnRoom.length));
        randomRoom = objects[name].spawnRoom[randomRoomIndex];
        roomObject = spawns.rooms.find(function(room){
          return room.name === randomRoom;
        });
      }

      var randomSpawnIndex = Math.floor(Math.random() * Math.floor(roomObject.spawns.length));
      var randomSpawn = roomObject.spawns[randomSpawnIndex];

      roomObject.spawns.splice(randomSpawnIndex, 1);

      var object = new Catchable(this, randomSpawn.x, randomSpawn.y, objects[name].texture);
      object.setScale(objects[name].scale);
      this.pickups.add(object);
    }

    /*const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.layers[0].renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });*/

    this.input.keyboard.on('keydown-' + 'E', function (event) {

      var playerCenter = this.player.getCenter();
      var circleAroundPlayer = new Phaser.Geom.Circle(playerCenter.x, playerCenter.y, 34);

      this.pickups.children.entries.forEach(function(object){
        var objectCenterPoint = new Phaser.Geom.Point(object.getCenter().x, object.getCenter().y);

        if(Phaser.Geom.Circle.ContainsPoint(circleAroundPlayer, objectCenterPoint)){
          if(object.active){
            /*object.setActive(false).setVisible(false); Same effect than killAndHide I think*/
            this.player.items.push(object);
            this.pickups.killAndHide(object);
          }
        }
      }, this);
    }, this);

    this.input.keyboard.on('keydown-' + 'I', function (event) {
      console.log(this.player.items);
      this.scene.launch(CST.SCENES.INVENTORY, this.player.items);
    }, this);

  }

  update(){
    var accel = 130;

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
    /*console.log(this.player.body.x, this.player.body.y);*/
  }
}
