const app = require("../app");
const connection = app.connection;

const listMovies = async (req, res) => {
  res.send("this lists movies for an audience");
};
const buyTicket = async (req, res) => {
  res.send("this buys ticket");
};
const viewTickets = async (req, res) => {
  res.send("this views ticket");
};

module.exports = { listMovies, buyTicket, viewTickets };
