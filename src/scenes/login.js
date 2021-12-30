class LoginScene extends Phaser.Scene{
    constructor() {
        super('LoginScene');
    }

    create(){
        let signupBtn = this.add.text(500, 550, "Don't have an account?");
        let backBtn = this.add.text(100, 550, "Back to Menu");
        let loginBtn = this.add.text(250, 350, "Login");

        createLoginForm();

        signupBtn.setInteractive();
        backBtn.setInteractive();
        loginBtn.setInteractive();

        signupBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("SignupScene");
        });
        
        backBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("MainMenuScene");
        });

        loginBtn.on("pointerdown", async () =>{
            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;

            await login(username, password);
            if( sessionStorage["userID"] ){
                document.querySelector("form").remove();
                this.scene.start("MainMenuScene");
            }
        })
    }
}

function createLoginForm(){
    let form = document.createElement("form");
    form.method = "POST";

    let username = document.createElement("input");
    username.type = "text";
    username.name = "username";
    username.placeholder = "Username";
    username.id = "username";
    username.required;

    let password = document.createElement("input");
    password.type = "password";
    password.name = "password";
    password.placeholder = "Password";
    password.id = "password";
    password.required;

    form.append(username, password);

    document.querySelector("#game").append(form);
}

async function login(username, password){

let rqst = new Request("/backend/login.php");

let data = {
    "username": username,
    "password": password
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
            alert( "Wrong username or password." );
            return false;
        }
    })
    .then( data => {
        if( data["userID"] != undefined ){
            sessionStorage.setItem("userID", data["userID"]);
            return true;
        }
    })
}

export default LoginScene;