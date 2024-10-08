class EnvironmentalQuiz extends Phaser.Scene {
	constructor() {
		super("EnvironmentalQuiz");
	}

	create(){
		const environmentalLink = this.add.image(1067/3*2, 0, "environment").setOrigin(0, 0);
		environmentalLink.displayWidth = 1067/3;
		environmentalLink.displayHeight = 600;
	}
}