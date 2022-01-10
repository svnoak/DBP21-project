import {
    createHasturAnims
} from '../enemies/enemyAnims.js';
import Hastur from '../enemies/hastur.js';

class GameScene extends Phaser.Scene{
    constructor() {
        super('GameScene');
    }
    init(data){
        this.startData = data;
    }
    // Preload game assets 
    // Här laddas alla assets innan spethis är igång
    preload() {
        //Laddar spelplanen
        this.load.image('background', './assets/tilemap/background.png');
        //Laddar pause icon
        this.load.image('pauseIcon', './assets/tilemap/pauseIcon.png');
        //Laddar pause icon
        this.load.image('skillIcon', './assets/tilemap/skillUpIcon.png');

        //Laddar Aganju 
        this.load.spritesheet('aganju', './assets/player/aganju.png', {frameWidth: 32, frameHeight: 32});

        //Laddar svärd
        this.load.spritesheet('sword', 'assets/player/sword.png', {frameWidth: 256, frameHeight: 194});

        //Laddar heart
        this.load.spritesheet('heart', 'assets/tilemap/heart.png', {frameWidth: 150, frameHeight: 150});

        //Laddar eldbollar
        this.load.image('fireball', './assets/player/fireball.png');

        //Laddar no access/locked image for not learned skills
        this.load.image('locked', './assets/player/locked.png');

        //Laddar Hastur 
        this.load.spritesheet('hastur', './assets/enemy/hastur_leg.png', {frameWidth: 32, frameHeight: 32});

        //Laddar Health Potion icon
        this.load.image('healthPotion', './assets/player/health_potion.png');
        //Laddar Speed Potion icon
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
    }
    
