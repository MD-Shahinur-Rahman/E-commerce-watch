const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/remove', cartController.removeFromCart2);
router.post('/checkout', cartController.checkout); // Fixed route
router.post('/complete-checkout', cartController.completeCheckout);

module.exports = router;