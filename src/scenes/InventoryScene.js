import Phaser from "phaser";
import  { CST } from "../CST";

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
    this.cameras.main.setBackgroundColor("#000000");
  }

  create(){
    this.input.keyboard.on('keydown-' + 'I', function (event) {
      this.scene.stop(CST.SCENES.INVENTORY);
    }, this);
  }
}
