import { prisma } from '@/config/database'

async function findAll() {
	return prisma.product.findMany()
}

export const productsRepository = {
	findAll
}