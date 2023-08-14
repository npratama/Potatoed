import * as Constants from "./Constants.js";

export class Platform {
    platform;
    physics;
    

    init(platform, physics){
        this.platform = platform ; 
        this.physics = physics ; 

        this.platform = this.physics.add.staticGroup();
        this.platform.create(Constants.SCREEN_X_MID, Constants.SCREEN_Y-32, 'sand_ground');

        for (var k = 1; k <= 4; k++) { 
			for (var i = 1; i <= 1; i++) {
	    		this.platform.create( Constants.SCREEN_X_MID + (Constants.BOX_SIZE_X * k), Constants.SCREEN_Y_MID + 100 + (Constants.BOX_SIZE_Y * i), 'box');
			}
		}

		for (var k = 1; k <= 12; k++) { 
			for (var i = 1; i <= 1; i++) {
	    		this.platform.create(Constants.SCREEN_X_MID + (Constants.BOX_SIZE_X * k) - 500, Constants.SCREEN_Y_MID - 100 + (Constants.BOX_SIZE_Y * i), 'box');
			}
		}

		for (var k = 1; k <= 6; k++) { 
			for (var i = 1; i <= 1; i++) {
	    		this.platform.create(Constants.SCREEN_X_MID + (Constants.BOX_SIZE_X * k) + 300, Constants.SCREEN_Y_MID - 100+(Constants.BOX_SIZE_Y * i), 'box');
			}
		}
       
    }
}