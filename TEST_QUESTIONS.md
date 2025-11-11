# SQL Test Questions - Hospital Management Schema

**Schema:**
- `Doctors(DoctorID, Name, Department, Experience)`
- `Patients(PatientID, Name, DoctorID, AdmitDate, DischargeDate, Disease)`
- `Bills(BillID, PatientID, Amount, PaidDate)`

---

## 1. DDL (Data Definition Language) - 10 Questions

### Q1: Create Doctors Table
**Question:** Create the Doctors table with columns: DoctorID, Name, Department, Experience.

**Answer:**
```sql
CREATE TABLE Doctors (
    DoctorID INT,
    Name VARCHAR(100),
    Department VARCHAR(50),
    Experience INT
);
```

---

### Q2: Create Patients Table
**Question:** Create the Patients table with columns: PatientID, Name, DoctorID, AdmitDate, DischargeDate, Disease.

**Answer:**
```sql
CREATE TABLE Patients (
    PatientID INT,
    Name VARCHAR(100),
    DoctorID INT,
    AdmitDate DATE,
    DischargeDate DATE,
    Disease VARCHAR(100)
);
```

---

### Q3: Create Bills Table
**Question:** Create the Bills table with columns: BillID, PatientID, Amount, PaidDate.

**Answer:**
```sql
CREATE TABLE Bills (
    BillID INT,
    PatientID INT,
    Amount DECIMAL(10,2),
    PaidDate DATE
);
```

---

### Q4: Add Primary Keys
**Question:** Add PRIMARY KEY constraints to DoctorID in Doctors, PatientID in Patients, and BillID in Bills tables.

**Answer:**
```sql
ALTER TABLE Doctors ADD PRIMARY KEY (DoctorID);
ALTER TABLE Patients ADD PRIMARY KEY (PatientID);
ALTER TABLE Bills ADD PRIMARY KEY (BillID);
```

---

### Q5: Add Foreign Key to Patients
**Question:** Add a FOREIGN KEY constraint in Patients table referencing Doctors(DoctorID).

**Answer:**
```sql
ALTER TABLE Patients ADD FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID);
```

---

### Q6: Add Foreign Key to Bills
**Question:** Add a FOREIGN KEY constraint in Bills table referencing Patients(PatientID).

**Answer:**
```sql
ALTER TABLE Bills ADD FOREIGN KEY (PatientID) REFERENCES Patients(PatientID);
```

---

### Q7: Modify Experience Column
**Question:** Modify the Experience column in Doctors table to ensure it cannot be NULL.

**Answer:**
```sql
ALTER TABLE Doctors MODIFY Experience INT NOT NULL;
```

---

### Q8: Add ContactNumber Column
**Question:** Add a new column ContactNumber (VARCHAR(15)) to the Doctors table.

**Answer:**
```sql
ALTER TABLE Doctors ADD ContactNumber VARCHAR(15);
```

---

### Q9: Rename Amount Column
**Question:** Rename the column Amount in Bills table to TotalAmount.

**Answer:**
```sql
ALTER TABLE Bills RENAME COLUMN Amount TO TotalAmount;
```

---

### Q10: Drop DischargeDate Column
**Question:** Delete the column DischargeDate from the Patients table.

**Answer:**
```sql
ALTER TABLE Patients DROP COLUMN DischargeDate;
```

---

## 2. DML (Data Manipulation Language) - 10 Questions

### Q11: Insert Doctor Records
**Question:** Insert a sample doctor record with DoctorID=1, Name='Dr. Sharma', Department='Cardiology', Experience=10.

**Answer:**
```sql
INSERT INTO Doctors (DoctorID, Name, Department, Experience)
VALUES (1, 'Dr. Sharma', 'Cardiology', 10);
```

---

### Q12: Insert Patient Records
**Question:** Insert a sample patient record with PatientID=101, Name='Rahul', DoctorID=1, AdmitDate='2024-01-15', Disease='Heart Attack'.

**Answer:**
```sql
INSERT INTO Patients (PatientID, Name, DoctorID, AdmitDate, Disease)
VALUES (101, 'Rahul', 1, '2024-01-15', 'Heart Attack');
```

