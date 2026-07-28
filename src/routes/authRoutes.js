import express from 'express';

import { validateRegistration } from '../middlewares/validate-registration.middleware.js';
import { registerSchema } from '../validators/register.validator.js';
import { registerController } from '../controllers/auth/register.controller.js';


const router = express.Router();

router.post('/register', validateRegistration(registerSchema), registerController);

export default router;