import { FastifyInstance } from 'fastify'
import { z } from 'zod'

const paymentMethods = ['pix', 'money', 'debt', 'credit'] as const

export async function SaleRoutes(app: FastifyInstance) {
  app.get('/sales', async (request, reply) => {
    return { message: 'Sales' }
  })
  app.post('/sales', async (request, reply) => {
    const getBodyParams = z.object({
      sellerId: z.string(),
      clientId: z.string(),
      productsSale: z.array(
        z.object({
          id: z.string(),
          quantity: z.number(),
          unitPrice: z.number().transform((price) => price.toFixed(2)),
        }),
      ),
      paymentMethod: z.enum(paymentMethods),
      discount: z.number().transform((discount) => (discount / 100).toFixed(2)),
      totalValue: z.number().transform((price) => price.toFixed(2)),
    })
    const {
      sellerId,
      clientId,
      productsSale,
      discount,
      totalValue,
      paymentMethod,
    } = getBodyParams.parse(request.body)

    const sale = await app.prisma.sale.create({
      data: {
        sellerId,
        clientId,
        discount,
        paymentMethod,
        totalSalePrice: totalValue,
      },
    })
    productsSale.map(async (product) => {
      await app.prisma.productsSales.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          productPrice: product.unitPrice,
        },
      })
      await app.prisma.stock.update({
        where: {
          productId: product.id,
        },
        data: {
          current: {
            decrement: product.quantity,
          },
        },
      })
    })
    return { sale }
  })
}
