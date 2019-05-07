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
    }

    setChatbox(text){
      this.chatbox=text;
    }
    setResolve(res){
      this.resolve=res;
    }

    talk(){
      /*console.log(this.chatbox);*/
      console.log(this.scene.scene);
      this.scene.scene.launch(CST.SCENES.DIALOGUE, this.chatbox[0]);
    }
    // preUpdate(time, delta) {}
}
