class shop1Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'shop1Scene' });
        this.holdFood1 = 0
    }

    init(data){
        this.score = data.score 
    }

 preload () {
    var map =  this.load.tilemapTiledJSON('map2', 'assets/resMap01.json');
    this.load.spritesheet('resMap01', 'assets/resMap01.png', {frameWidth: 32, frameHeight: 32});
   
   
} 

 create () {
    var map = this.make.tilemap({key: 'map2'});
    
    // tiles32x32 is name inside Tiled
    var Tiles = map.addTilesetImage('resMap01','resMap01');
    
    // groundLayer & platformLayer from Tiled
    this.groundLayer = map.createDynamicLayer('ground_layer', Tiles, 0, 0).setScale(1);
    this.tableLayer = map.createDynamicLayer('table_layer', Tiles, 0, 0).setScale(1);

    // collect items
    this.chicken = this.physics.add.sprite(50, 300, 'chicken').setScale(0.3);
    window.chicken = this.chicken

    
    // set collider
    this.tableLayer.setCollisionByProperty({ table:true });
    this.tableLayer.setCollisionByProperty({ wareboard:true });
    this.tableLayer.setCollisionByProperty({ chair:true });
  

    // music
    this.collectSoundSnd = this.sound.add('collectSound');
    window.music1.play({volume:0.1});
    // this.resBgmSnd.loop = true;
   
    


   
    //star and end point 
    this.start = map.findObject("object_layer", obj => obj.name === "start_end");
    
     // create the player sprite
     this.player = this.physics.add.sprite(this.start.x, this.start.y, 'player').setScale(0.2);
     // small fix to our player images, we resize the physics body object slightly
     this.player.body.setSize(this.player.width, this.player.height);
     
     
     this.physics.world.bounds.width = this.groundLayer.width;
     this.physics.world.bounds.height = this.groundLayer.height;

     // collect action
    this.physics.add.overlap( this.chicken,this.player,this.holdChicken, null, this );



    
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

   
    // this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player,this.groundLayer);
    this.physics.add.collider(this.player,this.tableLayer);

    

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
    if (this.player.y > this.start.y ) {
        console.log('exit shop 1');
        //this.cameras.main.shake(500);
        this.time.delayedCall(1000,function() {
           if(this.holdFood1 == 1){
            
            var player = {
                x:688,
                y:895,
                chicken:1,
                score : this.score 
            }

           } else {
            var player = {
                x:688,
                y:895,
                chicken:0,
                score : this.score 
            }

           }
           window.music1.stop(); 
            this.scene.start("Level1", { player : player });
        },[], this);
    }
        } 
        // end of update 

        holdChicken(player,chicken) {
            // console.log('Collect chicken');
            console.log ('score ' , this.score)
            this.chicken.x = this.player.x+32
            this.chicken.y = this.player.y
            if (this.holdFood1 == 0) {
                this.collectSoundSnd.play();
            }
            this.holdFood1 = 1 
            return false;
        }
    
        

        }
        // end of the scene