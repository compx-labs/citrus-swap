import { SnackbarProvider } from 'notistack'
import Home from './Home'
import RootLayout from './components/RootLayout'
import { WalletConnectionModal } from './components/walletConnectModal'
import { WalletContextProvider } from './context/wallet'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { LoadingModal } from './components/loadingModal'
import { LoadingContextProvider } from './context/loading'

const manager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY],
  defaultNetwork: NetworkId.MAINNET, // or just 'mainnet'
})
export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const manager = new WalletManager({
    wallets: [WalletId.PERA, WalletId.DEFLY],
    defaultNetwork: NetworkId.MAINNET, // or just 'mainnet',
    options: {
      debug: true,
    },
  })

  return (
    <RootLayout>
      <LoadingContextProvider>
        <SnackbarProvider maxSnack={3}>
          <WalletProvider manager={manager}>
            <WalletContextProvider>
              <Home />
              <LoadingModal />
              <WalletConnectionModal />
            </WalletContextProvider>
          </WalletProvider>
        </SnackbarProvider>
      </LoadingContextProvider>
    </RootLayout>
  )
}
