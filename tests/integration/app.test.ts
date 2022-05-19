import supertest from 'supertest'
import app from '../../src/app.js'
import { prisma } from '../../src/database.js'
import { CreateClientData } from '../../src/services/userService.js'
import { tokenFactory } from '../factories/tokenFactory.js'
import { userBodyFactory } from '../factories/userBodyFactory.js'
import { userFactory } from '../factories/userFactory.js'

describe('POST /sign-up', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

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
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return status 200 and credentials given a valid body', async () => {
		const client: CreateClientData = userBodyFactory
		await userFactory(client)

		const result = await supertest(app).post('/login').send({ email: client.email, password: client.password })

		expect(result.status).toEqual(200)
		expect(result.body).not.toBeNull()
	})
})

describe('POST /logout', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)
	
	it('should terun status 200 given a valid token', async () => {
		const token = await tokenFactory()

		const result = await supertest(app).post('/logout').set('Authorization', `Bearer ${token}`)

		expect(result.status).toEqual(200)
	})
})

async function deleteAll () {
	await prisma.$executeRaw`TRUNCATE TABLE clients CASCADE`
}

async function disconnect() {
	await prisma.$disconnect()
}
