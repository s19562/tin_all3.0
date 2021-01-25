const express = require('express');
const router = express.Router();

const zamController = require('../controllers/zamController');

router.get('/', zamController.showZamowieniaList);

router.get('/add', zamController.showAddZamowienieForm);

router.get('/edit/:zamowienieId', zamController.showEditZamowienieForm);

router.get('/details/:zamowienieId', zamController.showZamowienieDetails);

module.exports = router;

router.post('/add', zamController.addZamowienie); 
router.post('/edit', zamController.updateZamowienie);
router.get('/delete/:zamowienieId', zamController.deleteZamowienie);



