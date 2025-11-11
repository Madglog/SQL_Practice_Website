// Application State
let currentQuestionIndex = 0;

// DOM Elements
const categoryEl = document.getElementById('category');
const questionNumberEl = document.getElementById('questionNumber');
const questionTitleEl = document.getElementById('questionTitle');
const questionDescriptionEl = document.getElementById('questionDescription');
const sqlInput = document.getElementById('sqlInput');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const hintBtn = document.getElementById('hintBtn');
const answerBtn = document.getElementById('answerBtn');
const hintBox = document.getElementById('hintBox');
const answerBox = document.getElementById('answerBox');
const feedbackBox = document.getElementById('feedbackBox');
const feedbackContent = document.getElementById('feedbackContent');
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

// Normalize SQL for comparison
function normalizeSQL(sql) {
    return sql
        .toLowerCase()
        .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
        .replace(/\(\s+/g, '(')         // Remove space after opening parenthesis
        .replace(/\s+\)/g, ')')         // Remove space before closing parenthesis
        .replace(/,\s+/g, ',')          // Normalize commas
        .replace(/;\s*$/g, '')          // Remove trailing semicolon
        .trim();
}

// Extract SQL keywords from a query
function extractKeywords(sql) {
    const normalized = normalizeSQL(sql);
    const keywords = [
        'select', 'from', 'where', 'insert', 'update', 'delete', 'create', 'alter', 'drop',
        'table', 'into', 'values', 'set', 'join', 'inner', 'left', 'right', 'outer', 'on',
        'group by', 'order by', 'having', 'distinct', 'as', 'and', 'or', 'not', 'in', 'between',
        'like', 'is null', 'is not null', 'exists', 'union', 'truncate', 'rename', 'modify',
        'add', 'constraint', 'primary key', 'foreign key', 'references', 'unique', 'check',
        'default', 'not null', 'count', 'sum', 'avg', 'max', 'min', 'round', 'upper', 'lower',
        'concat', 'substring', 'length', 'trim', 'cast', 'to_char', 'to_number', 'sysdate',
        'extract', 'commit', 'rollback', 'savepoint', 'grant', 'revoke', 'view', 'index',
        'procedure', 'function', 'trigger', 'cursor', 'declare', 'begin', 'end', 'if', 'then',
        'else', 'elsif', 'loop', 'while', 'for', 'exit', 'return', 'varchar', 'varchar2',
        'number', 'integer', 'int', 'decimal', 'date', 'timestamp', 'char', 'blob', 'clob'
    ];

    const found = new Set();
    keywords.forEach(keyword => {
        if (normalized.includes(keyword)) {
            found.add(keyword);
        }
    });

    return found;
}

// Calculate similarity score between two SQL queries
function calculateSimilarity(userSQL, correctSQL) {
    const userNormalized = normalizeSQL(userSQL);
    const correctNormalized = normalizeSQL(correctSQL);

    // Exact match
    if (userNormalized === correctNormalized) {
        return 100;
    }

    // Extract keywords
    const userKeywords = extractKeywords(userSQL);
    const correctKeywords = extractKeywords(correctSQL);

    // Calculate keyword overlap
    const intersection = new Set([...userKeywords].filter(k => correctKeywords.has(k)));
    const union = new Set([...userKeywords, ...correctKeywords]);

    const keywordScore = union.size > 0 ? (intersection.size / union.size) * 100 : 0;

    // Check for common patterns
    let patternScore = 0;
    const patterns = [
        { regex: /create\s+table/i, weight: 10 },
        { regex: /alter\s+table/i, weight: 10 },
        { regex: /insert\s+into/i, weight: 10 },
        { regex: /select\s+.*\s+from/i, weight: 10 },
        { regex: /where/i, weight: 5 },
        { regex: /join/i, weight: 8 },
        { regex: /group\s+by/i, weight: 8 },
        { regex: /order\s+by/i, weight: 5 },
        { regex: /primary\s+key/i, weight: 8 },
        { regex: /foreign\s+key/i, weight: 8 }
    ];

    patterns.forEach(({ regex, weight }) => {
        const inUser = regex.test(userSQL);
        const inCorrect = regex.test(correctSQL);
        if (inUser && inCorrect) {
            patternScore += weight;
        }
    });

    // Combine scores
    return Math.min(100, (keywordScore * 0.6) + (patternScore * 0.4));
}

