const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 5000;
const path = require('path')

const wordList = require('./models/cards')

const defaultGameState = {
  cards: [],
  gameName: null,
  blueTurn: false,
  redCards: 0,
  blueCards: 0,
  winner: null,
  blueTeamFirst: false,
}
//Body Parsing Middleware allows reading of JSON from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes to /api
const apiRoutes = express.Router();
app.use('/api', apiRoutes);



//This will fire for ALL Requests.
app.use((req, res, next) => { //<-- IDC about the mthod or the URI.
  console.log(new Date(), req.method, req.url)
  next();
})

//This will fire for ALL Requests.
app.get('*', (req, res, next) => {
  //Next is a function that represents a reference to the NEXT peice of middleware
  console.log(req.method, req.url);
  next();
})

// app.use('/') //dont care about method, but do care about URI
app.use(express.static(path.join(__dirname, 'public'))); //<-- express.static is a function that returns a function

//This request will serve up our Homepage.
app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

//Get all words from dictionary, and serve as response
app.get('/wordList', (req, res, next) => {
  console.log('Card List Dictionary')
  res.send(wordList)
})

//Get specific word from dictionary, and serve as response
app.get('/wordList/:id', (req, res, next) => {
  console.log('Card List Word')
  const id = Number(req.params.id)
  if( id<0 || id>wordList.length-1 ){
    res.status(404).send('This card is not in our deck!')
  }
  res.send(wordList[id])
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
