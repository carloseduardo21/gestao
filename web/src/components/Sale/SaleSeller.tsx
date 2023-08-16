'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { formatCellNumber } from '@/functions/formatStrings'

interface IData {
  id: string
  name: string
  cell: string
}

interface IProps {
  sellers: IData[]
  setSellerName: Dispatch<SetStateAction<string>>
  setSellerId: Dispatch<SetStateAction<string>>
}

export function SaleSeller({ sellers, setSellerId, setSellerName }: IProps) {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IData[]>([])
  const [view, setView] = useState(false)

  useEffect(() => {
    if (searchText.length <= 3) {
      return setFilteredData([])
    } else {
      const searchData = sellers.filter((seller) => {
        return seller.name.toLowerCase().match(searchText.toLowerCase())
      })
      setFilteredData(searchData.slice(0, 4))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  return (
    <div className="rounded-lg border border-slate-700 p-4">
      <div className="group relative w-full">
        <span className="mb-2 block text-base font-medium text-gray-200">
          Vendedor
        </span>
        <div
          className="relative flex flex-col"
          onBlur={() => {
            if (searchText.length <= 3) {
              setSearchText('')
            }
          }}
        >
          <input
            type="text"
            value={searchText}
            name="seller"
            onChange={(e) => setSearchText(e.target.value)}
            onFocusCapture={() => setView(true)}
            placeholder="Digite o nome do vendedor para procurar..."
            className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="absolute top-12 z-50 flex w-full flex-col rounded-lg bg-slate-800">
            {view
              ? searchText.length <= 3
                ? null
                : filteredData.map((seller) => (
                    <span
                      className="flex cursor-pointer border-b-[1px] border-b-gray-950 p-2.5 text-gray-200 duration-200 hover:bg-gray-700"
                      key={seller.id}
                      onClick={(e) => {
                        setSellerId(seller.id)
                        setSearchText(seller.name)
                        setSellerName(seller.name)
                        setView(false)
                      }}
                    >
                      {seller.name} | {formatCellNumber(seller.cell)}
                    </span>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}
