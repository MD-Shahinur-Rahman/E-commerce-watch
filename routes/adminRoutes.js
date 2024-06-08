const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../utils/fileUpload');

router.get('/', adminController.getAdmin);
router.post('/add-product', upload.single('photo'), adminController.addProduct);
router.post('/update-product', upload.single('photo'), adminController.updateProduct);
router.post('/delete-product', adminController.deleteProduct);

module.exports = router;