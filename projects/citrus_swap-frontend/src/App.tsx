import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import Home from './Home'
import RootLayout from './components/RootLayout'
import { WalletConnectionModal } from './components/walletConnectModal'
import { WalletContextProvider } from './context/wallet'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

const walletManager = new WalletManager({
  wallets: [WalletId.DEFLY, WalletId.PERA],
  network: NetworkId.MAINNET,
  options: {
    debug: true,
  },
})

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider manager={walletManager}>
        <RootLayout>
          <WalletContextProvider>
            <Home />
            <WalletConnectionModal />
          </WalletContextProvider>
        </RootLayout>
      </WalletProvider>
    </SnackbarProvider>
  )
}
