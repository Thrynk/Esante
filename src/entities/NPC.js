import Phaser from "phaser";

export default class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.world.enable(this);
        // ...
        scene.add.existing(this);
    }

    this.problemSolved = false;

    // preUpdate(time, delta) {}
}
