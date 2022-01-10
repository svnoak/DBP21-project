import MainMenuScene from "./mainMenu.js";

class LoadingScene extends Phaser.Scene{
    constructor() {
        super('LoadingScene');
    }

    preload(){
        this.load.image('bg', './assets/tilemap/backgroundPause.png');
    }

    async create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.bg = this.add.image(0,0,'bg').setOrigin(0);
        this.add.text(50, 50, "Aganjus Wrath", {font:"100px arcade"});
        let val = new Request("backend/validate.php");
    fetch(val, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
        //body: JSON.stringify(data)
    })
    .then( response => {
        if( response.status === 200 ){
            setTimeout( () => {
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start("MainMenuScene");
                })
        }, 2000 )
        }else {
            this.add.text(50, 200, "Something went wrong, please try again later", {font:"100px arcade", color: 'red'});
        }
    } )
}

}

export default LoadingScene;