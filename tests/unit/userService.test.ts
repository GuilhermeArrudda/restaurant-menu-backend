import { jest } from '@jest/globals'
import userRepository from '../../src/repositories/userRepository.js'
import userService, { ClientData } from '../../src/services/userService.js'
import { conflictError } from '../../src/utils/errorUtils'

describe('User Service Test', () => {
	it('should thrown a conflict error given a duplicate email', async () => {
		const client: ClientData = {
			name: 'bambina',
			email: 'bambina@gmail.com',
			password: '123'
		}

		jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
			id: 1,
			...client
		})

		expect(userService.signUp(client)).rejects.toEqual(
			conflictError('Este email já está em uso.')
		)
	})
})