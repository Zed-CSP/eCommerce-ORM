const express = require('express'); // import express
const routes = require('./routes'); // import routes
const sequelize = require('./config/connection'); // import sequelize connection

const app = express(); // initialize express app
const PORT = process.env.PORT || 3001; // set port to 3001

app.use(express.json()); // allows us to parse JSON data
app.use(express.urlencoded({ extended: true })); // allows us to parse URL encoded data

app.use(routes); // turn on routes

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { // force: false prevents the database from dropping on server start
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
