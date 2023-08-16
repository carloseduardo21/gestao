'use client'
import Link from 'next/link'
import { Search } from './Search'
import { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'

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

type IProps = {
  data: IProducts[]
}

function Paginator(items: IProducts[], page: number, perPage: number) {
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

export function TableProducts(props: IProps) {
  const [filter, setFilter] = useState('')
  const [filteredData, setFilteredData] = useState<IProducts[]>(props.data)
  const [data, setData] = useState<IProducts[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  if (props.data.length < 0) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (filter === '') {
      setFilteredData(props.data)
    } else {
      setFilteredData(
        props.data.filter((product) => {
          return (
            product.description?.toLowerCase().match(filter.toLowerCase()) ||
            product.brand?.toLowerCase().match(filter.toLowerCase()) ||
            product.codeBar?.toLowerCase().match(filter.toLowerCase()) ||
            product.refer?.toLowerCase().match(filter.toLowerCase())
          )
        }),
      )
    }

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
        placeholder="Busque pela Descrição, Marca, Codigo de Barras, Referencia..."
        value={filter}
        setValue={setFilter}
        setPageFilter={setPage}
      />
      <table className="w-full text-xl text-gray-200">
        <thead>
          <tr className="border-b-2 border-slate-800 bg-gray-800 py-4">
            <th className="rounded-tl-xl py-4">Descrição</th>
            <th className="py-4">Quantidade</th>
            <th className="py-4">Unidade</th>
            <th className="py-4">Preço de Venda</th>
            <th className="rounded-tr-xl py-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => {
            const current =
              product.Stock.length > 0 ? product.Stock[0].current : 0
            return (
              <tr
                key={product.id}
                className="border-b-2 border-slate-600 bg-gray-700 py-4 text-center"
              >
                <td className="py-3">{product.description}</td>
                <td className="py-3">{current}</td>
                <td className="py-3">{product.unit}</td>
                <td className="py-3">
                  R$ {Number(product.salePrice).toFixed(2)}
                </td>
                <td className="py-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex cursor-pointer justify-center text-center duration-200 hover:scale-125 hover:text-gray-400"
                  >
                    <AiOutlineEye size={28} />
                  </Link>
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
