//const för Spels konfiguration
const config = {
    width : 800,
    height : 600,
    renderer : Phaser.AUTO,
    parent:'game'
}

// Skapa Phaser.Game object men namnet "game"
let game = Phaser.game(config);

// Preload game assets 
// Här laddas alla assets innan spelet är igång
function preload() {

}

// Create game world 
// Sätts igång när preload() är uppladdad
function create(){

}

// Update gameplay 
// Uppdaterar spelet var 16 ms
// Körs kontunierlig efter create() är färdig
function update(){