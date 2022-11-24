import {
  BIT_QUERY,
  INFO_CLIENT,
  STABLESWAP_SUBGRAPH_CLIENT,
  INFO_CLIENT_ETH,
  SELL_PULL_ETH,
  SELL_PULL_BEP20,
} from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  if (endpoint === INFO_CLIENT) {
    return {
      'X-Sf':
        process.env.NEXT_PUBLIC_SF_HEADER ||
        // hack for inject CI secret on window
        (typeof window !== 'undefined' &&
          // @ts-ignore
          window.sfHeader),
    }
  }
  return undefined
}

export const infoClient = new GraphQLClient(INFO_CLIENT, { headers: getGQLHeaders(INFO_CLIENT) })

export const infoClientETH = new GraphQLClient(INFO_CLIENT_ETH)

export const infoStableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT)

export const infoServerClient = new GraphQLClient(INFO_CLIENT, {
  headers: {
    'X-Sf': process.env.SF_HEADER,
  },
  timeout: 5000,
})

export const stableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT, {
  headers: getGQLHeaders(STABLESWAP_SUBGRAPH_CLIENT),
})

export const bitQueryServerClient = new GraphQLClient(BIT_QUERY, {
  headers: {
    // only server, no `NEXT_PUBLIC` not going to expose in client
    'X-API-KEY': process.env.BIT_QUERY_HEADER,
  },
  timeout: 5000,
})

export const sellPulseEthGraph = new GraphQLClient(SELL_PULL_ETH)
export const sellPulseBep20Graph = new GraphQLClient(SELL_PULL_BEP20)
