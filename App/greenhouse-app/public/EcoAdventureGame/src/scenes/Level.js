class Level extends Phaser.Scene {

    constructor() {
        super("Level");
        this.highScore = 0; // Initialize the high score (from the database)
    }

    initValues() {
        this.isJumping = false;  // Track whether the character is in the air
        this.jumpSpeed = 800;     // The speed at which the character moves up/down
        this.gravity = 1500;      // Simulate gravity
        this.velocityY = 0;       // Vertical velocity
        this.groundY = 600 - 30;  // The Y position where the character stands
        this.isScrolling = true;   // Flag to control background scrolling
        this.trees = [];           // Array to store tree sprites
        this.treeSpawnDistance = 300; // Distance to spawn a new tree
        this.treeSpawnInterval = Phaser.Math.Between(500, 3000); // Random interval between 500 and 3000
        this.lastTreeX = 700;      // Position of the last tree spawned
        this.scrollOffset = 0;     // Track the total scroll offset
        this.nextSpawnTime = 0;    // Track time until the next tree spawn
		this.distanceScore = 0;    // Initialize the distance score
    }

    create() {

        // Need to call this in create() to reset the values when restarting the game from EndScreen
        this.initValues();

        // Create a group to hold all the game objects if needed (may need to do this when adding more objects)
        this.mainGroup = this.add.group();

		// Start with a black rectangle covering the screen for fade-in
		const fadeRectangle = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
		fadeRectangle.setOrigin(0, 0);
		fadeRectangle.setAlpha(1);
		fadeRectangle.setDepth(1000);

		// Fade in the new scene
		this.tweens.add({
    		targets: fadeRectangle,
    		alpha: { from: 1, to: 0 },
    		duration: 300,
    		onComplete: () => {
        		fadeRectangle.destroy();
    		}
		});

        const screenWidth = 1067;
        const screenHeight = 600;

        const originalWidth = 288;
        const originalHeight = 208;

        const scaleX = screenWidth / originalWidth;
        const scaleY = screenHeight / originalHeight;

        // Add the background image twice to create a scrolling effect
        this.background1 = this.add.image(0, 0, '_Complete_static_BG_(288 x 208)_4').setOrigin(0, 0);
        this.background2 = this.add.image(screenWidth, 0, '_Complete_static_BG_(288 x 208)_4').setOrigin(0, 0);

        this.background1.setScale(scaleX, scaleY);
        this.background2.setScale(scaleX, scaleY);

		// Create a text object to display the distance score
		this.scoreText = this.add.text(10, 10, 'Distance: 0', { fontSize: '32px', fill: '#fff' });

        // Create a text object to display the user's high score
        this.highScoreText = this.add.text(10, 50, 'High Score: ' + this.highScore, { fontSize: '32px', fill: '#fff' });

        // Add the character sprite (fixed position)
        this.character = this.physics.add.sprite(50, this.groundY, 'FinnSprite').setOrigin(0, 1);
        this.character.setScale(3);

		// Character collision box
        this.character.setSize(12, 15);
        this.character.setOffset(7, 9);
        this.character.setCollideWorldBounds(true);

        // Different animations for the character
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('FinnSprite', { start: 9, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'FinnSprite', frame: 15 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('FinnSprite', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'loss',
            frames: this.anims.generateFrameNumbers('FinnSprite', { start: 20, end: 20 }),
            frameRate: 10,
            repeat: -1
        });

        this.character.play('run');

        this.input.keyboard.on('keydown-SPACE', this.startJump, this);
        this.input.on('pointerdown', this.startJump, this);

        // Spawn the first tree
        this.spawnTree(this.lastTreeX);

        // Setup collision
        this.physics.add.collider(this.character, this.trees, this.hitTree, null, this);
    }

    update(time, delta) {
        if (this.isScrolling) {
            const scrollSpeed = 2;

            this.background1.x -= scrollSpeed;
            this.background2.x -= scrollSpeed;
            this.trees.forEach(tree => { tree.x -= scrollSpeed; });

            this.scrollOffset += scrollSpeed;

            // Update lastTreeX based on the scrolling
            this.lastTreeX -= scrollSpeed;

            // Reset position if background moves off screen
            if (this.background1.x <= -this.background1.displayWidth) {
                this.background1.x = this.background2.x + this.background2.displayWidth;
            }
            if (this.background2.x <= -this.background2.displayWidth) {
                this.background2.x = this.background1.x + this.background1.displayWidth;
            }

            // Check if we need to spawn a new tree
            if (time > this.nextSpawnTime && this.character.x > this.lastTreeX - this.treeSpawnDistance) {
                this.spawnTree(this.lastTreeX + this.treeSpawnInterval);

                // Generate a new random spawn interval for the next tree
                this.treeSpawnInterval = Phaser.Math.Between(500, 3000);
                this.nextSpawnTime = time + this.treeSpawnInterval; // Set the next spawn time
            }

			// Update the distance score
			this.distanceScore += scrollSpeed * (delta / 1000);
			this.scoreText.setText('Distance: ' + Math.floor(this.distanceScore));

            // Update the high score if the distance score is higher
            if (this.distanceScore > this.highScore) {
                this.highScore = Math.floor(this.distanceScore);
                this.highScoreText.setText('High Score: ' + this.highScore);
            }
        }

        // Handle character jump physics
        if (this.isJumping) {
            this.velocityY += this.gravity * (delta / 1000);
            this.character.y += this.velocityY * (delta / 1000);

            if (this.character.y >= this.groundY) {
                this.character.y = this.groundY;
                this.velocityY = 0;
                this.isJumping = false;
				if (this.isScrolling) {
                	this.character.play('run');
				}
            }
        }
    }

    startJump() {

        // Only allow jumping if not hitting the tree
        if (!this.isJumping && this.isScrolling) {
            this.isJumping = true;
            this.velocityY = -this.jumpSpeed;
            this.character.play('jump');
        }
    }

    hitTree(character, tree) {
        this.physics.pause();
        character.play('hurt');
        this.isScrolling = false;

        // Check if the hurt animation has finished, then play the loss animation
        character.once('animationcomplete', (anim) => {
            if (anim.key === 'hurt') {
                character.play('loss');

                // Call the displayGameOver method after the hurt animation
                this.time.delayedCall(500, () => {
                    this.displayGameOver(); // Transition to game over screen
            });
            }
        });

    }

    spawnTree(xPosition) {
        const tree = this.physics.add.sprite(xPosition, this.groundY - 16, 'Grassland_entities (16 x 16)', 0).setOrigin(0, 1);
        tree.setScale(3);

		// Tree collision box
        tree.setSize(20, 35);
        tree.setOffset(30, 25);

        this.trees.push(tree);
        this.lastTreeX = xPosition; // Update the last tree's position
    }

    displayGameOver() {

	    // Disable input on current scene
		this.input.enabled = false;
		
		// Create a semi-transparent black background
		const overlay = this.add.rectangle(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			this.cameras.main.width,
			this.cameras.main.height,
			0x000000,
			0.8
		);
		overlay.setOrigin(0.5, 0.5);
		overlay.setDepth(9999);
		this.mainGroup.add(overlay);

		this.tweens.add({
    		targets: overlay,
    		alpha: { from: 0, to: 1 },
    		duration: 1000,
		});
	
		// Create the game over text
		const gameOverText = this.add.text(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			'Game Over',
			{
				fontSize: '48px',
				color: '#ffffff',
				fontStyle: 'bold',
			}
		);
		gameOverText.setOrigin(0.5, 0.5);
		gameOverText.setDepth(10000);
		this.mainGroup.add(gameOverText);
	

		this.tweens.add({
			targets: gameOverText,
			scale: { from: 1, to: 1.2 },
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut',
			duration: 1000,
		});

		this.tweens.addCounter({
			from: 0,
			to: 100,
			duration: 2000,
			repeat: -1,
			yoyo: true,
			onUpdate: (tween) => {
				const progress = tween.getValue();
				const newColor = Phaser.Display.Color.Interpolate.ColorWithColor(
                    Phaser.Display.Color.ValueToColor(0xff0000),
                    Phaser.Display.Color.ValueToColor(0x800000),
					100,
					progress
				);
				const hexColor = Phaser.Display.Color.RGBToString(newColor.r, newColor.g, newColor.b, newColor.a, '#');
				gameOverText.setColor(hexColor);
			}
		});
	
		this.tweens.add({
			targets: gameOverText,
			alpha: { from: 0, to: 1 },
			duration: 1000,
		});

        // Send high score to the database
        this.sendHighScoreToDatabase(this.highScore);

		// Delay a little to show the game over message
		this.time.delayedCall(3000, () => {
			this.transitionToEndScreen();
		});
		
	}

    transitionToEndScreen() {

		// Want to display the EndScreen scene over the Level scene as a popup
		const endScreen = this.scene.get('EndScreen');
		this.scene.run('EndScreen');
	
	}

    sendHighScoreToDatabase(score) {
        // Send the high score to the database
        console.log('High score: ' + score);
    }
}


