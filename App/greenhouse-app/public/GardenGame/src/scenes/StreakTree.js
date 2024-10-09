class StreakTree extends Phaser.Scene {

	constructor() {
		super("StreakTree");
	}

	create() {
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

		// Switch background image on click (just to show different slides for now. Normally it would switch depending on the player's streak)
		FullTree.setInteractive();
		FullTree.on('pointerdown', () => {
			FullTree.visible = false;
			SeedTree.visible = true;
		});

		HalfTree.setInteractive();
		HalfTree.on('pointerdown', () => {
			HalfTree.visible = false;
			FullTree.visible = true;
		});

		SmallTree.setInteractive();
		SmallTree.on('pointerdown', () => {
			SmallTree.visible = false;
			HalfTree.visible = true;
		});

		SeedTree.setInteractive();
		SeedTree.on('pointerdown', () => {
			SeedTree.visible = false;
			SmallTree.visible = true;
		});
	}
}