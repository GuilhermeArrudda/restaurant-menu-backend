import { prisma } from '../database.js'
import { ClientData } from '../services/userService.js'

async function findByEmail(email: string) {
	return prisma.client.findUnique({
		where: {
			email
		}
	})
}

async function insert(createUserData: ClientData) {
	return prisma.client.create({
		data: createUserData
	})
}

export default {
	findByEmail,
	insert
}