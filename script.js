// Application State
let currentQuestionIndex = 0;

// DOM Elements
const categoryEl = document.getElementById('category');
const questionNumberEl = document.getElementById('questionNumber');
const questionTitleEl = document.getElementById('questionTitle');
const questionDescriptionEl = document.getElementById('questionDescription');
const sqlInput = document.getElementById('sqlInput');
const lexInput = document.getElementById('lexInput');
const yaccInput = document.getElementById('yaccInput');
const yaccInputSection = document.getElementById('yaccInputSection');
const lexInputLabel = document.getElementById('lexInputLabel');
const yaccInputLabel = document.getElementById('yaccInputLabel');
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
const lexAnswerContent = document.getElementById('lexAnswerContent');
const yaccAnswerContent = document.getElementById('yaccAnswerContent');
const lexAnswerSection = document.getElementById('lexAnswerSection');
const yaccAnswerSection = document.getElementById('yaccAnswerSection');
const lexAnswerTitle = document.getElementById('lexAnswerTitle');
const yaccAnswerTitle = document.getElementById('yaccAnswerTitle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const topicsToggle = document.getElementById('topicsToggle');
const topicsDropdown = document.getElementById('topicsDropdown');
const topicsGrid = document.getElementById('topicsGrid');

// Determine which input mode we're in
const isLexYaccMode = lexInput !== null;

// Initialize the application
function init() {
    generateTopics();
    loadQuestion(currentQuestionIndex);
    updateNavigationButtons();
    attachEventListeners();
    setupTextareaEnhancements();
}

// Generate topics from questions
function generateTopics() {
    // Group questions by category
    const topicsMap = new Map();

    questions.forEach((question, index) => {
        if (!topicsMap.has(question.category)) {
            topicsMap.set(question.category, []);
        }
        topicsMap.get(question.category).push(index);
    });

    // Create topic items
    topicsGrid.innerHTML = '';
    topicsMap.forEach((questionIndices, category) => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.innerHTML = `
            <div class="topic-name">${category}</div>
            <div class="topic-count">${questionIndices.length} question${questionIndices.length > 1 ? 's' : ''}</div>
        `;

        topicItem.addEventListener('click', () => {
            jumpToTopic(questionIndices[0]);
        });

        topicsGrid.appendChild(topicItem);
    });
}

// Toggle topics dropdown
function toggleTopics() {
    const isHidden = topicsDropdown.classList.contains('hidden');

    if (isHidden) {
        topicsDropdown.classList.remove('hidden');
        topicsToggle.classList.add('active');
        topicsToggle.textContent = '✕ Close Topics';
    } else {
        topicsDropdown.classList.add('hidden');
        topicsToggle.classList.remove('active');
        topicsToggle.textContent = '📚 Browse Topics';
    }
}

// Jump to a specific topic
function jumpToTopic(questionIndex) {
    currentQuestionIndex = questionIndex;
    loadQuestion(currentQuestionIndex);
    updateNavigationButtons();

    // Close topics dropdown
    topicsDropdown.classList.add('hidden');
    topicsToggle.classList.remove('active');
    topicsToggle.textContent = '📚 Browse Topics';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Enhanced SQL normalization - very flexible
function normalizeSQL(sql) {
    let normalized = sql
        .toLowerCase()
        // Remove comments
        .replace(/--.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .replace(/\s*([(),;=<>])\s*/g, '$1')
        // Handle common variations
        .replace(/varchar2/g, 'varchar')
        .replace(/number\([^)]*\)/g, 'number')
        .replace(/decimal\([^)]*\)/g, 'decimal')
        .replace(/int(?:eger)?/g, 'int')
        // Remove trailing semicolon
        .replace(/;+$/g, '')
        .trim();

    // Normalize column definitions - order doesn't matter for constraints
    normalized = normalizeConstraintOrder(normalized);

    return normalized;
}

// Normalize constraint order in CREATE/ALTER statements
function normalizeConstraintOrder(sql) {
    // For column definitions like: col INT PRIMARY KEY NOT NULL
    // Extract and sort constraints
    const constraintPattern = /(primary key|foreign key|unique|not null|check|default|references)/gi;

    // Split by comma to handle each column/constraint separately
    const parts = sql.split(',');
    const normalizedParts = parts.map(part => {
        const constraints = [];
        let basePart = part;

        // Extract constraints
        let match;
        const regex = new RegExp(constraintPattern);
        while ((match = regex.exec(part)) !== null) {
            constraints.push(match[0].toLowerCase());
        }

        // Remove constraints and reconstruct with sorted order
        if (constraints.length > 0) {
            basePart = part.replace(constraintPattern, '').replace(/\s+/g, ' ').trim();
            constraints.sort();
            return basePart + ' ' + constraints.join(' ');
        }

        return part;
    });

    return normalizedParts.join(',');
}

