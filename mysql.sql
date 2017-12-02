CREATE DATABASE  IF NOT EXISTS`wifi_gps` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `wifi_gps`;
/*Table structure for table `account_type` */
DROP TABLE IF EXISTS `wifi_gps`.`record`;

CREATE TABLE `wifi_gps`.`record` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `SSID` varchar(128) NOT NULL,
  `level` varchar(128) NOT NULL,
  `macAdr` char(17) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `time` timestamp NOT NULL,
  `timeCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Contains the creation time of the row',
  PRIMARY KEY (`id`),
  `frequency` varchar(128) NOT NULL,
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


  DROP TABLE IF EXISTS `wifi_gps`.`wifi`;

  CREATE TABLE `wifi_gps`.`wifi` (
    `id` int(20) NOT NULL AUTO_INCREMENT,
    `SSID` varchar(128) NOT NULL,
    `timeCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Contains the creation time of the row',
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
