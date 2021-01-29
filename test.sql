-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 09:08 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateAccount` (IN `fname` VARCHAR(255), IN `lname` VARCHAR(255), IN `phone` VARCHAR(25), IN `description` VARCHAR(255))  BEGIN
    DECLARE l_account_id INT DEFAULT 0;
    
    START TRANSACTION;
    -- Insert account data
    INSERT INTO accounts(first_name, last_name)
    VALUES(fname, lname);
    
    -- get account id
    SET l_account_id = LAST_INSERT_ID();
    
    -- insert phone for the account
    IF l_account_id > 0 THEN
	INSERT INTO phones(account_id, phone, description)
        VALUES(l_account_id,phone,description);
        -- commit
        COMMIT;
     ELSE
	ROLLBACK;
    END IF;
END$$


CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserDetailsInfo` (IN `userId` INT(11) UNSIGNED)  BEGIN
    SELECT p.first_name, p.last_name, p.email, p.gender, 			       p.phone_number, ad.location_name, ad.city, ad.postal_code
    FROM `personal_info` p
    left join user_address ad on p.Id = ad.pid

    WHERE p.Id = userId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `first_name`, `last_name`) VALUES
(1, 'John', 'Doe');

-- --------------------------------------------------------

--
-- Table structure for table `personal_info`
--

CREATE TABLE `personal_info` (
  `Id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `gender` varchar(2) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personal_info`
--

INSERT INTO `personal_info` (`Id`, `first_name`, `last_name`, `email`, `gender`, `password`, `phone_number`) VALUES
(1, 'Faisal', 'Porag', 'porag1324@gmail.com', 'm', '$2b$10$dyJMN8kU4aJXB2pqu0hUKeRPdGbOXKNdoL62eXR0QGyVMmwaRwDHW', '01622310751'),
(2, 'Salaha', 'Sultana', 'sumi@gmail.com', 'f', '$2b$10$.lxBIALX1JlLafKzjhjbheSeWmAUPRC6vRBQgj.geYe0rK1QRKkzO', '01741337720'),
(4, 'Test1', 'Abc1', 'sdfs11dfds@gmail.com', 'f', '$2b$10$qlA0Ap9b/tV9ZVC9KOZUr.kClb/VAtxomGdEVegS3txvuZ56OUwQe', '016556452652'),
(5, 'Test2', 'Abc2', 'abc2@gmail.com', 'f', '$2b$10$v0PyssCxari6JZDi/4sOQu3l2AzT6f7vC5OhIxbqqP6mGhbQt9wMS', '01741337720'),
(6, 'Test3', 'Abc3', 'abc3@gmail.com', 'f', '$2b$10$YniCgI5scwzQqXM4rJ5lb.H8LTcO4SidMAzSPFZBPvhystu.oKNi6', '01741337720');

-- --------------------------------------------------------

--
-- Table structure for table `phones`
--

CREATE TABLE `phones` (
  `phone_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `phones`
--

INSERT INTO `phones` (`phone_id`, `account_id`, `phone`, `description`) VALUES
(1, 1, '(408)-456-4567', 'Emergency Contact');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `Id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `location_name` varchar(250) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`Id`, `pid`, `location_name`, `city`, `postal_code`) VALUES
(1, 6, 'West raza bazar', 'Dhaka', '1236');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `personal_info`
--
ALTER TABLE `personal_info`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `phones`
--
ALTER TABLE `phones`
  ADD PRIMARY KEY (`phone_id`,`account_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_info`
--
ALTER TABLE `personal_info`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `phones`
--
ALTER TABLE `phones`
  MODIFY `phone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `phones`
--
ALTER TABLE `phones`
  ADD CONSTRAINT `phones_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
