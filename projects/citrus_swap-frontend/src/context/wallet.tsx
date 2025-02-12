import algosdk from 'algosdk'
import { createContext, useState } from 'react'
import { ORA_ASSET_ID, ORA_ASSET_INFO } from '../constants'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface WalletContextType {
  algoBalance: number
  setAlgoBalance: (value: number) => void
  orangeBalance: number
  setOrangeBalance: (value: number) => void
  address: string
  setAddress: (value: string) => void
  fetchWalletInfo: (address: string) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [algoBalance, setAlgoBalance] = useState<number>(0)
  const [orangeBalance, setOrangeBalance] = useState<number>(0)
  const [address, setAddress] = useState<string>('')

  return (
    <WalletContext.Provider
      value={{
        algoBalance,
        setAlgoBalance,
        orangeBalance,
        setOrangeBalance,
        address,
        setAddress,
        fetchWalletInfo: async (address: string) => {
          // Fetch wallet info here
          const algodConfig = getAlgodConfigFromViteEnvironment()
          const algod: algosdk.Algodv2 = new algosdk.Algodv2('', algodConfig.server, algodConfig.port)
          const accountInfo = await algod.accountInformation(address).do()
          const assetBalance = await algod.accountAssetInformation(address, ORA_ASSET_ID).do()
          setAlgoBalance(accountInfo.amount / 1e6)
          setOrangeBalance(assetBalance.amount / 10 ** ORA_ASSET_INFO.params.decimals)
          setAddress(address)
        },
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export { WalletContext, WalletContextProvider }
