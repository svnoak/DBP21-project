import LoadingScene from "./scenes/loading.js";
import MainMenuScene from "./scenes/mainMenu.js";
import ProfileScene from "./scenes/profile.js";
import SigninScene from "./scenes/login.js";
import SignupScene from "./scenes/signup.js";
import LeaderboardScene from "./scenes/leaderboard.js";
import GameScene from "./scenes/game.js";
import PauseScene from "./scenes/pause.js";
import GameoverScene from "./scenes/gameover.js";
import VictoryScene from "./scenes/victory.js";
import HowToScene from "./scenes/howTo.js";
import AboutScene from "./scenes/about.js";


//const för Spels konfiguration
const config = {
    width : 800,
    height : 600,
    renderer : Phaser.AUTO,
    parent:'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene:[
        GameScene,
        LoadingScene,
        MainMenuScene,
        ProfileScene,
        SigninScene,
        SignupScene,
        LeaderboardScene,
  
        PauseScene,
        GameoverScene,
        VictoryScene,
        AboutScene,
        HowToScene
    ],
};

let game = new Phaser.Game(config);
