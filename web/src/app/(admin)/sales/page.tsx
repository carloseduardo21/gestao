import { Sale } from '@/components/Sale/Sale'
import { APIServer } from '@/hooks/useAxios'

export const dynamic = 'force-dynamic'

type IDataClients = {
  clients: {
    id: string
    name: string
    email: string
    cpf: string
    cell: string
    birth_date: Date
  }[]
}

type IDataSellers = {
  sellers: {
    id: string
    name: string
    cell: string
  }[]
}

type IDataProducts = {
  products: {
    id: string
    codeBar: string
    refer: string
    description: string
    brand: string
    costPrice: string
    salePrice: string
    unit: string
    Stock: {
      id: string
      productId: string
      min: number
      max: number
      current: number
    }[]
  }[]
}

async function getDataClients() {
  const { data } = await APIServer.get<IDataClients>('/clients')
  return data.clients
}
async function getDataSellers() {
  const { data } = await APIServer.get<IDataSellers>('/sellers')
  return data.sellers
}
async function getDataProducts() {
  const { data } = await APIServer.get<IDataProducts>('/products')
  return data.products
}

export default async function Sales() {
  const clients = await getDataClients()
  const sellers = await getDataSellers()
  const products = await getDataProducts()
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Sale clients={clients} sellers={sellers} products={products} />
    </div>
  )
}
