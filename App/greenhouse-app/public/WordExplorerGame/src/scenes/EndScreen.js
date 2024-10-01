class EndScreen extends Phaser.Scene {
	constructor() {
		super("EndScreen");
	}

	preload() {
		this.mainGroup = this.add.group();
	}

	create() {
		const centerX = this.cameras.main.width / 2;
		const centerY = this.cameras.main.height / 2;

		const logo = this.add.image(centerX, centerY - 80, "logo");
		logo.setOrigin(0.5, 0.5);
		this.mainGroup.add(logo);

		const playAgainButton = this.add.text(centerX, centerY + 70, "Play", {
			color: "#ffffff",
			fontFamily: "Arial",
			fontSize: "40px",
			backgroundColor: "#4caf50",
			padding: { x: 60, y: 5 }
		});
		playAgainButton.setOrigin(0.5, 0.5);
		playAgainButton.setInteractive();
		this.mainGroup.add(playAgainButton);

		playAgainButton.on('pointerover', () => {
			playAgainButton.setScale(1.1);
		});
		playAgainButton.on('pointerout', () => {
			playAgainButton.setScale(1);
		});

		// Add functionality to restart the game when the button is clicked
		playAgainButton.on('pointerdown', () => {
			this.scene.start("Level");
		});

		const instructions = this.add.text(centerX, centerY + 140, "Click the button to play again!", {
			fontSize: '24px',
			color: '#ffffff'
		}).setOrigin(0.5, 0.5);
		this.mainGroup.add(instructions);

		this.mainGroup.setAlpha(0); // Hide all elements initially

		this.tweens.add({
            targets: this.mainGroup.getChildren(),
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Power1',
        });
	}
}