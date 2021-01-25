const express = require('express');
const router = express.Router();

const wyrApiController = require('../../api/WyrobyAPI');

router.get('/', wyrApiController.getWyroby);
router.get('/:wyrobId', wyrApiController.getWyrobById);
router.post('/', wyrApiController.createWyrob);
router.put('/:wyrobId', wyrApiController.updateWyrob);
router.delete('/:wyrobId', wyrApiController.deleteWyrob);

module.exports = router;