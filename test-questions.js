// Hospital Management Schema Test Questions
// Schema:
// Doctors(DoctorID, Name, Department, Experience)
// Patients(PatientID, Name, DoctorID, AdmitDate, DischargeDate, Disease)
// Bills(BillID, PatientID, Amount, PaidDate)

const testQuestions = [
    // DDL (Data Definition Language)
    {
        category: "DDL",
        title: "Create Doctors Table",
        description: "Create the Doctors table with columns: DoctorID, Name, Department, Experience.",
        hint: "Use CREATE TABLE with appropriate data types for each column",
        answer: `CREATE TABLE Doctors (
    DoctorID INT,
    Name VARCHAR(100),
    Department VARCHAR(50),
    Experience INT
);`
    },
    {
        category: "DDL",
        title: "Create Patients Table",
        description: "Create the Patients table with columns: PatientID, Name, DoctorID, AdmitDate, DischargeDate, Disease.",
        hint: "Use CREATE TABLE with VARCHAR for names, INT for IDs, DATE for dates",
        answer: `CREATE TABLE Patients (
    PatientID INT,
    Name VARCHAR(100),
    DoctorID INT,
    AdmitDate DATE,
    DischargeDate DATE,
    Disease VARCHAR(100)
);`
    },
    {
        category: "DDL",
        title: "Create Bills Table",
        description: "Create the Bills table with columns: BillID, PatientID, Amount, PaidDate.",
        hint: "Use CREATE TABLE with INT for IDs, DECIMAL for amount, DATE for paid date",
        answer: `CREATE TABLE Bills (
    BillID INT,
    PatientID INT,
    Amount DECIMAL(10,2),
    PaidDate DATE
);`
    },
    {
        category: "DDL",
        title: "Add Primary Keys",
        description: "Add PRIMARY KEY constraints to DoctorID in Doctors, PatientID in Patients, and BillID in Bills tables.",
        hint: "Use ALTER TABLE with ADD PRIMARY KEY for each table",
        answer: `ALTER TABLE Doctors ADD PRIMARY KEY (DoctorID);
ALTER TABLE Patients ADD PRIMARY KEY (PatientID);
ALTER TABLE Bills ADD PRIMARY KEY (BillID);`
    },
    {
        category: "DDL",
        title: "Add Foreign Key to Patients",
        description: "Add a FOREIGN KEY constraint in Patients table referencing Doctors(DoctorID).",
        hint: "Use ALTER TABLE with ADD FOREIGN KEY and REFERENCES",
        answer: `ALTER TABLE Patients ADD FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID);`
    },
    {
        category: "DDL",
        title: "Add Foreign Key to Bills",
        description: "Add a FOREIGN KEY constraint in Bills table referencing Patients(PatientID).",
        hint: "Use ALTER TABLE with ADD FOREIGN KEY and REFERENCES",
        answer: `ALTER TABLE Bills ADD FOREIGN KEY (PatientID) REFERENCES Patients(PatientID);`
    },
    {
        category: "DDL",
        title: "Modify Experience Column",
        description: "Modify the Experience column in Doctors table to ensure it cannot be NULL.",
        hint: "Use ALTER TABLE with MODIFY and NOT NULL constraint",
        answer: `ALTER TABLE Doctors MODIFY Experience INT NOT NULL;`
    },
    {
        category: "DDL",
        title: "Add ContactNumber Column",
        description: "Add a new column ContactNumber (VARCHAR(15)) to the Doctors table.",
        hint: "Use ALTER TABLE with ADD COLUMN",
        answer: `ALTER TABLE Doctors ADD ContactNumber VARCHAR(15);`
    },
    {
        category: "DDL",
        title: "Rename Amount Column",
        description: "Rename the column Amount in Bills table to TotalAmount.",
        hint: "Use ALTER TABLE with RENAME COLUMN",
        answer: `ALTER TABLE Bills RENAME COLUMN Amount TO TotalAmount;`
    },
    {
        category: "DDL",
        title: "Drop DischargeDate Column",
        description: "Delete the column DischargeDate from the Patients table.",
        hint: "Use ALTER TABLE with DROP COLUMN",
        answer: `ALTER TABLE Patients DROP COLUMN DischargeDate;`
    },

    // DML (Data Manipulation Language)
    {
        category: "DML",
        title: "Insert Doctor Records",
        description: "Insert a sample doctor record with DoctorID=1, Name='Dr. Sharma', Department='Cardiology', Experience=10.",
        hint: "Use INSERT INTO with VALUES for all columns",
        answer: `INSERT INTO Doctors (DoctorID, Name, Department, Experience)
VALUES (1, 'Dr. Sharma', 'Cardiology', 10);`
    },
    {
        category: "DML",
        title: "Insert Patient Records",
        description: "Insert a sample patient record with PatientID=101, Name='Rahul', DoctorID=1, AdmitDate='2024-01-15', Disease='Heart Attack'.",
        hint: "Use INSERT INTO with VALUES, use proper date format",
        answer: `INSERT INTO Patients (PatientID, Name, DoctorID, AdmitDate, Disease)
VALUES (101, 'Rahul', 1, '2024-01-15', 'Heart Attack');`
    },
    {
        category: "DML",
        title: "Insert Bill Records",
        description: "Insert a sample bill record with BillID=1001, PatientID=101, TotalAmount=5000, PaidDate='2024-01-20'.",
        hint: "Use INSERT INTO with VALUES for bill details",
        answer: `INSERT INTO Bills (BillID, PatientID, TotalAmount, PaidDate)
VALUES (1001, 101, 5000, '2024-01-20');`
    },
    {
        category: "DML",
        title: "Update Doctor Experience",
        description: "Update the Experience of doctor with DoctorID=1 by increasing it by 2 years.",
        hint: "Use UPDATE with SET and arithmetic operation, add WHERE clause",
        answer: `UPDATE Doctors SET Experience = Experience + 2 WHERE DoctorID = 1;`
    },
    {
        category: "DML",
        title: "Delete Undischarged Patients",
        description: "Delete all patients who have not been discharged yet (DischargeDate IS NULL).",
        hint: "Use DELETE FROM with WHERE condition checking for NULL",
        answer: `DELETE FROM Patients WHERE DischargeDate IS NULL;`
    },
    {
        category: "DML",
        title: "Change Doctor Department",
        description: "Change the Department of doctor 'Dr. Sharma' from 'Cardiology' to 'Neurology'.",
        hint: "Use UPDATE with SET and WHERE clause",
        answer: `UPDATE Doctors SET Department = 'Neurology' WHERE Name = 'Dr. Sharma';`
    },
    {
        category: "DML",
        title: "Increase Bill Amount",
        description: "Increase all TotalAmount values in Bills table by 10%.",
        hint: "Use UPDATE with SET and multiply by 1.10",
        answer: `UPDATE Bills SET TotalAmount = TotalAmount * 1.10;`
    },
    {
        category: "DML",
        title: "Delete Low Amount Bills",
        description: "Delete the record of bills whose TotalAmount is less than 1000.",
        hint: "Use DELETE FROM with WHERE condition",
        answer: `DELETE FROM Bills WHERE TotalAmount < 1000;`
    },
    {
        category: "DML",
        title: "Update Patient Admit Date",
        description: "Update the AdmitDate of patient with PatientID=101 to '2024-02-01'.",
        hint: "Use UPDATE with SET and WHERE clause",
        answer: `UPDATE Patients SET AdmitDate = '2024-02-01' WHERE PatientID = 101;`
    },
    {
        category: "DML",
        title: "Convert Patient Names to Uppercase",
        description: "Update all patient names in the Patients table to uppercase.",
        hint: "Use UPDATE with UPPER function",
        answer: `UPDATE Patients SET Name = UPPER(Name);`
    },

    // Constraints
    {
        category: "Constraints",
        title: "Add CHECK Constraint on Experience",
        description: "Add a CHECK constraint to ensure Experience > 0 in the Doctors table.",
        hint: "Use ALTER TABLE with ADD CONSTRAINT and CHECK condition",
        answer: `ALTER TABLE Doctors ADD CONSTRAINT chk_experience CHECK (Experience > 0);`
    },
    {
        category: "Constraints",
        title: "Add UNIQUE Constraint on Doctor Name",
        description: "Add a UNIQUE constraint on Doctors.Name column.",
        hint: "Use ALTER TABLE with ADD CONSTRAINT UNIQUE",
        answer: `ALTER TABLE Doctors ADD CONSTRAINT uk_doctor_name UNIQUE (Name);`
    },
    {
        category: "Constraints",
        title: "Add NOT NULL to Patient Name",
        description: "Add a NOT NULL constraint on Patients.Name column.",
        hint: "Use ALTER TABLE with MODIFY and NOT NULL",
        answer: `ALTER TABLE Patients MODIFY Name VARCHAR(100) NOT NULL;`
    },
    {
        category: "Constraints",
        title: "Add DEFAULT Value to Amount",
        description: "Add a DEFAULT value of 500 for TotalAmount in Bills table.",
        hint: "Use ALTER TABLE with MODIFY and DEFAULT keyword",
        answer: `ALTER TABLE Bills MODIFY TotalAmount DECIMAL(10,2) DEFAULT 500;`
    },
    {
        category: "Constraints",
        title: "Verify Constraints",
        description: "Query to view all constraints on the Doctors table from USER_CONSTRAINTS.",
        hint: "Use SELECT from USER_CONSTRAINTS with WHERE clause",
        answer: `SELECT * FROM USER_CONSTRAINTS WHERE TABLE_NAME = 'DOCTORS';`
    },

    // SQL Functions
    {
        category: "SQL Functions",
        title: "Display Doctor Names in Uppercase",
        description: "Display all doctor names in uppercase from the Doctors table.",
        hint: "Use SELECT with UPPER function",
        answer: `SELECT UPPER(Name) FROM Doctors;`
    },
    {
        category: "SQL Functions",
        title: "Display Length of Patient Names",
        description: "Display each patient's name and the length of their name.",
        hint: "Use SELECT with LENGTH function",
        answer: `SELECT Name, LENGTH(Name) FROM Patients;`
    },
    {
        category: "SQL Functions",
        title: "Calculate Days Admitted",
        description: "Show the current date and the number of days admitted for each patient (use SYSDATE - AdmitDate).",
        hint: "Use SELECT with SYSDATE and date arithmetic",
        answer: `SELECT Name, SYSDATE, SYSDATE - AdmitDate AS DaysAdmitted FROM Patients;`
    },
    {
        category: "SQL Functions",
        title: "Extract Month from Admit Date",
        description: "Extract the month from each patient's AdmitDate.",
        hint: "Use SELECT with EXTRACT function and MONTH keyword",
        answer: `SELECT Name, EXTRACT(MONTH FROM AdmitDate) AS AdmitMonth FROM Patients;`
    },
    {
        category: "SQL Functions",
        title: "Display First Three Characters of Department",
        description: "Display the doctor's name and first three characters of their department.",
        hint: "Use SELECT with SUBSTRING or SUBSTR function",
        answer: `SELECT Name, SUBSTR(Department, 1, 3) FROM Doctors;`
    },

    // Operators and Group Functions
    {
        category: "Operators & Aggregates",
        title: "Patients Admitted Between Dates",
        description: "Display all patients who were admitted between '2024-01-01' and '2024-03-31'.",
        hint: "Use SELECT with WHERE and BETWEEN operator",
        answer: `SELECT * FROM Patients WHERE AdmitDate BETWEEN '2024-01-01' AND '2024-03-31';`
    },
    {
        category: "Operators & Aggregates",
        title: "Count Patients per Doctor",
        description: "Find the total number of patients under each doctor.",
        hint: "Use SELECT with COUNT and GROUP BY DoctorID",
        answer: `SELECT DoctorID, COUNT(*) FROM Patients GROUP BY DoctorID;`
    },
    {
        category: "Operators & Aggregates",
        title: "Bill Amount Statistics",
        description: "Display the maximum, minimum, and average bill amount from the Bills table.",
        hint: "Use SELECT with MAX, MIN, and AVG functions",
        answer: `SELECT MAX(TotalAmount), MIN(TotalAmount), AVG(TotalAmount) FROM Bills;`
    },
    {
        category: "Operators & Aggregates",
        title: "Doctors with More Than 3 Patients",
        description: "Find doctors having more than 3 patients.",
        hint: "Use SELECT with COUNT, GROUP BY, and HAVING clause",
        answer: `SELECT DoctorID, COUNT(*) FROM Patients GROUP BY DoctorID HAVING COUNT(*) > 3;`
    },
    {
        category: "Operators & Aggregates",
        title: "Bills in Amount Range",
        description: "List all bills where the TotalAmount is greater than 2000 AND less than 10000.",
        hint: "Use SELECT with WHERE and AND operator",
        answer: `SELECT * FROM Bills WHERE TotalAmount > 2000 AND TotalAmount < 10000;`
    },
    {
        category: "Operators & Aggregates",
        title: "Patients with Flu or COVID",
        description: "Find patients whose disease is either 'Flu' or 'COVID'.",
        hint: "Use SELECT with WHERE and IN operator",
        answer: `SELECT * FROM Patients WHERE Disease IN ('Flu', 'COVID');`
    },
    {
        category: "Operators & Aggregates",
        title: "Count Distinct Diseases",
        description: "Count the total number of distinct diseases treated in the hospital.",
        hint: "Use SELECT with COUNT and DISTINCT",
        answer: `SELECT COUNT(DISTINCT Disease) FROM Patients;`
    },
    {
        category: "Operators & Aggregates",
        title: "Average Experience per Department",
        description: "Find the average experience of doctors per department.",
        hint: "Use SELECT with AVG and GROUP BY Department",
        answer: `SELECT Department, AVG(Experience) FROM Doctors GROUP BY Department;`
    },
    {
        category: "Operators & Aggregates",
        title: "Patients Starting with 'A'",
        description: "Display patients whose name starts with 'A'.",
        hint: "Use SELECT with WHERE and LIKE with wildcard",
        answer: `SELECT * FROM Patients WHERE Name LIKE 'A%';`
    },
    {
        category: "Operators & Aggregates",
        title: "Total Bill Amount per Month",
        description: "Display the total bill amount collected per month from PaidDate.",
        hint: "Use SELECT with SUM, EXTRACT, and GROUP BY month",
        answer: `SELECT EXTRACT(MONTH FROM PaidDate) AS Month, SUM(TotalAmount)
FROM Bills GROUP BY EXTRACT(MONTH FROM PaidDate);`
    },

    // Subqueries
    {
        category: "Subqueries",
        title: "Doctor with Maximum Experience",
        description: "Find the name of the doctor who has the maximum experience.",
        hint: "Use subquery with MAX in WHERE clause",
        answer: `SELECT Name FROM Doctors WHERE Experience = (SELECT MAX(Experience) FROM Doctors);`
    },
    {
        category: "Subqueries",
        title: "Patients of Most Experienced Doctor",
        description: "List all patients treated by the most experienced doctor.",
        hint: "Use subquery to find max experience DoctorID, then select patients",
        answer: `SELECT * FROM Patients WHERE DoctorID =
    (SELECT DoctorID FROM Doctors WHERE Experience = (SELECT MAX(Experience) FROM Doctors));`
    },
    {
        category: "Subqueries",
        title: "Patients with Above Average Bills",
        description: "Display patients whose bill amount is greater than the average bill amount.",
        hint: "Use subquery with AVG in WHERE clause",
        answer: `SELECT * FROM Patients WHERE PatientID IN
    (SELECT PatientID FROM Bills WHERE TotalAmount > (SELECT AVG(TotalAmount) FROM Bills));`
    },
    {
        category: "Subqueries",
        title: "Department with Highest Bill Amount",
        description: "Find the department having the highest total bill amount.",
        hint: "Use subquery with SUM, JOIN, and GROUP BY",
        answer: `SELECT Department FROM Doctors WHERE DoctorID IN
    (SELECT DoctorID FROM Patients WHERE PatientID IN
        (SELECT PatientID FROM Bills GROUP BY PatientID
         HAVING SUM(TotalAmount) = (SELECT MAX(SUM(TotalAmount)) FROM Bills GROUP BY PatientID)));`
    },
    {
        category: "Subqueries",
        title: "Doctors with No Patients",
        description: "Retrieve doctors who have not treated any patients.",
        hint: "Use NOT IN with subquery selecting DoctorIDs from Patients",
        answer: `SELECT * FROM Doctors WHERE DoctorID NOT IN (SELECT DISTINCT DoctorID FROM Patients);`
    },
    {
        category: "Subqueries",
        title: "Highest Paying Patient per Doctor",
        description: "Display the highest-paying patient for each doctor.",
        hint: "Use correlated subquery with MAX and GROUP BY",
        answer: `SELECT p.* FROM Patients p WHERE PatientID IN
    (SELECT PatientID FROM Bills b WHERE TotalAmount =
        (SELECT MAX(TotalAmount) FROM Bills WHERE PatientID IN
            (SELECT PatientID FROM Patients WHERE DoctorID = p.DoctorID)));`
    },
    {
        category: "Subqueries",
        title: "Bills After Specific Date",
        description: "Find all bills belonging to patients admitted after '2024-06-01'.",
        hint: "Use IN with subquery selecting PatientIDs",
        answer: `SELECT * FROM Bills WHERE PatientID IN
    (SELECT PatientID FROM Patients WHERE AdmitDate > '2024-06-01');`
    },
    {
        category: "Subqueries",
        title: "Bills Generated After Discharge",
        description: "Display patients who have a bill generated after their discharge date.",
        hint: "Use JOIN or subquery comparing PaidDate with DischargeDate",
        answer: `SELECT p.* FROM Patients p WHERE PatientID IN
    (SELECT PatientID FROM Bills WHERE PaidDate > (SELECT DischargeDate FROM Patients WHERE PatientID = Bills.PatientID));`
    },
    {
        category: "Subqueries",
        title: "Patients Under Orthopedics",
        description: "List all patients admitted under doctors of the 'Orthopedics' department.",
        hint: "Use IN with subquery selecting DoctorID from Doctors",
        answer: `SELECT * FROM Patients WHERE DoctorID IN
    (SELECT DoctorID FROM Doctors WHERE Department = 'Orthopedics');`
    },
    {
        category: "Subqueries",
        title: "Second Highest Bill Amount",
        description: "Retrieve the second-highest bill amount using a subquery.",
        hint: "Use subquery with MAX excluding the maximum value",
        answer: `SELECT MAX(TotalAmount) FROM Bills WHERE TotalAmount <
    (SELECT MAX(TotalAmount) FROM Bills);`
    },

    // Views
    {
        category: "Views",
        title: "Create Doctor-Patient View",
        description: "Create a view named Doctor_Patient_View showing Doctor Name, Patient Name, and Disease.",
        hint: "Use CREATE VIEW with JOIN between Doctors and Patients",
        answer: `CREATE VIEW Doctor_Patient_View AS
SELECT d.Name AS DoctorName, p.Name AS PatientName, p.Disease
FROM Doctors d JOIN Patients p ON d.DoctorID = p.DoctorID;`
    },
    {
        category: "Views",
        title: "Create High Bill View",
        description: "Create a view named High_Bill_View showing bills greater than 5000.",
        hint: "Use CREATE VIEW with WHERE clause",
        answer: `CREATE VIEW High_Bill_View AS
SELECT * FROM Bills WHERE TotalAmount > 5000;`
    },
    {
        category: "Views",
        title: "Create Patient Total Bills View",
        description: "Create a view displaying patients and their total bills.",
        hint: "Use CREATE VIEW with JOIN and SUM, GROUP BY",
        answer: `CREATE VIEW Patient_Total_Bills AS
SELECT p.Name, SUM(b.TotalAmount) AS TotalBills
FROM Patients p JOIN Bills b ON p.PatientID = b.PatientID
GROUP BY p.Name;`
    },
    {
        category: "Views",
        title: "Create Doctor Patient Count View",
        description: "Create a view that lists all doctors with their total number of patients.",
        hint: "Use CREATE VIEW with COUNT and GROUP BY",
        answer: `CREATE VIEW Doctor_Patient_Count AS
SELECT d.Name, COUNT(p.PatientID) AS PatientCount
FROM Doctors d LEFT JOIN Patients p ON d.DoctorID = p.DoctorID
GROUP BY d.Name;`
    },
    {
        category: "Views",
        title: "Drop High Bill View",
        description: "Drop the view High_Bill_View from the database.",
        hint: "Use DROP VIEW statement",
        answer: `DROP VIEW High_Bill_View;`
    },

    // Joins
    {
        category: "Joins",
        title: "Patients with Doctor Details",
        description: "Display all patients along with their doctor's name and department using JOIN.",
        hint: "Use INNER JOIN between Patients and Doctors on DoctorID",
        answer: `SELECT p.*, d.Name AS DoctorName, d.Department
FROM Patients p INNER JOIN Doctors d ON p.DoctorID = d.DoctorID;`
    },
    {
        category: "Joins",
        title: "Bills with Patient and Doctor Names",
        description: "Show all bills with corresponding patient names and doctor names.",
        hint: "Use INNER JOIN across all three tables",
        answer: `SELECT b.*, p.Name AS PatientName, d.Name AS DoctorName
FROM Bills b
INNER JOIN Patients p ON b.PatientID = p.PatientID
INNER JOIN Doctors d ON p.DoctorID = d.DoctorID;`
    },
    {
        category: "Joins",
        title: "Patients Without Bills",
        description: "Display patients who do not have any bills using LEFT JOIN.",
        hint: "Use LEFT JOIN and WHERE to check for NULL in Bills",
        answer: `SELECT p.* FROM Patients p
LEFT JOIN Bills b ON p.PatientID = b.PatientID
WHERE b.BillID IS NULL;`
    },
    {
        category: "Joins",
        title: "Doctors with No Patients",
        description: "List doctors who have not treated any patients using LEFT JOIN.",
        hint: "Use LEFT JOIN and WHERE to check for NULL in Patients",
        answer: `SELECT d.* FROM Doctors d
LEFT JOIN Patients p ON d.DoctorID = p.DoctorID
WHERE p.PatientID IS NULL;`
    },
    {
        category: "Joins",
        title: "Complete Patient Bill Doctor Info",
        description: "Display doctor name, patient name, and bill amount for all records using INNER JOIN.",
        hint: "Use INNER JOIN across all three tables",
        answer: `SELECT d.Name AS DoctorName, p.Name AS PatientName, b.TotalAmount
FROM Doctors d
INNER JOIN Patients p ON d.DoctorID = p.DoctorID
INNER JOIN Bills b ON p.PatientID = b.PatientID;`
    },
    {
        category: "Joins",
        title: "Patients Under Cardiology",
        description: "Retrieve patients whose doctor is from the 'Cardiology' department.",
        hint: "Use INNER JOIN with WHERE clause on Department",
        answer: `SELECT p.* FROM Patients p
INNER JOIN Doctors d ON p.DoctorID = d.DoctorID
WHERE d.Department = 'Cardiology';`
    },
    {
        category: "Joins",
        title: "Total Bills per Doctor",
        description: "Show total bill amount collected by each doctor using JOIN.",
        hint: "Use JOIN with SUM and GROUP BY",
        answer: `SELECT d.Name, SUM(b.TotalAmount) AS TotalCollected
FROM Doctors d
INNER JOIN Patients p ON d.DoctorID = p.DoctorID
INNER JOIN Bills b ON p.PatientID = b.PatientID
GROUP BY d.Name;`
    },
    {
        category: "Joins",
        title: "Full Patient Bill Details",
        description: "List all patient details along with bill details using FULL OUTER JOIN.",
        hint: "Use FULL OUTER JOIN between Patients and Bills",
        answer: `SELECT p.*, b.*
FROM Patients p FULL OUTER JOIN Bills b ON p.PatientID = b.PatientID;`
    },
    {
        category: "Joins",
        title: "Doctors Treating Cancer Patients",
        description: "Display the name of doctors treating patients with 'Cancer'.",
        hint: "Use INNER JOIN with WHERE clause on Disease",
        answer: `SELECT DISTINCT d.Name FROM Doctors d
INNER JOIN Patients p ON d.DoctorID = p.DoctorID
WHERE p.Disease = 'Cancer';`
    },
    {
        category: "Joins",
        title: "Self Join Example",
        description: "Display patients and their doctors who share the same department (if patients had departments).",
        hint: "This would use self-join, but with current schema, join Patients with Doctors",
        answer: `SELECT p.Name AS PatientName, d.Name AS DoctorName, d.Department
FROM Patients p INNER JOIN Doctors d ON p.DoctorID = d.DoctorID;`
    },

    // PL/SQL Programming Tasks
    {
        category: "PL/SQL",
        title: "Display Doctor by Department",
        description: "Write a PL/SQL block to display doctor details for department 'Cardiology'.",
        hint: "Use DECLARE, SELECT INTO, and DBMS_OUTPUT.PUT_LINE",
        answer: `DECLARE
    v_name VARCHAR2(100);
    v_exp NUMBER;
BEGIN
    SELECT Name, Experience INTO v_name, v_exp
    FROM Doctors WHERE Department = 'Cardiology' AND ROWNUM = 1;
    DBMS_OUTPUT.PUT_LINE('Doctor: ' || v_name || ', Experience: ' || v_exp);
END;`
    },
    {
        category: "PL/SQL",
        title: "Calculate Total Bill for Patient",
        description: "Write a PL/SQL block to calculate the total bill amount for patient with PatientID=101.",
        hint: "Use DECLARE with SUM in SELECT INTO",
        answer: `DECLARE
    v_total NUMBER;
BEGIN
    SELECT SUM(TotalAmount) INTO v_total
    FROM Bills WHERE PatientID = 101;
    DBMS_OUTPUT.PUT_LINE('Total Bill: ' || v_total);
END;`
    },
    {
        category: "PL/SQL",
        title: "Count Patients per Doctor",
        description: "Write a PL/SQL program to count and display the number of patients for doctor with DoctorID=1.",
        hint: "Use SELECT COUNT INTO and display result",
        answer: `DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM Patients WHERE DoctorID = 1;
    DBMS_OUTPUT.PUT_LINE('Patient Count: ' || v_count);
END;`
    },
    {
        category: "PL/SQL",
        title: "Categorize Doctors by Experience",
        description: "Write a PL/SQL block using IF-THEN-ELSE to categorize a doctor as Senior (>10 years) or Junior.",
        hint: "Use IF-THEN-ELSE with condition on Experience",
        answer: `DECLARE
    v_exp NUMBER;
    v_category VARCHAR2(20);
BEGIN
    SELECT Experience INTO v_exp FROM Doctors WHERE DoctorID = 1;
    IF v_exp > 10 THEN
        v_category := 'Senior';
    ELSE
        v_category := 'Junior';
    END IF;
    DBMS_OUTPUT.PUT_LINE('Category: ' || v_category);
END;`
    },
    {
        category: "PL/SQL",
        title: "Cursor to Display Patient Names",
        description: "Write a cursor program to display all patient names and their diseases.",
        hint: "Use CURSOR declaration, OPEN, FETCH loop, and CLOSE",
        answer: `DECLARE
    CURSOR patient_cursor IS SELECT Name, Disease FROM Patients;
    v_name VARCHAR2(100);
    v_disease VARCHAR2(100);
BEGIN
    OPEN patient_cursor;
    LOOP
        FETCH patient_cursor INTO v_name, v_disease;
        EXIT WHEN patient_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_name || ' - ' || v_disease);
    END LOOP;
    CLOSE patient_cursor;
END;`
    },
    {
        category: "PL/SQL",
        title: "Create Function for Patient Count",
        description: "Write a function to return the total number of patients treated by a given doctor.",
        hint: "Use CREATE FUNCTION with RETURN and SELECT COUNT INTO",
        answer: `CREATE OR REPLACE FUNCTION get_patient_count(p_doctor_id NUMBER)
RETURN NUMBER IS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM Patients WHERE DoctorID = p_doctor_id;
    RETURN v_count;
END;`
    },
    {
        category: "PL/SQL",
        title: "Create Procedure to Update Discharge Date",
        description: "Write a procedure to update discharge date to SYSDATE for all patients admitted before '2024-01-01'.",
        hint: "Use CREATE PROCEDURE with UPDATE statement",
        answer: `CREATE OR REPLACE PROCEDURE update_discharge_dates IS
BEGIN
    UPDATE Patients
    SET DischargeDate = SYSDATE
    WHERE AdmitDate < '2024-01-01';
    COMMIT;
END;`
    },
    {
        category: "PL/SQL",
        title: "Create Trigger for Bill Update",
        description: "Write a trigger to automatically log when a new bill is inserted (assume a log table exists).",
        hint: "Use CREATE TRIGGER with AFTER INSERT",
        answer: `CREATE OR REPLACE TRIGGER trg_bill_insert
AFTER INSERT ON Bills
FOR EACH ROW
BEGIN
    DBMS_OUTPUT.PUT_LINE('New bill inserted: ' || :NEW.BillID);
END;`
    },
    {
        category: "PL/SQL",
        title: "Exception Handling for Invalid Doctor",
        description: "Write a PL/SQL block with exception handling for when an invalid DoctorID is queried.",
        hint: "Use BEGIN-EXCEPTION block with NO_DATA_FOUND",
        answer: `DECLARE
    v_name VARCHAR2(100);
BEGIN
    SELECT Name INTO v_name FROM Doctors WHERE DoctorID = 999;
    DBMS_OUTPUT.PUT_LINE('Doctor: ' || v_name);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Invalid Doctor ID');
END;`
    },
    {
        category: "PL/SQL",
        title: "Loop Through All Doctors",
        description: "Write a PL/SQL block using a FOR loop to display all doctor names.",
        hint: "Use FOR loop with cursor",
        answer: `BEGIN
    FOR doc_rec IN (SELECT Name FROM Doctors) LOOP
        DBMS_OUTPUT.PUT_LINE('Doctor: ' || doc_rec.Name);
    END LOOP;
END;`
    }
];