---

### Q13: Insert Bill Records
**Question:** Insert a sample bill record with BillID=1001, PatientID=101, TotalAmount=5000, PaidDate='2024-01-20'.

**Answer:**
```sql
INSERT INTO Bills (BillID, PatientID, TotalAmount, PaidDate)
VALUES (1001, 101, 5000, '2024-01-20');
```

---

### Q14: Update Doctor Experience
**Question:** Update the Experience of doctor with DoctorID=1 by increasing it by 2 years.

**Answer:**
```sql
UPDATE Doctors SET Experience = Experience + 2 WHERE DoctorID = 1;
```

---

### Q15: Delete Undischarged Patients
**Question:** Delete all patients who have not been discharged yet (DischargeDate IS NULL).

**Answer:**
```sql
DELETE FROM Patients WHERE DischargeDate IS NULL;
```

---

### Q16: Change Doctor Department
**Question:** Change the Department of doctor 'Dr. Sharma' from 'Cardiology' to 'Neurology'.

**Answer:**
```sql
UPDATE Doctors SET Department = 'Neurology' WHERE Name = 'Dr. Sharma';
```

---

### Q17: Increase Bill Amount
**Question:** Increase all TotalAmount values in Bills table by 10%.

**Answer:**
```sql
UPDATE Bills SET TotalAmount = TotalAmount * 1.10;
```

---

### Q18: Delete Low Amount Bills
**Question:** Delete the record of bills whose TotalAmount is less than 1000.

**Answer:**
```sql
DELETE FROM Bills WHERE TotalAmount < 1000;
```

---

### Q19: Update Patient Admit Date
**Question:** Update the AdmitDate of patient with PatientID=101 to '2024-02-01'.

**Answer:**
```sql
UPDATE Patients SET AdmitDate = '2024-02-01' WHERE PatientID = 101;
```

---

### Q20: Convert Patient Names to Uppercase
**Question:** Update all patient names in the Patients table to uppercase.

**Answer:**
```sql
UPDATE Patients SET Name = UPPER(Name);
```

---

## 3. Constraints - 5 Questions

### Q21: Add CHECK Constraint on Experience
**Question:** Add a CHECK constraint to ensure Experience > 0 in the Doctors table.

**Answer:**
```sql
ALTER TABLE Doctors ADD CONSTRAINT chk_experience CHECK (Experience > 0);
```

---

### Q22: Add UNIQUE Constraint on Doctor Name
**Question:** Add a UNIQUE constraint on Doctors.Name column.

**Answer:**
```sql
ALTER TABLE Doctors ADD CONSTRAINT uk_doctor_name UNIQUE (Name);
```

---

### Q23: Add NOT NULL to Patient Name
**Question:** Add a NOT NULL constraint on Patients.Name column.

**Answer:**
```sql
ALTER TABLE Patients MODIFY Name VARCHAR(100) NOT NULL;
```

---

### Q24: Add DEFAULT Value to Amount
**Question:** Add a DEFAULT value of 500 for TotalAmount in Bills table.

**Answer:**
```sql
ALTER TABLE Bills MODIFY TotalAmount DECIMAL(10,2) DEFAULT 500;
```

---

### Q25: Verify Constraints
**Question:** Query to view all constraints on the Doctors table from USER_CONSTRAINTS.

**Answer:**
```sql
SELECT * FROM USER_CONSTRAINTS WHERE TABLE_NAME = 'DOCTORS';
```

---

## 4. SQL Functions - 5 Questions

### Q26: Display Doctor Names in Uppercase
**Question:** Display all doctor names in uppercase from the Doctors table.

**Answer:**
```sql
SELECT UPPER(Name) FROM Doctors;
```

---

### Q27: Display Length of Patient Names
**Question:** Display each patient's name and the length of their name.

**Answer:**
```sql
SELECT Name, LENGTH(Name) FROM Patients;
```

---

### Q28: Calculate Days Admitted
**Question:** Show the current date and the number of days admitted for each patient (use SYSDATE - AdmitDate).

