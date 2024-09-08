var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  fs.readFile('main.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/hacker', function (req, res) {
  data = {Danger:"Close", Hacker:"You are a hacker"};
  res.send(data['Hacker']);
});

app.get('/admin', function (req, res) {
  data = {Danger:"Close", Hacker:"Here"};
  is_admin = False;
  res.send(is_admin);
});

app.get('/hacker/secret.txt', function (req, res) {
  fs.readFile('secret.txt', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    return res.end();
  });
});

app.get('/images/background.jpeg', function (req, res) {
  fs.readFile('images/background.jpeg', function (err, data) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.write(data);
    return res.end();
  });
});

app.get('/robots.txt', function (req, res) {
  fs.readFile('robots.txt', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    return res.end();
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});