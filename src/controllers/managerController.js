const connection = require("../db");

const addUser = async (req, res) => {
  res.send("done");
};
const deleteAudience = async (req, res) => {
  res.send("done");
};
const updatePlatformOfDirector = async (req, res) => {
  res.send("done");
};
const showDirectors = async (req, res) => {
  res.send("done");
};
const showRatingsOfAudience = async (req, res) => {
  res.send("done");
};
/** @type {import("express").RequestHandler} */
const showDirectorMovies = async (req, res) => {
  try {
    const director = req.query.username;
    let [rows, fields] = await connection.query(
      "SELECT Movies.movie_id,movie_name,Theatres.theatre_id,theatre_district,time_slot FROM Movie_Sessions INNER JOIN Movies ON Movie_Sessions.movie_id=Movies.movie_id INNER JOIN Theatres ON Movie_Sessions.theatre_id=Theatres.theatre_id WHERE Movies.director_username=?",
      [director]
    );
    if (!rows.length) throw new Error("No movies found");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const showAverageRating = async (req, res) => {
  try {
    const movieId = req.query.movieId;
    let [rows, fields] = await connection.query(
      "SELECT overall_rating from Movies WHERE movie_id=?",
      [movieId]
    );
    console.log(rows);
    let overallRating = rows[0]?.["overall_rating"];
    console.log(overallRating);
    if (overallRating === null || overallRating === undefined)
      throw new Error(
        "There is no movie with that ID or move has not been rated yet"
      );
    res.send(overallRating);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addUser,
  deleteAudience,
  updatePlatformOfDirector,
  showAverageRating,
  showDirectorMovies,
  showDirectors,
  showRatingsOfAudience,
};
