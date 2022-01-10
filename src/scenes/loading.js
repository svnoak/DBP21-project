import MainMenuScene from "./mainMenu.js";

class LoadingScene extends Phaser.Scene{
    constructor() {
        super('LoadingScene');
    }

    async create(){

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
            this.add.text(20, 20, "Aganjus Wrath");
            this.scene.start("MainMenuScene");
        }else {
            alert("Something went wrong, please try again later.");
        }
    } )
}

}

export default LoadingScene;