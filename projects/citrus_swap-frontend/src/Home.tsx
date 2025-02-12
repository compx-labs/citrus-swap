import { useWallet } from '@txnlab/use-wallet'
import React, { useState } from 'react'
import { Header } from './components/header'
import { Swapper } from './components/swapper'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => setOpenWalletModal(!openWalletModal)
  const toggleDemoModal = () => setOpenDemoModal(!openDemoModal)
  const toggleAppCallsModal = () => setAppCallsDemoModal(!appCallsDemoModal)

  return (
    <div className="">
      <Header />

      <div className="bg-gradient-to-br from-lime-300 to-amber-400 items-center justify-items-center min-h-screen w-full ">
        <div className=" flex flex-col w-full items-center  bg-gradient-to-b  from-orange-500 to-orange-400 p-4 shadow-xl">
          <h1 className="font-Bari text-4xl sm:text-6xl text-lime-400">Welcome to Citrus Swap</h1>
          <h2 className="font-Bari text-2xl sm:text-4xl text-lime-300">The ORA micro-DEX</h2>
        </div>
        <main className="flex flex-col gap-10 row-start-2 items-center mt-10 ">
          <Swapper />
        </main>

        {/* Wallet Connection UI / Transaction Demo / App Call
      <div className="flex flex-col items-center mt-10">
        <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
          Wallet Connection
        </button>

        {activeAddress && (
          <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
            Transactions Demo
          </button>
        )}

        {activeAddress && (
          <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
            Contract Interactions Demo
          </button>
        )}

        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
        <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
      </div>
      */}
      </div>
    </div>
  )
}

export default Home
