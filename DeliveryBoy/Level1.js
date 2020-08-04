class Level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Level1' });
    }

    init(data){
        this.player = data.player
        this.food1 = data.player.chicken
        this.food2 = data.player.burger
        this.food3 = data.player.pizza
    }

 preload () {
    var map =  this.load.tilemapTiledJSON('map', 'assets/map01.json');
    this.load.spritesheet('tiles', 'assets/tileset32x32-20.png', {frameWidth: 32, frameHeight: 32});


    // // player animations
    // this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    // // enemy animations
    // this.load.atlas('dog','assets/dog.png','assets/dog.json');
    // this.load.spritesheet('obstacle','assets/obstacle.png',{frameWidth: 106, frameHeight: 128});

    // // // music
    // this.load.audio('bgmusic','assets/gameBGM.mp3')
    // this.load.audio('collectSound','assets/collectSound.mp3')
    // this.load.audio('failSound','assets/failSound.mp3')

    // // collected items
    // this.load.image('chicken', 'assets/chicken.png');
    // this.load.image('burger', 'assets/burger.png');
    // this.load.image('pizza', 'assets/pizza.png');
    
} 

 create () {
    var map = this.make.tilemap({key: 'map'});
    
    // tiles32x32 is name inside Tiled
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
    this.failSoundSnd = this.sound.add('failSound');
    this.collectSoundSnd = this.sound.add('collectSound');


    // tween
    this.time.addEvent({ delay: 0, callback: this.moveRightLeft, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 1000, callback: this.moveRightLeft2, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 0, callback: this.moveDownUp, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 2000, callback: this.moveDownUp2, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 1000, callback: this.moveDownUp3, callbackScope: this, loop: false });
    
    //star and end point 
    // var start = map.findObject("object_layer", obj => obj.name === "start");
    // this.end = map.findObject("object_layer", obj => obj.name === "end");
    // console.log(this.end.x,this.end.y)
    
     // create the player sprite
     this.player = this.physics.add.sprite(this.player.x, this.player.y, 'player').setScale(0.2);
     
     // small fix to our player images, we resize the physics body object slightly
     this.player.body.setSize(this.player.width, this.player.height);
     window.player= this.player
     
      // collect items
    this.chicken = this.physics.add.sprite(-50,-50, 'chicken').setScale(0.3);
    window.chicken = this.chicken
    this.burger = this.physics.add.sprite(-50,-50, 'burger').setScale(0.3);
    window.burger = this.burger
    this.pizza = this.physics.add.sprite(-50,-50, 'pizza').setScale(0.3);
    window.pizza = this.pizza
     
     this.physics.world.bounds.width = this.groundLayer.width;
     this.physics.world.bounds.height = this.groundLayer.height;

    
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
    this.dog1 = this.physics.add.sprite(450, 700, 'dog').setScale(0.2).play('dogAnim');
    this.dog2 = this.physics.add.sprite(480,220, 'dog').setScale(0.2).play('dogAnim');
    this.obstacle1 = this.physics.add.sprite(350, 350, 'obstacle').setScale(0.2);
    this.obstacle2 = this.physics.add.sprite(750, 700, 'obstacle').setScale(0.2);
    this.obstacle3 = this.physics.add.sprite(700, 220, 'obstacle').setScale(0.2);
  
    // this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player,this.groundLayer);
    this.physics.add.collider(this.player,this.houseLayer);
    this.physics.add.collider(this.player,this.shopLayer);
    this.physics.add.collider(this.player,this.treeLayer);
    

    // hit dog
    this.physics.add.collider(this.player, this.dog1, this.hitdog1, null, this);
    this.physics.add.collider(this.player, this.dog2, this.hitdog1, null, this);

    // hit obstacle
    this.physics.add.collider(this.player, this.obstacle1, this.hitobstacle1, null, this);
    this.physics.add.collider(this.player, this.obstacle2, this.hitobstacle1, null, this);
    this.physics.add.collider(this.player, this.obstacle3, this.hitobstacle1, null, this);


    // jump into small map (resMap01)
    this.shopLayer.setTileIndexCallback(71, this.shop1, this);
    this.shopLayer.setTileIndexCallback(72, this.shop1, this);
    this.shopLayer.setTileIndexCallback(73, this.shop1, this);
    

    // reach house get point (resMap01)
    this.houseLayer.setTileIndexCallback(58, this.house1, this);
    this.houseLayer.setTileIndexCallback(59, this.house1, this);
    this.houseLayer.setTileIndexCallback(60, this.house1, this);

     // jump into small map (resMap02)
     this.shopLayer.setTileIndexCallback(66, this.shop2, this);
     this.shopLayer.setTileIndexCallback(67, this.shop2, this);
     this.shopLayer.setTileIndexCallback(68, this.shop2, this);
     
     // reach house get point (resMap02)
     this.houseLayer.setTileIndexCallback(45, this.house2, this);
     this.houseLayer.setTileIndexCallback(46, this.house2, this);


     // jump into small map (resMap03)
     this.shopLayer.setTileIndexCallback(90, this.shop3, this);
     this.shopLayer.setTileIndexCallback(91, this.shop3, this);
     this.shopLayer.setTileIndexCallback(92, this.shop3, this);
  
     // reach house get point (resMap03)
     this.houseLayer.setTileIndexCallback(61, this.house3, this);
     this.houseLayer.setTileIndexCallback(62, this.house3, this);
   
     
     
     this.physics.add.collider(this.houseLayer, this.player);
     this.physics.add.collider(this.shopLayer, this.player);

       
    
    
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        
            
    }

    // end of create
    
     update() {
    
if(this.food1 == 1){
    this.chicken.x=this.player.x+32
    this.chicken.y=this.player.y

}

if(this.food2 == 1){
    this.burger.x=this.player.x+32
    this.burger.y=this.player.y

}

if(this.food3 == 1){
    this.pizza.x=this.player.x+32
    this.pizza.y=this.player.y

}

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
            this.scene.start("endScene");
        },[], this);
    }
        } 
        // end of update 

        moveRightLeft(){
        console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.dog1,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
            tweens: [
            {
                x: 450,
            },
            {
                x: 550,
            },
            {
                x: 450,
            },
        ]
        }); 
    }
    moveRightLeft2(){
        console.log('moveRightLeft2')
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
            targets: this.obstacle1,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
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
    moveDownUp2(){
        console.log('moveDownUp2')
        this.tweens.timeline({
            targets: this.obstacle2,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
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

    moveDownUp3(){
        console.log('moveDownUp3')
        this.tweens.timeline({
            targets: this.obstacle3,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
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

//    hit dog
    hitdog1(player,dog){
            dog.disableBody(true, true);
            console.log('Hit dog1, restart game');
            // delay 1 sec  
            this.bgmusicSnd.loop = false
            this.bgmusicSnd.stop();
            this.failSoundSnd.play();          
            this.time.delayedCall(500,function() {
            this.scene.start("failScene");
               
            },[], this);
        }
// hit obstacle
        hitobstacle1(player,obstacle){
            obstacle.disableBody(true, true);
            console.log('Hit obstacle, restart game');
            // delay 1 sec  
            this.bgmusicSnd.loop = false
            this.bgmusicSnd.stop();
            this.failSoundSnd.play();          
            this.time.delayedCall(500,function() {
            this.scene.start("failScene");
               
            },[], this);
        }

        // small map function (shop01)
        shop1(player,tile) {
            console.log('shop: ',tile.index)
            this.bgmusicSnd.loop = false
            this.bgmusicSnd.stop();
            this.scene.start('shop1Scene', { player : player });
        }

         // small map function (shop02)
         shop2(player,tile) {
            console.log('shop: ',tile.index)
            this.bgmusicSnd.loop = false
            this.bgmusicSnd.stop();
            this.scene.start('shop2Scene', { player : player });
        }

        // small map function (shop03)
        shop3(player,tile) {
            console.log('shop: ',tile.index)
            this.bgmusicSnd.loop = false
            this.bgmusicSnd.stop();
            this.scene.start('shop3Scene', { player : player });
        }

        // hit house get point (house1)
        house1 (player,tile){
        console.log('house1',tile.index)
        this.collectSoundSnd.play();
        this.food1 = 0 
        this.chicken.x=-50
        this.chicken.y=-50
        
         }

         // hit house get point (house2)
        house2 (player,tile){
        console.log('house2',tile.index)
        this.food2 = 0 
        this.burger.x=-50
        this.burger.y=-50

        }

        // hit house get point (house3)
        house3 (player,tile){
            console.log('house3',tile.index)
            this.food3 = 0 
        this.pizza.x=-50
        this.pizza.y=-50
         }

}
        // end of the scene