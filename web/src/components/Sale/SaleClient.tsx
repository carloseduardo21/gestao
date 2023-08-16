'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { format } from 'date-fns'

interface IData {
  id: string
  name: string
  email: string
  cpf: string
  cell: string
  birth_date: Date
}

interface IProps {
  clients: IData[]
  typeSale: boolean
  setClientName: Dispatch<SetStateAction<string>>
  setClientId: Dispatch<SetStateAction<string>>
}

export function SaleClient({
  clients,
  typeSale,
  setClientId,
  setClientName,
}: IProps) {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IData[]>([])
  const [view, setView] = useState(false)

  useEffect(() => {
    setClientId('')
    setClientName('')
    setSearchText('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSale])

  useEffect(() => {
    if (!typeSale) {
      if (searchText.length <= 3) {
        return setFilteredData([])
      } else {
        const searchData = clients.filter((client) => {
          return (
            client.name.toLowerCase().match(searchText.toLowerCase()) ||
            client.email?.toLowerCase().match(searchText.toLowerCase()) ||
            client.cpf?.toLowerCase().match(searchText.toLowerCase()) ||
            client.cell?.toLowerCase().match(searchText.toLowerCase())
          )
        })
        setFilteredData(searchData.slice(0, 4))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  if (typeSale) {
    return (
      <div className="rounded-lg border border-slate-700 p-4">
        <div className="group relative w-full">
          <span className="mb-2 block text-base font-medium text-gray-200">
            Cliente
          </span>
          <div
            className="relative flex flex-col"
            onBlur={() => {
              if (searchText.length <= 3) {
                setSearchText('')
                setClientId('')
                setClientName('')
              }
            }}
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
                setClientName(e.target.value)
              }}
              name="client"
              onFocusCapture={() => setView(true)}
              placeholder="Digite o nome do cliente"
              className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-700 p-4">
      <div className="group relative w-full">
        <label
          htmlFor="name-icon"
          className="mb-2 block text-base font-medium text-gray-200"
        >
          Cliente
        </label>
        <div
          className="relative flex flex-col"
          onBlur={() => {
            if (searchText.length <= 3) {
              setSearchText('')
              setClientName('')
              setClientId('')
            }
          }}
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocusCapture={() => setView(true)}
            placeholder="Digite o nome, cpf, email ou celular do cliente para procurar..."
            className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="absolute top-12 z-50 flex w-full flex-col rounded-lg bg-slate-800">
            {view
              ? searchText.length <= 3
                ? null
                : filteredData.map((client) => (
                    <span
                      className="flex cursor-pointer border-b-[1px] border-b-gray-950 p-2.5 text-gray-200 duration-200 hover:bg-gray-700"
                      key={client.id}
                      onClick={(e) => {
                        setSearchText(client.name)
                        setClientId(client.id)
                        setClientName(client.name)
                        setView(false)
                      }}
                    >
                      {client.name} | {client.cpf} |{' '}
                      {format(new Date(client.birth_date), 'dd/MM/yyyy')}
                    </span>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}
