import { jest } from '@jest/globals'
import userRepository from '../../src/repositories/userRepository.js'
import userService, { AuthClientData, CreateClientData } from '../../src/services/userService.js'
import { conflictError, unauthorizedError } from '../../src/utils/errorUtils'
import faker from '@faker-js/faker'
import { userBodyFactory } from '../factories/userBodyFactory.js'
import bcrypt from 'bcrypt'


describe('User Service Test', () => {
	it('should throw a conflict error given a duplicate email', async () => {
		const client: CreateClientData = userBodyFactory

		jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
			id: 1,
			...client
		})

		expect(userService.signUp(client)).rejects.toEqual(
			conflictError('Este email já está em uso.')
		)
	})
	it('should throw unauthorized error given incorrect email', async () => {
		const client: AuthClientData = {
			email: faker.internet.email(),
			password: faker.lorem.word()
		}

		jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null)

		expect(async () => {
			await userService.login(client)
		}).rejects.toEqual(unauthorizedError('Dados inválidos'))
	})

	it('should throw unauthorized error given incorrect password', async () => {
		const client: CreateClientData = userBodyFactory

		jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
			id: 1,
			...client
		})

		jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false)

		expect(async () => {
			await userService.login(client)
		}).rejects.toEqual(unauthorizedError('Dados inválidos'))
	})
})