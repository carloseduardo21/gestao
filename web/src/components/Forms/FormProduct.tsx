'use client'
import { APIWeb } from '@/hooks/useAxios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export function FormProduct() {
  const { register, handleSubmit } = useForm()
  const { push } = useRouter()

  const formSubmit = async (data: any) => {
    await APIWeb.post('/products', data)
      .then((response) => {
        const message = response.data.message
        switch (message) {
          case 'Inválido':
            alert(
              'Preencha pelo menos um dos campos de Codigo de Barras ou Referencia!',
            )
            break
          case 'Existente':
            alert(
              'Codigo de Barra ou Referencia já está cadastrado em outro produto!',
            )
            break
          case 'Criado':
            alert('Produto cadastrado com sucesso!')
            push('/products')
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
            htmlFor="description-icon"
            className="mb-2 block text-base font-medium text-gray-200"
          >
            Descrição
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                viewBox="0 0 640 512"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3l126.2 105.1c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Camiseta Tam P"
              {...register('description', { required: true })}
            />
          </div>
        </div>
        <div className="group relative z-0 mb-3 w-full">
          <label
            htmlFor="brand-icon"
            className="mb-2 block text-base font-medium text-gray-200"
          >
            Marca
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
              >
                <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-900  bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nike"
              {...register('brand', { required: false })}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="cost-price-icon"
              className="mb-2 block text-base font-medium text-white"
            >
              Preço de custo
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 14.915V18h-2v-1.08c-2.339-.367-3-2.002-3-2.92h2c.011.143.159 1 2 1 1.38 0 2-.585 2-1 0-.324 0-1-2-1-3.48 0-4-1.88-4-3 0-1.288 1.029-2.584 3-2.915V6.012h2v1.109c1.734.41 2.4 1.853 2.4 2.879h-1l-1 .018C13.386 9.638 13.185 9 12 9c-1.299 0-2 .516-2 1 0 .374 0 1 2 1 3.48 0 4 1.88 4 3 0 1.288-1.029 2.584-3 2.915z" />
                </svg>
              </div>
              <input
                type="text"
                pattern="^[0-9]+(,[0-9]{1,2})?$"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="77,99"
                {...register('costPrice', { required: true })}
              />
            </div>
          </div>
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="email-address-icon"
              className="mb-2 block text-base font-medium text-gray-200"
            >
              Preço de Venda
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 14.915V18h-2v-1.08c-2.339-.367-3-2.002-3-2.92h2c.011.143.159 1 2 1 1.38 0 2-.585 2-1 0-.324 0-1-2-1-3.48 0-4-1.88-4-3 0-1.288 1.029-2.584 3-2.915V6.012h2v1.109c1.734.41 2.4 1.853 2.4 2.879h-1l-1 .018C13.386 9.638 13.185 9 12 9c-1.299 0-2 .516-2 1 0 .374 0 1 2 1 3.48 0 4 1.88 4 3 0 1.288-1.029 2.584-3 2.915z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="99,99"
                {...register('salePrice', { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="cost-price-icon"
              className="mb-2 block text-base font-medium text-white"
            >
              Codigo de Barras
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zm833 0h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm321 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm126 0h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-255 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-79 64H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm257 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm256 0H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-385 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="1234567890123"
                {...register('codeBar', { required: false })}
              />
            </div>
          </div>
          <div className="group relative z-0 mb-3 w-full">
            <label
              htmlFor="email-address-icon"
              className="mb-2 block text-base font-medium text-gray-200"
            >
              Referencia
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M6 4H5a1 1 0 110-2h11V1a1 1 0 00-1-1H4a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V5a1 1 0 00-1-1h-7v8l-2-2-2 2V4z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-900 bg-gray-700 p-2.5 pl-10 text-base text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="A123456"
                {...register('refer', { required: false })}
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
              Unidade de Medida
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
              <select
                defaultValue={'UN'}
                {...register('unit', { required: true })}
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-sm text-white placeholder-gray-400 focus:border-blue-500  focus:ring-blue-500"
              >
                <option value={'BALDE'}>BALDE</option>
                <option value={'BANDEJA'}>BANDEJA</option>
                <option value={'BARRA'}>BARRA</option>
                <option value={'BLOCO'}>BLOCO</option>
                <option value={'BOBINA'}>BOBINA</option>
                <option value={'CART'}>CART</option>
                <option value={'CX'}>CX</option>
                <option value={'CX2'}>CX2</option>
                <option value={'CX3'}>CX3</option>
                <option value={'CX5'}>CX5</option>
                <option value={'CX10'}>CX10</option>
                <option value={'CX15'}>CX15</option>
                <option value={'CX20'}>CX20</option>
                <option value={'CX25'}>CX25</option>
                <option value={'CX50'}>CX50</option>
                <option value={'CX100'}>CX100</option>
                <option value={'FARDO'}>FARDO</option>
                <option value={'GRAMAS'}>GRAMAS</option>
                <option value={'KG'}>KG</option>
                <option value={'KIT'}>KIT</option>
                <option value={'LATA'}>LATA</option>
                <option value={'LITRO'}>LITRO</option>
                <option value={'M'}>M</option>
                <option value={'PACOTE'}>PACOTE</option>
                <option value={'PC'}>PC</option>
                <option value={'POTE'}>POTE</option>
                <option value={'UN'}>UN</option>
              </select>
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