// Extract SQL tokens (keywords, identifiers, values)
function extractTokens(sql) {
    const normalized = normalizeSQL(sql);

    // Split by common delimiters but keep them
    const tokens = normalized
        .split(/([(),;=<>])/)
        .map(t => t.trim())
        .filter(t => t.length > 0);

    return tokens;
}

// Extract essential SQL components
function extractComponents(sql) {
    const normalized = normalizeSQL(sql);
    const components = {
        operation: '',
        tables: [],
        columns: [],
        constraints: [],
        keywords: new Set(),
        values: []
    };

    // Detect main operation
    if (/^create\s+table/i.test(sql)) components.operation = 'create_table';
    else if (/^alter\s+table/i.test(sql)) components.operation = 'alter_table';
    else if (/^drop\s+table/i.test(sql)) components.operation = 'drop_table';
    else if (/^truncate/i.test(sql)) components.operation = 'truncate';
    else if (/^insert\s+into/i.test(sql)) components.operation = 'insert';
    else if (/^update/i.test(sql)) components.operation = 'update';
    else if (/^delete/i.test(sql)) components.operation = 'delete';
    else if (/^select/i.test(sql)) components.operation = 'select';

    // Extract table names
    const tableMatches = sql.match(/(?:from|into|table|join|update)\s+(\w+)/gi);
    if (tableMatches) {
        tableMatches.forEach(match => {
            const table = match.split(/\s+/).pop();
            if (table) components.tables.push(table.toLowerCase());
        });
    }

    // Extract column names (simplified)
    const columnMatches = sql.match(/\b(\w+)\s+(?:varchar|int|number|decimal|date|char)/gi);
    if (columnMatches) {
        columnMatches.forEach(match => {
            const col = match.split(/\s+/)[0];
            if (col) components.columns.push(col.toLowerCase());
        });
    }

    // Extract constraints
    const constraints = ['primary key', 'foreign key', 'unique', 'not null', 'check', 'default', 'references'];
    constraints.forEach(constraint => {
        if (normalized.includes(constraint)) {
            components.constraints.push(constraint);
        }
    });

    // Extract SQL keywords
    const keywords = [
        'select', 'from', 'where', 'insert', 'into', 'values', 'update', 'set', 'delete',
        'create', 'alter', 'drop', 'table', 'add', 'modify', 'column', 'rename', 'to',
        'join', 'inner', 'left', 'right', 'outer', 'on', 'as', 'group by', 'order by',
        'having', 'distinct', 'and', 'or', 'not', 'in', 'between', 'like', 'is null',
        'exists', 'union', 'truncate', 'commit', 'rollback', 'savepoint'
    ];

    keywords.forEach(keyword => {
        if (normalized.includes(keyword)) {
            components.keywords.add(keyword);
        }
    });

    return components;
}

// Calculate enhanced similarity score
function calculateSimilarity(userSQL, correctSQL) {
    const userNormalized = normalizeSQL(userSQL);
    const correctNormalized = normalizeSQL(correctSQL);

    // Exact match after normalization
    if (userNormalized === correctNormalized) {
        return 100;
    }

    // Very close match (minor differences only)
    const similarity = stringSimilarity(userNormalized, correctNormalized);
    if (similarity > 0.95) {
        return 100;
    }

    // Component-based comparison
    const userComponents = extractComponents(userSQL);
    const correctComponents = extractComponents(correctSQL);

    let score = 0;
    let totalWeight = 0;

    // Operation match (30% weight)
    const operationWeight = 30;
    totalWeight += operationWeight;
    if (userComponents.operation === correctComponents.operation) {
        score += operationWeight;
    }

    // Table names (20% weight)
    const tableWeight = 20;
    totalWeight += tableWeight;
    const tableScore = arrayOverlap(userComponents.tables, correctComponents.tables);
    score += tableScore * tableWeight;

    // Column names (15% weight)
    const columnWeight = 15;
    totalWeight += columnWeight;
    const columnScore = arrayOverlap(userComponents.columns, correctComponents.columns);
    score += columnScore * columnWeight;

    // Constraints (20% weight)
    const constraintWeight = 20;
    totalWeight += constraintWeight;
    const constraintScore = arrayOverlap(userComponents.constraints, correctComponents.constraints);
    score += constraintScore * constraintWeight;

    // Keywords (15% weight)
    const keywordWeight = 15;
    totalWeight += keywordWeight;
    const userKeywords = Array.from(userComponents.keywords);
    const correctKeywords = Array.from(correctComponents.keywords);
    const keywordScore = arrayOverlap(userKeywords, correctKeywords);
    score += keywordScore * keywordWeight;

    return Math.round(Math.min(100, (score / totalWeight) * 100));
}

