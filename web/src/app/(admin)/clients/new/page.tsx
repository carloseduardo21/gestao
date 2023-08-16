import Link from 'next/link'
import { FormClient } from '@/components/Forms/FormClient'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function NewClient() {
  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-between">
        <Link
          href="/clients"
          className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 duration-200 hover:bg-slate-700"
        >
          <AiOutlineArrowLeft size={24} />
        </Link>
        <span className="text-4xl text-gray-200">Novo Cliente</span>
        <span className="rounded-xl bg-slate-800 px-8 py-4 text-2xl text-gray-200 opacity-0 duration-200 hover:bg-slate-700">
          <AiOutlineArrowLeft size={24} />
        </span>
      </div>
      <FormClient />
    </div>
  )
}
