import { z } from 'zod'
import { FastifyInstance } from 'fastify'

const VALUES = [
  'BALDE',
  'BANDEJA',
  'BARRA',
  'BLOCO',
  'BOBINA',
  'CART',
  'CX',
  'CX2',
  'CX3',
  'CX5',
  'CX10',
  'CX15',
  'CX20',
  'CX25',
  'CX50',
  'CX100',
  'FARDO',
  'GRAMAS',
  'KG',
  'KIT',
  'LATA',
  'LITRO',
  'M',
  'PACOTE',
  'PC',
  'POTE',
  'UN',
] as const

export async function ProductRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await app.prisma.product.findMany({
      orderBy: {
        description: 'asc',
      },
      include: {
        Stock: true,
      },
    })
    return { products }
  })
  app.post('/products', async (request) => {
    const getBodyParams = z.object({
      codeBar: z
        .string()
        .optional()
        .transform((codeBar) => (codeBar === '' ? '-' : codeBar)),
      refer: z
        .string()
        .optional()
        .transform((refer) => (refer === '' ? '-' : refer)),
      description: z.string(),
      brand: z.string(),
      costPrice: z
        .string()
        .transform((costPrice) => parseFloat(costPrice.replace(',', '.'))),
      salePrice: z
        .string()
        .transform((salePrice) =>
          parseFloat(salePrice.replace(',', '.')).toFixed(2),
        ),
      unit: z.enum(VALUES).default('UN'),
    })
    const { codeBar, refer, description, brand, costPrice, salePrice, unit } =
      getBodyParams.parse(request.body)

    if (codeBar === '-' && refer === '-') {
      return { message: 'Inválido' }
    }
    const productExists = await app.prisma.product.findMany({
      where: {
        OR: [{ codeBar }, { refer }],
      },
    })
    if (productExists.length > 0) {
      return { message: 'Existente' }
    }

    const newCodeBar = codeBar === '-' ? null : codeBar
    const newRefer = refer === '-' ? null : refer

    const product = await app.prisma.product.create({
      data: {
        codeBar: newCodeBar,
        refer: newRefer,
        description,
        brand,
        costPrice,
        salePrice,
        unit,
      },
    })

    return { message: 'Criado', product }
  })
  app.get('/products/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const { id } = getParams.parse(request.params)
    const product = await app.prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        Stock: true,
      },
    })
    return { product }
  })
  app.put('/products/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const getBodyParams = z.object({
      codeBar: z
        .string()
        .optional()
        .transform((codeBar) => (codeBar === '' ? '-' : codeBar)),
      refer: z
        .string()
        .optional()
        .transform((refer) => (refer === '' ? '-' : refer)),
      description: z.string(),
      brand: z.string(),
      costPrice: z
        .string()
        .transform((costPrice) => parseFloat(costPrice.replace(',', '.'))),
      salePrice: z
        .string()
        .transform((salePrice) =>
          parseFloat(salePrice.replace(',', '.')).toFixed(2),
        ),
      unit: z.enum(VALUES).default('UN'),
      min: z.number().default(0),
      max: z.number().default(0),
      current: z.number().default(0),
    })
    const { id } = getParams.parse(request.params)
    const {
      codeBar,
      refer,
      description,
      brand,
      costPrice,
      salePrice,
      unit,
      min,
      max,
      current,
    } = getBodyParams.parse(request.body)
    const productExists = await app.prisma.product.findUnique({
      where: {
        id,
      },
    })
    if (!productExists) {
      return { message: 'Inexistente' }
    }
    const findStock = await app.prisma.stock.findUnique({
      where: {
        productId: id,
      },
    })
    if (!findStock) {
      await app.prisma.stock.create({
        data: {
          productId: id,
          min,
          max,
          current,
        },
      })
    } else {
      await app.prisma.stock.update({
        where: {
          productId: id,
        },
        data: {
          min,
          max,
          current,
        },
      })
    }
    const product = await app.prisma.product.update({
      data: {
        codeBar,
        refer,
        description,
        brand,
        costPrice,
        salePrice,
        unit,
      },
      where: {
        id,
      },
    })

    return { message: 'Atualizado', product }
  })
  app.delete('/products/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const { id } = getParams.parse(request.params)
    await app.prisma.product.delete({
      where: {
        id,
      },
    })
    return { message: 'Excluido' }
  })
}
