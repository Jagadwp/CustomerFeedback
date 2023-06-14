CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20)
);

CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20)
);

CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  salesperson_id INT,
  is_completed BOOLEAN,
  purchase_date TIMESTAMP,
  car_model VARCHAR(255),
  car_price DECIMAL(10, 2),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (salesperson_id) REFERENCES sales(id)
);

CREATE TABLE feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  purchase_id INT,
  qr_code LONGTEXT,
  star_rating INT,
  additional_feedback TEXT,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id)
);
