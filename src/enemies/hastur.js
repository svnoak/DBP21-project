export default class Hastur extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        // this.anims.play('hastur-down');
    
        // // //Skalar upp Hastur
        // this.hastur.setScale(2);
        // // //Ger vikt på Hastur
        // this.hastur.body.mass = 2;
        // // //Begränsar Hastur inom spethiss gränser
        // this.hastur.setCollideWorldBounds(true);
        // // //Gör Hastur orörlig
        // this.hastur.body.setImmovable(true);
        // // //Hasturs health
        // this.hastur.health = 100;
    }

}


