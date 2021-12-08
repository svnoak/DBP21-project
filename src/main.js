//const för Spels konfiguration
const config = {
    width : 800,
    height : 600,
    renderer : Phaser.AUTO,
    parent:'game',
    state:{
        preload: preload, 
        create: create, 
        update: update
    }
}