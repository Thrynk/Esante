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
    var x = 214;
    var y = 195;
    var items = 0;
    this.items.forEach(function(item){
      var displayObject = new Catchable(this, x, y, item.texture.key);
      displayObject.setScale(item.scaleX * 4);
      console.log(displayObject);
      x += 75;
      items++;
      if(items % 6 === 0){
        x = 214;
        y += 85;
      }
    }, this);
    this.input.keyboard.on('keydown-' + 'I', function (event) {
      this.scene.stop(CST.SCENES.INVENTORY);
    }, this);
  }
}
