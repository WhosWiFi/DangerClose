var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');
const database = new Database(':memory:');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware setup
app.use(session({
  secret: 'Password123!', // Replace with a strong secret
  resave: false,
  saveUninitialized: true
}));

// Database setup
database.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);

// Insert data into the users table.
const insert = database.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
insert.run('admin', 'WiFi{sQL_m4sT3r}');
insert.run('wifi', 'Password123!');
insert.run('giorno', 'Welcome1!');


const userPoints = {points: 0};
var flagChecks = {"xss_flag": false, "fuzzing_flag": false, "sqlite3_flag": false};

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
  // Set a custom cookie named "user-secret" with the value "secret"
  res.cookie('session', 'WiFi{X5S_s3Ssi0n_l34k}'); //no httponly flag to prevent JavaScript from accessing the cookie.

  fs.readFile('socialmedia.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/get_users', function (req, res) { 
  const rows = database.prepare('SELECT * FROM users').all();
  res.json(rows);
});

app.get('/get-points', function (req, res) {
  res.json(userPoints);
  return res.end();
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

  if (flag == 'WiFi{y0U_kN0w_fuZZ1Ng!}' && flagChecks.fuzzing_flag == false) {
    flagChecks.fuzzing_flag = true;
    userPoints.points += 10;
    return res.redirect('/get-points');
  } 
  if (flag == 'WiFi{X5S_s3Ssi0n_l34k}' && flagChecks.xss_flag == false) {
    flagChecks.xss_flag = true;
    userPoints.points += 10;
    return res.redirect('/get-points');
  }
  if (flag == 'WiFi{sQL_m4sT3r}') {
    flagChecks.sqlite3_flag = true;
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  else {
      res.writeHead(403, {'Content-Type': 'application/json'})
      res.write("Flag is incorrect or has been used before.");
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