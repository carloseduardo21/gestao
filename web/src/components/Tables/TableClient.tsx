'use client'
import { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { formatCPF, formatCellNumber } from '@/functions/formatStrings'
import { Search } from './Search'

type IClients = {
  id: string
  name: string
  email: string
  cpf: string
  cell: string
  birth_date: Date
}

type IProps = {
  data: IClients[]
}

function Paginator(items: IClients[], page: number, perPage: number) {
  const offset = (page - 1) * perPage
  const paginatedItems = items.slice(offset).slice(0, perPage)
  const totalPages = Math.ceil(items.length / perPage)
  return {
    page,
    perPage,
    pre_page: page - 1 ? page - 1 : null,
    next_page: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages,
    data: paginatedItems,
  }
}

export function TableClient(props: IProps) {
  const [filter, setFilter] = useState('')
  const [filteredData, setFilteredData] = useState<IClients[]>(props.data)
  const [data, setData] = useState<IClients[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  if (props.data.length < 0) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setFilteredData(
      props.data.filter((client) => {
        return (
          client.name.toLowerCase().match(filter.toLowerCase()) ||
          client.email?.toLowerCase().match(filter.toLowerCase()) ||
          client.cpf?.toLowerCase().match(filter.toLowerCase()) ||
          client.cell?.toLowerCase().match(filter.toLowerCase())
        )
      }),
    )
    const { data: dataPaginate, totalPages: totalPagesPaginete } = Paginator(
      filteredData,
      page,
      10,
    )
    setData(dataPaginate)
    setTotalPages(totalPagesPaginete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, page, filter])

  return (
    <div className="relative mt-8 flex h-full w-full flex-col items-center">
      <Search
        placeholder="Busque pelo Nome, CPF, Email ou celular..."
        value={filter}
        setValue={setFilter}
        setPageFilter={setPage}
      />
      <table className="w-full text-xl text-gray-200">
        <thead>
          <tr className="border-b-2 border-slate-800 bg-gray-800 py-4">
            <th className="rounded-tl-xl py-4">Nome</th>
            <th className="py-4">CPF</th>
            <th className="py-4">Celular</th>
            <th className="py-4">Ativo</th>
            <th className="rounded-tr-xl py-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((client) => {
            const cpfFormatted = formatCPF(client.cpf)
            const cellFormatted = formatCellNumber(client.cell)
            return (
              <tr
                key={client.id}
                className="border-b-2 border-slate-600 bg-gray-700 py-4 text-center"
              >
                <td className="py-3">{client.name}</td>
                <td className="py-3">{cpfFormatted}</td>
                <td className="py-3">{cellFormatted}</td>
                <td className="py-3">Sim</td>
                <td className="py-3">
                  <span className="flex cursor-pointer justify-center text-center duration-200 hover:scale-125 hover:text-gray-400">
                    <AiOutlineEye size={28} />
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="absolute bottom-0 flex w-full justify-between text-2xl text-gray-200">
        <span>Mostrando {filteredData.length} registros</span>
        <div className="flex gap-4">
          <button
            className="cursor-pointer duration-200 hover:text-gray-400 hover:underline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            {'<'}
          </button>
          <span className="cursor-pointer ">{page}</span>
          <button
            className="cursor-pointer duration-200 hover:text-gray-400 hover:underline"
            onClick={() => setPage(page + 1)}
            disabled={totalPages === page}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
