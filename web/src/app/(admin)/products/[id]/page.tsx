import { UpdateProduct } from '@/components/FormUpdate/UpdateProduct'
import { APIServer } from '@/hooks/useAxios'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'

type IProduct = {
  product: {
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
}

async function getData(productId: string) {
  const response = await APIServer.get<IProduct>(`/products/${productId}`)
  return response.data
}

export default async function Page({ params }: { params: { id: string } }) {
  const { product } = await getData(params.id)
  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <Link
          href="/products"
          className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 duration-200 hover:bg-slate-700"
        >
          <AiOutlineArrowLeft size={24} />
        </Link>
        <span className="text-4xl text-gray-200">Editar o Produto</span>
        <span className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 opacity-0 duration-200 hover:bg-slate-700">
          <AiOutlineArrowLeft size={24} />
        </span>
      </div>
      <UpdateProduct product={product} />
    </div>
  )
}
