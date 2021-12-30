class ProfileScene extends Phaser.Scene{
    constructor() {
        super('ProfileScene');
    }

    create(){
        let backBtn = this.add.text(150, 50, "Back to Menu");

        backBtn.setInteractive();
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }

}

async function getInfo(userID){

    let rqst = new Request("/backend/profile.php");
    
    let data = {
        "userID": userID,
    }
    
    fetch(rqst, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then( response => {
            if( response.status === 200 ){
                return response.json();
            }else{
                alert( "Usernot found" );
                return false;
            }
        })
        .then( data => {
            console.log(data);
        })
    }

export default ProfileScene;