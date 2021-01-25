const express = require('express');
const router = express.Router();

const wyrobControler = require('../controllers/wyrobyController');

router.get('/', wyrobControler.showWyrobList);

router.get('/add', wyrobControler.showAddWyrobForm);

router.get('/edit/:wyrobId', wyrobControler.showEditWyrobForm);

router.get('/details/:wyrobId', wyrobControler.showWyrobDetails);

module.exports = router;

router.post('/add', wyrobControler.addWyrob); 
router.post('/edit', wyrobControler.updateWyrob);
router.get('/delete/:wyrobId', wyrobControler.deleteWyrob);
