import { useCallback, useMemo, useState } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { useBalance } from 'wagmi'
import BigNumber from 'bignumber.js'
import { useSellPullContract } from 'hooks/useContract'

import useNativeCurrency from 'hooks/useNativeCurrency'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatBigNumber } from 'utils/formatBalance'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useCatchTxError from 'hooks/useCatchTxError'
import { useToast } from '@pancakeswap/uikit'
import { parseBigNumber, roundNumber } from 'library/helpers/Number'
import { useHistoryBuyPackagesByAccount } from './hooks/useHistoryBuyPackages'
import CardLeft, { VIEW_CARD } from './components/CardLeft'
import CardRight from './components/CardRight'
import useMinMaxBuy from './hooks/useMinMaxBuy'
import useGetPackages from './hooks/useGetPackages'
import CardContentPresale from './components/CardContentPresale'
import CardContentLockAndLoad from './components/CardContentLockAndLoad'

const StyledHome = styled.div`
  padding-bottom: 32px;
`

const Home = ({ pageSupportedChains }: { pageSupportedChains: number[] }) => {
  const { toastSuccess } = useToast()
  const { account, chainId } = useActiveWeb3React()

  const [viewCard, setViewCard] = useState<VIEW_CARD>(VIEW_CARD.LOCK)
  const [userInput, setUserInput] = useState('')
  const [errorMess, setErrorMess] = useState('')

  const isBSC = chainId === ChainId.BSC

  const nativeBalance = useBalance({ addressOrName: account, enabled: !isBSC })
  const { data } = useBalance({ addressOrName: account, chainId: ChainId.BSC })

  /* contract */
  const contractSellPull = useSellPullContract()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const native = useNativeCurrency()
  const { packages } = useGetPackages()
  const packageItem = useMemo(() => packages?.[viewCard - 1], [packages, viewCard])
  const { min, max } = useMinMaxBuy()

  const [historyBuyPackages, fetchHistoryBuyPackages] = useHistoryBuyPackagesByAccount({
    account,
  })

  /* Total was buy */
  const totalWasBuy = useMemo(() => {
    try {
      const totalBuy =
        historyBuyPackages &&
        historyBuyPackages.reduce((total, curr) => {
          const tt = total + parseBigNumber(curr.amountBuy)
          return tt
        }, 0)
      return roundNumber(totalBuy, { scale: 6 })
    } catch (error) {
      return 0
    }
  }, [historyBuyPackages])

  /* Max can buy */
  const maxBalanceCanBuy = useMemo(() => roundNumber(max - totalWasBuy, { scale: 4 }), [max, totalWasBuy])

  /* Handle option percent */
  const handleChangePercent = (percent) => {
    try {
      const balance = formatBigNumber(isBSC ? data?.value : nativeBalance?.data?.value)
      const valueByPercent = +((+balance * percent) / 100 - 0.005).toFixed(5)
      const maxBuy = valueByPercent > maxBalanceCanBuy ? maxBalanceCanBuy : valueByPercent
      setUserInput(roundNumber(maxBuy > 0 ? maxBuy : 0, { scale: 4 }).toString())
    } catch (error) {
      console.info(error)
    }
  }

  const detectError = (value, cbs) => {
    if (min === undefined || max === undefined) {
      setErrorMess('Error!')
      return
    }
    if (totalWasBuy === undefined) {
      setErrorMess('Error!')
      return
    }
    if (!value) {
      setErrorMess('Please enter amount')
      return
    }

    const nexTotalBuy = totalWasBuy + +value
    if (nexTotalBuy < min || nexTotalBuy > max) {
      setErrorMess(`Min: ${min} Max ${maxBalanceCanBuy} ${native?.symbol}`)
      return
    }

    const balance = formatBigNumber(isBSC ? data?.value : nativeBalance?.data?.value)
    if (+value > +balance) {
      setErrorMess(`Balance too low`)
      return
    }

    setErrorMess('')
    cbs?.()
  }

  // Buy now
  const handleConfirm = (cbs) => {
    detectError(userInput, async () => {
      const parseDecimals = new BigNumber(userInput).times(DEFAULT_TOKEN_DECIMAL).toString()
      const params = {
        fee: parseDecimals,
        packageId: viewCard,
        amount: parseDecimals,
      }

      const receipt = await fetchWithCatchTxError(() => {
        return contractSellPull.buyToken(params.packageId, params.amount, {
          value: params.fee,
        })
      })

      if (receipt?.status) {
        setUserInput('')
        cbs()
        fetchHistoryBuyPackages?.()
        toastSuccess(
          'Buy success',
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            Your funds have been success
          </ToastDescriptionWithTx>,
        )
      }
    })
  }

  const handleUserInput = (value) => {
    if (+value > 1e14) return
    detectError(value, () => null)
    setUserInput(value)
  }

  const userOutput = useMemo(() => {
    if (packageItem) {
      if (packageItem.price > 0) {
        return roundNumber(+userInput / packageItem.price)
      }
      return userInput
    }
    return undefined
  }, [packageItem, userInput])

  return (
    <StyledHome>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CardLeft
            active={viewCard}
            setViewCard={setViewCard}
            renderContent={
              viewCard === VIEW_CARD.LOCK ? (
                <CardContentLockAndLoad
                  max={maxBalanceCanBuy}
                  native={native}
                  userInput={userInput}
                  setUserInput={handleUserInput}
                  errorMess={errorMess}
                  onChangePercent={handleChangePercent}
                />
              ) : (
                <CardContentPresale
                  max={maxBalanceCanBuy}
                  userInput={userInput}
                  setUserInput={handleUserInput}
                  errorMess={errorMess}
                  onChangePercent={handleChangePercent}
                />
              )
            }
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <CardRight account={account} onConfirm={handleConfirm} userOutput={userOutput} />
        </Col>
      </Row>
    </StyledHome>
  )
}

export default Home
