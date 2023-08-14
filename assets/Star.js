export class Star {
    physics;
    score;
    stars;
    bomb;
    
    constructor(){
       ; 
    }

    init(stars, physics, score, bomb){
        this.physics = physics ;
        this.score = score;
        this.stars = stars;
        this.bomb = bomb;

        this.spawnObject(1);
    }
    
    checkCollider(platforms, player){
        //apply collider againts platform
        this.physics.add.collider(this.stars, platforms);

        //apply collider againts stars
        this.physics.add.overlap(player, this.stars, this.hitStars, null, this);
    }

    // method to handler what happened if player collide with stars
    hitStars (player, star)
    {
        star.disableBody(true, true);
        star.disableBody(true, true);

        this.score.number += 10;
        // console.log(this.score.number);
        
        
    }

    spawnObject(cnt){
        //spawn the object
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: cnt,
            setXY: { x: Math.floor(Math.random() * 1000), y: 0, stepX: 50 }
        });

        //apply physics
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setVelocity(Phaser.Math.Between(-200, 200), 1);
            child.setCollideWorldBounds(true);
            child.rotation = Math.random() * 360;
        });
    }

}