class HowToScene extends Phaser.Scene{
    constructor() {
        super('HowToScene');
    }
    preload(){
        //Laddar Aganju 
        this.load.spritesheet('aganju', './assets/player/aganju.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('aganju', './assets/player/aganju.png', {frameWidth: 32, frameHeight: 32});
        
        //Laddar svärd
        this.load.spritesheet('sword', 'assets/player/sword.png', {frameWidth: 256, frameHeight: 194});

        //Laddar Health Potion icon
        this.load.image('healthPotion', './assets/player/health_potion.png');
        //Laddar Speed Potion icon
        this.load.image('speedPotion', './assets/player/speed_potion.png');
        //Laddar eldbollar
        this.load.image('fireball', './assets/player/fireball.png');
        //Laddar lightnings skill icon
        this.load.image('lightningIcon', './assets/player/lightningSkillIcon.png');

        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');

        this.load.image('scroll-top', '/assets/images/scrolls_top.png');
        this.load.image('scroll-content', '/assets/images/scrolls_content.png');
        this.load.image('scroll-bottom', '/assets/images/scrolls_bottom.png');
    }
    create(){
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.scrltop = this.add.image(400,340,'scroll-top');
        this.scrltop.scale = 0.9;
        this.scrlcontent1 = this.add.image(400,410,'scroll-content');
        this.scrlcontent1.scaleX = 0.9;
        this.scrlbottom = this.add.image(400, 450,'scroll-bottom');
        this.scrlbottom.scale = 0.9;

        let backBtn = this.add.text(150, 50, "Back to Menu", {font: "25px arcade", color: 'white'});

        backBtn.setInteractive({ cursor: 'pointer' });
        backBtn.on("pointerdown", () =>{
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.switch("MainMenuScene");
            })
        });
	backBtn.on("pointover", () => {
		backBtn.style.setColor('black');
	})
	
	backBtn.on("pointerout", () => {
		backBtn.style.setColor('white');
	})

        this.howToattack = this.add.text(520,80, 'How to attack?', {fontSize: '25px', fill: 'white'});
        this.swordAttack = this.add.text(450,130, 'Sword attack', {fontSize: '15px', fill: 'white'});

        this.aganju2 = this.physics.add.sprite(500, 200,'aganju');
        this.aganju2.setScale(2.5);
        this.aganju2.setFrame(7);
        this.aganju2.setDepth(1);

        //Skapar svärden
        this.sword = this.physics.add.sprite(this.aganju2.x, this.aganju2.y,'sword');
        this.sword.setScale(0.50);

        //Skapar right animationen för svärden
        this.anims.create({
            key: 'sword_right',
            frames: this.anims.generateFrameNumbers('sword', { start: 18, end: 23}),
            frameRate: 10,
            repeat: 0
        });

        let interval = setInterval(() => {
            this.sword.anims.play("sword_right");
        }, 3000);

        this.add.text(600,130, 'Press "Space" to', {fontSize: '15px', fill: 'white'});
        this.add.text(600,160, 'attack with sword!', {fontSize: '15px', fill: 'white'});
        this.add.text(600,190, 'Aganju can attack', {fontSize: '15px', fill: 'white'});
        this.add.text(600,220, 'while running or', {fontSize: '15px', fill: 'white'});
        this.add.text(600,250, 'standing!', {fontSize: '15px', fill: 'white'});


        this.textW = this.add.text(175,100, 'W', {fontSize: '20px', fill: 'white'});
        this.textA = this.add.text(50,200, 'A', {fontSize: '20px', fill: 'white'});
        this.textD = this.add.text(300,200, 'D', {fontSize: '20px', fill: 'white'});
        this.textS = this.add.text(175,300, 'S', {fontSize: '20px', fill: 'white'});

        this.aganju = this.physics.add.sprite(180, 200,'aganju');
        this.aganju.setScale(2.5);
        this.aganju.setFrame(1);

