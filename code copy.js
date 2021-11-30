const config = {
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    state: {
        preload: preload,
        create: create,
        update: update
    }
}


// create Phaser.Game object named "game"
var game = new Phaser.Game(config);
let player;
let arrowKey;
let spacebar;
let left, right, up, down;
let swordLeft, swordRight, swordUp, swordDown;



// declare global variables for game


// preload game assets - runs once at start
function preload() {
    game.load.atlasJSONHash('pc', 'assets/sprite/spritesheet.png', 'assets/sprite/sprites.json');
}

// create game world - runs once after "preload" finished
function create() {
    game.world.setBounds(0, 0, 800, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    arrowKey = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    player = game.add.sprite(100, 500, 'pc');
    player.maxHealth = 100;
    player.health = 100;
    down = player.animations.add('down', ['walk_down_1', 'walk_down_2', 'walk_down_3', 'walk_down_4'], 10, true);
    right = player.animations.add('right', ['walk_right_1', 'walk_right_2', 'walk_right_3', 'walk_right_4'], 10, true);
    up = player.animations.add('up', ['walk_up_1', 'walk_up_2', 'walk_up_3', 'walk_up_4'], 10, true);
    left = player.animations.add('left', ['walk_left_1', 'walk_left_2', 'walk_left_3', 'walk_left_4'], 10, true);
    swordDown = player.animations.add('sword-down', ['sword_down_1', 'sword_down_2', 'sword_down_3', 'sword_down_4'], 10, false);
    swordRight = player.animations.add('sword-right', ['sword_right_1', 'sword_right_2', 'sword_right_3', 'sword_right_4'], 10, false);
    swordUp = player.animations.add('sword-up', ['sword_up_1', 'sword_up_2', 'sword_up_3', 'sword_up_4'], 10, false);
    swordLeft = player.animations.add('sword-left', ['sword_left_1', 'sword_left_2', 'sword_left_3', 'sword_left_4'], 10, false);
    player.anchor.set(0.5, 0.5);
    
    swordDown.onComplete().frame = 'walk_down_1';


    game.physics.arcade.enable(player);
    player.body.mass = 2;
}

// update gameplay - runs in continuous loop after "create" finished
function update() {

    if ( spacebar.justDown ) {
        let direction = player.animations.name;
        if (direction.includes("-")) direction = direction.split("-")[1];
        player.animations.play(`sword-${direction}`);
    }

    // RIGHT KEY
    else if (arrowKey.right.isDown) {
        player.animations.play('right');
        player.body.velocity.x = 100;
    }

    else if (arrowKey.right.justUp) {
        player.animations.stop();
        player.animations.frame = 'walk_right_1';
        player.body.velocity.x = 0;
    }

    // LEFT KEY
    else if (arrowKey.left.isDown) {
        player.animations.play('left');
        player.body.velocity.x = -100;
    }
    else if (arrowKey.left.justUp) {
        player.animations.stop();
        player.animations.frame = 'walk_left_1';
        player.body.velocity.x = 0;
    }
    
    // UP KEY
    else if (arrowKey.up.isDown) {
        player.animations.play('up');
        player.body.velocity.y = -100;
    }
    else if (arrowKey.up.justUp) {
        player.animations.stop();
        player.animations.frame = 'walk_up_1';
        player.body.velocity.y = 0;
    }

    else if (arrowKey.down.isDown) {
        player.animations.play('down');
        player.body.velocity.y = 100;
    }
    else if (arrowKey.down.justUp) {
        player.animations.stop();
        player.animations.frame = 'walk_down_1';
        player.body.velocity.y = 0;
    }

    else if (arrowKey.down.justUp) {
        player.animations.stop();
        player.animations.frame = 0;
        player.body.velocity.y = 0;
    }

    /* else {
        player.animations.stop();
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    } */

}

