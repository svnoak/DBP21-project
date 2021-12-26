import {Physics} from 'phaser';

//makes a sprite not just a sprite but a physical
export class Actor extends Physics.Arcade.Sprite {
    protected hp = 100;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        //makes the physical sprite be considered as scene physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //makes the world react to the physical body of the sprite box
        this.getBody().setCollideWorldBounds(true);
    }
    //method is for attacking the actor and makes it flash 3 times within 100ms and then go back to it's normal transparity
    public getDamage(value?: number): void {
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 3,
            yoyo: true,
            alpha: 0.5,
            onStart: () => {
                if (value) {
                    this.hp = this.hp - value;
                }
            },
            onComplete: () => {
                this.setAlpha(1);
            },
        });
    }
    public getHPValue(): number {
        return this.hp;
    }
    //method is designed to rotate an actor as it moves left or right
    protected checkFlip(): void {
        if (this.body.velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }
    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}