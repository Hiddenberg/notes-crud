
CREATE DATABASE IF NOT EXISTS `crud-notes`;
USE `crud-notes`;

CREATE TABLE IF NOT EXISTS notes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
);