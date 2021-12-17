const UP = 0; // for random diection
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

let highestID=0;

export default class Hastur extends Phaser.Physics.Arcade.Sprite{  
    direction = RIGHT; // original walking direction
    randMoveEvent;  

    constructor(scene, x, y, texture){ 
        super(scene, x, y, texture);

        let hastur = this;
        hastur.id = highestID++;

        hastur.anims.play('hastur-left');
        hastur.setScale(2);

        scene.physics.world.on('worldbounds', () =>{
            this.direction = this.randomDirection(this.direction);
            this.setAnimation();
        });

        this.randMoveEvent = scene.time.addEvent({
            delay: Phaser.Math.Between(1000,5000),
            callback: () => {
                this.direction = this.randomDirection(this.direction);
                // console.log('random new direction for hastur: ' + hastur.id);
                this.setAnimation();
            },
            loop:true
        });
    }

    randomDirection = exclude =>{ // exclude == current direction
        let newDirection = Phaser.Math.Between(0,3);
        while (newDirection == exclude){ 
            newDirection = Phaser.Math.Between(0,3);
        }
        return newDirection; // returns directions that is not current
    }

    setAnimation = () =>{
        let dirName = ['up', 'down', 'left', 'right'];
        console.log('setting animation for hastur: '+ this.id);
        this.anims.play(`hastur-${dirName[this.direction]}`);
    }

    destroy(){
        console.log('hastur '+ this.id +' died');
        // this.randMoveEvent.destroy();
        super.destroy(this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        const speed = 100;

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


