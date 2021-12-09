//const för Spels konfiguration
const config = {
    width : 800,
    height : 600,
    renderer : Phaser.AUTO,
    parent:'game'
}

// Skapa Phaser.Game object men namnet "game"
let game = new Phaser.Game(config);

//Globala variabler
let aganju;

// Preload game assets 
// Här laddas alla assets innan spelet är igång
function preload() {
    //Laddar spelplanen
    game.load.image('background', 'assets/images/gameObjects/background.png');

    //Laddar Aganju och json filen som innehåller all frames för Aganju
    game.load.atlasJSONHash('aganju', 'assets/images/aganju/aganju.png', 'assets/images/aganju/aganjuHash.json');
}

// Create game world 
// Sätts igång när preload() är uppladdad
function create(){
    //Skapar spelets gränser
    game.world.setBounds(0, 0, 800, 600);

    //Skapar spelplanen
    game.add.image(0,0,'background');
    
    //Startar spelet
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Skapar Aganju
    aganju = game.add.sprite(350, 400,'aganju')

}

// Update gameplay 
// Uppdaterar spelet var 16 ms
// Körs kontunierlig efter create() är färdig
function update(){

}