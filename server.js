const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { requireLogin } = require('./middleware/auth');

const app = express();
const basePort = Number(process.env.PORT) || 3001;
const host = process.env.HOST || '127.0.0.1';

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


function startServer(port) {
  const server = app.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}/`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use on ${host}. Trying ${nextPort}...`);
      startServer(nextPort);
      return;
    }
    console.error('Server failed to start:', err);
    process.exit(1);
  });
}

startServer(basePort);
