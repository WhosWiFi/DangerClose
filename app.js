var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
const svgCaptcha = require('svg-captcha');
var cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');
const database = new Database(':memory:');
const intermediate_database = new Database(':memory:');
const advanced_database = new Database(':memory:');

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
let currentCaptcha = '';

// Starter Database setup
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

// Intermediate Database setup
intermediate_database.exec(`
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
const insert_intermediate_User = intermediate_database.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
insert_intermediate_User.run('admin', 'WiFi{C4PTCH4_TH3_FL4G}');
insert_intermediate_User.run('wifi', 'Password123!');
insert_intermediate_User.run('giorno', 'Welcome1!');

// Insert data into the books table.
const insert_intermediate_Book = intermediate_database.prepare('INSERT INTO books (bookname, description) VALUES (?, ?)');
insert_intermediate_Book.run('Harry Potter', 'You are a wizard Harry!');
insert_intermediate_Book.run('Dune', 'The start of science fiction.');
insert_intermediate_Book.run('The Giver', 'A world living without color.');


// Advanced Database setup
advanced_database.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    email TEXT
  );

  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookname TEXT,
    description TEXT,
    rating TEXT
  );
`);

// Insert data into the users table.
const insert_advanced_User = advanced_database.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
insert_advanced_User.run('admin', 'WiFi{C4PTCH4_TH3_FL4G}', 'admin@dangerclose.com');
insert_advanced_User.run('wifi', 'Password123!', 'wifi@dangerclose.com');
insert_advanced_User.run('giorno', 'Welcome1!', 'giorno@dangerclose.com');

// Insert data into the books table.
const insert_advanced_Book = advanced_database.prepare('INSERT INTO books (bookname, description, rating) VALUES (?, ?, ?)');
insert_advanced_Book.run('Harry Potter', 'You are a wizard Harry!', '10/10');
insert_advanced_Book.run('Dune', 'The start of science fiction.', '8/10');
insert_advanced_Book.run('The Giver', 'A world living without color.', '7/10');


const userPoints = {points: 0};
var flagChecks = {"xss_starter_check": false, "xss_intermediate_check": false, "xss_advanced_check": false, "fuzzing_check": false, "sqlite3_starter_check": false, "sqlite3_intermediate_check": false, "sqlite3_advanced_check": false};
var flags = {"xss_starter_flag": "WiFi{X5S_s3Ssi0n_l34k}", "xss_intermediate_flag": "WiFi{X5S_Bl4CK_L13T}", "xss_advanced_flag": "WiFi{X5S_CSP_W1Z4Rd}", "fuzzing_flag": "WiFi{y0U_kN0w_fuZZ1Ng!}", "sqlite3_starter_flag": "WiFi{sQL_m4sT3r}", 
  "sqlite3_intermediate_flag": "WiFi{C4PTCH4_TH3_FL4G}", "sqlite3_advanced_flag": "WiFi{UNKNOWN}"}

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



// Serve HTML form with CAPTCHA
app.get('/book_lookup_intermediate', (req, res) => {
  // Fetch all book titles for the dropdown
  const books = intermediate_database.prepare('SELECT bookname FROM books').all();

  // Generate CAPTCHA
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0oIl',
    color: true,
    background: '#eee'
  });

  currentCaptcha = captcha.text; // Save CAPTCHA text
  const captchaSvg = captcha.data; // Save CAPTCHA SVG data

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
          <select name="bookname">
            ${books.map(book => `<option value="${book.bookname}">${book.bookname}</option>`).join('')}
          </select>
          <br>
          <img src="data:image/svg+xml;base64,${Buffer.from(captchaSvg).toString('base64')}" alt="CAPTCHA">
          <br>
          <input type="text" name="captcha" placeholder="Enter CAPTCHA" required>
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


app.post('/sql_query_intermediate', function (req, res) {
  const { captcha, bookname } = req.body; // Get the book title selected from the dropdown

  // Vulnerable SQL query with single quotes around the userInput
  const query = `SELECT bookname, description FROM books WHERE bookname = '${bookname}'`;
  // Validate CAPTCHA
  if (captcha !== currentCaptcha) {
    return res.send('CAPTCHA is incorrect. Please try again.');
  }

  try {
    const rows = intermediate_database.prepare(query).all(); // Execute the SQL query
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

  // Generate a new CAPTCHA after processing the query
  const newCaptcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0oIl',
    color: true,
    background: '#eee'
  });

  currentCaptcha = newCaptcha.text; // Update CAPTCHA text
});


