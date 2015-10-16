'use strict';

let request = require('request-promise');
let it;

let getData = url => request(url).then(response => it.next(response));

function* main() {
  let ids = JSON.parse(
    yield getData('http://mini-geek-service.appspot.com/hotgames?alt=json'))
      .result.map(item => item.id);

  let boardgame = JSON.parse(
    yield getData(`http://mini-geek-service.appspot.com/gameinfo?id=${ids[0]}&alt=json`))
      .result[0];

  console.log(`Most popular game is: ${boardgame.name} \nDescription: \n ${boardgame.description}`);
}

it = main();
it.next();
