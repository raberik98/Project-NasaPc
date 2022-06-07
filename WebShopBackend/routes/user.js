const express = require('express');
const router = express.Router();

// import user controller
const userController = require('../controllers/user');

// request password change
router.post('/api/request-password-change', userController.requestPasswordChange)

// change password
router.post('/api/change-password', userController.changePassword)

// get wishlist
router.get('/api/wishlist', userController.getWishList)

// add to wishlist
router.post('/api/add-to-wishlist/:productId', userController.addToWishList)

//  remove from wishlist
 router.post('/api/remove-from-wishlist/:productId', userController.removeFromWishList)

module.exports = router;
