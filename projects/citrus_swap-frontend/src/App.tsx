import { WalletId, WalletManager } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import Home from './Home'
import RootLayout from './components/RootLayout'
import { WalletConnectionModal } from './components/walletConnectModal'
import { WalletContextProvider } from './context/wallet'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

import { WalletProvider } from '@txnlab/use-wallet-react'

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletManager = new WalletManager({
    wallets: [WalletId.DEFLY, WalletId.PERA],
    options: {
      debug: true,
    },
  })

  return (
    <RootLayout>
      <SnackbarProvider maxSnack={3}>
        <WalletProvider manager={walletManager}>
          <WalletContextProvider>
            <Home />
            <WalletConnectionModal />
          </WalletContextProvider>
        </WalletProvider>
      </SnackbarProvider>
    </RootLayout>
  )
}
