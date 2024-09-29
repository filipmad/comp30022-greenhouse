/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");
	
		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}
	
	/** @returns {void} */
	editorCreate() {
	
		// background
		const background = this.add.image(0, 0, "Background");
		background.setOrigin(0, 0);
	
		this.events.emit("scene-awake");
	}
	
	/* START-USER-CODE */
	
	create() {
		this.editorCreate();

		// Input target words from database (10 Words)
		this.targetWords = ['GOALS', 'SOCIETY', 'DEVELOPMENT', 'ENVIRONMENT', 'PROJECT', 
			'ECONOMY', 'LEO', 'JORDAN', 'FILIP', 'KEN'];

		// Input grid of letters from database (generate using target words in a word search maker)
		// Need to make grid size variable based on what the external generator spits out
		// For now its just an example
		const lettersArray = [
			["T", "O", "I", "R", "L", "K", "E", "N", "N", "J", "G", "T", "A", "G"],
			["N", "O", "T", "E", "A", "J", "N", "P", "K", "O", "D", "N" ,"O", "O"],
			["E", "E", "O", "N", "J", "S", "L", "A", "O", "G", "N", "E", "R", "O"],
			["M", "N", "N", "E", "P", "O", "E", "I", "O", "R", "N", "M", "J", "R"],
			["P", "O", "I", "E", "A", "R", "R", "R", "N", "L", "O", "N", "D", "D"],
			["O", "E", "E", "Y", "O", "T", "M", "D", "M", "N", "P", "O", "E", "E"],
			["L", "M", "D", "T", "M", "E", "T", "N", "A", "R", "F", "R", "T", "V"],
			["E", "L", "T", "E", "K", "O", "N", "O", "O", "N", "O", "N", "O", "E"],
			["V", "O", "I", "I", "E", "P", "N", "J", "D", "A", "L", "V", "R", "L"],
			["E", "O", "C", "C", "E", "C", "E", "O", "E", "E", "I", "N", "E", "B"],
			["D", "E", "M", "O", "O", "C", "T", "E", "C", "E", "P", "E", "T", "O"],
			["G", "V", "L", "S", "T", "R", "E", "O", "O", "E", "P", "M", "O", "R"],
			["I", "E", "L", "R", "T", "C", "C", "E", "V", "C", "V", "V", "E", "O"],
			["I", "E", "O", "D", "P", "E", "V", "V", "R", "A", "S", "R", "E", "N"]
		];
		this.createWordSearchGrid(lettersArray);
		this.createTargetWordsList();
	}

	createTargetWordsList() {
		this.targetWordsText = [];
		const startX = 650;
		const startY = 50;
		const spacing = 30;
	
		this.targetWords.forEach((word, index) => {
			const text = this.add.text(startX, startY + index * spacing, word, { fontSize: '24px', color: '#000000' });
			this.targetWordsText.push(text);
		});
	}
	
	createWordSearchGrid(lettersArray) {
		const gridSize = 14;
		const tileSize = 597 / gridSize;
		this.tiles = []; // Array to store references to all tiles
		this.startTile = null; // Track the initial tile selected
		this.lastTile = null; // Track the last highlighted tile
		this.direction = null; // Track the direction of selection
		this.highlightedLetters = []; // Track the sequence of highlighted letters
		this.highlightedTiles = []; // Track the tiles that are currently highlighted
	
		for (let row = 0; row < gridSize; row++) {
			for (let col = 0; col < gridSize; col++) {
				const tile = this.add.rectangle(
					col * tileSize,
					row * tileSize,
					tileSize,
					tileSize,
					0xffffff
				).setOrigin(0, 0).setStrokeStyle(1, 0x000000);
	
				const hitAreaSize = tileSize * 0.8;
				tile.setInteractive(new Phaser.Geom.Rectangle((tileSize - hitAreaSize) / 2, (tileSize - hitAreaSize) / 2, hitAreaSize, hitAreaSize), Phaser.Geom.Rectangle.Contains);
				this.tiles.push({ tile, row, col });
	
				// Add letter text to the tile
				const letter = lettersArray[row][col];
				const text = this.add.text(
					col * tileSize + tileSize / 2,
					row * tileSize + tileSize / 2,
					letter,
					{ fontSize: `${tileSize / 2}px`, color: '#000000' }
				).setOrigin(0.5, 0.5);	
				
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
				if (this.targetWords.includes(this.highlightedLetters.join(''))) {

					// Turn highlighted tiles green if sequence matches a target word
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
				(pointer.x < 0 || pointer.y < 0 || 
				pointer.x > 600 || pointer.y > canvasBounds.height)) {
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
			this.targetWordsText[targetWordIndex].setStyle({color: '#00ff00'}); // Turn word green
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
	
	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
