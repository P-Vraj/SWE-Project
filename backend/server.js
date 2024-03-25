const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const app = express();
const port = 3001; // You can change this to any port you prefer

const User = require('./User');
const Project = require('./Project');

// Create a connection
const db = mysql.createConnection(config);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get data from a table
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM your_table_name', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error retrieving data' });
      return;
    }
    res.json(results);
  });
});

// Route to add new data to the table
app.post('/api/data', (req, res) => {
  const newData = req.body;
  db.query('INSERT INTO your_table_name SET ?', newData, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    res.json({ message: 'Data inserted successfully', newData });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function test() {
  var u1 = new User("Vraj", "ADMIN");
  var u2 = new User("Shikha", "MANAGER");
  var u3 = new User("Allen", "EMPLOYEE");
  try {
    await u1.addUser();
    await u2.addUser();
    await u3.addUser();
    var p1 = new Project("A", "D1");
    await p1.addProject();
    await p1.assignMember(u2);
  } catch (err) {
    console.error(err);
  }
  // User.deleteUser(user.user_id);
}

test();