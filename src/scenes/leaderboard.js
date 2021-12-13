class LeaderboardScene extends Phaser.Scene{
    constructor() {
        super('LeaderboardScene');
    }

    create(){
        let backBtn = this.add.text(150, 50, "Back to Menu");

        backBtn.setInteractive();
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }
}

export default LeaderboardScene;