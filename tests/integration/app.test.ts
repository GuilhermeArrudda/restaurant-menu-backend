import supertest from 'supertest'
import app, { init } from '@/app'
import { prisma } from '@/config/database'
import { CreateClientData } from '@/services/userService'
import { tokenFactory } from '../factories/tokenFactory'
import { userBodyFactory } from '../factories/userBodyFactory'
import { userFactory } from '../factories/userFactory'
import { cleanDb } from '../helpers'

beforeEach(async () => {
	await init()
	await cleanDb()
})

afterAll(disconnect)

describe('POST /sign-up', () => {

	it('should persist the client given a valid body', async () => {
		const client: CreateClientData = userBodyFactory

		const result = await supertest(app).post('/sign-up').send(client)
		const createdClient = await prisma.client.findUnique({
			where: {
				email: client.email
			}
		})

		expect(result.status).toEqual(201)
		expect(createdClient).not.toBeNull()
	})
})

describe('POST /login', () => {

	it('should return status 200 and credentials given a valid body', async () => {
		const client: CreateClientData = userBodyFactory
		await userFactory(client)

		const result = await supertest(app).post('/login').send({ email: client.email, password: client.password })

		expect(result.status).toEqual(200)
		expect(result.body).not.toBeNull()
	})
})

describe('POST /logout', () => {
	
	it('should return status 200 given a valid token', async () => {
		const token = await tokenFactory()

		const result = await supertest(app).post('/logout').set('Authorization', `Bearer ${token}`)

		expect(result.status).toEqual(200)
	})
})

async function disconnect() {
	await prisma.$disconnect()
}
