class GameScene extends Phaser.Scene {

    constructor () {
        super('GameScene');
    }

    // Preload game assets 
    // Här laddas alla assets innan spelet är igång
    preload() {

        //Laddar spelplanen
        this.load.image('background', './assets/tilemap/background.png');

        //Laddar Aganju och json filen som innehåller all frames för Aganju
        this.load.spritesheet('aganju', './assets/player/aganju.png', {frameWidth: 32, frameHeight: 32});

        //Laddar eldbollar
        this.load.image('fireball', './assets/player/fireball.png');

        //Laddar svärd
        this.load.spritesheet('sword', 'assets/player/sword.png', {frameWidth: 256, frameHeight: 194});
    }

    // Create game world 
    // Sätts igång när preload() är uppladdad
    create(){

        //Skapar spelplanen
        this.add.image(0,0,'background').setOrigin(0);
        
        // //Definierar variabeln cursor = down,left,up,right
        // cursor = this.input.keyboard.createCursorKeys();

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

        //Declarerar spacebar
        // spacebar = this.input.keyboard.addKey(Phaser.KeyCode(32));

        //Skapar Aganju
        this.aganju = this.physics.add.sprite(350, 400,'aganju');

        //Skalar upp Aganju
        this.aganju.setScale(2);

        //Ger vikt på Aganju
        this.aganju.body.mass = 2;
        
        //Begränsar Aganju inom spelets gränser
        this.aganju.setCollideWorldBounds(true);

        //Skapar svärden
        this.sword = this.physics.add.sprite(this.aganju.x, this.aganju.y,'sword');

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

            fire: function (x, y)
            {
                this.setPosition(aganju.x-17, aganju.y+20);

                this.setActive(true);
                this.setVisible(true);

                let angle = Phaser.Math.Angle.Between(x, y, 400, 300);

                this.setRotation(angle);

                //Räknar x vinkeln
                this.incX = Math.cos(angle);
                //Räknar y vinkeln
                this.incY = Math.sin(angle);

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
            maxSize: 10,
            runChildUpdate: true
        });

    //Ger z-index 1 till eldbollar
        this.fireballs.setDepth(1);

        //När muspekaren är på
        this.input.on('pointerdown', function (pointer) {

            this.isDown = true;
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;

        });

        //När muspekaren rör sig
        this.input.on('pointermove', function (pointer) {

            this.mouseX = pointer.x;
            this.mouseY = pointer.y;

        });

        //När muspekaren släpps
        this.input.on('pointerup', function (pointer) {

            this.isDown = false;

        });

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

    }

    // Update gameplay 
    // Uppdaterar spelet var 16 ms
    // Körs kontunierlig efter create() är färdig
    update(time, delta){

        //Aganju's x positon
        this.aganjuX = this.aganju.x;
        //Aganju's y positon
        this.aganjuY = this.aganju.y;

        //Gömmer svärden
        this.sword.setVisible(false);

        //Om vänster pillen trycks, 
        //left animation spelas
        if (this.keyA.isDown == true)
        {
            //Ger Aganju velocity (rörelse) till vänster
            this.aganju.setVelocity(-100,0);
            //Spelar left animationen av Aganju
            this.aganju.anims.play('left', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(1);

            //När spacebar trycks
            if(this.spacebar.isDown){
                //Stoppar Aganju
                this.aganju.setVelocity(0);
                //Slutar animationen av Aganju
                this.aganju.anims.stop();
                //Ger z-index 0 till Aganju
                this.aganju.setDepth(0);

                //Gör svärden visible
                this.sword.setVisible(true);
                //Uppdaterar svärdens position
                this.sword.setPosition(this.aganjuX, this.aganjuY-10);
                //Ger z-index till svärden
                this.sword.setDepth(1);
                //Scalar ner svärden
                this.sword.setScale(0.50);
                //Spelar left animationen av svärd
                this.sword.anims.play('sword_left', true);
            }

        }

        //Om höger pillen trycks, 
        //right animation spelas
        else if (this.keyD.isDown)
        {
            this.aganju.setVelocity(100,0);
            this.aganju.anims.play('right', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(1);

            if(this.spacebar.isDown){
                this.aganju.setVelocity(0);
                this.aganju.anims.stop();
                this.aganju.setDepth(1);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX,this.aganjuY-10);
                this.sword.setDepth(0);
                this.sword.setScale(0.50);
                this.sword.anims.play('sword_right', true);
            }
        }

        //Om up pillen trycks, 
        //Up animation spelas
        else if(this.keyS.isDown)
        {
            this.aganju.setVelocity(0,100);
            this.aganju.anims.play('down', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(1);

            if(this.spacebar.isDown){
                this. aganju.setVelocity(0);
                this.aganju.anims.stop();
                this.aganju.setDepth(0);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX+23,this.aganjuY-10);
                this.sword.setDepth(1);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_down', true);
            }
        }

        //Om up pillen trycks, 
        //Up animation spelas
        else if(this.keyW.isDown)
        {
            this.aganju.setVelocity(0,-100);
            this.aganju.anims.play('up', true);

            //Ger z-index till eldbollar
            this.fireballs.setDepth(0);

            //När spacebar trycks
            if(this.spacebar.isDown){
                this.aganju.setVelocity(0);
                this.aganju.anims.stop();
                this.aganju.setDepth(1);

                this.sword.setVisible(true);
                this.sword.setPosition(this.aganjuX-20,this.aganjuY-40);
                this.sword.setDepth(0);

                this.sword.setScale(0.50);
                this.sword.anims.play('sword_up', true);
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
            this.aganju.setVelocityY(-100);
            this.aganju.setVelocityX(-100);
            this.aganju.anims.play('up', true);
            this.aganju.setDepth(1);

            if(this.spacebar.isDown){
                this.aganju.setVelocity(0);
                this.sword.setDepth(0);
            }
        }

        //Om höger och up pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyD.isDown && this.keyW.isDown){    
            this.aganju.setVelocityY(-100);
            this.aganju.setVelocityX(100);
            this.aganju.anims.play('up', true);

            if(this.spacebar.isDown){
                this.aganju.setVelocity(0);
            }
        }

        //Om höger och ner pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyD.isDown && this.keyS.isDown){    
            this.aganju.setVelocityY(100);
            this.aganju.setVelocityX(100);
            this.aganju.anims.play('down', true);
            this.aganju.setDepth(0);

            if(this.spacebar.isDown){
                this.aganju.setVelocity(0);

                this.sword.setDepth(1);
                this.sword.setPosition(this.aganjuX+20,this.aganjuY-10);
            }
    
        }

        //Om vänster och ner pillarna trycks, 
        //Aganju går diagonalt till höger hörn
        if(this.keyA.isDown && this.keyS.isDown){    
            this.aganju.setVelocityY(100);
            this.aganju.setVelocityX(-100);
            this.aganju.anims.play('down', true);

            if(this.spacebar.isDown){
                this.aganju.setVelocity(0);
                this.sword.setPosition(this.aganjuX+17,this.aganjuY-5)
            }
        }
    
        if (this.isDown && time > this.lastFired){
            this.fireball = this.fireballs.get();

            if (this.fireball){
                // fireball.fire(aganju.x, aganju.y);
                this.fireball.fire(this.mouseX, this.mouseY);
                this.lastFired = time + 50;
            }
        }

    }
}

export default GameScene;