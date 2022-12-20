const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { Column } = require('pg-promise');


//database stuff skipped for now cuz we dont have a database yet


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
    })
  );
  
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );



app.get('/', (req, res) =>{
    res.render('pages/main', 
     {
      movies: ""
     }
    );
});

app.post('/', (req, res) => {
  var data = req.body; //whatever the user entered in the text field
  axios({
    url: 'https://www.omdbapi.com/',
    method: 'GET',
    headers: {
      'Accept-Encoding': 'application/json',
    },
    params: {
      "t": data.search,
      "apikey": "c759ba58"
    }
  })
  .then(results => {
    console.log(results.data);
    res.render('pages/main', {
      movies: results.data
    });
  })
  .catch(err => {
    console.error(err);
    res.render('pages/main', {
      movies: ""
    });
  });
});

    /*axios({
     url: `https://www.omdbapi.com/?t=batman&plot=full&apikey=c759ba58`,
        method: 'GET',
        dataType:'json',
        /*params: {
            "apikey": c759ba58,
            "t": "batman",
            "plot": "full",
        }
     })
    .then((result) => {

        console.log(result.data);

    }).catch((err) => {

        console.log(err);

    })*/



app.listen(3000);
console.log('Server is listening on port 3000');

