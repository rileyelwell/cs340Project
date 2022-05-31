/* Students */

-- get all Students attributes for table
SELECT * FROM Students;

-- get a single Student's data for updating (? will be from selected button in browser)
SELECT * FROM Students WHERE studentID = ?;

-- add a new student to Students (? will be filled from browser inputs)
INSERT INTO Students (firstName, lastName, gpa, email, college, gender, yearInSchool, tutoringBudget, classesHelpNeededIn) VALUES (?,?,?,?,?,?,?,?,?);

-- update a student's data (? will be filled from browser inputs)
UPDATE Students SET firstName=?, lastName=?, gpa=?, email=?, college=?, gender=?, yearInSchool=?, tutoringBudget=?, classesHelpNeededIn=? WHERE studentID=?;

-- delete a student from Students (? will be from selected button in browser)
DELETE FROM Students WHERE studentID = ?;

/* Tutors */

-- get all Tutors attributes for table
SELECT * FROM Tutors;

-- get a single Tutors's data for updating (? will be from selected button in browser)
SELECT * FROM Tutors WHERE tutorID = ?;

-- add a new Tutor to Tutors(? will be filled from browser inputs)
INSERT INTO Tutors (firstName, lastName, email, affiliatedColleges, gender, age, hourlyRate, classExpertise) VALUES (?,?,?,?,?,?,?,?);

-- update a Tutors's data (? will be filled from browser inputs)
UPDATE Tutors SET firstName=?, lastName=?, email=?, affiliatedColleges=?, gender=?, age=?, hourlyRate=?, classExpertise=? WHERE tutorID=?;

-- delete a Tutor from Tutors(? will be from selected button in browser)
DELETE FROM Tutors WHERE tutorID = ?;


/* Classes */

-- get all Classes attributes for table
SELECT * FROM Classes;

-- get a single Classes's data for updating (? will be from selected button in browser)
SELECT * FROM Classes WHERE classID = ?;

-- add a new Class to Classes(? will be filled from browser inputs)
INSERT INTO Classes (department, campusBuilding, roomNumber, title) VALUES (?,?,?,?);

-- update a Classes's data (? will be filled from browser inputs)
UPDATE Classes SET department=?, campusBuilding=?, roomNumber=?, title=? WHERE classID=?;

-- delete a Class from Classes(? will be from selected button in browser)
DELETE FROM Classes WHERE classID = ?;

/* Colleges */

-- get all Classes attributes for table
SELECT * FROM Colleges;

-- get a single Colleges's data for updating (? will be from selected button in browser)
SELECT * FROM Colleges WHERE collegeID = ?;

-- add a new College to Colleges(? will be filled from browser inputs)
INSERT INTO Colleges (address, tuition, ranking) VALUES (?,?,?);

-- update a Colleges's data (? will be filled from browser inputs)
UPDATE Colleges SET address=?, tuition=?, ranking=? WHERE collegeID=?;

-- delete a College from Colleges(? will be from selected button in browser)
DELETE FROM Colleges WHERE collegeID = ?;

/* StudentsTutors */

-- get all StudentsTutors
SELECT * FROM StudentsTutors;

-- get a Student-Tutor relationship for the displaying of table
SELECT studentID, Students.firstName AS sfn, tutorID, Tutors.firstName AS tfn FROM StudentsTutors join Students using (studentID) join Tutors using (tutorID);

-- add a new Student-Tutor Relationship using dropdown menu
INSERT INTO StudentsTutors (studentID, tutorID) VALUES (?,?);

-- update a Student-Tutor Relationship (? will be filled from browser inputs overriding the old ?)
UPDATE StudentTutors SET studentID = ?, tutorID = ? WHERE studentID = ? AND tutorID = ?;

-- delete a Student-Tutor Relationship (? will be from selected button in browser)
DELETE FROM StudentsTutors WHERE studentID = ? AND tutorID = ?;

