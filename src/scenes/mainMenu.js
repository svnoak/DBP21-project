class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    init(){
 
    }

    preload() {

    }

    create(){
        this.startGameBtn = this.add.text(350, 50, "Start Game");
        this.signupBtn = this.add.text(350, 150, "Sign In / Up");
        this.leaderboardBtn = this.add.text(350, 250, "Leaderboard");
        this.profileBtn = this.add.text(350, 350, "Profile");

        this.startGameBtn.setInteractive();
        this.signupBtn.setInteractive();
        this.leaderboardBtn.setInteractive();
        this.profileBtn.setInteractive();

        startGameBtn.on("pointerdown", ()=> {
            this.scene.start("GameScene")
        })

        signupBtn.on("pointerdown", ()=> {
            this.scene.start("GameScene")
        })

        leaderboardBtn.on("pointerdown", ()=> {
            this.scene.start("GameScene")
        })

        profileBtn.on("pointerdown", ()=> {
            this.scene.start("GameScene")
        })

    }

    update(time, delta){

    }
}

export default MainMenuScene;