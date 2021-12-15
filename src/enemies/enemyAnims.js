
const createHasturAnims = (anims) => {
    //Skapar down animationen för Hastur
    anims.create({
        key: 'hastur-down',
        frames: anims.generateFrameNumbers('hastur', {frames:[1,0,1,2]}),
        frameRate: 10,
        repeat: -1
    });

    //Skapar left animationen för Hastur
    anims.create({
        key: 'hastur-up',
        frames: anims.generateFrameNumbers('hastur', {frames:[4,3,4,5]}),
        frameRate: 10,
        repeat: -1
    });
    
    //Skapar right animationen för Hastur
    anims.create({
        key: 'hastur-right',
        frames: anims.generateFrameNumbers('hastur', {frames:[7,6,7,8]}),
        frameRate: 10,
        repeat: -1
    });
    
    //Skapar up animationen för Hastur
    anims.create({
        key: 'hastur-left',
        frames: anims.generateFrameNumbers('hastur', {frames:[10,9,10,11]}),
        frameRate: 10,
        repeat: -1
    });

}

export {
    createHasturAnims
}