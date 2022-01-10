class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    init(){
            
    }

    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }

    create(){
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);
        // Based on your game size, it may "stretch" and distort.
        let isLoggedIn = sessionStorage["userID"];
        if( isLoggedIn ) {
            let profileBtn = this.add.text(330, 300, "Profile", {font: "30px arcade"});
            let logoutBtn = this.add.text(330, 375, "Logout", {font: "30px arcade"});

            profileBtn.setInteractive({ cursor: 'pointer' });
            profileBtn.on("pointerdown", ()=> {
                this.scene.start("ProfileScene");
            })
            profileBtn.on("pointerover", () => {
                profileBtn.style.setColor('black');
            })
            profileBtn.on("pointerout", () => {
                profileBtn.style.setColor('white');
            })

            logoutBtn.setInteractive({ cursor: 'pointer' });
            logoutBtn.on("pointerdown", () => {
                let rqst = new Request("backend/logout.php");
                fetch(rqst, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "GET",
                    //body: JSON.stringify(data)
                })
                .then( response => {
                    if( response.status === 200 ){
                        sessionStorage.clear();
                        this.scene.start("MainMenuScene");
                    }
                })
                /* sessionStorage.clear();
                this.scene.start("MainMenuScene"); */
            })
            logoutBtn.on("pointerover", () => {
                logoutBtn.style.setColor('black');
            })
            logoutBtn.on("pointerout", () => {
                logoutBtn.style.setColor('white');
            })
        }else{
            let signupBtn = this.add.text(342, 375, "Sign Up", {font: "30px arcade"});
            let loginBtn = this.add.text(350, 300, "Login", {font: "30px arcade"});

            signupBtn.setInteractive({ cursor: 'pointer' });
            signupBtn.on("pointerdown", ()=> {
                this.scene.start("SignupScene");
            })
            signupBtn.on("pointerover", () => {
                signupBtn.style.setColor('black');
            })
            signupBtn.on("pointerout", () => {
                signupBtn.style.setColor('white');
            })

            loginBtn.setInteractive({ cursor: 'pointer' });
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


        let startGameBtn = this.add.text(275, 100, "Start Game", {font: "50px arcade"});
        let leaderboardBtn = this.add.text(100, 560, "Leaderboard", {font: "20px arcade"});
        let howToBtn = this.add.text(350, 225, "How To", {font: "30px arcade"});

        let aboutBtn = this.add.text(650, 560, "About", {font: "20px arcade"});

        startGameBtn.setInteractive({ cursor: 'pointer' });
        leaderboardBtn.setInteractive({ cursor: 'pointer' });
        
        aboutBtn.setInteractive({ cursor: 'pointer' });
        howToBtn.setInteractive({ cursor: 'pointer' });

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
