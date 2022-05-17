import { client } from '@prisma/client'
import userRepository from '../repositories/userRepository.js'
import { conflictError, unauthorizedError } from '../utils/errorUtils.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type CreateClientData = Omit<client, 'id'>
export type AuthClientData = {
	email: string,
	password: string
}

async function signUp(createUserData: CreateClientData) {
	const existingUser = await userRepository.findByEmail(createUserData.email)
	if(existingUser) throw conflictError('Este email já está em uso.')

	const hashedPassword = bcrypt.hashSync(createUserData.password, 10)
	await userRepository.insert({ ...createUserData, password: hashedPassword })
}

async function login(loginData: AuthClientData) {
	const user = await getUser(loginData)

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

	return token
}

async function getUser(loginData: AuthClientData) {
	const user = await userRepository.findByEmail(loginData.email)
	if(!user) throw unauthorizedError('Dados inválidos')

	const password = bcrypt.compareSync(loginData.password, user.password)
	if(!password) throw unauthorizedError('Dados inválidos')

	return user
}

export default {
	signUp,
	login
}