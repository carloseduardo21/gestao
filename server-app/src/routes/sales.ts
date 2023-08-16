import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function SalesRoutes(app: FastifyInstance) {
  app.get('/sales', async () => {
    const sales = await prisma.sale.findMany()
    return { sales }
  })
  app.post('/sales', async (request) => {
    const getBodyParams = z.object({
      clientId: z.string(),
      paymentMethod: z.string(),
      totalValue: z.number(),
      dueDate: z.string(),
      productsSale: z.array(
        z.object({
          productId: z.number(),
          amount: z.number(),
          unitPrice: z.number(),
          totalPrice: z.number(),
        }),
      ),
    })
    const { clientId, paymentMethod, totalValue, productsSale } =
      getBodyParams.parse(request.body)

    const newSale = await prisma.sale.create({
      data: {
        clientId,
        paymentMethod,
        totalValue,
        ProductsSale: {
          create: productsSale,
        },
      },
    })
    productsSale.map(async (product) => {
      await prisma.product.update({
        data: {
          amount: {
            decrement: product.amount,
          },
        },
        where: {
          id: product.productId,
        },
      })
    })

    return { newSale }
  })
}
