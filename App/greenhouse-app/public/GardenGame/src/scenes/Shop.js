class Shop extends Phaser.Scene {

	constructor() {
		super({ key: "Shop" });
		this.smallPositions = [1, 2, 4, 5, 6, 7, 12, 13, 14, 15, 17, 18];
        this.mediumPositions = [3, 8, 11, 16];
        this.largePositions = [9, 10];
	}

	init(availablePositions) {
		this.availablePositions = availablePositions;
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

		this.plants = this.getShopPlants();
	

		const addItemToPopup = (popup, yPosition, iconKey, description, price, name, size) => {
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
				this.purchasePlant(name, price, size);
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
					addItemToPopup(smallPopup, 50 + 100 * smallCount, plant.name, plant.name, plant.value, plant.name, plant.size);
					smallCount++;
                    break;
                }
				case "medium": {
                    addItemToPopup(mediumPopup, 50 + 100 * mediumCount, plant.name, plant.name, plant.value, plant.name, plant.size);
					mediumCount++;
                    break;
                }
				case "large": {
                    addItemToPopup(largePopup, 50 + 100 * largeCount, plant.name, plant.name, plant.value, plant.name, plant.size);
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
		const plantCatalogue = this.cache.json.get('plant-catalogue');
		return plantCatalogue;
	}

	async purchasePlant(name, price, size) {
		let positions;
		let addPosition;
		switch(size) {
			case "small":
				positions = this.smallPositions;
                break;
            case "medium":
				positions = this.mediumPositions;
                break;
            case "large":
                positions = this.largePositions;
                break;
        }
		for(let position of this.availablePositions) {
			
			if(positions.includes(position)) {
				addPosition = position;
				break;
			}
		}
		if(addPosition === undefined) {
            console.log("No available positions in this size");
            return;
        }
		try {
			const added = await this.addPlantToGarden(name, addPosition, price);
			if (added) {
				console.log(`Bought ${name} for $${price}`);
			} 
			else {
				console.log("Not enough coins to buy this plant");
			}
		} catch (error) {
			console.error('Error purchasing plant:', error);
		}
	}

	setPlayersCoins(coins) {
		return new Promise((resolve, reject) => {
			// Optional: Wait for a confirmation message from React
			const handleMessage = (event) => {
				if (event.origin !== window.location.origin) {
					console.warn('Unknown origin:', event.origin);
					return;
				}
	
				const data = event.data;
	
				if (data.type === 'updateCoinsResponse') {
					window.removeEventListener('message', handleMessage);
					resolve();
				}
			};
	
			window.addEventListener('message', handleMessage);
	
			window.parent.postMessage({ type: 'updateCoins', coins: coins }, '*');
		});
	}

	addPlantToGarden(name, position, value) {
		return new Promise((resolve, reject) => {
			const handleMessage = (event) => {
				if (event.origin !== window.location.origin) {
					console.warn('Unknown origin:', event.origin);
					return;
				}
	
				const data = event.data;
	
				if (data.type === 'addPlantResponse') {
					window.removeEventListener('message', handleMessage);
					if (data.success) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			};
	
			window.addEventListener('message', handleMessage);
			window.parent.postMessage({ type: 'addPlant', name: name, position: position, value: value }, '*');
		});
	}
}