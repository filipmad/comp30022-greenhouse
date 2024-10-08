class Level extends Phaser.Scene {

	constructor() {
		super("Level");
	}

	create() {
		const socialLink = this.add.image(-1, 0, "social").setOrigin(0, 0);
		socialLink.displayWidth = 1067/3;
		socialLink.displayHeight = 600;

		socialLink.setInteractive();
		socialLink.on("pointerdown", () => {
			this.scene.start("SocialQuiz");
		});

		const economicLink = this.add.image(1067/3 - 1, 0, "economy").setOrigin(0, 0);
		economicLink.displayWidth = 1067/3 + 1;
		economicLink.displayHeight = 600;

		economicLink.setInteractive();
		economicLink.on("pointerdown", () => {
			this.scene.start("EconomicQuiz");
		});

		const environmentalLink = this.add.image(1067/3*2, 0, "environment").setOrigin(0, 0);
		environmentalLink.displayWidth = 1067/3;
		environmentalLink.displayHeight = 600;

		environmentalLink.setInteractive();
		environmentalLink.on("pointerdown", () => {
			this.scene.start("EnvironmentalQuiz");
		});
	}

}

