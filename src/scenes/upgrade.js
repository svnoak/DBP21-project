class UpgradeScene extends Phaser.Scene{
    constructor() {
        super('UpgradeScene');
    }

    init(data){
        this.skillData = data;
    }
    preload(){
        //Laddar bakgrund bilden
        this.load.image('backgroundPause', './assets/tilemap/backgroundPause.png');

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        //Laddar Health Potion icon
        this.load.image('healthPotion', './assets/player/health_potion.png');
        //Laddar Speed Potion icon
        this.load.image('speedPotion', './assets/player/speed_potion.png');
        //Laddar eldbollar
        this.load.image('fireball', './assets/player/fireball.png');
        //Laddar lightnings skill icon
        this.load.image('lightningIcon', './assets/player/lightningSkillIcon.png');

        //Laddar up icon
        this.load.image('cursorUp', './assets/tilemap/cursorUp.png');
    }

    create(){
        //Background image for Pause Scene 
        this.bgPause = this.add.image(0,0,'backgroundPause').setOrigin(0);

        //Definierar variabeln keyESC = "ESC"
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Creates back button
        let backToPause = this.add.text(20, 10, "Back", {font: "20px arcade"});
        backToPause.setShadow(2, 2, '#000000', 0);

        //Creates back button
        let resumeGameButton = this.add.text(720, 10, "Resume", {font: "20px arcade"});
        resumeGameButton.setShadow(2, 2, '#000000', 0);

        //Creates Title "Skills"
        let skills = this.add.text(300, 15, "Skills", {font:'60px arcade'});
        skills.setShadow(2, 2, '#000000', 0);

        //Creates "Coins"
        this.coins = this.add.text(20, 40, '',{font: "20px arcade"});
        this.coins.setShadow(2, 2, '#000000', 0);

        //Skill notification
        this.info = this.add.text(230, 100, '', {fill: 'white', font: "25px arcade"});
        this.info.setShadow(2, 2, '#000000', 0);
        this.info.setVisible(false);

        let regeneration = this.add.text(75, 550, "Regeneration", {font: "20px arcade"});
        regeneration.setShadow(2, 2, '#000000', 0);

        let speedBoost = this.add.text(285, 550, "SpeedBoost", {font: "20px arcade"});
        speedBoost.setShadow(2, 2, '#000000', 0);

        let fireball = this.add.text(475, 550, "Fireballs", {font: "20px arcade"});
        fireball.setShadow(2, 2, '#000000', 0);

        let lightning = this.add.text(650, 550, "Lightning", {font: "20px arcade"});
        lightning.setShadow(2, 2, '#000000', 0);

        //Creates up icon
        this.upIcon = this.add.image(131.5,450,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Information about the skill
        let learnInfo = this.add.text(160,500, 'Info:', {font: "20px arcade"});
        learnInfo.setDepth(1);
        learnInfo.setVisible(false);

        //Cost of the skill
        let skillCost = this.add.text(165,520, 'Cost:', {font: "20px arcade"});
        skillCost.setDepth(1);
        skillCost.setVisible(false);

        /////////////////////////////////////////////////////////////////////////
                                //Skill - Regeneration

        //Creates regeneration skill image
        let learnRegeneration = this.add.image(130,500,'healthPotion');
        learnRegeneration.setScale(0.60);
        learnRegeneration.setAlpha(0.5);

        learnRegeneration.setInteractive({ cursor: 'pointer' });

        if(this.skillData.regenerationLearned == false){
            learnRegeneration.setAlpha(0.5);
        }else{
            learnRegeneration.setAlpha(1);
        }

        //Mouse on - Regeneration skill icon
        learnRegeneration.on("pointerover", () => {
            learnRegeneration.setAlpha(1);

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 160;
            learnInfo.y = 490;
            learnInfo.text = '+10 Health';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 165;
            skillCost.y = 510;
            skillCost.text = 'Cost: 100';
        });

        //Mouse out - Regeneration skill icon
        learnRegeneration.on("pointerout", () => {
            if(this.skillData.regenerationLearned == false){
                learnRegeneration.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - Regeneration skill icon
        learnRegeneration.on("pointerdown", () => {
            if(this.skillData.regenerationLearned == false){
                if(this.skillData.totalCoins >= 100){
                    this.skillData.totalCoins -= this.skillData.baseCostForRegenerationUpgrade;
                    this.skillData.baseCostForRegenerationUpgrade = this.skillData.baseCostForRegenerationUpgrade * 2;
                    this.skillData.regenerationLearned = true;
                    learnRegeneration.setAlpha(1);
    
                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned, +10 Health!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);
                    }, 2000);
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill already learned!"
                this.info.text = 'Skill already learned!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "Skill learned!"
                    this.info.setVisible(false);
                }, 2000);
            }
            
        });

        //////////////////////////////////////////
        //Regeneration - First Upgrade

        //Creates up icon
        this.upIcon = this.add.image(131.5,450,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates regeneration1 skill image
        let regeneration1 = this.add.image(130,400,'healthPotion');
        regeneration1.setScale(0.60);
        regeneration1.setAlpha(0.5);

        regeneration1.setInteractive({ cursor: 'pointer' });

        if(this.skillData.regenerationCurrentLevelFactor >= 20){
            regeneration1.setAlpha(1);
        }else{
            regeneration1.setAlpha(0.5);
        }

        //Mouse on - Regeneration skill icon
        regeneration1.on("pointerover", () => {
            if(this.skillData.regenerationLearned == true){
                regeneration1.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 160;
            learnInfo.y = 390;
            learnInfo.text = '+20 Health';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 165;
            skillCost.y = 410;
            skillCost.text = 'Cost: 200';
        });

        //Mouse out - Regeneration skill icon
        regeneration1.on("pointerout", () => {
            if(this.skillData.regenerationCurrentLevelFactor >= 20){
                regeneration1.setAlpha(1);
            }else{
                regeneration1.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - Regeneration skill icon
        regeneration1.on("pointerdown", () => {
            if(this.skillData.regenerationLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForRegenerationUpgrade){
                    if(this.skillData.regenerationCurrentLevelFactor == 10){
                        this.skillData.totalCoins -= this.skillData.baseCostForRegenerationUpgrade;
                        this.skillData.baseCostForRegenerationUpgrade = this.skillData.baseCostForRegenerationUpgrade * 2;
                        this.skillData.regenerationCurrentLevelFactor = this.skillData.regenerationCurrentLevelFactor * 2;
                        
                        //Display inline "Skill upgraded!"
                        this.info.text = 'Skill upgraded, +20 health!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.regenerationCurrentLevelFactor > 10){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        //////////////////////////////////////////
        //Regeneration - Second Upgrade

        //Creates up icon
        this.upIcon = this.add.image(131.5,350,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Skapar regeneration2 skill image
        let regeneration2 = this.add.image(130,300,'healthPotion');
        regeneration2.setScale(0.60);
        regeneration2.setAlpha(0.5);

        regeneration2.setInteractive({ cursor: 'pointer' });

        if(this.skillData.regenerationCurrentLevelFactor >= 40){
            regeneration2.setAlpha(1);
        }else{
            regeneration2.setAlpha(0.5);
        }

        //Mouse on - Regeneration skill icon
        regeneration2.on("pointerover", () => {
            if(this.skillData.regenerationCurrentLevelFactor >= 40){
                regeneration2.setAlpha(1);
            }else{
                regeneration2.setAlpha(0.5);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 160;
            learnInfo.y = 290;
            learnInfo.text = '+40 Health';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 165;
            skillCost.y = 310;
            skillCost.text = 'Cost: 400';
        });

        //Mouse out - Regeneration skill icon
        regeneration2.on("pointerout", () => {
            if(this.skillData.regenerationCurrentLevelFactor >= 40){
                regeneration2.setAlpha(1);
            }else{
                regeneration2.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - Regeneration skill icon
        regeneration2.on("pointerdown", () => {
            if(this.skillData.regenerationLearned == true){
                if(this.skillData.regenerationCurrentLevelFactor == 20){
                    if(this.skillData.totalCoins >= this.skillData.baseCostForRegenerationUpgrade){
                        this.skillData.totalCoins -= this.skillData.baseCostForRegenerationUpgrade;
                        this.skillData.baseCostForRegenerationUpgrade = this.skillData.baseCostForRegenerationUpgrade * 2;
                        this.skillData.regenerationCurrentLevelFactor = this.skillData.regenerationCurrentLevelFactor * 2;

                        //Display inline "Second level reached!"
                        this.info.text = 'Skill upgraded +40 health!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);
                        }, 2000);
                    }else{
                        //Display inline "Not enough coins to upgrade!"
                        this.info.text = 'Not enough coins to upgrade!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Not enough coins to upgrade!"
                            this.info.setVisible(false);;
                        }, 2000);
                    }
                }else{
                    if(this.skillData.regenerationCurrentLevelFactor > 20){
                        //Display inline "Skill already upgraded!"
                        this.info.text = 'Skill already upgraded!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Skill already upgraded!"
                            this.info.setVisible(false);
                        }, 2000);
                    }else{
                        //Display inline "Requires previous upgrade!"
                        this.info.text = 'Requires previous upgrade!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Requires previous upgrade!"
                            this.info.setVisible(false);
                        }, 2000);
                    }
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }
        });

        //////////////////////////////////////////
        //Regeneration - Third Upgrade

        //Creates up icon
        this.upIcon = this.add.image(131.5,250,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates regeneration3 skill image
        let regeneration3 = this.add.image(130,200,'healthPotion');
        regeneration3.setScale(0.60);
        regeneration3.setAlpha(0.5);

        regeneration3.setInteractive({ cursor: 'pointer' });

        if(this.skillData.regenerationCurrentLevelFactor >= 80){
            regeneration3.setAlpha(1);
        }else{
            regeneration3.setAlpha(0.5);
        }

        //Mouse on - Regeneration skill icon
        regeneration3.on("pointerover", () => {
            if(this.skillData.regenerationCurrentLevelFactor >= 40){
                regeneration3.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 160;
            learnInfo.y = 190;
            learnInfo.text = '+80 Health';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 165;
            skillCost.y = 210;
            skillCost.text = 'Cost: 800';
        });

        //Mouse out - Regeneration skill icon
        regeneration3.on("pointerout", () => {
            if(this.skillData.regenerationCurrentLevelFactor !== 80){
                regeneration3.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - Regeneration skill icon
        regeneration3.on("pointerdown", () => {
            if(this.skillData.regenerationLearned == true){
                if(this.skillData.regenerationCurrentLevelFactor == 40){
                    if(this.skillData.totalCoins >= this.skillData.baseCostForRegenerationUpgrade){
                        this.skillData.totalCoins -= this.skillData.baseCostForRegenerationUpgrade;
                        this.skillData.baseCostForRegenerationUpgrade = this.skillData.baseCostForRegenerationUpgrade * 2;
                        this.skillData.regenerationCurrentLevelFactor = this.skillData.regenerationCurrentLevelFactor * 2;

                        //Display inline "Second level reached!"
                        this.info.text = 'Skill upgraded +80 health!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);
                        }, 2000);
                    }else{
                        //Display inline "Not enough coins to upgrade!"
                        this.info.text = 'Not enough coins to upgrade!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Not enough coins to upgrade!"
                            this.info.setVisible(false);;
                        }, 2000);
                    }
                }else{
                    if(this.skillData.regenerationCurrentLevelFactor > 20){
                        //Display inline "Skill already upgraded!"
                        this.info.text = 'Skill already upgraded!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Skill already upgraded!"
                            this.info.setVisible(false);
                        }, 2000);
                    }else{
                        //Display inline "Requires previous upgrade!"
                        this.info.text = 'Requires previous upgrade!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Requires previous upgrade!"
                            this.info.setVisible(false);
                        }, 2000);
                    }
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }
        });

        /////////////////////////////////////////////////////////////////////////
                                //Skill - SpeedBoost

        //Creates speedBoost skill image
        let learnSpeedBoost = this.add.image(335,500,'speedPotion');
        learnSpeedBoost.setScale(0.7);
        learnSpeedBoost.setAlpha(0.5);

        learnSpeedBoost.setInteractive({ cursor: 'pointer' });

        if(this.skillData.speedBoostLearned == false){
            learnSpeedBoost.setAlpha(0.5);
        }else{
            learnSpeedBoost.setAlpha(1);
        }
       
        learnSpeedBoost.on("pointerover", () => {
            learnSpeedBoost.setAlpha(1);

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 365;
            learnInfo.y = 490;
            learnInfo.text = '*1.25 Speed';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 365;
            skillCost.y = 510;
            skillCost.text = 'Cost: 500';
        });
        learnSpeedBoost.on("pointerout", () => {
            if(this.skillData.speedBoostLearned == false){
                learnSpeedBoost.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });
        learnSpeedBoost.on("pointerdown", () => {
            if(this.skillData.speedBoostLearned == false){
                if(this.skillData.totalCoins >= this.skillData.baseCostForSpeedBoostUpgrade){
                    this.skillData.totalCoins = this.skillData.totalCoins - this.skillData.baseCostForSpeedBoostUpgrade;
                    this.skillData.baseCostForSpeedBoostUpgrade = this.skillData.baseCostForSpeedBoostUpgrade * 2;
                    this.skillData.speedBoostCurrentLevelFactor = this.skillData.speedBoostCurrentLevelFactor * 1.25;
                    this.skillData.speedBoostLearned = true;
                    learnSpeedBoost.setAlpha(1);

                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned - *1.25 SpeedBoost!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);;
                    }, 2000);
                    
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill already learned!"
                this.info.text = 'Skill already learned!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "Skill learned!"
                    this.info.setVisible(false);
                }, 2000);
            }
        });

        //////////////////////////////////////////
        //SpeedBoost - First Upgrade

        //Creates up icon
        this.upIcon = this.add.image(335, 450,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates speedBoost1 skill image
        let speedBoost1 = this.add.image(335,400,'speedPotion');
        speedBoost1.setScale(0.7);
        speedBoost1.setAlpha(0.5);

        speedBoost1.setInteractive({ cursor: 'pointer' });

        if(this.skillData.speedBoostCurrentLevelFactor >= 1.25){
            speedBoost1.setAlpha(1);
        }else{
            speedBoost1.setAlpha(0.5);
        }

        //Mouse on - SpeedBoost1 skill icon
        speedBoost1.on("pointerover", () => {
            if(this.skillData.speedBoostLearned == true){
                speedBoost1.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 365;
            learnInfo.y = 390;
            learnInfo.text = '*2.5 Speed';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 365;
            skillCost.y = 410;
            skillCost.text = 'Cost: 1000';
        });

        //Mouse out - SpeedBoost1 skill icon
        speedBoost1.on("pointerout", () => {
            if(this.skillData.speedBoostCurrentLevelFactor > 1.25){
                speedBoost1.setAlpha(1);
            }else{
                speedBoost1.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - SpeedBoost1 skill icon
        speedBoost1.on("pointerdown", () => {
            if(this.skillData.speedBoostLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForSpeedBoostUpgrade){
                    if(this.skillData.speedBoostCurrentLevelFactor == 1.25){
                        this.skillData.totalCoins -= this.skillData.baseCostForSpeedBoostUpgrade;
                        this.skillData.baseCostForSpeedBoostUpgrade = this.skillData.baseCostForSpeedBoostUpgrade * 2;
                        this.skillData.speedBoostCurrentLevelFactor += 1.25;
                        
                        //Display inline "Skill upgraded!"
                        this.info.text = 'Skill upgraded, *2.5 SpeedBoost!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.speedBoostCurrentLevelFactor > 1.25){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        //////////////////////////////////////////
        //SpeedBoost - Second Upgrade

        //Creates up icon
        this.upIcon = this.add.image(335, 350,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates speedBoost1 skill image
        let speedBoost2 = this.add.image(335,300,'speedPotion');
        speedBoost2.setScale(0.7);
        speedBoost2.setAlpha(0.5);

        speedBoost2.setInteractive({ cursor: 'pointer' });

        if(this.skillData.speedBoostCurrentLevelFactor >= 3.75){
            speedBoost2.setAlpha(1);
        }else{
            speedBoost2.setAlpha(0.5);
        }

        //Mouse on - SpeedBoost1 skill icon
        speedBoost2.on("pointerover", () => {
            if(this.skillData.speedBoostCurrentLevelFactor >= 2.5){
                speedBoost2.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 365;
            learnInfo.y = 290;
            learnInfo.text = '*3.75 Speed';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 365;
            skillCost.y = 310;
            skillCost.text = 'Cost: 2000';
        });

        //Mouse out - SpeedBoost1 skill icon
        speedBoost2.on("pointerout", () => {
            if(this.skillData.speedBoostCurrentLevelFactor >= 3.75){
                speedBoost2.setAlpha(1);
            }else{
                speedBoost2.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - SpeedBoost1 skill icon
        speedBoost2.on("pointerdown", () => {
            if(this.skillData.speedBoostLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForSpeedBoostUpgrade){
                    if(this.skillData.speedBoostCurrentLevelFactor == 2.5){
                        this.skillData.totalCoins -= this.skillData.baseCostForSpeedBoostUpgrade;
                        this.skillData.baseCostForSpeedBoostUpgrade = this.skillData.baseCostForSpeedBoostUpgrade * 2;
                        this.skillData.speedBoostCurrentLevelFactor += 1.25;

                        //Display inline "Skill upgraded!"
                        this.info.text = 'Skill upgraded, *3.75 SpeedBoost!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.speedBoostCurrentLevelFactor > 2.5){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        /////////////////////////////////////////
        //SpeedBoost - Third Upgrade

        //Creates up icon
        this.upIcon = this.add.image(335, 250,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates speedBoost1 skill image
        let speedBoost3 = this.add.image(335,200,'speedPotion');
        speedBoost3.setScale(0.7);
        speedBoost3.setAlpha(0.5);

        speedBoost3.setInteractive({ cursor: 'pointer' });

        if(this.skillData.speedBoostCurrentLevelFactor >= 5){
            speedBoost3.setAlpha(1);
        }else{
            speedBoost3.setAlpha(0.5);
        }

        //Mouse on - SpeedBoost1 skill icon
        speedBoost3.on("pointerover", () => {
            if(this.skillData.speedBoostCurrentLevelFactor >= 3.75){
                speedBoost3.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 365;
            learnInfo.y = 190;
            learnInfo.text = '*5 Speed';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 365;
            skillCost.y = 210;
            skillCost.text = 'Cost: 4000';
        });

        //Mouse out - SpeedBoost1 skill icon
        speedBoost3.on("pointerout", () => {
            if(this.skillData.speedBoostCurrentLevelFactor >= 5){
                speedBoost3.setAlpha(1);
            }else{
                speedBoost3.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - SpeedBoost1 skill icon
        speedBoost3.on("pointerdown", () => {
            if(this.skillData.speedBoostLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForSpeedBoostUpgrade){
                    if(this.skillData.speedBoostCurrentLevelFactor == 3.75){
                        this.skillData.totalCoins -= this.skillData.baseCostForSpeedBoostUpgrade;
                        this.skillData.baseCostForSpeedBoostUpgrade = this.skillData.baseCostForSpeedBoostUpgrade * 2;
                        this.skillData.speedBoostCurrentLevelFactor += 1.25;

                        //Display inline "Skill upgraded!, *5 SpeedBoost!"
                        this.info.text = 'Skill upgraded!, *5 SpeedBoost!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Skill upgraded!, *5 SpeedBoost!"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.speedBoostCurrentLevelFactor > 3.75){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        /////////////////////////////////////////////////////////////////////////
                                //Skill - Fireballs

        //Skapar fireball skill icon
        let learnFireballSkill = this.add.image(517.5, 502,'fireball');
        learnFireballSkill.setScale(2.25);
        learnFireballSkill.setAlpha(0.5);

        learnFireballSkill.setInteractive({ cursor: 'pointer' });

        if(this.skillData.fireballSkillLearned == false){
            learnFireballSkill.setAlpha(0.5);
        }else{
            learnFireballSkill.setAlpha(1);
        }
       
        learnFireballSkill.on("pointerover", () => {
            learnFireballSkill.setAlpha(1);

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 547.5;
            learnInfo.y = 490;
            learnInfo.text = '+1 Fireball';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 547.5;
            skillCost.y = 510;
            skillCost.text = 'Cost: 1000';
        });
        learnFireballSkill.on("pointerout", () => {
            if(this.skillData.fireballSkillLearned == false){
                learnFireballSkill.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });
        learnFireballSkill.on("pointerdown", () => {
            if(this.skillData.fireballSkillLearned == false){
                if(this.skillData.totalCoins >= this.skillData.baseCostForFireballLearn){
                    this.skillData.totalCoins = this.skillData.totalCoins - this.skillData.baseCostForFireballLearn;
                    this.skillData.baseCostForfireballUpgrade = 1500;
                    this.skillData.fireballSkillLearned = true;
                    this.skillData.fireballSkillActive = true;
                    this.skillData.amountFireballsToFire = 1;

                    learnFireballSkill.setAlpha(1);

                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned! - +1 Fireball!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);;
                    }, 2000);
                    
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill already learned!"
                this.info.text = 'Skill already learned!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "Skill learned!"
                    this.info.setVisible(false);
                }, 2000);
            }
        });

        //////////////////////////////////////////
        //Fireballs - First Upgrade

        //Creates up icon
        this.upIcon = this.add.image(517.5, 450,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates speedBoost1 skill image
        let fireballSkill1 = this.add.image(517.5,402,'fireball');
        fireballSkill1.setScale(2.25);
        fireballSkill1.setAlpha(0.5);

        fireballSkill1.setInteractive({ cursor: 'pointer' });

        if(this.skillData.amountFireballsToFire > 1){
            fireballSkill1.setAlpha(1);
        }else{
            fireballSkill1.setAlpha(0.5);
        }

        //Mouse on - fireballSkill1 skill icon
        fireballSkill1.on("pointerover", () => {
            if(this.skillData.amountFireballsToFire >= 1){
                fireballSkill1.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 547.5;
            learnInfo.y = 390;
            learnInfo.text = '+2 Fireball';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 547.5;
            skillCost.y = 410;
            skillCost.text = 'Cost: 1500';
        });

        //Mouse out - fireballSkill1 skill icon
        fireballSkill1.on("pointerout", () => {
            if(this.skillData.amountFireballsToFire >= 3){
                fireballSkill1.setAlpha(1);
            }else{
                fireballSkill1.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - fireballSkill1 skill icon
        fireballSkill1.on("pointerdown", () => {
            if(this.skillData.fireballSkillLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForfireballUpgrade){
                    if(this.skillData.amountFireballsToFire == 1){
                        this.skillData.totalCoins -= this.skillData.baseCostForfireballUpgrade;
                        this.skillData.baseCostForfireballUpgrade = 2500;
                        this.skillData.amountFireballsToFire = 3;

                        //Display inline "Skill upgraded!"
                        this.info.text = 'Skill upgraded!, +2 Fireballs!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.amountFireballsToFire > 3){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        //////////////////////////////////////////
        //Fireballs - Second Upgrade

        //Creates up icon
        this.upIcon = this.add.image(517.5, 350,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates speedBoost1 skill image
        let fireballSkill2 = this.add.image(517.5,302,'fireball');
        fireballSkill2.setScale(2.25);
        fireballSkill2.setAlpha(0.5);

        fireballSkill2.setInteractive({ cursor: 'pointer' });

        if(this.skillData.amountFireballsToFire > 3){
            fireballSkill2.setAlpha(1);
        }else{
            fireballSkill2.setAlpha(0.5);
        }

        //Mouse on - fireballSkill2 skill icon
        fireballSkill2.on("pointerover", () => {
            if(this.skillData.amountFireballsToFire >= 3){
                fireballSkill2.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 547.5;
            learnInfo.y = 290;
            learnInfo.text = '+2 Fireball';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 547.5;
            skillCost.y = 310;
            skillCost.text = 'Cost: 2500';
        });

        //Mouse out - fireballSkill2 skill icon
        fireballSkill2.on("pointerout", () => {
            if(this.skillData.amountFireballsToFire >= 5){
                fireballSkill2.setAlpha(1);
            }else{
                fireballSkill2.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - fireballSkill2 skill icon
        fireballSkill2.on("pointerdown", () => {
            if(this.skillData.fireballSkillLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForfireballUpgrade){
                    if(this.skillData.amountFireballsToFire == 3){
                        this.skillData.totalCoins -= this.skillData.baseCostForfireballUpgrade;
                        this.skillData.baseCostForfireballUpgrade = 10000;
                        this.skillData.amountFireballsToFire = 5;

                        //Display inline "Skill upgraded!, +2 Fireballs!"
                        this.info.text = 'Skill upgraded!, +2 Fireballs!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Skill upgraded!, +2 Fireballs!"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.amountFireballsToFire > 5){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        //////////////////////////////////////////
        //Fireballs - Third Upgrade

        //Creates up icon
        this.upIcon = this.add.image(517.5, 250,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates speedBoost1 skill image
        let fireballSkill3 = this.add.image(517.5,202,'fireball');
        fireballSkill3.setScale(2.25);
        fireballSkill3.setAlpha(0.5);

        fireballSkill3.setInteractive({ cursor: 'pointer' });

        if(this.skillData.amountFireballsToFire > 5){
            fireballSkill3.setAlpha(1);
        }else{
            fireballSkill3.setAlpha(0.5);
        }

        //Mouse on - fireballSkill3 skill icon
        fireballSkill3.on("pointerover", () => {
            if(this.skillData.amountFireballsToFire >= 5){
                fireballSkill3.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 547.5;
            learnInfo.y = 190;
            learnInfo.text = '+5 Fireball';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 547.5;
            skillCost.y = 210;
            skillCost.text = 'Cost: 10000';
        });

        //Mouse out - fireballSkill3 skill icon
        fireballSkill3.on("pointerout", () => {
            if(this.skillData.amountFireballsToFire >= 10){
                fireballSkill3.setAlpha(1);
            }else{
                fireballSkill3.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - fireballSkill3 skill icon
        fireballSkill3.on("pointerdown", () => {
            if(this.skillData.fireballSkillLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForfireballUpgrade){
                    if(this.skillData.amountFireballsToFire == 5){
                        this.skillData.totalCoins -= this.skillData.baseCostForfireballUpgrade;
                        this.skillData.baseCostForfireballUpgrade = 25000;
                        this.skillData.amountFireballsToFire = 10;

                        //Display inline "Skill upgraded!, +5 Fireballs!"
                        this.info.text = 'Skill upgraded!, +5 Fireballs!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Skill upgraded!, +5 Fireballs!"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.amountFireballsToFire > 10){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        /////////////////////////////////////////////////////////////////////////
                                //Skill - Lightning

        //Creates lightningSkill icon
        let learnLightningSkill = this.add.image(693, 502, 'lightningIcon');
        learnLightningSkill.setScale(0.38);

        learnLightningSkill.setInteractive({ cursor: 'pointer' });

        if(this.skillData.lightningSkillLearned == false){
            learnLightningSkill.setAlpha(0.5);
        }else{
            learnLightningSkill.setAlpha(1);
        }
       
        learnLightningSkill.on("pointerover", () => {
            learnLightningSkill.setAlpha(1);

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 565;
            learnInfo.y = 490;
            learnInfo.text = '+50 damage';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 565;
            skillCost.y = 510;
            skillCost.text = 'Cost: 1500';
        });
        learnLightningSkill.on("pointerout", () => {
            if(this.skillData.lightningSkillLearned == false){
                learnLightningSkill.setAlpha(0.5);
            }
            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });
        learnLightningSkill.on("pointerdown", () => {
            if(this.skillData.lightningSkillLearned == false){
                if(this.skillData.totalCoins >= this.skillData.baseCostForLightningSkill){
                    this.skillData.totalCoins -= this.skillData.baseCostForLightningSkill;
                    this.skillData.baseCostForLightningSkill = this.skillData.baseCostForLightningSkill * 2;
                    this.skillData.lightningSkillLearned = true;

                    //Display inline "Skill learned!"
                    this.info.text = 'Skill learned!, +50 Damage';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Skill learned!"
                        this.info.setVisible(false);;
                    }, 2000);
                }else{
                    //Display inline "Not enough coins to learn!"
                    this.info.text = 'Not enough coins to learn!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to learn!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill already learned!"
                this.info.text = 'Skill already learned!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "Skill already learned!"
                    this.info.setVisible(false);;
                }, 2000);
            }

        });

        //////////////////////////////////////////
        //Lightning - First Upgrade

        //Creates up icon
        this.upIcon = this.add.image(693, 450,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates lightningSkill1 skill image
        let lightningSkill1 = this.add.image(693,402,'lightningIcon');
        lightningSkill1.setScale(0.38);
        lightningSkill1.setAlpha(0.5);

        lightningSkill1.setInteractive({ cursor: 'pointer' });

        if(this.skillData.lightningDamage > 50){
            lightningSkill1.setAlpha(1);
        }else{
            lightningSkill1.setAlpha(0.5);
        }

        //Mouse on - lightningSkill1 skill icon
        lightningSkill1.on("pointerover", () => {
            if(this.skillData.lightningSkillLearned == true){
                lightningSkill1.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 565;
            learnInfo.y = 390;
            learnInfo.text = '+50 Damage';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 565;
            skillCost.y = 410;
            skillCost.text = 'Cost: 3000';
        });

        //Mouse out - lightningSkill1 skill icon
        lightningSkill1.on("pointerout", () => {
            if(this.skillData.lightningDamage >= 100){
                lightningSkill1.setAlpha(1);
            }else{
                lightningSkill1.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - lightningSkill1 skill icon
        lightningSkill1.on("pointerdown", () => {
            if(this.skillData.lightningSkillLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForLightningSkill){
                    if(this.skillData.lightningDamage == 50){
                        this.skillData.totalCoins -= this.skillData.baseCostForLightningSkill;
                        this.skillData.baseCostForLightningSkill = this.skillData.baseCostForLightningSkill * 2;
                        this.skillData.lightningDamage = 100;

                        //Display inline "Skill upgraded!"
                        this.info.text = 'Skill upgraded!, +50 Damage!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.lightningDamage > 50){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);;
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        //////////////////////////////////////////
        //Lightning - Second Upgrade

        //Creates up icon
        this.upIcon = this.add.image(693, 350,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates lightningSkill2 skill image
        let lightningSkill2 = this.add.image(693,302,'lightningIcon');
        lightningSkill2.setScale(0.38);
        lightningSkill2.setAlpha(0.5);

        lightningSkill2.setInteractive({ cursor: 'pointer' });

        if(this.skillData.lightningDamage > 100){
            lightningSkill2.setAlpha(1);
        }else{
            lightningSkill2.setAlpha(0.5);
        }

        //Mouse on - lightningSkill2 skill icon
        lightningSkill2.on("pointerover", () => {
            if(this.skillData.lightningDamage >= 100){
                lightningSkill2.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 565;
            learnInfo.y = 290;
            learnInfo.text = '+50 Damage';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 565;
            skillCost.y = 310;
            skillCost.text = 'Cost: 6000';
        });

        //Mouse out - lightningSkill2 skill icon
        lightningSkill2.on("pointerout", () => {
            if(this.skillData.lightningDamage >= 150){
                lightningSkill2.setAlpha(1);
            }else{
                lightningSkill2.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - lightningSkill2 skill icon
        lightningSkill2.on("pointerdown", () => {
            if(this.skillData.lightningSkillLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForLightningSkill){
                    if(this.skillData.lightningDamage == 100){
                        this.skillData.totalCoins -= this.skillData.baseCostForLightningSkill;
                        this.skillData.baseCostForLightningSkill = this.skillData.baseCostForLightningSkill * 2;
                        this.skillData.lightningDamage = 150;

                        //Display inline "Skill upgraded!"
                        this.info.text = 'Skill upgraded!, +50 Damage!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Max level reached"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.lightningDamage > 100){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        //////////////////////////////////////////
        //Lightning - Third Upgrade

        //Creates up icon
        this.upIcon = this.add.image(693, 250,'cursorUp');
        //Sets and fills tint (white)
        this.upIcon.setTintFill(0xffffff);
        //Scales to 0.025
        this.upIcon.setScale(0.025);

        //Creates lightningSkill3 skill image
        let lightningSkill3 = this.add.image(693,202,'lightningIcon');
        lightningSkill3.setScale(0.38);
        lightningSkill3.setAlpha(0.5);

        lightningSkill3.setInteractive({ cursor: 'pointer' });

        if(this.skillData.lightningDamage > 150){
            lightningSkill3.setAlpha(1);
        }else{
            lightningSkill3.setAlpha(0.5);
        }

        //Mouse on - lightningSkill3 skill icon
        lightningSkill3.on("pointerover", () => {
            if(this.skillData.lightningDamage >= 150){
                lightningSkill3.setAlpha(1);
            }

            //Updates information about the skill
            learnInfo.setVisible(true);
            learnInfo.x = 565;
            learnInfo.y = 190;
            learnInfo.text = '+50 Damage';

            //Updates and showes cost of the skill
            skillCost.setVisible(true);
            skillCost.x = 565;
            skillCost.y = 210;
            skillCost.text = 'Cost: 12000';
        });

        //Mouse out - lightningSkill3 skill icon
        lightningSkill3.on("pointerout", () => {
            if(this.skillData.lightningDamage >= 150){
                lightningSkill3.setAlpha(1);
            }else{
                lightningSkill3.setAlpha(0.5);
            }

            learnInfo.setVisible(false);
            skillCost.setVisible(false);
        });

        //Mouse down - lightningSkill3 skill icon
        lightningSkill3.on("pointerdown", () => {
            if(this.skillData.lightningSkillLearned == true){
                if(this.skillData.totalCoins >= this.skillData.baseCostForLightningSkill){
                    if(this.skillData.lightningDamage == 150){
                        this.skillData.totalCoins -= this.skillData.baseCostForLightningSkill;
                        this.skillData.baseCostForLightningSkill = this.skillData.baseCostForLightningSkill * 2;
                        this.skillData.lightningDamage = 200;

                        //Display inline "Skill upgraded!, +50 Damage!"
                        this.info.text = 'Skill upgraded!, +50 Damage!';
                        this.info.setVisible(true);
                        setTimeout(() => {
                            //Display none => "Skill upgraded!, +50 Damage!"
                            this.info.setVisible(false);;
                        }, 2000);
                    }else{
                        if(this.skillData.lightningDamage > 150){
                            //Display inline "Skill already upgraded!"
                            this.info.text = 'Skill already upgraded!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Skill already upgraded!"
                                this.info.setVisible(false);
                            }, 2000);
                        }else{
                            //Display inline "Requires previous upgrade!"
                            this.info.text = 'Requires previous upgrade!';
                            this.info.setVisible(true);
                            setTimeout(() => {
                                //Display none => "Requires previous upgrade!"
                                this.info.setVisible(false);
                            }, 2000);
                        }
                    }
                }else{
                    //Display inline "Not enough coins to upgrade!"
                    this.info.text = 'Not enough coins to upgrade!';
                    this.info.setVisible(true);
                    setTimeout(() => {
                        //Display none => "Not enough coins to upgrade!"
                        this.info.setVisible(false);
                    }, 2000);
                }
            }else{
                //Display inline "Skill not learned yet!"
                this.info.text = 'Skill not learned yet!';
                this.info.setVisible(true);
                setTimeout(() => {
                    //Display none => "skill not learned yet!"
                    this.info.setVisible(false);
                }, 2000);
            }    
        });

        backToPause.setInteractive({ cursor: 'pointer' });

        backToPause.on("pointerover", () => {
            backToPause.style.setColor('black');
            backToPause.setShadow(2, 2, 'white', 0);
        });
        backToPause.on("pointerout", () => {
            backToPause.style.setColor('white');
            backToPause.setShadow(2, 2, 'black', 0);
        });
        backToPause.on("pointerdown", () => {
            //Starts the menu scene
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start("PauseScene", this.skillData);
            })
        });

        resumeGameButton.setInteractive({ cursor: 'pointer' });

        resumeGameButton.on("pointerover", () => {
            resumeGameButton.style.setColor('black');
            resumeGameButton.setShadow(2, 2, 'white', 0);
        });
        resumeGameButton.on("pointerout", () => {
            resumeGameButton.style.setColor('white');
            resumeGameButton.setShadow(2, 2, 'black', 0);
        });
        resumeGameButton.on("pointerdown", () => {
            //Resumes game scene
            this.scene.resume('GameScene', this.skillData);

            //Stops pause scene
            this.scene.stop();
        });

    }

    update(){
        this.coins.text = 'Coins: ' + this.skillData.totalCoins;

        //On press to ESC, Resume the game
        if(this.keyESC.isDown){
            //Resumes game scene
            this.scene.resume('GameScene', this.skillData);

            //Stops pause scene
            this.scene.stop();
        }
    }

}

export default UpgradeScene;