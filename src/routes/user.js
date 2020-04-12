import express from 'express';
import 'express-async-errors';
import { UserController } from '../controllers';

const { create, findById, findAll, deleteUser, login } = UserController;

const userRoutes = express.Router();

userRoutes.route('/').post(create).get(findAll);

userRoutes.route('/:id').get(findById).delete(deleteUser);

userRoutes.route('/auth/login').post(login);

export default userRoutes;
