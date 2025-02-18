import { useWallet } from '@txnlab/use-wallet'
import React, { useContext, useEffect } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { WalletContext } from '../context/wallet'
import { fetchWalletInfo } from '../services/getWalletInfo'

export const WalletConnectionModal: React.FC = () => {
  const { providers, activeAccount } = useWallet()
  const { displayWalletConnectModal, setDisplayWalletConnectModal } = useContext(WalletContext)

  useEffect(() => {
    console.log('WalletConnectModal: displayWalletConnectModal', displayWalletConnectModal)
  }, [displayWalletConnectModal])

  return displayWalletConnectModal ? (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75"></div>
        <div className="relative z-50 w-full max-w-lg p-4">
          <div className="flex justify-center items-center transform overflow-hidden rounded-lg text-left shadow-xl transition-all bg-gradient-to-br from-gigas-500 to-gigas-800 dark:text-white">
            <div className="w-full p-4">
              <div className="flex justify-end">
                <RxCross1
                  className="cursor-pointer dark:text-white font-bold"
                  size={16}
                  onClick={async () => {
                    setDisplayWalletConnectModal(false)
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-2xl">Connect Wallet</h3>
              </div>

              <br />
              <div className="wallet-options flex flex-col cursor-pointer w-full h-full">
                {/* not including exodus wallet */}
                {providers?.map((provider) =>
                  provider.metadata.name === 'Exodus' ||
                  provider.metadata.name === 'AlgoSigner' ||
                  provider.metadata.name === 'MyAlgo' ? null : (
                    <div
                      key={'provider-' + provider.metadata.id}
                      className="flex gap-4 p-4 hover:bg-accent rounded-md hover:scale-101 transition-all justify-start items-center"
                      onClick={async () => {
                        console.log('WalletConnectModal: provider', provider)
                        await provider.connect()

                        console.log('WalletConnectModal: provider.isConnected', provider)
                        if (provider.isConnected) {
                          console.log('2 WalletConnectModal: provider.isConnected', provider.isConnected)
                          await fetchWalletInfo(activeAccount?.address as string).then(() => {
                            console.log('WalletConnectModal: fetchWalletInfo success')
                            setDisplayWalletConnectModal(false)
                          })
                        }
                      }}
                    >
                      <div className="rounded-full h-10 w-10 overflow-hidden bg-white">
                        <img src={provider.metadata.icon} alt="wallet-logo" className="h-10 w-10" />
                      </div>
                      <div className="text-xl font-bold">
                        <div>{provider.metadata.name}</div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
