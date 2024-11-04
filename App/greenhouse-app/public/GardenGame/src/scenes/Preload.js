class Preload extends Phaser.Scene {
	constructor() {
		super("Preload");
	}

	preload() {

		const centerX = this.cameras.main.width / 2;
		const centerY = this.cameras.main.height / 2;

		const logo = this.add.image(centerX, centerY - 50, "logo");
		logo.setOrigin(0.5, 0.5);

		const progressBarBg = this.add.rectangle(centerX, centerY + 50, 300, 30);
		progressBarBg.setOrigin(0.5, 0.5);
		progressBarBg.fillColor = 0x222222;
		progressBarBg.isStroked = true;
		progressBarBg.strokeColor = 0xffffff;
		progressBarBg.lineWidth = 2;

		const progressBar = this.add.rectangle(centerX - 150, centerY + 50, 0, 30);
		progressBar.setOrigin(0, 0.5);
		progressBar.isFilled = true;
		progressBar.fillColor = 0x4caf50;

		const loadingText = this.add.text(centerX, centerY + 100, "Loading...", {
			color: "#e0e0e0",
			fontFamily: "Arial",
			fontSize: "20px"
		});
		loadingText.setOrigin(0.5, 0.5);

		// Update progress bar
		this.load.on('progress', (value) => {
			progressBar.width = 300 * value;
		});

		// Fade loading text and progress bar after loading is complete
		this.load.on('complete', () => {
			this.tweens.add({
				targets: [loadingText, progressBar, progressBarBg],
				alpha: 0,
				duration: 750,
				onComplete: () => {
					loadingText.visible = false;
					progressBarBg.visible = false;
					progressBar.visible = false;

					// After fade-out, show the Play button
					this.showPlayButton(centerX, centerY);
				}
			});
		});

		this.load.pack("asset-pack", "assets/asset-pack.json");
		this.load.json("plant-catalogue", "assets/plant-catalogue.json");
	}

	create() {
		const centerX = this.cameras.main.width / 2;
		const centerY = this.cameras.main.height / 2;

		this.playButton = this.add.text(centerX, centerY + 50, "Play", {
			color: "#ffffff",
			fontFamily: "Arial",
			fontSize: "40px",
			backgroundColor: "#4caf50",
			padding: { x: 60, y: 5 }
		});
		this.playButton.setOrigin(0.5, 0.5);
		this.playButton.setInteractive();
		this.playButton.visible = false;

		this.playButton.on('pointerover', () => {
			this.playButton.setScale(1.1);
		});
		this.playButton.on('pointerout', () => {
			this.playButton.setScale(1);
		});

		// Add a click event on the Play button to trigger scene transition
		this.playButton.on('pointerdown', () => {
			this.fadeToScene("Level");
		});
	}

	showPlayButton(centerX, centerY) {
		this.playButton.visible = true;
		this.playButton.alpha = 0;

		this.tweens.add({
			targets: this.playButton,
			alpha: 1,
			duration: 750,
		});
	}

	fadeToScene(targetScene) {
		const fadeRectangle = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
		fadeRectangle.setOrigin(0, 0);
		fadeRectangle.setDepth(1000);
	
		this.tweens.add({
			targets: fadeRectangle,
			alpha: { from: 0, to: 1 },
			duration: 300,
			onComplete: () => {

				// Delay the scene change slightly to make sure fade-out completes
				this.time.delayedCall(100, () => {
					this.scene.start(targetScene);
				});
			}
		});
	}
}
