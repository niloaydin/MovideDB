const connection = require("../db");

const addMovie = async (req, res) => {
  res.send("this adds movies for directors");
};
const addPredecessor = async (req, res) => {
  res.send("this adds movie predecessor");
};

module.exports = { addMovie, addPredecessor };
