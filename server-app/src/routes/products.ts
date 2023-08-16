import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify'
import { syncDatabase } from '../plugins/populateDatabase'

export async function ProductsRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    return { products }
  })
  app.get('/products/sync', async (_, reply) => {
    await syncDatabase()
    return { message: 'Database Ok' }
  })
}
