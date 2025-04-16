-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 16 apr 2025 om 11:25
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mbadmin`
--

-- --------------------------------------------------------

INSERT INTO `options` (`id`, `name`, `value`) VALUES
(1, 'ridesListType', 'day'),
(2, 'projectsListType', 'open'),
(3, 'contactsListType', 'open'),
(4, 'contactsHeaderOpen', 'true'),
(5, 'projectsHeaderOpen', 'true'),
(6, 'listOrder', 'projects,tasks,contacts,rides,vehicles,export'),
(7, 'showListOrder', 'false'),
(8, 'vehiclesHeaderOpen', 'false'),
(9, 'vehiclesListType', 'lastUsed'),
(10, 'editSubject', 'contacts'),
(11, 'editId', '73'),
(14, 'tasksHeaderOpen', 'true'),
(15, 'leftPanelDividerPosition', '427'),
(16, 'tasksListType', 'day'),
(18, 'startWeekAtMonday', 'true'),
(20, 'sound', 'false'),
(22, 'listLength', '5'),
(23, 'ridesHeaderOpen', 'true'),
(24, 'ridesListSelectionOffset', '{\"year\":2025,\"month\":2,\"day\":15}'),
(25, 'vehiclesListSelectionOffset', '0'),
(26, 'exportHeaderOpen', 'false'),
(33, 'vatListSelectionOffset', '0'),
(36, 'mobileOpenSubject', 'rides'),
(37, 'contactsListSelectionOffset', '60'),
(38, 'projectsListSelectionOffset', '0'),
(39, 'tasksListSelectionOffset', '{\"year\":2025,\"month\":4,\"day\":2}'),
(43, 'exportListSelectionOffset', '0'),
(44, 'exportListType', 'export'),
(45, 'taskProjectListSelectionOffset', '8'),
(46, 'taskProjectListType', 'open'),
(47, 'rideProjectListSelectionOffset', '96'),
(48, 'rideProjectListType', 'lastUsed'),
(49, 'rideVehicleListType', 'open'),
(50, 'rideVehicleListSelectionOffset', '12'),
(51, 'projectContactsListSelectionOffset', '0'),
(52, 'projectContactsListType', 'lastUsed');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`) USING HASH;

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
