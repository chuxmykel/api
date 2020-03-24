import express from 'express';
import { create, findById, findAll, deleteBook } from '../controllers';

const bookRoutes = express.Router();

bookRoutes
  .route('/')
  .post(create)
  .get(findAll);

bookRoutes
  .route('/:id')
  .get(findById)
  .delete(deleteBook);

export default bookRoutes;
