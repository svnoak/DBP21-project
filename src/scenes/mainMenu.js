class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    init(){
            
    }

    preload() {
        this.load.image('bg', './assets/tilemap/menu.png');    
        
    }

    create(){
        let bg = this.background = this.add.image(0, 0, "bg").setOrigin(0);
        // Based on your game size, it may "stretch" and distort.
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;
        let isLoggedIn = sessionStorage["userID"];
        if( isLoggedIn ) {
            let profileBtn = this.add.text(350, 450, "Profile");
            profileBtn.setInteractive();
            profileBtn.on("pointerdown", ()=> {
                this.scene.start("ProfileScene");
            })
            profileBtn.on("pointerover", () => {
                profileBtn.style.setColor('black');
            })
            profileBtn.on("pointerout", () => {
                profileBtn.style.setColor('white');
            })

            let logoutBtn = this.add.text(450, 300, "Logout");
            logoutBtn.setInteractive();
            logoutBtn.on("pointerdown", () => {
                sessionStorage.clear();
                this.scene.start("MainMenuScene")
		    })
            logoutBtn.on("pointerover", () => {
                logoutBtn.style.setColor('black');
            })
            logoutBtn.on("pointerout", () => {
                logoutBtn.style.setColor('white');
            })
        }else{
            let signupBtn = this.add.text(450, 300, "Sign Up", {fontsize: 200});
            signupBtn.setInteractive();
            signupBtn.on("pointerdown", ()=> {
                this.scene.start("SignupScene");
            })
            signupBtn.on("pointerover", () => {
                signupBtn.style.setColor('black');
            })
            signupBtn.on("pointerout", () => {
                signupBtn.style.setColor('white');
            })

            let loginBtn = this.add.text(250, 300, "Login");
            loginBtn.setInteractive();
	        loginBtn.on("pointerdown", ()=> {
        	    this.scene.start("LoginScene");
        	})
            loginBtn.on("pointerover", () => {
                loginBtn.style.setColor('black');
            })
            loginBtn.on("pointerout", () => {
                loginBtn.style.setColor('white');
            })
	}


        let startGameBtn = this.add.text(350, 250, "Start Game");
        let leaderboardBtn = this.add.text(100, 550, "Leaderboard");
        let aboutBtn = this.add.text(650, 550, "About");
        let howToBtn = this.add.text(375, 350, "How To");

        startGameBtn.setInteractive();
        leaderboardBtn.setInteractive();
        
        aboutBtn.setInteractive();
        howToBtn.setInteractive();

        //Data to start game with // Data for skills

        //Total coins
        let totalCoins = 0;
        //Score
        let score = 0;
        //Lives
        let lives = 3;

        //Regeneration skill learned
        let regenerationLearned = false;
        //Regeneration skillen behöver inte cooldownas
        //För att den har inte använts än
        let regenerationCoolDown = false;
        //Level upgrades faktor för regeneration-skill
        let regenerationCurrentLevelFactor = 10;
        //Kostnaden för uppgradering
        let baseCostForRegenerationUpgrade = 100;

        //SpeedBoost skill learned
        let speedBoostLearned = false;
        //SpeedBoost skillen behöver inte cooldownas, 
        //spelaren har inte använt den än
        let speedCoolDown = false;
        //Level upgrades faktor för regeneration-skill
        let speedBoostCurrentLevelFactor = 1;
        //Kostnaden för uppgradering
        let baseCostForSpeedBoostUpgrade = 500;

        //Fireball skill learned 
        let fireballSkillLearned = false;
        //Fireball skill active
        let fireballSkillActive = false;
        let baseCostForFireballLearn = 1000;
        let baseCostForfireballUpgrade = 100;
        //Amount fireballs to shoot
        let amountFireballsToFire = 0;

        //Lightning skill learned
        let lightningSkillLearned = false;
        let baseCostForLightningSkill = 1500;
        let lightningDamage = 50;
        //If lightning ability in use
        let lightningSkillActive = false;
        //Lightning skillen behöver inte cooldownas, 
        //spelaren har inte använt den än
        let lightningCoolDown = false;

        this.data = {
            totalCoins,
            score,
            lives,
            regenerationLearned,
            regenerationCurrentLevelFactor,
            baseCostForRegenerationUpgrade,
            regenerationCoolDown,
            speedBoostLearned,
            speedCoolDown,
            speedBoostCurrentLevelFactor,
            baseCostForSpeedBoostUpgrade,
            fireballSkillLearned,
            fireballSkillActive,
            baseCostForFireballLearn,
            baseCostForfireballUpgrade,
            amountFireballsToFire,
            lightningSkillLearned,
            lightningDamage,
            baseCostForLightningSkill,
            lightningSkillActive,
            lightningCoolDown
        }

        startGameBtn.on("pointerdown", ()=> {
            this.scene.start("GameScene", this.data);
        })
        startGameBtn.on("pointerover", () => {
            startGameBtn.style.setColor('black');
        })
        startGameBtn.on("pointerout", () => {
            startGameBtn.style.setColor('white');
        })

        leaderboardBtn.on("pointerdown", ()=> {
            this.scene.start("LeaderboardScene");
        })
        leaderboardBtn.on("pointerover", () => {
            leaderboardBtn.style.setColor('black');
        })
        leaderboardBtn.on("pointerout", () => {
            leaderboardBtn.style.setColor('white');
        })

        aboutBtn.on("pointerdown", ()=> {
            this.scene.start("AboutScene");
        })
        aboutBtn.on("pointerover", () => {
            aboutBtn.style.setColor('black');
        })
        aboutBtn.on("pointerout", () => {
            aboutBtn.style.setColor('white');
        })

        howToBtn.on("pointerdown", ()=> {
            this.scene.start("HowToScene");
        })
        howToBtn.on("pointerover", () => {
            howToBtn.style.setColor('black');
        })
        howToBtn.on("pointerout", () => {
            howToBtn.style.setColor('white');
        })
    }

    update(time, delta){

    }
}

export default MainMenuScene;