// Calculate array overlap (Jaccard similarity)
function arrayOverlap(arr1, arr2) {
    if (arr1.length === 0 && arr2.length === 0) return 1;
    if (arr1.length === 0 || arr2.length === 0) return 0;

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size;
}

// Calculate string similarity (Levenshtein-based)
function stringSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance algorithm
function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

// Check user's answer with improved logic
function checkAnswer() {
    const question = questions[currentQuestionIndex];

    if (isLexYaccMode) {
        // Lex & Yacc mode
        const userLexAnswer = lexInput.value.trim();
        const correctLexAnswer = question.lexAnswer || question.answer;

        if (!userLexAnswer) {
            showFeedback('incorrect', 'Please enter your Lex code', 'You need to write something before checking your answer.');
            return;
        }

        if (question.hasYacc) {
            // Check both Lex and Yacc answers
            const userYaccAnswer = yaccInput.value.trim();
            const correctYaccAnswer = question.yaccAnswer;

            if (!userYaccAnswer) {
                showFeedback('incorrect', 'Please enter both Lex and Yacc code', 'You need to complete both files before checking your answer.');
                return;
            }

            const lexSimilarity = calculateSimilarity(userLexAnswer, correctLexAnswer);
            const yaccSimilarity = calculateSimilarity(userYaccAnswer, correctYaccAnswer);
            const avgSimilarity = Math.round((lexSimilarity + yaccSimilarity) / 2);

            if (lexSimilarity === 100 && yaccSimilarity === 100) {
                showFeedback('correct', 'Perfect!', 'Both your Lex and Yacc files are correct! Well done!');
            } else if (avgSimilarity >= 85) {
                showFeedback('nearly-correct', 'Nearly there!',
                    `Your answer is very close (Lex: ${lexSimilarity}%, Yacc: ${yaccSimilarity}%). There might be minor syntax differences, but you've got the right idea!`);
            } else if (avgSimilarity >= 65) {
                showFeedback('nearly-correct', 'Good attempt!',
                    `You're on the right track (Lex: ${lexSimilarity}%, Yacc: ${yaccSimilarity}%). Check the structure and keywords. Consider reviewing the hint.`);
            } else {
                showFeedback('incorrect', 'Not quite right',
                    `Your answer needs more work (Lex: ${lexSimilarity}%, Yacc: ${yaccSimilarity}%). Try using the hint to guide you, or check the correct answer to learn.`);
            }
        } else {
            // Check only Lex answer
            const similarity = calculateSimilarity(userLexAnswer, correctLexAnswer);

            if (similarity === 100) {
                showFeedback('correct', 'Perfect!', 'Your answer is correct! Well done!');
            } else if (similarity >= 85) {
                showFeedback('nearly-correct', 'Nearly there!',
                    `Your answer is very close (${similarity}% match). There might be minor syntax differences, but you've got the right idea!`);
            } else if (similarity >= 65) {
                showFeedback('nearly-correct', 'Good attempt!',
                    `You're on the right track (${similarity}% match). Check the structure and keywords. Consider reviewing the hint.`);
            } else {
                showFeedback('incorrect', 'Not quite right',
                    `Your answer needs more work (${similarity}% match). Try using the hint to guide you, or check the correct answer to learn.`);
            }
        }
    } else {
        // SQL mode
        const userAnswer = sqlInput.value.trim();
        const correctAnswer = question.answer;

        if (!userAnswer) {
            showFeedback('incorrect', 'Please enter a SQL query', 'You need to write something before checking your answer.');
            return;
        }

        const similarity = calculateSimilarity(userAnswer, correctAnswer);

        if (similarity === 100) {
            showFeedback('correct', 'Perfect!', 'Your answer is correct! Well done!');
        } else if (similarity >= 85) {
            showFeedback('nearly-correct', 'Nearly there!',
                `Your answer is very close (${similarity}% match). There might be minor syntax differences, but you've got the right idea!`);
        } else if (similarity >= 65) {
            showFeedback('nearly-correct', 'Good attempt!',
                `You're on the right track (${similarity}% match). Check the structure and keywords. Consider reviewing the hint.`);
        } else {
            showFeedback('incorrect', 'Not quite right',
                `Your answer needs more work (${similarity}% match). Try using the hint to guide you, or check the correct answer to learn.`);
        }
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
    if (isLexYaccMode) {
        lexInput.value = '';
        if (yaccInput) yaccInput.value = '';
        feedbackBox.classList.add('hidden');
        lexInput.focus();
    } else {
        sqlInput.value = '';
        feedbackBox.classList.add('hidden');
        sqlInput.focus();
    }
}

// Setup textarea enhancements (Tab and Auto-indent)
function setupTextareaEnhancements() {
    // Helper function to add enhancements to a textarea
    function enhanceTextarea(textarea) {
        if (!textarea) return;

        textarea.addEventListener('keydown', function(e) {
            // Handle Tab key - insert 4 spaces
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const value = this.value;

                // Insert 4 spaces
                this.value = value.substring(0, start) + '    ' + value.substring(end);

                // Move cursor after the inserted spaces
                this.selectionStart = this.selectionEnd = start + 4;
                return;
            }

            // Handle Enter key - auto-indent
            if (e.key === 'Enter') {
                e.preventDefault();

                const start = this.selectionStart;
                const value = this.value;

                // Get current line
                const beforeCursor = value.substring(0, start);
                const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
                const currentLine = beforeCursor.substring(currentLineStart);

                // Calculate current indentation
                const indentMatch = currentLine.match(/^(\s*)/);
                let indent = indentMatch ? indentMatch[1] : '';

                // Check if line ends with opening bracket
                const trimmedLine = currentLine.trim();
                if (trimmedLine.endsWith('(')) {
                    indent += '    '; // Add extra indentation
                }

                // Insert newline with indentation
                const newText = '\n' + indent;
                this.value = value.substring(0, start) + newText + value.substring(this.selectionEnd);

                // Move cursor to end of inserted text
                this.selectionStart = this.selectionEnd = start + newText.length;
                return;
            }

            // Handle Ctrl/Cmd + Enter to check answer
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                checkAnswer();
                return;
            }
        });
    }

    // Apply enhancements based on mode
    if (isLexYaccMode) {
        enhanceTextarea(lexInput);
        enhanceTextarea(yaccInput);
    } else {
        enhanceTextarea(sqlInput);
    }
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

    if (isLexYaccMode) {
        // Lex & Yacc mode
        if (question.hasYacc) {
            // Show both inputs
            yaccInputSection.classList.remove('hidden');
            lexInputLabel.textContent = question.lexTitle || 'Lex File:';
            yaccInputLabel.textContent = question.yaccTitle || 'Yacc File:';

            // Update answer sections
            if (lexAnswerContent && yaccAnswerContent) {
                lexAnswerContent.textContent = question.lexAnswer;
                yaccAnswerContent.textContent = question.yaccAnswer;
                lexAnswerTitle.textContent = question.lexTitle || 'Lex File';
                yaccAnswerTitle.textContent = question.yaccTitle || 'Yacc File';
                yaccAnswerSection.classList.remove('hidden');
            }
        } else {
            // Show only Lex input
            yaccInputSection.classList.add('hidden');
            lexInputLabel.textContent = 'Your Code:';

            // Update answer sections
            if (lexAnswerContent) {
                lexAnswerContent.textContent = question.answer;
                lexAnswerTitle.textContent = 'Correct Answer';
                if (yaccAnswerSection) {
                    yaccAnswerSection.classList.add('hidden');
                }
            }
        }

        // Clear inputs and feedback
        lexInput.value = '';
        if (yaccInput) yaccInput.value = '';
        feedbackBox.classList.add('hidden');

        // Focus on first input
        setTimeout(() => lexInput.focus(), 300);
    } else {
        // SQL mode
        if (answerContent) {
            answerContent.textContent = question.answer;
        }

        // Clear input and feedback
        sqlInput.value = '';
        feedbackBox.classList.add('hidden');

        // Focus on input
        setTimeout(() => sqlInput.focus(), 300);
    }

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
    topicsToggle.addEventListener('click', toggleTopics);
    checkBtn.addEventListener('click', checkAnswer);
    clearBtn.addEventListener('click', clearInput);
    hintBtn.addEventListener('click', toggleHint);
    answerBtn.addEventListener('click', toggleAnswer);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);

    // Keyboard navigation (only when not in textarea)
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
console.log('%cFeatures:', 'font-size: 14px; font-weight: bold; margin-top: 10px;');
console.log('📚 Browse Topics    : Jump to specific SQL topics');
console.log('Tab                : Insert 4 spaces');
console.log('Enter (after "(")  : Auto-indent with extra level');
console.log('Ctrl/Cmd + Enter   : Check answer');
console.log('←  →               : Navigate between questions (when not typing)');
console.log('H                  : Toggle hint (when not typing)');
console.log('A                  : Toggle answer (when not typing)');
console.log(`\n📊 Total Questions: ${questions.length}`);
