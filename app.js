var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
const svgCaptcha = require('svg-captcha');
var cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');
const database = new Database(':memory:');

const secret_nonce_key = 'secret-nonce-key';
const advanced_flag = 'WiFi{X5S_CSP_W1Z4Rd}';

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


// Store the current CAPTCHA code and SVG data
let currentCaptcha = null;
let captchaSvg = null;

// Middleware to generate CAPTCHA
function generateCaptcha(req, res, next) {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0oIl',
    color: true,
    background: '#eee'
  });

  currentCaptcha = captcha.text;
  captchaSvg = captcha.data; // Save CAPTCHA SVG data
  res.cookie('captcha', currentCaptcha); // Store CAPTCHA value in a cookie

  // Fetch all book titles for the dropdown
  const stmt = database.prepare('SELECT bookname FROM books');
  const books = stmt.all();

  // Send the HTML with the book dropdown and CAPTCHA
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Book Lookup</title>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to SocialMedia</h1>
      </div>
      <div class="search-bar">
        <h1>Book Lookup</h1>
        <form action="/sql_query_intermediate" method="post">
          <label for="bookname">Select Book:</label>
          <select name="bookname" id="bookname">
            ${books.map(book => `<option value="${book.bookname}">${book.bookname}</option>`).join('')}
          </select>
          <br>
          <label for="captcha">Enter CAPTCHA:</label>
          <img src="/captcha" alt="CAPTCHA">
          <input type="text" id="captcha" name="captcha" required>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="result" id="resultBox">
        <h2>Search Results:</h2>
        <p id="resultText"></p>
      </div>
    </body>
    </html>
  `);
}

// Route to serve CAPTCHA image
app.get('/captcha', (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(captchaSvg);
});

// Middleware to verify CAPTCHA
function verifyCaptcha(req, res, next) {
  const userCaptcha = req.body.captcha;
  const correctCaptcha = req.cookies.captcha;

  if (userCaptcha === correctCaptcha) {
    next(); // CAPTCHA is correct, proceed to the next middleware
  } else {
    res.status(400).send('Incorrect CAPTCHA. Please try again.');
  }
}

// Database setup
database.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  );

  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookname TEXT,
    description TEXT
  );
`);

// Insert data into the users table.
const insertUser = database.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
insertUser.run('admin', 'WiFi{sQL_m4sT3r}');
insertUser.run('wifi', 'Password123!');
insertUser.run('giorno', 'Welcome1!');

// Insert data into the books table.
const insertBook = database.prepare('INSERT INTO books (bookname, description) VALUES (?, ?)');
insertBook.run('Harry Potter', 'You are a wizard Harry!');
insertBook.run('Dune', 'The start of science fiction.');
insertBook.run('The Giver', 'A world living without color.');


const userPoints = {points: 0};
var flagChecks = {"xss_starter_check": false, "xss_intermediate_check": false, "xss_advanced_check": false, "fuzzing_check": false, "sqlite3_check": false};
var flags = {"xss_starter_flag": "WiFi{X5S_s3Ssi0n_l34k}", "xss_intermediate_flag": "WiFi{X5S_Bl4CK_L13T}", "xss_advanced_flag": "WiFi{X5S_CSP_W1Z4Rd}", "fuzzing_flag": false, "sqlite3_flag": false}

