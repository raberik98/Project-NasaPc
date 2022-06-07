const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

// insert/add/create a new product
router.post('/api/admin/add-product', adminController.addProduct);

// modify a product
router.put('/api/admin/modify-product/:productId', adminController.modifyProduct);

// delete a product
router.delete('/api/admin/delete-product/:productId', adminController.deleteProduct);

module.exports = router;
