class SocialQuiz extends Phaser.Scene {
    constructor() {
        super("SocialQuiz");
    }

    create(){
        // Background Setup
        const background = this.add.image(-1, 0, "SocialQuizBG").setOrigin(0, 0);
        background.displayWidth = 1068;
        background.displayHeight = 600;
        background.setTint(0xffffff, 0xffffff, 0x000000, 0x000000);

        // Questions Array
		this.getQuestions();

        this.currentQuestionIndex = 0; // Track the current question
        this.isGameOver = false;

        this.displayQuestion();
    }

    displayQuestion() {

        // Clear previous question and answers if any
        if (this.questionText) this.questionText.destroy();
        if (this.questionBg) this.questionBg.destroy();
        if (this.answerButtons) {
            this.answerButtons.forEach(button => button.destroy());
            this.answerButtons = [];
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];

        this.questionBg = this.add.rectangle(100, 50, 800, 100, 0xffffff, 0.7).setOrigin(0, 0);

        this.questionText = this.add.text(100, 50, currentQuestion.question, {
            fontSize: '32px',
            fill: '#000',
            wordWrap: { width: 800 }
        });
        this.questionText.setDepth(1);

        this.answerButtons = currentQuestion.answers.map((answer, index) => {
            const button = this.add.text(100, 170 + index * 60, answer.text, {
                fontSize: '28px',
                fill: '#000',
                backgroundColor: '#fff',
                padding: { x: 10, y: 5 },
                wordWrap: { width: 800 }
            }).setInteractive({ useHandCursor: true });

            button.on('pointerdown', () => {
                if (this.isGameOver) return; // Prevent multiple clicks
                if (answer.correct) {
                    button.setStyle({ backgroundColor: '#0f0' });
                    this.handleCorrectAnswer();
                } else {
                    button.setStyle({ backgroundColor: '#f00' });
                    this.isGameOver = true;
                    this.showYouLoseOverlay();
                }
            });

            return button;
        });
    }

    handleCorrectAnswer() {
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.5).setOrigin(0);

        const correctText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Correct Answer!", {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.answerButtons.forEach(button => button.disableInteractive());

		// Add coin animation

		this.addCoins(this.currentQuestionIndex + 1);

        // After a delay, proceed to the next question or end the quiz
        this.time.delayedCall(2000, () => {
            overlay.destroy();
            correctText.destroy();
            this.currentQuestionIndex++;

            if (this.currentQuestionIndex < this.questions.length) {
                this.displayQuestion();
                this.isGameOver = false;
            } else {
                this.showYouWinOverlay();
            }
        }, [], this);
    }

    showYouLoseOverlay() {
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7).setOrigin(0);

        const youLoseText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, "You Lose!", {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        const retryText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 20, "Returning to Quiz Selection...", {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.input.enabled = false;

        // After a delay, switch to the quiz selection scene
        this.time.delayedCall(2000, () => {
            this.scene.start("Level");
        }, [], this);
    }

    showYouWinOverlay() {
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7).setOrigin(0);

        const youWinText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, "You Win!", {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        const proceedText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 20, "Returning to Quiz Selection...", {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.input.enabled = false;

		// Add coin animation

		this.addBonusCoins();

        // After a delay, go back to the quiz selection scene
        this.time.delayedCall(2000, () => {
            this.scene.start("Level");
        }, [], this);
    }

	getQuestions() {
		// get random questions from the database
		// Probably 10 questions per quiz

        // Format: {question, answers, correctAnswerIndex} 
        // Again not 100% sure how this will look in the database

		// sample questions for now
		this.questions = [
            {
                question: "What is one of the primary goals of SDG 3 (Good Health and Well-Being)?",
                answers: [
                    { text: "Achieve universal health coverage", correct: true },
                    { text: "Ensure access to clean energy", correct: false },
                    { text: "Promote economic growth", correct: false },
                    { text: "Protect marine ecosystems", correct: false }
                ]
            },
            {
                question: "Which SDG focuses on quality education?",
                answers: [
                    { text: "SDG 4", correct: true },
                    { text: "SDG 5", correct: false },
                    { text: "SDG 6", correct: false },
                    { text: "SDG 7", correct: false }
                ]
            },
        ];
    }

	addCoins(questionNum) {
		const coins = questionNum;

		// Add coins to user
		console.log("Coins added: " + coins);
	}

	addBonusCoins() {
		const coins = 100;

		// Add bonus coins to user for completing the quiz
        console.log(coins + " Bonus coins added!");
	}
}

