CREATE DATABASE char_sheet;

CREATE TABLE characters (
  char_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  race VARCHAR(50) NOT NULL,
  char_class VARCHAR(50) NOT NULL,
  level INT NOT NULL,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE attributes (
  char_id INT NOT NULL,
  strength INT,
  dexterity INT,
  constitution INT,
  intelligence INT,
  wisdom INT,
  charisma INT,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE skills (
  char_id INT PRIMARY KEY,
  acrobatics INT,
  animal_handling INT,
  arcana INT,
  athletics INT,
  deception INT,
  history INT,
  insight INT,
  intimidation INT,
  investigation INT,
  medicine INT,
  nature INT,
  perception INT,
  performance INT,
  persuasion INT,
  religion INT,
  sleight_of_hand INT,
  stealth INT,
  survival INT,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE personality (
  char_id INT PRIMARY KEY,
  alignment VARCHAR(50),
  personality_traits VARCHAR(255),
  ideals VARCHAR(255),
  bonds VARCHAR(255),
  flaws VARCHAR(255),
  quote VARCHAR(128),
  features_and_traits TEXT[],
  languages TEXT[],
  other_proficiencies TEXT[],
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE bag (
  char_id INT PRIMARY KEY,
  cp INT,
  sp INT,
  ep INT,
  gp INT,
  pp INT,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(50),
  type VARCHAR(50),
  description TEXT,
  weight decimal(10,2),
  attributes TEXT[],
  bonuses TEXT[],
  char_id INT,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE combat (
  char_id INT PRIMARY KEY,
  max_hp INT,
  current_ho INT,
  temp_hp INT,
  armor_class INT,
  initiative INT,
  speed INT,
  hit_dice VARCHAR(20),
  total_hit_dice INT,
  death_save_success INT,
  death_save_failure INT,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE attack (
  char_id INT PRIMARY KEY,
  weapon_name VARCHAR(50),
  attack_bonus INT,
  damage VARCHAR(50),
  damage_type VARCHAR(50),
  range VARCHAR(50),
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);

CREATE TABLE saving_throws (
  char_id INT PRIMARY KEY,
  strenght INT,
  dexterity INT,
  constitution INT,
  intelligence INT,
  wisdom INT,
  charisma INT,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
);