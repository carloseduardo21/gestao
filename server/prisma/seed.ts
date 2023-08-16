import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const clients = [
  {
    name: 'João da Silva',
    email: 'joao.silva@example.com',
    cpf: '12345678900',
    birthDate: '1985-01-10',
  },
  {
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    cpf: '98765432100',
    birthDate: '1992-05-25',
  },
  {
    name: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    cpf: '45678912300',
    birthDate: '1978-09-03',
  },
  {
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    cpf: '78912345600',
    birthDate: '1989-11-15',
  },
  {
    name: 'Carlos Rodrigues',
    email: 'carlos.rodrigues@example.com',
    cpf: '32165498700',
    birthDate: '1995-07-08',
  },
  {
    name: 'Laura Santos',
    email: 'laura.santos@example.com',
    cpf: '11122233342',
    birthDate: '1991-03-18',
  },
  {
    name: 'Rafaela Lima',
    email: 'rafaela.lima@example.com',
    cpf: '55566677788',
    birthDate: '1987-08-12',
  },
  {
    name: 'Gustavo Oliveira',
    email: 'gustavo.oliveira@example.com',
    cpf: '99988877766',
    birthDate: '1982-12-30',
  },
  {
    name: 'Juliana Almeida',
    email: 'juliana.almeida@example.com',
    cpf: '44433322211',
    birthDate: '1994-06-05',
  },
  {
    name: 'Felipe Sousa',
    email: 'felipe.sousa@example.com',
    cpf: '77788899911',
    birthDate: '1980-11-27',
  },
  {
    name: 'Mariana Rodrigues',
    email: 'mariana.rodrigues@example.com',
    cpf: '22233344455',
    birthDate: '1990-02-15',
  },
  {
    name: 'Antônio Silva',
    email: 'antonio.silva@example.com',
    cpf: '77766655544',
    birthDate: '1986-07-22',
  },
  {
    name: 'Luiza Ferreira',
    email: 'luiza.ferreira@example.com',
    cpf: '55544433322',
    birthDate: '1993-09-01',
  },
  {
    name: 'Ricardo Souza',
    email: 'ricardo.souza@example.com',
    cpf: '88877766655',
    birthDate: '1984-11-09',
  },
  {
    name: 'Camila Oliveira',
    email: 'camila.oliveira@example.com',
    cpf: '44455566633',
    birthDate: '1996-04-27',
  },
  {
    name: 'Fernando Pereira',
    email: 'fernando.pereira@example.com',
    cpf: '33322211100',
    birthDate: '1998-12-12',
  },
  {
    name: 'Isabela Santos',
    email: 'isabela.santos@example.com',
    cpf: '66677788899',
    birthDate: '1997-03-08',
  },
  {
    name: 'José Almeida',
    email: 'jose.almeida@example.com',
    cpf: '11122233343',
    birthDate: '1989-06-20',
  },
  {
    name: 'Letícia Costa',
    email: 'leticia.costa@example.com',
    cpf: '99988877763',
    birthDate: '1991-10-05',
  },
  {
    name: 'Vitoria Fernandes',
    email: 'vitoria.fernandes@example.com',
    cpf: '44455566611',
    birthDate: '1995-08-17',
  },
  {
    name: 'Lucas Ribeiro',
    email: 'lucas.ribeiro@example.com',
    cpf: '77788899900',
    birthDate: '1992-03-12',
  },
  {
    name: 'Mariana Santos',
    email: 'mariana.santos@example.com',
    cpf: '22233344454',
    birthDate: '1987-06-25',
  },
  {
    name: 'Thiago Almeida',
    email: 'thiago.almeida@example.com',
    cpf: '99988877762',
    birthDate: '1994-11-02',
  },
  {
    name: 'Julia Fernandes',
    email: 'julia.fernandes@example.com',
    cpf: '44455566677',
    birthDate: '1989-08-19',
  },
  {
    name: 'Eduardo Lima',
    email: 'eduardo.lima@example.com',
    cpf: '11122233344',
    birthDate: '1997-01-07',
  },
]
const sellers = [
  {
    name: 'João da Silva',
    cell: '11987654321',
  },
  {
    name: 'Maria Oliveira',
    cell: '22998765432',
  },
  {
    name: 'Pedro Santos',
    cell: '33987651234',
  },
  {
    name: 'Ana Costa',
    cell: '44912345678',
  },
  {
    name: 'Carlos Rodrigues',
    cell: '55998761234',
  },
]
const products = [
  {
    codeBar: '7891234567890',
    refer: 'REF001',
    description: 'Camiseta branca',
    brand: 'Marca A',
    costPrice: 20.0,
    salePrice: 39.9,
  },
  {
    codeBar: '9876543210987',
    refer: 'REF002',
    description: 'Calça jeans',
    brand: 'Marca B',
    costPrice: 50.0,
    salePrice: 99.9,
  },
  {
    codeBar: '1234567890123',
    refer: 'REF003',
    description: 'Tênis esportivo',
    brand: 'Marca C',
    costPrice: 80.0,
    salePrice: 149.9,
  },
  {
    codeBar: '4567890123456',
    refer: 'REF004',
    description: 'Bolsa de couro',
    brand: 'Marca D',
    costPrice: 70.0,
    salePrice: 129.9,
  },
  {
    codeBar: '2345678901234',
    refer: 'REF005',
    description: 'Relógio de pulso',
    brand: 'Marca E',
    costPrice: 100.0,
    salePrice: 199.9,
  },
  {
    codeBar: '5678901234567',
    refer: 'REF006',
    description: 'Jaqueta de couro',
    brand: 'Marca F',
    costPrice: 120.0,
    salePrice: 249.9,
  },
  {
    codeBar: '3456789012345',
    refer: 'REF007',
    description: 'Óculos de sol',
    brand: 'Marca G',
    costPrice: 40.0,
    salePrice: 79.9,
  },
  {
    codeBar: '9012345678901',
    refer: 'REF008',
    description: 'Sapato social',
    brand: 'Marca H',
    costPrice: 90.0,
    salePrice: 189.9,
  },
  {
    codeBar: '6789012345678',
    refer: 'REF009',
    description: 'Bolsa de praia',
    brand: 'Marca I',
    costPrice: 30.0,
    salePrice: 69.9,
  },
  {
    codeBar: '0123456789012',
    refer: 'REF010',
    description: 'Perfume masculino',
    brand: 'Marca J',
    costPrice: 60.0,
    salePrice: 129.9,
  },
  {
    codeBar: '1234509876543',
    refer: 'REF011',
    description: 'Moletom cinza',
    brand: 'Marca K',
    costPrice: 35.0,
    salePrice: 79.9,
  },
  {
    codeBar: '9876543210456',
    refer: 'REF012',
    description: 'Shorts esportivo',
    brand: 'Marca L',
    costPrice: 25.0,
    salePrice: 59.9,
  },
  {
    codeBar: '7890123456789',
    refer: 'REF013',
    description: 'Bolsa de mão',
    brand: 'Marca M',
    costPrice: 20.0,
    salePrice: 49.9,
  },
  {
    codeBar: '5432109876543',
    refer: 'REF014',
    description: 'Boné preto',
    brand: 'Marca N',
    costPrice: 15.0,
    salePrice: 39.9,
  },
  {
    codeBar: '8765432101234',
    refer: 'REF015',
    description: 'Cinto de couro',
    brand: 'Marca O',
    costPrice: 18.0,
    salePrice: 49.9,
  },
]

async function main() {
  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'carlos.eduardo.k2103@gmail.com',
      password: 'car@1234',
      role: 'ADMIN',
    },
  })
  clients.map(
    async (client) =>
      await prisma.client.create({
        data: {
          name: client.name,
          cpf: client.cpf,
          email: client.email,
          birth_date: new Date(client.birthDate),
        },
      }),
  )
  sellers.map(async (seller) => {
    await prisma.seller.create({
      data: {
        name: seller.name,
        cell: seller.cell,
        user: {
          create: {
            name: seller.name,
            email: seller.name + '@example.com',
            role: 'SELLER',
            password: 'seller123',
          },
        },
      },
    })
  })
  products.map(async (product) => {
    await prisma.product.create({
      data: {
        codeBar: product.codeBar,
        refer: product.refer,
        description: product.description,
        brand: product.brand,
        costPrice: product.costPrice,
        salePrice: product.salePrice,
        Stock: {
          create: {
            min: 1,
            max: 10,
            current: Number((Math.random() * 10).toFixed(0)),
          },
        },
      },
    })
  })
}

main()
