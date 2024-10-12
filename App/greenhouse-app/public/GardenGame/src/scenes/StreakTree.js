class StreakTree extends Phaser.Scene {

	constructor() {
		super("StreakTree");
		this.streak = this.getStreak();
	}

	create() {

		// Backgrounds for each tree tier
		const FullTree = this.add.image(0, 0, "FullTree").setOrigin(0, 0);
		FullTree.displayWidth = 1068;
		FullTree.displayHeight = 600;
		FullTree.visible = false;

		const HalfTree = this.add.image(0, 0, "HalfTree").setOrigin(0, 0);
		HalfTree.displayWidth = 1068;
		HalfTree.displayHeight = 600;
		HalfTree.visible = false;

		const SmallTree = this.add.image(0, 0, "SmallTree").setOrigin(0, 0);
		SmallTree.displayWidth = 1068;
		SmallTree.displayHeight = 600;
		SmallTree.visible = false;

		const SeedTree = this.add.image(0, 0, "SeedTree").setOrigin(0, 0);
		SeedTree.displayWidth = 1068;
		SeedTree.displayHeight = 600;
		SeedTree.visible = true;

        this.streakIcon1 = this.add.sprite(-20, 120, 'StreakIcon').setOrigin(0, 1);
		this.streakIcon2 = this.add.sprite(290, 120, 'StreakIcon').setOrigin(0, 1);

		this.streakIcon1.setScale(4);
		this.streakIcon2.setScale(4);
		this.streakIcon1.visible = false;
		this.streakIcon2.visible = false;

        this.anims.create({
			key: "streakIconAnimation",
			frames: [
			  { key: "StreakIcon", frame: 0, duration: 250 },
			  { key: "StreakIcon", frame: 1, duration: 150 },
			  { key: "StreakIcon", frame: 2, duration: 150 },
			  { key: "StreakIcon", frame: 3, duration: 150 },
			  { key: "StreakIcon", frame: 1, duration: 150 },
			],
			repeat: -1
        });

		this.streakIcon1.play('streakIconAnimation');
		this.streakIcon2.play('streakIconAnimation');

		// Create the streak number text
		this.streakNumber = this.add.text(80, 60, `Streak: ${this.streak}`, {
			fontFamily: "Arial",
			fontSize: "48px",
			color: "#ff0000",
			fontStyle: "bold"
		})
		.setOrigin(0, 0.5)
		.setStroke('#ffffff', 6)
		.setShadow(2, 2, "#000000", 4, true, true);


		// Switch background image on click (just to show different slides for now. Normally it would switch depending on the player's streak)
		FullTree.setInteractive();
		FullTree.on('pointerdown', () => {
			FullTree.visible = false;
			SeedTree.visible = true;
			this.streak = 0;
		});

		HalfTree.setInteractive();
		HalfTree.on('pointerdown', () => {
			HalfTree.visible = false;
			FullTree.visible = true;
			this.streak = 20;
		});

		SmallTree.setInteractive();
		SmallTree.on('pointerdown', () => {
			SmallTree.visible = false;
			HalfTree.visible = true;
			this.streak = 10;
		});

		SeedTree.setInteractive();
		SeedTree.on('pointerdown', () => {
			SeedTree.visible = false;
			SmallTree.visible = true;
			this.streak = 5;
		});

		const sign = this.add.image(80, 425, "StreakTreeSign").setOrigin(0, 0);
		sign.displayWidth = 250;
		sign.displayHeight = 250;
		sign.setInteractive();
		sign.on('pointerdown', () => {
			this.scene.start("Level");
		});
	}

	update() {
		this.streakNumber.text = `Streak: ${this.streak}`;
		if (this.streak <= 0) {
			this.streakNumber.setColor("#ff0000");
			this.streakIcon1.visible = false;
			this.streakIcon2.visible = false;
		}
		else if (this.streak <= 5) {
			this.streakNumber.setColor("#00ff00");
			this.streakIcon1.visible = true;
			this.streakIcon2.visible = false;
		}
		else if (this.streak <= 10) {
			this.streakNumber.setColor("#00ff00");
			this.streakIcon1.visible = true;
			this.streakIcon2.visible = true;
		}
		else {
			this.streakNumber.setColor("#00ff00");
			this.streakIcon1.visible = true;
			this.streakIcon2.visible = true;
		}
	}

	getStreak() {
		// Get the player's streak from the database
		return 0;
	}
}