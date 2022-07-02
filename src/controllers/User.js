const User = require('../models/User');

const readUser = (req, res, next) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

const readAllUsers = (req, res, next) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => res.status(500).json({ err }));
};

const updateUser = (req, res, next) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  return User.findByIdAndDelete(userId)
    .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

module.exports = { readUser, readAllUsers, updateUser, deleteUser };
