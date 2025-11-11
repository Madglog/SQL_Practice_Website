// Application State
let currentQuestionIndex = 0;

// DOM Elements
const categoryEl = document.getElementById('category');
const questionNumberEl = document.getElementById('questionNumber');
const questionTitleEl = document.getElementById('questionTitle');
const questionDescriptionEl = document.getElementById('questionDescription');
const hintBtn = document.getElementById('hintBtn');
const answerBtn = document.getElementById('answerBtn');
const hintBox = document.getElementById('hintBox');
const answerBox = document.getElementById('answerBox');
const hintContent = document.getElementById('hintContent');
const answerContent = document.getElementById('answerContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Initialize the application
function init() {
    loadQuestion(currentQuestionIndex);
    updateNavigationButtons();
    attachEventListeners();
}

// Load a specific question
function loadQuestion(index) {
    const question = questions[index];

    // Update question content
    categoryEl.textContent = question.category;
    questionNumberEl.textContent = `${index + 1}/${questions.length}`;
    questionTitleEl.textContent = question.title;
    questionDescriptionEl.textContent = question.description;
    hintContent.textContent = question.hint;
    answerContent.textContent = question.answer;

    // Hide hint and answer boxes
    hintBox.classList.add('hidden');
    answerBox.classList.add('hidden');

    // Reset button states
    hintBtn.textContent = '💡 Show Hint';
    answerBtn.textContent = '✓ Show Answer';

    // Update progress bar
    updateProgressBar();

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Update navigation buttons state
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Finished! 🎉';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Toggle hint visibility
function toggleHint() {
    const isHidden = hintBox.classList.contains('hidden');

    if (isHidden) {
        hintBox.classList.remove('hidden');
        hintBtn.textContent = '💡 Hide Hint';
    } else {
        hintBox.classList.add('hidden');
        hintBtn.textContent = '💡 Show Hint';
    }
}

// Toggle answer visibility
function toggleAnswer() {
    const isHidden = answerBox.classList.contains('hidden');

    if (isHidden) {
        answerBox.classList.remove('hidden');
        answerBtn.textContent = '✓ Hide Answer';
    } else {
        answerBox.classList.add('hidden');
        answerBtn.textContent = '✓ Show Answer';
    }
}

// Navigate to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        updateNavigationButtons();
    }
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        updateNavigationButtons();
    }
}

// Attach event listeners
function attachEventListeners() {
    hintBtn.addEventListener('click', toggleHint);
    answerBtn.addEventListener('click', toggleAnswer);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Left arrow - previous question
        if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
            prevQuestion();
        }
        // Right arrow - next question
        else if (e.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
            nextQuestion();
        }
        // 'h' key - toggle hint
        else if (e.key === 'h' || e.key === 'H') {
            toggleHint();
        }
        // 'a' key - toggle answer
        else if (e.key === 'a' || e.key === 'A') {
            toggleAnswer();
        }
    });
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('sqlPracticeProgress', currentQuestionIndex);
}

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('sqlPracticeProgress');
    if (savedProgress !== null) {
        currentQuestionIndex = parseInt(savedProgress, 10);
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0;
        }
    }
}

// Save progress whenever question changes
const originalLoadQuestion = loadQuestion;
loadQuestion = function(index) {
    originalLoadQuestion(index);
    saveProgress();
};

// Load saved progress on startup
window.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    init();
});

// Add visual feedback for button clicks
function addButtonFeedback() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Initialize button feedback
addButtonFeedback();

// Add console message for developers
console.log('%c🗄️ SQL Practice Hub', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cKeyboard shortcuts:', 'font-size: 14px; font-weight: bold; margin-top: 10px;');
console.log('← → : Navigate between questions');
console.log('H   : Toggle hint');
console.log('A   : Toggle answer');
console.log(`\n📊 Total Questions: ${questions.length}`);
