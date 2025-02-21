import { DeflexOrderRouterClient } from '@deflex/deflex-sdk-js'
import { ENV } from '../constants'

export const deflexRouterClient = DeflexOrderRouterClient.fetchMainnetClient(
  ENV.ALGOD_API_URL,
  '',
  '',
  '83a2c3c1-e15b-480c-9d0a-212ae70d9d57', // Deflex API key
  undefined,
  ENV.DEFLEX_API_KEY,
)
