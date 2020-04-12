import express from 'express';
import 'express-async-errors';
import { BookController } from '../controllers';

const { create, findById, findAll, deleteBook } = BookController;

const bookRoutes = express.Router();

bookRoutes.route('/').post(create).get(findAll);

bookRoutes.route('/:id').get(findById).delete(deleteBook);

export default bookRoutes;
