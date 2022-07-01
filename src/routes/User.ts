import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

// router.post('/register', ValidateSchema(Schemas.user.create), controller.registerUser);
// router.post('/authenticate', controller.authenticateUser);
router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAllUsers);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
