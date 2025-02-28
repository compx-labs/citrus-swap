// src/deflex/quotes.ts

import { ALGO_ASSET_ID, ORA_ASSET_ID } from '../constants'
import { deflexRouterClient } from './client'

export async function getQuote(assetIdFrom: number, assetIdTo: number, amount: number) {
  try {
    // Use constants for ORA and ALGO as default asset IDs
    const fromAsset = assetIdFrom || ORA_ASSET_ID
    const toAsset = assetIdTo || ALGO_ASSET_ID

    // Fetch the swap quote
    const quote = await deflexRouterClient.getFixedInputSwapQuote(fromAsset, toAsset, amount)
    return quote
  } catch (error) {
    console.error('Error fetching quote:', error)
    return null
  }
}
