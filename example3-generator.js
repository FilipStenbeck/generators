var request = require('request');
var it;

function getData(url) {
  request(url, (error, response, body) => it.next(body));
}

function* main() {
  var result1 = yield getData('http://mini-geek-service.appspot.com/hotgames?alt=json');
  var ids = JSON.parse(result1).result.map((item) => item.id);

  var result2 = yield getData(`http://mini-geek-service.appspot.com/gameinfo?id=${ids[0]}&alt=json`);
  var boardgame = JSON.parse(result2).result[0];
  console.log(`Most popular game is: ${boardgame.name}`);
  console.log(`Description: \n ${boardgame.description}`);
}

it = main();
it.next(); // get it all started
