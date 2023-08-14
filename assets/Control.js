import * as Constants from "./Constants.js";

export class Control {
    control;
    key;
    input;
    touch;
    player;

    init(control, key, input, player){
        this.control = control ;
        // bind player
        this.player = player;
        // add keyboard
        this.key = key;
        this.input = input;
        // add pointer
        this.input.addPointer(3);

        this.touch = this.input;
        this.key = this.input.keyboard.createCursorKeys();
    }

    Movement(){
        //define action

        // if key UP pressed
        if(this.touch.pointer1.isDown)
        {
            if((this.touch.pointer1.x < (Constants.BTN_RIGHT_X + Constants.BTN_RADIUS) && this.touch.pointer1.x > (Constants.BTN_RIGHT_X - Constants.BTN_RADIUS) )){
                this.player.setVelocityX(200);
                this.player.anims.play('right', true);
            } else if((this.touch.pointer1.x < (Constants.BTN_LEFT_X + Constants.BTN_RADIUS) && this.touch.pointer1.x > (Constants.BTN_LEFT_X - Constants.BTN_RADIUS) )){
                this.player.setVelocityX(-200);
                this.player.anims.play('left', true);
            } else if((this.touch.pointer1.x < (Constants.BTN_UP_X + Constants.BTN_RADIUS) && this.touch.pointer1.x > (Constants.BTN_UP_X - Constants.BTN_RADIUS)) && player.body.touching.down){
                this.player.setVelocityY(-420);
            }

            if((this.touch.pointer2.x< (Constants.BTN_UP_X + Constants.BTN_RADIUS) && this.touch.pointer2.x > (Constants.BTN_UP_X - Constants.BTN_RADIUS)) && player.body.touching.down){
                this. player.setVelocityY(-420);
            }
        } 
        else
        // switch to "neutral position"
        {
            this.touch.pointer1.x=0;
            this.touch.pointer2.x=0;
            this.player.setVelocityX(0);
            // player.anims.play('turn');
        }	

        // if keyboard left pressed
        if (this.key.left.isDown)
        {
            
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (this.key.right.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        
        if (this.key.up.isDown &&this.player.body.touching.down)
        {
            this.player.setVelocityY(-420);
        } 
    }
    
}