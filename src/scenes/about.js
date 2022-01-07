class AboutScene extends Phaser.Scene{
    constructor() {
        super('AboutScene');
    }

    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }

    create(){
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);
        let backBtn = this.add.text(100, 550, "Back to Menu", { font: '25px arcade' });

        backBtn.setInteractive({ cursor: 'pointer' });
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }
}

export default AboutScene;