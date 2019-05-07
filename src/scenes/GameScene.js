import Phaser from "phaser";
import { CST } from "../CST";
import Player from "../entities/player";
import Catchable from "../entities/catchable";
import NPC from "../entities/NPC";

export class GameScene extends Phaser.Scene {

  constructor(){
    super({
      key: CST.SCENES.GAME
    });

    this.tilesets = [];
    this.layers = [];

    this.music;
    this.tabNPC;
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

    this.layers[8].setDepth(3);
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
      console.log(name, " ", randomRoom);

      roomObject.spawns.splice(randomSpawnIndex, 1);

      var object = new Catchable(this, randomSpawn.x, randomSpawn.y, objects[name].texture);
      object.setScale(objects[name].scale);
      this.pickups.add(object);
    }

    var npc=require("../entities/NPC.json");

    this.tabNPC = this.add.group();
    for(name in npc){
      this.tabNPC.add(new NPC(this,npc[name].posX,npc[name].posY,npc[name].texture));
      this.tabNPC.children.entries[this.tabNPC.children.entries.length - 1].setScale(npc[name].scale);
      this.tabNPC.children.entries[this.tabNPC.children.entries.length - 1].setSize(0.45*42, 0.45*53);
      this.tabNPC.children.entries[this.tabNPC.children.entries.length - 1].setChatbox(npc[name].chatbox);
      this.tabNPC.children.entries[this.tabNPC.children.entries.length - 1].setResolve(npc[name].resolve);
    }
    this.tabNPC.children.entries[0].setOffset(12,15);
    this.tabNPC.children.entries[1].setOffset(22,21);
    this.tabNPC.children.entries[2].setOffset(17,18);
    this.tabNPC.children.entries[3].setOffset(21,23);
    this.tabNPC.children.entries[4].setOffset(18,14);

    this.physics.add.collider(this.player, this.tabNPC);


    /*const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.layers[0].renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });*/

    this.input.keyboard.on('keydown-' + 'F', function (event) {

      var playerCenter = this.player.getCenter();
      var circleAroundPlayer = new Phaser.Geom.Circle(playerCenter.x, playerCenter.y, 34);

      this.tabNPC.children.entries.forEach(function(object){
        var objectCenterPoint = new Phaser.Geom.Point(object.getCenter().x, object.getCenter().y);
        if(Phaser.Geom.Circle.ContainsPoint(circleAroundPlayer, objectCenterPoint)){
          object.talk(this.player.items[0]);
            /*object.setActive(false).setVisible(false); Same effect than killAndHide I think*/
            /*this.player.items.push(object);
            this.pickups.killAndHide(object);*/
        }
      }, this);
    }, this);


    this.input.keyboard.on('keydown-' + 'E', function (event) {

      var playerCenter = this.player.getCenter();
      var circleAroundPlayer = new Phaser.Geom.Circle(playerCenter.x, playerCenter.y, 34);

      this.pickups.children.entries.forEach(function(object){
        var objectCenterPoint = new Phaser.Geom.Point(object.getCenter().x, object.getCenter().y);

        if(Phaser.Geom.Circle.ContainsPoint(circleAroundPlayer, objectCenterPoint)){
          if(object.active){
            if(this.player.items.length < 1){
              /*object.setActive(false).setVisible(false); Same effect than killAndHide I think*/
              this.player.items.push(object);
              this.pickups.killAndHide(object);
              this.pickups.remove(object);
            }
            else{
              console.log("Vous avez déjà un objet");
              this.events.emit('alreadyFull');
            }
          }
        }
      }, this);
    }, this);

    this.input.keyboard.on('keydown-' + 'I', function (event) {
      this.scene.launch(CST.SCENES.INVENTORY, this.player.items);
    }, this);

    let inventoryScene = this.scene.get(CST.SCENES.INVENTORY);
    inventoryScene.events.on('dropItem', function(event){
      console.log(event);
      var object = new Catchable(this, this.player.body.x, this.player.body.y, event.texture.key);
      object.setScale(objects[event.texture.key].scale);
      this.pickups.add(object);
    }, this);

    this.events.on('isGameFinished', function(){
      var numberOfProblemsSolved = 0;
      this.tabNPC.children.entries.forEach(function(object){
          if(object.problemSolved){
            numberOfProblemsSolved++;
          }
      });
      console.log(numberOfProblemsSolved);
      if(numberOfProblemsSolved == 5){
        this.scene.pause(CST.SCENES.HUD); // A retirer et faire le fond de fin
        this.scene.pause(CST.SCENES.GAME);
      }
    }, this);

    this.events.on('removeObjFromInventory', function(){
      this.player.items.pop();
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
