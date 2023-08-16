import './globals.css'
import { ReactNode } from 'react'

import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Sistema de Gestão',
  description: 'Sistema para gestão de Estoque',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${roboto.variable} h-screen bg-slate-900 font-sans`}>
        {children}
      </body>
    </html>
  )
}
