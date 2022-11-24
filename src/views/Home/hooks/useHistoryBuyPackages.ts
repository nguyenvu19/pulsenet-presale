import { gql } from 'graphql-request'
import { useEffect, useCallback, useState } from 'react'
import { sellPulseEthGraph } from 'utils/graphql'
import { HistoryBuyPackageType } from '../types'

export interface BuyPackagesQuery {
  total?: number
  packageId?: string
  userAddress?: string
  transactionHash?: string
  orderBy?: string
}

//
const fetchDataFromGraph = async ({ total, packageId, userAddress, transactionHash, orderBy }: BuyPackagesQuery) => {
  const whereString = `
    ${total ? `first: ${+total},` : ''}
    where: {
      ${packageId ? `packageId: "${packageId}"` : ''}
      ${userAddress ? `userAddress: "${userAddress}"` : ''}
      ${transactionHash ? `transactionHash: "${transactionHash}"` : ''}
    },
    ${orderBy ? `orderBy: ${+orderBy},` : ''}
    orderDirection: asc
  `
  try {
    const query = gql` 
      query buyPackages { 
        buyPackages(${whereString}) {
          id
          amountToken
          createdTime
          packageId
          transactionHash
          userAddress
        }
      }
    `
    const data: any = await sellPulseEthGraph.request(query)
    return { status: true, data: data?.buyPackages }
  } catch (error: any) {
    console.error('Failed to fetch BuyPackagesQuery', error)
    return { status: false, data: undefined, error }
  }
}

/**
 * History buy packages
 */
export const useHistoryBuyPackages = (
  packageId,
): [
  result: HistoryBuyPackageType[],
  fetchData: () => void,
  params: BuyPackagesQuery,
  setParams: (p: BuyPackagesQuery) => void,
] => {
  const [params, setParams] = useState<BuyPackagesQuery>({ total: 10 })
  const [result, setResult] = useState<HistoryBuyPackageType[] | undefined>()

  useEffect(() => {
    if (packageId) {
      setParams((prev) => ({
        ...prev,
        packageId,
      }))
    }
  }, [packageId])

  const fetchData = useCallback(async () => {
    if (params.userAddress && params.packageId) {
      const { data, status } = await fetchDataFromGraph(params)
      if (status) {
        setResult(data)
      }
    }
  }, [params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [result, fetchData, params, setParams]
}

/**
 * History buy packages by account
 */
export const useHistoryBuyPackagesByAccount = (
  account,
  packageId,
): [
  result: HistoryBuyPackageType[],
  fetchData: () => void,
  params: BuyPackagesQuery,
  setParams: (p: BuyPackagesQuery) => void,
] => {
  const [params, setParams] = useState<BuyPackagesQuery>({ total: 10 })
  const [result, setResult] = useState<HistoryBuyPackageType[] | undefined>()

  useEffect(() => {
    if (account && packageId) {
      setParams((prev) => ({
        ...prev,
        userAddress: account,
        packageId,
      }))
    }
  }, [account, packageId])

  const fetchData = useCallback(async () => {
    if (params.userAddress && params.packageId) {
      const { data, status } = await fetchDataFromGraph(params)
      if (status) {
        setResult(data)
      }
    }
  }, [params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [result, fetchData, params, setParams]
}
