class Level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Level1' });
    }

 preload () {
    var map =  this.load.tilemapTiledJSON('map', 'assets/map01.json');
    this.load.spritesheet('tiles', 'assets/tileset32x32-20.png', {frameWidth: 32, frameHeight: 32});

    // player animations
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    // enemy animations
    this.load.atlas('dog','assets/dog.png','assets/dog.json');
    this.load.spritesheet('obstacle','assets/obstacle.png',{frameWidth: 106, frameHeight: 128});

    // music
    this.load.audio('bgmusic','assets/gameBGM.mp3')
    this.load.audio('collectSound','assets/collectSound.mp3')
    this.load.audio('failSound','assets/failSound.mp3')
} 

 create () {
    var map = this.make.tilemap({key: 'map'});
    
    // tiles64x64 is name inside Tiled
    var Tiles = map.addTilesetImage('tileset32x32-20','tiles');
    
    // groundLayer & platformLayer from Tiled
    this.groundLayer = map.createDynamicLayer('ground_layer', Tiles, 0, 0).setScale(1);
    this.houseLayer = map.createDynamicLayer('house_layer', Tiles, 0, 0).setScale(1);
    this.treeLayer = map.createDynamicLayer('tree_layer', Tiles, 0, 0).setScale(1);
    this.shopLayer = map.createDynamicLayer('shop_layer', Tiles, 0, 0).setScale(1);

    // set collider
    this.treeLayer.setCollisionByProperty({ tree:true });
    this.shopLayer.setCollisionByProperty({ shop:true });
    this.houseLayer.setCollisionByProperty({ house:true });

    // music
    this.bgmusicSnd = this.sound.add('bgmusic');
    this.bgmusicSnd.play();
    this.bgmusicSnd.loop = true;


    // tween
    this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 2000, callback: this.moveDownUp, callbackScope: this, loop: false });
    
    var start = map.findObject("object_layer", obj => obj.name === "start");
    this.end = map.findObject("object_layer", obj => obj.name === "end");
    // console.log(this.end.x,this.end.y)
    
     // create the player sprite
     this.player = this.physics.add.sprite(start.x, start.y, 'player').setScale(0.2);
     // small fix to our player images, we resize the physics body object slightly
     this.player.body.setSize(this.player.width, this.player.height);
     
     
     this.physics.world.bounds.width = this.groundLayer.width;
     this.physics.world.bounds.height = this.groundLayer.height;

    // this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player,this.groundLayer);
    this.physics.add.collider(this.player,this.houseLayer);
    this.physics.add.collider(this.player,this.shopLayer);
    this.physics.add.collider(this.player,this.treeLayer);

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
    // create the enemy sprite
    this.dog = this.physics.add.sprite(450, 700, 'dog').setScale(0.2).play('dogAnim');
    this.dog2 = this.physics.add.sprite(480,220, 'dog').setScale(0.2).play('dogAnim');
    this.obstacle = this.physics.add.sprite(350, 350, 'obstacle').setScale(0.2);
    this.obstacle2 = this.physics.add.sprite(800, 700, 'obstacle').setScale(0.2);
    this.obstacle3 = this.physics.add.sprite(700, 220, 'obstacle').setScale(0.2);
  

        this.cursors = this.input.keyboard.createCursorKeys();
    
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');
    }
    
     update() {
    
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
        // console.log(this.player.x,this.player.y)

         // Check for reaching endPoint object
    if ( this.player.x >= 450 && this.player.y <= 150 ) {
        console.log('Reached End, game over');
        //this.cameras.main.shake(500);
        this.time.delayedCall(1000,function() {
            this.bgmusicSnd.loop = false;
            this.bgmusicSnd.stop(); 
            this.scene.stop("level1");
            this.scene.start("endScene");
        },[], this);
    }
        } 
        // end of update 

        moveRightLeft(){
        console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.dog,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 3000,
            tweens: [
            {
                x: 450,
            },
            {
                x: 450,
            },
            {
                x: 450,
            },
        ]
        }); 
    }
    moveRightLeft(){
        console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.dog2,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 3000,
            tweens: [
            {
                x: 480,
            },
            {
                x: 650,
            },
            {
                x: 480,
            },
        ]
        }); 
    }
    moveDownUp(){
        console.log('moveDownUp')
        this.tweens.timeline({
            targets: this.obstacle,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 3000,
            tweens: [
            {
                y: 350,
            },
            {
                y: 450,
            },
            {
                y: 350,
            },
        ]
        }); 
    }
    moveDownUp(){
        console.log('moveDownUp')
        this.tweens.timeline({
            targets: this.obstacle2,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 3000,
            tweens: [
            {
                y: 700,
            },
            {
                y: 780,
            },
            {
                y: 700,
            },
        ]
        }); 
    }

    moveDownUp(){
        console.log('moveDownUp')
        this.tweens.timeline({
            targets: this.obstacle3,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 3000,
            tweens: [
            {
                y: 220,
            },
            {
                y: 320,
            },
            {
                y: 220,
            },
        ]
        }); 
    }

        }
        // end of the scene