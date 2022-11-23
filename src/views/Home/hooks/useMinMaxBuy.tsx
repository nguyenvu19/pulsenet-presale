import { useState, useEffect } from 'react'
import { useSellPullContract } from 'hooks/useContract'
import { formatBigNumber } from 'utils/formatBalance'

const useMinMaxBuy = () => {
  const [value, setValue] = useState({
    min: undefined,
    max: undefined,
  })
  const contractSellPull = useSellPullContract()

  useEffect(() => {
    const getData = async () => {
      try {
        const [min, max] = await Promise.all([contractSellPull.MIN_BUY(), contractSellPull.MAX_BUY()])
        setValue({
          min: +formatBigNumber(min),
          max: +formatBigNumber(max),
        })
      } catch (e) {
        console.error(e)
      }
    }
    getData()
  }, [contractSellPull])

  return value
}

export default useMinMaxBuy
