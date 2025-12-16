// Authentication routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

// Register POST route
router.post("/register", async (req, res) => {
  const { first, last, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).send("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4)`,
      [first, last, email, hashed]
    );

    res.redirect("/login.html");
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// Login POST route
router.post("/login", async (req, res) => {
  const { email, password, remember } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).send("Email not found");
    }

    const user = result.rows[0];

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).send("Incorrect password");
    }

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

    res.redirect("/index.html");
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/index.html");
});

// Get current session user
router.get("/session-user", (req, res) => {
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

module.exports = router;

