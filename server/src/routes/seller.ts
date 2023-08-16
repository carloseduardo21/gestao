import { z } from 'zod'
import { FastifyInstance } from 'fastify'

export async function SellerRoutes(app: FastifyInstance) {
  app.get('/sellers', async () => {
    const sellers = await app.prisma.seller.findMany()
    return { sellers }
  })
  app.post('/sellers', async (request) => {
    const getBodyParams = z.object({
      name: z.string(),
      email: z.string().email(),
      cell: z.string(),
    })
    const { name, email, cell } = getBodyParams.parse(request.body)
    const sellerExists = await app.prisma.seller.findMany({
      where: {
        cell,
      },
    })
    if (sellerExists.length > 0) {
      return { message: 'Existente' }
    }

    const seller = await app.prisma.seller.create({
      data: {
        name,
        cell,
        user: {
          create: {
            name,
            email,
            password: cell,
            role: 'SELLER',
          },
        },
      },
    })

    return { message: 'Criado', seller }
  })
}
