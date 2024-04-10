CREATE DATABASE char_sheet;

CREATE TABLE characters (
  char_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  race VARCHAR(50) NOT NULL,
  char_class VARCHAR(50) NOT NULL,
  level INT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 