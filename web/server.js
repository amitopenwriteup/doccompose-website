const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'db', // The service name defined in docker-compose.yml
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase',
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Dynamic Website</h1><p>Node.js + MySQL</p>');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving users');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

