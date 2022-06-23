import 'express-async-errors'
import '@/setup'
import cors from 'cors'
import express, { json, Express } from 'express'
import { errorHandlerMiddleware } from '@/middlewares/errorHandlerMiddleware'
import router from '@/routers/index'
import { connectDb, disconnectDB } from './config/database'

const app = express()
app.use(json())
app.use(cors())
app.use(router)
app.use(errorHandlerMiddleware)

export function init(): Promise<Express> {
	connectDb()
	return Promise.resolve(app)
}

export async function close(): Promise<void> {
	await disconnectDB()
}

export default app