**Answer:**
```sql
SELECT Name, SYSDATE, SYSDATE - AdmitDate AS DaysAdmitted FROM Patients;
```

---

### Q29: Extract Month from Admit Date
**Question:** Extract the month from each patient's AdmitDate.

**Answer:**
```sql
SELECT Name, EXTRACT(MONTH FROM AdmitDate) AS AdmitMonth FROM Patients;
```

---

### Q30: Display First Three Characters of Department
**Question:** Display the doctor's name and first three characters of their department.

**Answer:**
```sql
SELECT Name, SUBSTR(Department, 1, 3) FROM Doctors;
```

---

## 5. Operators and Aggregate Functions - 10 Questions

### Q31: Patients Admitted Between Dates
**Question:** Display all patients who were admitted between '2024-01-01' and '2024-03-31'.

**Answer:**
```sql
SELECT * FROM Patients WHERE AdmitDate BETWEEN '2024-01-01' AND '2024-03-31';
```

---

### Q32: Count Patients per Doctor
**Question:** Find the total number of patients under each doctor.

**Answer:**
```sql
SELECT DoctorID, COUNT(*) FROM Patients GROUP BY DoctorID;
```

---

### Q33: Bill Amount Statistics
**Question:** Display the maximum, minimum, and average bill amount from the Bills table.

**Answer:**
```sql
SELECT MAX(TotalAmount), MIN(TotalAmount), AVG(TotalAmount) FROM Bills;
```

---

### Q34: Doctors with More Than 3 Patients
**Question:** Find doctors having more than 3 patients.

**Answer:**
```sql
SELECT DoctorID, COUNT(*) FROM Patients GROUP BY DoctorID HAVING COUNT(*) > 3;
```

---

### Q35: Bills in Amount Range
**Question:** List all bills where the TotalAmount is greater than 2000 AND less than 10000.

**Answer:**
```sql
SELECT * FROM Bills WHERE TotalAmount > 2000 AND TotalAmount < 10000;
```

---

### Q36: Patients with Flu or COVID
**Question:** Find patients whose disease is either 'Flu' or 'COVID'.

**Answer:**
```sql
SELECT * FROM Patients WHERE Disease IN ('Flu', 'COVID');
```

---

### Q37: Count Distinct Diseases
**Question:** Count the total number of distinct diseases treated in the hospital.

**Answer:**
```sql
SELECT COUNT(DISTINCT Disease) FROM Patients;
```

---

### Q38: Average Experience per Department
**Question:** Find the average experience of doctors per department.

**Answer:**
```sql
SELECT Department, AVG(Experience) FROM Doctors GROUP BY Department;
```

---

### Q39: Patients Starting with 'A'
**Question:** Display patients whose name starts with 'A'.

**Answer:**
```sql
SELECT * FROM Patients WHERE Name LIKE 'A%';
```

---

### Q40: Total Bill Amount per Month
**Question:** Display the total bill amount collected per month from PaidDate.

**Answer:**
```sql
SELECT EXTRACT(MONTH FROM PaidDate) AS Month, SUM(TotalAmount)
FROM Bills GROUP BY EXTRACT(MONTH FROM PaidDate);
```

---

## 6. Subqueries - 10 Questions

### Q41: Doctor with Maximum Experience
**Question:** Find the name of the doctor who has the maximum experience.

**Answer:**
```sql
SELECT Name FROM Doctors WHERE Experience = (SELECT MAX(Experience) FROM Doctors);
```

---

### Q42: Patients of Most Experienced Doctor
**Question:** List all patients treated by the most experienced doctor.

**Answer:**
```sql
SELECT * FROM Patients WHERE DoctorID =
    (SELECT DoctorID FROM Doctors WHERE Experience = (SELECT MAX(Experience) FROM Doctors));
```

---

### Q43: Patients with Above Average Bills
**Question:** Display patients whose bill amount is greater than the average bill amount.

**Answer:**
```sql
SELECT * FROM Patients WHERE PatientID IN
    (SELECT PatientID FROM Bills WHERE TotalAmount > (SELECT AVG(TotalAmount) FROM Bills));
```

