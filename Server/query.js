const db = require("./database.js");

class queries {
  registration(name, email, password, result) {
    const query = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
    const params = [name, email, password];
    db.run(query, params, function (err) {
      if (err) {
        return result(false);
      }
      return result(true);
    });
  }
  login(email, password, result) {
    const query = "select * from user where email = ? AND password = ?";
    const params = [email, password];
    db.get(query, params, (err, user) => {
      console.log(err);
      if (!user) {
        return result(false);
      }
      return result(true, user);
    });
  }
}

module.exports = queries;
