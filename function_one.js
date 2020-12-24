const { 
  users,
  availability_slots
} = require('./no_sql_schema.json');

// Function to get a list of players who haven't played any games since a given date
// from parameter should be a timestamp (New Date().getTime())
module.exports = from => {
  // Get all games who took place after the date
  const gamesOfInterest = availability_slots
    .filter(slot => slot.game && slot.start_time > from)
    .map(slot => slot.game);

  // Get all players who didn't participate at those games
  const players = users
    .filter(user => {
      if (!user.game_signups) {
        return true;
      }
      return !user.game_signups.some(game => gamesOfInterest.includes(game.game));
    })
    .map(user => user._id);

  return players;
};
