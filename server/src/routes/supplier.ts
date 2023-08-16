import { z } from 'zod'
import { FastifyInstance } from 'fastify'

export async function SupplierRoutes(app: FastifyInstance) {
  app.get('/suppliers', async () => {
    const suppliers = await app.prisma.supplier.findMany()
    return { suppliers }
  })
  app.post('/suppliers', async (request) => {
    const getBodyParams = z.object({
      name: z.string(),
      cnpj: z
        .string()
        .optional()
        .transform((cnpj) => (cnpj === '' ? '-' : cnpj)),
      cell: z
        .string()
        .optional()
        .transform((cell) => (cell === '' ? '-' : cell)),
      city: z.string(),
    })

    const { name, cnpj, cell, city } = getBodyParams.parse(request.body)

    if (cnpj === '-' && cell === '-') {
      return { message: 'Inválido' }
    }

    const supplierExists = await app.prisma.supplier.findMany({
      where: {
        OR: [{ cnpj }, { cell }],
      },
    })
    if (supplierExists.length > 0) {
      return { message: 'Existente' }
    }

    const newCnpj = cnpj === '-' ? null : cnpj
    const newCell = cell === '-' ? null : cell

    const supplier = await app.prisma.supplier.create({
      data: {
        name,
        cnpj: newCnpj,
        cell: newCell,
        city,
      },
    })

    return { message: 'Criado', supplier }
  })
  app.get('/suppliers/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const { id } = getParams.parse(request.params)
    const supplier = await app.prisma.supplier.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return { supplier }
  })
  app.put('/suppliers/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const getBodyParams = z.object({
      name: z.string(),
      cnpj: z.string().optional(),
      cell: z.string(),
      city: z.string(),
    })
    const { id } = getParams.parse(request.params)
    const { name, cnpj, cell, city } = getBodyParams.parse(request.body)
    const supplierExists = await app.prisma.supplier.findUnique({
      where: {
        id,
      },
    })
    if (!supplierExists) {
      return { message: 'Fornecedor nao encontrado' }
    }
    const supplier = await app.prisma.supplier.update({
      data: {
        name,
        cnpj,
        cell,
        city,
      },
      where: {
        id,
      },
    })

    return { message: 'Atualizado', supplier }
  })
  app.delete('/suppliers/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const { id } = getParams.parse(request.params)
    await app.prisma.supplier.delete({
      where: {
        id,
      },
    })
    return { message: 'Excluido' }
  })
}
