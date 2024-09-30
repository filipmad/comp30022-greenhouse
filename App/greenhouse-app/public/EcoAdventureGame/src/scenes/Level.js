class Level extends Phaser.Scene {
    constructor() {
        super("Level");

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
		this.distanceScore = 0; // Initialize the distance score
    }

    create() {

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
}


