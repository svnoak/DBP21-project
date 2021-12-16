const UP = 0; // for random diection
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

export default class Hastur extends Phaser.Physics.Arcade.Sprite{  
    direction = RIGHT;

    constructor(scene, x, y, texture){ 
        super(scene, x, y, texture);

        let hastur = this;

        hastur.anims.play('hastur-left');
        hastur.setScale(2);
        

        // hasturs.body.setMass(2);
        // hasturs.setCollideWorldBounds(true);
        // //Ger vikt på Hastur
        // hasturs.body.mass = 2;
        // //Begränsar Hastur inom spethiss gränser
        // hasturs.setCollideWorldBounds(true);
        // //Gör Hastur orörlig
        // this.body.setImmovable(true);
        // //Hasturs health
        // this.health = 100;

        // this.body.onCollide = true;

        scene.physics.world.on(Phaser.Physics.Arcade.Events.Tile_COLLIDE, this.handleTileCollision, this);

        console.log(this);

    }

    handleTileCollision(gameObj, tile) {
        // construtor()
        if( gameObj !== this){
            return //do nothing if not us colliding
        }
        // else
        const newDirection = Phaser.Math.Between(0,3);
        this.direction = newDirection;

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        const speed = 50;

        switch(this.direction){
            case UP:
                this.body.setVelocity(0, -speed)
               break 
            case DOWN:
                this.body.setVelocity(0, speed)
               break 
            case LEFT:
                this.body.setVelocity(-speed, 0)
               break 
            case RIGHT:
                this.body.setVelocity(speed, 0)
               break 

        }

    }

}


