
class endScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endScene' });
    }

    preload() {
        this.load.image('next','assets/endScene.png');
    }

    create () {

        this.add.image(0, 0, 'next').setOrigin(0, 0).setScale(0.24);
        console.log("This is endScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto introScene");
        this.scene.start("IntroScene");
        }, this );

    }

}