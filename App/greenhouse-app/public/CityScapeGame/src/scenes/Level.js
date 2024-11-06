class Level extends Phaser.Scene {

    constructor() {
        super("Level");

        // Initialize stats with default values to allow for stats to be updated
        this.stats = {
            population: 0,
            funds: 0,
            happiness: 50,
            pollution: 50,
            education: 50,
            poverty: 50,
            energyQuota: 50,
        };

        this.hiddenStats = {
            populationChange: 0,
            fundsChange: 0,
            happinessChange: 0,
            pollutionChange: 0,
            educationChange: 0,
            povertyChange: 0,
            energyQuotaChange: 0,
        };

		// Track the last time income was added
        this.lastIncomeTime = 0;
        this.lastCoinAdditionTime = 0;

        this.incomeGenerationStarted = false;
    }

    create() {

        window.addEventListener('message', this.handleMessage.bind(this));

		//initialize stats from the database
        this.loadStats()

        this.sceneStartTime = this.time.now;

        this.randomEvents = this.cache.json.get("random-events", "assets/random-events.json");


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


        this.updateStatText();
    }

    update(time, delta) {

        // Check if 3 seconds have passed since the scene started
        if (!this.incomeGenerationStarted && time > 3000) {
            this.incomeGenerationStarted = true; // Start income generation

            // Initialize the last income and coin addition time
            this.lastIncomeTime = time;
            this.lastCoinAdditionTime = time;
        }

        // Check if income generation has started
        if (this.incomeGenerationStarted) {
            
            // Check if one second has passed since last income was added
            if (time - this.lastIncomeTime > 1000) {
                this.updateStats();
                this.lastIncomeTime = time;
            }

            // Check if 60 seconds have passed since the last coin update
            if(time - this.lastCoinAdditionTime > 60000) {
                this.determineRandomEvent();
                let coins = this.addCoins();
                this.saveStats(coins);
                this.lastCoinAdditionTime = time;
            }
        }
    }

    handleMessage(event) {
        // Security check: Verify the origin of the message
        if (event.origin !== window.location.origin) {
            console.warn('Unknown origin:', event.origin);
            return;
        }
    
        const data = event.data;
    
        if (data.type === 'loadStatsResponse') {
            console.log("Received loadStatsResponse message:", data);
            this.stats = data.stats;
            this.hiddenStats = data.hiddenStats;
    
            // Update stats text
            this.updateStatText();
    
            // Any additional logic needed after loading stats
        } else {
            console.warn('Unknown message type:', data.type);
        }
    }

    // Also need to add changes to stats as population increases (not implemented yet)
    updateStats() {
        this.updateStat('funds', this.hiddenStats.fundsChange);
        this.updateStat('population', this.hiddenStats.populationChange);
        this.updateStat('happiness', this.hiddenStats.happinessChange);
        this.updateStat('pollution', this.hiddenStats.pollutionChange);
        this.updateStat('education', this.hiddenStats.educationChange);
        this.updateStat('poverty', this.hiddenStats.povertyChange);
        this.updateStat('energyQuota', this.hiddenStats.energyQuotaChange);
    }

    // Add coins based on the percentage stats (not implemented)
    addCoins() {
        let coins = 0;
        if(this.stats.happiness > 90) {
            coins += 1;
        }
        if(this.stats.education > 90) {
            coins += 1;
        }
        if(this.stats.poverty > 90) {
            coins += 1;
        }
        if(this.stats.energyQuota > 90) {
            coins += 1;
        }
        console.log("Coins added:", coins);
        return coins;
    }

    // Need to change to manually make the buttons so the positions are distributed more evenly based on text size
    // Create main and SDG management buttons
    createButtons() {
        const buttonData = [
            { name: 'Build Housing', action: () => { this.buildHousing(); } },
            { name: 'Support Local Business', action: () => { this.supportLocalBusiness(); } },
            { name: 'Build Parks', action: () => { this.buildParks(); } },
            { name: 'Build Schools', action: () => { this.buildSchools(); } },
            { name: 'Build Food Banks', action: () => { this.buildFoodBanks(); } },
            { name: 'Build Sustainable Power', action: () => { this.buildSustainablePower(); } },
            { name: 'Fund Recycling Programs', action: () => { this.fundRecyclingPrograms(); } }
        ];
    
        const buttonWidth = 200;
        const buttonHeight = 40;
        const startX = 50;
        const startY = 200;
        const padding = 10;
        const buttonsPerRow = 3;
    
        buttonData.forEach((button, index) => {
            const row = Math.floor(index / buttonsPerRow);
            const col = index % buttonsPerRow;
            const x = startX + col * (buttonWidth + padding);
            const y = startY + row * (buttonHeight + padding);
    
            const buttonObject = this.add.text(x, y, button.name, {
                fontSize: '16px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { x: 10, y: 5 },
                borderRadius: 5
            })
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', button.action)
                .on('pointerover', () => {
                    buttonObject.setStyle({ backgroundColor: '#555' });
                })
                .on('pointerout', () => {
                    buttonObject.setStyle({ backgroundColor: '#000' });
                });
        });
    }
    

    // Button Action Methods
    buildHousing() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('populationGrowth', 1);
            this.updateStat('funds', -cost);
            console.log("Built Housing");
        } else {
            console.log("Insufficient funds to build housing.");
        }
    }

    supportLocalBusiness() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('income', 10);
            this.updateStat('funds', -cost);
            console.log("Supported Local Business");
        } else {
            console.log("Insufficient funds to support local business.");
        }
    }

    buildParks() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('happinessIncrease', 0.05);
            this.updateStat('funds', -cost);
            console.log("Built Parks");
        } else {
            console.log("Insufficient funds to build parks.");
        }
    }

    buildSchools() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('educationIncrease', 0.05);
            this.updateStat('funds', -cost);
            console.log("Built Schools");
        } else {
            console.log("Insufficient funds to build schools.");
        }
    }

    buildFoodBanks() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('povertyIncrease', -0.05);
            this.updateStat('funds', -cost);
            console.log("Built Food Banks");
        } else {
            console.log("Insufficient funds to build food banks.");
        }
    }

    buildSustainablePower() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('energyQuotaIncrease', 0.1);
            this.updateStat('funds', -cost);
            console.log("Built Sustainable Power");
        } else {
            console.log("Insufficient funds to build sustainable power.");
        }
    }

    fundRecyclingPrograms() {
        const cost = 100;
        if (this.stats.funds >= cost) {
            this.updateHiddenStat('pollutionIncrease', -0.05);
            this.updateStat('funds', -cost);
            console.log("Funded Recycling Programs");
        } else {
            console.log("Insufficient funds to fund recycling programs.");
        }
    }

    getStatsText() {
        return `Population: ${Math.round(this.stats.population)}\n` +
            `Funds: $${this.stats.funds}\n` +
            `Happiness: ${Math.round(this.stats.happiness)}%\n` +
            `Pollution: ${Math.round(this.stats.pollution)}%\n` +
            `Education: ${Math.round(this.stats.education)}%\n` +
            `Poverty: ${Math.round(this.stats.poverty)}%\n` +
            `Energy Quota: ${Math.round(this.stats.energyQuota)}%`;
    }

    updateStat(stat, value) {
        // Ensure stats remain within 0-100 for percentage-based stats
        if (['happiness', 'pollution', 'education', 'poverty'].includes(stat)) {
            this.stats[stat] = Phaser.Math.Clamp(this.stats[stat] + value, 0, 100);

        } else {
            // For non-percentage stats like population and funds
            this.stats[stat] += value;
            this.stats[stat] = Math.max(this.stats[stat], 0); // All stats should be non-negative
        }
        this.updateStatText();
    }

	updateHiddenStat(stat, value) {
        this.hiddenStats[stat] += value;
    }

    updateStatText() {
        this.statsText.setText(this.getStatsText());
    }

    createSaveButton() {
        const saveButton = this.add.text(this.cameras.main.width - 80, this.cameras.main.height - 50, "Save", {
            fontSize: '20px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(1, 0.5) // Align to the bottom right
            .setInteractive({ useHandCursor: true });

        saveButton.on('pointerdown', () => {
            this.saveStats(0);
        });

        // Add hover effects for the save button
        saveButton.on('pointerover', () => {
            saveButton.setStyle({ backgroundColor: '#555' });
        });

        saveButton.on('pointerout', () => {
            saveButton.setStyle({ backgroundColor: '#000' });
        });
    }

    saveStats(coins) {
        // Send data to react container
        window.parent.postMessage({ type: 'saveStats', stats: this.stats, hiddenStats: this.hiddenStats, coins: coins }, '*');
    }

    loadStats() {
        // Implement loading logic
        console.log("Loading stats..."); // Currently just logging the message to the console

        window.parent.postMessage({ type: 'loadStats'}, '*');
    }

    loadRandomEvent() {

        const numEvents = 5;
        const randomID = Math.ceil(Math.random() * numEvents);

        const randomEvent = this.randomEvents.find(event => event.id === randomID)

        return randomEvent;
    }

    randomEvent() {
        const randomEvent = this.loadRandomEvent();
        this.updateStat('population', randomEvent.statChange.population);
        this.updateStat('funds', randomEvent.statChange.funds);
        this.updateStat('happiness', randomEvent.statChange.happiness);
        this.updateStat('pollution', randomEvent.statChange.pollution);
        this.updateStat('education', randomEvent.statChange.education);
        this.updateStat('poverty', randomEvent.statChange.poverty);
        this.updateStat('energyQuota', randomEvent.statChange.energyQuota);
        this.updateHiddenStat('populationChange', randomEvent.hiddenStatChange.populationChange);
        this.updateHiddenStat('fundsChange', randomEvent.hiddenStatChange.fundsChange);
        this.updateHiddenStat('happinessChange', randomEvent.hiddenStatChange.happinessChange);
        this.updateHiddenStat('pollutionChange', randomEvent.hiddenStatChange.pollutionChange);
        this.updateHiddenStat('educationChange', randomEvent.hiddenStatChange.educationChange);
        this.updateHiddenStat('povertyChange', randomEvent.hiddenStatChange.povertyChange);
        this.updateHiddenStat('energyQuotaChange', randomEvent.hiddenStatChange.energyQuotaChange);
        console.log("Random Event:", randomEvent);
    }

    determineRandomEvent() {
        // 1/5 change a random event occurs
        const randomNumber = Math.random();
        if(randomNumber < 1) {
            this.randomEvent();
        }
    }

}
