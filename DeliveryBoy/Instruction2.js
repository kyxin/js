class Instruction2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Instruction2' });
    }

    preload() {
        this.load.image('instruction02','assets/instruction02.png');
    }

    create () {

        this.add.image(0, 0, 'instruction02').setOrigin(0, 0).setScale(0.24);
        console.log("This is instruction02");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto Level1");
        var player = {
            x:500,
            y:936
        }
        this.scene.start("Level1", { player : player });
        }, this );

    }
}