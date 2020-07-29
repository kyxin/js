class Instruction1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Instruction1' });
    }

    preload() {
        this.load.image('instruction01','assets/instruction01.png');
    }

    create () {

        this.add.image(0, 0, 'instruction01').setOrigin(0, 0).setScale(0.24);
        console.log("This is instrution01");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto Instruction2");
        this.scene.start("Instruction2");
        }, this );

    }
}