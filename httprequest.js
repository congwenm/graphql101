var http = require('http')

var req = http.request({
  hostname: 'localhost',
  port: 4000,
  body: {
    query: `query RollDice($dice: Int!, $sides: Int) {
      rollDice(numDice: $dice, numSides: $sides)
    }`,
    variables: { dice: 3, sides: 6 },
  },
  path: 'graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}, res => {
  console.log(res)
})
req.on('error', error => console.log('failed', error))


// equivalent to plain javascript

// var dice = 3;
// var sides = 6;
// var xhr = new XMLHttpRequest();
// xhr.responseType = 'json';
// xhr.open("POST", "/graphql");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.setRequestHeader("Accept", "application/json");
// xhr.onload = function () {
//   console.log('data returned:', xhr.response);
// }
// var query = `query RollDice($dice: Int!, $sides: Int) {
//   rollDice(numDice: $dice, numSides: $sides)
// }`;
// xhr.send(JSON.stringify({
//   query: query,
//   variables: { dice: dice, sides: sides },
// }));
