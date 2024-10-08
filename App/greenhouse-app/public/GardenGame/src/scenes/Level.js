class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		//initialize plants from the database
		this.plants = this.getPlayerPlants();
	}

	create() {
		// Create Background
		const background = this.add.image(-1, 0, "GardenBackground").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;

		// Generate frames for animation dynamically
		const frames = [];
		for (let i = 1; i <= 60; i++) {
			frames.push({ key: "File" + i });
		}
	
		// Create animation using the generated frames
		this.anims.create({
			key: "greenArrowAnimation",
			frames: frames,
			frameRate: 10, // Adjust this to change the speed of the animation
			repeat: -1 // Loop the animation
		});
	
		// Create a sprite and play the animation
		const arrowSprite = this.add.sprite(550, 30, "File1"); // Default to the first frame
		arrowSprite.displayWidth = 50;
		arrowSprite.displayHeight = 50;
		arrowSprite.play("greenArrowAnimation");

		// Set the arrow as interactive to respond to clicks
		arrowSprite.setInteractive();

		const rect = this.add.rectangle(550, 140, 90, 160);
	
		// Make the rectangle interactive as well
		rect.setInteractive();
	
		// Event listener for clicking the arrow sprite
		arrowSprite.on("pointerdown", () => {
			this.goToShop();
		});
	
		// Event listener for clicking the rectangle below the arrow
		rect.on("pointerdown", () => {
			this.goToStreakTree();
		});
	}

	getPlayerPlants() {
		// Get plants from the database
	}

	goToShop() {
		// Go to the shop scene
		this.scene.start("Shop");
	}
	goToStreakTree() {
		// Go to the streak tree scene
		this.scene.start("StreakTree");
	}

	movePlant(plant, location) {
		// Move the plant to a new location
	}

	examinePlant(plant) {
		// Examine the plant
	}

	// Make functions for each plant type to allow for changing the plant's state and visuals in the game depending on position, growth, etc.
}

