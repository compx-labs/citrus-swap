import { useWallet, Wallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'
import { jelly } from 'ldrs'
import React, { useContext } from 'react'
import { ORA_ASSET_ID, ORA_ASSET_INFO } from '../constants'
import { WalletContext } from '../context/wallet'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

export const WalletConnectionModal: React.FC = () => {
  const { wallets, activeAccount } = useWallet()
  const { displayWalletConnectModal, setDisplayWalletConnectModal, setAlgoBalance, setOrangeBalance, setAddress } =
    useContext(WalletContext)
  const [loading, setLoading] = React.useState<boolean>(false)
  jelly.register()

  async function fetchWalletInfo(address: string) {
    console.log('Fetching wallet info for address:', address)
    const algodConfig = getAlgodConfigFromViteEnvironment()
    const algod: algosdk.Algodv2 = new algosdk.Algodv2('', algodConfig.server, algodConfig.port)
    const accountInfo = await algod.accountInformation(address).do()
    const assetBalance = await algod.accountAssetInformation(address, ORA_ASSET_ID).do()
    setAlgoBalance(accountInfo.amount / 1e6)
    setOrangeBalance(assetBalance.amount / 10 ** ORA_ASSET_INFO.params.decimals)
    setAddress(address)
  }

  async function handleOnClick(wallet: Wallet) {
    setLoading(true)
    wallet.connect().then(async () => {
      wallet.setActive()
      console.log('wallet connected', wallet)
      await fetchWalletInfo(activeAccount?.address as string).then(() => {
        setDisplayWalletConnectModal(false)
        setLoading(false)
      })
    })
  }

  return displayWalletConnectModal ? (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75"></div>
        <div className="relative z-50 w-full max-w-lg p-4">
          <div className="flex justify-center items-center  border-4 border-orange-300 transform overflow-hidden rounded-full text-left shadow-3xl transition-all bg-gradient-to-b from-lime-50 via-zinc-50 to-lime-50 dark:text-white">
            <div className="w-full p-4">
              {!loading ? (
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-4xl text-black">Connect Wallet</h3>
                  </div>

                  <div className="wallet-options flex justify-center cursor-pointer w-full h-full">
                    {/* not including exodus wallet */}
                    {wallets?.map((wallet) => (
                      <button
                        /*  whileHover={{
                          scale: 1.1,
                          transition: { type: 'tween', duration: 0.05 },
                        }}
                        whileTap={{ scale: 0.95 }} */
                        key={'wallet-' + wallet.metadata.name}
                        className="flex gap-4 p-4  transition-all justify-start items-center"
                        onClick={() => handleOnClick(wallet)}
                      >
                        <div className="">
                          <div className="rounded-full h-16 w-16 overflow-hidden bg-white">
                            <img src={wallet.metadata.icon} alt="wallet-logo" className="h-16 w-16" />
                          </div>
                          <div className="text-2xl text-black font-bold">
                            <div>{wallet.metadata.name}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center  w-full h-full">
                  <l-jelly size="100" speed="0.9" color="orange"></l-jelly>
                </div>
              )}
              {!loading && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setDisplayWalletConnectModal(false)}
                    className="text-black text-center font-barriecito text-2xl border-2 border-lime-300 rounded-full px-3 py-1 hover:bg-lime-300 hover:text-orange-400 hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
