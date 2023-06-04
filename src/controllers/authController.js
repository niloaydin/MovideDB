const connection = require("../db");

/** @type {import("express").RequestHandler} */
const login = async (req, res) => {
  try {
    const role = req.body.role;
    let queryString;
    const username = req.body.username;
    switch (role) {
      case "admin":
        queryString = "SELECT pswrd FROM Database_Managers WHERE username=?";
        break;
      case "director":
        queryString = "SELECT pswrd FROM Directors WHERE username=?";
        break;
      case "audience":
        queryString = "SELECT pswrd FROM Audience WHERE username=?";
        break;
    }
    let [rows, fields] = await connection.query(queryString, [username]);

    if (!rows.length) throw new Error("No such User");

    const password = rows[0].pswrd;
    if (password === req.body.password) {
      res.send("Success");
    } else {
      throw new Error("Failed Login");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  login,
};
