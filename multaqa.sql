-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2023 at 08:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `multaqa`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `User_no` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`User_no`, `password`, `type`) VALUES
(1111, '$2y$10$9Go9lBK29fhgl1agrxxKauO8ObCcXd/vbar9HHCH/Dj9iUuFXRFtS', '2'),
(1234, '1234', '1'),
(5678, '5678', '1');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_name` varchar(255) NOT NULL,
  `no_of_students` int(11) DEFAULT 0,
  `supervisor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_name` varchar(255) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `user_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_name`, `doctor_id`, `user_no`) VALUES
('عودة عبدالله', 1234, 1234),
('منتصر الاسمر', 5678, 5678);

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

CREATE TABLE `evaluation` (
  `serial_no` int(11) NOT NULL,
  `Student_id` int(11) NOT NULL,
  `date` varchar(100) DEFAULT current_timestamp(),
  `no_of_save_pages` int(11) NOT NULL,
  `no_of_review_pages` int(11) NOT NULL,
  `page_to_page_save` varchar(100) NOT NULL,
  `page_to_page_review` varchar(100) NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `serial_no` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `supervisor_id` int(11) DEFAULT NULL,
  `parts` varchar(255) NOT NULL,
  `date_exam` varchar(100) NOT NULL,
  `exam_section` varchar(255) NOT NULL,
  `exam_pattern` varchar(255) NOT NULL,
  `grade` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Student_id` int(50) NOT NULL,
  `Student_name` varchar(255) NOT NULL,
  `plan` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `college_name` varchar(200) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `gender` varchar(200) NOT NULL,
  `class_name` varchar(50) NOT NULL,
  `user_no` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submit_the_exam`
--

CREATE TABLE `submit_the_exam` (
  `serial_no` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `student_id` int(11) NOT NULL,
  `supervisor_id` int(11) DEFAULT NULL,
  `time` varchar(50) NOT NULL,
  `exam_pattern` varchar(255) NOT NULL,
  `exam_section` varchar(255) NOT NULL,
  `college_name` varchar(100) NOT NULL,
  `plan` varchar(255) NOT NULL,
  `gender` varchar(200) NOT NULL,
  `parts` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`User_no`),
  ADD UNIQUE KEY `UK_password` (`password`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_name`),
  ADD KEY `supervisor_id` (`supervisor_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `user_no` (`user_no`);

--
-- Indexes for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`serial_no`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`serial_no`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `supervisor_id` (`supervisor_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Student_id`),
  ADD UNIQUE KEY `UK_phone` (`phone`),
  ADD KEY `student_ibfk_1` (`user_no`),
  ADD KEY `fk_class_name` (`class_name`);

--
-- Indexes for table `submit_the_exam`
--
ALTER TABLE `submit_the_exam`
  ADD PRIMARY KEY (`serial_no`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `supervisor_id` (`supervisor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `serial_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `serial_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submit_the_exam`
--
ALTER TABLE `submit_the_exam`
  MODIFY `serial_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`supervisor_id`) REFERENCES `student` (`Student_id`);

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `account` (`User_no`);

--
-- Constraints for table `exam`
--
ALTER TABLE `exam`
  ADD CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`Student_id`),
  ADD CONSTRAINT `exam_ibfk_2` FOREIGN KEY (`supervisor_id`) REFERENCES `student` (`Student_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `fk_class_name` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`),
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `account` (`User_no`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `submit_the_exam`
--
ALTER TABLE `submit_the_exam`
  ADD CONSTRAINT `submit_the_exam_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`Student_id`),
  ADD CONSTRAINT `submit_the_exam_ibfk_2` FOREIGN KEY (`supervisor_id`) REFERENCES `student` (`Student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
