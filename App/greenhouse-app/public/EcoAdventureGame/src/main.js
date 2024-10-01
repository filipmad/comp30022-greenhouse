
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1067,
		height: 600,
		type: Phaser.AUTO,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 0 },
				debug: false // Set to true for debugging visuals in the game
			}
		},
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("EndScreen", EndScreen);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

		this.scene.start("Preload");
	}
}