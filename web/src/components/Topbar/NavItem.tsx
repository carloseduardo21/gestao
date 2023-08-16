import Link from 'next/link'

type TProps = {
  display: string
  href: string
}

export function NavItems({ display, href }: TProps) {
  return (
    <Link
      className="cursor-pointer duration-200 hover:scale-125 hover:text-gray-300"
      href={href}
    >
      {display}
    </Link>
  )
}
