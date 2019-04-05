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
    console.log(this.items);
    var inventory = this.add.image(400, 300, "inventory");
    this.items.forEach(function(item){
      var displayObject = new Catchable(this, 214, 195, item.texture.key);
      displayObject.setScale(2);
      console.log(displayObject);
    }, this);
    this.input.keyboard.on('keydown-' + 'I', function (event) {
      this.scene.stop(CST.SCENES.INVENTORY);
    }, this);
  }
}
