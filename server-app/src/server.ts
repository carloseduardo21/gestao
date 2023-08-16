import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { ProductsRoutes } from './routes/products'
import { SalesRoutes } from './routes/sales'

async function bootstrap() {
  const app = fastify({ logger: true })
  await app.register(fastifyCors, { origin: true })

  app.get('/', async () => {
    return { message: 'API Mobile Ok' }
  })

  await app.register(ProductsRoutes, { prefix: '/api' })
  await app.register(SalesRoutes, { prefix: '/api' })

  const start = async () => {
    try {
      await app.listen({ port: 7777, host: '0.0.0.0' })
    } catch (err) {
      app.log.error(err)
    }
  }
  start()
}

bootstrap()
