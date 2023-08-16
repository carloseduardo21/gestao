'use client'

import { APIWeb } from '@/hooks/useAxios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export function FormClient() {
  const { register, handleSubmit } = useForm()
  const { push } = useRouter()

  const formSubmit = async (data: any) => {
    await APIWeb.post('/clients', data)
      .then((response) => {
        const message = response.data.message
        switch (message) {
          case 'Inválido':
            alert('Preencha pelo menos um dos campos de Email, CPF ou Celular!')
            break
          case 'Existente':
            alert('Email/CPF/Celular já está cadastrado em outro cliente!')
            break
          case 'Criado':
            alert('Cliente cadastrado com sucesso!')
            push('/clients')
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
              placeholder="name@flowbite.com"
              {...register('email', { required: false })}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="email-address-icon"
              className="mb-2 block text-base font-medium text-white"
            >
              CPF
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
                placeholder="123.123.123-12"
                {...register('cpf', { required: false })}
              />
            </div>
          </div>
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="email-address-icon"
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
              htmlFor="email-address-icon"
              className="mb-2 block text-base font-medium text-gray-200"
            >
              Data de Nascimento
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
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                  <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                </svg>
              </div>
              <input
                type="date"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder=""
                {...register('birth_date', { required: true })}
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
