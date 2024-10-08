class SocialQuiz extends Phaser.Scene {
	constructor() {
		super("SocialQuiz");
	}

	create(){
		const socialLink = this.add.image(-1, 0, "social").setOrigin(0, 0);
		socialLink.displayWidth = 1067/3;
		socialLink.displayHeight = 600;
	}
}