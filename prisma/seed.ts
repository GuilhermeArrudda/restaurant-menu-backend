import { prisma } from '../src/database.js'

async function main() {
	//upsert = update/insert
	await prisma.product.createMany({
		data: [
			{ name: 'Coca-Cola', 
				price: 600,
				picture: 'https://img2.gratispng.com/20180630/gfe/kisspng-fizzy-drinks-coca-cola-diet-coke-beverage-can-5b37e6401c6839.2095446815303900801164.jpg'
			}, 
			{ name: 'Água sem Gás', 
				price: 500,
				picture: 'https://d3gdr9n5lqb5z7.cloudfront.net/fotos/1424_big.jpg'
			}, 
			{ name: 'Água de Coco',
				price: 800,
				picture: 'https://img2.gratispng.com/20180331/oxq/kisspng-juice-fizzy-drinks-coconut-water-sports-energy-d-coco-5abf3826a6c0c7.133926441522481190683.jpg'
			}],
		skipDuplicates: true,
	})

}

main()
	.catch((e) => {
		console.log(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})