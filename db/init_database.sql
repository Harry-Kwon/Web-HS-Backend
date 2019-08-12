CREATE TABLE card (
  id INTEGER UNIQUE NOT NULL PRIMARY KEY,
  collectible INTEGER,
  slug VARCHAR(50) NOT NULL,
  classId INTEGER,
  cardTypeId INTEGER,
  cardSetId INTEGER,
  rarityId INTEGER,
  artistName VARCHAR(50),
  manaCost INTEGER,
  name VARCHAR(50) NOT NULL,
  text TEXT,
  image VARCHAR(2000) NOT NULL,
  flavorText TEXT,
  lowername VARCHAR(50)
);
