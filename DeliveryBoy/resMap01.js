
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
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

function preload () {
    var map =  this.load.tilemapTiledJSON('resMap01', 'assets/resMap01.json');
    this.load.spritesheet('resMap01', 'assets/resMap01.png', {frameWidth: 32, frameHeight: 32});

    // music
    this.load.audio('bgmusic','assets/resBGM.mp3')
    this.load.audio('collectSound','assets/collectSound.mp3')
}  

function create () {
    var map = this.make.tilemap({key: 'resMap01'});
    
    // tiles32x32 is name inside Tiled
    var Tiles = map.addTilesetImage('resMap01','tiles');
    
    // groundLayer & platformLayer from Tiled
    this.groundLayer = map.createDynamicLayer('ground_layer', Tiles, 0, 0).setScale(1);
    this.tableLayer = map.createDynamicLayer('table_layer', Tiles, 0, 0).setScale(1);

    // set collider
    this.tableLayer.setCollisionByProperty({ tree:true });

    // music
    this.bgmusicSnd = this.sound.add('bgmusic');
    this.bgmusicSnd.play();
    this.bgmusicSnd.loop = true;

    // create the player sprite
    this.player = this.physics.add.sprite(start.x, start.y, 'player').setScale(0.2);
    // small fix to our player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    
    
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

   // this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player,this.groundLayer);
    this.physics.add.collider(this.player,this.tableLayer);

    this.anims.create({
        key:'run',
        frames:[
            {key: 'player', frame: 'run_01'},
            {key: 'player', frame: 'run_02'},
            {key: 'player', frame: 'run_03'},
            {key: 'player', frame: 'run_04'},
           
        ],
    
        frameRate:10,
        repeat: -1
        });
    
        this.anims.create({
        key:'walk',
        frames: [
            {key:'player', frame:'walk_01'},
            {key:'player', frame:'walk_02'},
            {key:'player', frame:'walk_03'},
            {key:'player', frame:'walk_04'},
            {key:'player', frame:'walk_05'},
            {key:'player', frame:'walk_06'},
            {key:'player', frame:'walk_07'},
            {key:'player', frame:'walk_08'},
            {key:'player', frame:'walk_09'},
        ],
        frameRate:10,
        repeat: -1
        });

        this.anims.create({
            key:'back',
            frames: [
            {key:'player', frame:'back_01'},
            {key:'player', frame:'back_02'},
            {key:'player', frame:'back_03'},
            {key:'player', frame:'back_04'},
            {key:'player', frame:'back_05'},
            {key:'player', frame:'back_06'},
            {key:'player', frame:'back_07'},
            {key:'player', frame:'back_08'},
            {key:'player', frame:'back_09'},
            ],
            frameRate:10,
            repeat: -1
            });

        this.anims.create({
                key:'dogAnim',
                frames: [
                    {key:'dog', frame:'dog_01'},
                    {key:'dog', frame:'dog_02'},
                    {key:'dog', frame:'dog_03'},
                    {key:'dog', frame:'dog_04'},
                    ],
                    frameRate:6,
                    repeat: -1
                    });

        this.cursors = this.input.keyboard.createCursorKeys();
    
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

    



}

function update () {
    if (this.cursors.left.isDown)
    {
        console.log("left");
        this.player.body.setVelocityX(-200);
        this.player.anims.play('run', true); // walk left
        this.player.flipX = false; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        console.log("right");
        this.player.body.setVelocityX(200);
        this.player.anims.play('run', true);
        this.player.flipX = true; // use the original sprite looking to the right
    }
    else if (this.cursors.up.isDown)
    {
        console.log("up");
        this.player.body.setVelocityY(-200);
        this.player.anims.play('back', true);
    }
    else if (this.cursors.down.isDown)
    {
        console.log("down");
        this.player.body.setVelocityY(200);
        this.player.anims.play('walk', true);
    }
    else {
        this.player.body.setVelocity(0);
        this.player.anims.stop();
    }
      // Check for reaching endPoint object
      if ( this.player.x >= 450 && this.player.y <= 150 ) {
        console.log('Reached End, game over');
        //this.cameras.main.shake(500);
        this.time.delayedCall(1000,function() {
            this.bgmusicSnd.loop = false;
            this.bgmusicSnd.stop(); 
            this.scene.start("endScene");
        },[], this);
    }

}