import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import confetti from 'canvas-confetti'
import 'ldrs/bouncy'
import { useState } from 'react'
import { ASSET_INFO, ORA_ASSET_ID } from '../constants'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface TransactInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
  triggerNotification: (message: string, type: 'success' | 'error' | 'info') => void
}

const Transact = ({ openModal, setModalState, triggerNotification }: TransactInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [receiverAddress, setReceiverAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [transactionStatus, setTransactionStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [transactionMessage, setTransactionMessage] = useState('')

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const { transactionSigner, activeAddress } = useWallet()

  const resolveNFD = async (nfd: string): Promise<{ owner?: string } | null> => {
    try {
      const response = await fetch(`https://api.nf.domains/nfd/${nfd}`)
      const data = await response.json()
      return data.owner ? { owner: data.owner } : null
    } catch (error) {
      return null
    }
  }

  const handleSubmitORA = async () => {
    setLoading(true)
    setTransactionStatus('loading')
    setTransactionMessage('Sending ORA transaction...')

    if (!transactionSigner || !activeAddress) {
      triggerNotification('Please connect wallet first', 'error')
      setLoading(false)
      return
    }

    if (!receiverAddress || !amount || isNaN(Number(amount))) {
      triggerNotification('Please enter a valid address and amount', 'error')
      setLoading(false)
      return
    }

    let resolvedAddress = receiverAddress

    if (receiverAddress.endsWith('.algo')) {
      triggerNotification('Resolving NFD...', 'info')
      const nfdData = await resolveNFD(receiverAddress)
      if (!nfdData?.owner) {
        triggerNotification('Could not resolve NFD owner', 'error')
        setLoading(false)
        return
      }
      resolvedAddress = nfdData.owner
      triggerNotification(`NFD resolved to: ${resolvedAddress}`, 'info')
    }

    try {
      triggerNotification('Sending ORA transaction...', 'info')
      const amountInMicroORA = BigInt(parseFloat(amount) * 10 ** 8)

      const result = await algorand.send.assetTransfer({
        signer: transactionSigner,
        sender: activeAddress,
        receiver: resolvedAddress,
        assetId: BigInt(ORA_ASSET_ID),
        amount: amountInMicroORA,
      })

      const notificationMessage = `Transaction Sent: <a href="https://lora.algokit.io/mainnet/transaction/${result.txIds[0]}" target="_blank" rel="noopener noreferrer" style="font-weight: bold; text-decoration: underline; cursor: pointer;">Explore more</a>`

      triggerNotification(notificationMessage, 'success')

      setReceiverAddress('')
      setAmount('')
      confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.5 } })
      setTransactionStatus('success')
      setTransactionMessage('Your ORA has been sent successfully!')
      setTimeout(() => setTransactionStatus('loading'), 5000)
    } catch (e) {
      triggerNotification('Failed to send ORA', 'error')
      setTransactionStatus('error')
      setTransactionMessage('Something went wrong with the transaction.')
      setTimeout(() => setTransactionStatus('loading'), 5000)
    }

    setLoading(false)
  }

  return (
    <dialog id="transact_modal" className={`modal ${openModal ? 'modal-open' : ''}`} open={openModal}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Send ORA</h3>

        {transactionStatus === 'loading' ? (
          <div className="flex justify-center">
            <l-bouncy size="40" color="orange" />
          </div>
        ) : (
          <div className="flex justify-center">
            <l-bouncy size="40" color={transactionStatus === 'success' ? 'green' : 'red'} />
          </div>
        )}

        <p className="mt-4">{transactionMessage}</p>

        <input
          type="text"
          placeholder="Enter receiver's wallet address"
          className="input input-bordered w-full"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />

        <div className="w-full rounded-full shadow-xl bg-orange-400 flex flex-col gap-4 p-4 border-4 border-lime-300">
          <div className="flex justify-between space-x-2">
            <img
              src={`/${ASSET_INFO[Number(ORA_ASSET_ID)].params.unitName}-logo.png`}
              alt={ASSET_INFO[Number(ORA_ASSET_ID)].params.unitName}
              width={100}
              height={100}
            />
            <input
              className="w-full font-fredoka rounded-full border-4 border-lime-300 text-4xl text-orange-400 text-right px-4"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} // Handle amount input here
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="close-btn" onClick={() => setModalState(false)}>
            Close
          </button>
          <button
            className={`btn ${
              (receiverAddress.endsWith('.algo') || receiverAddress.length === 58) && amount && !isNaN(Number(amount))
                ? 'btn-orange'
                : 'btn-disabled'
            }`}
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
