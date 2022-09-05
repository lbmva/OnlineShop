const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    createUserDB();
  }
});

function createUserDB() {
  db.run(
    `CREATE TABLE user (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name text, 
              email text UNIQUE, 
              password text, 
              CONSTRAINT email_unique UNIQUE (email)
              )`,
    (err) => {
      if (err) {
        console.log("user db already created");
      }
    }
  );
}

module.exports = db;
