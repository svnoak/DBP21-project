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
            if( form.style.display == "none" ){
                editBtn.text = "Save";
            }else{
                submitChanges(userID,this);
                editBtn.text = "Edit Profile";
		        renderInfo(userID, this);
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

    let rqst = new Request("backend/profile.php");
    let submit = {
        "userID": userID
    }

    fetch(rqst, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(submit),
    })
        .then( response => response.json() )
        .then( data => {
            console.log(data);
            let user = data["user"];
            that.add.text(150, 150, "Username:");
            that.usernameDisplay = that.add.text(250, 150, user["username"]);
            that.add.text(150, 200, "Email:");
            that.emailDisplay = that.add.text(250, 200, user["email"]);
            renderEditForm(user); 
    });
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

function submitChanges(userID,that){

    const form = document.getElementById("editForm");
    const formData = new FormData(form);

        const req = new Request("backend/updateUser.php", {
            method: "POST",
            body: formData,
        });

        fetch(req)
            .then(response => response.json())
            .then(data => console.log(data))
            .then( d => {
                let username = document.querySelector("#username").value
                let email = document.querySelector("#password").value

                that.usernameDisplay.text = username;
                that.emailDisplay.text = email;
    })
}

export default ProfileScene;
