class LeaderboardScene extends Phaser.Scene{
    constructor() {
        super('LeaderboardScene');
    }

    create(){
        let backBtn = this.add.text(100, 550, "Back to Menu", { font: '25px arcade' });

        backBtn.setInteractive({ cursor: 'pointer' });
        backBtn.on("pointerdown", () =>{
            this.scene.start("MainMenuScene");
        });
	    this.add.text(150, 100, "NAME", { font: '40px arcade' });
	    this.add.text(350, 100, "HIGHSCORE", { font: '40px arcade' });
	    renderLeaderboard(this);
    }
}

    async function renderLeaderboard(that){

    let rqst = new Request("/backend/leaderboard.php");

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
