class Level extends Phaser.Scene {

    constructor() {
        super("Level");
        this.inventoryPosition = 0;
        this.smallPositions = [1, 2, 4, 5, 6, 7, 12, 13, 14, 15, 17, 18];
        this.mediumPositions = [3, 8, 11, 16];
        this.largePositions = [9, 10];
        
        // Flags to track active popups and move state
        this.activePlantPopup = false;
        this.activeRectanglePopup = false;
        this.clickHandled = false;
        this.isAwaitingMoveTarget = false;
        this.plantToMove = null;
    }

    create() {
        const background = this.add.image(-1, 0, "GardenBackground").setOrigin(0, 0);
        background.displayWidth = 1068;
        background.displayHeight = 600;

        this.plantGroup = this.add.group();

        this.createPlantPopUp();
        this.createRectanglePopUps();

        this.plantCatalogue = this.cache.json.get('plant-catalogue');

        this.initializePlants();
        

        for (const plant of this.plants) {
            this.addPlant(plant);
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

        rect.on("pointerdown", () => {
            const newVisibility = !this.activeRectanglePopup;
            this.toggleRectanglePopUpsVisibility(newVisibility);
            
            // If showing the rectangle popup, hide the plant popup
            if (newVisibility && this.activePlantPopup) {
                this.hidePlantPopup();
            }
            this.clickHandled = true;
        });

        // Close popups when clicking outside or handle move target selection
        this.input.on("pointerdown", (pointer, currentlyOver) => {

            if (this.clickHandled) {
                this.clickHandled = false;
                return;
            }

            if (this.isAwaitingMoveTarget) {
                this.handleMoveTargetClick(pointer);
                return;
            }

            // Handle plant popup
            if (this.activePlantPopup) {
                const clickedInsidePlantPopup = currentlyOver.includes(this.plantPopup) || 
                                                currentlyOver.includes(this.plantPopupText) ||
                                                currentlyOver.includes(this.moveButton);
                if (!clickedInsidePlantPopup) {
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

        this.plantPopup.on('pointerdown', () => {
            this.clickHandled = true;
        });
        this.plantPopupText.on('pointerdown', () => {
            this.clickHandled = true;
        });

        this.moveButton = this.add.text(400, 230, "Move", { 
            fontSize: "20px", 
            fill: "#00ff00", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            backgroundColor: "#ffffff",
            padding: { x: 10, y: 5 }
        })
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setDepth(12)
            .setInteractive({ useHandCursor: true });

        this.moveButton.on('pointerdown', () => {
            this.initiateMove(this.currentSelectedPlant);
            this.clickHandled = true;
        });

        this.sellButton = this.add.text(400, 230, "Sell", { 
            fontSize: "20px", 
            fill: "#ff0000", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            backgroundColor: "#ffffff",
            padding: { x: 10, y: 5 }
        })
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setDepth(12)
            .setInteractive({ useHandCursor: true });

        this.sellButton.on('pointerdown', () => {
            this.sellPlant(this.currentSelectedPlant);
            this.hidePlantPopup();
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

        this.streakTreeText = this.add.text(400, 300, "Go to Streak Tree", { 
            fontSize: "20px", 
            fill: "#ffffff", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            wordWrap: { width: 180 } 
        })
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setDepth(12);

        this.shopText = this.add.text(700, 300, "Go to Shop", { 
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
            this.goToStreakTree();
            this.clickHandled = true;
        });
        this.shopButton.on("pointerdown", () => {
            this.goToShop();
            this.clickHandled = true;
        });

        this.popupBackground1.on('pointerdown', () => {
            this.clickHandled = true;
        });

        this.popupBackground2.on('pointerdown', () => {
            this.clickHandled = true;
        });

        this.streakTreeText.on('pointerdown', () => {
            this.clickHandled = true;
        });

        this.shopText.on('pointerdown', () => {
            this.clickHandled = true;
        });
    }

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
    showPlantDescription(plantName, plantX, plantY, plantData) {
        console.log(`Plant clicked: ${plantName}`);
        
        this.currentSelectedPlant = plantData; // Store the selected plant for move operations

        this.plantPopupText.setText(plantData.description);

        const popupWidth = 300;
        const popupHeight = 100;
        const offsetY = 60;

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

        this.moveButton.setPosition(popupX - 60, popupY + 30).setVisible(true);
        this.sellButton.setPosition(popupX + 60, popupY + 30).setVisible(true);

        this.activePlantPopup = true;

        if (this.activeRectanglePopup) {
            this.toggleRectanglePopUpsVisibility(false);
        }

        this.clickHandled = true;
    }

    hidePlantPopup() {
        this.plantPopup.setVisible(false);
        this.plantPopupText.setVisible(false);
        this.moveButton.setVisible(false);
        this.sellButton.setVisible(false);
        this.activePlantPopup = false;
    }

    initiateMove(plant) {
        this.hidePlantPopup();

        this.moveInstruction = this.add.text(0, 0, "Select a target position to move the plant.", { 
            fontSize: "24px", 
            fill: "#ffffff", 
            fontFamily: "'Press Start 2P', cursive",
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true },
            stroke: '#000000',
            strokeThickness: 4
        })
        .setOrigin(0.5, 0.5)
        .setDepth(15)
        .setShadow(2, 2, '#333333', 2, false, true);

        // Create a container to hold the text (and a background if we want to add one)
        const instructionContainer = this.add.container(550, 350).setDepth(15);
        instructionContainer.add([this.moveInstruction]);

        // Add pulse and fade animation
        this.tweens.add({
            targets: this.moveInstruction,
            scale: { from: 1.3, to: 1.35 },
            alpha: { from: 1, to: 0.9 },
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // Add a subtle up and down movement
        this.tweens.add({
            targets: instructionContainer,
            y: { from: 350, to: 355 },
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
    
        this.isAwaitingMoveTarget = true;
        this.plantToMove = plant;
    
        this.input.setDefaultCursor('pointer');
    
        this.highlightValidPositions();
    }

    // This is mostly for debugging hitboxes, but we could use it to add some UI graphics
    // Another idea is to use arrows above the plants to show the valid positions
    highlightValidPositions() {
        const posData = this.getPositionCoordinates();
        const allPositions = [...this.smallPositions, ...this.mediumPositions, ...this.largePositions];
        this.validPositionMarkers = [];
    
        this.widths = {'small': 200, 'medium': 600, 'large': 500};
        this.heights = {'small': 600, 'medium': 600, 'large': 600};
        this.offset = {'small': 0, 'medium': 20, 'large': 30};
    
        this.validPositionBounds = {};
    
        allPositions.forEach(pos => {
            const data = posData[pos];
            if (!data) return;
    
            // Only highlight positions that match the plant's size
            if (data.size !== this.plantToMove.size) return;
    
            const scale = data.scale || 1;
            const rectWidth = this.widths[data.size] * scale;
            const rectHeight = this.heights[data.size] * scale;
            const rectX = data.x + 90 * scale + this.offset[data.size];
            const rectY = data.y + 300 * scale;
    
            const marker = this.add.rectangle(
                rectX,
                rectY,
                rectWidth,
                rectHeight,
                0x00ff00,
                0.2
            )
                .setDepth(9)
                .setVisible(true)
                .setStrokeStyle(2, 0xffffff);
    
            this.validPositionMarkers.push(marker);
    
            // Store bounds for hit detection
            this.validPositionBounds[pos] = {
                left: rectX - rectWidth / 2,
                right: rectX + rectWidth / 2,
                top: rectY - rectHeight / 2,
                bottom: rectY + rectHeight / 2
            };
        });
    }
    
    

    // Havent decided whether we want to keep this
    displayInvalidMoveMessage() {
        const invalidMoveText = this.add.text(400, 100, "Invalid Move: Plant size does not match the target position.", { 
            fontSize: "18px", 
            fill: "#ff0000", 
            fontStyle: "bold", 
            fontFamily: "Arial",
            backgroundColor: "#000000",
            padding: { x: 10, y: 5 }
        })
            .setOrigin(0.5, 0.5)
            .setDepth(20);
    
        this.tweens.add({
            targets: invalidMoveText,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                invalidMoveText.destroy();
            }
        });
    }
    
    
    
    

    handleMoveTargetClick(pointer) {
        if (!this.isAwaitingMoveTarget) return;
    
        // Determine if the click is on a valid position
        const targetPosition = this.getPositionFromClick(pointer.x, pointer.y);
    
        if (targetPosition) {
            const targetPosData = this.getPositionCoordinates()[targetPosition];
            if (!targetPosData) {
                console.log("Invalid target position. Move cancelled.");
                this.cancelMove();
                return;
            }
    
            // Currently not being used due to current hit validation logic but could be useful to give feedback to the player about plant sizes.
            const plantSize = this.plantToMove.size;
            const targetSize = targetPosData.size;
            if (plantSize !== targetSize) {
                console.log(`Cannot move ${this.plantToMove.name} to position ${targetPosition} (${targetSize} size).`);
                this.displayInvalidMoveMessage();
                return;
            }
    
            const existingPlant = this.getPlantAtPosition(targetPosition);
    
            // Swap plants if there's an existing plant at the target position, otherwise move the plant to the target position
            if (existingPlant) {
                console.log(`Swapping ${this.plantToMove.name} with ${existingPlant.name} at position ${targetPosition}.`);
                this.swapPlants(this.plantToMove, existingPlant, targetPosition);
            } else {
                console.log(`Moving ${this.plantToMove.name} to position ${targetPosition}.`);
                this.movePlant(this.plantToMove, targetPosition);
            }
        }
        else {
            console.log("Invalid target position. Move cancelled.");
        }

        this.cancelMove();
    }
    

    // Determine the plant position based on click coordinates using rectangular hit detection
    getPositionFromClick(x, y) {
        const allPositions = [
            ...this.smallPositions,
            ...this.mediumPositions,
            ...this.largePositions
        ];

        for (let pos of allPositions) {
            const bounds = this.validPositionBounds[pos];
            if (!bounds) {
                continue;
            }

            if (
                x >= bounds.left &&
                x <= bounds.right &&
                y >= bounds.top &&
                y <= bounds.bottom
            ) {
                return pos;
            }
        }

        return null; // No valid position found
    }

    



    // Get coordinates for each position
    getPositionCoordinates() {
        return {
            1: { x: 260, y: 400, scale: 0.3, size: 'small' },
            2: { x: 160, y: 400, scale: 0.3, size: 'small' },
            3: { x: 20, y: 420, scale: 0.18, size: 'medium' },
            4: { x: 110, y: 300, scale: 0.27, size: 'small' },
            5: { x: 175, y: 250, scale: 0.24, size: 'small' },
            6: { x: 225, y: 205, scale: 0.21, size: 'small' },
            7: { x: 260, y: 180, scale: 0.18, size: 'small' },
            8: { x: 295, y: 140, scale: 0.1, size: 'medium' },
            9: { x: 365, y: 90, scale: 0.25, size: 'large' },
            10: { x: 610, y: 90, scale: 0.25, size: 'large' },
            11: { x: 730, y: 140, scale: 0.1, size: 'medium' },
            12: { x: 780, y: 180, scale: 0.18, size: 'small' },
            13: { x: 815, y: 205, scale: 0.21, size: 'small' },
            14: { x: 865, y: 250, scale: 0.24, size: 'small' },
            15: { x: 905, y: 290, scale: 0.27, size: 'small' },
            16: { x: 970, y: 420, scale: 0.18, size: 'medium' },
            17: { x: 870, y: 400, scale: 0.3, size: 'small' },
            18: { x: 770, y: 400, scale: 0.3, size: 'small' },
        };
    }
    

    getPositionScale() {
        return {
            1: 0.3,
            2: 0.3,
            3: 0.18,
            4: 0.27,
            5: 0.24,
            6: 0.21,
            7: 0.18,
            8: 0.1,
            9: 0.25,
            10: 0.25,
            11: 0.1,
            12: 0.18,
            13: 0.21,
            14: 0.24,
            15: 0.27,
            16: 0.18,
            17: 0.3,
            18: 0.3,
        };
    }
    

    getPlantAtPosition(position) {
        return this.plants.find(p => p.position === position);
    }

    swapPlants(plant1, plant2, targetPosition) {
        const tempPosition = plant1.position;
        plant1.position = plant2.position;
        plant2.position = tempPosition;

        console.log(`Swapped positions: ${plant1.name} is now at ${plant1.position}, ${plant2.name} is now at ${plant2.position}`);

        // Update the plants in the database (not sure again on specific implementation)
        this.updatePlantPosition(plant1);
        this.updatePlantPosition(plant2);

        // Update the display
        this.updatePlantDisplay(plant1);
        this.updatePlantDisplay(plant2);
    }

    // Move a plant to a new position
    movePlant(plant, targetPosition) {
        console.log(`Moving plant ${plant.name} from position ${plant.position} to position ${targetPosition}.`);
        plant.position = targetPosition;
        this.updatePlantPosition(plant);
        this.updatePlantDisplay(plant);
    }

    // Update plant position in the database for the database (need to implement but just gonna log for now)
    updatePlantPosition(plant) {
        console.log(`Updated plant ${plant.name} to position ${plant.position} in the database.`);
    }

    // Update the plant's sprite position on the screen
    updatePlantDisplay(plant) {
        if (plant.sprite) {
            const posData = this.getPositionCoordinates()[plant.position];
            if (posData) {
                const { x, y, scale } = posData;
                plant.sprite.setPosition(x, y);
                plant.sprite.setScale(scale);
                console.log(`Updated sprite position for ${plant.name} to (${x}, ${y}) with scale ${scale}.`);
            } else {
                console.warn(`No position data found for position ${plant.position}.`);
            }
        } else {
            console.warn(`No sprite found for plant ${plant.name}.`);
        }
    }
    
    

    cancelMove() {
        if (this.moveInstruction) {
            this.moveInstruction.destroy();
            this.moveInstruction = null;
        }
    
        if (this.validPositionMarkers) {
            this.validPositionMarkers.forEach(marker => marker.destroy());
            this.validPositionMarkers = [];
        }
    
        this.isAwaitingMoveTarget = false;
        this.plantToMove = null;
    
        this.input.setDefaultCursor('default');
    }
    

    getPlayerPlants() {
        // data format for garden: { plant, position }

        return [
            { position: 1, name: "Basic Bud" },
            { position: 2, name: "Rare Bud" },
            { position: 3, name: "Regular Bush" },
            { position: 6, name: "Basic Bud" },
            { position: 7, name: "Rare Bud" },
            { position: 10, name: "Baby Tree" },
            { position: 11, name: "Regular Bush" },
            { position: 12, name: "Basic Bud" },
            { position: 13, name: "Rare Bud" },
            { position: 15, name: "Rare Bud" },
            { position: 17, name: "Basic Bud" },
            { position: 18, name: "Rare Bud" }
        ];
    }
    

    goToShop() {
        this.scene.start("Shop");
    }

    goToStreakTree() {
        this.scene.start("StreakTree");
    }

    addPlant(plant) {
        const position = plant.position;
        const name = plant.name;
    
        const posData = this.getPositionCoordinates()[position];
    
        const { x, y, scale } = posData;
    
        const plantImage = this.add.image(x, y, name).setOrigin(0, 0);
        plantImage.scale = scale;
        plantImage.setInteractive({ useHandCursor: true });
    
        // Assign the sprite to the plant data object
        plant.sprite = plantImage;
    
        plantImage.on("pointerdown", () => {
            if (this.isAwaitingMoveTarget) {
                // In Move Mode: Do not open popup or set clickHandled
                return;
            }
            this.showPlantDescription(name, plantImage.x, plantImage.y, plant);
            this.clickHandled = true;
        });
    
        this.plantGroup.add(plantImage);
    }
    

    addCoins(amount) {
        // Add coins to user in the database
        console.log("Coins added: " + amount);
    }
    
    sellPlant(plant) {
        // Remove the plant's sprite from the scene
        if (plant.sprite) {
            plant.sprite.destroy();
        }
    
        // Remove the plant from the plants array
        this.plants = this.plants.filter(p => p !== plant);
    
        // Update the database (currently just logging, will be replaced with actual implementation)
        console.log(`Removed plant ${plant.name} from position ${plant.position} in the database.`);
    
        // Add coins to the user
        this.addCoins(plant.value * 0.5);
    
        // Optionally, show a message to the user (not sure how we want to do this)
        console.log(`Sold plant ${plant.name} for ${plant.value * 0.5} coins.`);
    }

    initializePlants() {
        // Get player plants data
        const playerPlantsData = this.getPlayerPlants();
    
        // Merge player plants with catalogue data
        this.plants = playerPlantsData.map(playerPlant => {
            // Find the plant details in the catalogue
            const plantDetails = this.plantCatalogue.find(plant => plant.name === playerPlant.name);
    
            if (!plantDetails) {
                console.error(`Plant with ID ${playerPlant.name} not found in the catalogue.`);
                return null;
            }
    
            // Merge the data
            return {
                ...plantDetails,
                position: playerPlant.position,
                sprite: null,
            };
        }).filter(plant => plant !== null); // Filter out any null entries due to missing data
    }
    
    
    
}







