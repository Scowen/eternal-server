-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 22, 2019 at 10:31 AM
-- Server version: 5.7.19-log
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rage`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(125) NOT NULL,
  `credits` int(11) NOT NULL DEFAULT '500',
  `social` varchar(75) DEFAULT NULL,
  `char_slots` int(2) NOT NULL DEFAULT '2',
  `donator` int(11) NOT NULL DEFAULT '-1',
  `vip` int(11) NOT NULL DEFAULT '-1',
  `current_ip` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `admin` int(2) NOT NULL DEFAULT '0',
  `quiz_passed` int(1) NOT NULL DEFAULT '0',
  `quiz_cooldown` int(11) NOT NULL DEFAULT '-1',
  `last_updated` int(11) NOT NULL DEFAULT '0',
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `email`, `password`, `credits`, `social`, `char_slots`, `donator`, `vip`, `current_ip`, `active`, `admin`, `quiz_passed`, `quiz_cooldown`, `last_updated`, `created`) VALUES
(1, 'Xylum', 'email@domain.com', 'password', 500, NULL, 2, -1, -1, '', 1, 9, 0, -1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `account` int(11) NOT NULL,
  `identifier` varchar(8) NOT NULL,
  `identifier_int` int(8) NOT NULL,
  `mask_identifier` varchar(6) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `bank_money` bigint(20) NOT NULL DEFAULT '1000',
  `hand_money` bigint(20) NOT NULL DEFAULT '1000',
  `position` text,
  `heading` int(11) NOT NULL DEFAULT '0',
  `health` int(3) NOT NULL DEFAULT '100',
  `armour` int(3) NOT NULL DEFAULT '0',
  `dimension` int(11) NOT NULL DEFAULT '0',
  `num_jails` int(5) NOT NULL DEFAULT '0',
  `num_prisons` int(5) NOT NULL DEFAULT '0',
  `num_admin_jails` int(5) NOT NULL DEFAULT '0',
  `jail` int(11) NOT NULL DEFAULT '-1',
  `prison` int(11) NOT NULL DEFAULT '-1',
  `admin_jail` int(11) NOT NULL DEFAULT '-1',
  `previous_name` varchar(50) DEFAULT NULL,
  `radio_frequency` int(11) DEFAULT NULL,
  `model` int(11) NOT NULL DEFAULT '1885233650',
  `clothes` text,
  `faction` int(11) DEFAULT '-1',
  `faction_points` int(11) DEFAULT '-1',
  `dead` tinyint(1) NOT NULL DEFAULT '0',
  `limbo` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `phone_no` varchar(8) DEFAULT NULL,
  `phone_caller_id` tinyint(1) NOT NULL DEFAULT '1',
  `experience` int(11) NOT NULL DEFAULT '0',
  `salary` double NOT NULL DEFAULT '0',
  `license_driving` tinyint(1) NOT NULL DEFAULT '0',
  `license_driving_advanced` tinyint(1) NOT NULL DEFAULT '0',
  `license_hgv_1` tinyint(1) NOT NULL DEFAULT '0',
  `license_hgv_2` tinyint(1) NOT NULL DEFAULT '0',
  `license_hgv_3` tinyint(1) NOT NULL DEFAULT '0',
  `license_motorbike` tinyint(1) NOT NULL DEFAULT '0',
  `license_weapon` tinyint(1) NOT NULL DEFAULT '0',
  `license_weapon_advanced` tinyint(1) NOT NULL DEFAULT '0',
  `license_pilot` tinyint(1) NOT NULL DEFAULT '0',
  `license_pilot_advanced` tinyint(1) NOT NULL DEFAULT '0',
  `license_medical` tinyint(1) NOT NULL DEFAULT '0',
  `weapons` text,
  `inventory` text,
  `vehicle_keys` text,
  `play_time` int(11) NOT NULL DEFAULT '0',
  `last_played` int(11) NOT NULL DEFAULT '0',
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`id`, `account`, `identifier`, `identifier_int`, `mask_identifier`, `name`, `bank_money`, `hand_money`, `position`, `heading`, `health`, `armour`, `dimension`, `num_jails`, `num_prisons`, `num_admin_jails`, `jail`, `prison`, `admin_jail`, `previous_name`, `radio_frequency`, `model`, `clothes`, `faction`, `faction_points`, `dead`, `limbo`, `active`, `phone_no`, `phone_caller_id`, `experience`, `salary`, `license_driving`, `license_driving_advanced`, `license_hgv_1`, `license_hgv_2`, `license_hgv_3`, `license_motorbike`, `license_weapon`, `license_weapon_advanced`, `license_pilot`, `license_pilot_advanced`, `license_medical`, `weapons`, `inventory`, `vehicle_keys`, `play_time`, `last_played`, `created`) VALUES
(1, 1, '397191', 397191, NULL, 'Luke_Lost', 996149899, 1500, '{"x":-1790.1201171875,"y":-960.732666015625,"z":8.218536376953125}', 216, 100, 0, 0, 0, 0, 0, -1, -1, -1, NULL, NULL, 1885233650, '{"shapeFirstID":42,"shapeSecondID":21,"skinFirstID":0,"hair":17,"hairColour":11,"beard":4,"beardColour":6,"torso":0,"legs":0,"foot":0,"jacket":0,"jacketTexture":0,"undershirt":0}', -1, -1, 0, 0, 1, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 0, 1507385199, 1506356764),
(2, 1, '556614', 556614, NULL, 'James_Mercer', 4900, 1500, '{"x":-1158.0654296875,"y":-1607.0628662109375,"z":3.8007168769836426}', 84, 70, 0, 0, 0, 0, 0, -1, -1, -1, NULL, NULL, 1885233650, '{"shapeFirstID":17,"shapeSecondID":15,"skinFirstID":7,"hair":14,"hairColour":47,"beard":11,"beardColour":48,"torso":0,"legs":7,"foot":25,"jacket":122,"jacketTexture":2,"undershirt":2}', -1, -1, 0, 0, 1, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 0, 1507155997, 1506357110),
(3, 1, '496245', 496245, NULL, 'James_Lost', 5000, 1500, '{"x":-52.748905181884766,"y":-1112.763427734375,"z":26.43583106994629}', 280, 100, 0, 0, 0, 0, 0, -1, -1, -1, NULL, NULL, 1885233650, '{"shapeFirstID":0,"shapeSecondID":4,"skinFirstID":1,"hair":4,"hairColour":4,"beard":0,"beardColour":25,"torso":0,"legs":0,"foot":9,"jacket":12,"jacketTexture":2,"undershirt":3}', -1, -1, 0, 0, 1, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 0, 1507072092, 1506357857),
(4, 1, '914228', 914228, NULL, 'Moe_Lester', 5000, 1500, '{"x":-1165.04345703125,"y":-3192.326171875,"z":14.301838874816895}', 349, 38, 0, 0, 0, 0, 0, -1, -1, -1, NULL, NULL, -1667301416, '{"shapeFirstID":19,"shapeSecondID":0,"skinFirstID":14,"hair":19,"hairColour":42,"beard":0,"beardColour":3,"torso":0,"legs":8,"foot":30,"jacket":180,"jacketTexture":4,"undershirt":3}', -1, -1, 0, 0, 1, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 0, 1506639199, 1506460167);

-- --------------------------------------------------------

--
-- Table structure for table `dealership`
--

CREATE TABLE `dealership` (
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `position` text,
  `purchase_position` text,
  `purchase_rotation` text,
  `owner` int(11) DEFAULT NULL,
  `stock` text,
  `balance` int(11) NOT NULL DEFAULT '0',
  `managers` text,
  `logs` text,
  `for_sale` tinyint(1) NOT NULL DEFAULT '0',
  `for_sale_price` int(11) NOT NULL DEFAULT '0',
  `last_updated` int(11) NOT NULL,
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dealership`
--

