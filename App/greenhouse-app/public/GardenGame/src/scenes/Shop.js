class Shop extends Phaser.Scene {

	constructor() {
		super("Shop");
		this.plants = this.getShopPlants();
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
	

		const addItemToPopup = (popup, yPosition, iconKey, description, price, id) => {
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
	

			const buyButton = this.add.rectangle(500, yPosition - 5, 50, 20, 0x00ff00).setInteractive({useHandCursor: true});
			const buyText = this.add.text(490, yPosition - 13, "Buy", {
				fontFamily: "Arial",
				fontSize: "12px",
				color: "#ffffff",
			});
			buyButton.on("pointerdown", () => {
				this.purchasePlant(id, price, description);
			});
			popup.add(buyButton);
			popup.add(buyText);
		};

		let smallCount = 0;
		let mediumCount = 0;
		let largeCount = 0;
		for (const plant of this.plants) {
			switch (plant.size) {
				case "small": {
					addItemToPopup(smallPopup, 50 + 100 * smallCount, plant.name, plant.name, plant.value, plant.id);
					smallCount++;
                    break;
                }
				case "medium": {
                    addItemToPopup(mediumPopup, 50 + 100 * mediumCount, plant.name, plant.name, plant.value, plant.id);
					mediumCount++;
                    break;
                }
				case "large": {
                    addItemToPopup(largePopup, 50 + 100 * largeCount, plant.name, plant.name, plant.value, plant.id);
					largeCount++;
                    break;
                }
				default: {
                    console.error(`Invalid plant size: ${plant.size}`);
                }
			}
		}

	
		// Hit rectangles for shop signs
		const hitRect1 = this.add.rectangle(270, 20, 185, 100).setOrigin(0, 0);
		hitRect1.setInteractive({useHandCursor: true});
		hitRect1.on('pointerdown', () => {
			smallPopup.visible = true;
			mediumPopup.visible = false;
			largePopup.visible = false;
		});
	
		const hitRect2 = this.add.rectangle(475, 20, 190, 100).setOrigin(0, 0);
		hitRect2.setInteractive({useHandCursor: true});
		hitRect2.on('pointerdown', () => {
			smallPopup.visible = false;
			mediumPopup.visible = true;
			largePopup.visible = false;
		});
	
		const hitRect3 = this.add.rectangle(685, 20, 185, 100).setOrigin(0, 0);
		hitRect3.setInteractive({useHandCursor: true});
		hitRect3.on('pointerdown', () => {
			smallPopup.visible = false;
			mediumPopup.visible = false;
			largePopup.visible = true;
		});
	
		const hitRect4 = this.add.rectangle(725, 135, 110, 40).setOrigin(0, 0);
		hitRect4.setInteractive({useHandCursor: true});
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

	getShopPlants() {
		// Get plants from the database (for simplicity, just provide all plants we have)
		// data format for plant: { id, name, size, value }

		// Example data:
		return [
            { id: 1, name: "Basic Bud", size: "small", value: 10 },
            { id: 2, name: "Rare Bud", size: "small", value: 50 },
            { id: 3, name: "Regular Bush", size: "medium", value: 30 },
            { id: 4, name: "Baby Tree", size: "large", value: 100 },
        ];
	}

	purchasePlant(id, price, description) {
		const coins = this.getPlayersCoins();
		if (coins >= price) {
			// Remove coins from player's account
            this.setPlayersCoins(coins - price);
			
            // Add the plant to the player's inventory
			this.addPlantToInventory(id);

			console.log(`Bought ${description} for $${price}`);
		}
		else {
            // Display a message to the player saying they don't have enough coins.
            console.log("Not enough coins to buy this plant.");
            return;
        }
	}

	getPlayersCoins() {
        // Get the current number of coins the player has from the database.
		const coins = 120;
        return coins;
    }

	setPlayersCoins(coins) {
        // Update the current number of coins the player has in the database.
    }

	addPlantToInventory(id) {
        // Add the plant with the given ID to the player's inventory (database with garden position 0).
    }
}