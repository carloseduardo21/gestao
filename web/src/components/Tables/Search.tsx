'use client'

import { Dispatch, SetStateAction } from 'react'

interface IProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  setPageFilter: Dispatch<SetStateAction<number>>
  placeholder: string
}

export function Search(props: IProps) {
  return (
    <div className="absolute -top-[86px] flex w-1/2 items-center justify-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative flex h-10 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => {
            props.setPageFilter(1)
            props.setValue(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
