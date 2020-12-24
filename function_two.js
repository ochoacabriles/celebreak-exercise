const { game_reviews } = require('./no_sql_schema.json');

// Utility function to group array by key (similar to MongoDB Aggregation Framework $group)
// Taken from https://stackoverflow.com/a/34890276/11172116
groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

module.exports = (average, nGames) => {
  // Group array by key to avoid iterating over all users collection
  const reviewsByUser = groupBy(game_reviews, 'user');

  // Iterate accross every key in the grouped object (i.e. over each user who has already reviewed
  // at least one game)
  const usersOfInterest = Object.keys(reviewsByUser).filter(user => {
    /*
      Select last n reviews for the user.
      For simplicity, we're assuming that data is already sorted by date (ascendant),
      which is normal if it's sorted by _id in MongoDB as it contains a timestamp
    */
    const userReviews = reviewsByUser[user];
    
    // Select n last reviews for the user, keeping all of them if he/she has less reviews than nGames
    const lastNReviews = userReviews.slice(Math.max(userReviews.length - nGames, 0));
    const averageForLastNReviews = lastNReviews.reduce((acc, val) => acc + val.rate, 0) / lastNReviews.length;

    return averageForLastNReviews < average;
  });

  return usersOfInterest;
};
