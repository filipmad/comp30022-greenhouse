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

		this.addSmallBud(1, "SmallBud");
		this.addSmallBud(2 , "SmallBud1");
		this.addSmallBud(4 , "SmallBud");
		this.addSmallBud(5 , "SmallBud1");
		this.addSmallBud(6 , "SmallBud");
		this.addSmallBud(7 , "SmallBud1");
		this.addSmallBud(12 , "SmallBud");
		this.addSmallBud(13 , "SmallBud1");
		this.addSmallBud(14 , "SmallBud");
		this.addSmallBud(15 , "SmallBud1");
		this.addSmallBud(17 , "SmallBud");
		this.addSmallBud(18 , "SmallBud1");

		this.addMediumBud(3, "MediumBud");
		this.addMediumBud(8, "MediumBud");
		this.addMediumBud(11, "MediumBud");
		this.addMediumBud(16, "MediumBud");

		this.addLargeBud(9, "LargeBud");
		this.addLargeBud(10, "LargeBud");

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

	// Small plants can only be in positions 1 2 4 5 6 7 12 13 14 15 17 18, medium plants in positions 3 8 11 16, and large plants in positions 9 10
	addSmallBud(position, sprite) {
		let xPosition, yPosition, scale;
		switch (position) {
			case 1:
				xPosition = 210;
				yPosition = 390;
				scale = 0.3;
				break;
			case 2:
				xPosition = 110;
				yPosition = 390;
				scale = 0.3;
				break;
			case 4:
				xPosition = 55;
				yPosition = 300;
				scale = 0.27;
				break;
			case 5:
				xPosition = 120;
				yPosition = 250;
				scale = 0.24;
				break;
			case 6:
				xPosition = 185;
				yPosition = 200;
				scale = 0.21;
				break;
			case 7:
				xPosition = 230;
				yPosition = 175;
				scale = 0.18;
				break;
			case 12:
				xPosition = 760;
				yPosition = 180;
				scale = 0.18;
				break;
			case 13:
				xPosition = 785;
				yPosition = 205;
				scale = 0.21;
				break;
			case 14:
				xPosition = 830;
				yPosition = 250;
				scale = 0.24;
				break;
			case 15:
				xPosition = 870;
				yPosition = 290;
				scale = 0.27;
				break;
			case 17:
				xPosition = 820;
				yPosition = 390;
				scale = 0.3;
				break;
			case 18:
				xPosition = 720;
				yPosition = 390;
				scale = 0.3;
				break;
		}
		const bud = this.add.image(xPosition, yPosition, sprite).setOrigin(0, 0);
		bud.scale = scale;
	}
	addMediumBud(position, sprite) {
		let xPosition, yPosition, scale;
		switch (position) {
			case 3:
				xPosition = 10;
				yPosition = 420;
				scale = 0.18;
				break;
			case 8:
				xPosition = 290;
				yPosition = 137;
				scale = 0.1;
				break;
			case 11:
				xPosition = 725;
				yPosition = 137;
				scale = 0.1;
				break;
			case 16:
				xPosition = 960;
				yPosition = 420;
				scale = 0.18;
				break;
		}
		const bud = this.add.image(xPosition, yPosition, sprite).setOrigin(0, 0);
		bud.scale = scale;
	}
	addLargeBud(position, sprite) {
		let xPosition, yPosition, scale, flip;
		switch (position) {
			case 9:
				xPosition = 365;
				yPosition = 90;
				scale = 0.25;
				flip = false;
				break;
			case 10:
				xPosition = 600;
				yPosition = 90;
				scale = 0.25;
				flip = true;
				break;
		}
		const bud = this.add.image(xPosition, yPosition, sprite).setOrigin(0, 0);
		bud.scale = scale;
		bud.setFlipX(flip);
	}
}

