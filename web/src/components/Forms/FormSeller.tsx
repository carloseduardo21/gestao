'use client'

import { APIWeb } from '@/hooks/useAxios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export function FormSeller() {
  const { register, handleSubmit } = useForm()
  const { push } = useRouter()

  const formSubmit = async (data: any) => {
    await APIWeb.post('/sellers', data)
      .then((response) => {
        const message = response.data.message
        switch (message) {
          case 'Existente':
            alert('Celular já está cadastrado em outro vendedor!')
            break
          case 'Criado':
            alert('Vendedor cadastrado com sucesso!')
            push('/sellers')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="mt-4 flex h-full w-full max-w-5xl items-center p-16">
      <form className="w-full" onSubmit={handleSubmit(formSubmit)}>
        <div className="group relative z-0 mb-3 w-full">
          <label
            htmlFor="email-address-icon"
            className="mb-2 block text-base font-medium text-gray-200"
          >
            Nome
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Joao Silva"
              {...register('name', { required: true })}
            />
          </div>
        </div>
        <div className="group relative z-0 mb-3 w-full">
          <label
            htmlFor="email-address-icon"
            className="mb-2 block text-base font-medium text-gray-200"
          >
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="email"
              className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="joao.silva@gmail.com"
              {...register('email', { required: true })}
            />
          </div>
        </div>
        <div className="group relative z-0 mb-3 w-full">
          <label
            htmlFor="cell-address-icon"
            className="mb-2 block text-base font-medium text-gray-200"
          >
            Celular
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="joao.silva@gmail.com"
              {...register('cell', { required: true })}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <button className="rounded-xl bg-blue-700 px-4 py-2 text-base font-semibold leading-relaxed text-gray-200 duration-200 hover:bg-blue-800">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}
