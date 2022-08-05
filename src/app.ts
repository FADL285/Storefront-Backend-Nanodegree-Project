import express, { Application, json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes'
import { errorMiddleware } from './middlewares/error.middleware'

// create an instance server
const app: Application = express()
// HTTP Security Middleware
app.use(helmet())
// HTTP request logger middleware
app.use(morgan('common'))
// Enable cors middleware
app.use(cors())
// Parser Middleware for JSON payloads
app.use(json())
// Routes
app.use('/', routes)
// Error Handler Middleware
app.use(errorMiddleware)

export default app
