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
        let leaderboardBtn = this.add.text(350, 250, "Leaderboard");
        let profileBtn = this.add.text(350, 350, "Profile");

        startGameBtn.setInteractive();
        signupBtn.setInteractive();
        leaderboardBtn.setInteractive();
        profileBtn.setInteractive();

        startGameBtn.on("pointerdown", ()=> {
            console.log("START GAME");
        })

        signupBtn.on("pointerdown", ()=> {
            console.log("SIGN UP / SIGN IN");
        })

        leaderboardBtn.on("pointerdown", ()=> {
            console.log("LEADERBOARD");
        })

        profileBtn.on("pointerdown", ()=> {
            console.log("PROFILE");
        })

    }

    update(time, delta){

    }
}

export default MainMenuScene;