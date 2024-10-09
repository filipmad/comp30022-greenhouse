class Shop extends Phaser.Scene {

	constructor() {
		super("Shop");
	}

	create() {
		const background = this.add.image(0, 0, "ShopBackground").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;

		const smallPopup = this.add.rectangle(100, 150, 585, 400, 0xffffff, 0.92).setOrigin(0, 0);
		smallPopup.visible = false;
		smallPopup.setInteractive();
		const mediumPopup = this.add.rectangle(100, 150, 585, 400, 0xffffff, 0.92).setOrigin(0, 0);
		mediumPopup.visible = false;
		mediumPopup.setInteractive();
		const largePopup = this.add.rectangle(100, 150, 585, 400, 0xffffff, 0.92).setOrigin(0, 0);
		largePopup.visible = false;
		largePopup.setInteractive();

		// Add a hit rectangle on all 4 signs of the shop to make them clickable
		const hitRect1 = this.add.rectangle(270, 20, 185, 100).setOrigin(0, 0);
		hitRect1.setInteractive();
		hitRect1.on('pointerdown', () => {
			smallPopup.visible = true;
			mediumPopup.visible = false;
			largePopup.visible = false;
		});

		const hitRect2 = this.add.rectangle(475, 20, 190, 100).setOrigin(0, 0);
		hitRect2.setInteractive();
		hitRect2.on('pointerdown', () => {
			smallPopup.visible = false;
			mediumPopup.visible = true;
			largePopup.visible = false;
		});

		const hitRect3 = this.add.rectangle(685, 20, 185, 100).setOrigin(0, 0);
		hitRect3.setInteractive();
		hitRect3.on('pointerdown', () => {
			smallPopup.visible = false;
			mediumPopup.visible = false;
			largePopup.visible = true;
		});

		const hitRect4 = this.add.rectangle(725, 135, 110, 40).setOrigin(0, 0);
		hitRect4.setInteractive();
		hitRect4.on('pointerdown', () => {
			this.scene.start("Level");
		});

		// When anywhere else is clicked, close the popup unless it's the popup itself
		
		background.setInteractive();
		background.on('pointerdown', () => {
			smallPopup.visible = false;
			mediumPopup.visible = false;
			largePopup.visible = false;
		});
		



	}
}