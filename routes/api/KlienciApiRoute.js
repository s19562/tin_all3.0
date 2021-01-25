const express = require('express');
const router = express.Router();

const kliApiController = require('../../api/KlienciAPI');

router.get('/', kliApiController.getKlienci);
router.get('/:klientId', kliApiController.getKlientById);
router.post('/', kliApiController.createKlient);
router.put('/:klientId', kliApiController.updateKlient);
router.delete('/:klientId', kliApiController.deleteKlient);

module.exports = router;