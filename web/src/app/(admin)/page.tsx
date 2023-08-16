export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8">
      <span className="text-4xl text-gray-200">
        Sistema para Controle de Estoque
      </span>
      <div className="mt-24 flex h-1/2 w-1/2 flex-col gap-8 text-gray-200">
        <div className="flex h-full w-full flex-row gap-8">
          <div className="flex h-full w-1/2 flex-col items-center justify-center rounded-2xl bg-slate-800">
            <p className="text-6xl">543</p>
            <p className="mt-4 text-2xl">Clientes ativos</p>
          </div>
          <div className="flex h-full w-1/2 flex-col items-center justify-center rounded-2xl bg-slate-800">
            <p className="text-6xl">10</p>
            <p className="mt-4 text-2xl">Ordens de serviço abertas</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-row gap-8">
          <div className="flex h-full w-1/2 flex-col items-center justify-center rounded-2xl bg-slate-800">
            <p className="text-6xl">+300</p>
            <p className="mt-4 text-2xl">Produtos cadastrados</p>
          </div>
          <div className="flex h-full w-1/2 flex-col items-center justify-center rounded-2xl bg-slate-800">
            <p className="text-6xl">+200</p>
            <p className="mt-4 text-2xl">
              Vendas realizadas nos ultimos 30 dias
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
