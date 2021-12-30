import {
    createHasturAnims
} from '../enemies/enemyAnims.js';
import Hastur from '../enemies/hastur.js';

class GameScene extends Phaser.Scene{
    constructor() {
        super('GameScene');
    }

    // Preload game assets 
    // Här laddas alla assets innan spethis är igång
    preload() {
        //Laddar spelplanen
        this.load.image('background', './assets/tilemap/background.png');
        //Laddar pause icon
        this.load.image('pauseIcon', './assets/tilemap/pauseIcon.png');

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

        //Laddar Speed Potion
        this.load.image('healthPotion', './assets/player/health_potion.png');
        this.load.image('speedPotion', './assets/player/speed_potion.png');

        //Variabel för eldbollar
        this.lastFired = 0;

        this.lives = 3;
        this.score = 0;
    }
    
    // Create game world 
    // Sätts igång när preload() är uppladdad
    create(){
        //Skapar spelplanen
        let bg = this.add.image(0,0,'background').setOrigin(0);
        bg.setScale(2.1);

        this.pauseIcon = this.add.image(400,30, 'pauseIcon');
        this.pauseIcon.setScale(0.2);
        //Opacity = 0.3
        this.pauseIcon.setAlpha(0.3);
        this.pauseIcon.setInteractive();

        this.pauseIcon.on('pointerover', ()=>{
            this.pauseIcon.setAlpha(1);
        });

        this.pauseIcon.on('pointerout', ()=>{
            this.pauseIcon.setAlpha(0.3);
        });

        this.pauseIcon.on('pointerdown', ()=>{
            this.scene.pause();
            this.scene.launch('PauseScene');
        });
        
        //Players lives
        this.livescounter = this.add.text(20,10, 'Lives: ', {fontSize: '20px', fill: 'deepskyblue'});
        this.livescounter.setShadow(2, 2, '#000000', 0);

        //Players health
        this.health =  this.add.text(690,10, '', {fontSize: '20px', fill: 'red'});
        this.health.setShadow(2, 2, '#000000', 0);

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
        this.heart.anims.play('heartTurn');

        //Players score 
        this.scoreText = this.add.text(20, 50, 'Score:', { fontSize: '20px', fill: '#ffffff'});
        this.scoreText.setShadow(2, 2, '#000000', 0);

        //Skapar regeneration skill image
        this.healthPotion = this.add.image(655,580.5,'healthPotion');
        this.healthPotion.setScale(0.45);

        //Skapar speedBoost skill image
        this.speedPotion = this.add.image(700,580,'speedPotion');
        this.speedPotion.setScale(0.5);
       
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
        //Definierar variabeln keyESC = "ESC"
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        ////////////////////////////////////////////////////////////////////
        //Player

        //Skapar Aganju
        this.aganju = this.physics.add.sprite(350, 400,'aganju');
        this.aganju.name = 'aganju';
        //Skalar upp Aganju
        this.aganju.setScale(2);
        //Ger vikt på Aganju
        this.aganju.body.mass = 2;
        //Begränsar Aganju inom spethiss gränser
        this.aganju.setCollideWorldBounds(true);


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
                this.name = 'fireball';

                this.speed = Phaser.Math.GetSpeed(300, 1);
            },

            fire: function (x,y)
            {
                this.setActive(true);
                this.setVisible(true);

                this.angle = Phaser.Math.Angle.Between(this.scene.aganju.x, this.scene.aganju.y, x, y);

                //Räknar x vinkeln
                this.incX = Math.cos(this.angle);
                //Räknar y vinkeln
                this.incY = Math.sin(this.angle);

                this.lifespan = 1000;
            },

