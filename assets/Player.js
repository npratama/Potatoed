export class Player {
    physics;
    players;
    anims;
    bubble;
    bubbleText


    constructor(){
       ;
    }

    init( physics, player, anims){
        this.physics = physics ;
        this.players = player;
        this.anims = anims;

        this.spawnObject();
    }

    checkCollider(platforms){
        // collider bounce modifier
        this.players.setBounce(0.1);
        // collider with skybox
        this.players.setCollideWorldBounds(true);
        // collider with platform
        this.physics.add.collider(this.players, platforms);
        
      
        // spawn bubble text that will follow the character, shouldve been coded
        this.bubble.x = this.players.x + 50;
        this.bubble.y = this.players.y - 90;
        this.bubbleText.x = this.players.x - 20;
        this.bubbleText.y = this.players.y - 120;
    }

    setBubble(bubble, bubbleText){
        this.bubble = bubble;
        this.bubbleText = bubbleText;
    }

    spawnObject(){
        this.players = this.physics.add.sprite(100, 450, 'dude');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate:  10
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate:  10,
            repeat: -1
        });

    }
}