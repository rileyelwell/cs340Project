CREATE TABLE `Students`(
	`studentID` int PRIMARY KEY AUTO_INCREMENT,
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

CREATE TABLE `Tutors`(
	`tutorID` int PRIMARY KEY AUTO_INCREMENT,
	`firstName` VARCHAR(35) NOT NULL,
	`lastName` VARCHAR(35) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`affiliatedColleges` VARCHAR(254) NOT NULL,
	`gender` VARCHAR(10) NOT NULL,
	`age` int(2) NOT NULL,
	`hourlyRate` int(3) NOT NULL,
	`classExpertise` VARCHAR(35),
	`sid` int,
	FOREIGN KEY (`sid`) REFERENCES Students(`studentID`)
) ENGINE=INNODB;

CREATE TABLE `Classes`(
	`classID` int PRIMARY KEY AUTO_INCREMENT,
	`department` VARCHAR(35) NOT NULL,
	`campusBuilding` VARCHAR(35) NOT NULL,
	`roomNumber` int(3),
	`title` VARCHAR(100) NOT NULL,
	`tid` int,
	FOREIGN KEY (`tid`) REFERENCES Tutors(`tutorID`)
) ENGINE=INNODB;

CREATE TABLE `Colleges`(
	`collegeID` int PRIMARY KEY AUTO_INCREMENT,
	`address` VARCHAR(254) NOT NULL,
	`tuition` int(10),
	`ranking` int(3),
	`cid` int,
	FOREIGN KEY (`cid`) REFERENCES Tutors(`tutorID`)
) ENGINE=INNODB;

CREATE TABLE `Need`(
	`tid` int,
	`sid` int,
	FOREIGN KEY (`tid`) REFERENCES Tutors(`tutorID`),
	FOREIGN KEY (`sid`) REFERENCES Students(`studentID`)
) ENGINE=INNODB;

CREATE TABLE `Attend`(
	`cid` int,
	`sid` int,
	FOREIGN KEY (`cid`) REFERENCES Colleges(`collegeID`),
	FOREIGN KEY (`sid`) REFERENCES Students(`studentID`)
) ENGINE=INNODB;

CREATE TABLE `Require`(
	`tid` int,
	`clid` int,
	FOREIGN KEY (`tid`) REFERENCES Tutors(`tutorID`),
	FOREIGN KEY (`clid`) REFERENCES Classes(`classID`)
) ENGINE=INNODB;

CREATE TABLE `Hire`(
	`tid` int,
	`cid` int,
	FOREIGN KEY (`tid`) REFERENCES Tutors(`tutorID`),
	FOREIGN KEY (`cid`) REFERENCES Colleges(`collegeID`)
) ENGINE=INNODB;

CREATE TABLE `Have`(
	`cid` int,
	`clid` int,
	FOREIGN KEY (`cid`) REFERENCES Colleges(`collegeID`),
	FOREIGN KEY (`clid`) REFERENCES Classes(`classID`)
) ENGINE=INNODB;