import { FastifyInstance } from 'fastify'

export async function PurchaseRoutes(app: FastifyInstance) {
  app.get('/purchases', async (request, reply) => {
    return { message: 'Purchases' }
  })
}
