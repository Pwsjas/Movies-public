const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const { Pool } = require('pg');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = new Pool({
    user: `${process.env.DB_USERNAME}`,
    host: `${process.env.DB_HOST}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    port: process.env.DB_PORT,
  });
  
  app.get('/api/data', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM users');
    res.send(rows);
  });

  app.post('/api/users_movies', (req, res) => {
    const { username, movie } = req.body;
  
    // Get the user ID from the users table
    pool.query('SELECT id FROM users WHERE username = $1', [username], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving user ID');
      }
  
      if (result.rows.length === 0) {
        return res.status(404).send('User not found');
      }
  
      const userId = result.rows[0].id;
  
      // Insert the movie ID into the users_movies table
      pool.query('INSERT INTO users_movies (user_id, movie_id) VALUES ($1, $2)', [userId, movie], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error inserting movie');
        }
  
        res.status(201).send('Movie inserted successfully');
      });
    });
  });

  //Get all movies in a user's list
  app.get('/api/users/:username/movies', (req, res) => {
    const username = req.params.username;
  
    // Get the user ID from the users table
    pool.query('SELECT id FROM users WHERE username = $1', [username], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving user ID');
      }
  
      if (result.rows.length === 0) {
        return res.status(404).send('User not found');
      }
  
      const userId = result.rows[0].id;
      console.log('userID', userId);
  
      // Get all movie IDs liked by the user from the users_movies table
      pool.query('SELECT movie_id FROM users_movies WHERE user_id = $1;', [userId], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error retrieving movies');
        }
        const movieIds = result.rows.map(row => row.movie_id);
        console.log('result', movieIds);
        res.send(JSON.stringify(movieIds));
      });
    });
  });

  //Check if a movie is within a user's list
  app.post('/api/users/movies/read', async (req, res) => {
    const { username, movie } = req.body;

    // Get the user ID from the users table
    pool.query('SELECT id FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error retrieving user ID');
        }
    
        if (result.rows.length === 0) {
          return res.status(404).send('User not found');
        }
    
        const userId = result.rows[0].id;
        console.log('userID', userId);

        pool.query('SELECT user_id FROM users_movies WHERE user_id = $1 AND movie_id = $2;', [userId, movie], (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error retrieving data');
            }
            const result = results.rows.map(row => row.user_id);
            console.log('output', result);

            if (result[0]) {
                console.log('entry found');
                res.send(true);
            } else {
                console.log('entry not found');
                res.status(400).send('movie not found');
            }
          });
      })
  });

  //DELETE a movie from a user's list
  app.post('/api/users/movies/delete', async (req, res) => {
    const { username, movie } = req.body;

    // Get the user ID from the users table
    pool.query('SELECT id FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error retrieving user ID');
        }
    
        if (result.rows.length === 0) {
          return res.status(404).send('User not found');
        }
    
        const userId = result.rows[0].id;
        console.log('userID', userId);

        pool.query('DELETE FROM users_movies WHERE user_id = $1 and movie_id = $2;', [userId, movie], (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error retrieving data');
            }
            console.log(results);
            res.send(true);

            // if (result[0]) {
            //     console.log('deleted');
            //     res.send(true);
            // } else {
            //     console.log('entry not found');
            //     res.status(400).send('movie not found');
            // }
          });
      })
  });

  app.post('/api/users', async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, password]);
      console.log('success');
      res.json({ id: result.rows[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  app.post('/api/movies', async (req, res) => {
    const { movie } = req.body;
    try {
      const result = await pool.query(`INSERT INTO movies (id) VALUES ($1) RETURNING id;`, [movie]);
      console.log('success');
      res.json({ id: result.rows[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
      if (rows.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login', error);
      res.status(500).send('An error occurred during login');
    }
  });
  
  app.listen(5000, () => {
    console.log('Server listening on port 5000');
});