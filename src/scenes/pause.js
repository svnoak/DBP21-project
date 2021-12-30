class PauseScene extends Phaser.Scene{
    constructor() {
        super('PauseScene');
    }

    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }

    create(){
        //Background image for Pause Scene 
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);

        let upgradeBtn = this.add.text(350, 200, "Skills");
        let continueBtn = this.add.text(350, 250, "Resume");
        let restartBtn = this.add.text(350, 300, "New Game");
        let exitBtn = this.add.text(350, 350, "Save and Quit");

        exitBtn.setInteractive();
        continueBtn.setInteractive();
        restartBtn.setInteractive();
        upgradeBtn.setInteractive();

        exitBtn.on("pointerdown", () => {
            //Stops the game scene 
            this.scene.stop("GameScene");

            //Starts the menu scene
            this.scene.start("MainMenuScene");
        });

        continueBtn.on("pointerdown", () => {
            //Resumes game scene
            this.scene.resume('GameScene');

            //Stops pause scene
            this.scene.stop();
        });

        restartBtn.on("pointerdown", ()=>{
            //Restarts game scene
            this.scene.start("GameScene");
        });

        upgradeBtn.on("pointerdown", ()=>{
            //Restarts game scene
            this.scene.start("UpgradeScene");
        });
    }

}

export default PauseScene;