const mongoose = require('mongoose');
const Equipment = require('../models/Equipment');

const equipmentForm = (req, res, next) => {
  res.render('equipment/create');
};

const createEquipment = (req, res, next) => {
  const { name, condition, dailyRate, fineRate, description } = req.body;
  const owner = req.provider.id;
  const equipment = new Equipment({
    _id: new mongoose.Types.ObjectId(),
    name,
    condition,
    dailyRate,
    fineRate,
    description,
    owner
  });
  return equipment
    .save()
    .then(() => res.redirect('/equipment'))
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
};

const readEquipment = (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  return Equipment.findById(equipmentId)
    .then((equipment) => res.render('equipment/detail', { equipment }))
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
};

const readAllEquipments = (req, res, next) => {
  return Equipment.find()
    .then((equipment) => res.render('equipment/list', { equipment }))
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
};

const updateEquipment = (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  return Equipment.findById(equipmentId)
    .then((equipment) => {
      if (equipment) {
        equipment.set(req.body);
        return equipment
          .save()
          .then((equipment) => res.status(201).json({ equipment }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteEquipment = (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  return Equipment.findByIdAndDelete(equipmentId)
    .then((equipment) => (equipment ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

module.exports = {
  equipmentForm,
  createEquipment,
  readEquipment,
  readAllEquipments,
  updateEquipment,
  deleteEquipment
};
