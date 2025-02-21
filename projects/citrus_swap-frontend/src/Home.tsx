import { useWallet } from '@txnlab/use-wallet-react'
import React, { useEffect, useState } from 'react'
import { Header } from './components/header'
import Transact from './components/oraSimpleTxn'
import { Swapper } from './components/swapper'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { activeAddress } = useWallet()

  // State to control the Transact modal
  const [openTransactModal, setOpenTransactModal] = useState<boolean>(false)

  const toggleTransactModal = () => {
    setOpenTransactModal(!openTransactModal)
  }

  // Track state changes for debugging
  useEffect(() => {}, [openTransactModal])

  return (
    <div>
      <Header />

      <div className="bg-gradient-to-br from-lime-300 to-amber-400 items-center justify-items-center min-h-screen w-full ">
        <div className="flex flex-col w-full items-center bg-gradient-to-b from-orange-500 to-orange-400 p-4 shadow-xl">
          <h1 className="font-Bari text-4xl sm:text-6xl text-lime-400">Welcome to Citrus Swap</h1>
          <h2 className="font-Bari text-2xl sm:text-4xl text-lime-300">The ORA micro-DEX</h2>
        </div>
        <main className="flex flex-col gap-10 row-start-2 items-center mt-10 ">
          <Swapper />
        </main>
      </div>

      {/* Send Algo Button at Bottom Right */}
      {activeAddress && (
        <button
          onClick={(event) => {
            event.preventDefault()
            toggleTransactModal()
          }}
          className="fixed bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          🎁 Send a friend some $ORA!
        </button>
      )}

      {/* Transact Modal */}
      <Transact openModal={openTransactModal} setModalState={setOpenTransactModal} />
    </div>
  )
}

export default Home
