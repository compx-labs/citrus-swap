import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface TransactInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const ASSET_ID = BigInt(1284444444) // mainnet: 1284444444 testnet: 513945448

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [receiverAddress, setReceiverAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('') // User input for amount

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const { enqueueSnackbar } = useSnackbar()
  const { signer, activeAddress } = useWallet()

  const handleSubmitORA = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }

    if (!receiverAddress || !amount || isNaN(Number(amount))) {
      enqueueSnackbar('Please enter a valid address and amount', { variant: 'error' })
      setLoading(false)
      return
    }

    try {
      enqueueSnackbar('Sending ORA transaction...', { variant: 'info' })

      // Convert amount (in ORA) to micro-ORA (1 ORA = 10^8 micro-ORA)
      const amountInMicroORA = BigInt(parseFloat(amount) * 10 ** 8) // NOTE 10^6 for testnet ORA 6 decimals

      const result = await algorand.send.assetTransfer({
        signer: signer,
        sender: activeAddress,
        receiver: receiverAddress,
        assetId: ASSET_ID,
        amount: amountInMicroORA,
      })

      enqueueSnackbar(`Transaction sent: ${result.txIds[0]}`, { variant: 'success' })
      setReceiverAddress('')
      setAmount('') // Reset input fields
    } catch (e) {
      enqueueSnackbar('Failed to send ORA', { variant: 'error' })
    }

    setLoading(false)
  }

  return (
    <dialog id="transact_modal" className={`modal ${openModal ? 'modal-open' : ''}`} open={openModal}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Send ORA</h3>

        <input
          type="text"
          placeholder="Enter receiver's wallet address"
          className="input input-bordered w-full"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount (ORA)"
          className="input input-bordered w-full mt-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.1"
        />

        <div className="modal-action">
          <button className="close-btn" onClick={() => setModalState(false)}>
            Close
          </button>
          <button
            className={`btn ${receiverAddress.length === 58 && amount ? '' : 'btn-disabled'}`}
            onClick={(e) => {
              e.preventDefault()
              handleSubmitORA()
            }}
          >
            {loading ? <span className="loading loading-spinner" /> : 'Send ORA'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default Transact
