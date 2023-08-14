import * as Constants from "./Constants.js";

export class Control {
    control;
    key;
    input;

    init(control, key, input){
        this.control = control ;
        this.key = key;
        this.input = input;

        this.key = this.input.keyboard.createCursorKeys();
        this.input.addPointer(3);
    }

    Movement(player, input){
        //define action

        //if key UP pressed
        if(input.pointer1.isDown)
        {
            if((this.input.pointer1.x < (Constants.BTN_RIGHT_X + Constants.BTN_RADIUS) && this.input.pointer1.x > (Constants.BTN_RIGHT_X - Constants.BTN_RADIUS) )){
                player.setVelocityX(200);
                player.anims.play('right', true);
            } else if((this.input.pointer1.x < (Constants.BTN_LEFT_X + Constants.BTN_RADIUS) && this.input.pointer1.x > (Constants.BTN_LEFT_X - Constants.BTN_RADIUS) )){
                player.setVelocityX(-200);
                player.anims.play('left', true);
            } else if((this.input.pointer1.x < (Constants.BTN_UP_X + Constants.BTN_RADIUS) && this.input.pointer1.x > (Constants.BTN_UP_X - Constants.BTN_RADIUS)) && player.body.touching.down){
                player.setVelocityY(-420);
            }

            if((this.input.pointer2.x< (Constants.BTN_UP_X + Constants.BTN_RADIUS) && this.input.pointer2.x > (Constants.BTN_UP_X - Constants.BTN_RADIUS)) && player.body.touching.down){
                player.setVelocityY(-420);
            }
        } 
        else
        // switch to "neutral position"
        {
            input.pointer1.x=0;
            input.pointer2.x=0;
            player.setVelocityX(0);
            // player.anims.play('turn');
        }	

        // if keyboard left pressed
        if (this.key.left.isDown)
        {
            player.setVelocityX(-200);
            player.anims.play('left', true);
        }
        else if (this.key.right.isDown)
        {
            player.setVelocityX(200);
            player.anims.play('right', true);
        }
        
        if (this.key.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-420);
        } 
    }
    
}