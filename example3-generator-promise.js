var request = require('request-promise');
var it;

var getData = (url) => request(url).then((response) => it.next(response));

function* main() {
  var ids = JSON.parse(
    yield getData('http://mini-geek-service.appspot.com/hotgames?alt=json'))
      .result.map((item) => item.id);

  var boardgame = JSON.parse(
    yield getData(`http://mini-geek-service.appspot.com/gameinfo?id=${ids[0]}&alt=json`))
      .result[0];

  console.log(`Most popular game is: ${boardgame.name}`);
  console.log(`Description: \n ${boardgame.description}`);
}

it = main();
it.next(); // get it all started
