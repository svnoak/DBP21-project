class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    init(){
        
    }

    preload() {

    }

    create(){
        let isLoggedIn = sessionStorage["userID"];
        if( isLoggedIn ) {
            let profileBtn = this.add.text(350, 450, "Profile");
            profileBtn.setInteractive();
            profileBtn.on("pointerdown", ()=> {
                this.scene.start("ProfileScene");
            })
        }


        let startGameBtn = this.add.text(350, 250, "Start Game");
        let signupBtn = this.add.text(450, 300, "Sign Up");
        let loginBtn = this.add.text(250, 300, "Login");
        let leaderboardBtn = this.add.text(100, 550, "Leaderboard");
        let aboutBtn = this.add.text(650, 550, "About");
        let howToBtn = this.add.text(375, 350, "How To");

        startGameBtn.setInteractive();
        signupBtn.setInteractive();
        loginBtn.setInteractive();
        leaderboardBtn.setInteractive();
        
        aboutBtn.setInteractive();
        howToBtn.setInteractive();

        //Data to start game with
        let regenerationCoolDown = false;
        let speedCoolDown = false;
        let test = 100;
    
        this.data = {
            regenerationCoolDown,
            speedCoolDown,
            test
        }

        startGameBtn.on("pointerdown", ()=> {
            this.scene.start("GameScene", this.data);
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