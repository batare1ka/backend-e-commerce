import express from 'express';

import { validateSchema } from '../middlewares/validate-schema.middleware.js';
import { registerSchema } from '../validators/register.validator.js';
import { registerController } from '../controllers/auth/register.controller.js';
import { loginSchema } from '../validators/login.validation.js';
import { loginController } from '../controllers/auth/login.controller.js';


const router = express.Router();

router.post('/register', validateSchema(registerSchema), registerController);
router.post('/login', validateSchema(loginSchema), loginController);

export default router;