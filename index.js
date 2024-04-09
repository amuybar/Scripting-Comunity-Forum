const express = require('express');
const session = require('express-session');
const flash = require('connect-flash'); 
const bodyParser = require('body-parser');
const path = require('path');
const mustache = require('mustache-express'); 
const passport = require('./config/passport-config');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(flash());
app.use(session({
  secret: 'barrackis@Mars#kenya',
  resave: false,
  saveUninitialized: true,
 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// View engine setup
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views')); 

// Database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      fullName TEXT,
      email TEXT UNIQUE
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS forums (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT,
      userId INTEGER,
      likes INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      language TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS answers (
      id INTEGER PRIMARY KEY,
      answer TEXT,
      userId INTEGER,
      forumId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (forumId) REFERENCES forums(id)
    )`);
    db.run(` CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
  )`);
  }
});


// Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const questionRoute = require('./routes/forum');
const blogRoute= require('./routes/pages/blog');
const userRoute = require('./routes/pages/users');
const teamRoute = require('./routes/pages/teams');
const tagRoute = require('./routes/pages/tags');
const saveRoute = require('./routes/pages/saves');
const companieRoute = require('./routes/pages/companies');


app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/api', questionRoute);
app.use('/', blogRoute);
app.use('/', userRoute);
app.use('/', teamRoute);
app.use('/', tagRoute);
app.use('/', saveRoute);
app.use('/', companieRoute);


// serve the static files
app.use(express.static('public'));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
