'use strict';

let express = require('express');
let router = express.Router();
let controller = require('../controllers/productsController');
let cartController = require('../controllers/cartController');

router.get('/', controller.getData, controller.show);
router.get('/:id', controller.getData, controller.showDetail);
router.post('/cart', cartController.add);


module.exports = router;