---

### Q44: Department with Highest Bill Amount
**Question:** Find the department having the highest total bill amount.

**Answer:**
```sql
SELECT Department FROM Doctors WHERE DoctorID IN
    (SELECT DoctorID FROM Patients WHERE PatientID IN
        (SELECT PatientID FROM Bills GROUP BY PatientID
         HAVING SUM(TotalAmount) = (SELECT MAX(SUM(TotalAmount)) FROM Bills GROUP BY PatientID)));
```

---

### Q45: Doctors with No Patients
**Question:** Retrieve doctors who have not treated any patients.

**Answer:**
```sql
SELECT * FROM Doctors WHERE DoctorID NOT IN (SELECT DISTINCT DoctorID FROM Patients);
```

---

### Q46: Highest Paying Patient per Doctor
**Question:** Display the highest-paying patient for each doctor.

**Answer:**
```sql
SELECT p.* FROM Patients p WHERE PatientID IN
    (SELECT PatientID FROM Bills b WHERE TotalAmount =
        (SELECT MAX(TotalAmount) FROM Bills WHERE PatientID IN
            (SELECT PatientID FROM Patients WHERE DoctorID = p.DoctorID)));
```

---

### Q47: Bills After Specific Date
**Question:** Find all bills belonging to patients admitted after '2024-06-01'.

**Answer:**
```sql
SELECT * FROM Bills WHERE PatientID IN
    (SELECT PatientID FROM Patients WHERE AdmitDate > '2024-06-01');
```

---

### Q48: Bills Generated After Discharge
**Question:** Display patients who have a bill generated after their discharge date.

**Answer:**
```sql
SELECT p.* FROM Patients p WHERE PatientID IN
    (SELECT PatientID FROM Bills WHERE PaidDate > (SELECT DischargeDate FROM Patients WHERE PatientID = Bills.PatientID));
```

---

### Q49: Patients Under Orthopedics
**Question:** List all patients admitted under doctors of the 'Orthopedics' department.

**Answer:**
```sql
SELECT * FROM Patients WHERE DoctorID IN
    (SELECT DoctorID FROM Doctors WHERE Department = 'Orthopedics');
```

---

### Q50: Second Highest Bill Amount
**Question:** Retrieve the second-highest bill amount using a subquery.

**Answer:**
```sql
SELECT MAX(TotalAmount) FROM Bills WHERE TotalAmount <
    (SELECT MAX(TotalAmount) FROM Bills);
```

---

## 7. Views - 5 Questions

### Q51: Create Doctor-Patient View
**Question:** Create a view named Doctor_Patient_View showing Doctor Name, Patient Name, and Disease.

**Answer:**
```sql
CREATE VIEW Doctor_Patient_View AS
SELECT d.Name AS DoctorName, p.Name AS PatientName, p.Disease
FROM Doctors d JOIN Patients p ON d.DoctorID = p.DoctorID;
```

---

### Q52: Create High Bill View
**Question:** Create a view named High_Bill_View showing bills greater than 5000.

**Answer:**
```sql
CREATE VIEW High_Bill_View AS
SELECT * FROM Bills WHERE TotalAmount > 5000;
```

---

### Q53: Create Patient Total Bills View
**Question:** Create a view displaying patients and their total bills.

**Answer:**
```sql
CREATE VIEW Patient_Total_Bills AS
SELECT p.Name, SUM(b.TotalAmount) AS TotalBills
FROM Patients p JOIN Bills b ON p.PatientID = b.PatientID
GROUP BY p.Name;
```

---

### Q54: Create Doctor Patient Count View
**Question:** Create a view that lists all doctors with their total number of patients.

**Answer:**
```sql
CREATE VIEW Doctor_Patient_Count AS
SELECT d.Name, COUNT(p.PatientID) AS PatientCount
FROM Doctors d LEFT JOIN Patients p ON d.DoctorID = p.DoctorID
GROUP BY d.Name;
```

---

