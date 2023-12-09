import Head from 'next/head'
import { useEffect } from 'react'

export default function Updater() {

    useEffect(() => {
        // const initUpdate = async () => {
        //     await window?.api?.update_check()
        // }
        // initUpdate()
        
    }, [])

  return (
    <div className='flex flex-1 flex-col w-full h-[100vh] bg-gray-800'>
        <Head>
            <title>Faction Forge</title>
        </Head>
        <div className='flex flex-1 flex-col w-full'>
            <img
                src="/images/logo-white.png"
                alt="Faction Forge"
                className='h-[200px] m-auto mt-[150px]'
            />
        </div>
        <div className='flex flex-1 flex-col p-4 mt-[50px]'>
            <progress
                id='download'
                max={100}
                value={20}
            />
        </div>
    </div>
  )
}
