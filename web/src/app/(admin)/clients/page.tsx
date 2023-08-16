import Link from 'next/link'
import { APIServer } from '@/hooks/useAxios'
import { TableClient } from '@/components/Tables/TableClient'

export const dynamic = 'force-dynamic'
export const revalidate = 10

type IData = {
  clients: {
    id: string
    name: string
    email: string
    cpf: string
    cell: string
    birth_date: Date
  }[]
}

async function getData() {
  const { data } = await APIServer.get<IData>('/clients')
  return data.clients
}

export default async function Clients() {
  const clients = await getData()

  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-4xl text-gray-200">Clientes</span>
        <Link
          href="/clients/new"
          className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 duration-200 hover:bg-slate-700"
        >
          Novo Cliente
        </Link>
      </div>
      <TableClient data={clients} />
    </div>
  )
}
