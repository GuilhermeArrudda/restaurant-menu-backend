import { prisma } from '../database.js'
import { CreateClientData } from '../services/userService.js'

async function findByEmail(email: string) {
	return prisma.client.findUnique({
		where: {
			email
		}
	})
}

async function insert(createUserData: CreateClientData) {
	return prisma.client.create({
		data: createUserData
	})
}

export default {
	findByEmail,
	insert
}