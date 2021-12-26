//according to tutorial: src/classes/enemy.ts

import {Math, Scene} from 'phaser';
import {Actor} from './actor';
import {Plyer} from '../player';

export class Enemy extends Actor {
    private target: Player;

    //aggro range
    private AGRESSOR_RADIUS = 100;

    constructor (
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        target: Player,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);
        this.target = target;

        //add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //physics model
        this.getBody().setSize(32, 32); //16, 16 in tutorial
        this.getBody().setOffset(0, 0);
    }
    preUpdate(): void {
        if (
            Phaser.Math.Distance.BetweenPoints(
                {x: this.x, y: this.y},
                {x: this.target.x, y: this.target.y},
            ) < this.AGRESSOR_RADIUS
        ) {
            this.getBody().setVelocityX(this.target.x - this.x);
            this.getBody().setVelocityY(this.target.y - this.y);
        } else {
            this.getBody().setVelocity(0);
        }
    }
    //adds so that the enemy is able to change target
    //if you want to have more players
    public setTarget(target: Player): void {
        this.target = target;
    }
}