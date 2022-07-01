// import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

// const authenticateUser = (req: Request, res: Response, next: NextFunction) => {};

// const registerUser = (req: Request, res: Response, next: NextFunction) => {};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

const readAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => res.status(500).json({ err }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
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

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

export default { readUser, readAllUsers, updateUser, deleteUser };
