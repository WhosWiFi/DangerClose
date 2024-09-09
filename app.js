var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware setup
app.use(session({
  secret: 'Password123!', // Replace with a strong secret
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  fs.readFile('home.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/flag', function (req, res) {
  fs.readFile('flag.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/challenges', function (req, res) {
  fs.readFile('challenges.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/socialmedia', function (req, res) {
  fs.readFile('socialmedia.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});


app.get('/hacker', function (req, res) {
  data = {Danger:"Close", Hacker:"You are a hacker"};
  return res.send(data['Hacker']);
});

app.get('/hint', function (req, res) {
  return res.send("Discovering hidden endpoints can potentially lead to other vulnerabilities. (Consider using tools such as ffuf or gobuster)");
});

app.get('/admin', function (req, res) {
  if (req.session.isAdmin) {
    // User has admin access
    fs.readFile('admin.html', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  } else {
      // User does not have admin access
      res.status(403).send('<h1>Access Denied</h1>');
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
      if (err) {
          return res.status(500).send('Error when attempting to log out.');
      }
      res.redirect('/');
  });
});

app.get('/common', function (req, res) {
  res.send();
});

app.get('/common/config.php', function (req, res) {
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

app.get('/images/flagbackground.jpeg', function (req, res) {
  fs.readFile('images/flagbackground.jpeg', function (err, data) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.write(data);
    return res.end();
  });
});

app.post('/validate_flag', function (req, res) {
  const { flag } = req.body;

  if (flag == 'WiFi{y0U_kN0w_fuZZ1Ng!}') {
      req.session.isAdmin = true;
      return res.redirect('/admin');
  } else {
      res.writeHead(403, {'Content-Type': 'application/json'})
      res.write("Flag is incorrect.")
      return res.end(); // Send 418 I'm a teapot if it doesn't match
  }
});

app.get('/robots.txt', function (req, res) {
  fs.readFile('robots.txt', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    return res.end();
  });
});

app.listen(3000, function () {
  console.log('DangerClose listening on port 3000!');
});