import { useState, useEffect } from 'react'
import { useSellPullContract } from 'hooks/useContract'
import { formatBigNumber } from 'utils/formatBalance'

export interface PackagesSellPullType {
  price: number
  totalToken: number
}

const useGetPackages = () => {
  const [packages, setPackages] = useState<PackagesSellPullType[]>([])
  const contractSellPull = useSellPullContract()

  useEffect(() => {
    const getData = async () => {
      try {
        const [package1, package2] = await Promise.all([contractSellPull.packages(1), contractSellPull.packages(2)])
        setPackages([
          {
            price: +formatBigNumber(package1.price),
            totalToken: +formatBigNumber(package1.totalToken),
          },
          {
            price: +formatBigNumber(package2.price),
            totalToken: +formatBigNumber(package2.totalToken),
          },
        ])
      } catch (e) {
        console.error(e)
      }
    }
    getData()
  }, [contractSellPull])

  return { packages }
}

export default useGetPackages
