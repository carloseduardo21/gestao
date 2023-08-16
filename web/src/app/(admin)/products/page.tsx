import { APIServer } from '@/hooks/useAxios'
import Link from 'next/link'
import { TableProducts } from '@/components/Tables/TableProducts'

export const dynamic = 'force-dynamic'

type IProducts = {
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
}

type IData = {
  products: IProducts[]
}

async function getData() {
  const { data } = await APIServer.get<IData>('/products')
  return data.products
}

export default async function Products() {
  const products = await getData()
  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-4xl text-gray-200">Produtos</span>
        <Link
          href="/products/new"
          className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 duration-200 hover:bg-slate-700"
        >
          Novo Produto
        </Link>
      </div>
      <TableProducts data={products} />
    </div>
  )
}
