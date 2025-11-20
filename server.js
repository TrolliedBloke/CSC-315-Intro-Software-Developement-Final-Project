const { networkInterfaces } = require('os');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = 3001;

// parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// serve static files
const StaticDirectory = path.join(__dirname, 'public');
app.use(express.static(StaticDirectory));


// -----------------------------
// REGISTER POST ROUTE
// -----------------------------
app.post("/register", async (req, res) => {
  const { first, last, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4)`,
      [first, last, email, hashed]
    );

    res.redirect("/login.html");
  } catch (err) {
    console.error(err);
    res.send("Registration failed");
  }
});



// -----------------------------
// LOGIN POST ROUTE
// -----------------------------
app.post("/login", async (req, res) => {
  const { email, password, remember } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.send("Email not found");
    }

    const user = result.rows[0];

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.send("Incorrect password");

    // Session data
    req.session.user = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    };

    // If "Remember me" checked, 7 days session cookie
    if (remember) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    } else {
      req.session.cookie.maxAge = null; // session cookie (expires on browser close)
    }

    // Redirect to home page instead of dashboard
    res.redirect("/index.html");
  } catch (err) {
    console.error(err);
    res.send("Login failed");
  }
});



app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, first_name, last_name, email FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.get("/session-user", (req, res) => {
  if (!req.session.user) {
    return res.json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    email: req.session.user.email,
    first: req.session.user.first_name,
    last: req.session.user.last_name
  });
});

// MIDDLEWARE

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login.html");
  }
  next();
}

app.get("/dashboard.html", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});




// -----------------------------
// LOGOUT
// -----------------------------
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/index.html");
});


app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}/`);
});
