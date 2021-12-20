class SignupScene extends Phaser.Scene{
    constructor() {
        super('SignupScene');
    }

    create(){
        let signupBtn = this.add.text(500, 550, "Already have an account?");
        let backBtn = this.add.text(100, 550, "Back to Menu");

        signupBtn.setInteractive();
        backBtn.setInteractive();

        createSignupForm();

        signupBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("LoginScene");
        });
        
        backBtn.on("pointerdown", () =>{
            document.querySelector("form").remove();
            this.scene.start("MainMenuScene");
        });
    }   
}

function createSignupForm(){
    let form = document.createElement("form");
    let username = document.createElement("input");
    username.type = "text";
    username.placeholder = "Username";

    let email = document.createElement("input");
    email.type = "email";
    email.placeholder = "Email";

    let password = document.createElement("input");
    password.type = "password";
    password.placeholder = "Password";

    let button = document.createElement("button");
    button.type = "button";
    button.innerText = "Create account";
    button.addEventListener("click", () => {
        signup(username.value, email.value, password.value);
    });

    form.append(username, email, password, button);

    document.querySelector("#game").append(form);
}

function signup(username, email, password){
    console.log(username);
    console.log(email);
    console.log(password);
}

export default SignupScene;