DROP TABLE IF EXISTS `Students`;
CREATE TABLE `Students`(
	`studentID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`firstName` VARCHAR(35) NOT NULL,
	`lastName` VARCHAR(35) NOT NULL,
	`gpa` float(3) NOT NULL,
	`email` VARCHAR(254) NOT NULL,
	`college` VARCHAR(100) NOT NULL,
	`gender` VARCHAR(10) NOT NULL,
	`yearInSchool` int(2) NOT NULL,
	`tutoringBudget` int(8) NOT NULL,
	`classesHelpNeededIn` VARCHAR(500)
) ENGINE=INNODB;

INSERT INTO `Students`(firstName, lastName, gpa, email, college, gender, yearInSchool, tutoringBudget, classesHelpNeededIn) VALUES 
('Jane','Smith','3.20','jsmith@gmail.com','Oregon State','Female','21','50','Math'),
('Ford','Hamilton','4.0','fhamil@gmail.com','Cal Poly SLO','Male','24','35','English'),
('DeMar','Dixon','2.71','ddixon@gmail.com','UCLA','Male','25','40','CS'),
('Natalie','Waters','3.88','natwat@gmail.com','Portland State','Female','22','25','Science');	

DROP TABLE IF EXISTS `Tutors`;
CREATE TABLE `Tutors`(
	`tutorID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`firstName` VARCHAR(35) NOT NULL,
	`lastName` VARCHAR(35) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`affiliatedColleges` VARCHAR(254) NOT NULL,
	`gender` VARCHAR(10) NOT NULL,
	`age` int(2) NOT NULL,
	`hourlyRate` int(3) NOT NULL,
	`classExpertise` VARCHAR(35)
) ENGINE=INNODB;

INSERT INTO Tutors (firstName, lastName, email, affiliatedColleges, gender, age, hourlyRate, classExpertise) VALUES
('Jackie','Gordon','jgordon@gmail.com','OSU, PSU','Female','30','22','CS'),
('Smitty','Hax','shax@gmail.com','UO','Male','28','25','Biology'),
('Johnson','Johnson','jjohn@gmail.com','Cal Poly SLO','Male','25','30','Science, Math'),
('Faith','Violet','favio@gmail.com','UCLA, USC','Female','41','20','English');

DROP TABLE IF EXISTS `Classes`;
CREATE TABLE `Classes`(
	`classID` int PRIMARY KEY AUTO_INCREMENT,
	`department` VARCHAR(35) NOT NULL,
	`campusBuilding` VARCHAR(35) NOT NULL,
	`roomNumber` int(3),
	`title` VARCHAR(100) NOT NULL
) ENGINE=INNODB;

INSERT INTO Classes (department, campusBuilding, roomNumber, title) VALUES
('CS','Weniger Hall','230','Web Dev.'),
('MTH','Main Hall','142','Integral Calculus'),
('BIO','Maxine Hall','340','Intro to Biology'),
('WR','Borus Hall','101','Writing 101');

DROP TABLE IF EXISTS `Colleges`;
CREATE TABLE `Colleges`(
	`collegeID` int PRIMARY KEY AUTO_INCREMENT,
	`address` VARCHAR(254) NOT NULL,
	`tuition` int(10),
	`ranking` int(3)
) ENGINE=INNODB;

INSERT INTO Colleges (address, tuition, ranking) VALUES
('10278 Main Way','42000','12'),
('90348 Tella Blvd.','31000','97'),
('10278 Jackson Street','15500','64'),
('10278 Vibe Street','20400','32');

DROP TABLE IF EXISTS `StudentsTutors`;
CREATE TABLE `StudentsTutors`(
	`tutorID` int NOT NULL,
	`studentID` int NOT NULL,
	PRIMARY KEY (tutorID, studentID),
	CONSTRAINT FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`) ON DELETE CASCADE
) ENGINE=INNODB;

/* These tables are commented because we didn't get to implementing them completely

DROP TABLE IF EXISTS `StudentsColleges`;
CREATE TABLE `StudentsTutors`(
	`collegeID` int NOT NULL,
	`studentID` int NOT NULL,
	PRIMARY KEY (tutorID, studentID),
	CONSTRAINT FOREIGN KEY (`collegeID`) REFERENCES `Colleges`(`collegeID`) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`) ON DELETE CASCADE
) ENGINE=INNODB;

DROP TABLE IF EXISTS `TutorsColleges`;
CREATE TABLE `TutorsColleges`(
	`tutorID` int NOT NULL,
	`collegeID` int NOT NULL,
	PRIMARY KEY (tutorID, studentID),
	CONSTRAINT FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (`collegeID`) REFERENCES `Colleges`(`collegeID`) ON DELETE CASCADE
) ENGINE=INNODB;

DROP TABLE IF EXISTS `TutorsClasses`;
CREATE TABLE `TutorsClasses`(
	`tutorID` int NOT NULL,
	`classID` int NOT NULL,
	PRIMARY KEY (tutorID, studentID),
	CONSTRAINT FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (`classID`) REFERENCES `Classes`(`classID`) ON DELETE CASCADE
) ENGINE=INNODB;

DROP TABLE IF EXISTS `ClassesColleges`;
CREATE TABLE `ClassesColleges`(
	`classID` int NOT NULL,
	`collegeID` int NOT NULL,
	PRIMARY KEY (tutorID, studentID),
	CONSTRAINT FOREIGN KEY (`classID`) REFERENCES `Classes`(`classID`) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (`collegeID`) REFERENCES `Colleges`(`collegeID`) ON DELETE CASCADE
) ENGINE=INNODB;


*/