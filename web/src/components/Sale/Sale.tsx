'use client'

import { useState } from 'react'
import { SaleFooter } from './Footer'
import { SaleClient } from './SaleClient'
import { SaleInfo } from './SaleInfo'
import { SaleSeller } from './SaleSeller'
import { SaleProducts } from './SaleProducts'
import { SaleFinish } from './SaleFinish'

interface IClients {
  id: string
  name: string
  email: string
  cpf: string
  cell: string
  birth_date: Date
}
interface ISellers {
  id: string
  name: string
  cell: string
}
interface IProducts {
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
interface IProps {
  clients: IClients[]
  sellers: ISellers[]
  products: IProducts[]
}
interface IProductSale {
  id: string
  codeBar: string
  description: string
  quantity: number
  unitPrice: number
}

export function Sale(props: IProps) {
  const [typeSale, setTypeSale] = useState(true) // true -> A vista : false -> A prazo
  const [clientName, setClientName] = useState('')
  const [clientId, setClientId] = useState('')
  const [sellerId, setSellerId] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [productsSale, setProductsSale] = useState<IProductSale[]>([])
  const [totalSalePrice, setTotalSalePrice] = useState(0)
  const [viewFinish, setViewFinish] = useState(false)

  return (
    <div className="mb-4 mt-8 flex h-full w-full max-w-3xl flex-col items-center justify-between gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <span className="mb-2 text-center text-4xl text-gray-200">
          Tela de venda
        </span>
        <SaleSeller
          setSellerId={setSellerId}
          setSellerName={setSellerName}
          sellers={props.sellers}
        />
        <SaleInfo setSaleType={setTypeSale} />
        <SaleClient
          setClientId={setClientId}
          setClientName={setClientName}
          typeSale={typeSale}
          clients={props.clients}
        />
        <SaleProducts
          productsSale={productsSale}
          setProductsSale={setProductsSale}
          products={props.products}
          setTotalSalePrice={setTotalSalePrice}
        />
        <SaleFooter
          clientName={clientName}
          sellerName={sellerName}
          totalSalePrice={totalSalePrice}
          setViewFinish={setViewFinish}
        />
        <SaleFinish
          totalSalePrice={totalSalePrice}
          productsSale={productsSale}
          client={clientName}
          clientId={clientId}
          seller={sellerName}
          sellerId={sellerId}
          viewFinish={viewFinish}
          setViewFinish={setViewFinish}
        />
      </div>
    </div>
  )
}
