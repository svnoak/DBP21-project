const UP = 0; // for random diection
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

let highestID=0;

function enemyMove(obj, type){ // type == sprite name
    obj.direction = randomDirection(obj.direction);
    setAnimation(obj, type);

    // functions used
    function randomDirection(exclude){ // exclude == current direction
        let newDirection = Phaser.Math.Between(0,3);
        if(exclude){
            while (newDirection == exclude){ 
                newDirection = Phaser.Math.Between(0,3);
            }
        }
        
        return newDirection; // returns directions that is not current
    }

    function setAnimation(animObj, spriteName){
        let dirName = ['up', 'down', 'left', 'right']; //index corresponds with directional consts
        // console.log('setting animation for '+ spriteName+ ': '+ animObj.id);
        animObj.anims.play(`${spriteName}-${dirName[animObj.direction]}`);
    };
};

export default class Hastur extends Phaser.Physics.Arcade.Sprite{  

    constructor(scene, x, y, texture){ 
        
        super(scene, x, y, texture);
        
        
        let hastur = this; // to make constructor easier to read 
        hastur.id = highestID++;
        hastur.setScale(2);

        enemyMove(hastur, 'hastur'); // makes objects move

        // Enemey change direction :
        // - on worldbounds collision
        // - on aganju collision
        // - randomly 

        scene.physics.world.on('worldbounds', () =>{
            enemyMove(hastur, 'hastur');
        });

        scene.physics.world.on('collide', (hero, enemy)=>{
            enemyMove(hastur, 'hastur');

        })

        hastur.randMoveEvent = scene.time.addEvent({
            delay: Phaser.Math.Between(4000,10000),
            callback: () => {
                enemyMove(hastur, 'hastur');
            },
            loop:true
        });
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


