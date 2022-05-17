import { prisma } from '../../src/database'
import { CreateClientData } from '../../src/services/userService'
import bcrypt from 'bcrypt'

export async function userFactory(clientData: CreateClientData) {
	return await prisma.client.create({
		data: {
			...clientData,
			password: bcrypt.hashSync(clientData.password, 10)
		}
	})
}