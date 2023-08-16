'use client'

import { generateCoupon } from '@/functions/generateCoupon'
import { APIWeb } from '@/hooks/useAxios'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IProductSale {
  id: string
  codeBar: string
  description: string
  quantity: number
  unitPrice: number
}
interface IProps {
  viewFinish: boolean
  setViewFinish: Dispatch<SetStateAction<boolean>>
  seller: string
  sellerId: string
  client: string
  clientId: string
  productsSale: Array<IProductSale>
  totalSalePrice: number
}
interface ISale {
  sale: {
    requestNumber: number
  }
}

export function SaleFinish({
  viewFinish,
  seller,
  client,
  productsSale,
  totalSalePrice,
  sellerId,
  clientId,
  setViewFinish,
}: IProps) {
  const [totalValue, setTotalValue] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [paymentType, setPaymentType] = useState<
    'money' | 'pix' | 'debt' | 'credit'
  >('money')
  const { push } = useRouter()

  async function submit() {
    let paymentMethod:
      | 'Pix'
      | 'Dinheiro'
      | 'Cartão de Crédito'
      | 'Cartão de Débito'
    switch (paymentType) {
      case 'money':
        paymentMethod = 'Dinheiro'
        break
      case 'pix':
        paymentMethod = 'Pix'
        break
      case 'debt':
        paymentMethod = 'Cartão de Débito'
        break
      case 'credit':
        paymentMethod = 'Cartão de Crédito'
        break

      default:
        paymentMethod = 'Dinheiro'
        break
    }
    const data = {
      sellerId,
      clientId,
      productsSale,
      paymentMethod: paymentType,
      discount,
      totalValue,
    }
    const response = await APIWeb.post<ISale>('/sales', data)
    console.log(response)
    if (response.status === 200) {
      const print = confirm('Deseja imprimir o cupom?')
      if (print) {
        await generateCoupon({
          numberRequest: response.data.sale.requestNumber,
          sellerName: seller,
          clientName: client,
          productsSale,
          discount,
          totalValue,
          paymentMethod,
        })
        push('/')
      } else {
        alert('Venda realizada com sucesso!')
        push('/')
      }
    } else {
      alert('Erro ao concluir a venda a venda!')
    }
  }

  useEffect(() => {
    setTotalValue(totalSalePrice - (discount / 100) * totalSalePrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount])

  if (!viewFinish) {
    return null
  }
  if (client === '' || seller === '') {
    setViewFinish(false)
    return null
  }
  return (
    <div className="absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col justify-center gap-2 rounded-xl border-2 border-gray-600 bg-gray-700 p-8 shadow-2xl ">
      <span className="text-center text-4xl font-bold text-gray-950">
        Finalizar a venda
      </span>
      <div className="mt-4 flex flex-col gap-2 text-xl text-gray-200">
        <span>Vendedor(a): {seller}</span>
        <span>Cliente: {client}</span>
        <span>Produtos: </span>
      </div>
      <ul className="rounded-xl bg-gray-800 px-8 py-4">
        {productsSale.map((product) => {
          return (
            <li key={product.id} className="text-lg text-gray-200">
              {product.description} | Quantidade: {product.quantity} | Total: R${' '}
              {Number(product.unitPrice * product.quantity).toFixed(2)}
            </li>
          )
        })}
      </ul>
      <span className="text-xl text-gray-200">
        Total: R$ {totalSalePrice.toFixed(2)}
      </span>
      <div className="flex items-center justify-start gap-4 text-xl text-gray-200">
        <span>Desconto: </span>
        <input
          className="w-1/12 rounded-xl border-none bg-gray-800 font-bold text-gray-200"
          type="number"
          value={discount}
          onChange={(e) => {
            setDiscount(Number(e.target.value))
            if (Number(e.target.value) > 100) {
              setDiscount(Number(100))
            }
            if (Number(e.target.value) < 0) {
              setDiscount(Number(0))
            }
          }}
        />
        <span>%</span>
      </div>
      <span className="text-xl text-gray-200">Metodo de pagamento: </span>
      <div className="flex flex-row items-center p-2">
        <div className="mr-4 flex items-center">
          <input
            type="radio"
            value=""
            name="inline-radio-group"
            checked={paymentType === 'money'}
            onChange={(e) => {
              if (e.target.checked) {
                setPaymentType('money')
              }
            }}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="inline-radio"
            onClick={() => {
              setPaymentType('money')
            }}
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Dinheiro
          </label>
        </div>
        <div className="mr-4 flex items-center">
          <input
            type="radio"
            value=""
            name="inline-radio-group"
            checked={paymentType === 'pix'}
            onChange={(e) => {
              if (e.target.checked) {
                setPaymentType('pix')
              }
            }}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="inline-radio"
            onClick={() => {
              setPaymentType('pix')
            }}
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Pix
          </label>
        </div>
        <div className="mr-4 flex items-center">
          <input
            type="radio"
            value=""
            name="inline-radio-group"
            checked={paymentType === 'debt'}
            onChange={(e) => {
              if (e.target.checked) {
                setPaymentType('debt')
              }
            }}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="inline-radio"
            onClick={() => {
              setPaymentType('debt')
            }}
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Cartão de Débito
          </label>
        </div>
        <div className="mr-4 flex items-center">
          <input
            type="radio"
            value=""
            checked={paymentType === 'credit'}
            onChange={(e) => {
              if (e.target.checked) {
                setPaymentType('credit')
              }
            }}
            name="inline-radio-group"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="inline-radio"
            onClick={() => {
              setPaymentType('credit')
            }}
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Cartão de Crédito
          </label>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between gap-4 text-xl text-gray-200">
        <span>Total pago: R$ {Number(totalValue).toFixed(2)}</span>
        <div className="flex gap-4">
          <button
            onClick={() => setViewFinish(false)}
            className="rounded-lg bg-gray-800 px-4 py-2 duration-200 hover:bg-gray-600"
          >
            Editar Venda
          </button>
          <button className="rounded-lg bg-gray-800 px-4 py-2 duration-200 hover:bg-gray-600">
            Cancelar Venda
          </button>
          <button
            onClick={() => submit()}
            className="rounded-lg bg-gray-800 px-4 py-2 duration-200 hover:bg-gray-600"
          >
            Concluir Venda
          </button>
        </div>
      </div>
    </div>
  )
}
