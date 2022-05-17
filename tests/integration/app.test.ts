import supertest from 'supertest'
import app from '../../src/app.js'
import { prisma } from '../../src/database.js'
import { ClientData } from '../../src/services/userService.js'

describe('POST /sign-up', () => {
	beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE clients CASCADE;`
	})

	it('should persist the client given a valid body', async () => {
		const client: ClientData = {
			name: 'bambina',
			email: 'bambina@gmail.com',
			password: '123'
		}

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
