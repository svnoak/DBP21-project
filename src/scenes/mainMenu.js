class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    init(){
 
    }

    preload() {

    }

    create(){
        let startGameBtn = this.add.text(350, 50, "Start Game");
        let signupBtn = this.add.text(350, 150, "Sign In / Up");
        let loginBtn = this.add.text(350, 250, "Login");
        let leaderboardBtn = this.add.text(350, 350, "Leaderboard");
        let profileBtn = this.add.text(350, 450, "Profile");
        let aboutBtn = this.add.text(350, 550, "About");
        let howToBtn = this.add.text(350, 650, "HowTo");

        startGameBtn.setInteractive();
        signupBtn.setInteractive();
        loginBtn.setInteractive();
        leaderboardBtn.setInteractive();
        profileBtn.setInteractive();
        aboutBtn.setInteractive();
        howToBtn.setInteractive();

        startGameBtn.on("pointerdown", ()=> {
            console.log("START GAME");
        })

        signupBtn.on("pointerdown", ()=> {
            this.scene.start("SignupScene");
        })

        loginBtn.on("pointerdown", ()=> {
            this.scene.start("LoginScene");
        })

        leaderboardBtn.on("pointerdown", ()=> {
            this.scene.start("LeaderboardScene");
        })

        profileBtn.on("pointerdown", ()=> {
            this.scene.start("ProfileScene");
        })

        aboutBtn.on("pointerdown", ()=> {
            this.scene.start("AboutScene");
        })

        howToBtn.on("pointerdown", ()=> {
            this.scene.start("HowToScene");
        })
    }

    update(time, delta){

    }
}

export default MainMenuScene;