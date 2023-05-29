const connection = require("../db");

const listMovies = async (req, res) => {
  try {
    //Get Movie Info
    const [movieRows, movieFields] = await connection.query(
      "SELECT Movies.movie_id,Movies.movie_name,lastName,platform_name,theatre_id,Movie_Sessions.time_slot FROM Movies INNER JOIN Movie_Sessions ON Movies.movie_id=Movie_Sessions.movie_id INNER JOIN Session_Reservations ON Movie_Sessions.time_slot=Session_Reservations.time_slot AND Movie_Sessions.session_id=Session_Reservations.session_id INNER JOIN Directors ON Movies.director_username=Directors.username INNER JOIN Rating_Platforms ON Directors.platform_id=Rating_Platforms.platform_id"
    );
    //

    //Get Predecessors of the Movies
    const [predRows, predFields] = await connection.query(
      "SELECT * FROM Successor_Of"
    );
    //

    //Build a predecessor hash map and inject that data into Movie Info retrieved in the first query, then construct a single response
    const predecessorMap = {};
    predRows.forEach((match) => {
      const { successor_id: successor, predecessor_id: predecessor } = match;
      if (predecessorMap[successor] === undefined) {
        predecessorMap[successor] = [];
        predecessorMap[successor].push(predecessor);
      } else {
        predecessorMap[successor].push(predecessor);
      }
    });

    //Injection Below
    movieRows.forEach((movie) => {
      movie.predecessors = "";
      if (predecessorMap[movie["movie_id"]])
        movie.predecessors = predecessorMap[movie["movie_id"]].join(",");
    });
    //

    //Send the combined response
    res.send(movieRows);
  } catch (err) {
    res.status(500).send("Something bad happened, please try again later.");
  }
};
const buyTicket = async (req, res) => {
  const sessionId = req.body.sessionId;
  const username = req.body.username;
  try {
    //CHECK IF PREDECESSORS HAVE BEEN WATCHED
    const [predRows, predFields] = await connection.query(
      "SELECT predecessor_id FROM Successor_Of INNER JOIN Movies ON Successor_Of.successor_id=Movies.movie_id INNER JOIN Movie_Sessions ON Successor_Of.successor_id=Movie_Sessions.movie_id WHERE session_id=?",
      [sessionId]
    );

    //Enter here if there are any predecessors of the movie that is to be bought
    if (predRows.length) {
      // Get which movies audience have watched
      const [watchedRows, watchedFields] = await connection.query(
        "SELECT movie_id FROM Audience_Tickets INNER JOIN Movie_Sessions ON Audience_Tickets.session_id=Movie_Sessions.session_id WHERE username=?",
        [username]
      );
      //Throw if audience hasnt seen any movies since its %100 to miss the predecessor movie(s)
      if (!watchedRows.length)
        throw new Error("Please watch all the predecessor movies first");

      //Check if the audience have watched all the predecessors required
      const watchedMap = {};
      watchedRows.forEach((movie) => {
        let movieId = movie["movie_id"];
        if (!watchedMap[movieId]) watchedMap[movieId] = true;
      });
      const predIds = predRows.map((row) => row.predecessor_id);
      //Throw if any pred is missing
      predIds.forEach((id) => {
        if (!watchedMap[id])
          throw new Error("Please watch all the predecessor movies first");
      });
    }
    //

    //CHECK IF THEATRE IS FULL
    const [countRow, countField] = await connection.query(
      "SELECT theatre_id,COUNT(*) AS boughtBy FROM Audience_Tickets INNER JOIN Movie_Sessions ON Audience_Tickets.session_id=Movie_Sessions.session_id INNER JOIN Session_Reservations ON Movie_Sessions.time_slot=Session_Reservations.time_slot AND Movie_Sessions.session_id=Session_Reservations.session_id WHERE Audience_Tickets.session_id=? GROUP BY theatre_id",
      [sessionId]
    );

    //Enter here if Session ticket is bought by more than 0 audience
    if (countRow[0]?.boughtBy) {
      const [capacityRow, capacityField] = await connection.query(
        "SELECT theatre_capacity FROM Theatres WHERE theatre_id=?",
        [countRow[0]["theatre_id"]]
      );
      //Compare capacity with the current number of bought tickets for the session
      if (!(countRow[0].boughtBy < capacityRow[0]["theatre_capacity"]))
        throw new Error("Theatre capacity is full");
    }
    //

    const [insertRow, insertField] = await connection.query(
      "INSERT INTO Audience_Tickets SELECT ?,? WHERE (SELECT platform_id FROM Movie_Sessions INNER JOIN Movies ON Movie_Sessions.movie_id=Movies.movie_id INNER JOIN Directors ON Movies.director_username=Directors.username WHERE Movie_Sessions.session_id=?) IN (SELECT platform_id FROM Audience_Subscribed WHERE Audience_Subscribed.username=?)",
      [username, sessionId, sessionId, username]
    );

    if (insertRow.affectedRows) {
      res.send("Ticket Bought");
    } else {
      throw new Error(
        "You probably need to subscribe to the relevant movie platform"
      );
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const viewTickets = async (req, res) => {
  const sessionId = req.body.sessionId;
  const username = req.body.username;
  try {
    const [prevMovRows, prevMovFields] = await connection.query(
      "SELECT Movies.movie_id, Movies.movie_name, Audience_Tickets.session_id, rating, overall_rating FROM Audience_Tickets INNER JOIN Movie_Sessions ON Audience_Tickets.session_id=Movie_Sessions.session_id INNER JOIN Movies ON Movies.movie_id=Movie_Sessions.movie_id LEFT JOIN Ratings ON Movies.movie_id=Ratings.movie_id WHERE Audience_Tickets.username=?",
      [username]
    );

    const [currentMovRow, currentMovField] = await connection.query(
      "SELECT Movies.movie_id, Movies.movie_name, session_id, rating, overall_rating FROM Movie_Sessions INNER JOIN Movies ON Movies.movie_id=Movie_Sessions.movie_id LEFT JOIN Ratings ON Movies.movie_id=Ratings.movie_id WHERE session_id=?",
      [sessionId]
    );
    if (!currentMovRow.length)
      throw new Error("No movie found with that session Id, please check");
    const respBody = {
      currentMovie: currentMovRow[0],
      previouslyWatched: prevMovRows,
    };
    res.send(respBody);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { listMovies, buyTicket, viewTickets };
