import Image from 'next/image'
import BarChart from '../app/components/BarChart/page'
import Balance from './components/Balance/page'

export default function Home() {
  return (
    <main className="flex flex-col bg-neutral-cream h-screen items-center justify-center space-x-4 space-y-3">
      
      <Balance />
      
      
      <BarChart />
      
      
      
    </main>
  )
}
