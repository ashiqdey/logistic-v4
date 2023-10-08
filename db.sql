-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 08, 2023 at 09:48 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atr`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `access` tinyint(1) DEFAULT '1' COMMENT '1:view, 2:view edit, 3:upload, 4:Delete, 5:''-'', 6:Manager, 7:Regional Manager, 8:admin, 9:superadmin',
  `email` varchar(80) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(33) DEFAULT NULL,
  `google` tinyint(1) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `dp` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `ts` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `access`, `email`, `phone`, `password`, `google`, `name`, `dp`, `status`, `ts`) VALUES
(1, 9, 'ashiqdey@gmail.com', '7002859965', '28c639fcbd1b04093afff474ad581cca', 1, 'Ashiq Dey', 'https://lh3.googleusercontent.com/a-/AOh14GgLqI-fTNEBswdFbWGisnlFuSWNtv7qzA6D5vtFbA=s96-c', 'active', NULL),
(6, 1, 'ashiqdey.web@gmail.com', NULL, '28c639fcbd1b04093afff474ad581cca', 0, 'Ashiq Web', NULL, '1', 1661935284),
(7, 8, 'demo@xbytelab.com', NULL, '9796c96156017927ffd1f59aff6b54d4', NULL, 'Gmove Demo', NULL, 'active', 1661935284);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `phone` varchar(14) DEFAULT NULL,
  `message` text,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  `ts` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `couriers`
--

DROP TABLE IF EXISTS `couriers`;
CREATE TABLE IF NOT EXISTS `couriers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `couriers`
--

INSERT INTO `couriers` (`id`, `name`) VALUES
(1, 'Fedex'),
(2, 'UPS'),
(3, 'Blue Dart'),
(4, 'DTDC'),
(9, 'TNT'),
(6, 'Aramex'),
(8, 'DHL');

-- --------------------------------------------------------

--
-- Table structure for table `get_estimate`
--

DROP TABLE IF EXISTS `get_estimate`;
CREATE TABLE IF NOT EXISTS `get_estimate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(15) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `width` varchar(10) DEFAULT NULL,
  `fragile` tinyint(1) DEFAULT NULL,
  `insurance` tinyint(1) DEFAULT NULL,
  `packing` tinyint(1) DEFAULT NULL,
  `express` tinyint(1) DEFAULT NULL,
  `ts` bigint DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_sesions`
--

DROP TABLE IF EXISTS `login_sesions`;
CREATE TABLE IF NOT EXISTS `login_sesions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `hash` varchar(33) DEFAULT NULL COMMENT 'md5(cookie)',
  `last_login` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1:CONNECTED,\r\n2:TRANSIT,\r\n3:OUT_FOR_DEL,\r\n4:UNDELIVERED,\r\n5:DELIVERED,\r\n6:RTO,\r\n9:Expected delivery,',
  `awb` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `text` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `location` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ts` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status_map`
--

DROP TABLE IF EXISTS `status_map`;
CREATE TABLE IF NOT EXISTS `status_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(20) NOT NULL,
  `value` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_map`
--

INSERT INTO `status_map` (`id`, `label`, `value`) VALUES
(1, 'CONNECTED', 'Connected'),
(2, 'TRANSIT', 'Transit'),
(3, 'OUT_FOR_DEL', 'Out for delivery'),
(4, 'UNDELIVERED', 'Undelivered'),
(5, 'DELIVERED', 'Delevered'),
(6, 'RTO', 'Return to  origin');

-- --------------------------------------------------------

--
-- Table structure for table `tracking`
--

DROP TABLE IF EXISTS `tracking`;
CREATE TABLE IF NOT EXISTS `tracking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dated` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '2022-05-20',
  `awb` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `forwarding_no` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `courier` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `sender` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `receiver` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `destination` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `content` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `pack` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `wt` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `dwt` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `vendor` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `status` tinyint DEFAULT '1' COMMENT '1:CONNECTED,\r\n2:TRANSIT,\r\n3:OUT_FOR_DEL,\r\n4:UNDELIVERED,\r\n5:DELIVERED,\r\n6:RTO,',
  `ts_created` bigint DEFAULT NULL,
  `ts_updated` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `awb` (`awb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `versions`
--

DROP TABLE IF EXISTS `versions`;
CREATE TABLE IF NOT EXISTS `versions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(15) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