    // Create game world 
    // Sätts igång när preload() är uppladdad
    create(){
        this.cameras.main.fadeIn(100, 0, 0, 0);
        //Skapar spelplanen
        let bg = this.add.image(0,0,'background').setOrigin(0);
        bg.setScale(2.1);
        //Creates pause icon
        this.pauseIcon = this.add.image(400,30, 'pauseIcon');
        this.pauseIcon.setScale(0.2);
        //Opacity = 0.3
        this.pauseIcon.setAlpha(0.3);
        this.pauseIcon.setInteractive({ cursor: 'pointer' });
        this.pauseIcon.setDepth(1);

        //Mouse hover
        this.pauseIcon.on('pointerover', ()=>{
            this.pauseIcon.setAlpha(1);
        });
        //Mouse out
        this.pauseIcon.on('pointerout', ()=>{
            this.pauseIcon.setAlpha(0.3);
        });
        //Onclick opens the puase screen
        this.pauseIcon.on('pointerdown', ()=>{
            this.scene.pause();
            this.scene.launch('PauseScene', this.startData);
        });

        //Creates skillUp icon
        this.skillIcon = this.add.image(770,440, 'skillIcon');
        this.skillIcon.setScale(0.2);
        //Opacity = 0.3
        this.skillIcon.setAlpha(0.3);
        this.skillIcon.setInteractive({ cursor: 'pointer' });
        this.skillIcon.setDepth(1);

        this.textSkill = this.add.text(738,400, 'Skills', {font: '15px arcade', fill: 'black'});
        this.textSkill.setDepth(1);
        this.textSkill.setVisible(false);

        //Mouse hover
        this.skillIcon.on('pointerover', ()=>{
            this.skillIcon.setAlpha(1);
            this.textSkill.setVisible(true);
        });
        //Mouse out
        this.skillIcon.on('pointerout', ()=>{
            this.skillIcon.setAlpha(0.3);
            this.textSkill.setVisible(false);
        });
        //Onclick opens the puase screen
        this.skillIcon.on('pointerdown', ()=>{
            this.scene.pause();
            this.scene.launch('UpgradeScene', this.startData);
        });
        
        //Players lives
        this.livescounter = this.add.text(20,10, 'Lives: ', {font: '25px arcade', fill: 'deepskyblue', });
        this.livescounter.setShadow(2, 2, '#000000', 0);
        this.livescounter.setDepth(1);

        //Players health
        this.health =  this.add.text(690,5, '', {font: '25px arcade', fill: 'red'});
        this.health.setShadow(2, 2, '#000000', 0);
        this.health.setDepth(1);

        //Coins
        this.coins =  this.add.text(690,50, '', {fill: 'gold', font: "25px arcade"});
        this.coins.setShadow(2, 2, '#000000', 0);
        this.coins.setDepth(1);

        //Heart
        this.heart = this.physics.add.sprite(750, 20,'heart');
        this.heart.setScale(0.20);
        this.heart.setDepth(1);
            
        //Skapar heart animation
        this.anims.create({
            key: 'heartTurn',
            frames: this.anims.generateFrameNumbers('heart', { 
                start: 0, 
                end: 5
            }),
            frameRate: 6,
            repeat: -1
        });
        this.heart.anims.play('heartTurn');

        //Players score 
        this.scoreText = this.add.text(20, 50, 'Score:', { font: '25px arcade', fill: '#ffffff'});
        this.scoreText.setShadow(2, 2, '#000000', 0);
        this.scoreText.setDepth(1);
        
        //Skill notification
        this.info = this.add.text(235,75, '', {font: '25px arcade', fill: 'white'});
        this.info.setShadow(2, 2, '#000000', 0);
        this.info.setVisible(false);
        this.info.setDepth(1);

        //Skill Recharging..
        this.skillCoolingDown = this.add.text(290,565, 'Recharging...', {font: '25px arcade', fill: 'red'});
        this.skillCoolingDown.setShadow(2, 2, '#000000', 0);
        this.skillCoolingDown.setVisible(false);
        this.skillCoolingDown.setDepth(1);

        //Skapar regeneration skill image
        this.healthPotion = this.add.image(700,570,'healthPotion');
        this.healthPotion.setScale(0.45);
        this.healthPotion.setDepth(1);
      
        this.textR = this.add.text(675,580, 'R', {font: '15px arcade', fill: 'black'});
        this.textR.setDepth(1);

        this.regenerationLocked = this.add.image(700, 571, 'locked');
        this.regenerationLocked.setScale(0.075);
        this.regenerationLocked.setDepth(1);

        //Skapar speedBoost skill image
        this.speedPotion = this.add.image(720,524,'speedPotion');
        this.speedPotion.setScale(0.49);
        this.speedPotion.setDepth(1);
       
        this.textQ = this.add.text(700,495, 'Q', {font: '15px arcade', fill: 'black'});
        this.textQ.setDepth(1);

        this.speedBoostLocked = this.add.image(720, 527, 'locked');
        this.speedBoostLocked.setScale(0.075);
        this.speedBoostLocked.setDepth(1);

        //Skapar fireball skill icon
        this.fireballSkillIcon = this.add.image(765,510,'fireball');
        this.fireballSkillIcon.setScale(1.50);
        this.fireballSkillIcon.setDepth(1);

        this.textF = this.add.text(775,480, 'F', {font: '15px arcade', fill: 'black'});
        this.textF.setDepth(1);

        this.fireballIconLocked = this.add.image(765, 510, 'locked');
        this.fireballIconLocked.setScale(0.075);
        this.fireballIconLocked.setDepth(1);

        //Creates lightningSkill icon
        this.lightningSkillIcon = this.add.image(760, 565, 'lightningIcon');
        this.lightningSkillIcon.setScale(0.45);
        this.lightningSkillIcon.setDepth(1);

        this.textE = this.add.text(785,585, 'E', {font: '15px arcade', fill: 'black'});
        this.textE.setDepth(1);

        this.lightningIconLocked = this.add.image(760, 565, 'locked');
        this.lightningIconLocked.setScale(0.13);
        this.lightningIconLocked.setDepth(1);

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

        this.lightningDropPlace = this.physics.add.sprite(350, 400,'lightning');
        this.lightningDropPlace.name = 'lightning';
        this.lightningDropPlace.body.mass = 2;
        //Makes lightning unmovable
        this.lightningDropPlace.setImmovable(true);
        this.lightningDropPlace.x = -100;
        this.lightningDropPlace.y = -100;
        
        this.lightningDropPlace.setVisible(false);

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
        //Definierar variabeln keyQ = "Q"
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        //Definierar variabeln keyE = "E"
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //Definierar variabeln keyR = "R"
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //Definierar variabeln keyF = "F"
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        //Definierar variabeln keyESC = "ESC"
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        ////////////////////////////////////////////////////////////////////
        //Player

        //Skapar Aganju
        let config = this.game.config; // to get width ang height of playground

        this.aganju = this.physics.add.sprite(config.width / 2, config.height / 2,'aganju');
        this.aganju.name = 'aganju';
        //Skalar upp Aganju
        this.aganju.setScale(2);
        //Ger vikt på Aganju
        this.aganju.body.mass = 2;
        //Begränsar Aganju inom spethiss gränser
        this.aganju.setCollideWorldBounds(true);
        //Aganjus body size
        this.aganju.setBodySize(23,30,true);
        this.aganju.setOffset(5,1.5, true);

        //Aganjus health
        this.aganju.health = 100;
        //Aganjus start hastighet
        this.basicSpeed = 100;

        ////////////////////////////////////////////////////////////////////
        //Vapen

        //Skapar svärden
        this.sword = this.physics.add.sprite(this.aganju.x, this.aganju.y,'sword');
        //Sword Damage 
        this.sword.name = 'sword';
        this.sword.damage = 10;
        this.sword.mass = 2;
        //Makes sword unmovable
        this.sword.setImmovable(true);
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
                this.name = 'fireball';

                this.speed = Phaser.Math.GetSpeed(300, 1);
            },

