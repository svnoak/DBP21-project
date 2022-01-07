class AboutScene extends Phaser.Scene{
    constructor() {
        super('AboutScene');
    }

    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }

    create(){
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);
        let backBtn = this.add.text(150, 50, "Back to Menu");

        backBtn.setInteractive();
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }
}

export default AboutScene;