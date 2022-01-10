class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    init(){
            
    }

    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
        this.load.image('scroll-top', '/assets/images/scrolls_top.png');
        this.load.image('scroll-content', '/assets/images/scrolls_content.png');
        this.load.image('scroll-bottom', '/assets/images/scrolls_bottom.png');
    }

    create(){
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.scrltop = this.add.image(400,100,'scroll-top');
        this.scrltop.scale = 0.8;
        this.scrlcontent1 = this.add.image(400,170,'scroll-content');
        this.scrlcontent1.scale = 0.8;
        this.scrlcontent2 = this.add.image(400,270,'scroll-content');
        this.scrlcontent2.scale = 0.8;
        this.scrlcontent3 = this.add.image(400,370,'scroll-content');
        this.scrlcontent3.scale = 0.8;
        this.scrlbottom = this.add.image(400, 450,'scroll-bottom');
        this.scrlbottom.scale = 0.8;
        // Based on your game size, it may "stretch" and distort.
        let isLoggedIn = sessionStorage["userID"];
        if( isLoggedIn ) {
            let profileBtn = this.add.text(335, 300, "Profile", {font: "30px arcade", color: 'black'});
            profileBtn.setShadow(2, 2, 'white', 0);
            let logoutBtn = this.add.text(345, 375, "Logout", {font: "30px arcade", color: 'black'});
            logoutBtn.setShadow(2, 2, 'white', 0);

            profileBtn.setInteractive({ cursor: 'pointer' });
            
            profileBtn.on("pointerdown", ()=> {
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.scene.start("ProfileScene");
            })
            profileBtn.on("pointerover", () => {
                profileBtn.style.setColor('white');
                profileBtn.setShadow(2, 2, 'black', 0);
            })
            profileBtn.on("pointerout", () => {
                profileBtn.style.setColor('black');
                profileBtn.setShadow(2, 2, 'white', 0);
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
                        this.cameras.main.fadeOut(500, 0, 0, 0);
                        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                            this.scene.start("MainMenuScene");
                        })
                    }
                })
                /* sessionStorage.clear();
                this.scene.start("MainMenuScene"); */
            })
            logoutBtn.on("pointerover", () => {
                logoutBtn.style.setColor('white');
                logoutBtn.setShadow(2, 2, 'black', 0);
            })
            logoutBtn.on("pointerout", () => {
                logoutBtn.style.setColor('black');
                logoutBtn.setShadow(2, 2, 'white', 0);
            })
        }else{
            let signupBtn = this.add.text(342, 375, "Sign Up", {font: "30px arcade", color: 'black'});
            signupBtn.setShadow(2, 2, 'white', 0);
            let loginBtn = this.add.text(350, 300, "Login", {font: "30px arcade", color: 'black'});
            loginBtn.setShadow(2, 2, 'white', 0);

            signupBtn.setInteractive({ cursor: 'pointer' });
            signupBtn.on("pointerdown", ()=> {
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.scene.start("SignupScene");
            })
            signupBtn.on("pointerover", () => {
                signupBtn.style.setColor('white');
                signupBtn.setShadow(2, 2, 'black', 0);
            })
            signupBtn.on("pointerout", () => {
                signupBtn.style.setColor('black');
                signupBtn.setShadow(2, 2, 'white', 0);
            })

            loginBtn.setInteractive({ cursor: 'pointer' });
	        loginBtn.on("pointerdown", ()=> {
                this.cameras.main.fadeOut(500, 0, 0, 0);
        	    this.scene.start("LoginScene");
        	})
            loginBtn.on("pointerover", () => {
                loginBtn.style.setColor('white');
                loginBtn.setShadow(2, 2, 'black', 0);
            })
            loginBtn.on("pointerout", () => {
                loginBtn.style.setColor('black');
                loginBtn.setShadow(2, 2, 'white', 0);
            })
	}


        let startGameBtn = this.add.text(275, 100, "Start Game", {font: "50px arcade", color: 'black'});
        startGameBtn.setShadow(2, 2, 'white', 0);
        //let leaderboardBtn = this.add.text(100, 560, "Leaderboard", {font: "20px arcade"});
        let howToBtn = this.add.text(350, 225, "How To", {font: "30px arcade", color: 'black'});
        howToBtn.setShadow(2, 2, 'white', 0);

        //let aboutBtn = this.add.text(650, 560, "About", {font: "20px arcade"});

        startGameBtn.setInteractive({ cursor: 'pointer' });
        //leaderboardBtn.setInteractive({ cursor: 'pointer' });
        
        //aboutBtn.setInteractive({ cursor: 'pointer' });
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start("GameScene", this.data);
            })
        })
        startGameBtn.on("pointerover", () => {
            startGameBtn.style.setColor('white');
            startGameBtn.setShadow(2, 2, 'black', 0);
        })
        startGameBtn.on("pointerout", () => {
            startGameBtn.style.setColor('black');
            startGameBtn.setShadow(2, 2, 'white', 0);
        })

        /* leaderboardBtn.on("pointerdown", ()=> {
            this.scene.start("LeaderboardScene");
        })
        leaderboardBtn.on("pointerover", () => {
            leaderboardBtn.style.setColor('black');
        })
        leaderboardBtn.on("pointerout", () => {
            leaderboardBtn.style.setColor('white');
        }) */

        /* aboutBtn.on("pointerdown", ()=> {
            this.scene.start("AboutScene");
        })
        aboutBtn.on("pointerover", () => {
            aboutBtn.style.setColor('black');
        })
        aboutBtn.on("pointerout", () => {
            aboutBtn.style.setColor('white');
        }) */

        howToBtn.on("pointerdown", ()=> {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start("HowToScene");
            })
        })
        howToBtn.on("pointerover", () => {
            howToBtn.style.setColor('white');
            howToBtn.setShadow(2, 2, 'black', 0);
        })
        howToBtn.on("pointerout", () => {
            howToBtn.style.setColor('black');
            howToBtn.setShadow(2, 2, 'white', 0);
        })
    }

    update(time, delta){

    }
}

export default MainMenuScene;
