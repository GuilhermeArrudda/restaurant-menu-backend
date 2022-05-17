import { faker } from '@faker-js/faker'

export const userBodyFactory = {
	name: faker.lorem.word(),
	email: faker.internet.email(),
	password: faker.lorem.word()
}