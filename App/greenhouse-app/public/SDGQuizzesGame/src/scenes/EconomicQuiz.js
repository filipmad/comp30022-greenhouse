class EconomicQuiz extends Phaser.Scene {
	constructor() {
		super("EconomicQuiz");
	}

	create(){
		const economicLink = this.add.image(1067/3 - 1, 0, "economy").setOrigin(0, 0);
		economicLink.displayWidth = 1067/3 + 1;
		economicLink.displayHeight = 600;
	}
}