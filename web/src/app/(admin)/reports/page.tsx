import { TopMenu } from '@/components/Reports/TopMenu'

export default function Reports() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 text-gray-200">
      <span className="text-center text-4xl font-bold">Relatórios</span>
      <TopMenu />
      <table>
        <thead></thead>
      </table>
    </div>
  )
}
