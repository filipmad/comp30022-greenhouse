class SocialQuiz extends Phaser.Scene {
	constructor() {
		super("SocialQuiz");
	}

	create(){
		const background = this.add.image(-1, 0, "SocialQuizBG").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;
		background.setTint(0xffffff, 0xffffff, 0x000000, 0x000000);

		// Add question text
        const questionText = "What is one of the primary goals of SDG 3 (Good Health and Well-Being)?";
        const question = this.add.text(100, 50, questionText, {
            fontSize: '32px',
            fill: '#000',
            wordWrap: { width: 800 }
        });

		// Adjust background rectangle size based on text height
        const questionBg = this.add.rectangle(100, 50, 800, question.height + 20, 0xffffff, 0.7).setOrigin(0, 0);

		// Bring question text to the front
        question.setDepth(1);

		// Define answers and their positions
		const answers = [
			{ text: "Achieve universal health coverage", correct: true },
			{ text: "Ensure access to clean energy", correct: false },
			{ text: "Promote economic growth", correct: false },
			{ text: "Protect marine ecosystems", correct: false }
		];

		// Create buttons for answers
		answers.forEach((answer, index) => {
			const button = this.add.text(100, 150 + index * 50, answer.text, {
				fontSize: '28px',
				fill: '#000',
				backgroundColor: '#fff',
				padding: { x: 10, y: 5 },
				wordWrap: { width: 800 }
			}).setInteractive();

			// Add click event
			button.on('pointerdown', () => {
				if (answer.correct) {
					button.setStyle({ backgroundColor: '#0f0' }); // Green for correct
				} else {
					button.setStyle({ backgroundColor: '#f00' }); // Red for incorrect
				}
			});
		});
	}
}