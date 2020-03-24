import express from 'express';
import { ok } from '../utils';
import bookRoutes from './books';

const router = express();

router.get('/', (_req, res) =>
  ok(res, {
    status: res.statusCode,
    message: 'Hello, World!',
  }),
);

router.use('/books', bookRoutes);

export default router;
