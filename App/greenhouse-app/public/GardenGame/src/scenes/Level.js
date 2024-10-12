class Level extends Phaser.Scene {

    constructor() {
        super("Level");

        // Initialize plants from the database
        this.plants = this.getPlayerPlants();
        this.smallPositions = [1, 2, 4, 5, 6, 7, 12, 13, 14, 15, 17, 18];
        this.mediumPositions = [3, 8, 11, 16];
        this.largePositions = [9, 10];
        
        // Flags to track active popups
        this.activePlantPopup = false;
        this.activeRectanglePopup = false;
        this.clickHandled = false;
    }

    create() {
        const background = this.add.image(-1, 0, "GardenBackground").setOrigin(0, 0);
        background.displayWidth = 1068;
        background.displayHeight = 600;

        this.plantGroup = this.add.group();

        this.createPlantPopUp();
        this.createRectanglePopUps();

        // Add plants
        for(const plant of this.plants) {
            if (this.smallPositions.includes(plant.position)) {
                this.addSmallPlant(plant.position, plant.sprite, plant.name);
            }
            else if (this.mediumPositions.includes(plant.position)) {
                this.addMediumPlant(plant.position, plant.sprite, plant.name);
            }
            else if (this.largePositions.includes(plant.position)) {
                this.addLargeBud(plant.position, plant.sprite, plant.name);
            }
        }

        const frames = [];
        for (let i = 1; i <= 60; i++) {
            frames.push({ key: "File" + i });
        }

        this.anims.create({
            key: "greenArrowAnimation",
            frames: frames,
            frameRate: 30,
            repeat: -1
        });


        const arrowSprite = this.add.sprite(550, 30, "File1");
        arrowSprite.displayWidth = 50;
        arrowSprite.displayHeight = 50;
        arrowSprite.play("greenArrowAnimation");


        const rect = this.add.rectangle(550, 140, 90, 160).setInteractive({ useHandCursor: true });

        // Event listener for clicking the rectangle to toggle the popup
        rect.on("pointerdown", () => {
            const newVisibility = !this.activeRectanglePopup;
            this.toggleRectanglePopUpsVisibility(newVisibility);
            
            // If showing the rectangle popup, hide the plant popup
            if (newVisibility && this.activePlantPopup) {
                this.hidePlantPopup();
            }
            this.clickHandled = true;
        });

        // Close popups when clicking outside
        this.input.on("pointerdown", (pointer, currentlyOver) => {

            // If the click was handled by a specific popup, reset the flag and do nothing
            if (this.clickHandled) {
                this.clickHandled = false;
                return;
            }

            // Handle plant popup
            if (this.activePlantPopup) {
                const clickedInsidePlantPopup = currentlyOver.includes(this.plantPopup) || currentlyOver.includes(this.plantPopupText);
                if (!clickedInsidePlantPopup) {
                    console.log("Clicked outside plant popup. Hiding plant popup.");
                    this.hidePlantPopup();
                }
            }

            // Handle rectangle popup
            if (this.activeRectanglePopup) {
                const clickedInsideRectanglePopup = currentlyOver.includes(this.popupBackground1) || 
                                                    currentlyOver.includes(this.popupBackground2) || 
                                                    currentlyOver.includes(this.streakTreeButton) || 
                                                    currentlyOver.includes(this.shopButton) || 
                                                    currentlyOver.includes(this.streakTreeText) ||
                                                    currentlyOver.includes(this.shopText);
                if (!clickedInsideRectanglePopup) {
                    this.toggleRectanglePopUpsVisibility(false);
                }
            }
        });
    }


    createPlantPopUp() {
        this.plantPopup = this.add.rectangle(400, 200, 300, 100, 0x000000, 0.8)
        this.plantPopup.setStrokeStyle(2, 0xffffff)
		this.plantPopup.setVisible(false)
		this.plantPopup.setDepth(10)
		this.plantPopup.setInteractive();

        // Create the plant popup text
        this.plantPopupText = this.add.text(400, 200, "", { 
            fontSize: "20px", 
            fill: "#ffffff", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            wordWrap: { width: 280 }
        })
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setDepth(11);

        // Event listeners for the popup to handle clicks inside it
        this.plantPopup.on('pointerdown', () => {
            this.clickHandled = true;
        });
        this.plantPopupText.on('pointerdown', () => {
            this.clickHandled = true;
        });
    }

    createRectanglePopUps() {
        this.popupBackground1 = this.add.rectangle(400, 300, 300, 200, 0x000000, 0.8)
            .setStrokeStyle(2, 0xffffff)
            .setVisible(false)
            .setDepth(10)
            .setInteractive();

        this.popupBackground2 = this.add.rectangle(700, 300, 300, 200, 0x000000, 0.8)
            .setStrokeStyle(2, 0xffffff)
            .setVisible(false)
            .setDepth(10)
            .setInteractive();

        this.streakTreeButton = this.add.rectangle(400, 300, 200, 80, 0x00ff00)
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .setDepth(11);

        this.shopButton = this.add.rectangle(700, 300, 200, 80, 0x0000ff)
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .setDepth(11);

        this.streakTreeText = this.add.text(400, 260, "Go to Streak Tree", { 
            fontSize: "20px", 
            fill: "#ffffff", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            wordWrap: { width: 180 } 
        })
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setDepth(12);

        this.shopText = this.add.text(700, 260, "Go to Shop", { 
            fontSize: "20px", 
            fill: "#ffffff", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            wordWrap: { width: 180 } 
        })
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setDepth(12);

        this.streakTreeButton.on("pointerdown", () => {
            console.log("Streak Tree button clicked.");
            this.goToStreakTree();
            this.clickHandled = true;
        });
        this.shopButton.on("pointerdown", () => {
            console.log("Shop button clicked.");
            this.goToShop();
            this.clickHandled = true;
        });

        this.popupBackground1.on('pointerdown', () => {
            console.log("Clicked on rectangle popup background 1.");
            this.clickHandled = true;
        });

        this.popupBackground2.on('pointerdown', () => {
            console.log("Clicked on rectangle popup background 2.");
            this.clickHandled = true;
        });

        this.streakTreeText.on('pointerdown', () => {
            console.log("Clicked on Streak Tree text.");
            this.clickHandled = true;
        });

        this.shopText.on('pointerdown', () => {
            console.log("Clicked on Shop text.");
            this.clickHandled = true;
        });
    }

    // Toggle the visibility of rectangle pop-ups
    toggleRectanglePopUpsVisibility(visible) {
        this.popupBackground1.setVisible(visible);
        this.popupBackground2.setVisible(visible);
        this.streakTreeText.setVisible(visible);
        this.shopText.setVisible(visible);
        this.streakTreeButton.setVisible(visible);
        this.shopButton.setVisible(visible);

        this.activeRectanglePopup = visible;

        // If showing the rectangle popup, hide the plant popup
        if (visible && this.activePlantPopup) {
            this.hidePlantPopup();
        }
    }

    // Show plant pop-up when a plant is clicked
    showPlantDescription(plantName, plantX, plantY) {
        console.log(`Plant clicked: ${plantName}`);
        
		// Replace this with a call to the database to get the plant description (depends on what we want to do)
        this.plantPopupText.setText(`This is ${plantName}`);

        const popupWidth = 300;
        const popupHeight = 100;
        const offsetY = 60; // Offset to position the popup above the plant

        // Default popup position above the plant
        let popupX = plantX;
        let popupY = plantY - offsetY - (popupHeight / 2);

        // Ensure the popup doesn't go off the edges of the screen
        if (popupX - (popupWidth / 2) < 0) {
            popupX = popupWidth / 2 + 10;
        }
        if (popupX + (popupWidth / 2) > this.sys.game.config.width) {
            popupX = this.sys.game.config.width - (popupWidth / 2) - 10;
        }
        if (popupY - (popupHeight / 2) < 0) {
            popupY = plantY + offsetY + (popupHeight / 2);
        }

        this.plantPopup.setPosition(popupX, popupY);
        this.plantPopup.setVisible(true);

        this.plantPopupText.setPosition(popupX, popupY);
        this.plantPopupText.setVisible(true);

        this.activePlantPopup = true;

        if (this.activeRectanglePopup) {
            this.toggleRectanglePopUpsVisibility(false);
        }

        this.clickHandled = true;
    }

    hidePlantPopup() {
        this.plantPopup.setVisible(false);
        this.plantPopupText.setVisible(false);
        this.activePlantPopup = false;
    }

    getPlayerPlants() {
        // Get plants from the database (not implemented)
        return [
            { position: 1, sprite: "SmallBud", name: "Basic Bud" },
            { position: 2, sprite: "SmallBud1", name: "Rare Bud" },
            { position: 3, sprite: "MediumBud", name: "Regular Bush" },
            { position: 4, sprite: "SmallBud", name: "Basic Bud" },
            { position: 5, sprite: "SmallBud1", name: "Rare Bud" },
            { position: 6, sprite: "SmallBud" , name: "Basic Bud"},
            { position: 7, sprite: "SmallBud1" , name: "Rare Bud"},
            { position: 8, sprite: "MediumBud", name: "Regular Bush" },
            { position: 9, sprite: "LargeBud", name: "Baby Tree" },
            { position: 10, sprite: "LargeBud", name: "Baby Tree" },
            { position: 11, sprite: "MediumBud", name: "Regular Bush" },
            { position: 12, sprite: "SmallBud" , name: "Basic Bud"},
            { position: 13, sprite: "SmallBud1" , name: "Rare Bud"},
            { position: 14, sprite: "SmallBud" , name: "Basic Bud"},
            { position: 15, sprite: "SmallBud1" , name: "Rare Bud"},
            { position: 16, sprite: "MediumBud", name: "Regular Bush" },
            { position: 17, sprite: "SmallBud" , name: "Basic Bud"},
            { position: 18, sprite: "SmallBud1" , name: "Rare Bud"}
        ];
    }

    goToShop() {
        this.scene.start("Shop");
    }

    goToStreakTree() {
        this.scene.start("StreakTree");
    }

    addSmallPlant(position, sprite, name) {
        let xPosition, yPosition, scale;
        switch (position) {
            case 1:
                xPosition = 260;
                yPosition = 400;
                scale = 0.3;
                break;
            case 2:
                xPosition = 160;
                yPosition = 400;
                scale = 0.3;
                break;
            case 4:
                xPosition = 110;
                yPosition = 300;
                scale = 0.27;
                break;
            case 5:
                xPosition = 175;
                yPosition = 250;
                scale = 0.24;
                break;
            case 6:
                xPosition = 225;
                yPosition = 205;
                scale = 0.21;
                break;
            case 7:
                xPosition = 260;
                yPosition = 180;
                scale = 0.18;
                break;
            case 12:
                xPosition = 780;
                yPosition = 180;
                scale = 0.18;
                break;
            case 13:
                xPosition = 815;
                yPosition = 205;
                scale = 0.21;
                break;
            case 14:
                xPosition = 865;
                yPosition = 250;
                scale = 0.24;
                break;
            case 15:
                xPosition = 905;
                yPosition = 290;
                scale = 0.27;
                break;
            case 17:
                xPosition = 870;
                yPosition = 400;
                scale = 0.3;
                break;
            case 18:
                xPosition = 770;
                yPosition = 400;
                scale = 0.3;
                break;
        }
        const plant = this.add.image(xPosition, yPosition, sprite).setOrigin(0, 0);
        plant.scale = scale;
        plant.setInteractive({useHandCursor: true});

        plant.on("pointerdown", () => {
            console.log(`Plant ${name} clicked.`);
            this.showPlantDescription(name, plant.x, plant.y);
            this.clickHandled = true;
        });

        this.plantGroup.add(plant);
    }

    addMediumPlant(position, sprite, name) {
        let xPosition, yPosition, scale;
        switch (position) {
            case 3:
                xPosition = 20;
                yPosition = 420;
                scale = 0.18;
                break;
            case 8:
                xPosition = 295;
                yPosition = 140;
                scale = 0.1;
                break;
            case 11:
                xPosition = 730;
                yPosition = 140;
                scale = 0.1;
                break;
            case 16:
                xPosition = 970;
                yPosition = 420;
                scale = 0.18;
                break;
        }
        const plant = this.add.image(xPosition, yPosition, sprite).setOrigin(0, 0);
        plant.scale = scale;
        plant.setInteractive({ useHandCursor: true });

        plant.on("pointerdown", () => {
            console.log(`Plant ${name} clicked.`);
            this.showPlantDescription(name, plant.x, plant.y);
            this.clickHandled = true;
        });

        this.plantGroup.add(plant);
    }

    addLargeBud(position, sprite, name) {
        let xPosition, yPosition, scale, flip;
        switch (position) {
            case 9:
                xPosition = 365;
                yPosition = 90;
                scale = 0.25;
                flip = false;
                break;
            case 10:
                xPosition = 610;
                yPosition = 90;
                scale = 0.25;
                flip = true;
                break;
        }
        const plant = this.add.image(xPosition, yPosition, sprite).setOrigin(0, 0);
        plant.scale = scale;
        plant.setFlipX(flip);
        plant.setInteractive({ useHandCursor: true });

        plant.on("pointerdown", () => {
            console.log(`Plant ${name} clicked.`);
            this.showPlantDescription(name, plant.x, plant.y);
            this.clickHandled = true;
        });

        this.plantGroup.add(plant);
    }
}




