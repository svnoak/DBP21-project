class GameScene extends Phaser.Scene{
    constructor() {
        super('GameScene');
    }

    // Preload game assets 
    // Här laddas alla assets innan spethis är igång
    preload() {
        //Laddar spelplanen
        this.load.image('background', './assets/tilemap/background.png');

        //Laddar Aganju 
        this.load.spritesheet('aganju', './assets/player/aganju.png', {frameWidth: 32, frameHeight: 32});

        //Laddar svärd
        this.load.spritesheet('sword', 'assets/player/sword.png', {frameWidth: 256, frameHeight: 194});

        //Laddar heart
        this.load.spritesheet('heart', 'assets/tilemap/heart.png', {frameWidth: 150, frameHeight: 150});

        //Laddar eldbollar
        this.load.image('fireball', './assets/player/fireball.png');

        //Laddar Hastur 
        this.load.spritesheet('hastur', './assets/enemy/hastur_leg.png', {frameWidth: 32, frameHeight: 32});

        //Laddar health potion
        this.load.image('healthPotion', './assets/player/health_potion.png');
        //Laddar speed potion
        this.load.image('speedPotion', './assets/player/speed_potion.png');
        //Laddar lightnings skill icon
        this.load.image('lightningIcon', './assets/player/lightningSkillIcon.png');

        //Laddar lightning
        this.load.spritesheet('lightning', 'assets/player/lightning.png', {frameWidth: 184, frameHeight: 184});
        //Laddar lightningExplosion
        this.load.spritesheet('lightningExplosion', 'assets/player/lightningExplosion.png', {frameWidth: 184, frameHeight: 184});
        //Laddar lightning drop image
        this.load.image('lightningDrop', 'assets/player/lightningDrop.png', {frameWidth: 184, frameHeight: 184});

        //Variabel för eldbollar
        this.lastFired = 0;

        this.lives = 3;
        this.score = 0;
    }
    
    // Create game world 
    // Sätts igång när preload() är uppladdad
    create(){
        //Skapar spelplanen
        this.add.image(0,0,'background').setOrigin(0);

        //Players lives
        this.livescounter = this.add.text(20,10, 'Lives: ', {fontSize: '20px', fill: 'deepskyblue'});
        this.livescounter.setShadow(2, 2, '#000000', 0);

        //Players health
        this.health =  this.add.text(690,10, '', {fontSize: '20px', fill: 'red'});
        this.health.setShadow(2, 2, '#000000', 0);

        //Coins
        this.coins =  this.add.text(690,50, '', {fontSize: '20px', fill: 'gold'});
        this.coins.setShadow(2, 2, '#000000', 0);

        //Heart
        this.heart = this.physics.add.sprite(750, 20,'heart');
        this.heart.setScale(0.20);
            
        //Skapar heart animatione
        this.anims.create({
            key: 'heartTurn',
            frames: this.anims.generateFrameNumbers('heart', { 
                start: 0, 
                end: 5
            }),
            frameRate: 6,
            repeat: -1
        });
        //Plays heart animation 
        this.heart.anims.play('heartTurn');

        //Players score 
        this.scoreText = this.add.text(20, 50, 'Score:', { fontSize: '20px', fill: '#ffffff'});
        this.scoreText.setShadow(2, 2, '#000000', 0);

        //Skill notification
        this.info = this.add.text(220,8, '', {fontSize: '25px', fill: 'white'});
        this.info.setShadow(2, 2, '#000000', 0);
        this.info.setVisible(false);

        //Skill Recharging..
        this.skillCoolingDown = this.add.text(290,565, 'Recharging...', {fontSize: '25px', fill: 'red'});
        this.skillCoolingDown.setShadow(2, 2, '#000000', 0);
        this.skillCoolingDown.setVisible(false);

        //Skapar regeneration skill image
        this.healthPotion = this.add.image(635,580.5,'healthPotion');
        this.healthPotion.setScale(0.45);

        //Skapar speedBoost skill image
        this.speedPotion = this.add.image(680,580,'speedPotion');
        this.speedPotion.setScale(0.5);

        //Skapar fireball skill icon
        this.fireballSkillIcon = this.add.image(725,582.5,'fireball');
        this.fireballSkillIcon.setScale(1.50);

        //Creates lightningSkill icon
        this.lightningSkillIcon = this.add.image(770, 582.5, 'lightningIcon');
        this.lightningSkillIcon.setScale(0.25);

        //Lightning drop image
        this.lightningDrop = this.add.image(300, 400,'lightningDrop');
        //Hides lightningDrop image
        this.lightningDrop.setVisible(false);

        //Lightning skill
        this.lightning = this.physics.add.sprite(350, 400,'lightning');
        //Hides lightning animation
        this.lightning.setVisible(false);
        //Lightning animation image z-index = 1
        this.lightning.setDepth(1);
        //Lightning damage 
        this.lightning.damage = 50;
        //Skapar lightning animation
        this.anims.create({
            key: 'shock',
            frames: this.anims.generateFrameNumbers('lightning', { 
                start: 0, 
                end: 5
            }),
            frameRate: 6,
            repeat: 0
        });

        //LightningExplosion
        this.lightningExplosion = this.physics.add.sprite(350, 400,'lightningExplosion');
        this.lightningExplosion.setScale(0.5);
        //Hides lightningExplosition animation
        this.lightningExplosion.setVisible(false);
        //LightningExplosion animation z-index = 1
        this.lightningExplosion.setDepth(1);

        //Skapar lightningExplosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('lightningExplosion', { 
                start: 0, 
                end: 5
            }),
            frameRate: 6,
            repeat: 0
        })
        // this.lightningExplosion.anims.play('explode');
       
        ////////////////////////////////////////////////////////////////////
        //Kontroller

        //Definierar variabeln cursor = down,left,up,right
        this.cursors = this.input.keyboard.createCursorKeys();
        //Definierar variabeln spacebar
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Definierar variabeln keyS = "W"
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //Definierar variabeln keyS = "A"
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //Definierar variabeln keyS = "S"
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //Definierar variabeln keyS = "D"
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //Definierar variabeln keyShift = "SHIFT"
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //Skapar Hastur
        this.hastur = this.physics.add.sprite(200, 200,'hastur');
        //Skalar upp Hastur
        this.hastur.setScale(2);
        //Ger vikt på Hastur
        this.hastur.body.mass = 2;
        //Begränsar Hastur inom spethiss gränser
        this.hastur.setCollideWorldBounds(true);
        //Gör Hastur orörlig
        this.hastur.body.setImmovable(true);
        //Hasturs health
        this.hastur.health = 100;

        ////////////////////////////////////////////////////////////////////
        //Player

        //Skapar Aganju
        this.aganju = this.physics.add.sprite(350, 400,'aganju');
        //Skalar upp Aganju
        this.aganju.setScale(2);
        //Ger vikt på Aganju
        this.aganju.body.mass = 2;
        //Begränsar Aganju inom spethiss gränser
        this.aganju.setCollideWorldBounds(true);

        //Kollision mellan Aganju och Hastur
        this.physics.add.collider(this.aganju, this.hastur);

        ////////////////////////////////////////////////////////////////////
        //Vapen

        //Skapar svärden
        this.sword = this.physics.add.sprite(this.aganju.x, this.aganju.y,'sword');
        //Sword Damage 
        this.sword.damage = 10;

        //Skapar eldbollar
        this.fireball = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

            function fireball (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fireball');

                this.incX = 0;
                this.incY = 0;
                this.lifespan = 0;

                this.speed = Phaser.Math.GetSpeed(300, 1);
            },

            fire: function (x,y)
            {
                this.setActive(true);
                this.setVisible(true);

                this.angle = Phaser.Math.Angle.Between(x, y, 400, 300);

                //Räknar x vinkeln
                this.incX = Math.cos(this.angle);
                //Räknar y vinkeln
                this.incY = Math.sin(this.angle);

                this.lifespan = 1000;
            },

            update: function (time, delta)
            {
                this.lifespan -= delta;

                this.x -= this.incX * (this.speed * delta);
                this.y -= this.incY * (this.speed * delta);

                if (this.lifespan <= 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
        
            }
            
        });

        //Gör eldbollar en group
        this.fireballs = this.add.group({
            classType: this.fireball,
            maxSize: this.amountFireballsToFire,
            runChildUpdate: true
        });

        //När muspekaren är på
        this.input.on('pointerdown', function (activePointer) {
            this.mouseDown = true;
            this.mouseX = activePointer.x;
            this.mouseY = activePointer.y;
        });

        ////////////////////////////////////////////////////////////////////
        //Animationer

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

        //Skapar up animationen för svärden
        this.anims.create({
            key: 'sword_up',
            frames: this.anims.generateFrameNumbers('sword', { start: 6, end: 11}),
            frameRate: 10,
            repeat: 0
        });

        //Skapar left animationen för svärden
        this.anims.create({
            key: 'sword_left',
            frames: this.anims.generateFrameNumbers('sword', { start: 12, end: 17}),
            frameRate: 10,
            repeat: 0
        });

        //Skapar right animationen för svärden
        this.anims.create({
            key: 'sword_right',
            frames: this.anims.generateFrameNumbers('sword', { start: 18, end: 23}),
            frameRate: 10,
            repeat: 0
        });

        ///////////////////////////////////////////////////////////////////////////
        //Objects overlaps and functions
        //När Aganju slår på hastur med sin svärd, anropas funktionen hitEnemy, 
        this.swordHasturCollider = this.physics.add.overlap(this.sword, this.hastur, null, hitEnemy,this);
    
        function hitEnemy(){
            this.hastur.health = this.hastur.health - this.sword.damage;
console.log(this.hastur.health);
            if(this.hastur.health == 0){
                this.hastur.destroy();
                this.score = this.score + 10;
                this.totalCoins = this.totalCoins + 100;
            } 

            //Unactives collide between sword and Hastur
            this.swordHasturCollider.active = false;

            //Stops propagation
            this.spacebar.isDown = false;
        }

        this.lightningHasturCollider = this.physics.add.overlap(this.lightning, this.hastur, null, shockEnemy, this);
        function shockEnemy(){
            this.hastur.health = this.hastur.health - this.lightning.damage;
console.log(this.hastur.health);
            //Sätter tint (blå)
            this.hastur.setTint(0xff00ff);

            setTimeout(() => {
                //Sätter tint (blå)
                this.hastur.setTint();
            }, 1000);

            if (this.hastur.health <= 0) {

                setTimeout(() => {
                    this.lightningExplosion.setVisible(true);
                    this.lightningExplosion.x = this.hastur.x;
                    this.lightningExplosion.y = this.hastur.y+10;
    
                    this.lightningExplosion.anims.play('explode');

                    setTimeout(() => {
                        this.hastur.destroy();
                        this.lightningExplosion.setVisible(false);
                    }, 1000);

                }, 500);

                this.score = this.score + 10;
                this.totalCoins = this.totalCoins + 100;
            }
            //Unactives collide between lightning and hastur
            this.lightningHasturCollider.active = false;
        }

        this.physics.add.overlap(this.hastur, this.fireballs, burnEnemy, null, this);
        function burnEnemy(){
            this.hastur.health = this.hastur.health - 10;

            if(this.hastur.health == 0){
                this.hastur.destroy();
            }
        }

        ////////////////////////////////////////////////////////////////////
        //Skills 

        //Total coins
        this.totalCoins = 150000;

        //Aganjus health
        this.aganju.health = 100;

        //Regeneration skill learned
        this.regenerationLearned = false;
        //Sätter opacity = 0.5
        this.healthPotion.setAlpha(0.5);
        //Regeneration skillen behöver inte cooldownas
        //För att den har inte använts än
        this.regenerationCoolDown = false;

        //Level upgrades faktor för regeneration-skill
        this.regenerationCurrentLevelFactor = 10;
        //Kostnaden för uppgradering
        this.baseCostForRegenerationUpgrade = 100;

        //Aganjus start hastighet
        this.basicSpeed = 100;

        //SpeedBoost skill learned
        this.speedBoostLearned = false;
        //Sätter opacity = 0.5
        this.speedPotion.setAlpha(0.5);

        //SpeedBoost skillen behöver inte cooldownas, 
        //spelaren har inte använt den än
        this.speedCoolDown = false;
        //Level upgrades faktor för regeneration-skill
        this.speedBoostCurrentLevelFactor = 1.25;
        //Kostnaden för uppgradering
        this.baseCostForSpeedBoostUpgrade = 150;

        //Fireball skill learned 
        this.fireballSkillLearned = false;
        this.fireballSkillIcon.setAlpha(0.5);

        //Fireball skill active
        this.fireballSkillActive = false;
        this.baseCostForfireballUpgrade = 100;
        this.fireballCurrentLevelFactor = 1;

        //Amount fireballs to shoot
        this.amountFireballsToFire = 1;

        //Lightning skill learned
        this.lightningSkillLearned = false;
        //Sätter opacity = 0.5
        this.lightningSkillIcon.setAlpha(0.5);

        //If lightning ability in use
        this.lightningSkillActive = false;

        //Lightning skillen behöver inte cooldownas, 
        //spelaren har inte använt den än
        this.lightningCoolDown = false;
    }

    // Update gameplay 
    // Uppdaterar spelet var 16 ms
    // Körs kontunierlig efter create() är färdig
    update(time, delta){

        //Uppdaterar score
        this.scoreText.text = 'Score: ' + this.score;
        //Uppdaterar lives Aganju har
        this.livescounter.text = 'Lives: ' + this.lives;
        //Uppdaterar Aganjus health
        this.health.text = '' + this.aganju.health;
        //Uppdaterar total coins
        this.coins.text = '' + this.totalCoins;
        
        //Aganju's x positon
        this.aganjuX = this.aganju.x;
        //Aganju's y positon
        this.aganjuY = this.aganju.y;
        
        // Gömmer svärden
        this.sword.setVisible(false);

        ///////////////////////////////////////////////////////////////////////////
        //Player movement and animations

        //Om vänster pillen trycks, 
        //left animation spelas
        if (this.keyA.isDown)
        {
            //Ger Aganju velocity (rörelse) till vänster
            this.aganju.setVelocity(-this.basicSpeed,0);
            //Spelar left animationen av Aganju
            this.aganju.anims.play('left', true);

            // Ger z-index till eldbollar
            this.fireballs.setDepth(1);

            //När spacebar trycks
            if(this.spacebar.isDown){
                //Ger z-index 0 till Aganju
                this.aganju.setDepth(0);

                //Gör svärden visible
                this.sword.setVisible(true);
                //Uppdaterar svärdens position
                this.sword.setPosition(this.aganjuX,this.aganjuY-10);
                //Ger z-index till svärden
                this.sword.setDepth(1);
                //Scalar ner svärden
                this.sword.setScale(0.50);
                //Spelar left animationen av svärd
                this.sword.anims.play('sword_left', true);

                //Makes collide between sword and Hastur active again
                this.swordHasturCollider.active = true;
            }
        }

        //Om höger pillen trycks, 
        //right animation spelas
        else if (this.keyD.isDown)
        {
            this.aganju.setVelocity(this.basicSpeed,0);
            this.aganju.anims.play('right', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(1);

            if(this.spacebar.isDown){
                this.aganju.setDepth(1);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX,this.aganjuY-10);
                this.sword.setDepth(0);
                this.sword.setScale(0.50);
                this.sword.anims.play('sword_right', true);

                //Makes collide between sword and Hastur active again
                this.swordHasturCollider.active = true;
            }
        }

        //Om up pillen trycks, 
        //Up animation spelas
        else if(this.keyS.isDown)
        {
            this.aganju.setVelocity(0,this.basicSpeed);
            this.aganju.anims.play('down', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(1);

            if(this.spacebar.isDown){
                this.aganju.setDepth(0);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX+23,this.aganjuY-10);
                this.sword.setDepth(1);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_down', true);

                //Makes collide between sword and Hastur active again
                this.swordHasturCollider.active = true;
            }
        }

        //Om up pillen trycks, 
        //Up animation spelas
        else if(this.keyW.isDown)
        {
            this.aganju.setVelocity(0,-this.basicSpeed);
            this.aganju.anims.play('up', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(0);

            //När spacebar trycks
            if(this.spacebar.isDown){
                this.aganju.setDepth(1);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX-20,this.aganjuY-40);
                this.sword.setDepth(0);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_up', true);

                //Makes collide between sword and Hastur active again
                this.swordHasturCollider.active = true;
            }
        }

        //Annars ingen rörelse
        //Ingen animation
        else{
            this.aganju.setVelocity(0,0);
            this.aganju.anims.stop();
        }

        //Om left och up pillarna trycks, 
        //Aganju går diagonalt till vänster hörn
        if(this.keyA.isDown && this.keyW.isDown){    
            this.aganju.setVelocityY(-this.basicSpeed);
            this.aganju.setVelocityX(-this.basicSpeed);
            this.aganju.anims.play('up', true);
            this.aganju.setDepth(1);

            if(this.spacebar.isDown){
                this.sword.setDepth(0);
            }
        }

        //Om höger och up pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyD.isDown && this.keyW.isDown){    
            this.aganju.setVelocityY(-this.basicSpeed);
            this.aganju.setVelocityX(this.basicSpeed);
            this.aganju.anims.play('up', true);
        }

        //Om höger och ner pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyD.isDown && this.keyS.isDown){    
            this.aganju.setVelocityY(this.basicSpeed);
            this.aganju.setVelocityX(this.basicSpeed);
            this.aganju.anims.play('down', true);
            this.aganju.setDepth(0);

            if(this.spacebar.isDown){
                this.sword.setDepth(1);
                this.sword.setPosition(this.aganjuX+20,this.aganjuY-10);
            }
    
        }

        //Om vänster och ner pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyA.isDown && this.keyS.isDown){    
            this.aganju.setVelocityY(this.basicSpeed);
            this.aganju.setVelocityX(-this.basicSpeed);
            this.aganju.anims.play('down', true);

            if(this.spacebar.isDown){
                this.sword.setPosition(this.aganjuX+17,this.aganjuY-5);
            }
        }

        ///////////////////////////////////////////////////////////////////////////
        //Players skills and cooldowns
        
        //Learn and upgrade skills

        //Learn and upgrade regeneration skill
        if(this.keyShift.isDown && this.cursors.left.isDown){
            if(this.regenerationLearned == true){
                if(this.totalCoins >= this.baseCostForRegenerationUpgrade){
                        if(this.regenerationCurrentLevelFactor == 10){
                            this.totalCoins -= this.baseCostForRegenerationUpgrade;
                            this.baseCostForRegenerationUpgrade = this.baseCostForRegenerationUpgrade * 2;
                            this.regenerationCurrentLevelFactor = this.regenerationCurrentLevelFactor * 2;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +20 health!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);;
                            }, 2000);
                        }
                        else if(this.regenerationCurrentLevelFactor == 20){
                            this.totalCoins -= this.baseCostForRegenerationUpgrade;
                            this.baseCostForRegenerationUpgrade = this.baseCostForRegenerationUpgrade * 2;
                            this.regenerationCurrentLevelFactor = this.regenerationCurrentLevelFactor * 2;

                             //Display inline "Second level reached!"
                             this.info.text = 'Skill upgraded +40 health!';
                             this.info.setVisible(true);
                             setTimeout(() => {
                                 //Display none => "Max level reached"
                                 this.info.setVisible(false);
                             }, 2000);
                        }
                        else if(this.regenerationCurrentLevelFactor == 40){
                            this.totalCoins -= this.baseCostForRegenerationUpgrade;
                            this.baseCostForRegenerationUpgrade = this.baseCostForRegenerationUpgrade * 2;
                            this.regenerationCurrentLevelFactor = this.regenerationCurrentLevelFactor * 2;

                             //Display inline "Max level reached!"
                             this.info.text = 'Skill upgraded +80 health!';
                             this.info.setVisible(true);
                             setTimeout(() => {
                                 //Display none => "Max level reached"
                                 this.info.setVisible(false);
                             }, 2000);
                        }else{
                            //Display inline "Max skill level reached!"
                            this.info.text = 'Max skill level reached!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);;
                            }, 2000);
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                if(this.totalCoins >= 100){
                    this.totalCoins = this.totalCoins - 100;
                    this.regenerationLearned = true;
                    this.healthPotion.setAlpha(1);

                     //Display inline "Skill learned!"
                     this.info.text = 'Skill learned!';
                     this.info.setVisible(true);
                     setTimeout(() => {
                         //Display none => "Skill learned!"
                         this.info.setVisible(false);;
                     }, 2000);
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }
            //Stops the propagation
            this.keyShift.isDown = false;
            this.cursors.left.isDown = false;
        }
        
        //Learn and upgrade SpeedBoost skill
        if(this.keyShift.isDown && this.cursors.up.isDown){
            if(this.speedBoostLearned == true){
                if(this.totalCoins >= this.baseCostForSpeedBoostUpgrade){
                         if(this.speedBoostCurrentLevelFactor == 1.25){
                            this.totalCoins -= this.baseCostForSpeedBoostUpgrade;
                            this.baseCostForSpeedBoostUpgrade = this.baseCostForSpeedBoostUpgrade * 2;
                            this.speedBoostCurrentLevelFactor = this.speedBoostCurrentLevelFactor * 2;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded *2.5 speed!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);

                        }
                        else if(this.speedBoostCurrentLevelFactor == 2.50){
                            this.totalCoins -= this.baseCostForSpeedBoostUpgrade;
                            this.baseCostForSpeedBoostUpgrade = this.baseCostForSpeedBoostUpgrade * 2;
                            this.speedBoostCurrentLevelFactor = this.speedBoostCurrentLevelFactor * 1.5;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded *3.75 speed!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.speedBoostCurrentLevelFactor == 3.75){
                            this.totalCoins -= this.baseCostForSpeedBoostUpgrade;
                            this.baseCostForSpeedBoostUpgrade = this.baseCostForSpeedBoostUpgrade * 2;
                            this.speedBoostCurrentLevelFactor = 5;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded *5 speed!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Max skill level reached!"
                            this.info.text = 'Max skill level reached!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);
                    }, 2000);
                }
            }else{
                if(this.totalCoins >= 500){
                    this.totalCoins = this.totalCoins - 500;
                    this.speedBoostLearned = true;
                    this.speedPotion.setAlpha(1);

                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);;
                    }, 2000);
                    
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }

            //Stops the propagation
            this.keyShift.isDown = false;
            this.cursors.up.isDown = false;
        }

        //Learn and Upgrade Fireball skill
        if(this.keyShift.isDown && this.cursors.down.isDown){
            if(this.fireballSkillLearned == true){
                if(this.totalCoins >= this.baseCostForfireballUpgrade){
                         if(this.fireballCurrentLevelFactor == 1){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 2;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 2;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 2){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 3;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 3;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 3){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 4;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 4;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 4){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 5;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 5;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 5){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 6;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 6;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 6){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 7;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 7;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 7){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 8;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 8;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 8){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 9;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 9;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else if(this.fireballCurrentLevelFactor == 9){
                            this.totalCoins -= this.baseCostForfireballUpgrade;
                            this.baseCostForfireballUpgrade = this.baseCostForfireballUpgrade * 2;
                            this.fireballCurrentLevelFactor = 10;

                            //Amount fireballs to shoot
                            this.fireballs.maxSize = 10;

                            //Display inline "Skill upgraded!"
                            this.info.text = 'Skill upgraded +1 fireball!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                        else{
                            //Display inline "Max skill level reached!"
                            this.info.text = 'Max skill level reached!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Max level reached"
                                this.info.setVisible(false);
                            }, 2000);
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);
                    }, 2000);
                }
            }else{
                if(this.totalCoins >= 1000){
                    this.totalCoins = this.totalCoins - 1000;
                    this.fireballSkillLearned = true;
                    this.fireballSkillIcon.setAlpha(1);
                    this.fireballSkillActive = true;

                    //Amount fireballs to shoot
                    this.fireballs.maxSize = 1;

                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);;
                    }, 2000);

                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }

            //Stops the propagation
            this.keyShift.isDown = false;
            this.cursors.down.isDown = false;
        }

        //Learn Lightning skill
        if(this.keyShift.isDown && this.cursors.right.isDown){
            if(this.lightningSkillLearned == false){
                if(this.totalCoins >= 1500){
                    this.totalCoins = this.totalCoins - 1500;
                    this.lightningSkillLearned = true;
                    this.lightningSkillIcon.setAlpha(1);

                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);;
                    }, 2000);
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill already learned!"
                this.info.text = 'Skill already learned!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "Skill already learned!"
                    this.info.setVisible(false);;
                }, 2000);
            }
            //Stops the propagation
            this.keyShift.isDown = false;
            this.cursors.right.isDown = false;
        }

        //Skill - Regeneration and Cooldown
        if(this.cursors.left.isDown && this.keyShift.isUp){
            if(this.regenerationLearned == true){
                if(this.regenerationCoolDown == false){
                    //Ökar Aganjus health + 10
                    this.aganju.health = this.aganju.health + this.regenerationCurrentLevelFactor;

                    //Aganjus last speed innan regeneration-skillen aktiveras
                    this.lastSpeed = this.basicSpeed;
                    //Regeneration-skillen påverkar Aganjus speed, den sänks 50%
                    //Aganju kan inte röra sig när han läkar sig själv
                    this.basicSpeed = 0;

                    //Sätter tint (röd) för att visa att skillen används
                    this.healthPotion.setTint(0xff0000);

                    if(this.speedCoolDown == false){
                        //Aganju kan inte aktivera speedBoost-skill när han läkar sig själv
                        this.speedCoolDown = true;
                        setTimeout(() => {
                            this.speedCoolDown = false;
                        }, 2000);
                    }
                    
                    //Tar bort tint för att visa att skillen har använts
                    setTimeout(() => {
                        this.healthPotion.setTint();
                        this.healthPotion.setAlpha(0.5);

                        //Efter regenerationen, Aganju får sin speed tillbaka
                        this.basicSpeed = this.lastSpeed;
                    }, 2000);

                    //Cooldown behövs
                    this.regenerationCoolDown = true;

                    //Efter 20 sekunder Regeneration-skillen kan användas igen
                    setTimeout(() => {
                        this.regenerationCoolDown = false;

                        //Opacity = 1
                        this.healthPotion.setAlpha(1);
                    }, 20000);
                }else{
                    this.skillCoolingDown.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Recharging..."
                        this.skillCoolingDown.setVisible(false);
                    }, 2000);
                }
            }else{
                //Display inle => "Skill not learned yet"
                this.info.setVisible(true);
                this.info.text = 'Skill not learned yet!';
                setTimeout(() => {
                    //Display none => "Skill not learned yet"
                    this.info.setVisible(false);;
                }, 2000);
            }
        }

        //Skill - SpeedBoost and Cooldown
        if(this.cursors.up.isDown && this.keyShift.isUp){  
            if(this.speedBoostLearned == true){
                if(this.speedCoolDown == false){
                    //Höjer Aganju speed till 300
                    this.basicSpeed = this.basicSpeed * this.speedBoostCurrentLevelFactor;
                    //Sätter tint (blå)
                    this.speedPotion.setTint(0xff00ff);

                    //SpeedBoost skillen påverkar Aganjus health, den sänks 50%
                    this.discreasedHealth = this.aganju.health * 0.5;
                    //här deklareras Aganjus dicreasedHealth
                    this.aganju.health = this.discreasedHealth;

                    //Efter 5 sekunder slutar speedboosten
                    setTimeout(() => {
                        //Back to Aganjus normal hastighet
                        this.basicSpeed = 100;
                        //Tar bort tint
                        this.speedPotion.setTint();
                        //Opacity = 0.5
                        this.speedPotion.setAlpha(0.5);

                        //Uppdaterar Aganjus health
                        this.aganju.health = this.aganju.health * 2
                    }, 5000);

                    //Cooldown behövs
                    this.speedCoolDown = true;

                    //Efter 20 sekunder SpeedBoost - Skillen kan användas igen
                    setTimeout(() => {
                        this.speedCoolDown = false;
                        //Opacity = 1
                        this.speedPotion.setAlpha(1);
                    }, 20000);
                }else{
                    this.skillCoolingDown.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Recharging..."
                        this.skillCoolingDown.setVisible(false);
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet"
                this.info.setVisible(true);
                this.info.text = 'Skill not learned yet!';
                setTimeout(() => {
                    //Display none => "Skill not learned yet"
                    this.info.setVisible(false);;
                }, 2000);
            }
        }

        //Skill - Eldbollar
        if(this.cursors.down.isDown && this.keyShift.isUp){
            if(this.fireballSkillLearned == false){
                //Display inline "Skill not learned yet"
                this.info.setVisible(true);
                this.info.text = 'Skill not learned yet!';
                setTimeout(() => {
                    //Display none => "Skill not learned yet"
                    this.info.setVisible(false);;
                }, 2000);
            }
        }

        //Skill - Eldbollar and Cooldown
        if(this.input.activePointer.isDown && time > this.lastFired && this.fireballSkillActive == true){
           
            if(this.fireballSkillLearned == true){
                this.fireball = this.fireballs.get();

                if (this.fireball){
                    this.fireball.setPosition(this.aganjuX,this.aganjuY);
                    this.fireball.fire(this.input.x, this.input.y);
                    this.lastFired = time + 50;
                }
            }
            else{
                //Display inline "Skill not learned yet"
                this.info.setVisible(true);
                this.info.text = 'Skill not learned yet!';
                setTimeout(() => {
                    //Display none => "Skill not learned yet"
                    this.info.setVisible(false);;
                }, 2000);
            }
        }

        //Skill - lightning skill and Cooldown
        if(this.cursors.right.isDown && this.keyShift.isUp){
            if(this.lightningSkillLearned == true){
                if(this.lightningCoolDown == false){
                    this.lightningSkillActive = true;
                    
                    this.fireballSkillActive = false;
                    this.fireballSkillIcon.setAlpha(0.5);

                    //Opacity 1
                    this.lightningSkillIcon.setAlpha(1);

                    setTimeout(() => {
                        this.lightningSkillActive = false;
                        this.lightningDrop.setVisible(false);

                        this.fireballSkillActive = true;
                        this.fireballSkillIcon.setAlpha(1);

                        //Tar bort tint
                        this.lightningSkillIcon.setTint();
    
                        this.lightningCoolDown = true;
                        setTimeout(() => {
                            this.lightningCoolDown = false;
                            //Opacity 1
                            this.lightningSkillIcon.setAlpha(1);
                        }, 10000);
    
                    }, 10000);
                }else{
                    this.skillCoolingDown.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Recharging..."
                        this.skillCoolingDown.setVisible(false);
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet"
                this.info.setVisible(true);
                this.info.text = 'Skill not learned yet!';
                setTimeout(() => {
                    //Display none => "Skill not learned yet"
                    this.info.setVisible(false);;
                }, 2000);
            }
        }
        //Skill - lightning skill and Cooldown
        if(this.lightningSkillActive == true){
            this.fireballSkillActive = false;
            this.fireballSkillIcon.setAlpha(0.5);

            this.lightningDrop.setVisible(true);

            this.lightningDrop.x = this.input.x;
            this.lightningDrop.y = this.input.y;
            
            //Opacity 0.5
            this.lightningSkillIcon.setAlpha(0.5);
            //Sätter tint (blå)
            this.lightningSkillIcon.setTint(0xff00ff);

            if(this.input.activePointer.isDown && this.lightningSkillActive == true){
                //Makes collide between lightning and hastur active
                this.lightningHasturCollider.active = true;

                this.lightningDrop.setVisible(false);
                this.lightning.setVisible(true);

                this.lightning.x = this.input.x;
                this.lightning.y = this.input.y-80;

                //Plays shock animation
                this.lightning.anims.play('shock');

                //On click lightning skill will not be active anymore
                this.lightningSkillActive = false;

                //Lightning skill need to cools down
                this.lightningCoolDown = true;

                //Opacity 0.5
                this.lightningSkillIcon.setAlpha(0.5);
                //Tar bort tint
                this.lightningSkillIcon.setTint();

                //After animation played hides lightning sprite
                setTimeout(() => {
                    this.lightning.setVisible(false);

                    this.fireballSkillActive = true;
                    this.fireballSkillIcon.setAlpha(1);
                }, 1000);
                
                //After 20s skill can be used again
                setTimeout(() => {
                    this.lightningCoolDown = false;
                    //Opacity 1
                    this.lightningSkillIcon.setAlpha(1);
                }, 20000);
            }
        }
    }
}


export default GameScene;

