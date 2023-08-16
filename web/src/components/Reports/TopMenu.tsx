'use client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2'

const data = [
  { name: 'Vendas' },
  { name: 'Produtos' },
  { name: 'Clientes' },
  { name: 'Fornecedores' },
  { name: 'Vendedores' },
]

export function TopMenu() {
  const [dataReport, setDataReport] = useState(data[0])
  return (
    <div className="max-w-2xl">
      <div className="relative flex w-96 flex-col">
        <span className="mb-4 text-2xl">Dados: </span>
        <Listbox value={dataReport} onChange={setDataReport}>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left text-xl shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-xl">{dataReport.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute top-24 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((report, reportIdx) => (
                <Listbox.Option
                  key={reportIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-lg ${
                      active ? 'bg-gray-800 text-gray-200' : 'text-gray-200'
                    }`
                  }
                  value={report}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {report.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-950">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
      <div>
        <span>Filtros: </span>
      </div>
    </div>
  )
}
