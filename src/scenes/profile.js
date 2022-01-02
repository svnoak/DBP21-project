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

        let userID = sessionStorage["userID"];
        renderInfo(userID, this);
    }


    

}

async function renderInfo(userID, that){

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
            let user = data["user"];
            that.add.text(150, 150, "Username:");
            that.add.text(250, 150, user["username"]);
            that.add.text(150, 200, "Email:");
            that.add.text(250, 200, user["email"]);
        })
    }

export default ProfileScene;