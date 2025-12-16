const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { requireLogin } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: null // Default session cookie
    }
  })
);

// Serve static files
const staticDirectory = path.join(__dirname, 'public');
app.use(express.static(staticDirectory));

// Routes
app.use('/', authRoutes);
app.use('/api/products', productRoutes);

// Protected dashboard route
app.get("/dashboard.html", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}/`);
});
