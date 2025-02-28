import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import confetti from 'canvas-confetti'
import 'ldrs/bouncy'
import { useState } from 'react'
import { sendToVault } from '../api'
import { ASSET_INFO, ORA_ASSET_ID } from '../constants'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

type TransactionsArray = ['u' | 's', string][]

function encodeNFDTransactionsArray(txnsArray: TransactionsArray): Uint8Array[] {
  return txnsArray.map(([_, txn]) => base64ToByteArray(txn))
}

function base64ToByteArray(base64Str: string): Uint8Array {
  const binaryStr = atob(base64Str)
  const byteArray = new Uint8Array(binaryStr.length)

  for (let i = 0; i < binaryStr.length; i++) {
    byteArray[i] = binaryStr.charCodeAt(i)
  }

  return byteArray
}

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

  const wallet = useWallet()
  const { activeAddress, signTransactions } = wallet

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const resolveNFD = async (nfd: string): Promise<{ depositAccount?: string; isOptedIn?: boolean } | null> => {
    try {
      const response = await fetch(`https://api.nf.domains/nfd/${nfd}`)
      const data = await response.json()

      return {
        depositAccount: data.depositAccount || null,
        isOptedIn: data.isOptedIn || false, // Check if opted in
      }
    } catch (error) {
      return null
    }
  }

  const handleSubmitORA = async () => {
    setLoading(true)
    setTransactionStatus('loading')
    setTransactionMessage('Sending ORA transaction...')

    if (!activeAddress) {
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
    let depositAccount = null
    let isOptedIn = false

    // Convert the amount entered by the user to micro ORA units (10^8)
    const amountInMicroORA = BigInt(parseFloat(amount) * 10 ** 8)

    if (receiverAddress.endsWith('.algo')) {
      triggerNotification('Resolving NFD...', 'info')
      const nfdData = await resolveNFD(receiverAddress)
      if (!nfdData?.depositAccount) {
        triggerNotification('No deposit account found for this NFD', 'error')
        setLoading(false)
        return
      }

      depositAccount = nfdData.depositAccount
      isOptedIn = nfdData?.isOptedIn ?? false

      if (isOptedIn) {
        triggerNotification(`Deposit Account found: ${depositAccount}`, 'info')
        resolvedAddress = depositAccount // If opted in, use the deposit account
      } else {
        // If not opted in, send to vault
        triggerNotification('NFD is not opted in, sending to vault...', 'info')
        resolvedAddress = receiverAddress // Use NFD_NAME if no depositAccount
      }

      triggerNotification(`NFD resolved to: ${resolvedAddress}`, 'info')
    }

    try {
      const signer = await wallet.transactionSigner // Get the signer

      // If the address is resolved to vault (from NFD_NAME)
      if (resolvedAddress === receiverAddress) {

        // Using the sendToVault function to handle the vault interaction
        const response = await sendToVault(receiverAddress, {
          sender: activeAddress,
          assets: [ORA_ASSET_ID],
          amount: Number(amountInMicroORA), // Convert to number
          optInOnly: false,
        })

        if (typeof response.data !== 'string') {
          throw new Error('Failed to fetch transactions from vault')
        }

        // Fetch and parse transactions
        const transactionsArray = JSON.parse(response.data) as TransactionsArray

        // Encode the transactions into a format that can be signed
        const encodedTxns = encodeNFDTransactionsArray(transactionsArray)

        // Sign the transactions
        const signedTransactions = await signTransactions(encodedTxns)

        // Remove null values as it does not accept them only UInt
        const validSignedTxns = signedTransactions.filter((txn) => txn !== null) as Uint8Array[]

        // Send the transactions to the network
        const transaction = await algorand.client.algod.sendRawTransaction(validSignedTxns).do()

        // Get the txn id
        const id = transaction.txid

        const notificationMessage = `Transaction Sent: <a href="https://lora.algokit.io/mainnet/transaction/${id}" target="_blank" rel="noopener noreferrer" style="font-weight: bold; text-decoration: underline; cursor: pointer;">Explore more</a>`

        triggerNotification(notificationMessage, 'success')
      } else {
        // Normal ORA transaction if vault is not used
        const result = await algorand.send.assetTransfer({
          signer,
          sender: activeAddress,
          receiver: resolvedAddress,
          assetId: BigInt(ORA_ASSET_ID),
          amount: amountInMicroORA,
        })

        const notificationMessage = `Transaction Sent: <a href="https://lora.algokit.io/mainnet/transaction/${result.txIds[0]}" target="_blank" rel="noopener noreferrer" style="font-weight: bold; text-decoration: underline; cursor: pointer;">Explore more</a>`

        triggerNotification(notificationMessage, 'success')
      }

      setReceiverAddress('')
      setAmount('')
      confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.5 } })
      setTransactionStatus('success')
      setTransactionMessage('Your ORA has been sent successfully!')
      setTimeout(() => setTransactionStatus('loading'), 5000)
    } catch (e) {
      console.error('Failed to send ORA:', e)
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
