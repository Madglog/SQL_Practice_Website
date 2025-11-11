const questions = [
    // DDL (Data Definition Language)
    {
        category: "DDL",
        title: "CREATE TABLE",
        description: "Write a SQL statement to create a table named 'Books' with columns: BookID (INT, PRIMARY KEY), Title (VARCHAR(100)), and Price (DECIMAL(10,2)).",
        hint: "Use CREATE TABLE with column definitions including data types and constraints",
        answer: `CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(100),
    Price DECIMAL(10,2)
);`
    },
    {
        category: "DDL",
        title: "ALTER TABLE - ADD COLUMN",
        description: "Write a SQL statement to add a new column 'ISBN' (VARCHAR(20)) to the existing 'Books' table.",
        hint: "Use ALTER TABLE with ADD keyword to add a new column",
        answer: `ALTER TABLE Books ADD ISBN VARCHAR(20);`
    },
    {
        category: "DDL",
        title: "ALTER TABLE - RENAME COLUMN",
        description: "Write a SQL statement to rename the 'Price' column to 'BookPrice' in the Books table.",
        hint: "Use ALTER TABLE with RENAME COLUMN to change column name",
        answer: `ALTER TABLE Books RENAME COLUMN Price TO BookPrice;`
    },
    {
        category: "DDL",
        title: "ALTER TABLE - MODIFY COLUMN",
        description: "Write a SQL statement to modify the 'Title' column in Books table to increase its size to VARCHAR(200).",
        hint: "Use ALTER TABLE with MODIFY COLUMN to change column datatype or size",
        answer: `ALTER TABLE Books MODIFY COLUMN Title VARCHAR(200);`
    },
    {
        category: "DDL",
        title: "ALTER TABLE - DROP COLUMN",
        description: "Write a SQL statement to remove the 'PublishedDate' column from the Books table.",
        hint: "Use ALTER TABLE with DROP COLUMN to remove a column",
        answer: `ALTER TABLE Books DROP COLUMN PublishedDate;`
    },
    {
        category: "DDL",
        title: "RENAME TABLE",
        description: "Write a SQL statement to rename the 'Books' table to 'BookDetails'.",
        hint: "Use ALTER TABLE with RENAME TO to change table name",
        answer: `ALTER TABLE Books RENAME TO BookDetails;`
    },
    {
        category: "DDL",
        title: "DROP TABLE",
        description: "Write a SQL statement to permanently delete the 'Authors_Backup' table from the database.",
        hint: "Use DROP TABLE to delete an entire table permanently",
        answer: `DROP TABLE Authors_Backup;`
    },
    {
        category: "DDL",
        title: "TRUNCATE TABLE",
        description: "Write a SQL statement to remove all rows from 'Student_Copy' table while keeping the table structure intact.",
        hint: "Use TRUNCATE TABLE to delete all rows but keep the structure",
        answer: `TRUNCATE TABLE Student_Copy;`
    },

    // DML (Data Manipulation Language)
    {
        category: "DML",
        title: "INSERT",
        description: "Write a SQL statement to insert a new author with AuthorID 101, Name 'Harper Lee', and Nationality 'American' into the Authors table.",
        hint: "Use INSERT INTO with column names and VALUES",
        answer: `INSERT INTO Authors (AuthorID, Name, Nationality)
VALUES (101, 'Harper Lee', 'American');`
    },
    {
        category: "DML",
        title: "UPDATE",
        description: "Write a SQL statement to update the BookPrice to 420.00 for the book with BookID 3001 in the BookDetails table.",
        hint: "Use UPDATE with SET and WHERE clause to modify specific rows",
        answer: `UPDATE BookDetails SET BookPrice = 420.00 WHERE BookID = 3001;`
    },
    {
        category: "DML",
        title: "DELETE",
        description: "Write a SQL statement to delete all books from BookDetails table where PublisherID is 204.",
        hint: "Use DELETE FROM with WHERE clause to remove specific rows",
        answer: `DELETE FROM BookDetails WHERE PublisherID = 204;`
    },

    // DQL (Data Query Language)
    {
        category: "DQL",
        title: "SELECT - Basic",
        description: "Write a SQL statement to retrieve all columns from BookDetails table where AuthorID is 103.",
        hint: "Use SELECT * with WHERE clause to filter rows",
        answer: `SELECT * FROM BookDetails WHERE AuthorID = 103;`
    },
    {
        category: "DQL",
        title: "SELECT - Specific Columns",
        description: "Write a SQL statement to retrieve only the Title and BookPrice columns from the BookDetails table.",
        hint: "Use SELECT with specific column names instead of *",
        answer: `SELECT Title, BookPrice FROM BookDetails;`
    },
    {
        category: "DQL",
        title: "WHERE Clause",
        description: "Write a SQL statement to retrieve all books from BookDetails where the BookPrice is greater than 500.",
        hint: "Use WHERE with comparison operator (>)",
        answer: `SELECT * FROM BookDetails WHERE BookPrice > 500;`
    },

    // Constraints
    {
        category: "Constraints",
        title: "PRIMARY KEY",
        description: "Write a SQL statement to create a Student table with StudentID (INT) as PRIMARY KEY and Name (VARCHAR(50)).",
        hint: "Define PRIMARY KEY constraint in CREATE TABLE statement",
        answer: `CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50)
);`
    },
    {
        category: "Constraints",
        title: "FOREIGN KEY",
        description: "Write a SQL statement to add a FOREIGN KEY constraint on AuthorID column in Books table that references AuthorID in Authors table.",
        hint: "Use ALTER TABLE with ADD FOREIGN KEY and REFERENCES",
        answer: `ALTER TABLE Books
ADD FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID);`
    },
    {
        category: "Constraints",
        title: "NOT NULL",
        description: "Write a SQL statement to modify the Price column in Books table to make it NOT NULL.",
        hint: "Use ALTER TABLE with MODIFY and NOT NULL constraint",
        answer: `ALTER TABLE Books MODIFY Price NUMBER(10,2) NOT NULL;`
    },
    {
        category: "Constraints",
        title: "UNIQUE",
        description: "Write a SQL statement to add a UNIQUE constraint named 'uk_isbn' on the ISBN column in Books table.",
        hint: "Use ALTER TABLE with ADD CONSTRAINT and UNIQUE keyword",
        answer: `ALTER TABLE Books ADD CONSTRAINT uk_isbn UNIQUE (ISBN);`
    },
    {
        category: "Constraints",
        title: "CHECK",
        description: "Write a SQL statement to add a CHECK constraint named 'chk_price' that ensures Price is greater than 0 in Books table.",
        hint: "Use ALTER TABLE with ADD CONSTRAINT and CHECK condition",
        answer: `ALTER TABLE Books ADD CONSTRAINT chk_price CHECK (Price > 0);`
    },
    {
        category: "Constraints",
        title: "DEFAULT",
        description: "Write a SQL statement to set SYSDATE as the default value for PublishedDate column in Books table.",
        hint: "Use ALTER TABLE with MODIFY and DEFAULT keyword",
        answer: `ALTER TABLE Books MODIFY PublishedDate DATE DEFAULT SYSDATE;`
    },

    // Numeric Functions
    {
        category: "Numeric Functions",
        title: "ROUND",
        description: "Write a SQL statement to select BookID and Price (rounded to 2 decimal places) from Books table.",
        hint: "Use ROUND function with column name and decimal places",
        answer: `SELECT BookID, ROUND(Price, 2) FROM Books;`
    },
    {
        category: "Numeric Functions",
        title: "FLOOR and CEIL",
        description: "Write a SQL statement to select Price along with its FLOOR and CEIL values from Books table.",
        hint: "Use FLOOR and CEIL functions to get lowest and highest integers",
        answer: `SELECT Price, FLOOR(Price), CEIL(Price) FROM Books;`
    },
    {
        category: "Numeric Functions",
        title: "MOD",
        description: "Write a SQL statement to find the remainder when Capacity is divided by 100 from Building table.",
        hint: "Use MOD function with two parameters for division remainder",
        answer: `SELECT MOD(Capacity, 100) FROM Building;`
    },

    // String Functions
    {
        category: "String Functions",
        title: "UPPER and LOWER",
        description: "Write a SQL statement to convert all book titles to uppercase from Books table.",
        hint: "Use UPPER function to convert text to uppercase",
        answer: `SELECT UPPER(Title) FROM Books;`
    },
    {
        category: "String Functions",
        title: "CONCAT",
        description: "Write a SQL statement to combine Title and PublisherName with ' - ' separator from Books table.",
        hint: "Use CONCAT function to combine multiple strings",
        answer: `SELECT CONCAT(Title, ' - ', PublisherName) FROM Books;`
    },
    {
        category: "String Functions",
        title: "LIKE Pattern Matching",
        description: "Write a SQL statement to find all books from Books table where Title starts with the letter 'T'.",
        hint: "Use LIKE with % wildcard for pattern matching",
        answer: `SELECT * FROM Books WHERE Title LIKE 'T%';`
    },

    // Date Functions
    {
        category: "Date Functions",
        title: "SYSDATE",
        description: "Write a SQL statement to get the current system date.",
        hint: "Use SYSDATE with SELECT from DUAL",
        answer: `SELECT SYSDATE FROM DUAL;`
    },
    {
        category: "Date Functions",
        title: "EXTRACT",
        description: "Write a SQL statement to extract the year from PublishedDate column in Books table.",
        hint: "Use EXTRACT function with YEAR and FROM keywords",
        answer: `SELECT EXTRACT(YEAR FROM PublishedDate) FROM Books;`
    },
    {
        category: "Date Functions",
        title: "Date Arithmetic",
        description: "Write a SQL statement to calculate age (in years) from DOB column in Student table using current date.",
        hint: "Use MONTHS_BETWEEN function divided by 12 to get years",
        answer: `SELECT MONTHS_BETWEEN(SYSDATE, DOB)/12 AS Age FROM Student;`
    },

    // Aggregate Functions
    {
        category: "Aggregate Functions",
        title: "COUNT",
        description: "Write a SQL statement to count the total number of books in Books table.",
        hint: "Use COUNT(*) or COUNT(column) to count rows",
        answer: `SELECT COUNT(*) FROM Books;`
    },
    {
        category: "Aggregate Functions",
        title: "SUM",
        description: "Write a SQL statement to calculate the total sum of all BookPrice values in BookDetails table.",
        hint: "Use SUM function with column name",
        answer: `SELECT SUM(BookPrice) FROM BookDetails;`
    },
    {
        category: "Aggregate Functions",
        title: "AVG",
        description: "Write a SQL statement to calculate the average BookPrice in BookDetails table.",
        hint: "Use AVG function to calculate average of column values",
        answer: `SELECT AVG(BookPrice) FROM BookDetails;`
    },
    {
        category: "Aggregate Functions",
        title: "MAX and MIN",
        description: "Write a SQL statement to find the highest and lowest Price from Books table.",
        hint: "Use MAX and MIN functions to find maximum and minimum values",
        answer: `SELECT MAX(Price), MIN(Price) FROM Books;`
    },
    {
        category: "Aggregate Functions",
        title: "GROUP BY",
        description: "Write a SQL statement to find the average Price for each PublisherID in Books table.",
        hint: "Use GROUP BY with aggregate function to group rows",
        answer: `SELECT PublisherID, AVG(Price) FROM Books GROUP BY PublisherID;`
    },
    {
        category: "Aggregate Functions",
        title: "HAVING",
        description: "Write a SQL statement to find PublisherIDs where average Price is greater than 1000, grouped by PublisherID.",
        hint: "Use HAVING clause after GROUP BY to filter groups",
        answer: `SELECT PublisherID, AVG(Price) FROM Books
GROUP BY PublisherID HAVING AVG(Price) > 1000;`
    },

    // SQL Operators
    {
        category: "SQL Operators",
        title: "Arithmetic Operators",
        description: "Write a SQL statement to select Title and Price increased by 100 from Books table.",
        hint: "Use arithmetic operator (+) in SELECT clause",
        answer: `SELECT Title, Price + 100 FROM Books;`
    },
    {
        category: "SQL Operators",
        title: "Comparison with AND",
        description: "Write a SQL statement to find books where Price is greater than 500 AND PublishedDate is after 2020-01-01.",
        hint: "Use comparison operators with AND logical operator",
        answer: `SELECT * FROM Books WHERE Price > 500 AND PublishedDate > '2020-01-01';`
    },
    {
        category: "SQL Operators",
        title: "Logical OR Operator",
        description: "Write a SQL statement to find books where Price is less than 300 OR PublishedDate is before 2015-01-01.",
        hint: "Use OR logical operator to combine conditions",
        answer: `SELECT * FROM Books WHERE Price < 300 OR PublishedDate < '2015-01-01';`
    },
    {
        category: "SQL Operators",
        title: "IN Operator",
        description: "Write a SQL statement to find all books where PublisherID is 1, 2, or 5.",
        hint: "Use IN operator with a list of values",
        answer: `SELECT * FROM Books WHERE PublisherID IN (1, 2, 5);`
    },
    {
        category: "SQL Operators",
        title: "BETWEEN Operator",
        description: "Write a SQL statement to find all books where Price is between 500 and 1000 (inclusive).",
        hint: "Use BETWEEN operator with range values",
        answer: `SELECT * FROM Books WHERE Price BETWEEN 500 AND 1000;`
    },

    // Joins
    {
        category: "Joins",
        title: "INNER JOIN",
        description: "Write a SQL statement to join Doctor and Patient tables, showing doctor Name and PatientName for matching DoctorID.",
        hint: "Use INNER JOIN with ON condition to match rows from both tables",
        answer: `SELECT d.Name, p.PatientName
FROM Doctor d INNER JOIN Patient p ON d.DoctorID = p.DoctorID;`
    },
    {
        category: "Joins",
        title: "LEFT JOIN",
        description: "Write a SQL statement to perform a LEFT JOIN between Doctor and Patient tables on DoctorID.",
        hint: "Use LEFT JOIN to return all rows from left table with matches from right",
        answer: `SELECT d.Name, p.PatientName
FROM Doctor d LEFT JOIN Patient p ON d.DoctorID = p.DoctorID;`
    },
    {
        category: "Joins",
        title: "RIGHT JOIN",
        description: "Write a SQL statement to perform a RIGHT JOIN between Doctor and Patient tables on DoctorID.",
        hint: "Use RIGHT JOIN to return all rows from right table with matches from left",
        answer: `SELECT d.Name, p.PatientName
FROM Doctor d RIGHT JOIN Patient p ON d.DoctorID = p.DoctorID;`
    },
    {
        category: "Joins",
        title: "NATURAL JOIN",
        description: "Write a SQL statement to perform a NATURAL JOIN between Doctor and Patient tables.",
        hint: "Use NATURAL JOIN to automatically join on columns with same name",
        answer: `SELECT * FROM Doctor NATURAL JOIN Patient;`
    },

    // Subqueries
    {
        category: "Subqueries",
        title: "Single-Row Subquery",
        description: "Write a SQL statement to find all books that have the maximum price using a subquery.",
        hint: "Use subquery with MAX function in WHERE clause",
        answer: `SELECT * FROM Books WHERE Price = (SELECT MAX(Price) FROM Books);`
    },
    {
        category: "Subqueries",
        title: "Multi-Row Subquery with IN",
        description: "Write a SQL statement to find all books where AuthorID belongs to authors from India.",
        hint: "Use IN operator with subquery that returns multiple values",
        answer: `SELECT * FROM Books WHERE AuthorID IN
    (SELECT AuthorID FROM Authors WHERE Country = 'India');`
    },
    {
        category: "Subqueries",
        title: "ALL Operator",
        description: "Write a SQL statement to find books with price greater than all books written by author with AuthorID 5.",
        hint: "Use ALL operator with subquery for comparison with all values",
        answer: `SELECT * FROM Books WHERE Price > ALL
    (SELECT Price FROM Books WHERE AuthorID = 5);`
    },
    {
        category: "Subqueries",
        title: "EXISTS Operator",
        description: "Write a SQL statement to find publishers that have at least one book using EXISTS.",
        hint: "Use EXISTS with correlated subquery to check for existence",
        answer: `SELECT * FROM Publishers p WHERE EXISTS
    (SELECT 1 FROM Books WHERE PublisherID = p.PublisherID);`
    },

    // Views
    {
        category: "Views",
        title: "CREATE VIEW",
        description: "Write a SQL statement to create a view named 'ExpensiveBooks' showing books with Price greater than 1000.",
        hint: "Use CREATE VIEW with AS and SELECT statement",
        answer: `CREATE VIEW ExpensiveBooks AS
SELECT * FROM Books WHERE Price > 1000;`
    },
    {
        category: "Views",
        title: "Using Views",
        description: "Write a SQL statement to query all data from the 'ExpensiveBooks' view.",
        hint: "Query a view just like a regular table using SELECT",
        answer: `SELECT * FROM ExpensiveBooks;`
    },

    // Index
    {
        category: "Index",
        title: "CREATE INDEX",
        description: "Write a SQL statement to create an index named 'idx_book_title' on the Title column of Books table.",
        hint: "Use CREATE INDEX with index name and table(column)",
        answer: `CREATE INDEX idx_book_title ON Books(Title);`
    },

    // Data Type Conversion
    {
        category: "Type Conversion",
        title: "TO_CHAR",
        description: "Write a SQL statement to convert PublishedDate to character string in 'YYYY-MM-DD' format.",
        hint: "Use TO_CHAR function with date format string",
        answer: `SELECT TO_CHAR(PublishedDate, 'YYYY-MM-DD') FROM Books;`
    },
    {
        category: "Type Conversion",
        title: "TO_NUMBER",
        description: "Write a SQL statement to convert the string '500' to a number.",
        hint: "Use TO_NUMBER function with string value",
        answer: `SELECT TO_NUMBER('500') FROM DUAL;`
    },
    {
        category: "Type Conversion",
        title: "CAST",
        description: "Write a SQL statement to cast Credits column to INTEGER type from Course table.",
        hint: "Use CAST function with AS keyword for type conversion",
        answer: `SELECT CAST(Credits AS INTEGER) FROM Course;`
    },

    // Advanced Table Operations
    {
        category: "Advanced Operations",
        title: "CREATE TABLE AS",
        description: "Write a SQL statement to create a backup table 'Authors_Backup' with all data from Authors table.",
        hint: "Use CREATE TABLE AS with SELECT statement",
        answer: `CREATE TABLE Authors_Backup AS SELECT * FROM Authors;`
    },
    {
        category: "Advanced Operations",
        title: "Self-Join",
        description: "Write a SQL statement to perform a self-join on Employee table to show each employee with their manager's name.",
        hint: "Join table with itself using aliases and match ManagerID with EmpID",
        answer: `SELECT e1.Name AS Employee, e2.Name AS Manager
FROM Employee e1 JOIN Employee e2 ON e1.ManagerID = e2.EmpID;`
    },

    // PL/SQL Basics
    {
        category: "PL/SQL",
        title: "Variable Declaration",
        description: "Write a PL/SQL block to declare variables v_name (VARCHAR2(50)) and v_price (NUMBER(10,2)), assign values, and display them.",
        hint: "Use DECLARE block with variable declarations and assignments",
        answer: `DECLARE
    v_name VARCHAR2(50);
    v_price NUMBER(10,2);
BEGIN
    v_name := 'Database Book';
    v_price := 500.00;
    DBMS_OUTPUT.PUT_LINE('Book: ' || v_name);
END;`
    },
    {
        category: "PL/SQL",
        title: "IF-ELSE Statement",
        description: "Write a PL/SQL block to check if a doctor's experience is greater than 10 and display appropriate message.",
        hint: "Use IF-THEN-ELSE structure with condition",
        answer: `DECLARE
    v_experience NUMBER;
BEGIN
    SELECT Experience INTO v_experience FROM Doctor WHERE DoctorID = 1;
    IF v_experience > 10 THEN
        DBMS_OUTPUT.PUT_LINE('Senior Doctor');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Junior Doctor');
    END IF;
END;`
    },
    {
        category: "PL/SQL",
        title: "FOR Loop",
        description: "Write a PL/SQL block to print numbers from 1 to 10 using a FOR loop.",
        hint: "Use FOR loop with range (start..end)",
        answer: `BEGIN
    FOR i IN 1..10 LOOP
        DBMS_OUTPUT.PUT_LINE('Number: ' || i);
    END LOOP;
END;`
    },
    {
        category: "PL/SQL",
        title: "WHILE Loop",
        description: "Write a PL/SQL block to print numbers from 1 to 5 using a WHILE loop with a counter variable.",
        hint: "Use WHILE loop with condition and increment counter",
        answer: `DECLARE
    v_counter NUMBER := 1;
BEGIN
    WHILE v_counter <= 5 LOOP
        DBMS_OUTPUT.PUT_LINE('Count: ' || v_counter);
        v_counter := v_counter + 1;
    END LOOP;
END;`
    },

    // Functions
    {
        category: "Functions",
        title: "CREATE FUNCTION",
        description: "Write a PL/SQL function named 'get_patient_count' that takes doctor_id as parameter and returns the count of patients for that doctor.",
        hint: "Use CREATE FUNCTION with RETURN type and SELECT INTO",
        answer: `CREATE OR REPLACE FUNCTION get_patient_count(p_doctor_id NUMBER)
RETURN NUMBER IS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM Patient WHERE DoctorID = p_doctor_id;
    RETURN v_count;
END;`
    },
    {
        category: "Functions",
        title: "Using Functions",
        description: "Write a SQL statement to call the function 'get_patient_count' with parameter 101.",
        hint: "Call function in SELECT statement from DUAL",
        answer: `SELECT get_patient_count(101) FROM DUAL;`
    },

    // Procedures
    {
        category: "Procedures",
        title: "CREATE PROCEDURE",
        description: "Write a PL/SQL procedure named 'display_patient_info' that takes patient_id and displays patient name and disease.",
        hint: "Use CREATE PROCEDURE with SELECT INTO and DBMS_OUTPUT",
        answer: `CREATE OR REPLACE PROCEDURE display_patient_info(p_patient_id NUMBER) IS
    v_name VARCHAR2(50);
    v_disease VARCHAR2(50);
BEGIN
    SELECT PatientName, Disease INTO v_name, v_disease
    FROM Patient WHERE PatientID = p_patient_id;
    DBMS_OUTPUT.PUT_LINE('Patient: ' || v_name || ', Disease: ' || v_disease);
END;`
    },
    {
        category: "Procedures",
        title: "Execute Procedure",
        description: "Write a SQL statement to execute the procedure 'display_patient_info' with parameter 1001.",
        hint: "Use EXEC or EXECUTE command with procedure name and parameters",
        answer: `EXEC display_patient_info(1001);`
    },

    // Cursors
    {
        category: "Cursors",
        title: "Explicit Cursor",
        description: "Write a PL/SQL block to declare an explicit cursor for Patient table and loop through all records displaying patient names.",
        hint: "Use CURSOR declaration, OPEN, FETCH, and CLOSE with loop",
        answer: `DECLARE
    CURSOR patient_cursor IS SELECT * FROM Patient;
    v_patient Patient%ROWTYPE;
BEGIN
    OPEN patient_cursor;
    LOOP
        FETCH patient_cursor INTO v_patient;
        EXIT WHEN patient_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_patient.PatientName);
    END LOOP;
    CLOSE patient_cursor;
END;`
    },
    {
        category: "Cursors",
        title: "Cursor FOR Loop",
        description: "Write a PL/SQL block to iterate through all patients using a cursor FOR loop and display their names.",
        hint: "Use FOR loop with inline cursor query - no OPEN/FETCH/CLOSE needed",
        answer: `BEGIN
    FOR patient_rec IN (SELECT * FROM Patient) LOOP
        DBMS_OUTPUT.PUT_LINE(patient_rec.PatientName);
    END LOOP;
END;`
    },

    // Triggers
    {
        category: "Triggers",
        title: "CREATE TRIGGER",
        description: "Write a trigger named 'trg_price_check' that validates Price is positive before INSERT or UPDATE on Books table.",
        hint: "Use CREATE TRIGGER with BEFORE event and RAISE_APPLICATION_ERROR",
        answer: `CREATE OR REPLACE TRIGGER trg_price_check
BEFORE INSERT OR UPDATE ON Books
FOR EACH ROW
BEGIN
    IF :NEW.Price <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Price must be positive');
    END IF;
END;`
    },

    // Transaction Control
    {
        category: "Transactions",
        title: "COMMIT",
        description: "Write SQL statements to increase all book prices by 10% and save the changes permanently.",
        hint: "Use UPDATE statement followed by COMMIT",
        answer: `UPDATE Books SET Price = Price * 1.1;
COMMIT;`
    },
    {
        category: "Transactions",
        title: "ROLLBACK",
        description: "Write SQL statements to delete books with price less than 100, then undo the changes.",
        hint: "Use DELETE statement followed by ROLLBACK",
        answer: `DELETE FROM Books WHERE Price < 100;
ROLLBACK;`
    },
    {
        category: "Transactions",
        title: "SAVEPOINT",
        description: "Write SQL statements to create a savepoint before deleting records, then rollback to that savepoint.",
        hint: "Use SAVEPOINT, DELETE, and ROLLBACK TO savepoint_name",
        answer: `SAVEPOINT before_delete;
DELETE FROM Books WHERE AuthorID = 5;
ROLLBACK TO before_delete;`
    },

    // Common SQL Patterns
    {
        category: "SQL Patterns",
        title: "Find Duplicates",
        description: "Write a SQL statement to find duplicate email addresses in Student table.",
        hint: "Use GROUP BY with HAVING and COUNT to find duplicates",
        answer: `SELECT Email, COUNT(*) FROM Student
GROUP BY Email HAVING COUNT(*) > 1;`
    },
    {
        category: "SQL Patterns",
        title: "Pagination",
        description: "Write a SQL statement to retrieve books 11-20 (second page with 10 items per page) ordered by BookID.",
        hint: "Use OFFSET and FETCH NEXT for pagination",
        answer: `SELECT * FROM Books
ORDER BY BookID
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;`
    },
    {
        category: "SQL Patterns",
        title: "Running Total",
        description: "Write a SQL statement to calculate a running total of book prices ordered by BookID.",
        hint: "Use SUM with OVER clause and ORDER BY for window function",
        answer: `SELECT BookID, Price,
    SUM(Price) OVER (ORDER BY BookID) AS RunningTotal
FROM Books;`
    },
    {
        category: "SQL Patterns",
        title: "Rank Results",
        description: "Write a SQL statement to rank books by price in descending order using RANK function.",
        hint: "Use RANK() OVER with ORDER BY clause",
        answer: `SELECT Title, Price,
    RANK() OVER (ORDER BY Price DESC) AS PriceRank
FROM Books;`
    },
    {
        category: "SQL Patterns",
        title: "Find Missing Sequence",
        description: "Write a SQL statement to find missing numbers in a sequence from numbers table.",
        hint: "Use NOT EXISTS with subquery to check for gaps in sequence",
        answer: `SELECT a.num + 1 AS missing
FROM numbers a
WHERE NOT EXISTS (SELECT 1 FROM numbers b WHERE b.num = a.num + 1);`
    },

    // Best Practices Examples
    {
        category: "Best Practices",
        title: "Adding Primary Key",
        description: "Explain why every table should have a PRIMARY KEY and write an example creating a Products table with ProductID as primary key.",
        hint: "Primary key uniquely identifies each row, use INT PRIMARY KEY",
        answer: `-- Every table needs unique identifier for data integrity
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Price DECIMAL(10,2)
);`
    },
    {
        category: "Best Practices",
        title: "Using Foreign Key for Integrity",
        description: "Write SQL statements to create Orders table with a foreign key referencing CustomerID from Customers table.",
        hint: "Use FOREIGN KEY to maintain referential integrity between tables",
        answer: `CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);`
    },
    {
        category: "Best Practices",
        title: "Testing Before DELETE",
        description: "Demonstrate the best practice of testing with SELECT before executing a DELETE statement for books with price < 100.",
        hint: "Always run SELECT with same WHERE clause first to verify rows",
        answer: `-- First, test to see what will be deleted
SELECT * FROM Books WHERE Price < 100;

-- After verifying, execute the delete
DELETE FROM Books WHERE Price < 100;`
    },
    {
        category: "Best Practices",
        title: "Using Table Aliases",
        description: "Rewrite a complex join query between Customers and Orders using clear table aliases for better readability.",
        hint: "Use short meaningful aliases (c, o) for tables in complex queries",
        answer: `SELECT c.CustomerName, o.OrderDate, o.TotalAmount
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderDate > '2024-01-01';`
    },
    {
        category: "Best Practices",
        title: "Avoiding SELECT *",
        description: "Explain why 'SELECT *' should be avoided in production code and write a better alternative for querying employee data.",
        hint: "Specify only needed columns for better performance and clarity",
        answer: `-- Bad practice
SELECT * FROM Employees;

-- Good practice - specify only needed columns
SELECT EmployeeID, FirstName, LastName, Department, Salary
FROM Employees;`
    }
];
