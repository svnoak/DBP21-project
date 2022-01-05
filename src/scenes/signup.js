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

        signupBtn.on("pointerdown", async() => {
            let username = document.querySelector("#username").value;
            let email = document.querySelector("#email").value;
            let password = document.querySelector("#password").value;

            await signup(username, email, password);
            /* if(sessionStorage["userID"]) {
                document.querySelector("form").remove();
                this.scene.start("MainMenuScene");
            } */
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

    let button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Signup";


    form.append(username, email, password, button);

    document.querySelector("#game").append(form);
}

async function signup(username, email, password){
    /* let rqst = new Request("/backend/createuser.php");

    let data = {
        "username" : username,
        "email" : email,
        "password" : password
    }

    let options = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        method : "POST",
        body : JSON.stringify(data)
    }

    fetch(rqst, options)
    .then(response => {
        if(response.status === 200) {
            return response.json();
        } else {
            alert("Something went wrong, try again!");
            return false;
        }
    })
    .then(data => {
        if(data != undefined) {
            
            return true;
        }
    }) */
    let signupForm = document.getElementById("signupForm");
    let rqst = new Request("/backend/createuser.php");
    let options = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        method : "POST",
        body : JSON.stringify(data)
    };

    signupForm.addEventListener("submit", function() {
        e.preventDefault();
        let formData = new FormData(this);
        fetch(rqst, options)
            .then(function(response) {
                return response.json();
            }).then(function(text) {
                console.log(text);
            }).catch(function(error) {
                console.error(error);
            })
    });
}

//-------------------------------------------------------------------------



export default SignupScene;