// Helper function to encode the input (Base64 → URL-encode)
function encodeInput(input) {
  try {
    // Base64 encode
    const base64bed = Buffer.from(input).toString('base64');
    
    // URL encode
    const urlEncoded = encodeURIComponent(base64bed);
    return urlEncoded;
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
}

// Helper function to decode the input (URL-decode → Base64 decode)
function decodeInput(encodedInput) {
  try {
    // URL decode
    const urlDecoded = decodeURIComponent(encodedInput);
    
    // Base64 decode
    const base64Decoded = Buffer.from(urlDecoded, 'base64').toString('utf8');
    return base64Decoded;
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
}

// Endpoint to handle SQL queries with encoded input
app.post('/sql_query_advanced', (req, res) => {
  const { userInput } = req.body;

  const decodedInput = decodeInput(userInput);
  if (!decodedInput) {
    return res.status(400).send('Invalid input format. Please make sure your input is properly encoded.');
  }

  const query = `SELECT bookname, description FROM books WHERE bookname = '${decodedInput}'`;
  console.log('SQL Query:', query);

  try {
    const rows = advanced_database.prepare(query).all();
    let responseHtml;

    if (rows.length > 0) {
      const encodedBooknames = rows.map(row => {
        // URL encode the bookname first
        const urlEncoded = encodeURIComponent(row.bookname);
        
        // Then Base64 encode the URL encoded string
        const base64payload = Buffer.from(urlEncoded).toString('base64');
        
        return `<li>${row.bookname}: ${row.description} (Encoded: ${base64payload})</li>`;
      }).join('');

      responseHtml = `
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
            ${encodedBooknames}
          </ul>
        </body>
        </html>
      `;
    } else {
      responseHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>No Results Found</title>
        </head>
        <body>
          <h1>No results found for "${decodedInput}"</h1>
        </body>
        </html>
      `;
    }
    
    res.send(responseHtml);
  } catch (err) {
    res.status(500).send('SQL query error: ' + err.message);
  }
});

// Serve the form to input a plain book name
app.get('/book_lookup_advanced', (req, res) => {
  const books = advanced_database.prepare('SELECT bookname FROM books').all();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Advanced SQL Lab</title>
    </head>
    <body>
      <h1>Advanced SQL Injection Lab</h1>
      <p>Select a book and submit to see the encoded results:</p>
      <form action="/sql_query_advanced" method="post">
        <label for="userInput">Book Name:</label>
        <select name="userInput" id="userInput" required>
          ${books.map(book => `<option value="${encodeInput(book.bookname)}">${book.bookname}</option>`).join('')}
        </select>
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});



app.get('/get-points', function (req, res) {
  res.json(userPoints);
  return res.end();
});


app.get('/hacker', function (req, res) {
  data = {Danger:"Close", Hacker:"You are a hacker"};
  return res.send(data['Hacker']);
});

app.get('/broken_access_starter', (req, res) => {
  const nasaNewsHtml = `
    <h3>NASA News:</h3>
    <ul>
      <li><strong>Mission to Mars:</strong> NASA is planning a new mission to Mars in the next decade. Exciting times ahead!</li>
      <li><strong>SpaceX Collaboration:</strong> NASA collaborates with SpaceX for upcoming space launches. Innovations in space travel!</li>
      <li><strong>James Webb Telescope:</strong> The James Webb Telescope is sending back incredible images of distant galaxies.</li>
    </ul>
  `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Broken Access Lab</title>
    </head>
    <body>
      <h1>NASA News</h1>
      ${nasaNewsHtml}
      <h2>Admin Access</h2>
      <form action="/admin_starter" method="post">
        <input type="hidden" name="role" value="customer" />
        <button type="submit">Go to Admin Page</button>
      </form>
    </body>
    </html>
  `;

  res.send(html);
});

// Endpoint to handle access to the admin page
app.post('/admin_starter', (req, res) => {
  const { role } = req.body;
  if (role === 'admin') {
    // User has admin access
    fs.readFile('html/admin.html', (err, data) => {
      if (err) {
        res.status(500).send('Error loading admin page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  } else {
    // User does not have admin access
    res.status(403).send("<h1>User is not 'admin'</h1>");
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
  if (flag == 'WiFi{sQL_m4sT3r}' && !(flagChecks.sqlite3_starter_check)) {
    flagChecks.sqlite3_starter_check = true;
    userPoints.points += 10;
    return res.redirect('/get-points');
  }
  if (flag == 'WiFi{C4PTCH4_TH3_FL4G}' && !(flagChecks.sqlite3_intermediate_check)) {
    flagChecks.sqlite3_intermediate_check = true;
    userPoints.points += 30;
    return res.redirect('/get-points');
  }
  if (flag == 'WiFi{UNKNOWN}' && !(flagChecks.sqlite3_advanced_check)) {
    flagChecks.sqlite3_advanced_check = true;
    userPoints.points += 50;
    return res.redirect('/get-points');
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
  console.log('DangerClose is hosted at http://localhost:3000');
});