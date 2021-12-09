//const för Spels konfiguration
const config = {
    width : 800,
    height : 600,
    renderer : Phaser.AUTO,
    parent:'game',
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};

// Skapa Phaser.Game object men namnet "game"
let game = new Phaser.Game(config);

//Globala variabler
let aganju;

// Preload game assets 
// Här laddas alla assets innan spelet är igång
function preload() {
    //Laddar spelplanen
    game.load.image('background', './assets/images/gameObjects/background.png');

    //Laddar Aganju och json filen som innehåller all frames för Aganju
    game.load.atlasJSONHash('aganju', './assets/images/aganju/aganju.png', 'assets/images/aganju/aganjuHash.json');
}

// Create game world 
// Sätts igång när preload() är uppladdad
function create(){
    //Startar spelet
    game.physics.startSystem(Phaser.Physics.ARCADE);


    //Skapar spelplanen
    game.add.image(0,0,'background').setOrigin(0);

    //Skapar spelets gränser
    game.world.setBounds(0, 0, 800, 600);
    
    
    //Skapar Aganju
    aganju = game.add.sprite(350, 400,'aganju');

    //Skapar animationer för Aganju
    aganju.animations.add('down', [0,1,2,0], 10, true);
    aganju.animations.add('left', [4,5,6,4], 10, true);
    aganju.animations.add('right', [7,8,9,7], 10, true);
    aganju.animations.add('up', [10,11,12,10], 10, true);

    //
    game.physics.arcade.enable(aganju);
    
    //Ger vikt på Aganju
    aganju.body.mass = 2;

}

// Update gameplay 
// Uppdaterar spelet var 16 ms
// Körs kontunierlig efter create() är färdig
function update(){

}