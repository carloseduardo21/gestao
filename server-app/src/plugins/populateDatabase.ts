import readLine from 'readline'
import { prisma } from '../lib/prisma'
import { createReadStream } from 'fs'

interface Data {
  id: string
  description: string
  unit: string
  group: string
  amount: string
  costPrice: string
  salePrice: string
}

export async function syncDatabase() {
  const stream = createReadStream('./src/csv/EST.CSV')
  const rl = readLine.createInterface({ input: stream })
  const data: Data[] = []

  rl.on('line', (row: string) => {
    const line = row.split(';')
    const product = {
      id: line[0],
      description: line[1].trim(),
      unit: line[2].trim(),
      group: line[3].trim(),
      amount: line[4].trim(),
      costPrice: line[5].trim(),
      salePrice: line[6].trim(),
    }
    data.push(product)
  })
  rl.on('close', () => {
    data.shift()
    data.map(async (product) => {
      const productExists = await prisma.product
        .findMany({
          where: {
            id: Number(product.id),
          },
        })
        .then(async (response) => {
          if (response.length > 0) {
            const updated = await prisma.product.update({
              where: {
                id: Number(product.id),
              },
              data: {
                id: Number(product.id),
                description: product.description,
                unit: product.unit,
                group: product.group,
                amount: Number(product.amount.replace(',', '.')),
                costPrice: product.costPrice.replace(',', '.'),
                salePrice: product.salePrice.replace(',', '.'),
              },
            })
            return updated
          } else {
            const created = await prisma.product.create({
              data: {
                id: Number(product.id),
                description: product.description,
                unit: product.unit,
                group: product.group,
                amount: Number(product.amount.replace(',', '.')),
                costPrice: product.costPrice.replace(',', '.'),
                salePrice: product.salePrice.replace(',', '.'),
              },
            })
            return created
          }
        })
      return productExists
    })
  })
}
