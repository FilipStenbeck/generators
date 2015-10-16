'use strict';

let request = require('request');
let it;

let getData = url => request(url, (error, response, body) => it.next(body));

function* main() {
  try {
    let result1 = yield getData('http://mini-geek-service.appspot.com/hotgames?alt=json');
    let ids = JSON.parse(result1).result.map(item => item.id);

    let result2 = yield getData(`http://mini-geek-service.appspot.com/gameinfo?id=${ids[0]}&alt=json`);
    let boardgame = JSON.parse(result2).result[0];
    console.log(`Most popular game is: ${boardgame.name} \nDescription: \n ${boardgame.description}`);
  } catch (error) {
    console.log('Oops I did it again...', error);
  }
}

it = main();
it.next();
