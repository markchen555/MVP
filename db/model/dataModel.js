const db = require('../db');
const Sequelize = require('sequelize');

const MVP = db.define('mvp', {
  username: {
    type: Sequelize.STRING
  },
  message: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})

MVP.sync();

// MVP.sync({force: true})
// .then(()=> seed())

module.exports = MVP;