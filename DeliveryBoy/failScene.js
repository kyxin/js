
class failScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'failScene' });
    }

    preload() {
        this.load.image('next','assets/failScene.png');
    }

    create () {

        this.add.image(0, 0, 'next').setOrigin(0, 0).setScale(0.24);
        console.log("This is failScene");

        // music
        this.bgmusicSnd = this.sound.add('bgmusic');

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto introScene");
        var player = {
            x:500,
            y:936
        }
        this.bgmusicSnd.stop(); 
        window.score = 0 
        // this.scene.sound.removeAll();
        this.scene.start("Level1", { player : player });
        }, this );

    }

}