import React from 'react'
import Link from 'next/link'
import { NavItems } from '@/components/Topbar/NavItem'
import { ProfileOptions } from '@/components/Topbar/ProfileOptions'

export default function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      display: 'Clientes',
      href: '/clients',
    },
    {
      display: 'Fornecedores',
      href: '/suppliers',
    },
    {
      display: 'Produtos',
      href: '/products',
    },
    {
      display: 'Vendas',
      href: '/sales',
    },
    {
      display: 'Compras',
      href: '/purchases',
    },
    {
      display: 'Relatórios',
      href: '/reports',
    },
    {
      display: 'Vendedores',
      href: '/sellers',
    },
  ]
  return (
    <main className="flex h-screen w-full flex-col">
      <div className="flex h-20 w-full items-center justify-between bg-slate-800 px-8 shadow-xl">
        <Link href={'/'} className="text-2xl text-gray-200">
          Sistema de Gestão
        </Link>
        <div className="flex gap-8 text-xl text-gray-100">
          {navItems.map((item) => {
            return (
              <NavItems
                key={item.href}
                display={item.display}
                href={item.href}
              />
            )
          })}
        </div>
        <>
          <ProfileOptions />
        </>
      </div>
      <div className="h-full w-full p-8">{children}</div>
    </main>
  )
}
