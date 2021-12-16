import { createHasturAnims } from '../enemies/enemyAnims.js';
import Hastur  from '../enemies/hastur.js';

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

    //Laddar Hastur 
    this.load.spritesheet('hastur', './assets/enemy/hastur_leg.png', {frameWidth: 32, frameHeight: 32});

    //Laddar eldbollar
    this.load.image('fireball', './assets/player/fireball.png');

    //Laddar svärd
    this.load.spritesheet('sword', 'assets/player/sword.png', {frameWidth: 256, frameHeight: 194});
    }
    
    // Create game world 
    // Sätts igång när preload() är uppladdad
    create(){
    //Skapar spelplanen
    const background = this.add.image(0,0,'background').setOrigin(0);
    background.setScale(2.1);
    
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

    //Variabler för eldbollar
    this.lastFired = 0;
    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;

    



    createHasturAnims(this.anims); //skapar animation i annan fil

    // används för att skapa hasturer, lägger till dem i en grupp
    const hasturs = this.physics.add.group({ 
        classType: Hastur,
    });

    
    // //Skapa en hastur
    let aHastur = hasturs.get(this, 200,200,'hastur');
    // this.hastur = this.physics.add.sprite(200, 200,'hastur');
    // this.hastur.anims.play('hastur-down');






    //Skapar Aganju
    this.aganju = this.physics.add.sprite(380, 400,'aganju');
    
    //Skalar upp Aganju
    this.aganju.setScale(2);
    //Ger vikt på Aganju
    this.aganju.body.mass = 2;
    //Begränsar Aganju inom spethiss gränser
    this.aganju.setCollideWorldBounds(true);


    //Kollision mellan Aganju och Hastur
    this.physics.add.collider(this.aganju, this.hastur);

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

        fire: function (x,y)
        {
            // this.setPosition(x-17, y+20);
            // this.setPosition(aganju.x-17, aganju.y+20);

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
        maxSize: 10,
        runChildUpdate: true
    });

    //När muspekaren är på
    this.input.on('pointerdown', function (activePointer) {

        this.mouseDown = true;
        this.mouseX = activePointer.x;
        this.mouseY = activePointer.y;

    });

    //När muspekaren rör sig
    this.input.on('pointermove', function (activePointer) {

        this.mouseX = activePointer.x;
        this.mouseY = activePointer.y;
    });

    //När muspekaren släpps
    this.input.on('pointerup', function () {
      this.mouseDown = false;
    });

    //Skapar down animationen för Aganju
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('aganju', {frames:[1,0,1,2]}),
        frameRate: 10,
        repeat: -1
    });

    //Skapar left animationen för Aganju
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('aganju', {frames:[4,3,4,5]}),
        frameRate: 10,
        repeat: -1
    });
    
    //Skapar right animationen för Aganju
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('aganju', {frames:[7,6,7,8]}),
        frameRate: 10,
        repeat: -1
    });
    
    //Skapar up animationen för Aganju
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('aganju', {frames:[10,9,10,11]}),
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

    // Gömmer svärden
    this.sword.setVisible(false);

    //När Aganju slår hasturen med sin svärd, anropas funktionen hitWithSword, 
    this.physics.add.overlap(this.hastur, this.sword, hitEnemy, null, this);  

    // När Aganju slår hasturen med sin svärd, anropas funktionen hitWithSword, 
    this.physics.add.overlap(this.hastur, this.fireballs, burnEnemy, null, this);

    function hitEnemy(){
        this.hastur.health = this.hastur.health - 1;

        if(this.hastur.health == 0){
            this.hastur.destroy();
        }
    }
    
    function burnEnemy(){
        this.hastur.health = this.hastur.health - 10;

        if(this.hastur.health == 0){
            this.hastur.destroy();
        }
    }

    // this.physics.add.overlap(hastur, aganju, takingDamage);

    // function takingDamage(){
    //     aganjuHealth = aganjuHealth - 1;

    //     if(aganjuHealth == 0){
    //         aganju.destroy();
    //     }
    // }

    //Om vänster pillen trycks, 
    //left animation spelas
    if (this.keyA.isDown)
    {
        //Ger Aganju velocity (rörelse) till vänster
        this.aganju.setVelocity(-100,0);
        //Spelar left animationen av Aganju
        this.aganju.anims.play('left', true);

        // Ger z-index till eldbollar
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
            this.sword.setPosition(this.aganjuX,this.aganjuY-10);
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
            this.aganju.setVelocity(0);
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

    if(this.input.activePointer.isDown && time > this.lastFired){
        console.log(this.mouseDown);

        this.fireball = this.fireballs.get();

            if (this.fireball){
                this.fireball.setPosition(this.aganjuX,this.aganjuY);
                this.fireball.fire(this.input.activePointer.x, this.input.activePointer.y);
                this.lastFired = time + 50;
            }
        }
    }
 
}

export default GameScene;