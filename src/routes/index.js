import express from 'express';
import bookRoutes from './books';

const router = express();

router.get('/', (_req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Hello, World!',
  }),
);

router.use('/books', bookRoutes);

export default router;
