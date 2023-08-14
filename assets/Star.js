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
    
    checkCollider(platforms, player, bomb){
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
        
        // if stars are all collected, spawn bomb
        if (this.stars.countActive(true) === 0)
        {
      
            //spawn star
            this.spawnObject(5);

            // spawn bomb
            this.bomb.spawn();
        }
    }

    spawnObject(cnt){
        //spawn the object
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: cnt,
            setXY: { x: Math.floor(Math.random() * 800), y: 0, stepX: 50 }
        });

        //apply physics
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setVelocity(Phaser.Math.Between(-200, 200), 1);
            child.setCollideWorldBounds(true);
        });
    }

}