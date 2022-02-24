
const path = require('path');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/temp', function(req, res) {
  fs.readFile('/sys/bus/w1/devices/28-00000546fd4b/temperature',(err, content) => {
    var c = "{\"temp\":\"" + parseInt(content.toString()) + "\"}";
    res.send(JSON.parse(c));
  });
});

app.listen(port, () => console.log("running"));
