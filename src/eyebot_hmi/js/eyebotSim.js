// Set up the configuration object for the simulation
const config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 1000,
	scene: {
        preload: preload,
        create: create,
        update: update
    },
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { },
            debug: false
        }
    }
};

// Create a simulation (game) instance using the configuration object
const eyebotSim = new Phaser.Game(config);

// Declare sim object vars for later use
var obstacles;
var eyebot;
var cursors;

// Function Definitions ---------------------------------------------------------------------------------------------------------

//------
// Preload Function: 
//
//------
function preload () {
	this.load.image('ground-light', './assets/lightConcreteTexture.png');
	this.load.image('ground-dark', './assets/darkGreyConcreteTexture.jpg');
	this.load.image('obstacle', './assets/woodSlab.jpg');
	this.load.image('eyebot', './assets/eyebot.png');

}

//------
// Create Function: 
//
//------
function create () {
	// Create the background
	//this.add.image(0, 0, 'ground-light').setOrigin(0, 0)
	this.add.image(0, 0, 'ground-dark').setOrigin(0, 0)

	// Create the obstacles 
	obstacles = this.physics.add.staticGroup();
	obstacles.create(500, 500, 'obstacle').setScale(0.4).refreshBody(); // refreshBody() because we have scaled a static physics body, so we need to tell the physics world about the changes
	
	// Create the eyebot
	eyebot = this.physics.add.sprite(100, 450, 'eyebot').setScale(0.15);
	eyebot.setCollideWorldBounds(true);

	// TODO: Set up the eyebot image as a sprite sheet
	// this.anims.create({
	// 	key: 'left',
	// 	frames: this.anims.generateFrameNumbers('eyebot', { start: 0, end: 3 }),
	// 	frameRate: 10,
	// 	repeat: -1
	// });
	
	// this.anims.create({
	// 	key: 'right',
	// 	frames: this.anims.generateFrameNumbers('eyebot', { start: 5, end: 8 }),
	// 	frameRate: 10,
	// 	repeat: -1
	// });
	
	// this.anims.create({
	// 	key: 'up',
	// 	frames: this.anims.generateFrameNumbers('eyebot', { start: 5, end: 8 }),
	// 	frameRate: 10,
	// 	repeat: -1
	// });
	
	// this.anims.create({
	// 	key: 'down',
	// 	frames: this.anims.generateFrameNumbers('eyebot', { start: 5, end: 8 }),
	// 	frameRate: 10,
	// 	repeat: -1
	// });

	// this.anims.create({
	// 	key: 'turn',
	// 	frames: [ { key: 'eyebot', frame: 4 } ],
	// 	frameRate: 20
	// });

	// Add the collisions between the eyebot and obstacles
	this.physics.add.collider(eyebot, obstacles);
}

//------
// Update Function: 
//
//------
function update () {

	// Instantiate the cusors as keyboard inputs
	cursors = this.input.keyboard.createCursorKeys();

	// Command velocity based on directional key
	if (cursors.left.isDown) {
		eyebot.setVelocityX(-160);
		// eyebot.anims.play('left', true);
	}
	else if (cursors.right.isDown) {
		eyebot.setVelocityX(160);
		// eyebot.anims.play('right', true);
	}
	else if (cursors.up.isDown) {
		eyebot.setVelocityY(-160);
		// eyebot.anims.play('up', true);
	}
	else if (cursors.down.isDown) {
		eyebot.setVelocityY(160);
		// eyebot.anims.play('down', true);
	}
	else{ // Stop moving
		eyebot.setVelocityX(0);
		eyebot.setVelocityY(0);
		// eyebot.anims.play('turn');
	}

}