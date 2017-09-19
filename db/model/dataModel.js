const db = require('../db');
const Sequelize = require('sequelize');

const MVP = db.define('mvp', {
  videoTitle: {
    type: Sequelize.STRING
  },
  videoId: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})

MVP.sync();

// MVP.sync({force: true})
// .then(()=> seed())

module.exports = MVP;