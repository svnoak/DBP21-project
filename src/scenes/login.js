class LoginScene extends Phaser.Scene{
    constructor() {
        super('LoginScene');
    }

    create(){
        let loginBtn = this.add.text(500, 550, "Don't have an account?");
        let backBtn = this.add.text(100, 550, "Back to Menu");

        createLoginForm();

        loginBtn.setInteractive();
        backBtn.setInteractive();

        loginBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("SignupScene");
        });
        
        backBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("MainMenuScene");
        });
    }
}

function createLoginForm(){
    let form = document.createElement("form");
    let username = document.createElement("input");
    username.type = "text";
    username.placeholder = "Username";
    username.required;

    let password = document.createElement("input");
    password.type = "password";
    password.placeholder = "Password";
    password.required;

    let button = document.createElement("button");
    button.type = "button";
    button.innerText = "Login";
    button.addEventListener("click", () => {
        login(username.value, password.value);
    });

    form.append(username, password, button);

    document.querySelector("#game").append(form);
}

function login(username, password){
    console.log(username);
    console.log(password);
}

export default LoginScene;