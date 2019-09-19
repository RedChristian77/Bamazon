Drop database if Exists bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT primary key,
  product_name VARCHAR(45),
  department_name VARCHAR(30),
  price INT,
  stock_quantity int
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation","Electronics", 200, 400), ("Xbox","Electronics",200,400),
("Apple","Produce",1,1000), ("Guitar","Music",200,100), ("Toothpaste","Self-Care",7,200),
("Beef","Meat",7,4000),("Dr.Pepper","Soda",1,10000),("Chips","snacks",2,1000),
("Ice-Cream","Frozen",4,100),("Sprite","Soda",1,10000);

Select * from products;
