// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const moment = require('moment/moment');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
  console.log(req.params.date);
  let dateString = req.params.date;
  let date =  new Date(dateString);
  if ( typeof dateString === 'undefined')
  {
    date = new Date();
  }

  let format = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
  
  if (!Number.isNaN(date.valueOf())) {
    res.json({
      unix: parseInt((date.valueOf())),
      utc: moment(date).format(format)
    });
    return;
  }

  let unixTimeStamp = Number.parseInt(dateString);
  if (!Number.isNaN(unixTimeStamp)) {
    let unixDate = new Date(unixTimeStamp);
    res.json({
      unix: unixTimeStamp,
      utc: moment(unixDate).format(format)
    });
    return;
  }
  
  res.json({error: 'Invalid Date'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
