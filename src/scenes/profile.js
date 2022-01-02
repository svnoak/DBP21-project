class ProfileScene extends Phaser.Scene{
    constructor() {
        super('ProfileScene');
    }

    async create(){

        let userID = sessionStorage["userID"];

        let editBtn = this.add.text(500, 550, "Edit profile");
        let backBtn = this.add.text(100, 550, "Back to Menu");

        await renderInfo(userID, this);

        editBtn.setInteractive();
        editBtn.on("pointerdown", () => {
            let form = document.querySelector("#editForm");
            if( form.style.display == "flex" ){
                editBtn.text = "Save";
                submitChanges(userID);
            }
            toggleForm();
            
        })

        backBtn.setInteractive();
        backBtn.on("pointerdown", () => {
            this.scene.start("MainMenuScene");
        });
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
            renderEditForm(user);
        })
    }

function renderEditForm(user){
    let form = document.createElement("form");
    form.id = "editForm";
    form.style.display = "none";
    form.method = "POST";

    let avatar = document.createElement("input");
    avatar.type = "file";
    avatar.name = "avatar";
    avatar.placeholder = user["avatar"];
    avatar.id = "avatar";

    let username = document.createElement("input");
    username.type = "text";
    username.name = "username";
    username.placeholder = user["username"];
    username.id = "username";
    username.value = user["username"];

    let email = document.createElement("input");
    email.type = "email";
    email.name = "email";
    email.placeholder = user["email"];
    email.id = "email";
    email.value = user["email"];

    let password = document.createElement("input");
    password.type = "password";
    password.name = "password";
    password.placeholder = "New password";
    password.id = "password";
    form.append(avatar, username, email, password);

    document.querySelector("#game").append(form);
}

function toggleForm(){
        let form = document.querySelector("#editForm");
        let formDisplay = form.style.display
        console.log(formDisplay);
        formDisplay == "none" ? form.style.display = "flex" : form.style.display = "none";
}

function submitChanges(userID){
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let avatar = document.querySelector("#avatar").value;

    let rqst = new Request("/backend/updateUser.php");
    let data = {
        "userID": userID,
        "username": username,
        "email": email,
        "password": password,
        "avatar": avatar
    }
    fetch( rqst, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(data)
    })
    .then( response => {
        if( response.status === 200 ){
            return response.json();
        }else{
            alert("Something went wrong, please try again.");
            return false;
        }
    })
    .then( data => {
        console.log(data);
    })
}

export default ProfileScene;
