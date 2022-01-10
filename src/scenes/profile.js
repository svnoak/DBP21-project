class ProfileScene extends Phaser.Scene{
    constructor() {
        super('ProfileScene');
    }

    preload(){
        this.load.image('background', './assets/tilemap/backgroundPause.png');
        this.load.image('scroll-top', '/assets/images/scrolls_top.png');
        this.load.image('scroll-content', '/assets/images/scrolls_content.png');
        this.load.image('scroll-bottom', '/assets/images/scrolls_bottom.png');
    }

    async create(){
        this.bg = this.add.image(0,0,'background').setOrigin(0);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.scrltop = this.add.image(400,50,'scroll-top');
        this.scrltop.scale = 0.8;
        this.scrlcontent1 = this.add.image(400,120,'scroll-content');
        this.scrlcontent1.scale = 0.8;
        this.scrlcontent2 = this.add.image(400,220,'scroll-content');
        this.scrlcontent2.scale = 0.8;
        this.scrlcontent3 = this.add.image(400,320,'scroll-content');
        this.scrlcontent3.scale = 0.8;
        this.scrlcontent4 = this.add.image(400,420,'scroll-content');
        this.scrlcontent4.scale = 0.8;
        this.scrlbottom = this.add.image(400, 500,'scroll-bottom');
        this.scrlbottom.scale = 0.8;

        let userID = sessionStorage["userID"];

        let editBtn = this.add.text(600, 450, "Edit profile", {font: "20px arcade", color: 'black'});
        let backBtn = this.add.text(100, 450, "Back to Menu", {font: "20px arcade", color: 'black'});

        await renderInfo(userID, this);

        let cancelBtn = this.add.text(680, 450, "Cancel", {font: "20px arcade", color: 'black'});
        cancelBtn.setVisible(false);

        cancelBtn.setInteractive( { cursor: 'pointer' } );
        cancelBtn.on("pointerdown", () => {
            toggleForm();
            editBtn.text = "Edit Profile";
            cancelBtn.setVisible(false);
        });

        editBtn.setInteractive( {cursor:  'pointer' } );
        editBtn.on("pointerdown", async () => {
            let form = document.querySelector("#editForm");
            if( form.style.display == "none" ){
                editBtn.text = "Save";
                cancelBtn.setVisible(true);
            }else{
                await submitChanges(userID,this);
                editBtn.text = "Edit Profile";
                cancelBtn.setVisible(false);
		document.querySelector('img').remove();
		renderInfo(userID, this);
            }
            toggleForm();
        })

        backBtn.setInteractive( { cursor: 'pointer' } );
        backBtn.on("pointerdown", () => {
	    document.querySelector("img").remove();
	    document.querySelector('#editForm').remove();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start("MainMenuScene");
        })
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
            let user = data["user"];
	    document.getElementById("user-avatar") ? document.getElementById("user-avatar").remove() : null;
            that.add.text(150, 150, "Username:", {font: "20px arcade", color: "black"});
            that.usernameDisplay = that.add.text(250, 150, user["username"], {font: "20px arcade", color: 'black'});
            that.add.text(150, 200, "Email:", {font: "20px arcade", color: 'black'});
            that.emailDisplay = that.add.text(250, 200, user["email"], {font: "20px arcade", color: 'black'});
	    document.getElementById("editForm") ? null : renderEditForm(user);
            let avatar = document.createElement("img");
            avatar.id = "user-avatar";
            avatar.src = '/backend/databas/avatars/'+user["avatar"];
            avatar.className = "avatar";
            avatar.alt = "No avatar";
            document.querySelector('#game').append(avatar);

    });
}

function renderEditForm(user){

    let form = document.createElement("form");
    form.id = "editForm";
    form.method = "POST";
    form.style.display = "none";

    let avatar = document.createElement("input");
    avatar.type = "file";
    avatar.name = "avatar";
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
            .then( d => {
                let username = document.querySelector("#username").value;
                let email = document.querySelector("#email").value;

                that.usernameDisplay.text = username;
                that.emailDisplay.text = email;
    })
}

export default ProfileScene;
