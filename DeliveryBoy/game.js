

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
            debug: true
        }
    },
    // scene: [IntroScene,StoryScene1, StoryScene2, Instruction1, Instruction2, Level1, resMap01, resMap02, resMap03]
    scene: [IntroScene, StoryScene1,Instruction1, Instruction2,Level1,endScene,]


};

let game = new Phaser.Game(config);