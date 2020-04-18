import express from 'express';
import { ok } from '../utils';
import bookRoutes from './book';
import userRoutes from './user';

const router = express();

router.get('/', (_req, res) =>
  ok(res, {
    status: res.statusCode,
    message: 'Hello, World!',
  }),
);

router.use('/books', bookRoutes);
router.use('/users', userRoutes);

export default router;
