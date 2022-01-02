class ProfileScene extends Phaser.Scene{
    constructor() {
        super('ProfileScene');
    }

    create(){
        let editBtn = this.add.text(500, 550, "Edit profile");
        let backBtn = this.add.text(100, 550, "Back to Menu");

        let userID = sessionStorage["userID"];
        let data = await getInfo(userID, this);
        renderInfo(data, this);

        editBtn.setInteractive();
        editBtn.on("pointerdown", () => {
            renderEditForm(data);
        })

        backBtn.setInteractive();
        backBtn.on("pointerdown", () => {
            this.scene.start("MainMenuScene");
        });
    }
}

async function getInfo(userID, that){

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
            return user;
        })
    }

function renderInfo(userData){
    that.add.text(150, 150, "Username:");
    that.add.text(250, 150, user["username"]);
    that.add.text(150, 200, "Email:");
    that.add.text(250, 200, user["email"]);
}

function renderEditForm(user){
    let form = document.createElement("form");
    form.method = "POST";

    let avatar = document.createElement("input");
    username.type = "file";
    username.name = "avatar";
    username.placeholder = user["avatar"];
    username.id = "avatar";

    let username = document.createElement("input");
    username.type = "text";
    username.name = "username";
    username.placeholder = user["username"];
    username.id = "username";

    let email = document.createElement("input");
    email.type = "email";
    email.name = "email";
    email.placeholder = user["email"];
    email.id = "email";

    let password = document.createElement("input");
    password.type = "password";
    password.name = "password";
    password.placeholder = "New password";
    password.id = "password";
    form.append(avatar, username, email, password);

    document.querySelector("#game").append(form);
}

export default ProfileScene;