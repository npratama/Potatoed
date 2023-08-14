export class Control {
    control;
    cursors;
    input;

    init(control, cursors, input){
        this.control = control ;
        this.cursors = cursors;
        this.input = input;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.addPointer(3);
    }

    Movement(player, input){
        //define action

        //if key UP pressed
        if(input.pointer1.isDown)
        {
            if((this.input.pointer1.x < (BTN_RIGHT_X + BTN_RADIUS) && this.input.pointer1.x > (BTN_RIGHT_X-BTN_RADIUS) )){
                player.setVelocityX(200);
                player.anims.play('right', true);
            } else if((this.input.pointer1.x < (BTN_LEFT_X + BTN_RADIUS) && this.input.pointer1.x > (BTN_LEFT_X - BTN_RADIUS) )){
                player.setVelocityX(-200);
                player.anims.play('left', true);
            } else if((this.input.pointer1.x < (BTN_UP_X + BTN_RADIUS) && this.input.pointer1.x > (BTN_UP_X - BTN_RADIUS)) && player.body.touching.down){
                player.setVelocityY(-420);
            }

            if((this.input.pointer2.x< (BTN_UP_X + BTN_RADIUS) && this.input.pointer2.x > (BTN_UP_X - BTN_RADIUS)) && player.body.touching.down){
                player.setVelocityY(-420);
            }
        } 
        else
        {
            input.pointer1.x=0;
            input.pointer2.x=0;
            player.setVelocityX(0);
            // player.anims.play('turn');
        }	

        if (this.cursors.left.isDown)
        {
            player.setVelocityX(-200);
            player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            player.setVelocityX(200);
            player.anims.play('right', true);
        }
        
        if (this.cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-420);
        } 
    }
    
}