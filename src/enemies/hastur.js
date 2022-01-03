const UP = 0; // for random diection
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

let highestID=0;

function enemyMove(obj, type){ // type == sprite name
    obj.direction = randomDirection(obj.direction);
    setAnimation(obj, type);

    function randomDirection(exclude){
        let newDirection = Phaser.Math.Between(0,3);
        while(newDirection == exclude){
            newDirection = Phaser.Math.Between(0,3);
        }
        return newDirection;
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
        
        let hastur = this; // only for ease of read 

        hastur.id = highestID++;
        hastur.wallCollTime = 0;
        hastur.setScale(2);

        enemyMove(hastur, 'hastur'); // makes objects move

        // Enemey change direction :
        // - on worldbounds collision
        // - on aganju collision
        // - randomly 
        // | | | | | | |
        // v v v v v v v

        this.interval = setInterval( () =>{
            enemyMove(hastur,'hastur');
        },Phaser.Math.Between(hastur.wallCollTime + 3000, hastur.wallCollTime + 16000) )
        
        scene.physics.world.on('worldbounds', (obj) =>{
            //only the hastur that collided will change direction
            if(hastur.id == obj.gameObject.id){ 
                enemyMove(hastur, 'hastur');
                hastur.wallCollTime = scene.time.now; // saves time for randMoveEvent
            }
        });

        scene.physics.world.on('collide', (objOne, objTwo)=>{
            // console.log(objOne.name + ' ' + objTwo.name);

            // if aganju collides with hastur
            if( objOne.name == 'aganju' ){
                let thisAganju = objOne;
                let thisHastur = objTwo;
    
                //Gives tint (red)
                //Red eyes shows that Aganju takes damage
                thisAganju.setTint(0xff00ff);

                setTimeout(() => {
                    //Clear tint
                    thisAganju.clearTint();
                }, 1000);

                // only colliding hastur changes direction
                if(hastur.id == thisHastur.id){
                    enemyMove(hastur, 'hastur');
                }
    
                // makes aganju take damage              |          | 
                //                                       v cooldown v
                if( !thisAganju.timeTakenDmgLast || scene.time.now >= thisAganju.timeTakenDmgLast + 1000){
                    thisAganju.health = thisAganju.health - thisHastur.damage;
                    thisAganju.timeTakenDmgLast = scene.time.now;
                }
            }

            if( objOne.name == 'sword' ){
           
                let thisSword = objOne;
                let thisHastur = objTwo;

                if( thisHastur.id ==  hastur.id){
                    hastur.health -= thisSword.damage;
                    thisHastur.damage = 0;

                    enemyMove(hastur, 'hastur');

                    setTimeout(() => {
                        thisHastur.damage = 25;
                    }, 2000);

                    //Sätter tint (red)
                    hastur.setTint(0xff00ff);

                    setTimeout(() => {
                        //Clear tint
                        hastur.clearTint();
                    }, 1000);
    
                    //Disables propogation
                    scene.spacebar.isDown = false;

                    if(hastur.health <= 0){
                        scene.startData.score = scene.startData.score + 50;
                        scene.startData.totalCoins = scene.startData.totalCoins + 150;
                     
                        hastur.destroy();
                    }
                }
                
            }

            if( objTwo.name == 'fireball' ){
                let thisFireball = objTwo;
                let thisHastur = objOne;
                
                if( thisHastur.id ==  hastur.id){

                    //Sätter tint (red)
                    hastur.setTint(0xff00ff);

                    setTimeout(() => {
                        //Clear tint
                        hastur.clearTint();
                    }, 1000);

                    hastur.health -= 10;
                    thisFireball.destroy();

                    if(hastur.health <= 0){
                        scene.startData.score = scene.startData.score + 25;
                        scene.startData.totalCoins = scene.startData.totalCoins + 100;
                        
                        hastur.destroy();
                    }
                }
            }

            if( objOne.name == 'lightning' ){
           
                let thisLightning = objOne;
                let thisHastur = objTwo;
     
                thisLightning.setBodySize(90,90, true);

                if( thisHastur.id ==  hastur.id){
                    hastur.health -= thisLightning.damage;

                    //Sätter tint (red)
                    hastur.setTint(0xff00ff);

                    setTimeout(() => {
                        //Clear tint
                        hastur.clearTint();
                    }, 1000);

                    thisLightning.x = -150;
                    thisLightning.y = -150;

                    if(hastur.health <= 0){
                        scene.startData.score = scene.startData.score + 10;
                        scene.startData.totalCoins = scene.startData.totalCoins + 50;
                     
                        setTimeout(() => {
                            hastur.destroy();
                        }, 700);
                    }
                }
                
            }

           

        })

        // CODE FROM TUTORIAL
        // hastur.randMoveEvent = scene.time.addEvent({
        //     // wallCollTime prevents hastur from randomly 
        //     // changing direction immediately after bumping wall
        //     delay: Phaser.Math.Between(wallCollTime + 4000, wallCollTime + 8000),
        //     callback: () => {
        //         enemyMove(hastur, 'hastur');
        //         console.log('random turn');
        //         // console.log( 'random direction change of hastur:' + hastur.id );
        //     },
        //     loop:true
        // });
    }

    destroy(){
        console.log('hastur '+ this.id +' died');
        clearInterval(this.interval);
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


