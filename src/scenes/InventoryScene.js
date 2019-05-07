import Phaser from "phaser";
import  { CST } from "../CST";
import Catchable from "../entities/catchable";

export class InventoryScene extends Phaser.Scene {
  constructor(){
    super({
        key: CST.SCENES.INVENTORY
    })
    this.items = [];
  }

  init(items){
    this.items = items;
  }

  preload(){
    /*this.cameras.main.setBackgroundColor("#000000");*/
  }

  create(){
    var inventory = this.add.image(400, 300, "inventory");
    var x = 400;
    var y = 320;
    var items = 0;
    this.items.forEach(function(item){
      var displayObject = new Catchable(this, x, y, item.texture.key);
      displayObject.setScale(item.scaleX * 10);
    }, this);
    this.input.keyboard.on('keydown-' + 'I', function (event) {
      this.scene.stop(CST.SCENES.INVENTORY);
    }, this);
  }
}
