import {Star} from "./assets/Star.js";
import {Player} from "./assets/Player.js";
import {Bomb} from "./assets/Bomb.js";
import {Platform} from "./assets/Platform.js";
import {Control} from "./assets/Control.js";

import * as Constants from "./assets/Constants.js";

var config = {
    type: Phaser.CANVAS,
    width: Constants.SCREEN_X,
    height: Constants.SCREEN_Y,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: Constants.GRAVITY },
            debug: false
        }
    },
    scene: {
        init: init2,
        preload: preload,
        create: create,
        update: update
    }
};

// CONIG END
// stars
const score = {number : 0};
let stars;
const star = new Star();

// Controller
let key;
const control = new Control(); 

// Player
let player;
const player1 = new Player();

// bomb
let bombs;
const bomb = new Bomb();

var game = new Phaser.Game(config);

// platform
var platforms;
const platform = new Platform();

var scoreText;
var timedEvent;
var init=0;

let startBtn;
let stopBtn;
let bubble1;
let text;

function init2 ()
{
    if(init==0)
    {
        var canvas = this.sys.game.canvas;
        var fullscreen = this.sys.game.device.fullscreen;

        if (!fullscreen.available)
        {
            return;
        }

        startBtn = document.createElement('button');
        stopBtn = document.createElement('button');

        startBtn.textContent = 'Start Fullscreen';
        stopBtn.textContent = 'Stop Fullscreen';
        startBtn.style.width = '100%'; // setting the width to 20 px
        startBtn.style.fontSize = '50px'; // setting the width to 20 px
        
        startBtn.style.color = 'teal'; // setting the color to teal

        canvas.parentNode.appendChild(startBtn);
        canvas.parentNode.appendChild(stopBtn);

        startBtn.addEventListener('click', function ()
        {
            if (document.fullscreenElement) { return; }

            canvas[fullscreen.request]();
        });

        stopBtn.addEventListener('click', function ()
        {
            document[fullscreen.cancel]();
        });
        init=1;
    }
}


function preload ()
{
    this.load.image('sky', 'assets/img/sky.png');
    this.load.image('ground', 'assets/img/platform.png');
    this.load.image('beddings', 'assets/img/beddings.png');
    this.load.image('box', 'assets/img/box.png');
    this.load.image('sand_ground', 'assets/img/ground.png');

    this.load.image('star', 'assets/img/star.png');
    
    this.load.image('bomb', 'assets/img/bomb.png');

    this.load.spritesheet('dude', 'assets/img/dude.png', { frameWidth: 60, frameHeight: 64 });

    this.load.image('btn_up', 'assets/img/control/btn_up.png');
    this.load.image('btn_down', 'assets/img/control/btn_down.png');
    this.load.image('btn_left', 'assets/img/control/btn_left.png');
    this.load.image('btn_right', 'assets/img/control/btn_right.png');
    this.load.image('bubble1', 'assets/img/bubble1.png');
    this.load.image('cake', 'assets/img/cake.png');
    this.load.audio('bgm', ['assets/audio/Happy walk.mp3', 'assets/audio/Happy walk.mp3']);
}

function create ()
{
    // music = this.sound.add('bgm');
    // music.play();

    //background
    this.add.image(Constants.SCREEN_X_MID, Constants.SCREEN_Y_MID, 'sky');
    this.add.image(Constants.SCREEN_X_MID, Constants.SCREEN_Y - 88, 'beddings');

    //platform
    platform.init(platforms, this.physics, this);
    
    // spawn player - start  
    player1.init(this.physics, player, this.anims);
    
    // spawn bomb
    bomb.init(bombs, this.physics, player1.players);

    // spawn stars
    star.init(stars, this.physics, score, bomb);

    //set control
    control.init( key, this.input, player1.players);

    // put button icon for touch control
    var sprite1 = this.add.sprite(Constants.BTN_UP_X, Constants.BTN_UP_Y, 'btn_up');
    var sprite2 = this.add.sprite(Constants.BTN_LEFT_X,  Constants.BTN_LEFT_Y, 'btn_left'); 
    var sprite3 = this.add.sprite(Constants.BTN_RIGHT_X,  Constants.BTN_RIGHT_Y, 'btn_right');

    // update score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    scoreText.setText('Score: ' + score.number);
   
    bubble1=this.add.sprite(player1.players.x, player1.players.y, 'bubble1');
    text = this.add.text(16, 116, "   Me hungry !", { fontSize: '20px', fill: '#000' ,fontFamily: "comic sans"});

    timedEvent = this.time.delayedCall(3000, onEvent, [], this);
}


function update ()
{
    // set score
    scoreText.setText('Score: ' + score.number);

    //player movement handler
    control.Movement();

    //check player collider
    player1.checkCollider(platform.platform);

    //check star collider
    star.checkCollider(platform.platform, player1.players, key);

    //check bomb collider
    bomb.checkCollider(platform.platform, player1.players, stars);

    // spawn bubble text
    bubble1.x = player1.players.x+50;
    bubble1.y = player1.players.y-90;
    text.x = player1.players.x-20;
    text.y = player1.players.y-120;

    // Your game scenario is just this
    // if stars are all collected, spawn more stars, spawn one more bomb
    if (star.stars.countActive(true) === 0)
    {
        //spawn star
        star.spawnObject(5);
        // spawn bomb
        bomb.spawn();
    }
    else
    // if hit the bomb
    if(bomb.hit)  
        this.time.delayedCall(3000, reloadGame, [], this);
    
}

function reloadGame(){
    // gameOver = false;
    // music.stop();
    
    scoreText.setText('Score: ' + score.number);
    score.number = 0;
    this.scene.restart();
}

function onEvent(){
    text.visible = false;	
    bubble1.visible = false;
}