require('dotenv').config();
const express = require('express');
const parse = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const db = require('../db/db')

const route = require('./router/dataRouter');

const PORT = 3004;

const app = express()
.use(parse.json())
.use(parse.urlencoded({extended: true}))
.use(morgan('dev'))
.use('/api', route)
.use(express.static(path.resolve(__dirname, "../client/static")))
.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
})