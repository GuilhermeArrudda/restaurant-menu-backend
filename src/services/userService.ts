import { client } from '@prisma/client'
import userRepository from '../repositories/userRepository.js'
import { conflictError } from '../utils/errorUtils.js'
import bcrypt from 'bcrypt'

export type ClientData = Omit<client, 'id'>

async function signUp(createUserData: ClientData) {
	const existingUser = await userRepository.findByEmail(createUserData.email)
	if(existingUser) throw conflictError('Este email já está em uso.')

	const hashedPassword = bcrypt.hashSync(createUserData.password, 10)
	await userRepository.insert({ ...createUserData, password: hashedPassword })
}

export default {
	signUp
}