const express = require('express');
const controller = require('../controllers/Equipment');

const router = express.Router();

router.get('/', controller.readAllEquipments);
router.get('/create', controller.equipmentForm);
router.post('/create', controller.createEquipment);
router.get('/:equipmentId', controller.readEquipment);
router.patch('/update/:equipmentId', controller.updateEquipment);
router.delete('/delete/:equipmentId', controller.deleteEquipment);

module.exports = router;
