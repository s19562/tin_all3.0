const express = require('express');
const router = express.Router();

const zamApiController = require('../../api/ZamAPI');

router.get('/', zamApiController.getZamowienia);
router.get('/:zamowienieId', zamApiController.getZamowienieById);
router.post('/', zamApiController.createZamowienie);
router.put('/:zamowienieId', zamApiController.updateZamowienie);
router.delete('/:zamowienieId', zamApiController.deleteZamowienie);
router.delete('/:zamowienieIds', zamApiController.deleteManyZamowienia);

module.exports = router;