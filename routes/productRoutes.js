const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductDetails);
router.post('/add-to-cart', productController.addToCart);
router.post('/increse-cart', productController.increseCart);

module.exports = router;
