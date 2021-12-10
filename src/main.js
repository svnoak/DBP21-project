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
let aganju, cursor;

// Preload game assets 
// Här laddas alla assets innan spelet är igång
function preload() {
    //Laddar spelplanen
    this.load.image('background', './assets/images/gameObjects/background.png');

    //Laddar Aganju och json filen som innehåller all frames för Aganju
    this.load.spritesheet('aganju', './assets/images/aganju/aganju.png', {frameWidth: 32, frameHeight: 32});
}

// Create game world 
// Sätts igång när preload() är uppladdad
function create(){

    //Skapar spelplanen
    this.add.image(0,0,'background').setOrigin(0);
    
    //Skapar Aganju
    aganju = this.physics.add.sprite(350, 400,'aganju');

    //Skalar upp Aganju
    aganju.setScale(2);
    
    //Begränsar Aganju inom spelets gränser
    aganju.setCollideWorldBounds(true);

    //Definierar variabeln cursor = down,left,up,right
    cursor = this.input.keyboard.createCursorKeys();

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
    
    //Ger vikt på Aganju
    aganju.body.mass = 2;
}

// Update gameplay 
// Uppdaterar spelet var 16 ms
// Körs kontunierlig efter create() är färdig
function update(){

    //Om vänster pillen trycks, 
    //left animation spelas
    if (cursor.left.isDown == true)
    {
        aganju.setVelocity(-100,0);
        aganju.anims.play('left', true);
    }

    //Om höger pillen trycks, 
    //right animation spelas
    else if (cursor.right.isDown)
    {
        aganju.setVelocity(100,0);
        aganju.anims.play('right', true);
    }

    //Om up pillen trycks, 
    //Up animation spelas
    else if(cursor.down.isDown)
    {
        aganju.setVelocity(0,100);
        aganju.anims.play('down', true);
    }

    //Om up pillen trycks, 
    //Up animation spelas
    else if(cursor.up.isDown)
    {
        aganju.setVelocity(0,-100);
        aganju.anims.play('up', true);
    }

    //Annars ingen rörelse
    //Ingen animation
    else{
        aganju.setVelocity(0,0);
        aganju.anims.stop();
    }

    //Om left och up pillarna trycks, 
    //Aganju går diagonalt till vänster hörn
    if(cursor.left.isDown && cursor.up.isDown){    
        aganju.setVelocityY(-100);
        aganju.setVelocityX(-100);
        aganju.anims.play('up', true);
    }

    //Om höger och up pillarna trycks, 
    //Aganju går diagonalt till höger hörn
    if(cursor.right.isDown && cursor.up.isDown){    
        aganju.setVelocityY(-100);
        aganju.setVelocityX(100);
        aganju.anims.play('up', true);
    }

    //Om höger och ner pillarna trycks, 
    //Aganju går diagonalt till höger hörn
    if(cursor.right.isDown && cursor.down.isDown){    
        aganju.setVelocityY(100);
        aganju.setVelocityX(100);
        aganju.anims.play('down', true);
    }

    //Om vänster och ner pillarna trycks, 
    //Aganju går diagonalt till höger hörn
    if(cursor.left.isDown && cursor.down.isDown){    
        aganju.setVelocityY(100);
        aganju.setVelocityX(-100);
        aganju.anims.play('down', true);
    }
  
}