const friends = require ('../data/friends');

module.exports = function (app) {
  app.get ('/api/friends', function (req, res) {
    res.json (friends);
  });

  app.post ('/api/friends', function (request, response) {
    // create a new friend to push to the friends array
    const newFriend = {
      name: request.body.name,
      photo: request.body.photo,
      scores: [],
    };

    // parse and store scores for the new friend
    request.body.scores.forEach (element => {
      newFriend.scores.push (parseInt (element));
    });

    // find  new BFF
    const totalDifferences = [];
    friends.forEach (friend => {
      let totalDifference = 0;
      for (let index = 0; index < friend.scores.length; index++) {
        totalDifference += Math.abs (
          friend.scores[index] - newFriend.scores[index]
        );
      }
      totalDifferences.push (totalDifference);
    });
    const smallestDifference = Math.min(...totalDifferences);
    const indexOfNewBFF = totalDifferences.indexOf(smallestDifference);
    const newBFF = friends[indexOfNewBFF];

    // respond with the friend with the least difference
    response.json (newBFF);

    // put the new friend in the friends array
    friends.push (newFriend);
  });
};