        //Skapar down animationen för Aganju
         this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('aganju', { 
                start: 0, 
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });

        //Skapar left animationen för Aganju
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('aganju', { 
                start: 3, 
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });
        
        //Skapar right animationen för Aganju
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('aganju', { start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        
        //Skapar up animationen för Aganju
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('aganju', { start: 9, end: 11}),
            frameRate: 10,
            repeat: -1
        });

        //Skapar down animationen för svärden
        this.anims.create({
            key: 'sword_down',
            frames: this.anims.generateFrameNumbers('sword', { start: 0, end: 5}),
            frameRate: 10,
            repeat: 1
        });

        //Plays Aganjus animations to show how to controll him
        setTimeout(() => {
            this.textW.setColor("red");
            this.aganju.anims.play("up");  
            setTimeout(() => {
                this.aganju.anims.stop();

                this.textW.setColor("white");
                this.textD.setColor("red");

                this.aganju.anims.play("right");
                setTimeout(() => {
                    this.aganju.anims.stop();

                    this.textD.setColor("white");
                    this.textS.setColor("red");

                    this.aganju.anims.play("down");
                    setTimeout(() => {
                        this.aganju.anims.stop();
                    
                        this.textS.setColor("white");
                        this.textA.setColor("red");

                        this.aganju.anims.play("left");
                        setTimeout(() => {
                            this.textA.setColor("white");
                            this.aganju.anims.stop();
                            this.aganju.setFrame(1);
                        }, 5000);
                    }, 5000);
                }, 5000);
            }, 5000);
        
        }, 1000);

        ////////////////////////////////////////////////////////////////////////////////
                                            //Skills        

        this.skillInfos = this.add.text(375,330, 'Skills', {font: '25px arcade', fill: 'black'});
        this.add.text(10,370, 'Aganju has 4 skills and they are locked in the beginning! All skills are upgradable and', {fontSize: '15px', fill: 'black'});
        this.add.text(10,395, 'each skill has a uniqe damage and cost. Regenaration gives you health for every 10 sec.', {fontSize: '15px', fill: 'black'});
        this.add.text(10,420, 'You can run faster with speedBoost ability. You can burn or shock the enemies with', {fontSize: '15px', fill: 'black'});
        this.add.text(10,445, 'by throwing fireballs or calling lightnings. The choise is yours!', {fontSize: '15px', fill: 'black'});

        //And cost of each skill multiples with 2 for every upgrade
        let regeneration = this.add.text(75, 550, "Regeneration");
        regeneration.setShadow(2, 2, '#000000', 0);
        this.add.text(100,575, 'Press "R"', {fontSize: '10px', fill: 'white'});
        
        //Creates regeneration skill image
        let regenerationImage = this.add.image(130,500,'healthPotion');
        regenerationImage.setScale(0.60);

        let speedBoost = this.add.text(285, 550, "SpeedBoost");
        speedBoost.setShadow(2, 2, '#000000', 0);
        this.add.text(308,575, 'Press "Q"', {fontSize: '10px', fill: 'white'});

        //Creates speedBoost skill image
        let speedBoostImage = this.add.image(335,500,'speedPotion');
        speedBoostImage.setScale(0.7);

        let fireball = this.add.text(475, 550, "Fireballs");
        fireball.setShadow(2, 2, '#000000', 0);
        this.add.text(493,575, 'Press "F"', {fontSize: '10px', fill: 'white'});

        //Creates speedBoost1 skill image
        let fireballImage = this.add.image(517.5, 502,'fireball');
        fireballImage.setScale(2.25);

        let lightning = this.add.text(650, 550, "Lightning");
        lightning.setShadow(2, 2, '#000000', 0);
        this.add.text(668,575, 'Press "E"', {fontSize: '10px', fill: 'white'});

         //Creates lightningSkill icon
        let lightningImage = this.add.image(693, 502, 'lightningIcon');
        lightningImage.setScale(0.38);

    }
}

export default HowToScene;
