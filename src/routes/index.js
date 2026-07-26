import express from 'express';

import userRoutes from '../routes/userRoutes.js';
import postRoutes from '../routes/postRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;