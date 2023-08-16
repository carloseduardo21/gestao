'use client'
import { Dropdown } from 'flowbite-react'
import { DropdownHeader } from 'flowbite-react/lib/esm/components/Dropdown/DropdownHeader'
import { DropdownDivider } from 'flowbite-react/lib/esm/components/Dropdown/DropdownDivider'
import { DropdownItem } from 'flowbite-react/lib/esm/components/Dropdown/DropdownItem'
import Link from 'next/link'

export function ProfileOptions() {
  return (
    <div className="relative flex cursor-pointer items-center gap-2 text-gray-200 duration-200 hover:text-gray-400">
      <Dropdown color="transparent" size={24} label="Carlos Silva">
        <DropdownHeader>
          <p className="font-semibold">Carlos Silva</p>
          <p>carlos.eduardo.k2103@gmail.com</p>
        </DropdownHeader>
        <DropdownItem>
          <Link href="#" className="text-base">
            Home
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="#" className="text-base">
            Usuários
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="#" className="text-base">
            Configurações
          </Link>
        </DropdownItem>
        <DropdownDivider className="bg-slate-300" />
        <DropdownItem>
          <Link href="#" className="text-base">
            Sair
          </Link>
        </DropdownItem>
      </Dropdown>
    </div>
  )
}
