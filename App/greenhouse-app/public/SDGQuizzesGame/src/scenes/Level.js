class Level extends Phaser.Scene {

	constructor() {
		super("Level");
	}

	create() {
		const socialLink = this.add.image(-1, 0, "social").setOrigin(0, 0);
		socialLink.displayWidth = 1067/3;
		socialLink.displayHeight = 600;

		socialLink.setInteractive();
		socialLink.on("pointerdown", () => {
			this.scene.start("SocialQuiz");
		});
        socialLink.on("pointerover", () => {
            socialLink.setTint(0xaaaaaa);
            this.tweens.add({
                targets: socialLink,
                alpha: 0.7,
                duration: 800,
                ease: 'Power1'
            });
        });
        socialLink.on("pointerout", () => {
            socialLink.clearTint();
            this.tweens.add({
                targets: socialLink,
                alpha: 1,
                duration: 800,
                ease: 'Power1'
            });
        });

		const economicLink = this.add.image(1067/3 - 1, 0, "economy").setOrigin(0, 0);
		economicLink.displayWidth = 1067/3 + 1;
		economicLink.displayHeight = 600;

		economicLink.setInteractive();
		economicLink.on("pointerdown", () => {
			this.scene.start("EconomicQuiz");
		});
        economicLink.on("pointerover", () => {
            economicLink.setTint(0xaaaaaa);
            this.tweens.add({
                targets: economicLink,
                alpha: 0.7,
                duration: 800,
                ease: 'Power1'
            });
        });
        economicLink.on("pointerout", () => {
            economicLink.clearTint();
            this.tweens.add({
                targets: economicLink,
                alpha: 1,
                duration: 800,
                ease: 'Power1'
            });
        });

		const environmentalLink = this.add.image(1067/3*2, 0, "environment").setOrigin(0, 0);
		environmentalLink.displayWidth = 1067/3;
		environmentalLink.displayHeight = 600;

		environmentalLink.setInteractive();
		environmentalLink.on("pointerdown", () => {
			this.scene.start("EnvironmentalQuiz");
		});
        environmentalLink.on("pointerover", () => {
            environmentalLink.setTint(0xaaaaaa);
            this.tweens.add({
                targets: environmentalLink,
                alpha: 0.7,
                duration: 800,
                ease: 'Power1'
            });
        });
        environmentalLink.on("pointerout", () => {
            environmentalLink.clearTint();
            this.tweens.add({
                targets: environmentalLink,
                alpha: 1,
                duration: 800,
                ease: 'Power1'
            });
        });
	}

}

