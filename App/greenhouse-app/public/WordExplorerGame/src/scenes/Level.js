class Level extends Phaser.Scene {
	constructor() {
		super("Level");
		this.foundWords = [];
	}

	preload() {
		this.mainGroup = this.add.group();
		const background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xffffff);
		background.setOrigin(0, 0);
		background.setDepth(1);
		this.mainGroup.add(background);


		this.events.emit("scene-awake");

		// Input target words from database (10 Words)
		this.targetWords = ['GOALS', 'SOCIETY', 'DEVELOPMENT', 'ENVIRONMENT', 'PROJECT', 
			'ECONOMY', 'LEO', 'JORDAN', 'FILIP', 'KEN'];

		// Input grid of letters from database (generate using target words in a word search maker)
		// Need to make grid size variable based on what the external generator spits out
		// For now its just an example
		this.lettersArray = [
			["T", "O", "I", "R", "L", "K", "E", "N", "N", "J", "G", "T", "A", "G"],
			["N", "O", "T", "E", "A", "J", "N", "P", "K", "O", "D", "N" ,"O", "O"],
			["E", "E", "O", "N", "J", "S", "L", "A", "O", "G", "N", "E", "R", "O"],
			["M", "N", "N", "E", "P", "O", "E", "I", "O", "R", "N", "M", "J", "R"],
			["P", "O", "I", "E", "A", "R", "R", "R", "N", "L", "O", "N", "D", "D"],
			["O", "E", "E", "Y", "O", "T", "M", "D", "M", "N", "P", "O", "E", "E"],
			["L", "M", "D", "T", "M", "E", "T", "N", "A", "R", "F", "R", "T", "V"],
			["E", "L", "T", "E", "K", "O", "N", "O", "O", "N", "I", "I", "O", "E"],
			["V", "O", "I", "I", "E", "P", "N", "J", "D", "A", "L", "V", "R", "L"],
			["E", "O", "C", "C", "E", "C", "E", "O", "E", "E", "I", "N", "E", "B"],
			["D", "E", "M", "O", "O", "C", "T", "E", "C", "E", "P", "E", "T", "O"],
			["G", "V", "L", "S", "T", "R", "E", "O", "O", "E", "P", "M", "O", "R"],
			["I", "E", "L", "R", "T", "C", "C", "E", "V", "C", "V", "V", "E", "O"],
			["I", "E", "O", "D", "P", "E", "V", "V", "R", "A", "S", "R", "E", "N"]
		];

		this.createTargetWordsList();
	}
	
	create() {

		// Start with a black rectangle covering the screen for fade-in
		const fadeRectangle = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
		fadeRectangle.setOrigin(0, 0);
		fadeRectangle.setAlpha(1);
		fadeRectangle.setDepth(1000);

		// Fade in the new scene
		this.tweens.add({
    		targets: fadeRectangle,
    		alpha: { from: 1, to: 0 },
    		duration: 300,
    		onComplete: () => {
        		fadeRectangle.destroy();
    		}
		});
		this.createWordSearchGrid(this.lettersArray);
	}

	createTargetWordsList() {
		this.targetWordsText = [];
		const startX = 650;
		const startY = 50;
		const spacing = 30;
	
		this.targetWords.forEach((word, index) => {
			const text = this.add.text(startX, startY + index * spacing, word, { fontSize: '24px', color: '#000000' });
			text.depth = 2;
			this.mainGroup.add(text);
			this.targetWordsText.push(text);
		});
	}
	
	createWordSearchGrid(lettersArray) {
		const gridSize = 14;
		const borderThickness = 5; // Thickness of the border
		const tileSize = (600 - (borderThickness * 2)) / gridSize; // Reduce tile size for the border
	
		this.tiles = []; // Array to store references to all tiles
		this.startTile = null; // Track the initial tile selected
		this.lastTile = null; // Track the last highlighted tile
		this.direction = null; // Track the direction of selection
		this.highlightedLetters = []; // Track the sequence of highlighted letters
		this.highlightedTiles = []; // Track the tiles that are currently highlighted
	
		// Create the border rectangle
		const borderRect = this.add.rectangle(
			0,
			this.cameras.main.height / 2,
			1200,
			600,
			0x000000 // Black color
		).setOrigin(0.5, 0.5).setDepth(1); // Ensure it is behind the tiles
		this.mainGroup.add(borderRect);
	
		for (let row = 0; row < gridSize; row++) {
			for (let col = 0; col < gridSize; col++) {
				const tile = this.add.rectangle(
					col * tileSize + borderThickness, // Adjust position for border
					row * tileSize + borderThickness, // Adjust position for border
					tileSize,
					tileSize,
					0xffffff
				).setOrigin(0, 0).setStrokeStyle(1, 0x000000);
	
				const hitAreaSize = tileSize * 0.8;
				tile.depth = 2;
				tile.setInteractive(new Phaser.Geom.Rectangle((tileSize - hitAreaSize) / 2, (tileSize - hitAreaSize) / 2, hitAreaSize, hitAreaSize), Phaser.Geom.Rectangle.Contains);
				this.tiles.push({ tile, row, col });
				this.mainGroup.add(tile);
	
				// Add letter text to the tile
				const letter = lettersArray[row][col];
				const text = this.add.text(
					col * tileSize + borderThickness + tileSize / 2, // Adjust position for border
					row * tileSize + borderThickness + tileSize / 2, // Adjust position for border
					letter,
					{ fontSize: `${tileSize / 2}px`, color: '#000000' }
				).setOrigin(0.5, 0.5);	
				text.depth = 2;
				this.mainGroup.add(text);
	
				tile.on('pointerdown', () => {
					if (!this.isDrawing) {
						// Start drawing sequence
						this.isDrawing = true;
						this.startTile = { row, col };
						this.lastTile = this.startTile;
	
						// Highlight tile in yellow
						tile.setFillStyle(0xffff00);
						
						this.highlightedLetters = [letter];
						this.highlightedTiles = [tile];
					}
				});
	
				tile.on('pointerover', () => {
					if (this.isDrawing && this.isValidSelection(row, col)) {
						// Highlight sequence tile in yellow
						tile.setFillStyle(0xffff00);
	
						this.lastTile = { row, col };
						this.highlightedLetters.push(letter);
						this.highlightedTiles.push(tile);
					}
				});
			}
		}
	
		this.input.on('pointerup', () => {
			if (this.isDrawing) {
				this.isDrawing = false;
				let highlightedSequence = this.highlightedLetters.join('');
				if (this.targetWords.includes(highlightedSequence) && !this.foundWords.includes(highlightedSequence)) {
					// Turn highlighted tiles green if sequence matches a target word
					this.foundWords.push(highlightedSequence);
					this.highlightTilesGreen();
				} else {
					this.highlightAllTiles();
				}
				this.startTile = null;
				this.lastTile = null;
				this.direction = null;
				this.highlightedLetters = [];
				this.highlightedTiles = [];
			}
		});
	
		// Handle pointer moving out of the game
		this.scale.canvas.addEventListener('mouseleave', () => {
			if (this.isDrawing) {
				this.isDrawing = false;
				this.highlightAllTiles();
				this.startTile = null;
				this.lastTile = null;
				this.direction = null;
				this.highlightedLetters = [];
				this.highlightedTiles = [];
			}
		});
	
		// Use pointermove to detect when the pointer is inside the game but outside the grid
		this.input.on('pointermove', (pointer) => {
			const canvasBounds = this.scale.canvas.getBoundingClientRect();
			if (this.isDrawing && 
				(pointer.x < 5 || pointer.y < 0 || 
				pointer.x > 595 || pointer.y > canvasBounds.height - 5)) {
				this.isDrawing = false;
				this.highlightAllTiles();
				this.startTile = null;
				this.lastTile = null;
				this.direction = null;
				this.highlightedLetters = []; 
				this.highlightedTiles = [];
			}
		});
	}
	
	
	isValidSelection(row, col) {

		// If no start tile, nothing is valid
		if (!this.startTile) return false;
	
		// If no direction is set, calculate it based on the first move
		if (!this.direction) {
			this.direction = this.calculateDirection(this.startTile, { row, col });
			if (!this.direction) return false;
		}
	
		// Check if the current tile is adjacent to the last tile in the set direction
		const { row: lastRow, col: lastCol } = this.lastTile;
	
		switch (this.direction) {
			case 'horizontal':
				return (
					row === lastRow &&
					Math.abs(col - lastCol) === 1
				);
			case 'vertical':
				return (
					col === lastCol && 
					Math.abs(row - lastRow) === 1
				);
			case 'diagonal-tl-br':
				return (
					Math.abs(row - lastRow) === 1 &&
					Math.abs(col - lastCol) === 1 &&
					row - lastRow === col - lastCol
				);
			case 'diagonal-tr-bl':
				return (
					Math.abs(row - lastRow) === 1 &&
					Math.abs(col - lastCol) === 1 &&
					row - lastRow === -(col - lastCol)
				);
			default:
				return false;
		}
	}
	
	highlightAllTiles() {
		this.tiles.forEach(({ tile }) => {
			if (!tile.permanentlyHighlighted) {
				tile.setFillStyle(0xffffff); // Turn all tiles back to white
			}
			else {
				tile.setFillStyle(0x00ff00); // Turn permanently highlighted tiles green
			}
		});
	}

	highlightTilesGreen() {
		this.highlightedTiles.forEach(tile => {
			tile.setFillStyle(0x00ff00); // Turn tile green
			tile.permanentlyHighlighted = true;
		});

		const foundWord = this.highlightedLetters.join('');
		const targetWordIndex = this.targetWords.indexOf(foundWord);
		if (targetWordIndex !== -1) {
			this.targetWordsText[targetWordIndex].setStyle({
				fontSize: '24px', // Increase font size
				backgroundColor: '#00ff00' // Add black background
			});
			this.targetWordsText[targetWordIndex].setFontStyle('bold'); // Make font bold
		}

		// Check if all target words have been found
		if (this.foundWords.length === this.targetWords.length) {
			this.displayCongratulations();
		}

	}
	
	calculateDirection(startTile, currentTile) {
		const rowDiff = currentTile.row - startTile.row;
		const colDiff = currentTile.col - startTile.col;
	
		if (rowDiff === 0) return 'horizontal';
		if (colDiff === 0) return 'vertical';
		if (rowDiff === colDiff) return 'diagonal-tl-br';
		if (rowDiff === -colDiff) return 'diagonal-tr-bl';
		return null;
	}

	displayCongratulations() {

	    // Disable input to prevent further selection of letters
		this.input.enabled = false;

		// Send comfirmation to the server that the game is complete
		this.events.emit("game-complete");
		
		// Create a semi-transparent black background
		const overlay = this.add.rectangle(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			this.cameras.main.width,
			this.cameras.main.height,
			0x000000,
			0.8
		);
		overlay.setOrigin(0.5, 0.5);
		overlay.setDepth(9999);
		this.mainGroup.add(overlay);

		this.tweens.add({
    		targets: overlay,
    		alpha: { from: 0, to: 1 },
    		duration: 1000,
		});
	
		// Create the congratulations text
		const congratsText = this.add.text(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			'Congratulations!',
			{
				fontSize: '48px',
				color: '#ffffff',
				fontStyle: 'bold',
			}
		);
		congratsText.setOrigin(0.5, 0.5);
		congratsText.setDepth(10000);
		this.mainGroup.add(congratsText);
	

		this.tweens.add({
			targets: congratsText,
			scale: { from: 1, to: 1.2 },
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut',
			duration: 1000,
		});

		this.tweens.addCounter({
			from: 0,
			to: 100,
			duration: 2000,
			repeat: -1,
			yoyo: true,
			onUpdate: (tween) => {
				const progress = tween.getValue();
				const newColor = Phaser.Display.Color.Interpolate.ColorWithColor(
					Phaser.Display.Color.ValueToColor(0xff0000),
					Phaser.Display.Color.ValueToColor(0x00ff00),
					100,
					progress
				);
				const hexColor = Phaser.Display.Color.RGBToString(newColor.r, newColor.g, newColor.b, newColor.a, '#');
				congratsText.setColor(hexColor);
			}
		});
	
		this.tweens.add({
			targets: congratsText,
			alpha: { from: 0, to: 1 },
			duration: 1000,
		});

		this.addCoins();

		// Delay a little to show the congratulations message
		this.time.delayedCall(3000, () => {
			this.transitionToEndScreen();
		});
		
	}

	transitionToEndScreen() {

		// Want to display the EndScreen scene over the Level scene as a popup
		const endScreen = this.scene.get('EndScreen');
		this.scene.run('EndScreen');
	
	}

	addCoins() {
		// Add coins to the player's account
		console.log("+100 coins");
	}
}
