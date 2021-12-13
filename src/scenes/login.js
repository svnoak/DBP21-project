class LoginScene extends Phaser.Scene{
    constructor() {
        super('LoginScene');
    }

    create(){
        let signUpBtn = this.add.text(350, 250, "Sign Up");
        let backBtn = this.add.text(350, 350, "Back to Menu");

        signUpBtn.setInteractive();
        backBtn.setInteractive();

        signUpBtn.on("pointerdown", () =>{
            this.scene.start("SignupScene");
        });
        
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }
}

export default LoginScene;