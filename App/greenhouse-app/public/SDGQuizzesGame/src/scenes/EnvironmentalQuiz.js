class EnvironmentalQuiz extends Phaser.Scene {
	constructor() {
		super("EnvironmentalQuiz");
	}

	create(){
		const background = this.add.image(-1, 0, "EnvironmentalQuizBG").setOrigin(0, 0);
		background.displayWidth = 1068;
		background.displayHeight = 600;
		background.setTint(0xffffff, 0xffffff, 0x000000, 0x000000);

		const questionText = "What is a key aim of SDG 13 (Climate Action)?";
        const question = this.add.text(100, 50, questionText, {
            fontSize: '32px',
            fill: '#000',
            wordWrap: { width: 800 }
        });
        const questionBg = this.add.rectangle(100, 50, 800, question.height + 20, 0xffffff, 0.7).setOrigin(0, 0);

        // Bring question text to the front
        question.setDepth(1);

		// Define answers and their positions
		const answers = [
			{ text: "Improve global literacy rates", correct: false },
			{ text: "Promote responsible tourism", correct: false },
			{ text: "Ensure access to affordable housing", correct: false },
			{ text: "Take urgent action to combat climate change and its impacts", correct: true }
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