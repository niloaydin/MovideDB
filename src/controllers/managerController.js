const connection = require("../db");

const addAudience = async (req, res) => {
  try {
    const { username, passwrd, fName, lName } = req.body;
    const selectQuery = "Select username FROM Audience WHERE username = ?";
    const [selectResult] = await connection.query(selectQuery, [username]);
    if (selectResult[0]) {
      throw new Error("Cannot add already existed audience");
    }
    const insertQuery =
      "INSERT INTO Audience (username, pswrd, firstName, lastName) VALUES (?, ?, ?, ?)";
    const result = await connection.query(insertQuery, [
      username,
      passwrd,
      fName,
      lName,
    ]);

    console.log("New audience added");
    res.send("New audience added");
  } catch (err) {
    console.error("Error adding audience:", err);
    res.status(500).send(err.message);
  }
};

const addDirector = async (req, res) => {
  try {
    const { username, password, firstName, lastName, nation, platformId } =
      req.body;
    const selectPlatformQuery =
      "SELECT * FROM Rating_Platforms WHERE platform_id = ?";
    const [platformResult] = await connection.query(selectPlatformQuery, [
      platformId,
    ]);
    const platform_id = platformResult[0].platform_id;

    if (!platform_id) {
      throw new Error("Invalid platform_id");
    }
    if (!nation) {
      throw new Error("Directors should have a nationality");
    }

    const selectDirectorQuery =
      "SELECT username FROM Directors WHERE username = ?";
    const [checkIfDirectorExists] = await connection.query(
      selectDirectorQuery,
      [username]
    );
    const existedDirectorUsername = checkIfDirectorExists[0].username;

    if (existedDirectorUsername) {
      throw new Error("Cannot add already existed director");
    }

    const insertQuery =
      "INSERT INTO Directors (username, pswrd, firstName, lastName, nation, platform_id) VALUES (?, ?, ?, ?, ?, ?)";
    const result = await connection.query(insertQuery, [
      username,
      password,
      firstName,
      lastName,
      nation,
      platformId,
    ]);
    console.log("New director added");
    res.send("New director added");
  } catch (err) {
    console.error("Error adding director:", err);
    res.status(500).send(err.message);
  }
};
const deleteAudience = async (req, res) => {
  try {
    const { username } = req.params;

    const deleteQuery = "DELETE FROM Audience WHERE username = ?";
    const [result] = await connection.query(deleteQuery, [username]);

    console.log("AAA ", result);

    if (result.affectedRows === 0) {
      throw new Error("Audience not found");
    }

    console.log("Audience deleted");
    res.send("Audience deleted");
  } catch (err) {
    console.error("Error deleting audience:", err);
    res.status(500).send(err.message);
  }
};
const updatePlatformOfDirector = async (req, res) => {
  try {
    const { username } = req.params;
    const { platformId } = req.body;

    const platformCheckQuery = `SELECT * FROM Rating_Platforms WHERE platform_id = ?`;
    const [platformCheckResult] = await connection.query(platformCheckQuery, [
      platformId,
    ]);

    if (platformCheckResult.length === 0) {
      throw new Error("Platform not found");
    }

    const updateQuery =
      "UPDATE Directors SET platform_id = ? WHERE username = ?";
    const [result] = await connection.query(updateQuery, [
      platformId,
      username,
    ]);

    console.log("CC ", result);

    if (result.affectedRows === 0) {
      throw new Error("Director not found");
    }

    console.log(`Platform ID updated for director ${username}`);
    res.send(`Platform ID updated for director ${username}`);
  } catch (err) {
    console.error("Error updating platform ID:", err);
    res.status(500).send(err.message);
  }
};

const showDirectors = async (req, res) => {
  try {
    const getDirectorsQuery =
      "SELECT username, firstName, lastName, nation, platform_id FROM Directors";

    const [getDirectorsResult] = await connection.query(getDirectorsQuery);

    res.send(getDirectorsResult);
  } catch (err) {
    console.error("Error adding director:", err);
    res.status(500).send(err.message);
  }
};
const showRatingsOfAudience = async (req, res) => {
  res.send("this shows audience ratings");
};
const showDirectorMovies = async (req, res) => {
  res.send("this shows director movies");
};
const showAverageRating = async (req, res) => {
  res.send("this shows avg rating of a movie");
};

module.exports = {
  addAudience,
  addDirector,
  deleteAudience,
  updatePlatformOfDirector,
  showAverageRating,
  showDirectorMovies,
  showDirectors,
  showRatingsOfAudience,
};
