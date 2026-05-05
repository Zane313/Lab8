CREATE DATABASE IF NOT EXISTS bigbike_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE bigbike_db;

DROP TABLE IF EXISTS `bikes`;

CREATE TABLE `bikes` (
  `id`       INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `brand`    VARCHAR(255) NOT NULL,
  `model`    VARCHAR(255) NOT NULL,
  `cc`       INT NOT NULL,
  `price`    DECIMAL(10,2) NOT NULL,
  `stock`    INT NOT NULL DEFAULT 0,
  `image`    VARCHAR(255) NOT NULL,
  `slug`     VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