// Check user's answer
function checkAnswer() {
    const userAnswer = sqlInput.value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (!userAnswer) {
        showFeedback('incorrect', 'Please enter a SQL query', 'You need to write something before checking your answer.');
        return;
    }

    const similarity = calculateSimilarity(userAnswer, correctAnswer);

    if (similarity === 100) {
        showFeedback('correct', 'Perfect!', 'Your answer is exactly correct. Well done!');
    } else if (similarity >= 75) {
        showFeedback('nearly-correct', 'Nearly there!',
            `Your answer is very close (${Math.round(similarity)}% match). Check for minor differences in syntax, spacing, or keywords. Try comparing your answer with the correct one.`);
    } else if (similarity >= 50) {
        showFeedback('nearly-correct', 'Good attempt!',
            `You're on the right track (${Math.round(similarity)}% match). Your query has some correct elements, but needs more work. Consider checking the hint or reviewing the correct answer.`);
    } else {
        showFeedback('incorrect', 'Not quite right',
            `Your answer doesn't match the expected solution (${Math.round(similarity)}% match). Try using the hint to guide you, or check the correct answer to learn the right approach.`);
    }
}

// Show feedback to the user
function showFeedback(type, title, message) {
    feedbackBox.className = 'feedback-box ' + type;

    let icon = '';
    if (type === 'correct') icon = '✓';
    else if (type === 'nearly-correct') icon = '⚠';
    else icon = '✗';

    feedbackContent.innerHTML = `
        <span class="feedback-icon">${icon}</span>
        <div class="feedback-message">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    feedbackBox.classList.remove('hidden');

    // Scroll to feedback
    setTimeout(() => {
        feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Clear input
function clearInput() {
    sqlInput.value = '';
    feedbackBox.classList.add('hidden');
    sqlInput.focus();
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

    // Clear input and feedback
    sqlInput.value = '';
    feedbackBox.classList.add('hidden');

    // Hide hint and answer boxes
    hintBox.classList.add('hidden');
    answerBox.classList.add('hidden');

    // Reset button states
    hintBtn.textContent = 'Show Hint';
    answerBtn.textContent = 'Show Answer';

    // Update progress bar
    updateProgressBar();

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Focus on input
    setTimeout(() => sqlInput.focus(), 300);
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
        nextBtn.textContent = 'Finished!';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Toggle hint visibility
function toggleHint() {
    const isHidden = hintBox.classList.contains('hidden');

    if (isHidden) {
        hintBox.classList.remove('hidden');
        hintBtn.textContent = 'Hide Hint';
    } else {
        hintBox.classList.add('hidden');
        hintBtn.textContent = 'Show Hint';
    }
}

// Toggle answer visibility
function toggleAnswer() {
    const isHidden = answerBox.classList.contains('hidden');

    if (isHidden) {
        answerBox.classList.remove('hidden');
        answerBtn.textContent = 'Hide Answer';
    } else {
        answerBox.classList.add('hidden');
        answerBtn.textContent = 'Show Answer';
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
    checkBtn.addEventListener('click', checkAnswer);
    clearBtn.addEventListener('click', clearInput);
    hintBtn.addEventListener('click', toggleHint);
    answerBtn.addEventListener('click', toggleAnswer);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);

    // Allow Ctrl/Cmd + Enter to check answer
    sqlInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            checkAnswer();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in textarea
        if (document.activeElement === sqlInput) {
            return;
        }

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
console.log('%c🗄️ SQL Practice Hub', 'font-size: 20px; font-weight: bold; color: #D97757;');
console.log('%cKeyboard shortcuts:', 'font-size: 14px; font-weight: bold; margin-top: 10px;');
console.log('Ctrl/Cmd + Enter : Check answer');
console.log('←  →             : Navigate between questions (when not typing)');
console.log('H                : Toggle hint (when not typing)');
console.log('A                : Toggle answer (when not typing)');
console.log(`\n📊 Total Questions: ${questions.length}`);
