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

        this.wallCollide = setInterval( () =>{
            enemyMove(hastur,'hastur');
        },Phaser.Math.Between(hastur.wallCollTime + 3000, hastur.wallCollTime + 16000) )


        this.shoot = setInterval( () =>{

            // amount of hasturs on playground
            let amount = scene.hasturs.children.entries.length;

            let frequency = amount <= 4 ? 1 : 2;
            
            let range = amount <= 5 ? 50 : 150;

            // is hastur within range?
            let withinX = hastur.x < scene.aganju.x + range 
            && hastur.x > scene.aganju.x - range 
            ? true : false; 
    
            let withinY = hastur.y < scene.aganju.y + range
            ? true : false; 
            
            if(withinY && withinY){
                // do not shoot
            } else {

                let shootProjectile = Phaser.Math.Between(0, frequency);
                if(shootProjectile == 0){
                    var projectileOne = scene.hasturProjectiles.get();
                    // var projectileTwo = scene.hasturProjectiles.get();

                    if(projectileOne){
                        let projOneX = scene.aganju.x;
                        let projTwoX = scene.aganju.x;
                        let projOneY = scene.aganju.y;
                        let projTwoY = scene.aganju.y;

                        let inc = 50;
                        let dubInc= inc * 2;

                        // // if hastur is north-west of aganju
                        // if(hastur.x <= scene.aganju.x && hastur.y < scene.aganju.y){
                        //     projOneX += dubInc;
                        //     projOneY -= inc;
                        //     projTwoX -= dubInc;
                        //     projTwoY += inc;
                        // }

                        // // if hastur is north-east of aganju
                        // if(hastur.x >= scene.aganju.x && hastur.y < scene.aganju.y){
                        //     projOneX += dubInc;
                        //     projOneY -= inc;
                        //     projTwoX -= dubInc;
                        //     projTwoY -= inc;
                        // }

                        // //if hastur is south-east of aganju
                        // if(hastur.x > scene.aganju.x && hastur.y >= scene.aganju.y){
                        //     projOneX -= dubInc;
                        //     projOneY += inc;
                        //     projTwoX -= dubInc;
                        //     projTwoY -= inc;
                        // }
                        
                        // // if hastur is south-west of aganju
                        // if(hastur.x < scene.aganju.x && hastur.y >= scene.aganju.y){
                        //     projOneX += dubInc;
                        //     projOneY += inc;
                        //     projTwoX += dubInc;
                        //     projTwoY -= inc;
                        // }


                        // projectile one
                        projectileOne.fire(hastur.x, hastur.y, projOneX, projOneY);
                        // console.log('shot one')
                        // projectile two
                        // projectileTwo.fire(hastur.x, hastur.y, projTwoX, projTwoY);


                    }
                } 
            }

        }, 700);

        
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
                if(thisAganju.health <= 0){
                    thisAganju.health = 100;
                    scene.startData.lives -= 1;
                }
    
                // makes aganju take damage              |          | 
                //                                       v cooldown v
                if( !thisAganju.timeTakenDmgLast || scene.time.now >= thisAganju.timeTakenDmgLast + 1000){
                    thisAganju.health = thisAganju.health - thisHastur.damage;
                    thisAganju.timeTakenDmgLast = scene.time.now;
                }
            }

            function killHastur(){
                hastur.destroy();
                scene.shouldSpawnMore = true;
                scene.killedAmount++;
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

                    if(hastur.health <= 30){
                        //Sätter tint (black)
                        hastur.setTint(0x8E8E8E);
                    }else{
                          //Sätter tint (black)
                        hastur.setTint(0x8E8E8E);

                        setTimeout(() => {
                            //Clear tint
                            hastur.clearTint();
                        }, 1000);
                    }
                  
                    //Disables propogation
                    scene.spacebar.isDown = false;

                    if(hastur.health <= 0){
                        scene.startData.score = scene.startData.score + 50;
                        scene.startData.totalCoins = scene.startData.totalCoins + 150;
                     
                        killHastur();
                    }
                }
                
            }

            if( objTwo.name == 'fireball' ){
                let thisFireball = objTwo;
                let thisHastur = objOne;
                
                if( thisHastur.id ==  hastur.id){

                    hastur.health -= 10;
                    thisFireball.destroy();

                    if(hastur.health <= 40){
                        //Sätter tint (blue)
                        hastur.setTint(0x990000);
                    }else{
                        //Sätter tint (red)
                        hastur.setTint(0x990000);

                        setTimeout(() => {
                            //Clear tint
                            hastur.clearTint();
                        }, 1000);
                    }

                    if(hastur.health <= 0){
                        scene.startData.score = scene.startData.score + 25;
                        scene.startData.totalCoins = scene.startData.totalCoins + 100;
                        
                        killHastur();
                    }
                }
            }

            if( objOne.name == 'lightning' ){
           
                let thisLightning = objOne;
                let thisHastur = objTwo;
     
                thisLightning.setBodySize(90,90, true);

                if( thisHastur.id ==  hastur.id){
                    hastur.health -= thisLightning.damage;

                    if(hastur.health < 50){
                        //Sätter tint (blue)
                        hastur.setTint(0x104FF4);
                    }else{
                        //Sätter tint (blue)
                        hastur.setTint(0x104FF4);

                        setTimeout(() => {
                            //Clear tint
                            hastur.clearTint();
                        }, 1500);
                    }
                    
                    thisLightning.x = -150;
                    thisLightning.y = -150;

                    if(hastur.health <= 0){
                        scene.startData.score = scene.startData.score + 10;
                        scene.startData.totalCoins = scene.startData.totalCoins + 50;
                     
                        setTimeout(() => {
                            killHastur();
                        }, 700);
                    }
                }
                
            }

        })

    }

    destroy(){
        console.log('hastur '+ this.id +' died');
        clearInterval(this.wallCollide);
        clearInterval(this.shoot);
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




