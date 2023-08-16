'use client'

import { APIWeb } from '@/hooks/useAxios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export function FormSupplier() {
  const { register, handleSubmit } = useForm()
  const { push } = useRouter()

  const formSubmit = async (data: any) => {
    await APIWeb.post('/suppliers', data)
      .then((response) => {
        const message = response.data.message
        switch (message) {
          case 'Inválido':
            alert('Preencha pelo menos um dos campos de CNPJ ou Celular!')
            break
          case 'Existente':
            alert('CNPJ/Celular já está cadastrado em outro fornecedor!')
            break
          case 'Criado':
            alert('Fornecedor cadastrado com sucesso!')
            push('/suppliers')
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
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="cnpj-icon"
              className="mb-2 block text-base font-medium text-white"
            >
              CNPJ
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
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="12.123.123/0000-12"
                {...register('cnpj', { required: false })}
              />
            </div>
          </div>
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="cell-icon"
              className="mb-2 block text-base font-medium text-gray-200"
            >
              Celular
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
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="(35) 99999-9999"
                {...register('cell', { required: false })}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="city-icon"
              className="mb-2 block text-base font-medium text-gray-200"
            >
              Cidade
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M8 0a5 5 0 00-5 5c0 5 5 11 5 11s5-6 5-11a5 5 0 00-5-5zm0 8a3 3 0 110-6 3 3 0 010 6z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Itajubá"
                {...register('city', { required: false })}
              />
            </div>
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
