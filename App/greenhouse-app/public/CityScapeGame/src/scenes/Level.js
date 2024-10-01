class Level extends Phaser.Scene {

    constructor() {
        super("Level");

		//initialize stats from the database
		this.stats = {
            population: 1000,
            happiness: 75,
            bank: 5000,
            income: 10,
            education: 80,
            poverty: 10,
            energyQuota: 90
        };

		// Track the last time income was added
        this.lastIncomeTime = 0;

        this.incomeGenerationStarted = false;
    }

    create() {
        this.sceneStartTime = this.time.now;


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

        const background = this.add.image(0, 0, "cityscape-background").setOrigin(0, 0);
        background.displayWidth = 1067;
        background.displayHeight = 600;

        // Create text objects for each statistic
        this.statsText = this.add.text(870, 10, this.getStatsText(), { fontSize: '16px', fill: '#fff' });

        this.createButtons();
        this.createSaveButton();


        this.updateStats();
    }

    update(time, delta) {

        // Check if 3 seconds have passed since the scene started
        if (!this.incomeGenerationStarted && time > 3000) {
            this.incomeGenerationStarted = true; // Start income generation

            // Initialize the last income time
            this.lastIncomeTime = time;
        }

        // Check if income generation has started
        if (this.incomeGenerationStarted) {
            
            // Check if one second has passed since last income was added
            if (time - this.lastIncomeTime > 1000) {
                this.addIncomeToBank();
                this.lastIncomeTime = time;
            }
        }
    }

    addIncomeToBank() {
        this.updateStat('bank', this.stats.income);
    }

	createButtons() {
        const buttonNames = ['Build Housing', 'Supply Jobs', 'Build Parks', 'Build Schools', 'Build Food Banks', 'Build Sustainable Power'];
        const buttonActions = [
            () => {this.updateStat('population', 100); this.updateStat('bank', -100)},
            () => {this.updateStat('income', 10); this.updateStat('bank', -100)},
            () => {this.updateStat('happiness', 1); this.updateStat('bank', -100)},
            () => {this.updateStat('education', 1); this.updateStat('bank', -100)},
            () => {this.updateStat('poverty', -1); this.updateStat('bank', -100)},
            () => {this.updateStat('energyQuota', 5); this.updateStat('bank', -100)}
        ];

        for (let i = 0; i < buttonNames.length; i++) {
            const x = 50 + (i % 3) * 250;
            const y = 50 + Math.floor(i / 3) * 50;
            const button = this.add.text(x, y, buttonNames[i], { fontSize: '20px', fill: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', buttonActions[i]);
        }
    }

    getStatsText() {
        return `Population: ${this.stats.population}\n` +
               `Happiness %: ${this.stats.happiness}\n` +
               `Bank: ${this.stats.bank}\n` +
               `Income: ${this.stats.income}\n` +
               `Education %: ${this.stats.education}\n` +
               `Poverty %: ${this.stats.poverty}\n` +
               `Energy Quota %: ${this.stats.energyQuota}`;
    }

	updateStat(stat, value) {
        this.stats[stat] += value;
        this.updateStats();
    }

    updateStats() {
        this.statsText.setText(this.getStatsText());
    }

    createSaveButton() {
        const saveButton = this.add.text(this.cameras.main.width - 80, this.cameras.main.height - 50, "Save", {
            fontSize: '20px',
            fill: '#fff',
            backgroundColor: '#000'
        }).setOrigin(1, 0.5) // Align to the bottom right
          .setInteractive();

        saveButton.on('pointerdown', () => {
            this.saveStats();
        });

        // Add hover effects for the save button
        saveButton.on('pointerover', () => {
            saveButton.setScale(1.1);
        });

        saveButton.on('pointerout', () => {
            saveButton.setScale(1);
        });
    }

    saveStats() {
        // Implement saving logic
        console.log("Saving stats:", this.stats); // Currently just logging the stats to the console
    }

}
