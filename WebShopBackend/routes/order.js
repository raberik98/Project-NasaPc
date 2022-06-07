const express = require('express');
const router = express.Router();

// import order controller
const orderController = require('../controllers/order.js');

// place a new order
router.post('/api/place-order', orderController.placeOrder);

// get order of a specific user
router.get('/api/getUserOrders/:userId', orderController.getUserOrders)

module.exports = router;