### Q55: Drop High Bill View
**Question:** Drop the view High_Bill_View from the database.

**Answer:**
```sql
DROP VIEW High_Bill_View;
```

---

## 8. Joins - 10 Questions

### Q56: Patients with Doctor Details
**Question:** Display all patients along with their doctor's name and department using JOIN.

**Answer:**
```sql
SELECT p.*, d.Name AS DoctorName, d.Department
FROM Patients p INNER JOIN Doctors d ON p.DoctorID = d.DoctorID;
```

---

### Q57: Bills with Patient and Doctor Names
**Question:** Show all bills with corresponding patient names and doctor names.

**Answer:**
```sql
SELECT b.*, p.Name AS PatientName, d.Name AS DoctorName
FROM Bills b
INNER JOIN Patients p ON b.PatientID = p.PatientID
INNER JOIN Doctors d ON p.DoctorID = d.DoctorID;
```

---

### Q58: Patients Without Bills
**Question:** Display patients who do not have any bills using LEFT JOIN.

**Answer:**
```sql
SELECT p.* FROM Patients p
LEFT JOIN Bills b ON p.PatientID = b.PatientID
WHERE b.BillID IS NULL;
```

---

### Q59: Doctors with No Patients
**Question:** List doctors who have not treated any patients using LEFT JOIN.

**Answer:**
```sql
SELECT d.* FROM Doctors d
LEFT JOIN Patients p ON d.DoctorID = p.DoctorID
WHERE p.PatientID IS NULL;
```

---

### Q60: Complete Patient Bill Doctor Info
**Question:** Display doctor name, patient name, and bill amount for all records using INNER JOIN.

**Answer:**
```sql
SELECT d.Name AS DoctorName, p.Name AS PatientName, b.TotalAmount
FROM Doctors d
INNER JOIN Patients p ON d.DoctorID = p.DoctorID
INNER JOIN Bills b ON p.PatientID = b.PatientID;
```

---

### Q61: Patients Under Cardiology
**Question:** Retrieve patients whose doctor is from the 'Cardiology' department.

**Answer:**
```sql
SELECT p.* FROM Patients p
INNER JOIN Doctors d ON p.DoctorID = d.DoctorID
WHERE d.Department = 'Cardiology';
```

---

### Q62: Total Bills per Doctor
**Question:** Show total bill amount collected by each doctor using JOIN.

**Answer:**
```sql
SELECT d.Name, SUM(b.TotalAmount) AS TotalCollected
FROM Doctors d
INNER JOIN Patients p ON d.DoctorID = p.DoctorID
INNER JOIN Bills b ON p.PatientID = b.PatientID
GROUP BY d.Name;
```

---

### Q63: Full Patient Bill Details
**Question:** List all patient details along with bill details using FULL OUTER JOIN.

**Answer:**
```sql
SELECT p.*, b.*
FROM Patients p FULL OUTER JOIN Bills b ON p.PatientID = b.PatientID;
```

---

### Q64: Doctors Treating Cancer Patients
**Question:** Display the name of doctors treating patients with 'Cancer'.

**Answer:**
```sql
SELECT DISTINCT d.Name FROM Doctors d
INNER JOIN Patients p ON d.DoctorID = p.DoctorID
WHERE p.Disease = 'Cancer';
```

---

### Q65: Self Join Example
**Question:** Display patients and their doctors who share the same department (if patients had departments).

**Answer:**
```sql
SELECT p.Name AS PatientName, d.Name AS DoctorName, d.Department
FROM Patients p INNER JOIN Doctors d ON p.DoctorID = d.DoctorID;
```

---

## 9. PL/SQL Programming Tasks - 10 Questions

### Q66: Display Doctor by Department
**Question:** Write a PL/SQL block to display doctor details for department 'Cardiology'.

**Answer:**
```sql
DECLARE
    v_name VARCHAR2(100);
    v_exp NUMBER;
BEGIN
    SELECT Name, Experience INTO v_name, v_exp
    FROM Doctors WHERE Department = 'Cardiology' AND ROWNUM = 1;
    DBMS_OUTPUT.PUT_LINE('Doctor: ' || v_name || ', Experience: ' || v_exp);
END;
```

