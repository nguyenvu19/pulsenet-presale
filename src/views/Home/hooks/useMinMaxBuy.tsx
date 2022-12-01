import { useState, useEffect } from 'react'
import { useSellPullContract } from 'hooks/useContract'
import { formatBigNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const useMinMaxBuy = () => {
  const { chainId } = useActiveWeb3React()
  const [value, setValue] = useState({
    1: {
      min: undefined,
      max: undefined,
    },
    5: {
      min: undefined,
      max: undefined,
    },
    56: {
      min: undefined,
      max: undefined,
    },
    97: {
      min: undefined,
      max: undefined,
    },
  })

  const contractSellPull = useSellPullContract(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const [min, max] = await Promise.all([contractSellPull.MIN_BUY(), contractSellPull.MAX_BUY()])
        setValue((prev) => ({
          ...prev,
          [chainId]: {
            min: +formatBigNumber(min),
            max: +formatBigNumber(max),
          },
        }))
      } catch (e) {
        console.error('fetch min max error', e)
      }
    }
    getData()
  }, [chainId, contractSellPull])

  return value[chainId]
}

export default useMinMaxBuy
