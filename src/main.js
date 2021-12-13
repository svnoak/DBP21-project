import LoadingScene from "./scenes/loading.js";
import MainMenuScene from "./scenes/mainMenu.js";
import ProfileScene from "./scenes/profile.js";
import SigninScene from "./scenes/signIn.js";
import SignupScene from "./scenes/signUp.js";
import LeaderboardScene from "./scenes/pause.js";
import GameScene from "./scenes/game.js";
import PauseScene from "./scenes/pause.js";
import GameoverScene from "./scenes/gameover.js";
import VictoryScene from "./scenes/victory.js";


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
        Loading,
        MainMenu,
        Profile,
        Signin,
        Signup,
        Leaderboard,
        Game,
        Pause,
        Gameover,
        Victory

    ]
};

let game = new Phaser.Game(config);