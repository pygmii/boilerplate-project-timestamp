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
  let unixTimeStamp = Number.parseInt(req.params.date);
  let format = 'ddd, D MMM YYYY HH:mm:ss [GMT]'
  if (!Number.isNaN(unixTimeStamp)) {
    let date = new Date(unixTimeStamp);
    res.json({
      unix: unixTimeStamp,
      utc: moment(date).format(format)
    });

    return;
  }

  let date = new Date(req.params.date);
  if(!Date.isNaN(date))
  {
    res.json({
      unix: Math.floor(date.getTime() / 1000),
      utc: moment(date).format(format)
    });
    return ;
  }

  res.json({error: 'Invalid Date'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
