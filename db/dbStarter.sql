
-- Allowing to conenct from nodejs default client
create user node@localhost identified by 'node@1234';
grant all privileges on `crud-notes`.* to node@localhost;
ALTER USER node@localhost IDENTIFIED WITH mysql_native_password BY 'test';

CREATE DATABASE IF NOT EXISTS `crud-notes`;
USE `crud-notes`;

CREATE TABLE IF NOT EXISTS notes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
);