INSERT INTO `dealership` (`id`, `name`, `position`, `purchase_position`, `purchase_rotation`, `owner`, `stock`, `balance`, `managers`, `logs`, `for_sale`, `for_sale_price`, `last_updated`, `created`) VALUES
(1, 'Motorsport', '{"x":-38.42104721069336,"y":-1109.248046875,"z":26.43735694885254}', '{"x":-25.6922664642334,"y":-1081.95458984375,"z":27.196229934692383}', '{"x":-0.11549854278564453,"y":-0.4590418338775635,"z":71.60063171386719}', NULL, 'null', 3850350, 'null', 'null', 0, 0, 1507383033, 1506439141),
(2, 'Luxury', '{"x":228.90431213378906,"y":-976.12158203125,"z":-98.99984741210938}', NULL, '0', NULL, NULL, 0, NULL, NULL, 0, 0, 1506444169, 1506444169);

-- --------------------------------------------------------

--
-- Table structure for table `dealership_spot`
--

CREATE TABLE `dealership_spot` (
  `id` int(11) NOT NULL,
  `dealership` int(11) NOT NULL,
  `name` varchar(75) DEFAULT NULL,
  `hash` int(11) DEFAULT NULL,
  `position` text NOT NULL,
  `rotation` text NOT NULL,
  `color1` int(11) NOT NULL DEFAULT '0',
  `color2` int(11) NOT NULL DEFAULT '0',
  `stock` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `last_updated` int(11) NOT NULL,
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dealership_spot`
--

INSERT INTO `dealership_spot` (`id`, `dealership`, `name`, `hash`, `position`, `rotation`, `color1`, `color2`, `stock`, `price`, `last_updated`, `created`) VALUES
(1, 1, 'T20', 1663218586, '{"x":-45.08142852783203,"y":-1116.728515625,"z":26.00921058654785}', '{"x":-0.10152649879455566,"y":0.4272805154323578,"z":3.434300661087036}', 89, 0, 193, 50, 1506640025, 1506439222),
(2, 1, 'Tempesta', 272929391, '{"x":-47.749263763427734,"y":-1116.7415771484375,"z":26.009944915771484}', '{"x":-0.04575870558619499,"y":0.33846375346183777,"z":2.188336133956909}', 34, 0, 2, 850000, 1506639623, 1506439246),
(3, 1, NULL, NULL, '{"x":-50.64975357055664,"y":-1116.994140625,"z":26.009418487548828}', '{"x":-0.05087285488843918,"y":0.3959392011165619,"z":2.259958028793335}', 0, 0, 0, 0, 1506439259, 1506439259),
(4, 1, NULL, NULL, '{"x":-53.537437438964844,"y":-1117.0904541015625,"z":26.009552001953125}', '{"x":-0.11028672754764557,"y":0.4353462755680084,"z":2.1668615341186523}', 0, 0, 0, 0, 1506439274, 1506439274),
(5, 1, 'XA21', 917809321, '{"x":-56.33339309692383,"y":-1117.2249755859375,"z":26.009220123291016}', '{"x":-0.07750826328992844,"y":0.37150678038597107,"z":1.4200141429901123}', 36, 120, 3, 2000000, 1506616820, 1506439287),
(6, 1, NULL, NULL, '{"x":-59.061798095703125,"y":-1117.3203125,"z":26.008798599243164}', '{"x":-0.0970538854598999,"y":0.35332348942756653,"z":2.2133634090423584}', 0, 0, 0, 0, 1506439298, 1506439298),
(7, 1, NULL, NULL, '{"x":-61.895957946777344,"y":-1117.4036865234375,"z":26.008344650268555}', '{"x":-0.1049518808722496,"y":0.35831499099731445,"z":1.8902835845947266}', 0, 0, 0, 0, 1506439311, 1506439311),
(8, 1, NULL, NULL, '{"x":-45.52488708496094,"y":-1108.8768310546875,"z":26.01321029663086}', '{"x":-0.1207381933927536,"y":0.32838407158851624,"z":69.61141204833984}', 0, 0, 0, 0, 1506439344, 1506439344),
(9, 1, 'Visione', -998177792, '{"x":-51.941707611083984,"y":-1106.4954833984375,"z":26.012157440185547}', '{"x":-0.2636590898036957,"y":0.3819712698459625,"z":69.62834167480469}', 75, 0, 14, 1000000, 1507383033, 1506439351),
(10, 1, NULL, NULL, '{"x":-59.827754974365234,"y":-1103.59033203125,"z":25.983417510986328}', '{"x":-1.6222120523452759,"y":-0.032238174229860306,"z":69.82801055908203}', 0, 0, 0, 0, 1506439357, 1506439357),
(11, 1, 'Zentorno', -1403128555, '{"x":-40.753761291503906,"y":-1115.8348388671875,"z":26.011302947998047}', '{"x":-0.12974262237548828,"y":0.3679828643798828,"z":34.37238693237305}', 134, 32, 3, 985000, 1506439449, 1506439449),
(12, 2, NULL, NULL, '{"x":223.17636108398438,"y":-980.4544067382812,"z":-99.42436981201172}', '{"x":-0.16951055824756622,"y":0.38968318700790405,"z":-91.795654296875}', 0, 0, 0, 0, 1506444197, 1506444197),
(13, 2, NULL, NULL, '{"x":222.89364624023438,"y":-984.5482788085938,"z":-99.42420959472656}', '{"x":-0.16553479433059692,"y":0.4440123438835144,"z":-88.88555908203125}', 0, 0, 0, 0, 1506444224, 1506444224);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `severity` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `user_ip` varchar(15) DEFAULT NULL,
  `url` varchar(75) DEFAULT NULL,
  `description` text,
  `serialized` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `migration`
--

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1506356685),
('m170925_090910_create_account', 1506356686),
('m170925_091902_create_characters', 1506356686),
('m170925_103934_add_character_options', 1506356686),
('m170925_165350_create_table_vehicle', 1506359682),
('m170925_171608_create_table_dealership', 1506437734),
('m170925_185719_create_table_dealership_spot', 1506437734),
('m170927_091859_alter_dealership_purchase_heading_1', 1506528636),
('m170927_135423_create_table_vehicles', 1506528636),
('m170927_180307_insert_account', 1506548645),
('m170927_181313_create_table_log', 1506548645),
('m170927_214130_rename_vehicle_to_vehicle_info', 1506548569),
('m170927_221805_rename_vehicles_to_vehicle', 1506550747),
('m170927_230512_rename_vehicle_info_to_hash', 1506553639),
('m170928_163716_change_type_of_column_money_to_int_1', 1506616771);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `hash` int(11) NOT NULL,
  `destroyed` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `sellable` tinyint(1) NOT NULL DEFAULT '1',
  `credit_vehicle` tinyint(1) NOT NULL DEFAULT '0',
  `rented` tinyint(1) NOT NULL DEFAULT '0',
  `for_sale` tinyint(1) NOT NULL DEFAULT '0',
  `frozen` tinyint(1) NOT NULL DEFAULT '0',
  `sale_lot` int(11) DEFAULT NULL,
  `sale_price` int(11) DEFAULT NULL,
  `position` text,
  `rotation` text,
  `inventory` text,
  `mods` text,
  `health` int(11) NOT NULL DEFAULT '100',
  `plate` varchar(8) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `faction` int(11) DEFAULT NULL,
  `parking_spot` int(11) DEFAULT NULL,
  `colour1` int(11) DEFAULT NULL,
  `colour2` int(11) DEFAULT NULL,
  `rgb1` text,
  `rgb2` text,
  `neon` text,
  `fuel` int(11) NOT NULL DEFAULT '100',
  `power_multiplier` int(11) NOT NULL DEFAULT '1',
  `ecu` int(11) NOT NULL DEFAULT '0',
  `nitrous` int(11) NOT NULL DEFAULT '0',
  `miles` int(11) NOT NULL DEFAULT '0',
  `last_updated` int(11) NOT NULL,
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `hash`, `destroyed`, `active`, `locked`, `sellable`, `credit_vehicle`, `rented`, `for_sale`, `frozen`, `sale_lot`, `sale_price`, `position`, `rotation`, `inventory`, `mods`, `health`, `plate`, `owner`, `faction`, `parking_spot`, `colour1`, `colour2`, `rgb1`, `rgb2`, `neon`, `fuel`, `power_multiplier`, `ecu`, `nitrous`, `miles`, `last_updated`, `created`) VALUES
(1, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":418.526611328125,"y":-1411.036376953125,"z":28.76019287109375}', '{"x":2.032411575317383,"y":0.13769711554050446,"z":146.00474548339844}', 'null', 'null', 1000, 't2SNlHop', 1, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506554611),
(2, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-65.8726577758789,"y":-1128.2457275390625,"z":25.313419342041016}', '{"x":0.43409547209739685,"y":6.654568672180176,"z":-91.28260803222656}', 'null', 'null', 1000, 'BA7VMMBE', 1, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506614532),
(3, 917809321, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-97.9842300415039,"y":-1084.5050048828125,"z":25.929433822631836}', '{"x":1.8244894742965698,"y":6.351222515106201,"z":-21.63149642944336}', 'null', 'null', 1000, 'CYAUCUZI', 1, NULL, NULL, 36, 120, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506616820),
(4, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-66.18559265136719,"y":-1081.217041015625,"z":26.465726852416992}', '{"x":-2.172607898712158,"y":6.375450611114502,"z":159.53416442871094}', 'null', 'null', 1000, '8RXXMOCA', 1, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506639483),
(5, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-367.7008361816406,"y":-156.665771484375,"z":37.829490661621094}', '{"x":-0.1396864503622055,"y":0.5068953037261963,"z":14.947395324707031}', 'null', 'null', 1000, 'P0CDXAHU', 1, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506639524),
(6, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-69.7573013305664,"y":-1090.9404296875,"z":26.132884979248047}', '{"x":-2.0416247844696045,"y":6.009988307952881,"z":158.83436584472656}', 'null', 'null', 1000, 'ULVEFF0R', 1, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506639587),
(7, 272929391, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-1175.693115234375,"y":-302.1902770996094,"z":37.03646469116211}', '{"x":-0.16597697138786316,"y":0.2667582333087921,"z":-81.54344940185547}', 'null', 'null', 1000, 'E3JHCLFT', 1, NULL, NULL, 34, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1506639623),
(8, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-49.89452362060547,"y":-923.2042236328125,"z":28.737014770507812}', '{"x":-2.40118145942688,"y":0.7622982263565063,"z":159.36477661132812}', 'null', 'null', 1000, 'AEW3KM34', 2, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507155997, 1506640025),
(9, 1663218586, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-66.26914978027344,"y":-1075.7186279296875,"z":26.5935001373291}', '{"x":-2.041374683380127,"y":-2.5991435050964355,"z":159.70394897460938}', 'null', 'null', 1000, 'CWESTTGR', 2, NULL, NULL, 89, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507155997, 1507068913),
(10, -998177792, 0, 1, 0, 1, 0, 0, 0, 0, NULL, NULL, '{"x":-25.6922664642334,"y":-1081.95458984375,"z":27.196229934692383}', '{"x":-0.11549854278564453,"y":-0.4590418338775635,"z":71.60063171386719}', 'null', 'null', 1000, 'PWUQDMIR', 1, NULL, NULL, 75, 0, 'null', 'null', 'null', 100, 1, 0, 0, 0, 1507385199, 1507383033);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_info`
--

CREATE TABLE `vehicle_info` (
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `fancy_name` varchar(75) NOT NULL,
  `hash` int(11) NOT NULL,
  `class_type` int(11) NOT NULL,
  `cost_credits` int(11) NOT NULL DEFAULT '0',
  `available_credits` tinyint(1) DEFAULT '0',
  `available` tinyint(1) DEFAULT '0',
  `cost` int(11) NOT NULL DEFAULT '10000',
  `price` int(11) NOT NULL DEFAULT '10000',
  `num_bought` int(11) NOT NULL DEFAULT '0',
  `fuel_consumption` int(11) NOT NULL DEFAULT '1',
  `tank_capacity` int(11) NOT NULL DEFAULT '100',
  `max_inventory` int(11) NOT NULL DEFAULT '5',
  `max_occupants` int(11) NOT NULL DEFAULT '4',
  `max_modifications` text,
  `power_multiplier` int(11) NOT NULL DEFAULT '1',
  `can_be_mapped` tinyint(1) NOT NULL DEFAULT '0',
  `can_use_nitrous` tinyint(1) NOT NULL DEFAULT '0',
  `last_updated` int(11) NOT NULL,
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vehicle_info`
--

INSERT INTO `vehicle_info` (`id`, `name`, `fancy_name`, `hash`, `class_type`, `cost_credits`, `available_credits`, `available`, `cost`, `price`, `num_bought`, `fuel_consumption`, `tank_capacity`, `max_inventory`, `max_occupants`, `max_modifications`, `power_multiplier`, `can_be_mapped`, `can_use_nitrous`, `last_updated`, `created`) VALUES
(1, 'T20', 'Progen T20', 1663218586, 7, 0, 0, 1, 10000, 10000, 0, 1, 100, 5, 4, NULL, 1, 1, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dealership`
--
ALTER TABLE `dealership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dealership_spot`
--
ALTER TABLE `dealership_spot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_info`
--
ALTER TABLE `vehicle_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `dealership`
--
ALTER TABLE `dealership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `dealership_spot`
--
ALTER TABLE `dealership_spot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `vehicle_info`
--
ALTER TABLE `vehicle_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
