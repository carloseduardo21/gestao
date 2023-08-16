'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { IoAddOutline } from 'react-icons/io5'

interface IProductSale {
  id: string
  codeBar: string
  description: string
  quantity: number
  unitPrice: number
}
interface IData {
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
  productsSale: IProductSale[]
  setProductsSale: Dispatch<SetStateAction<Array<IProductSale>>>
  products: IData[]
  setTotalSalePrice: Dispatch<SetStateAction<number>>
}

export function SaleProducts({
  productsSale,
  setProductsSale,
  products,
  setTotalSalePrice,
}: IProps) {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IData[]>([])
  const [view, setView] = useState(false)
  const [productId, setProductId] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productCodeBar, setProductCodeBar] = useState('')
  const [productSalePrice, setProductSalePrice] = useState(0)
  const [productQuantity, setProductQuantity] = useState(0)
  const [maxQuantity, setMaxQuantity] = useState(0)

  useEffect(() => {
    if (searchText.length <= 1) {
      return setFilteredData([])
    } else {
      const searchData = products.filter((product) => {
        return (
          product.description.toLowerCase().match(searchText.toLowerCase()) ||
          product.codeBar.toLowerCase().match(searchText.toLowerCase()) ||
          product.refer.toLowerCase().match(searchText.toLowerCase())
        )
      })
      setFilteredData(searchData.slice(0, 4))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  useEffect(() => {
    const value = productsSale.reduce(
      (total, current) =>
        (total = total + current.quantity * current.unitPrice),
      0,
    )
    setTotalSalePrice(Number(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsSale])

  return (
    <div className="flex h-72 flex-col items-center justify-between rounded-lg border border-slate-700 px-8 py-4">
      <ul
        className="w-full divide-y divide-gray-700 overflow-x-hidden overflow-y-scroll"
        style={{ height: '80%' }}
      >
        {productsSale.map((product) => {
          return (
            <li className="py-2 pr-2 sm:pb-4" key={product.id}>
              <div className="flex items-center gap-8">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {product.description}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    R$ {Number(product.unitPrice).toFixed(2)}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                  {product.quantity}
                </div>
                <div className="inline-flex w-36 items-center justify-end text-base font-semibold text-white">
                  R$ {Number(product.unitPrice * product.quantity).toFixed(2)}
                </div>
                <div
                  className="flex cursor-pointer items-center justify-center text-gray-200 duration-200 hover:scale-125 hover:text-gray-400"
                  onClick={() => {
                    setProductsSale((current) => [
                      ...current.filter((e) => e.id !== product.id),
                    ])
                  }}
                >
                  <BsFillTrashFill size={24} />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <div
        className="relative flex items-center justify-between gap-4"
        onBlur={() => {
          if (searchText.length <= 1) {
            setSearchText('')
            setProductId('')
            setProductSalePrice(0)
          }
        }}
      >
        <div className="w-full">
          <input
            type="text"
            value={searchText}
            name="product"
            onChange={(e) => setSearchText(e.target.value)}
            onFocusCapture={() => setView(true)}
            placeholder="Digite descrição, código de barras ou referencia..."
            className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="absolute top-12 z-50 flex w-full flex-col rounded-lg bg-slate-800">
            {view
              ? searchText.length <= 1
                ? null
                : filteredData.map((product) => (
                    <span
                      className="flex cursor-pointer border-b-[1px] border-b-gray-950 p-2.5 text-gray-200 duration-200 hover:bg-gray-700"
                      key={product.id}
                      onClick={(e) => {
                        setSearchText(product.description)
                        setProductId(product.id)
                        setProductCodeBar(product.codeBar)
                        setProductSalePrice(Number(product.salePrice))
                        setProductDescription(product.description)
                        setMaxQuantity(product.Stock[0].current)
                        setView(false)
                      }}
                    >
                      {product.description} | R${' '}
                      {Number(product.salePrice).toFixed(2)} |{' '}
                      {product.Stock[0].current}
                    </span>
                  ))
              : null}
          </div>
        </div>
        <div className="flex w-1/3 items-center justify-end gap-4">
          <span className="block text-base font-medium text-gray-200">
            Quantidade
          </span>
          <div className="relative flex h-10 w-1/3 flex-row justify-center rounded-lg border border-gray-900 bg-gray-700 text-gray-200 duration-200">
            <button
              className=" h-full w-20 cursor-pointer rounded-l outline-none duration-150 hover:bg-gray-800 hover:text-gray-400"
              onClick={() =>
                productQuantity === 0
                  ? null
                  : setProductQuantity(productQuantity - 1)
              }
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              className="text-md flex w-full items-center bg-gray-700 text-center font-semibold text-gray-200 outline-none"
              name="custom-input-number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(Number(productQuantity))}
              readOnly
              min={0}
            />
            <button
              className="h-full w-20 cursor-pointer rounded-r hover:bg-gray-800 hover:text-gray-400"
              onClick={() =>
                productQuantity === maxQuantity
                  ? null
                  : setProductQuantity(productQuantity + 1)
              }
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
          <button
            className="flex cursor-pointer justify-center text-center text-gray-200 duration-200 hover:scale-125 hover:text-gray-400"
            onClick={() => {
              if (
                productId !== '' &&
                productQuantity !== 0 &&
                maxQuantity >= productQuantity
              ) {
                setProductsSale((current) => [
                  ...current,
                  {
                    id: productId,
                    codeBar: productCodeBar,
                    unitPrice: productSalePrice,
                    quantity: productQuantity,
                    description: productDescription,
                  },
                ])
                setProductId('')
                setProductDescription('')
                setProductCodeBar('')
                setProductSalePrice(0)
                setProductQuantity(0)
                setMaxQuantity(0)
                setSearchText('')
              }
            }}
          >
            <IoAddOutline size={28} />
          </button>
        </div>
      </div>
    </div>
  )
}
