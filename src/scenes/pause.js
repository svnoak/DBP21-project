class PauseScene extends Phaser.Scene{
    constructor() {
        super('PauseScene');
    }

    create(){
        let exitBtn = this.add.text(350, 50, "Save and Quit");
        let continueBtn = this.add.text(350, 150, "Continue Game");
    }
}

export default PauseScene;