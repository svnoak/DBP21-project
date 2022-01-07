class SignupScene extends Phaser.Scene{
    constructor() {
        super('SignupScene');
    }

    preload(){
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');
    }
    
    create(){
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);
        let login = this.add.text(500, 550, "Already have an account?", { font: '25px arcade' });
        let backBtn = this.add.text(100, 550, "Back to Menu", { font: '25px arcade' });
        let signupBtn = this.add.text(350, 250, "Signup", { font: '25px arcade' });

        login.setInteractive({ cursor: 'pointer' });
        backBtn.setInteractive({ cursor: 'pointer' });
        signupBtn.setInteractive({ cursor: 'pointer' });

        createSignupForm();

        login.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("LoginScene");
        });
        
        backBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("MainMenuScene");
        });

        signupBtn.on("pointerdown", async() => {
            let username = document.querySelector("#username").value;
            let email = document.querySelector("#email").value;
            let password = document.querySelector("#password").value;

            await signup(username, email, password);
            document.querySelector("form").remove();
            this.scene.start("MainMenuScene");
        })

    }   
}

function createSignupForm(){
    let form = document.createElement("form");
    form.id = "signupForm";
    form.method = "POST";

    let username = document.createElement("input");
    username.id = "username";
    username.name = "username";
    username.type = "text";
    username.placeholder = "Username";

    let email = document.createElement("input");
    email.id = "email";
    email.name = "email";
    email.type = "email";
    email.placeholder = "Email";

    let password = document.createElement("input");
    password.id = "password";
    password.name = "password";
    password.type = "password";
    password.placeholder = "Password";

    form.append(username, email, password);

    document.querySelector("#game").append(form);
}

async function signup(username, email, password){
    
    let data = {
        "username" : username,
        "email" : email,
        "password" : password
    }
    
    let rqst = new Request("backend/createUser.php");
    let options = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        method : "POST",
        body : JSON.stringify(data)
    };

    fetch(rqst, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
}

export default SignupScene;
