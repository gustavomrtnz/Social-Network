// Import necessary modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Create an instance of Express and host it on port 3001
const PORT = process.env.PORT||3001;
const app = express();

// add middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// add routes
app.use(routes);
// Connect to the database
db.once('connected', () => {
    console.log('Database connected');
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
