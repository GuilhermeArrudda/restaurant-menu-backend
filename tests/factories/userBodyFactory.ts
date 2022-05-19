import { faker } from '@faker-js/faker'

export const userBodyFactory = {
	name: faker.lorem.word(),
	email: (faker.internet.email('bambina', '', 'gmail.com')).toLowerCase(),
	password: faker.lorem.word(6)
}