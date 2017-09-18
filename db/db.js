const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL);

db.authenticate()
.then(() => {
  console.log('Successfully Connected to Database');
})
.catch(err => {
  console.log('Error Occurs When Connecting to Database: ', err)
})

module.exports = db;