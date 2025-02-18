import { createContext, useState } from 'react'

interface WalletContextType {
  algoBalance: number
  setAlgoBalance: (value: number) => void
  orangeBalance: number
  setOrangeBalance: (value: number) => void
  address: string
  setAddress: (value: string) => void
  displayWalletConnectModal: boolean
  setDisplayWalletConnectModal: (value: boolean) => void
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType)

const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [algoBalance, setAlgoBalance] = useState<number>(0)
  const [orangeBalance, setOrangeBalance] = useState<number>(0)
  const [address, setAddress] = useState<string>('')
  const [displayWalletConnectModal, setDisplayWalletConnectModal] = useState<boolean>(false)

  return (
    <WalletContext.Provider
      value={{
        algoBalance,
        setAlgoBalance,
        orangeBalance,
        setOrangeBalance,
        address,
        setAddress,

        displayWalletConnectModal,
        setDisplayWalletConnectModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export { WalletContext, WalletContextProvider }
