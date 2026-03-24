import express from 'express'

import { allowCors } from './src/middlewares/cors.js'
import { connectDb } from './src/config/config.js'
import routes from './src/routes/index.js'

const app = express()

app.use(allowCors)

// Connect to database
connectDb()

app.use('/api', routes);

export default app
