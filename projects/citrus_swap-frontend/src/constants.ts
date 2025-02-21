// src/constants.ts

// Asset IDs for ORA and ALGO
export const ORA_ASSET_ID = 1284444444
export const ALGO_ASSET_ID = 0
export const COMPX_API_URL = 'https://api-general.compx.io/api'

// ENV object to hold API URLs and keys
export const ENV = {
  ALGOD_API_URL: 'https://mainnet-api.algonode.cloud',
  DEFLEX_API_KEY: '83a2c3c1-e15b-480c-9d0a-212ae70d9d57',
}

// Asset Info interface to describe asset structure
interface AssetInfo {
  'created-at-round': number
  deleted: boolean
  index: number
  params: {
    clawback: string
    creator: string
    decimals: bigint
    defaultFrozen: boolean
    freeze: string
    manager: string
    name: string
    nameB64: string
    reserve: string
    total: number
    unitName: string
    unitNameB64: string
    url: string
    urlB64: string
  }
}

// ORA asset info
export const ORA_ASSET_INFO: AssetInfo = {
  'created-at-round': 34632901,
  deleted: false,
  index: 1284444444,
  params: {
    clawback: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    creator: 'JP3ENKDQC2BOYRMLFGKBS7RB2IVNF7VNHCFHVTRNHOENRQ6R4UN7MCNXPI',
    decimals: 8n,
    defaultFrozen: false,
    freeze: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    manager: 'JP3ENKDQC2BOYRMLFGKBS7RB2IVNF7VNHCFHVTRNHOENRQ6R4UN7MCNXPI',
    name: 'Orange',
    nameB64: 'T3Jhbmdl',
    reserve: 'JP3ENKDQC2BOYRMLFGKBS7RB2IVNF7VNHCFHVTRNHOENRQ6R4UN7MCNXPI',
    total: 400000000000000,
    unitName: 'ORA',
    unitNameB64: 'T1JB',
    url: 'ipfs://QmUitxJuPJJrcuAdAiVdEEpuzGmsELGgAvhLd5FiXRShEu#arc3',
    urlB64: 'aXBmczovL1FtVWl0eEp1UEpKcmN1QWRBaVZkRUVwdXpHbXNFTEdnQXZoTGQ1RmlYUlNoRXUjYXJjMw==',
  },
}

// ALGO asset info
export const ALGO_ASSET_INFO: AssetInfo = {
  'created-at-round': 0,
  deleted: false,
  index: 0,
  params: {
    clawback: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    creator: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    decimals: 6n,
    defaultFrozen: false,
    freeze: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    manager: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    name: 'Algorand',
    nameB64: 'T3Jhbmdl',
    reserve: 'JP3ENKDQC2BOYRMLFGKBS7RB2IVNF7VNHCFHVTRNHOENRQ6R4UN7MCNXPI',
    total: 10_000_000_000,
    unitName: 'ALGO',
    unitNameB64: '',
    url: '',
    urlB64: '',
  },
}

// Map to store Asset Info for easy lookup
export const ASSET_INFO: { [key: number]: AssetInfo } = {
  [ORA_ASSET_ID]: ORA_ASSET_INFO,
  [ALGO_ASSET_ID]: ALGO_ASSET_INFO,
}
