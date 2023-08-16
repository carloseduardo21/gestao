import { APIServer } from '@/hooks/useAxios'
import Link from 'next/link'
import { TableSupplier } from '@/components/Tables/TableSupplier'

export const dynamic = 'force-dynamic'

type ISuppliers = {
  id: string
  name: string
  cnpj: string
  cell: string
  city: string
}

type IData = {
  suppliers: ISuppliers[]
}

async function getData() {
  const { data } = await APIServer.get<IData>('/suppliers')
  return data.suppliers
}

export default async function Suppliers() {
  const suppliers = await getData()
  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-4xl text-gray-200">Forncedores</span>
        <Link
          href="/suppliers/new"
          className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 duration-200 hover:bg-slate-700"
        >
          Novo Fornecedor
        </Link>
      </div>
      <TableSupplier data={suppliers} />
    </div>
  )
}
