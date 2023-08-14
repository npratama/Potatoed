export class Bomb {
    physics;
    bombs;
    players;
    hit = false;
    
    constructor(){
       ; 
    }

    init(bomb, physics, player){
        this.physics = physics ;
        this.bombs = bomb;
        this.players = player;
        this.hit = false;
        this.spawn();
    }

    checkCollider(platforms, player, stars){
        this.physics.add.collider(this.bombs, platforms);
        this.physics.add.collider(this.players, this.bombs, this.hitBomb, null, this);
    }

    
    hitBomb (player, bomb)
    {
        this.physics.pause();
        bomb.setTint(0xff0000);
        player.anims.play('turn');
        this.hit = true;
    }

    spawn(){
        this.bombs = this.physics.add.group(
            {
                key: 'bomb',
                repeat: 0,
                setXY: { x: 600, y: 0, stepX: 50 }
            }
        );

        this.bombs.children.iterate(function (child) {
            child.setBounce(1);
            child.setVelocity(Phaser.Math.Between(-200, 200), 1);
            child.setCollideWorldBounds(true);
        });

        // this.physics.add.collider(this.bombs, platforms);
        this.physics.add.collider(this.players, this.bombs, this.hitBomb, null, this);
    }
}