class LoginScene extends Phaser.Scene{
    constructor() {
        super('LoginScene');
    }

    preload(){
        this.load.image('bg', './assets/tilemap/backgroundPause.png');
        this.load.image('scroll-top', '/assets/images/scrolls_top.png');
        this.load.image('scroll-content', '/assets/images/scrolls_content.png');
        this.load.image('scroll-bottom', '/assets/images/scrolls_bottom.png');
    }

    create(){
        this.bg = this.add.image(0,0,'bg').setOrigin(0);
        this.scrltop = this.add.image(400,150,'scroll-top');
        this.scrltop.scale = 0.8;
        this.scrlcontent1 = this.add.image(400,220,'scroll-content');
        this.scrlcontent1.scale = 0.8;
        this.scrlcontent2 = this.add.image(400,320,'scroll-content');
        this.scrlcontent2.scale = 0.8;
        this.scrlbottom = this.add.image(400, 400,'scroll-bottom');
        this.scrlbottom.scale = 0.8;

        let signupBtn = this.add.text(500, 550, "Don't have an account?", { font: '25px arcade' });
        let backBtn = this.add.text(100, 550, "Back to Menu", { font: '25px arcade' });
        let loginBtn = this.add.text(350, 350, "Login", { font: '25px arcade', color: 'black' });

        createLoginForm();

        signupBtn.setInteractive({ cursor: 'pointer' });
        backBtn.setInteractive({ cursor: 'pointer' });
        loginBtn.setInteractive({ cursor: 'pointer' });

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
            
        })
    }

    update(){
        if( sessionStorage["userID"] ){
            document.querySelector("form").remove();
            this.scene.start("MainMenuScene");
        }
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

let rqst = new Request("backend/login.php");

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
            console.log(data);
            return true;
        }
    })
}

export default LoginScene;
