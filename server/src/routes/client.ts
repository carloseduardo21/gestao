import { z } from 'zod'
import { FastifyInstance } from 'fastify'

export async function ClientRoutes(app: FastifyInstance) {
  app.get('/clients', async () => {
    const clients = await app.prisma.client.findMany({
      where: {
        active: true,
      },
    })
    return { clients }
  })
  app.post('/clients', async (request) => {
    const getBodyParams = z.object({
      name: z.string(),
      email: z
        .string()
        .optional()
        .transform((email) => (email === '' ? '-' : email)),
      cpf: z
        .string()
        .optional()
        .transform((cpf) => (cpf === '' ? '-' : cpf)),
      cell: z
        .string()
        .optional()
        .transform((cell) => (cell === '' ? '-' : cell)),
      birth_date: z.string().transform((toDate) => new Date(toDate)),
    })
    const { name, email, cpf, cell, birth_date } = getBodyParams.parse(
      request.body,
    )

    if (email === '-' && cpf === '-' && cell === '-') {
      return { message: 'Inválido' }
    }

    const clientExists = await app.prisma.client.findMany({
      where: {
        OR: [{ email }, { cpf }, { cell }],
      },
    })
    if (clientExists.length > 0) {
      return { message: 'Existente', clientExists }
    }

    const newEmail = email === '-' ? null : email
    const newCpf = cpf === '-' ? null : cpf
    const newCell = cell === '-' ? null : cell

    const client = await app.prisma.client.create({
      data: {
        name,
        email: newEmail,
        cpf: newCpf,
        cell: newCell,
        birth_date,
      },
    })

    return { message: 'Criado', client }
  })
  app.post('/clients/address', async (request) => {
    const getBodyParams = z.object({
      id: z.string(),
      zip: z.string(),
      address: z.string(),
      number: z.string().optional(),
      complement: z.string().optional(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
    })
    const { id, zip, address, number, complement, district, city, state } =
      getBodyParams.parse(request.body)
    const clientExists = await app.prisma.client.findUnique({
      where: {
        id,
      },
    })
    if (clientExists) {
      app.prisma.deliveryAddress.create({
        data: {
          zip,
          address,
          number,
          complement,
          district,
          city,
          state,
          clientId: id,
        },
        select: {
          client: true,
          zip: true,
          address: true,
          number: true,
          complement: true,
          district: true,
          city: true,
          state: true,
        },
      })
      return { message: 'Salvo', clientExists }
    }
    return { message: 'Inexistente' }
  })
  app.get('/clients/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const { id } = getParams.parse(request.params)
    const client = await app.prisma.client.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return { client }
  })
  app.get('/clients/search/:filter', async (request) => {
    const getParams = z.object({
      filter: z.string(),
    })
    const { filter } = getParams.parse(request.params)
    const client = await app.prisma.client.findMany({
      where: {
        OR: [
          {
            name: {
              contains: filter,
            },
          },
          {
            email: {
              contains: filter,
            },
          },
          {
            cpf: {
              contains: filter,
            },
          },
        ],
      },
    })
    return { client }
  })
  app.put('/clients/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const getBodyParams = z.object({
      name: z.string(),
      email: z.string().optional(),
      cpf: z.string().optional(),
      cell: z.string().optional(),
      birth_date: z.date(),
    })
    const { id } = getParams.parse(request.params)
    const { name, email, cpf, cell, birth_date } = getBodyParams.parse(
      request.body,
    )
    const clientExists = await app.prisma.client.findUnique({
      where: {
        id,
      },
    })
    if (!clientExists) {
      return { message: 'Cliente nao encontrado' }
    }
    const client = await app.prisma.client.update({
      data: {
        name,
        email,
        cpf,
        cell,
        birth_date,
      },
      where: {
        id,
      },
    })

    return { message: 'Atualizado', client }
  })
  app.delete('/clients/:id', async (request) => {
    const getParams = z.object({
      id: z.string(),
    })
    const { id } = getParams.parse(request.params)
    await app.prisma.client.delete({
      where: {
        id,
      },
    })
    return { message: 'Excluido' }
  })
}
