class Shop extends Phaser.Scene {

	constructor() {
		super("Shop");
	}

	create() {
		const background = this.add.image(0, 0, "ShopBackground").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;
	
		const smallPopup = this.add.container(100, 150);
		const mediumPopup = this.add.container(100, 150);
		const largePopup = this.add.container(100, 150);
	
		const smallPopupBg = this.add.rectangle(0, 0, 585, 400, 0xffffff, 0.92).setOrigin(0, 0);
		const mediumPopupBg = this.add.rectangle(0, 0, 585, 400, 0xffffff, 0.92).setOrigin(0, 0);
		const largePopupBg = this.add.rectangle(0, 0, 585, 400, 0xffffff, 0.92).setOrigin(0, 0);

		const addBorder = (x, y, width, height, color, lineWidth) => {
			const border = this.add.graphics();
			border.lineStyle(lineWidth, color, 1);
			border.strokeRect(x, y, width, height);
			return border;
		};
	

		const smallPopupBorder = addBorder(0, 0, 585, 400, 0x000000, 4);
		const mediumPopupBorder = addBorder(0, 0, 585, 400, 0x000000, 4);
		const largePopupBorder = addBorder(0, 0, 585, 400, 0x000000, 4);
	
		smallPopup.add(smallPopupBg);
		smallPopup.add(smallPopupBorder);
		mediumPopup.add(mediumPopupBg);
		mediumPopup.add(mediumPopupBorder);
		largePopup.add(largePopupBg);
		largePopup.add(largePopupBorder);
	
		smallPopup.visible = false;
		mediumPopup.visible = false;
		largePopup.visible = false;
	

		const addItemToPopup = (popup, yPosition, iconKey, description, price) => {
			// Plant icon on the left
			const icon = this.add.image(45, yPosition, iconKey);
			icon.displayWidth = 50;
			icon.displayHeight = 50;
			popup.add(icon);
	
			// Plant description in the middle
			const desc = this.add.text(100, yPosition - 15, description, {
				fontFamily: "Arial",
				fontSize: "16px",
				color: "#000000",
			});
			popup.add(desc);
	
			// Price and buy button on the right
			const priceText = this.add.text(350, yPosition - 15, `${price} Coins`, {
				fontFamily: "Arial",
				fontSize: "16px",
				color: "#000000",
			});
			popup.add(priceText);
	

			const buyButton = this.add.rectangle(500, yPosition - 5, 50, 20, 0x00ff00).setInteractive();
			const buyText = this.add.text(490, yPosition - 13, "Buy", {
				fontFamily: "Arial",
				fontSize: "12px",
				color: "#ffffff",
			});
			buyButton.on("pointerdown", () => {
				console.log(`Bought ${description} for $${price}`);
			});
			popup.add(buyButton);
			popup.add(buyText);
		};
	
		addItemToPopup(smallPopup, 50, "SmallBud", "The Basic Bud", 10);
		addItemToPopup(smallPopup, 150, "SmallBud1", "Rare Bud", 50);
		addItemToPopup(mediumPopup, 50, "MediumBud", "Regular Bush", 30);
		addItemToPopup(largePopup, 50, "LargeBud", "Baby Tree", 100);
	
		// Hit rectangles for shop signs
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