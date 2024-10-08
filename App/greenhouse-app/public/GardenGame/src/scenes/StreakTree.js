class StreakTree extends Phaser.Scene {

	constructor() {
		super("StreakTree");
	}

	create() {
		const background = this.add.image(0, 0, "FullTree").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;
	}
}