const controller = require('../controller/dataController');
const express = require('express');
const route = require('express').Router();

route.get('/MVP', controller.getData);
route.post('/MVP', controller.addData);
route.delete('/MVP/:dataId', controller.deleteData);

module.exports = route;