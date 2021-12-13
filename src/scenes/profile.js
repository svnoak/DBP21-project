class ProfileScene extends Phaser.Scene{
    constructor() {
        super('ProfileScene');
    }

    create(){
        let backBtn = this.add.text(150, 50, "Back to Menu");

        backBtn.setInteractive();
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }
}

export default ProfileScene;