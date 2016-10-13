# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 160.153.16.36 (MySQL 5.5.45-cll-lve)
# Database: TestPlaza
# Generation Time: 2016-05-05 22:00:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Admin`;

CREATE TABLE `Admin` (
  `adminNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `fName` varchar(30) NOT NULL DEFAULT '',
  `lName` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`adminNo`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;

INSERT INTO `Admin` (`adminNo`, `username`, `password`, `fName`, `lName`)
VALUES
	(1,'ao6sb1','NewPassword','Sean','Byrom');

/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Answer`;

CREATE TABLE `Answer` (
  `answerNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `questionNo` int(4) unsigned NOT NULL,
  `text` varchar(250) NOT NULL DEFAULT '',
  `correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`answerNo`),
  KEY `questionNo` (`questionNo`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`questionNo`) REFERENCES `Question` (`questionNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Answer` WRITE;
/*!40000 ALTER TABLE `Answer` DISABLE KEYS */;

INSERT INTO `Answer` (`answerNo`, `questionNo`, `text`, `correct`)
VALUES
	(1,1,'1',0),
	(2,1,'2',1),
	(3,1,'3',0),
	(4,1,'4',0),
	(5,1,'5',0),
	(6,2,'1',0),
	(7,2,'2',0),
	(8,2,'3',0),
	(9,2,'4',1),
	(10,2,'5',0),
	(11,3,'1',0),
	(12,3,'2',0),
	(13,3,'3',1),
	(14,3,'4',0),
	(15,3,'5',0),
	(16,8,'12',0),
	(17,8,'56',0),
	(18,8,'12x',0),
	(19,8,'12x^2',1),
	(20,8,'x',0),
	(26,10,'12',0),
	(27,10,'56',0),
	(28,10,'12x',0),
	(29,10,'12x^2',1),
	(30,10,'x',0),
	(51,15,'1',0),
	(52,15,'100',0),
	(53,15,'10',1),
	(54,15,'11',0),
	(55,15,'0',0),
	(56,17,'A data structure',1),
	(57,17,'Memory',0),
	(58,17,'A Hardrive',0),
	(59,18,'The tail of the list',0),
	(60,18,'Points to the next item in the list',1),
	(61,18,'The entire list',0),
	(62,19,'A plant',0),
	(63,19,'An abstract data type',1),
	(64,19,'A form of RAM',0),
	(65,20,'A long line',0),
	(66,20,'A LIFO data type',0),
	(67,20,'A FIFO data type',1),
	(68,21,'A LIFO data type',1),
	(70,21,'A FIFO data type',0);

/*!40000 ALTER TABLE `Answer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Class`;

CREATE TABLE `Class` (
  `classNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `teacherNo` int(4) unsigned NOT NULL,
  `year` int(2) NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`classNo`),
  KEY `teacherNo` (`teacherNo`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`teacherNo`) REFERENCES `Teacher` (`teacherNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Class` WRITE;
/*!40000 ALTER TABLE `Class` DISABLE KEYS */;

INSERT INTO `Class` (`classNo`, `teacherNo`, `year`, `name`)
VALUES
	(2,1,10,'Year 10 Chemistry set 1'),
	(3,1,10,'Year 10 Biology set 1'),
	(4,4,10,'Year 7 Maude'),
	(7,1,10,'Y10 Geography');

/*!40000 ALTER TABLE `Class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ClassTest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ClassTest`;

CREATE TABLE `ClassTest` (
  `classTestNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `classNo` int(4) unsigned NOT NULL,
  `testNo` int(4) unsigned NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`classTestNo`),
  KEY `testNo` (`testNo`),
  KEY `classNo` (`classNo`),
  CONSTRAINT `classtest_ibfk_2` FOREIGN KEY (`testNo`) REFERENCES `Test` (`testNo`),
  CONSTRAINT `classtest_ibfk_3` FOREIGN KEY (`classNo`) REFERENCES `Class` (`classNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `ClassTest` WRITE;
/*!40000 ALTER TABLE `ClassTest` DISABLE KEYS */;

INSERT INTO `ClassTest` (`classTestNo`, `classNo`, `testNo`, `dateTime`)
VALUES
	(1,2,1,'2016-03-21 14:00:00'),
	(2,3,1,'2016-03-24 11:00:00'),
	(4,4,4,'2016-05-03 15:00:00');

/*!40000 ALTER TABLE `ClassTest` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Question`;

CREATE TABLE `Question` (
  `questionNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `teacherNo` int(4) unsigned NOT NULL,
  `subject` varchar(30) NOT NULL DEFAULT '',
  `year` int(2) NOT NULL,
  `module` varchar(30) NOT NULL DEFAULT '',
  `difficulty` int(1) NOT NULL,
  `text` varchar(250) NOT NULL DEFAULT '',
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`questionNo`),
  KEY `teacherNo` (`teacherNo`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`teacherNo`) REFERENCES `Teacher` (`teacherNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;

INSERT INTO `Question` (`questionNo`, `teacherNo`, `subject`, `year`, `module`, `difficulty`, `text`, `image`)
VALUES
	(1,1,'Chemistry',10,'Life',2,'what is 1+1?',NULL),
	(2,1,'Chemistry',10,'Life',1,'what is 2+2?',NULL),
	(3,1,'Chemistry',10,'Life',1,'what is 2+1?',NULL),
	(8,1,'Maths',11,'Calculus',1,'What is the answer to this integration?',''),
	(10,1,'Maths',11,'Calculus',1,'What is the answer to this differentiation?',''),
	(15,1,'Maths',7,'Multiplication',1,'What is 10 x 1?',''),
	(17,4,'Programming',13,'Maude',1,'What is a linked list?',NULL),
	(18,4,'Programming',13,'Maude',2,'What is a node in a linked list?',NULL),
	(19,4,'Programming',13,'Maude',1,'What is a tree?',NULL),
	(20,4,'Programming',13,'Maude',1,'What is a queue?',NULL),
	(21,4,'Programming',13,'Muade',2,'What is a stack?',NULL);

/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Student
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Student`;

CREATE TABLE `Student` (
  `studentNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `DoB` date NOT NULL,
  `fName` varchar(30) NOT NULL DEFAULT '',
  `lName` varchar(30) NOT NULL,
  `gender` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`studentNo`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;

INSERT INTO `Student` (`studentNo`, `username`, `password`, `DoB`, `fName`, `lName`, `gender`)
VALUES
	(2,'so6sb1','password','1996-03-21','Sean','Byrom','Male'),
	(3,'so6as1','password','1996-05-29','Alex','Saunders','Male'),
	(4,'so6dd1','password','1996-04-25','Dan','Dunnington','Male'),
	(5,'so6rs1','password','1996-07-12','Rachel','Swain','Female'),
	(6,'so6ab1','password','1996-02-20','Alex','Bagnall','Male'),
	(11,'so6sw1','password','1995-10-25','Sophie','Williamson','Female'),
	(12,'so6jb1','password','1995-03-15','Joseph','Bramma','Male'),
	(13,'so6jc1','NewPassword123','1995-11-27','Jen','Clarke','Female'),
	(14,'so6ab2','password','1995-12-24','Anthony','Brown','Male'),
	(16,'so6bc1','password','1993-08-04','Ben','Cooper','Male'),
	(17,'so6sb2','pass','1996-03-02','Sarah','Brown','Female');

/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table StudentClass
# ------------------------------------------------------------

DROP TABLE IF EXISTS `StudentClass`;

CREATE TABLE `StudentClass` (
  `studentClassNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `classNo` int(4) unsigned NOT NULL,
  `studentNo` int(4) unsigned NOT NULL,
  PRIMARY KEY (`studentClassNo`),
  KEY `studentNo` (`studentNo`),
  KEY `classNo` (`classNo`),
  CONSTRAINT `studentclass_ibfk_1` FOREIGN KEY (`studentNo`) REFERENCES `Student` (`studentNo`),
  CONSTRAINT `studentclass_ibfk_2` FOREIGN KEY (`classNo`) REFERENCES `Class` (`classNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `StudentClass` WRITE;
/*!40000 ALTER TABLE `StudentClass` DISABLE KEYS */;

INSERT INTO `StudentClass` (`studentClassNo`, `classNo`, `studentNo`)
VALUES
	(1,2,2),
	(2,2,3),
	(3,2,4),
	(4,2,5),
	(5,3,6),
	(6,4,13),
	(12,2,6),
	(14,2,12),
	(15,2,13),
	(16,2,14),
	(17,2,16),
	(18,4,3),
	(19,7,6),
	(20,7,2),
	(21,4,11);

/*!40000 ALTER TABLE `StudentClass` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Submission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Submission`;

CREATE TABLE `Submission` (
  `submissionNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `studentNo` int(4) unsigned NOT NULL,
  `testQuestionNo` int(4) unsigned NOT NULL,
  `answerNo` int(4) unsigned NOT NULL,
  PRIMARY KEY (`submissionNo`),
  KEY `answerNo` (`answerNo`),
  KEY `testQuestionNo` (`testQuestionNo`),
  KEY `studentNo` (`studentNo`),
  CONSTRAINT `submission_ibfk_4` FOREIGN KEY (`answerNo`) REFERENCES `Answer` (`answerNo`),
  CONSTRAINT `submission_ibfk_7` FOREIGN KEY (`testQuestionNo`) REFERENCES `TestQuestion` (`testQuestionNo`),
  CONSTRAINT `submission_ibfk_8` FOREIGN KEY (`studentNo`) REFERENCES `Student` (`studentNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Submission` WRITE;
/*!40000 ALTER TABLE `Submission` DISABLE KEYS */;

INSERT INTO `Submission` (`submissionNo`, `studentNo`, `testQuestionNo`, `answerNo`)
VALUES
	(4,2,4,3),
	(5,2,5,10),
	(7,2,6,14),
	(8,3,4,3),
	(9,3,5,9),
	(10,3,6,14),
	(11,4,4,3),
	(12,4,5,10),
	(13,4,6,14),
	(14,5,4,3),
	(15,5,5,9),
	(16,5,6,13),
	(17,6,4,2),
	(18,6,5,10),
	(19,6,6,13),
	(29,13,11,57),
	(30,13,12,60),
	(31,13,13,63),
	(32,13,14,66),
	(33,13,15,68),
	(34,11,11,56),
	(35,11,12,61),
	(36,11,13,63),
	(37,11,14,66),
	(40,11,15,67),
	(41,3,11,58),
	(42,3,12,62),
	(43,3,13,64),
	(44,3,14,65),
	(45,3,15,67);

/*!40000 ALTER TABLE `Submission` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Tag`;

CREATE TABLE `Tag` (
  `tagNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `questionNo` int(4) unsigned NOT NULL,
  `text` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`tagNo`),
  KEY `questionNo` (`questionNo`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`questionNo`) REFERENCES `Question` (`questionNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;

INSERT INTO `Tag` (`tagNo`, `questionNo`, `text`)
VALUES
	(1,8,'Integration');

/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Teacher
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Teacher`;

CREATE TABLE `Teacher` (
  `teacherNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `fName` varchar(30) NOT NULL DEFAULT '',
  `lName` varchar(30) NOT NULL,
  `gender` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`teacherNo`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;

INSERT INTO `Teacher` (`teacherNo`, `username`, `password`, `fName`, `lName`, `gender`)
VALUES
	(1,'to6pw1','password','Prudence','Wong','Female'),
	(2,'to6as1','password','Alex','Saunders','Male'),
	(3,'to6sb1','Secur3-P4ssword','Sean','Byrom','Transgender'),
	(4,'to6gm1','password','Grant','Malcolm','Male');

/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Test
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Test`;

CREATE TABLE `Test` (
  `testNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `teacherNo` int(4) unsigned NOT NULL,
  `title` varchar(100) NOT NULL DEFAULT '',
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`testNo`),
  KEY `teacherNo` (`teacherNo`),
  CONSTRAINT `test_ibfk_1` FOREIGN KEY (`teacherNo`) REFERENCES `Teacher` (`teacherNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Test` WRITE;
/*!40000 ALTER TABLE `Test` DISABLE KEYS */;

INSERT INTO `Test` (`testNo`, `teacherNo`, `title`, `duration`)
VALUES
	(1,1,'Year 10 General Trivia',60),
	(4,4,'Advanced Object Oriented Programming',60);

/*!40000 ALTER TABLE `Test` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TestQuestion
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TestQuestion`;

CREATE TABLE `TestQuestion` (
  `testQuestionNo` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `testNo` int(4) unsigned NOT NULL,
  `questionNo` int(4) unsigned NOT NULL,
  PRIMARY KEY (`testQuestionNo`),
  KEY `testNo` (`testNo`),
  KEY `questionNo` (`questionNo`),
  CONSTRAINT `testquestion_ibfk_1` FOREIGN KEY (`testNo`) REFERENCES `Test` (`testNo`),
  CONSTRAINT `testquestion_ibfk_2` FOREIGN KEY (`questionNo`) REFERENCES `Question` (`questionNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `TestQuestion` WRITE;
/*!40000 ALTER TABLE `TestQuestion` DISABLE KEYS */;

INSERT INTO `TestQuestion` (`testQuestionNo`, `testNo`, `questionNo`)
VALUES
	(4,1,1),
	(5,1,2),
	(6,1,3),
	(11,4,17),
	(12,4,18),
	(13,4,19),
	(14,4,20),
	(15,4,21);

/*!40000 ALTER TABLE `TestQuestion` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
