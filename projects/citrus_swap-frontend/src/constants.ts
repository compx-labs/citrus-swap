// src/constants.ts
export const ORA_ASSET_ID = 1284444444
export const ALGO_ASSET_ID = 0
export const COMPX_API_URL = 'https://api.compx.io/api'

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

export const ASSET_INFO: { [key: number]: AssetInfo } = {
  [ORA_ASSET_ID]: ORA_ASSET_INFO,
  [ALGO_ASSET_ID]: ALGO_ASSET_INFO,
}
