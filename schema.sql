DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
  item_id INT
  AUTO_INCREMENT NOT NULL,
  product_name VARCHAR
  (45) NOT NULL,
  department_name VARCHAR
  (45) NOT NULL,
  price DECIMAL
  (10,2) NOT NULL,
  stock_quantity INT
  (10) NOT NULL,
  primary key
  (item_id)
);

  SELECT *
  FROM products;

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("FIFA 2018", "Video Games", 49.95, 150),
    ("Witcher 3", "Video Games", 59.99, 200),
    ("Case of Sardines", "Food and Drink", 24.50, 50),
    ("Star Wars Snuggie", "Apparel", 75.00, 5),
    ("Wizards Hat", "Apparel", 37.95, 35),
    ("6-man Tent", "Camping/Outdoors", 169.99, 42),
    ("Blazing Saddles", "Films", 15.00, 25),
    ("John Wick 3", "Films", 25.50, 57),
    ("Cards Against Humanity", "Board Games", 30.50, 35),
    ("Settlers of Catan", "Board Games", 19.95, 23);