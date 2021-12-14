import MainMenuScene from "./mainMenu.js";

class LoadingScene extends Phaser.Scene{
    constructor() {
        super('LoadingScene');
    }

    create(){
        this.add.text(20, 20, "Loading game");
        this.scene.start("MainMenuScene");
    }
}

export default LoadingScene;