import { PrismaClient } from '@prisma/client'
import { loadEnv } from './envs'

loadEnv()

export let prisma: PrismaClient

export async function connectDb(): Promise<void> {
	prisma = new PrismaClient()
}

export async function disconnectDB(): Promise<void> {
	await prisma?.$disconnect()
}
