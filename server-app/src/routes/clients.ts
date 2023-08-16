import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export function ClientsRoutes(app: FastifyInstance) {
  app.get('/clients', async () => {
    const clients = await prisma.client.findMany({})
    return { clients }
  })
}
