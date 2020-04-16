const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path')

//Codenames English word set.
const english = ['alpha', 'beta', 'charlie', 'tango', 'romeo']

//Body Parsing Middleware allows reading of JSON from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.get('/english', (req, res, next) => {
  console.log('English Dictionary')
  res.send(english)
})

//Get specific word from dictionary, and serve as response
app.get('/english/:id', (req, res, next) => {
  console.log('English Word')
  const id = Number(req.params.id)
  res.send(english[id])
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
