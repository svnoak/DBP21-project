// import {
//     basicSpeed,
//     speedCoolDown
// } from '../scenes/game.js';

class UpgradeScene extends Phaser.Scene{
    constructor() {
        super('UpgradeScene');
    }

    init(data){
        this.skillData = data;
        console.log(this.skillData);
    }
    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }

    create(){
        //Background image for Pause Scene 
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);

        let backToPause = this.add.text(100, 100, "Back");
        
        let skills = this.add.text(350, 200, "Skills", {font:'30px'});

        let upgradeSpeedBoost = this.add.text(100, 300, "Upgrade SpeedBoost - Skill");

        backToPause.setInteractive();
        upgradeSpeedBoost.setInteractive();

        // ////////////////////////////////////////////////////////////////////
        // //Skills 

        // //Regeneration skillen behöver inte cooldownas
        // //Skillen har inte använt än
        // let regenerationCoolDown = false;

        // //SpeedBoost skillen behöver inte cooldownas, 
        // //spelaren har inte använt den än
        // let speedCoolDown = false;

        upgradeSpeedBoost.on("pointerdown", () => {
            this.skillData.test += 200;
        });

        backToPause.on("pointerdown", () => {
            //Starts the menu scene
            this.scene.start("PauseScene", this.skillData);
        });

    }

}
// export{
//     basicSpeed,
// }
export default UpgradeScene;