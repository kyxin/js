class IntroScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'IntroScene' });
    }

    preload() {
        this.load.image('story','assets/introscene.png');
        
    // player animations
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    // enemy animations
    this.load.atlas('dog','assets/dog.png','assets/dog.json');
    this.load.spritesheet('obstacle','assets/obstacle.png',{frameWidth: 106, frameHeight: 128});

    // // music
    this.load.audio('bgmusic','assets/gameBGM.mp3')
    this.load.audio('resBgm1',"assets/resBGM.mp3")
    this.load.audio('resBgm2',"assets/resBGM.mp3")
    this.load.audio('resBgm3',"assets/resBGM.mp3")
    this.load.audio('collectSound','assets/collectSound.mp3')
    this.load.audio('failSound','assets/failSound.mp3')

    // collected items
    this.load.image('chicken', 'assets/chicken.png');
    this.load.image('burger', 'assets/burger.png');
    this.load.image('pizza', 'assets/pizza.png');
    
    }

    create () {

        this.add.image(0, 0, 'story').setOrigin(0, 0).setScale(0.24);
        console.log("This is introScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);

        key1.on('down', function(){
            console.log("key1 pressed, goto Level1");
            var player = {
                x:500,
                y:936
            }
            this.scene.start("Level1", { player : player });
            }, this );
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto storyscene");
        this.scene.start("StoryScene");
        }, this );

    }

}
