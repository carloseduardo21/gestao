'use client'

import { Dispatch, SetStateAction } from 'react'

interface IProps {
  setSaleType: Dispatch<SetStateAction<boolean>>
}

export function SaleInfo({ setSaleType }: IProps) {
  return (
    <div className="flex rounded-lg border border-slate-700 p-4">
      <div className="mr-4 flex items-center">
        <input
          onChange={() => setSaleType(true)}
          type="radio"
          value=""
          name="inline-radio-group"
          defaultChecked
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
        <span className="ml-2 text-sm font-medium text-gray-300">À vista</span>
      </div>
      <div className="mr-4 flex items-center">
        <input
          onChange={() => setSaleType(false)}
          type="radio"
          value=""
          name="inline-radio-group"
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
        <span className="ml-2 text-sm font-medium text-gray-300">À prazo</span>
      </div>
    </div>
  )
}
