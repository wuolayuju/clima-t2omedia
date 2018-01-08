-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: clima_t2omedia
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ct_cache`
--

DROP TABLE IF EXISTS `ct_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ct_cache` (
  `id_city` int(11) DEFAULT NULL,
  `cache_time` int(11) DEFAULT NULL,
  KEY `id_city` (`id_city`),
  CONSTRAINT `ct_cache_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `ct_city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_cache`
--

LOCK TABLES `ct_cache` WRITE;
/*!40000 ALTER TABLE `ct_cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_city`
--

DROP TABLE IF EXISTS `ct_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ct_city` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_city`
--

LOCK TABLES `ct_city` WRITE;
/*!40000 ALTER TABLE `ct_city` DISABLE KEYS */;
INSERT INTO `ct_city` VALUES (2509954,'Valencia'),(2510409,'Toledo'),(2511174,'Santa Cruz de Tenerife'),(2513917,'Merida'),(2513947,'Melilla'),(2515270,'Las Palmas de Gran Canaria'),(2516395,'Jaen'),(2516548,'Huelva'),(2517117,'Granada'),(2519240,'Cordoba'),(2519402,'Ciudad Real'),(2519582,'Ceuta'),(2519752,'Castello de la Plana'),(2520610,'Provincia de Cáceres'),(2521420,'Badajoz'),(2521886,'Almeria'),(2521978,'Alicante'),(2522258,'Albacete'),(3104324,'Zaragoza'),(3104342,'Zamora'),(3104499,'Vitoria-Gasteiz'),(3106672,'Valladolid'),(3108126,'Teruel'),(3108288,'Tarragona'),(3108681,'Soria'),(3109256,'Segovia'),(3109642,'Santiago de Compostela'),(3109718,'Santander'),(3110044,'San Sebastian'),(3111108,'Salamanca'),(3113209,'Pontevedra'),(3114472,'Pamplona'),(3114531,'Palencia'),(3114711,'Oviedo'),(3114965,'Ourense'),(3117735,'Madrid'),(3117814,'Lugo'),(3119841,'A Coruna'),(3120514,'Huesca'),(3121070,'Guadalajara'),(3121456,'Girona'),(3124132,'Cuenca'),(3127461,'Burgos'),(3128026,'Bilbao'),(6355234,'Murcia'),(6355632,'Ávila'),(6356055,'Barcelona'),(6356927,'Cádiz'),(6359078,'Logroño'),(6359472,'Málaga'),(6361046,'Seville'),(6362996,'León'),(6533961,'Palma de Mallorca'),(7874189,'Lérida');
/*!40000 ALTER TABLE `ct_city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_forecast`
--

DROP TABLE IF EXISTS `ct_forecast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ct_forecast` (
  `id_city` int(11) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `temperature` int(11) DEFAULT NULL,
  KEY `id_city_idx` (`id_city`),
  CONSTRAINT `id_city` FOREIGN KEY (`id_city`) REFERENCES `ct_cache` (`id_city`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_forecast`
--

LOCK TABLES `ct_forecast` WRITE;
/*!40000 ALTER TABLE `ct_forecast` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_forecast` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 18:03:28
