import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { SnackbarProvider } from 'notistack'
import Home from './Home'
import RootLayout from './components/RootLayout'
import { WalletConnectionModal } from './components/walletConnectModal'
import { WalletContextProvider } from './context/wallet'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

let providersArray: ProvidersArray

providersArray = [
  { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
  { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
]

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
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
