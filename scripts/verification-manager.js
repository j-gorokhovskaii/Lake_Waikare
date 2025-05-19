class VerificationManager {
    constructor() {
        this.selectedColors = [];
        this.correctColors = ['red', 'blue', 'yellow', 'green'];
        this.timeLeft = 30; // Give more time for children
        this.timerInterval = null;
        this.init();
    }

    init() {
        // Add event listeners to color buttons
        document.querySelectorAll('.color-button').forEach(button => {
            button.addEventListener('click', () => this.handleColorClick(button));
        });

        // Add event listeners to verification buttons
        document.querySelector('.verify-button').addEventListener('click', () => this.verifyColors());
        document.querySelector('.cancel-button').addEventListener('click', () => this.closeVerification());
    }

    showVerification() {
        const modal = document.getElementById('verificationModal');
        modal.style.display = 'flex';
        this.selectedColors = [];
        this.resetColorButtons();
        this.startTimer();
    }

    startTimer() {
        this.timeLeft = 30;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.timeLeft;
        timerElement.classList.remove('warning');
        
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerElement.textContent = this.timeLeft;
            
            if (this.timeLeft <= 10) {
                timerElement.classList.add('warning');
            }
            
            if (this.timeLeft <= 0) {
                this.closeVerification();
            }
        }, 1000);
    }

    closeVerification() {
        clearInterval(this.timerInterval);
        document.getElementById('verificationModal').style.display = 'none';
        this.selectedColors = [];
        this.resetColorButtons();
    }

    resetColorButtons() {
        document.querySelectorAll('.color-button').forEach(button => {
            button.classList.remove('selected');
        });
    }

    handleColorClick(button) {
        if (this.timeLeft <= 0) return;
        const color = button.dataset.color;
        this.selectedColors.push(color);
        button.classList.add('selected');
    }

    verifyColors() {
        window.location.href = 'home.html';

        if (this.timeLeft <= 0) {
            this.closeVerification();
            return;
        }

        const colorGrid = document.querySelector('.color-grid');
        
        if (this.selectedColors.length !== this.correctColors.length) {
            this.showWrongColors(colorGrid);
            return;
        }

        const isCorrect = this.selectedColors.every((color, index) => 
            color === this.correctColors[index]
        );
        
        if (isCorrect) {
            clearInterval(this.timerInterval);
            window.location.href = 'home.html';
        } else {
            this.showWrongColors(colorGrid);
        }
    }

    showWrongColors(colorGrid) {
        colorGrid.classList.add('wrong-colors');
        setTimeout(() => {
            colorGrid.classList.remove('wrong-colors');
            this.selectedColors = [];
            this.resetColorButtons();
        }, 500);
    }
}

// Initialize verification manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.verificationManager = new VerificationManager();
}); 