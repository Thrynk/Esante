import Phaser from "phaser";
import  { CST } from "../CST";

export default class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.world.enable(this, 1);
        // ...
        scene.add.existing(this);
        this.problemSolved = false;
        this.chatbox;
        this.resolve;
        this.scene = scene;
        this.hasAlreadyTalked = false;
    }

    setChatbox(text){
      this.chatbox=text;
    }
    setResolve(res){
      this.resolve=res;
    }

    talk(item){
      if(item === undefined && !this.hasAlreadyTalked){
        this.scene.scene.launch(CST.SCENES.DIALOGUE, this.chatbox[0]);
        this.hasAlreadyTalked = true;
      }
      else if(item !== undefined && !this.hasAlreadyTalked){
        this.scene.scene.launch(CST.SCENES.DIALOGUE, this.chatbox[0]);
        this.hasAlreadyTalked = true;
      }
      else if(item === undefined && this.hasAlreadyTalked){
        this.scene.scene.launch(CST.SCENES.DIALOGUE, this.chatbox[1]);
      }
      else if(item !== undefined && item.texture.key === this.resolve && this.hasAlreadyTalked){
        this.scene.scene.launch(CST.SCENES.DIALOGUE, this.chatbox[2]);
        this.problemSolved = true;
        console.log(this.scene);
        this.scene.events.emit('isGameFinished');
        this.scene.events.emit('removeObjFromInventory');
      }
      else if(item !== undefined && item.texture.key !== this.resolve && this.hasAlreadyTalked){
        this.scene.scene.launch(CST.SCENES.DIALOGUE, this.chatbox[3]);
      }
    }
    // preUpdate(time, delta) {}
}
