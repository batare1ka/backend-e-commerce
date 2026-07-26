import express from 'express'
import { postController } from '../controllers/post-controller.js';

const router = express.Router();

router.get('/', postController);

export default router;
