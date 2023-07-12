-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE Category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 10,
    category_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE Tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE ProductTag (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT,
    tag_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);