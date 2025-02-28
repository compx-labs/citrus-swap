import axios from 'axios'

const API_BASE_URL = 'https://api.nf.domains'

interface SendToVaultRequestBody {
  /* Base amount (in base units of specified asset - so decimals must be considered) of asset to
  send. If multiple assets specified, amount is ignored and ALL of each are sent */
  amount: number
  /* Algorand ASA IDs to transfer (and opt-in inside vault if necessary) - use asset 0 to send
  ALGO. Specifying multiple assets means ALL of each are sent and amount is ignored. 13 is max
  assets that can be specified if they're being sent (2 for MBR payments, 2 for opt-in txns (8+4
  asset opt-ins), 12 asset transfers). If opt-in only then 64 is maximum (1 MBR per 8 assets, 8
  assets per txn * 8 txns) */
  assets: number[]
  /* Optional note to include in asset send transaction */
  note?: string
  /* Whether to only opt-in to the asset, instead of including asset transfer txn */
  optInOnly: boolean
  /* Sender of transaction, an Algorand account */
  sender: string
}

export function sendToVault(name: string, data: SendToVaultRequestBody) {
  return axios<string>({
    url: `${API_BASE_URL}/nfd/vault/sendTo/${name}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data,
  })
}
