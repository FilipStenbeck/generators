var request = require('request');

request('http://mini-geek-service.appspot.com/hotgames?alt=json', function (error, response, body) {
  var ids = JSON.parse(body).result.map(function (item) {
    return item.id;
  });

  request('http://mini-geek-service.appspot.com/gameinfo?id=' + ids[0] + '&alt=json', function (error, response, body) {
    var boardgame = JSON.parse(body).result[0];
    console.log('Most popular game is: ' + boardgame.name);
    console.log('Description: \n ' + boardgame.description);
  });
});
