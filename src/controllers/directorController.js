const connection = require("../db");

const addMovie = async (req, res) => {
  const { username, movieId, movieName, theatreId, timeSlot, duration, date } =
    req.body;
  let sessionIdBase = date + "_";
  try {
    const [genreRows, genreFields] = await connection.query(
      "SELECT * FROM Movie_Genres WHERE movie_id=?",
      [movieId]
    );
    if (!genreRows.length)
      throw new Error(
        "Movie does not have any genres, please assign a genre first"
      );
    const sqlParamsForTransaction = [movieId, movieName, duration, username];
    const firstQuery =
      "INSERT INTO Movies (movie_id,movie_name,duration,director_username) SELECT ?,?,?,? WHERE NOT EXISTS (SELECT movie_id FROM Movies WHERE movie_id=?)";
    await connection.beginTransaction();
    await connection.query(firstQuery, [...sqlParamsForTransaction, movieId]);
    for (let i = 0; i < duration; i++) {
      await connection.query(
        "INSERT INTO Movie_Sessions (session_id,session_date,time_slot,theatre_id,movie_id) VALUES(?,?,?,?,?)",
        [sessionIdBase + (timeSlot + i), date, timeSlot + i, theatreId, movieId]
      );
    }
    await connection.commit();
    res.send("Movie Created");
  } catch (err) {
    console.log(err.message);
    const errorMessage =
      "Movie session time either overlaps with another or invalid theatre is given";
    connection.rollback();
    res.status(500).send(err.message);
  }
};
const addPredecessor = async (req, res) => {
  res.send("this adds movie predecessor");
};

module.exports = { addMovie, addPredecessor };
