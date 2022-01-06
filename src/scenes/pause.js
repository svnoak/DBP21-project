class PauseScene extends Phaser.Scene{
    constructor() {
        super('PauseScene');
    }

    init(data){
        this.startData = data;
        this.skillData = data;
    }
    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }

    create(){
        //Background image for Pause Scene 
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);

        let upgradeBtn = this.add.text(350, 200, "Skills", {font: "50px arcade", align: 'center'});
        let continueBtn = this.add.text(350, 250, "Resume", {font: "50px arcade", align: 'center'});
        let restartBtn = this.add.text(350, 300, "New Game", {font: "50px arcade", align: 'center'});
        let exitBtn = this.add.text(350, 350, "Quit", {font: "50px arcade", align: 'center'});

        exitBtn.setInteractive({ cursor: 'pointer' });
        continueBtn.setInteractive({ cursor: 'pointer' });
        restartBtn.setInteractive({ cursor: 'pointer' });
        upgradeBtn.setInteractive({ cursor: 'pointer' });

        exitBtn.on("pointerover", () => {
            exitBtn.style.setColor('black');
        });
        exitBtn.on("pointerout", () => {
            exitBtn.style.setColor('white');
        });
        exitBtn.on("pointerdown", () => {
            //Stops the game scene 
            this.scene.stop("GameScene");

            //Starts the menu scene
            this.scene.start("MainMenuScene");
        });

        continueBtn.on("pointerover", () => {
            continueBtn.style.setColor('black');
        });
        continueBtn.on("pointerout", () => {
            continueBtn.style.setColor('white');
        });
        continueBtn.on("pointerdown", () => {
            //Resumes game scene
            this.scene.resume('GameScene', this.skillData);

            //Stops pause scene
            this.scene.stop();
        });

////////////////////////////////////////////////////////////////////////////////////////////////////
        //Restart data
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

        this.restartData = {
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
////////////////////////////////////////////////////////////////////////////////////////////////////

        restartBtn.on("pointerover", ()=>{
            restartBtn.style.setColor('black');
        });
        restartBtn.on("pointerout", ()=>{
            restartBtn.style.setColor('white');
        });
        restartBtn.on("pointerdown", ()=>{
            //Restarts game scene
            this.scene.start("GameScene", this.restartData);
        });

        upgradeBtn.on("pointerover", ()=>{
            upgradeBtn.style.setColor('black');
        });
        upgradeBtn.on("pointerout", ()=>{
            upgradeBtn.style.setColor('white');
        });
        upgradeBtn.on("pointerdown", ()=>{
            //Restarts game scene
            this.scene.start("UpgradeScene", this.skillData);
            this.scene.pause();
        });
    }

}

export default PauseScene;