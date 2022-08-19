import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRouter from './Routes/auth.routes'



const app: Application = express()

// Middlewares and Settings
export const CorsOptions: any = {
    origin: 'http://localhost:3000',
    cors: true,
    credentials: true,
}

app.use(cors(CorsOptions))
app.use(bodyParser.json())

// Routes
app.use('/api/auth', authRouter)

export default app