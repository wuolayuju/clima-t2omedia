-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-01-2018 a las 21:00:52
-- Versión del servidor: 5.7.19
-- Versión de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clima_t2omedia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ct_cache`
--

DROP TABLE IF EXISTS `ct_cache`;
CREATE TABLE IF NOT EXISTS `ct_cache` (
  `id_city` int(11) DEFAULT NULL,
  `expiry` datetime DEFAULT NULL,
  KEY `id_city` (`id_city`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ct_city`
--

DROP TABLE IF EXISTS `ct_city`;
CREATE TABLE IF NOT EXISTS `ct_city` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ct_city`
--

INSERT INTO `ct_city` (`id`, `name`) VALUES
(2509954, 'Valencia'),
(2510409, 'Toledo'),
(2511174, 'Santa Cruz de Tenerife'),
(2513917, 'Merida'),
(2513947, 'Melilla'),
(2515270, 'Las Palmas de Gran Canaria'),
(2516395, 'Jaen'),
(2516548, 'Huelva'),
(2517117, 'Granada'),
(2519240, 'Cordoba'),
(2519402, 'Ciudad Real'),
(2519582, 'Ceuta'),
(2519752, 'Castello de la Plana'),
(2520610, 'Provincia de Cáceres'),
(2521420, 'Badajoz'),
(2521886, 'Almeria'),
(2521978, 'Alicante'),
(2522258, 'Albacete'),
(3104324, 'Zaragoza'),
(3104342, 'Zamora'),
(3104499, 'Vitoria-Gasteiz'),
(3106672, 'Valladolid'),
(3108126, 'Teruel'),
(3108288, 'Tarragona'),
(3108681, 'Soria'),
(3109256, 'Segovia'),
(3109642, 'Santiago de Compostela'),
(3109718, 'Santander'),
(3110044, 'San Sebastian'),
(3111108, 'Salamanca'),
(3113209, 'Pontevedra'),
(3114472, 'Pamplona'),
(3114531, 'Palencia'),
(3114711, 'Oviedo'),
(3114965, 'Ourense'),
(3117735, 'Madrid'),
(3117814, 'Lugo'),
(3119841, 'A Coruna'),
(3120514, 'Huesca'),
(3121070, 'Guadalajara'),
(3121456, 'Girona'),
(3124132, 'Cuenca'),
(3127461, 'Burgos'),
(3128026, 'Bilbao'),
(6355234, 'Murcia'),
(6355632, 'Ávila'),
(6356055, 'Barcelona'),
(6356927, 'Cádiz'),
(6359078, 'Logroño'),
(6359472, 'Málaga'),
(6361046, 'Seville'),
(6362996, 'León'),
(6533961, 'Palma de Mallorca'),
(7874189, 'Lérida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ct_forecast`
--

DROP TABLE IF EXISTS `ct_forecast`;
CREATE TABLE IF NOT EXISTS `ct_forecast` (
  `id_city` int(11) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `temperature` int(11) DEFAULT NULL,
  KEY `id_city_idx` (`id_city`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ct_cache`
--
ALTER TABLE `ct_cache`
  ADD CONSTRAINT `ct_cache_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `ct_city` (`id`);

--
-- Filtros para la tabla `ct_forecast`
--
ALTER TABLE `ct_forecast`
  ADD CONSTRAINT `id_city` FOREIGN KEY (`id_city`) REFERENCES `ct_cache` (`id_city`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