app.get('/', function (req, res) {
  fs.readFile('html/home.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/flag', function (req, res) {
  fs.readFile('html/flag.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/challenges', function (req, res) {
  fs.readFile('html/challenges.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.post('/xssCheck', (req, res) => {
  const { query } = req.body;

  if (query) {
      res.json({ success: true, query: query });
  } else {
      res.json({ success: false, message: "Query cannot be empty." });
  }
});

// Handle xss starter flag retrieval
app.post('/xss-starter-12456-sTwsC', (req, res) => {
  const { success } = req.body;

  if (success === true) {
      // Provide the flag if the success condition is true
      res.send(flags.xss_starter_flag);
  } else {
      // Send 403 Unauthorized if the request is anything else
      res.status(403).send('Unauthorized');
  }
});


// Handle xss starter flag retrieval
app.post('/xss-intermediate-8432876653-dIwsPetgF', (req, res) => {
  const { success } = req.body;

  if (success === true) {
      // Provide the flag if the success condition is true
      res.send(flags.xss_intermediate_flag);
  } else {
      // Send 403 Unauthorized if the request is anything else
      res.status(403).send('Unauthorized');
  }
});

// Handle xss starter flag retrieval
app.post('/xss-advanced-2398460-wPqzzLSieXj', (req, res) => {
  const { success } = req.body;

  if (success === true) {
      // Provide the flag if the success condition is true
      res.send(flags.xss_advanced_flag);
  } else {
      // Send 403 Unauthorized if the request is anything else
      res.status(403).send('Unauthorized');
  }
});

app.get('/xss_starter_lab_description', function (req, res) {
  fs.readFile('html/xss_starter_lab_description.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/xss_intermediate_lab_description', function (req, res) {
  fs.readFile('html/xss_intermediate_lab_description.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/xss_advanced_lab_description', function (req, res) {
  fs.readFile('html/xss_advanced_lab_description.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/socialmedia_starter', function (req, res) {
  res.cookie('session', 'cookie_obtained'); //no httponly flag to prevent JavaScript from accessing the cookie.

  fs.readFile('html/socialmedia_starter.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/socialmedia_intermediate', function (req, res) {
  res.cookie('session', 'cookie_obtained'); //no httponly flag to prevent JavaScript from accessing the cookie.
  fs.readFile('html/socialmedia_intermediate.html', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/socialmedia_advanced', (req, res) =>{
  res.cookie('session', 'cookie_obtained'); //no httponly flag to prevent JavaScript from accessing the cookie.
  res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${secret_nonce_key}'`);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CSP Bypass Lab</title>
    </head>
    <body>
      <h1>Content-Security Policy Bypass Lab</h1>
      <p>Try to execute a script to demonstrate CSP bypass.</p>
      <form id="xss-form" action="/cspCheck" method="post">
        <input type="text" name="payload" placeholder="Enter XSS payload">
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});

function sanitizeInput(input) {
  const sanitized = input.replace(/[<>:?';:!@#$%^&*()\-_+=\[\]{}\\|]/g, '');
  return sanitized;
}

app.post('/cspCheck', (req, res) => {
  const payload = req.body.payload;
  
  // Check if payload contains the nonce
  if (!payload.includes('nonce="secret-nonce-key"')) {
    // If nonce is not included, sanitize the input by stripping unwanted characters
    const sanitizedPayload = sanitizeInput(payload);
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSP Bypass Result</title>
      </head>
      <body>
        <h1>XSS Payload Result</h1>
        <p>Your payload was sanitized and the following result was processed:</p>
        <pre>${sanitizedPayload}</pre>
      </body>
      </html>
    `);
  }
  else {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSP Bypass Result</title>
      </head>
      <body>
        <h1>CSP Payload Result</h1>
        <p>You submitted the following payload:</p>
        <pre>${payload}</pre>
        <script nonce="${secret_nonce_key}">
          ${payload}
        </script>
        <h1>${advanced_flag}</h1>
      </body>
      </html>
    `);
  }
});


app.get('/book_lookup', function (req, res) {
  // Fetch all book titles for the dropdown
  const books = database.prepare('SELECT bookname FROM books').all();

  // Send the HTML with the book dropdown
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Book Lookup</title>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to SocialMedia</h1>
      </div>
      <div class="search-bar">
        <h1>Book Lookup</h1>
        <form action="/sql_query" method="post">
          <select name="sqlQuery">
            ${books.map(book => `<option value="${book.bookname}">${book.bookname}</option>`).join('')}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="result" id="resultBox">
        <h2>Search Results:</h2>
        <p id="resultText"></p>
      </div>
    </body>
    </html>
  `);
});

app.post('/sql_query', function (req, res) {
  const { sqlQuery } = req.body; // Get the book title selected from the dropdown

  // Vulnerable SQL query with single quotes around the userInput
  const query = `SELECT bookname, description FROM books WHERE bookname = '${sqlQuery}'`;
  console.log(query);

  try {
    const rows = database.prepare(query).all(); // Execute the SQL query
    if (rows.length > 0) {
      // Return book details in HTML response
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Book Search Result</title>
        </head>
        <body>
          <h1>Search Results</h1>
          <ul>
            ${rows.map(row => `<li>${row.bookname}: ${row.description}</li>`).join('')}
          </ul>
        </body>
        </html>
      `);
    } else {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>No Results Found</title>
        </head>
        <body>
          <h1>No results found for "${sqlQuery}"</h1>
        </body>
        </html>
      `);
    }
  } catch (err) {
    res.status(500).send('SQL query error: ' + err.message); // Handle SQL errors
  }
});



app.get('/book_lookup_intermediate', generateCaptcha);


app.post('/sql_query_intermediate', verifyCaptcha, function (req, res) {
  const { bookname } = req.body; // Get the book title selected from the dropdown

  // Vulnerable SQL query with single quotes around the userInput
  const query = `SELECT bookname, description FROM books WHERE bookname = '${bookname}'`;
  console.log(query);

  try {
    const rows = database.prepare(query).all(); // Execute the SQL query
    if (rows.length > 0) {
      // Return book details in HTML response
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Book Search Result</title>
        </head>
        <body>
          <h1>Search Results</h1>
          <ul>
            ${rows.map(row => `<li>${row.bookname}: ${row.description}</li>`).join('')}
          </ul>
        </body>
        </html>
      `);
    } else {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>No Results Found</title>
        </head>
        <body>
          <h1>No results found for "${bookname}"</h1>
        </body>
        </html>
      `);
    }
  } catch (err) {
    res.status(500).send('SQL query error: ' + err.message); // Handle SQL errors
  }
});

app.get('/get-points', function (req, res) {
  res.json(userPoints);
  return res.end();
});


app.get('/hacker', function (req, res) {
  data = {Danger:"Close", Hacker:"You are a hacker"};
  return res.send(data['Hacker']);
});

app.get('/admin', function (req, res) {
  if (req.session.isAdmin) {
    // User has admin access
    fs.readFile('html/admin.html', function (err, data) {
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
  fs.readFile('misc/secret.txt', function (err, data) {
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

  if (flag == 'WiFi{y0U_kN0w_fuZZ1Ng!}' && !(flagChecks.fuzzing_check)) {
    flagChecks.fuzzing_check = true;
    userPoints.points += 10;
    return res.redirect('/get-points');
  } 
  if (flag == 'WiFi{X5S_s3Ssi0n_l34k}' && !(flagChecks.xss_starter_check)) {
    flagChecks.xss_starter_check = true;
    userPoints.points += 10;
    return res.redirect('/get-points');
  }
  if (flag == 'WiFi{X5S_Bl4CK_L13T}' && !(flagChecks.xss_intermediate_check)) {
    flagChecks.xss_intermediate_check = true;
    userPoints.points += 30;
    return res.redirect('/get-points');
  }
  if (flag == 'WiFi{X5S_CSP_W1Z4Rd}' && !(flagChecks.xss_advanced_check)) {
    flagChecks.xss_advanced_check = true;
    userPoints.points += 50;
    return res.redirect('/get-points');
  }
  if (flag == 'WiFi{sQL_m4sT3r}') {
    flagChecks.sqlite3_check = true;
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
  fs.readFile('misc/robots.txt', function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    return res.end();
  });
});

app.listen(3000, function () {
  console.log('DangerClose listening on port 3000!');
});