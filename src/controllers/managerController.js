const app = require("../app");
const connection = app.connection;

const addUser = async (req, res) => {
  res.send("this adds new user as manager");
};
const deleteAudience = async (req, res) => {
  res.send("this deletes audience");
};
const updatePlatformOfDirector = async (req, res) => {
  res.send("this updates platform id");
};
const showDirectors = async (req, res) => {
  res.send("this shows directors");
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
  addUser,
  deleteAudience,
  updatePlatformOfDirector,
  showAverageRating,
  showDirectorMovies,
  showDirectors,
  showRatingsOfAudience,
};
