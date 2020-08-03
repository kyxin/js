class IntroScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'IntroScene' });
    }

    preload() {
        this.load.image('story','assets/introscene.png');
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
