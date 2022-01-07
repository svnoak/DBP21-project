class LeaderboardScene extends Phaser.Scene{
    constructor() {
        super('LeaderboardScene');
    }

    create(){
        let backBtn = this.add.text(100, 550, "Back to Menu");

        backBtn.setInteractive();
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
	    this.add.text(150, 100, "NAME");
	    this.add.text(350, 100, "HIGHSCORE");
	    renderLeaderboard(this);
    }
}

    async function renderLeaderboard(that){

    let rqst = new Request("http://localhost:7000/leaderboard.php");

    fetch(rqst, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
        .then( response => {
            if( response.status === 200 ){
                return response.json();
            }
        })
        .then( data => {
		let leaders = data.data;
		let x = 0;
		for ( let i = 0; i < leaders.length; i++) {
			that.add.text(150, 150+x, leaders[i].name);
			that.add.text(350, 150+x, leaders[i].highscore);
			x = x+50;
		}
        })
    }

export default LeaderboardScene;
