const friends = require ('../data/friends');

module.exports = function (app) {
  app.get ('/api/friends', function (req, res) {
    res.json (friends);
  });

  app.post ('/api/friends', function () {
    console.log ('Going to post');
  });
};
