const connection = require("../db");

const login = async (req, res) => {
  let result = await connection.query(
    "SELECT pswrd FROM Database_Managers WHERE username='manager1'"
  );
  console.log(result[0]);
  res.send(result[0]);
};

module.exports = {
  login,
};
