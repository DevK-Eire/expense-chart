
import Image from 'next/image'
import Logo from '../../../images/logo.svg'

function Balance() {
    return (
      <section className='w-[500px] bg-primary-soft-red text-white flex flex-row items-center justify-between rounded-2xl mb-3 px-8 py-5 ml-4'>
        <div className="space-y-1">
          <p className="text-slate-100">My balance</p>
          <h1 className="text-2xl font-semibold">$921.48</h1>
        </div>
        <div className="flex h-full items-center justify-center">
          <Image src={Logo} width={'63'} alt="Logo" />
        </div>
      </section>
    );
  }
  
  export default Balance;