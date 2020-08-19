

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: false
            },
            debug: false
        }
    },
    scene: [IntroScene, StoryScene1,Instruction1, Instruction2,Level1,endScene,failScene,shop1Scene,shop2Scene,shop3Scene]


};

let game = new Phaser.Game(config);

window.score = 0