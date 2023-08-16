'use client'

import { Dispatch, SetStateAction } from 'react'

interface IProps {
  clientName: string
  sellerName: string
  totalSalePrice: number
  setViewFinish: Dispatch<SetStateAction<boolean>>
}

export function SaleFooter({
  clientName,
  sellerName,
  totalSalePrice,
  setViewFinish,
}: IProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-slate-700 p-4 text-gray-200">
      <div className="flex justify-between">
        <span>Vendedor: {sellerName}</span>
        <span>Total: R$ {totalSalePrice.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Cliente: {clientName}</span>
        <div className="flex gap-4">
          <button className="rounded-xl bg-slate-800 px-4 py-2 text-gray-200 duration-200 hover:bg-slate-700">
            Orçamento
          </button>
          <button
            onClick={() => setViewFinish(true)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-gray-200 duration-200 hover:bg-slate-700"
          >
            Concluir venda
          </button>
        </div>
      </div>
    </div>
  )
}
