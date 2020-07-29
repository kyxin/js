class StoryScene1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'StoryScene' });
    }

    preload() {
        this.load.image('storyscene','assets/storyscene.png');
    }

    create () {

        this.add.image(0, 0, 'storyscene').setOrigin(0, 0).setScale(0.24);
        console.log("This is storyScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto Instruction1");
        this.scene.start("Instruction1");
        }, this );

    }

}