class GameoverScene extends Phaser.Scene{
    constructor() {
        super('GameoverScene');
    }

    init(data){
        this.endData = data;
    }
    preload(){
        this.load.image('backgroundGameover', './assets/tilemap/backgroundGameOver.png');
    }
    create(){
        //Background image for Pause Scene 
        this.bgGameOver = this.add.image(0,0,'backgroundGameover').setOrigin(0);
        this.bgGameOver.setScale(0.57);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let gameOver = this.add.text(115, 100, "Game Over!", {font:'100px arcade'});

        let endScore = this.add.text(255, 250, "Your Score: ", {font:'30px arcade'});
        endScore.text = 'Your Score: ' + this.endData.score;

        let backToMenuBtn = this.add.text(325, 325, "Back to Menu", {font:'20px arcade', color:'white'});
        let playAgainBtn = this.add.text(339, 375, "Play Again", {font:'20px arcade', color:'white'});
        
        //Back to menu button
        backToMenuBtn.setInteractive();
        backToMenuBtn.on("pointerover", ()=>{
            backToMenuBtn.style.setColor('black');
        });
        backToMenuBtn.on("pointerout", ()=>{
            backToMenuBtn.style.setColor('white');
        });
        backToMenuBtn.on("pointerdown", ()=>{
            this.cameras.main.fadeOut(500, 0, 0, 0);
            //Starts the menu scene
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start("MainMenuScene");
            })
        });

        ///////////////////////////////////////////////////////////////
        //Start data
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

        this.newGameData = {
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

        //Play again button
        playAgainBtn.setInteractive();
        playAgainBtn.on("pointerover", ()=>{
            playAgainBtn.style.setColor('black');
        });
        playAgainBtn.on("pointerout", ()=>{
            playAgainBtn.style.setColor('white');
        });
        playAgainBtn.on("pointerdown", ()=>{
            //Restarts game scene
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start("GameScene", this.newGameData);
            })
            
        });
    }
}
export default GameoverScene;