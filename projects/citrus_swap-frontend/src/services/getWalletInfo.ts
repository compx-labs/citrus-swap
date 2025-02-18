import algosdk from 'algosdk'
import { useContext } from 'react'
import { ORA_ASSET_ID, ORA_ASSET_INFO } from '../constants'
import { WalletContext } from '../context/wallet'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

export async function fetchWalletInfo(address: string): Promise<void> {
  const { setAlgoBalance, setOrangeBalance, setAddress } = useContext(WalletContext)

  console.log('Fetching wallet info for address:', address)
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algod: algosdk.Algodv2 = new algosdk.Algodv2('', algodConfig.server, algodConfig.port)
  const accountInfo = await algod.accountInformation(address).do()
  const assetBalance = await algod.accountAssetInformation(address, ORA_ASSET_ID).do()
  setAlgoBalance(accountInfo.amount / 1e6)
  setOrangeBalance(assetBalance.amount / 10 ** ORA_ASSET_INFO.params.decimals)
  setAddress(address)
}
