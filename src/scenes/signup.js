class SignupScene extends Phaser.Scene{
    constructor() {
        super('SignupScene');
    }

    create(){
        let loginBtn = this.add.text(350, 250, "Login");
        let backBtn = this.add.text(350, 350, "Back to Menu");

        loginBtn.setInteractive();
        backBtn.setInteractive();

        loginBtn.on("pointerdown", () =>{
            this.scene.start("LoginScene");
        });
        
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
    }
}

export default SignupScene;