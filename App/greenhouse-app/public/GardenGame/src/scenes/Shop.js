class Shop extends Phaser.Scene {

	constructor() {
		super("Shop");
	}

	create() {
		const background = this.add.image(0, 0, "ShopBackground").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;
	}
}