            update: function (time, delta)
            {
                this.lifespan -= delta;

                this.x -= -this.incX * (this.speed * delta);
                this.y -= -this.incY * (this.speed * delta);

                if (this.lifespan <= 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
        
            }
            
        });

        //Gör eldbollar en group
        this.fireballs = this.physics.add.group({
            classType: this.fireball,
            maxSize: 10,
            runChildUpdate: true
        });

        //När muspekaren är på
        this.input.on('pointerdown', function (activePointer) {
            this.mouseDown = true;
            this.mouseX = activePointer.x;
            this.mouseY = activePointer.y;
        });

        ////////////////////////////////////////////////////////////////////
        // Hastur

        createHasturAnims(this.anims); //skapas i annan fil

        const hasturs = this.physics.add.group({
            classType: Hastur,
            createCallback: (gameObj) => { // hastur objects properties
                gameObj.name = 'hastur';
                gameObj.body.onCollide = true;

                gameObj.body.mass = 2;
                gameObj.body.collideWorldBounds = true;
                gameObj.body.onWorldBounds = true;
                gameObj.onOverlap = true;

                //Creates collision between Aganju and Hasturs
                this.physics.add.collider(this.aganju, gameObj);

                //creates collision between fireballs and hasturs
                this.physics.add.collider(this.fireballs, gameObj);

                //Gör Hastur orörlig
                gameObj.setImmovable(true);

                // //Hasturs health
                gameObj.health = 100;

            }
        });

        this.hasturs = hasturs;

        // //Skapar Hastur
        this.hastur = this.physics.add.sprite(200, 100, 'hastur'); // old hastur, remove and code will give errors
        for (let i = 0; i < 7; i++) {
            hasturs.get(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), 'hastur');
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

        ///////////////////////////////////////////////////////////////////////////
        //Objects overlaps and functions
        //När Aganju slår hasturen med sin svärd, anropas funktionen hitWithSword, 
        // this.overlapSword = this.physics.add.overlap(this.sword, this.hastur, hitEnemy, null, this);  
        // // this.overlapSword = this.physics.add.overlap(this.sword, this.hastur, goal.bind(this));
        // this.overlapTriggered = false;

        // När Aganju slår hasturen med sin svärd, anropas funktionen hitWithSword, 
        this.physics.add.overlap(this.hastur, this.fireballs, burnEnemy, null, this);

        this.swordHasturCollider = this.physics.add.overlap(this.sword, this.hastur, null, hitEnemy,this);
    
        function hitEnemy(){
            this.hastur.health = this.hastur.health - this.sword.damage;

            if(this.hastur.health == 0){
                this.hastur.destroy();
                this.score = this.score + 10;
            } 

            //Unactives collide between sword and Hastur
            this.swordHasturCollider.active = false;

            //Stops propagation
            this.spacebar.isDown = false;
        }

        function burnEnemy(){
            this.hastur.health = this.hastur.health - 10;

            if(this.hastur.health == 0){
                this.hastur.destroy();
            }
        }

        ////////////////////////////////////////////////////////////////////
        //Skills 

        //Aganjus health
        this.aganju.health = 100;
        //Regeneration skillen behöver inte cooldownas
        //Skillen har inte använt än
        this.regenerationCoolDown = false;

        //Aganjus start hastighet
        this.basicSpeed = 100;
        //SpeedBoost skillen behöver inte cooldownas, 
        //spelaren har inte använt den än
        this.speedCoolDown = false;
    }

    // Update gameplay 
    // Uppdaterar spelet var 16 ms
    // Körs kontunierlig efter create() är färdig
    update(time, delta){

        //On press to ESC, pausing the game
        if(this.keyESC.isDown){
            this.scene.launch('PauseScene');
            this.scene.pause();
        }

        //Uppdaterar score
        this.scoreText.text = 'Score: ' + this.score;
        //Uppdaterar lives Aganju har
        this.livescounter.text = 'Lives: ' + this.lives;
        //Uppdaterar Aganjus health
        this.health.text = '' + this.aganju.health;
        
        //Aganju's x positon
        this.aganjuX = this.aganju.x;
        //Aganju's y positon
        this.aganjuY = this.aganju.y;
        
        // Gömmer svärden
        this.sword.setVisible(false);

        // this.physics.add.overlap(hastur, aganju, takingDamage);

        // function takingDamage(){
        //     aganjuHealth = aganjuHealth - 1;

        //     if(aganjuHealth == 0){
        //         aganju.destroy();
        //     }
        // }

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

        if(this.input.activePointer.isDown && time > this.lastFired){

            this.fireball = this.fireballs.get();

                if (this.fireball){
                    this.fireball.setPosition(this.aganjuX,this.aganjuY);
                    this.fireball.fire(this.input.activePointer.x, this.input.activePointer.y);
                    this.lastFired = time + 50;
                }
        }

        //Skill - Regeneration and Cooldown
        if(this.regenerationCoolDown == false){
            if(this.cursors.left.isDown){

                //Ökar Aganjus health + 10
                this.aganju.health = this.aganju.health + 10;

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
            }
        }

        //Skill - SpeedBoost and Cooldown
        if(this.speedCoolDown == false){
            if(this.cursors.up.isDown){
                //Höjer Aganju speed till 300
                this.basicSpeed = 300;
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
            }
        }
    }
}

export default GameScene;