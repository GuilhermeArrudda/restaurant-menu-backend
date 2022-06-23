import { prisma } from '@/config/database'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

export async function userFactory(clientData: Prisma.clientUncheckedCreateInput) {
	const data = { ...clientData, password: bcrypt.hashSync(clientData.password, 10)}
	return await prisma.client.create({
		data: {
			name: data.name,
			email: data.email,
			password: data.password
		}
	})
}