            fire: function (x,y)
            {
                this.setActive(true);
                this.setVisible(true);

                this.angle = Phaser.Math.Angle.Between(x, y, this.scene.aganju.x, this.scene.aganju.y);

                //Räknar x vinkeln
                this.incX = Math.cos(this.angle);
                //Räknar y vinkeln
                this.incY = Math.sin(this.angle);

                this.lifespan = 1000;

                console.log(this);

            },

            update: function (time, delta)
            {
                this.lifespan -= delta;

                this.x += -this.incX * (this.speed * delta);
                this.y += -this.incY * (this.speed * delta);

                if (this.lifespan <= 0)
                {
                    this.destroy()
                }

            }
            
        });

        //Gör eldbollar en group
        this.fireballs = this.physics.add.group({
            classType: this.fireball,
            maxSize: this.startData.amountFireballsToFire,
            runChildUpdate: true
        });
//När muspekaren är på
this.input.on('pointerdown', function (activePointer) {
    this.mouseDown = true;
    this.mouseX = activePointer.x;
    this.mouseY = activePointer.y;
});




var HasturProjectile = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fireball');

        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;

        this.speed = Phaser.Math.GetSpeed(300, 1);
    },

    fire: function (x1, y1, x2, y2)
    {
        this.setActive(true);
        this.setVisible(true);
        this.name = 'hasturProjectile';

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x1, y1);

        var angle = Phaser.Math.Angle.Between(x1, y1, x2, y2);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 5000;
    },
    update: function (time, delta)
            {
                this.lifespan -= delta;
        
                this.x += this.incX * (this.speed * delta);
                this.y += this.incY * (this.speed * delta);
        
                if (this.lifespan <= 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        
        
        });

        this.hasturProjectiles = this.physics.add.group({
            classType: HasturProjectile,
            createCallback:(gameObj) =>{

                gameObj.body.onCollide = true;
                gameObj.damage = 5;

                //creates collision between projectile and aganju
                this.physics.add.collider(this.aganju, gameObj);
                
            },
            maxSize: 1,
            runChildUpdate: true,
        });

        this.physics.world.on('collide', (objOne, objTwo)=>{
       
            if( objTwo.name == 'hasturProjectile' ){
                let thisAganju = objOne;
                let thisProjectile = objTwo;
           
                thisProjectile.destroy();
                thisAganju.health -= thisProjectile.damage;
            }
            
        })
        ////////////////////////////////////////////////////////////////////
        // Hastur

        createHasturAnims(this.anims); //skapas i annan fil

        this.hasturs = this.physics.add.group({
            classType: Hastur,
            createCallback: (gameObj) => { // hastur objects properties
                gameObj.name = 'hastur';
                gameObj.body.onCollide = true;

                gameObj.body.mass = 2;
                gameObj.body.collideWorldBounds = true;
                gameObj.body.onWorldBounds = true;
                gameObj.onOverlap = true;
                gameObj.setBodySize(17.5,32,true);

                gameObj.damage = 25;

                //Creates collision between Aganju and Hasturs
                this.physics.add.collider(this.aganju, gameObj);

                //creates collision between fireballs and hasturs
                this.physics.add.collider(this.fireballs, gameObj);

                //creates collision between lightning and hasturs
                this.physics.add.collider(this.lightningDropPlace, gameObj);

                //creates collision between sword and hasturs
                this.physics.add.collider(this.sword, gameObj);

                //Gör Hastur orörlig
                gameObj.setImmovable(true);

                // //Hasturs health
                gameObj.health = 100;

            }
        });
        
        // SPAWN HASTURS CODE
        this.killedAmount = 0; // how many hasturs killed
        this.shouldSpawnMore = false; 

        this.spawnAHastur = (x ,y) =>{
            //initial vals
            let coordX = Phaser.Math.Between(0,1) == 1 ? 0 : config.width;
            let coordY = Phaser.Math.Between(0,1) == 1 ? 0 : config.height;         

            if( x !== undefined ){ // if no params
                coordX = x;
                coordY = y;
            } else if( Phaser.Math.Between(0,1) == 1 ){ // else cointoss
                coordX = Phaser.Math.Between(0, config.width)
            } else {
                coordY = Phaser.Math.Between(0, config.height)
            }

            this.hasturs.get( coordX, coordY, 'hastur');
        }

        //Skapar spawn coords for initial hasturs
        let coords = [ 
            //top
            [(config.width / 3), 0],
            [(config.width / 3) * 2, 0],

            //right
            [config.width, (config.height / 2) ],

            //down
            [(config.width / 3), config.height],
            [(config.width / 3) * 2, config.height],
            
            //left
            [0, (config.height / 2) ],

        ];
        for (let i = 0; i < coords.length; i++) {
            this.spawnAHastur( coords[i][0], coords[i][1] );
        }
        
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
        //////////////////////////////////////////////////////////////////////////
        //Objects overlaps and functions

        this.swordHasturCollider = this.physics.add.overlap(this.sword, this.hastur, null, hitEnemy,this);
    
        function hitEnemy(){
            this.hastur.health = this.hastur.health - this.sword.damage;

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

        this.lastPressedButton = 'S';
    }

    // Update gameplay 
    // Uppdaterar spelet var 16 ms
    // Körs kontunierlig efter create() är färdig
    update(time, delta){

        if(this.shouldSpawnMore){
            for (let i = 0; i < Math.floor(this.killedAmount * 0.2) ; i++) {
                // let delay = 
                setTimeout(()=>{
                    this.spawnAHastur();
                }, 500 * i)
            }
            this.shouldSpawnMore = false;
        }

        //On press to ESC, pausing the game
        if(this.keyESC.isDown){
            this.scene.pause();
            this.scene.launch('PauseScene', this.startData);
        }

        //Gameover scene 
        if(this.startData.lives == -1){
            //Stops the game scene
            this.scene.stop("GameScene");
            
            //Starts gameover scene
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('GameoverScene', this.startData);
            });
        }
        
        //Uppdaterar score
        this.scoreText.text = 'Score: ' + this.startData.score;
        //Uppdaterar lives Aganju har
        this.livescounter.text = 'Lives: ' + this.startData.lives;
        //Uppdaterar Aganjus health
        this.health.text = '' + this.aganju.health;
        //Uppdaterar total coins
        this.coins.text = '' + this.startData.totalCoins;

        //Aganju's x positon
        this.aganjuX = this.aganju.x;
        //Aganju's y positon
        this.aganjuY = this.aganju.y;

        // Gömmer svärden
        this.sword.setVisible(false);
        //Updates sword position to not collide while not on use
        this.sword.x = -150;
        this.sword.y = -150;

        ///////////////////////////////////////////////////////////////////////////
        //Player movement and animations

        //När spacebar trycks
        if(this.spacebar.isDown){
            if(this.lastPressedButton == 'A'){
                this.aganju.setDepth(0);

                this.sword.setBodySize(30,125,true);
                //Sätter X offset 14 och Y  offset 52 för att kunna skada fienden på x axeln(vänster sida)
                this.sword.setOffset(14,55,true);
    
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
            }
            
            else if(this.lastPressedButton == 'D'){
                this.aganju.setDepth(1);

                this.sword.setBodySize(30,125,true);
                //Sätter X offset 210 och Y offset 52 för att kunna skada fienden på x axeln(höger sida)
                this.sword.setOffset(210,55,true);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX,this.aganjuY-10);
                this.sword.setDepth(0);
                this.sword.setScale(0.50);
                this.sword.anims.play('sword_right', true);
            }

            else if(this.lastPressedButton == 'S'){
                this.aganju.setDepth(0);

                this.sword.setBodySize(125,30,true);
                //Sätter X offset 20 och Y offset 200 för att kunna skada fienden på y axeln(ner)
                this.sword.setOffset(20,200,true);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX+23,this.aganjuY-10);
                this.sword.setDepth(1);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_down', true);
            }

            else if(this.lastPressedButton == 'W'){
                this.aganju.setDepth(1);

                this.sword.setBodySize(125,30,true);
                //Sätter X offset 105 och Y offset 60 för att kunna skada fienden på y axeln(upp)
                this.sword.setOffset(105,60,true);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX-20,this.aganjuY-40);
                this.sword.setDepth(0);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_up', true);
            }
        }

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

                this.sword.setBodySize(30,125,true);
                //Sätter X offset -10 och Y  offset 55 för att kunna skada fienden på x axeln(vänster sida)
                this.sword.setOffset(-10,55,true);

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
            }

            this.lastPressedButton = 'A';
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

                this.sword.setBodySize(30,125,true);
                //Sätter X offset 230 och Y offset 52 för att kunna skada fienden på x axeln(höger sida)
                this.sword.setOffset(230,55,true);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX,this.aganjuY-10);
                this.sword.setDepth(0);
                this.sword.setScale(0.50);
                this.sword.anims.play('sword_right', true);
            }
            this.lastPressedButton = 'D';
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

                this.sword.setBodySize(125,30,true);
                //Sätter X offset 20 och Y offset 220 för att kunna skada fienden på y axeln(ner)
                this.sword.setOffset(20,220,true);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX+23,this.aganjuY-10);
                this.sword.setDepth(1);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_down', true);
            }
            this.lastPressedButton = 'S';
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

                this.sword.setBodySize(125,30,true);
                //Sätter X offset 105 och Y offset 40 för att kunna skada fienden på y axeln(upp)
                this.sword.setOffset(105,40,true);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX-20,this.aganjuY-40);
                this.sword.setDepth(0);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_up', true);
            }
            this.lastPressedButton = 'W';
        }

        //Annars ingen rörelse
        //Ingen animation
        else{
            this.aganju.setVelocity(0,0);
            this.aganju.anims.stop();
            if(this.lastPressedButton == 'S'){
                this.aganju.setFrame(1);
            }
            else if(this.lastPressedButton == 'A'){
                this.aganju.setFrame(4);
            }
            else if(this.lastPressedButton == 'D'){
                this.aganju.setFrame(7);
            }
            else if(this.lastPressedButton == 'W'){
                this.aganju.setFrame(10);
            }
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

                this.sword.setBodySize(30,80,true);
                //Sätter X offset -25 och Y  offset 150 för att kunna skada fienden på x och y axeln(ner och vänster sida)
                this.sword.setOffset(3,-20,true);
            }
        }

        //Om höger och up pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyD.isDown && this.keyW.isDown){    
            this.aganju.setVelocityY(-this.basicSpeed);
            this.aganju.setVelocityX(this.basicSpeed);
            this.aganju.anims.play('up', true);

            if(this.spacebar.isDown){
                this.sword.setBodySize(30,80,true);
                //Sätter X offset 220 och Y  offset -20 för att kunna skada fienden på x och y axeln(upp och höger sida)
                this.sword.setOffset(220,-20,true);
            }
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

                this.sword.setBodySize(30,80,true);
                //Sätter X offset 175 och Y  offset 160 för att kunna skada fienden på x och y axeln(ner och höger sida)
                this.sword.setOffset(175,160,true);
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

                this.sword.setBodySize(30,80,true);
                //Sätter X offset -25 och Y  offset 150 för att kunna skada fienden på x och y axeln(ner och vänster sida)
                this.sword.setOffset(-25,150,true);
            }
        }

        ///////////////////////////////////////////////////////////////////////////
        //Players skills and cooldowns

        if(this.startData.regenerationLearned == true){
            this.regenerationLocked.destroy();
        }
        //Skill - Regeneration and Cooldown
        if(this.keyR.isDown){
            if(this.startData.regenerationLearned == true){
                if(this.startData.regenerationCoolDown == false){
                    //Ökar Aganjus health + 10
                    this.aganju.health = this.aganju.health + this.startData.regenerationCurrentLevelFactor;

                    //Aganjus last speed innan regeneration-skillen aktiveras
                    this.lastSpeed = this.basicSpeed;
                    //Regeneration-skillen påverkar Aganjus speed, den sänks 50%
                    //Aganju kan inte röra sig när han läkar sig själv
                    this.basicSpeed = 0;

                    //Sätter tint (röd) för att visa att skillen används
                    this.healthPotion.setTint(0xff0000);

                    if(this.startData.speedCoolDown == false){
                        //Aganju kan inte aktivera speedBoost-skill när han läkar sig själv
                        this.startData.speedCoolDown = true;
                        setTimeout(() => {
                            this.startData.speedCoolDown = false;
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
                    this.startData.regenerationCoolDown = true;

                    //Efter 20 sekunder Regeneration-skillen kan användas igen
                    setTimeout(() => {
                        this.startData.regenerationCoolDown = false;

                        //Opacity = 1
                        this.healthPotion.setAlpha(1);
                    }, 10000);
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

        if(this.startData.speedBoostLearned == true){
            this.speedBoostLocked.destroy();
        }
        //Skill - SpeedBoost and Cooldown
        if(this.keyQ.isDown){  
            if(this.startData.speedBoostLearned == true){
                if(this.startData.speedCoolDown == false){
                    //Höjer Aganju speed till 300
                    this.basicSpeed = this.basicSpeed * this.startData.speedBoostCurrentLevelFactor;
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
                    this.startData.speedCoolDown = true;

                    //Efter 20 sekunder SpeedBoost - Skillen kan användas igen
                    setTimeout(() => {
                        this.startData.speedCoolDown = false;
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

        if(this.startData.fireballSkillLearned == true){
            this.fireballIconLocked.destroy();
        }

        //Updates amount fireballs to shoot
        this.fireballs.maxSize = this.startData.amountFireballsToFire;
        //Skill - Eldbollar
        if(this.keyF.isDown){
            if(this.startData.fireballSkillLearned == true){
                if(this.startData.fireballSkillActive == true){
                    this.keyEPressed = true;

                    //Shows skill in use (sets a blue tint)
                    this.fireballSkillIcon.setTint(0xff00ff);

                    //Starts countdown for fireballs skill
                    setTimeout(() => {
                       //Disable fireball skill for 5 sek
                       this.startData.fireballSkillActive = false;
                       this.keyEPressed = false;

                       //Clears tint
                       this.fireballSkillIcon.clearTint();
                       this.fireballSkillIcon.setAlpha(0.5);

                       setTimeout(() => {
                           //Skill is available again
                           this.startData.fireballSkillActive = true;
                           this.fireballSkillIcon.setAlpha(1);
                       }, 20000);

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
            this.keyF.isDown = false;
        }
        //Skill - Eldbollar and Cooldown
        if(this.input.activePointer.isDown && time > this.lastFired && this.startData.fireballSkillActive == true && this.keyEPressed == true){
            this.fireball = this.fireballs.get();

            if (this.fireball){
                this.fireball.setPosition(this.aganjuX,this.aganjuY);
                this.fireball.fire(this.input.x, this.input.y);
                this.lastFired = time + 50;
            }
        }

        //Updates lightning damage
        this.lightningDropPlace.damage = this.startData.lightningDamage;
        if(this.startData.lightningSkillLearned == true){
            this.lightningIconLocked.destroy();
        }
        //Skill - lightning skill and Cooldown
        if(this.keyE.isDown){
            if(this.startData.lightningSkillLearned == true){
                this.lightning.damage = this.startData.lightningDamage;

                if(this.startData.lightningCoolDown == false){
                    this.startData.lightningSkillActive = true;
                    
                    if(this.startData.fireballSkillLearned == true){
                        this.startData.fireballSkillActive = false;
                        this.fireballSkillIcon.setAlpha(0.5);
                    }

                    //Opacity 1
                    this.lightningSkillIcon.setAlpha(1);

                    setTimeout(() => {
                        this.startData.lightningSkillActive = false;
                        this.lightningDrop.setVisible(false);

                        if(this.startData.fireballSkillLearned == true){
                            this.startData.fireballSkillActive = true;
                            this.fireballSkillIcon.setAlpha(1);
                        }
                        //Tar bort tint
                        this.lightningSkillIcon.setTint();
    
                        this.startData.lightningCoolDown = true;
                        setTimeout(() => {
                            this.startData.lightningCoolDown = false;
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
        if(this.startData.lightningSkillActive == true){

            if(this.startData.fireballSkillLearned == true){
                this.fireballSkillIcon.setAlpha(0.5);

                if(this.startData.fireballSkillActive !== false){
                    this.startData.fireballSkillActive = true;
                }else{
                    this.startData.fireballSkillActive = false;
                }
            }

            this.lightningDrop.setVisible(true);

            this.lightningDrop.x = this.input.x;
            this.lightningDrop.y = this.input.y;
            
            //Opacity 0.5
            this.lightningSkillIcon.setAlpha(0.5);
            //Sätter tint (blå)
            this.lightningSkillIcon.setTint(0xff00ff);

            if(this.input.activePointer.isDown && this.startData.lightningSkillActive == true){

                this.lightningDrop.setVisible(false);
                this.lightning.setVisible(true);

                this.lightning.x = this.input.x;
                this.lightning.y = this.input.y-80;

                //Lightning dropplace
                this.lightningDropPlace.x = this.lightningDrop.x;
                this.lightningDropPlace.y = this.lightningDrop.y;
                
                //Plays shock animation
                this.lightning.anims.play('shock');

                //On click lightning skill will not be active anymore
                this.startData.lightningSkillActive = false;

                //Lightning skill need to cools down
                this.startData.lightningCoolDown = true;

                //Opacity 0.5
                this.lightningSkillIcon.setAlpha(0.5);
                //Tar bort tint
                this.lightningSkillIcon.setTint();

                if(this.startData.fireballSkillLearned == true){
                    if( this.startData.fireballSkillActive !== false){
                        this.startData.fireballSkillActive = true;
                        this.fireballSkillIcon.setAlpha(1);
                        this.fireballSkillIcon.clearTint();
                    }else{
                        this.startData.fireballSkillActive = false;
                    }
                }

                //After animation played hides lightning sprite
                setTimeout(() => {
                    this.lightning.setVisible(false);
                }, 1000);

                setTimeout(() => {
                    this.lightningExplosion.x = this.lightningDrop.x;
                    this.lightningExplosion.y = this.lightningDrop.y;

                    this.lightningExplosion.setVisible(true);
                    this.lightningExplosion.anims.play('explode');

                    setTimeout(() => {
                        this.lightningExplosion.setVisible(false);
                    }, 1000);
                }, 500);
                
                //After 20s skill can be used again
                setTimeout(() => {
                    this.startData.lightningCoolDown = false;
                    //Opacity 1
                    this.lightningSkillIcon.setAlpha(1);
                }, 20000);
            }
        }
    }
}

export default GameScene;
