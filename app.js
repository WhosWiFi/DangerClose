var express = require('express');
var app = express();
app.get('/', function (req, res) {
  data = {Danger:"Close", Hacker:"Here"};
  res.send(data['Danger']);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});