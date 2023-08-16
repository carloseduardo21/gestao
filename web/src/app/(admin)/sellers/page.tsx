import Link from 'next/link'
import { APIServer } from '@/hooks/useAxios'
import { TableSeller } from '@/components/Tables/TableSeller'

export const dynamic = 'force-dynamic'
export const revalidate = 10

type IData = {
  sellers: {
    id: string
    name: string
    cell: string
    userId: Date
  }[]
}

async function getData() {
  const { data } = await APIServer.get<IData>('/sellers')
  return data.sellers
}

export default async function Sellers() {
  const sellers = await getData()

  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-4xl text-gray-200">Vendedores</span>
        <Link
          href="/sellers/new"
          className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 duration-200 hover:bg-slate-700"
        >
          Novo Vendedor
        </Link>
      </div>
      <TableSeller data={sellers} />
    </div>
  )
}
