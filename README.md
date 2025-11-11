# SQL Practice Website

A beautiful, interactive website to help you practice SQL with 90+ hands-on questions. Type your SQL queries and get instant feedback with intelligent answer checking!

## Features

- **90+ SQL Questions** covering DDL, DML, DQL, Constraints, Functions, Joins, Subqueries, PL/SQL, and more
- **Interactive SQL Input** - Type and test your SQL queries in a dedicated code editor
- **Smart Answer Checking** - Intelligent validation that checks if your answer is correct or nearly correct
- **Similarity Scoring** - Get feedback on how close your answer is (100%, 75%, 50% match)
- **Interactive Hints** - Get helpful keywords and tips for each question
- **Show/Hide Answers** - Reveal SQL solutions with syntax highlighting
- **Progress Tracking** - Visual progress bar and automatic save of your position
- **Keyboard Shortcuts** - Quick navigation and answer checking for efficiency
- **Claude-Inspired UI** - Clean, professional design with warm colors
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## How to Use

### Getting Started

1. Open `index.html` in your web browser
2. Read the question and type your SQL query in the input area
3. Click **"Check Answer"** or press **Ctrl/Cmd + Enter** to validate your answer
4. Your progress is automatically saved!

### Writing SQL Queries

1. Type your SQL query in the code input area
2. Click **"Check Answer"** to validate your solution
3. Get instant feedback:
   - **Perfect!** - 100% match, your answer is exactly correct
   - **Nearly there!** - 75%+ match, very close with minor differences
   - **Good attempt!** - 50-75% match, on the right track but needs work
   - **Not quite right** - Below 50% match, try the hint or check the answer
4. Use **"Clear"** button to reset your input

### Navigation

- Click **"Next →"** to move to the next question
- Click **"← Previous"** to go back
- Use **Arrow Keys** (← →) for keyboard navigation (when not typing)

### Hints & Answers

- Click **"Show Hint"** to see helpful keywords
- Click **"Show Answer"** to reveal the SQL solution
- Click again to hide

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter` : Check your answer
- `←` `→` : Previous/Next question (when not typing)
- `H` : Toggle hint (when not typing)
- `A` : Toggle answer (when not typing)

## Topics Covered

### Data Definition Language (DDL)
- CREATE, ALTER, DROP, TRUNCATE, RENAME TABLE

### Data Manipulation Language (DML)
- INSERT, UPDATE, DELETE

### Data Query Language (DQL)
- SELECT, WHERE, filtering

### Constraints
- PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT

### Functions
- Numeric: ROUND, FLOOR, CEIL, MOD
- String: UPPER, LOWER, CONCAT, LIKE
- Date: SYSDATE, EXTRACT, Date Arithmetic
- Aggregate: COUNT, SUM, AVG, MAX, MIN
- GROUP BY, HAVING

### Operators
- Arithmetic, Comparison, Logical (AND/OR/NOT)
- IN, NOT IN, BETWEEN

### Joins
- INNER JOIN, LEFT JOIN, RIGHT JOIN, NATURAL JOIN

### Subqueries
- Single-row, Multi-row, ANY/ALL, EXISTS

### Advanced Topics
- Views, Index, Type Conversion, Self-Join
- PL/SQL: Variables, IF-ELSE, Loops
- Functions & Procedures
- Cursors & Triggers
- Transactions: COMMIT, ROLLBACK, SAVEPOINT

### SQL Patterns & Best Practices
- Finding duplicates, Pagination, Running totals
- Ranking, Missing values, Production best practices

## File Structure

```
SQL_Practice_Website/
├── index.html       # Main HTML structure
├── styles.css       # Beautiful styling and animations
├── questions.js     # All 90+ SQL questions
├── script.js        # Interactive functionality
└── README.md        # This file
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Tips for Learning

1. **Try Before Looking** - Attempt to write the SQL yourself first
2. **Use Hints Wisely** - Check hints if you're stuck, but try to solve independently
3. **Understand, Don't Memorize** - Focus on understanding why the answer works
4. **Practice Regularly** - Consistent practice is key to mastering SQL
5. **Take Notes** - Keep a notebook for patterns you find challenging

## License

Free to use for personal learning and educational purposes.

## Feedback

Found a bug or have suggestions? Feel free to improve and customize the questions!

---

Happy Learning! 🗄️💻
