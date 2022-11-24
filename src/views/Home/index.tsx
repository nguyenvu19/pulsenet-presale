import { useMemo, useState } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { useBalance } from 'wagmi'
import BigNumber from 'bignumber.js'
import { useSellPullContract } from 'hooks/useContract'

import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatBigNumber } from 'utils/formatBalance'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useCatchTxError from 'hooks/useCatchTxError'
import { useToast } from '@pancakeswap/uikit'
import { roundNumber } from 'library/helpers/Number'
import CardLeft, { VIEW_CARD } from './components/CardLeft'
import CardRight from './components/CardRight'
import useMinMaxBuy from './hooks/useMinMaxBuy'
import useGetPackages from './hooks/useGetPackages'
import CardContentPresale from './components/CardContentPresale'
import CardContentLockAndLoad from './components/CardContentLockAndLoad'

const StyledHome = styled.div`
  padding-bottom: 32px;
`

const Home = () => {
  const { toastSuccess } = useToast()
  const { account, chainId } = useActiveWeb3React()

  const [viewCard, setViewCard] = useState<VIEW_CARD>(VIEW_CARD.LOCK)
  const [userInput, setUserInput] = useState('')
  const [errorMess, setErrorMess] = useState('')

  const isBSC = chainId === ChainId.BSC

  const nativeBalance = useBalance({ addressOrName: account, enabled: !isBSC })
  const { data } = useBalance({ addressOrName: account, chainId: ChainId.BSC })

  const contractSellPull = useSellPullContract()
  const { packages } = useGetPackages()
  const { min, max } = useMinMaxBuy()

  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const handleConfirm = async (cbs) => {
    if (min === undefined || max === undefined) return
    if (!userInput) {
      setErrorMess('Please enter amount')
      return
    }

    if (+userInput < min || +userInput > max) {
      setErrorMess(`Enter input with Min: ${min} and Max: ${max}`)
      return
    }
    setErrorMess('')

    const balance = formatBigNumber(isBSC ? data?.value : nativeBalance?.data?.value)
    if (+userInput > +balance) {
      setErrorMess(`Balance are not enough`)
      return
    }

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
      toastSuccess(
        'Buy success',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Your funds have been success</ToastDescriptionWithTx>,
      )
    }
  }

  const handleChangePercent = (percent) => {
    try {
      const balance = formatBigNumber(isBSC ? data?.value : nativeBalance?.data?.value)
      setUserInput(((+balance * percent) / 100 - 0.005).toFixed(5))
    } catch (error) {
      console.info(error)
    }
  }

  const userOutput = useMemo(() => {
    const pka = packages?.[viewCard - 1]
    if (pka) {
      if (pka.price > 0) {
        return roundNumber(+userInput / pka.price)
      }
      return userInput
    }
    return undefined
  }, [packages, viewCard, userInput])

  return (
    <StyledHome>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CardLeft
            active={viewCard}
            setViewCard={setViewCard}
            renderContent={
              viewCard === VIEW_CARD.LOCK ? (
                <CardContentPresale
                  max={max}
                  userInput={userInput}
                  setUserInput={setUserInput}
                  errorMess={errorMess}
                  onChangePercent={handleChangePercent}
                />
              ) : (
                <CardContentLockAndLoad
                  max={max}
                  userInput={userInput}
                  setUserInput={setUserInput}
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
