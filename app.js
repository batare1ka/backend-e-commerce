import express from 'express'
import dotenv from "dotenv";


import { allowCors } from './src/middlewares/cors.js'
import { connectDb } from './src/config/config.js'
import routes from './src/routes/index.js'
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express()

app.use(allowCors);
app.use(express.json());

// Connect to database
connectDb()

app.use('/api', routes);
app.use('/auth', authRoutes);

export default app
