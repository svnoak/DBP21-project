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

        //Data to start game with // Data for skills

        //Total coins
        let totalCoins = 150000;
    
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