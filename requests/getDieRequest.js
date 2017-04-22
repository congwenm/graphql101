var http = require('http')
var util = require('util')

console.log('---------START----------------------')
var request = http.request({
  hostname: 'localhost',
  port: "4000",
  path: '/graphql', // need the '/'
  method: 'POST',
  headers: {
    // "accept": "application/json", // not needed
    "content-type": "application/json",
  }
}, function callHandler(incomingMessage) {
  console.log('making call 111')
  incomingMessage.on('data', chunk => {
    console.log('succeeded 111, RESULT:')
    console.log(
      util.inspect(
        chunk.toString(),
        { depth: null, colors: true, showHidden: false }
      )
    )
  })
  incomingMessage.on('end', () => {
    console.log('done 111')
    console.log('--------END------------------')
  })
})

// doens't do anything if doesn't encounter error
request.on('error', error => {
  console.log('error 111')
})

// actually making the call, sending the body
request.write(JSON.stringify({
  operationName: null,
  query: `
{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}
  `,
  variables: null,
}))

request.end()
