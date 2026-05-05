const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikes.controller');

router.get('/add', bikeController.addBikePage);
router.get('/edit/:id', bikeController.editBikePage);
router.get('/delete/:id', bikeController.deleteBike);

router.post('/add', bikeController.addBike);
router.post('/edit/:id', bikeController.editBike);

module.exports = router;
