const express = require('express');
const router = express.Router();

// import order controller
const mobileController = require('../controllers/mobile.js');

// place a new order
router.post('/api/mobile/place-order/:session', mobileController.placeOrder);

router.post('/api/mobile/test', (req,res) => {
    console.log(req.body.items[0].product);
    res.sendStatus(200);
});

// get order of a specific user
router.get('/api/mobile/getUserOrders/:userId/:session', mobileController.getUserOrders)

module.exports = router;
