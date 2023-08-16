import fastify from 'fastify'
import prismaPlugin from './plugins/prisma'
import fastifyCors from '@fastify/cors'
import { SaleRoutes } from './routes/sale'
import { ClientRoutes } from './routes/client'
import { ProductRoutes } from './routes/product'
import { PurchaseRoutes } from './routes/purchase'
import { SupplierRoutes } from './routes/supplier'
import { SellerRoutes } from './routes/seller'

async function bootstrap() {
  const app = fastify({
    logger: true,
  })

  await app.register(fastifyCors, { origin: true })

  await app.register(prismaPlugin)

  await app.register(ClientRoutes, { prefix: '/api' })
  await app.register(ProductRoutes, { prefix: '/api' })
  await app.register(PurchaseRoutes, { prefix: '/api' })
  await app.register(SaleRoutes, { prefix: '/api' })
  await app.register(SupplierRoutes, { prefix: '/api' })
  await app.register(SellerRoutes, { prefix: '/api' })

  app.get('/', async (request, reply) => {
    return { message: 'Ok' }
  })

  const start = async () => {
    try {
      await app.listen({ port: 3333, host: '0.0.0.0' })
    } catch (err) {
      app.log.error(err)
    }
  }
  start()
}

bootstrap()
