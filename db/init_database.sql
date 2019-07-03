CREATE TABLE card (
  id INTEGER UNIQUE NOT NULL PRIMARY KEY,
  collectible INTEGER NOT NULL,
  slug VARCHAR(50) NOT NULL,
  classId INTEGER NOT NULL,
  cardTypeId INTEGER NOT NULL,
  cardSetId INTEGER NOT NULL,
  rarityId INTEGER NOT NULL,
  artistName VARCHAR(50),
  manaCost INTEGER,
  name VARCHAR(50),
  text TEXT,
  image VARCHAR(2000),
  flavorText TEXT
);
