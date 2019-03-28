import Phaser from "phaser";

export default class Catchable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    // preUpdate(time, delta) {}
}
