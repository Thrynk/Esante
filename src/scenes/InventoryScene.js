import Phaser from "phaser";
import  { CST } from "../CST";
import Catchable from "../entities/catchable";

export class InventoryScene extends Phaser.Scene {
  constructor(){
    super({
        key: CST.SCENES.INVENTORY
    })
    this.items = [];
    this.object;
  }

  init(items){
    this.items = items;
  }

  preload(){
    /*this.cameras.main.setBackgroundColor("#000000");*/
  }

  create(){
    var inventory = this.add.image(400, 300, "inventory");
    var button = this.add.image(400, 450, "deposerButton");
    button.setScale(0.5);
    button.setInteractive();
    button.on('pointerdown', function(){
      this.events.emit('dropItem', this.object);
      this.object.destroy();
      this.items.pop();
    }, this);

    var x = 400;
    var y = 320;
    var items = 0;
    this.items.forEach(function(item){
      this.object = new Catchable(this, x, y, item.texture.key);
      this.object.setScale(item.scaleX * 10);
    }, this);
    this.input.keyboard.on('keydown-' + 'I', function (event) {
      this.scene.stop(CST.SCENES.INVENTORY);
    }, this);
  }
}
