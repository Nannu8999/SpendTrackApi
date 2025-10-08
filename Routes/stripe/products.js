const express = require('express');
const routes = express.Router();
const { getPlans } = require('../../controllers/stripe/products');

routes.get('/getPlans', getPlans);

module.exports = routes;