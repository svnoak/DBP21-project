//const för Spels konfiguration
const config = {
    width : 800,
    height : 600,
    renderer : Phaser.AUTO,
    parent:'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};

// Skapa Phaser.Game object men namnet "game"
let game = new Phaser.Game(config);

//Globala variabler
let aganju, cursor, spacebar, sword, fireball,fireballs, speed, keyW, keyA, keyS, keyD;

//Variabler för eldbollar
let lastFired = 0;
let isDown = false;
let mouseX = 0;
let mouseY = 0;

let notHitted;

// Preload game assets 
// Här laddas alla assets innan spelet är igång
function preload() {
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
function create(){

    //Skapar spelplanen
    this.add.image(0,0,'background').setOrigin(0);
    
    // //Definierar variabeln cursor = down,left,up,right
    // cursor = this.input.keyboard.createCursorKeys();

    //Definierar variabeln spacebar
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Definierar variabeln keyS = "W"
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //Definierar variabeln keyS = "A"
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    //Definierar variabeln keyS = "S"
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    //Definierar variabeln keyS = "D"
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //Skapar Hastur
    hastur = this.physics.add.sprite(200, 200,'hastur');
    //Skalar upp Hastur
    hastur.setScale(2);
    //Ger vikt på Hastur
    hastur.body.mass = 2;
    //Begränsar Hastur inom spelets gränser
    hastur.setCollideWorldBounds(true);
    //Gör Hastur orörlig
    hastur.body.setImmovable(true);
    //Hasturs health
    hastur.health = 100;

    //Skapar Aganju
    aganju = this.physics.add.sprite(350, 400,'aganju');

    //Skalar upp Aganju
    aganju.setScale(2);

    //Ger vikt på Aganju
    aganju.body.mass = 2;
    
    //Begränsar Aganju inom spelets gränser
    aganju.setCollideWorldBounds(true);

    //Kollision mellan Aganju och Hastur
    this.physics.add.collider(aganju, hastur);

    //Skapar svärden
    sword = this.physics.add.sprite(aganju.x, aganju.y,'sword');

    //Skapar eldbollar
    let fireball = new Phaser.Class({

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
    fireballs = this.add.group({
        classType: fireball,
        maxSize: 10,
        runChildUpdate: true
    });

    //När muspekaren är på
    this.input.on('pointerdown', function (pointer) {

        isDown = true;
        mouseX = pointer.x;
        mouseY = pointer.y;

    });

    //När muspekaren rör sig
    this.input.on('pointermove', function (pointer) {

        mouseX = pointer.x;
        mouseY = pointer.y;

    });

    //När muspekaren släpps
    this.input.on('pointerup', function (pointer) {

        isDown = false;

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
notHitted == true;
// Update gameplay 
// Uppdaterar spelet var 16 ms
// Körs kontunierlig efter create() är färdig
function update(time, delta){

    //Aganju's x positon
    let aganjuX = aganju.x;
    //Aganju's y positon
    let aganjuY = aganju.y;

 
    // Gömmer svärden
    sword.setVisible(false);

    //När Aganju slår hasturen med sin svärd, anropas funktionen hitWithSword, 
    this.physics.add.overlap(hastur, sword, hitEnemy, null, this);  

    // När Aganju slår hasturen med sin svärd, anropas funktionen hitWithSword, 
    this.physics.add.overlap(hastur, fireballs, burnEnemy, null, this);

    function hitEnemy(){
        hastur.health = hastur.health - 1;

        if(hastur.health == 0){
            hastur.destroy();
        }
    }
    
    function burnEnemy(){
        hastur.health = hastur.health - 10;

        if(hastur.health == 0){
            hastur.destroy();
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
    if (keyA.isDown)
    {
        //Ger Aganju velocity (rörelse) till vänster
        aganju.setVelocity(-100,0);
        //Spelar left animationen av Aganju
        aganju.anims.play('left', true);

        // Ger z-index till eldbollar
        fireballs.setDepth(1);

        //När spacebar trycks
        if(spacebar.isDown){
            //Stoppar Aganju
            aganju.setVelocity(0);
            //Slutar animationen av Aganju
            aganju.anims.stop();
            //Ger z-index 0 till Aganju
            aganju.setDepth(0);

            //Gör svärden visible
            sword.setVisible(true);
            //Uppdaterar svärdens position
            sword.setPosition(aganjuX,aganjuY-10);
            //Ger z-index till svärden
            sword.setDepth(1);
            //Scalar ner svärden
            sword.setScale(0.50);
            //Spelar left animationen av svärd
            sword.anims.play('sword_left', true);
        }

    }

    //Om höger pillen trycks, 
    //right animation spelas
    else if (keyD.isDown)
    {
        aganju.setVelocity(100,0);
        aganju.anims.play('right', true);

        //Ger z-index till eldbollar
        fireballs.setDepth(1);

        if(spacebar.isDown){
            aganju.setVelocity(0);
            aganju.anims.stop();
            aganju.setDepth(1);

            sword.setVisible(true);
            sword.setPosition(aganjuX,aganjuY-10);
            sword.setDepth(0);
            sword.setScale(0.50);
            sword.anims.play('sword_right', true);
        }
    }

    //Om up pillen trycks, 
    //Up animation spelas
    else if(keyS.isDown)
    {
        aganju.setVelocity(0,100);
        aganju.anims.play('down', true);

        //Ger z-index till eldbollar
        fireballs.setDepth(1);

        if(spacebar.isDown){
            aganju.setVelocity(0);
            aganju.anims.stop();
            aganju.setDepth(0);

            sword.setVisible(true);
            sword.setPosition(aganjuX+23,aganjuY-10);
            sword.setDepth(1);

            sword.setScale(0.50);
            sword.anims.play('sword_down', true);
        }
    }

    //Om up pillen trycks, 
    //Up animation spelas
    else if(keyW.isDown)
    {
        aganju.setVelocity(0,-100);
        aganju.anims.play('up', true);

        //Ger z-index till eldbollar
        fireballs.setDepth(0);

        //När spacebar trycks
        if(spacebar.isDown){
            aganju.setVelocity(0);
            aganju.anims.stop();
            aganju.setDepth(1);

            sword.setVisible(true);
            sword.setPosition(aganjuX-20,aganjuY-40);
            sword.setDepth(0);

            sword.setScale(0.50);
            sword.anims.play('sword_up', true);
        }
    }

    //Annars ingen rörelse
    //Ingen animation
    else{
        aganju.setVelocity(0,0);
        aganju.anims.stop();
    }

    //Om left och up pillarna trycks, 
    //Aganju går diagonalt till vänster hörn
    if(keyA.isDown && keyW.isDown){    
        aganju.setVelocityY(-100);
        aganju.setVelocityX(-100);
        aganju.anims.play('up', true);
        aganju.setDepth(1);

        if(spacebar.isDown){
            aganju.setVelocity(0);
            sword.setDepth(0);
        }
    }

    //Om höger och up pillarna trycks, 
    //Aganju går diagonalt till höger hörn
    if(keyD.isDown && keyW.isDown){    
        aganju.setVelocityY(-100);
        aganju.setVelocityX(100);
        aganju.anims.play('up', true);

        if(spacebar.isDown){
            aganju.setVelocity(0);
        }
    }

    //Om höger och ner pillarna trycks, 
    //Aganju går diagonalt till höger hörn
    if(keyD.isDown && keyS.isDown){    
        aganju.setVelocityY(100);
        aganju.setVelocityX(100);
        aganju.anims.play('down', true);
        aganju.setDepth(0);

        if(spacebar.isDown){
            aganju.setVelocity(0);

            sword.setDepth(1);
            sword.setPosition(aganjuX+20,aganjuY-10);
        }
  
    }

    //Om vänster och ner pillarna trycks, 
    //Aganju går diagonalt till höger hörn
    if(keyA.isDown && keyS.isDown){    
        aganju.setVelocityY(100);
        aganju.setVelocityX(-100);
        aganju.anims.play('down', true);

        if(spacebar.isDown){
            aganju.setVelocity(0);
            sword.setPosition(aganjuX+17,aganjuY-5)
        }
    }
  
    if (isDown && time > lastFired){
        let fireball = fireballs.get();
    
        if (fireball){
            fireball.fire(mouseX, mouseY);
            lastFired = time + 50;
        }
    }

}