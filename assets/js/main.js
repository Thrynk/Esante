var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;

function preload ()
{
  this.load.image('kenney', 'assets/tileset.png');
  this.load.tilemapTiledJSON("map", 'assets/map.json');
  this.load.image('player', 'assets/player.png');
}

function create ()
{
  var map = this.add.tilemap("map");
  var tileset = map.addTilesetImage("indoor", "kenney");
  var layer = map.createStaticLayer("furnitures", tileset, 0, 0);

  map.setCollisionByProperty({ collides: true });

  /*this.impact.world.setCollisionMapFromTilemapLayer(layer, { collides: true });*/
  /*var slopeMap = { 4: 1 };
  this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeMap: slopeMap });*/

  /*this.add.image(32, 32, 'player', '__BASE').setOrigin(0);*/

    /*sprite = this.add.sprite(400, 300, 'player').setScale(0.2);*/

    player = this.physics.add.sprite(64, 200, 'player');

    player.setScale(0.2);

    /*this.physics.arcade.add.collider(player, layer);*/


    /*this.impact.add.collider(player, layer);*/

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);

    cursors = this.input.keyboard.createCursorKeys();

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    layer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

}

function update ()
{
  var accel = 100;

  player.body.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-accel);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(accel);
    }

    if (cursors.down.isDown) {
      player.setVelocityY(accel);
    }
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-accel);
    }

    player.body.velocity.normalize();

}