---

### Q67: Calculate Total Bill for Patient
**Question:** Write a PL/SQL block to calculate the total bill amount for patient with PatientID=101.

**Answer:**
```sql
DECLARE
    v_total NUMBER;
BEGIN
    SELECT SUM(TotalAmount) INTO v_total
    FROM Bills WHERE PatientID = 101;
    DBMS_OUTPUT.PUT_LINE('Total Bill: ' || v_total);
END;
```

---

### Q68: Count Patients per Doctor
**Question:** Write a PL/SQL program to count and display the number of patients for doctor with DoctorID=1.

**Answer:**
```sql
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM Patients WHERE DoctorID = 1;
    DBMS_OUTPUT.PUT_LINE('Patient Count: ' || v_count);
END;
```

---

### Q69: Categorize Doctors by Experience
**Question:** Write a PL/SQL block using IF-THEN-ELSE to categorize a doctor as Senior (>10 years) or Junior.

**Answer:**
```sql
DECLARE
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
END;
```

---

### Q70: Cursor to Display Patient Names
**Question:** Write a cursor program to display all patient names and their diseases.

**Answer:**
```sql
DECLARE
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
END;
```

---

### Q71: Create Function for Patient Count
**Question:** Write a function to return the total number of patients treated by a given doctor.

**Answer:**
```sql
CREATE OR REPLACE FUNCTION get_patient_count(p_doctor_id NUMBER)
RETURN NUMBER IS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM Patients WHERE DoctorID = p_doctor_id;
    RETURN v_count;
END;
```

---

### Q72: Create Procedure to Update Discharge Date
**Question:** Write a procedure to update discharge date to SYSDATE for all patients admitted before '2024-01-01'.

**Answer:**
```sql
CREATE OR REPLACE PROCEDURE update_discharge_dates IS
BEGIN
    UPDATE Patients
    SET DischargeDate = SYSDATE
    WHERE AdmitDate < '2024-01-01';
    COMMIT;
END;
```

---

### Q73: Create Trigger for Bill Update
**Question:** Write a trigger to automatically log when a new bill is inserted (assume a log table exists).

**Answer:**
```sql
CREATE OR REPLACE TRIGGER trg_bill_insert
AFTER INSERT ON Bills
FOR EACH ROW
BEGIN
    DBMS_OUTPUT.PUT_LINE('New bill inserted: ' || :NEW.BillID);
END;
```

---

### Q74: Exception Handling for Invalid Doctor
**Question:** Write a PL/SQL block with exception handling for when an invalid DoctorID is queried.

**Answer:**
```sql
DECLARE
    v_name VARCHAR2(100);
BEGIN
    SELECT Name INTO v_name FROM Doctors WHERE DoctorID = 999;
    DBMS_OUTPUT.PUT_LINE('Doctor: ' || v_name);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Invalid Doctor ID');
END;
```

---

### Q75: Loop Through All Doctors
**Question:** Write a PL/SQL block using a FOR loop to display all doctor names.

**Answer:**
```sql
BEGIN
    FOR doc_rec IN (SELECT Name FROM Doctors) LOOP
        DBMS_OUTPUT.PUT_LINE('Doctor: ' || doc_rec.Name);
    END LOOP;
END;
```

---

## Summary

**Total Questions: 75**

**By Category:**
- DDL: 10 questions
- DML: 10 questions
- Constraints: 5 questions
- SQL Functions: 5 questions
- Operators & Aggregates: 10 questions
- Subqueries: 10 questions
- Views: 5 questions
- Joins: 10 questions
- PL/SQL: 10 questions

**Skills Tested:**
- Table creation and modification
- Data manipulation (INSERT, UPDATE, DELETE)
- Constraints and data integrity
- Built-in SQL functions
- Aggregate functions and grouping
- Complex subqueries
- View creation and management
- All types of joins
- PL/SQL programming (blocks, procedures, functions, cursors, triggers)

---

*For interactive practice with answer validation, visit the test page at test.html*
