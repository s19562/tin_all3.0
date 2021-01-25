const express = require('express');
const router = express.Router();

const klienciControler = require('../controllers/klienciController');

router.get('/', klienciControler.showKlienciList);
router.get('/add', klienciControler.showAddKlientForm);
router.get('/edit/:klientId', klienciControler.showEditKlientForm);
router.get('/details/:klientId', klienciControler.showKlientDetails);

router.post('/add', klienciControler.addKlient); 
router.post('/edit', klienciControler.updateKlient);
router.get('/delete/:klientId', klienciControler.deleteKlient);


module.exports = router;

