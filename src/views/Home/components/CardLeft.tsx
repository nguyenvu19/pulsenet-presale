import { Flex, Text, Box } from '@pancakeswap/uikit'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import styled from 'styled-components'
import { formatBigNumber } from 'utils/formatBalance'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { ChainLogo } from 'components/Logo/ChainLogo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import PercentSelectOption from './PercentSelectOption'
import CardInput from './CardInput'

const StyledCardLeft = styled.div`
  background: #111b1e;
  border: 1px solid #008037;
  border-radius: 12px;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 565px;
  }
  .arrow_down {
    width: fit-content;
    height: fit-content;

    position: absolute;
    left: 50%;
    bottom: -44px;
    transform: translateX(-50%) rotate(90deg);
    z-index: 10;
    img {
      width: 56px;
      height: 56px;
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      top: 50%;
      left: unset;
      right: -44px;
      transform: translateY(-50%);
    }
  }
`
const StyledButtonLeft = styled.div`
  cursor: pointer;
  width: 100%;
  height: 44px;
  position: relative;
  margin: -1px 0 0 -1px;
  margin-right: -14px;
  img {
    width: 100%;
    height: 100%;
  }
  & > .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 4px 14px;
  }
`
const StyledButtonRight = styled.div`
  cursor: pointer;
  width: 100%;
  height: 44px;
  position: relative;
  margin: -1px -1px 0 0;
  margin-left: -14px;

  img {
    width: 100%;
    height: 100%;
  }
  & > .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 4px 8px;
    padding-left: 68px;
  }
`
const BoxStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  min-width: 120px;
  height: 24px;
  background: #008037;
  border-radius: 4px;

  img {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`
const CardContent = styled.div`
  padding: 24px;
  .line_space {
    width: 16px;
    height: 4px;
    background: #008037;
    margin: 0 16px;
  }
`
const RightInputButton = styled.button`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;

  width: 120px;
  height: 36px;

  background: #008037;
  border-radius: 8px;
  border: unset;
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
`
export enum CARD_ACTIVE {
  LOCK = 1,
  PRESALE = 2,
}

interface Props {
  active?: CARD_ACTIVE
  max?: number
  setViewCard: (p: CARD_ACTIVE) => void
  userInput?: string
  setUserInput?: (v: any) => void
  errorMess?: string
  onChangePercent?: (p: number) => void
}

const CardLeft = ({ active, max, setViewCard, errorMess, userInput, setUserInput, onChangePercent }: Props) => {
  const { chainId } = useActiveWeb3React()
  const native = useNativeCurrency()

  return (
    <StyledCardLeft>
      <Flex>
        <StyledButtonLeft onClick={() => setViewCard(CARD_ACTIVE.LOCK)}>
          {active === CARD_ACTIVE.LOCK ? (
            <img src="/images/card_button_left_active.png" alt="" />
          ) : (
            <img src="/images/card_button_left2.png" alt="" />
          )}
          <Flex className="content" alignItems="center">
            <Text fontSize="20px" fontWeight="600">
              Lock & Load
            </Text>
          </Flex>
        </StyledButtonLeft>
        <StyledButtonRight onClick={() => setViewCard(CARD_ACTIVE.PRESALE)}>
          {active === CARD_ACTIVE.PRESALE ? (
            <img src="/images/card_button_right_active.png" alt="" />
          ) : (
            <img src="/images/card_button_right.png" alt="" />
          )}
          <Flex className="content" alignItems="center">
            <Text fontSize="20px" fontWeight="600">
              Presale
            </Text>
          </Flex>
        </StyledButtonRight>
      </Flex>
      <CardContent>
        <Flex p={['0', , '24px']} justifyContent="center" flexDirection="column" alignItems="center">
          <Text fontSize="20px" bold mb="8px">
            Token Allocation
          </Text>
          <Flex alignItems="center" mb="24px">
            <BoxStyled>
              <img src="/images/token_bnb.png" alt="" />
              <Text style={{ whiteSpace: 'nowrap' }}>1 BNB</Text>
            </BoxStyled>
            <div className="line_space" />
            <BoxStyled>
              <Text style={{ whiteSpace: 'nowrap' }}>250,000 PULSE</Text>
            </BoxStyled>
          </Flex>
          <Text fontSize="20px" bold mb="6px">
            Vesting Plan
          </Text>
          <Text fontSize="14px" color="#D2D2DB" mb="4px">
            6 Months - 50 %
          </Text>
          <Text fontSize="14px" color="#D2D2DB" mb="4px">
            9 Months - 25 %
          </Text>
          <Text fontSize="14px" color="#D2D2DB" mb="4px">
            12 Months - 25 %
          </Text>
        </Flex>
        <Box mb="24px">
          <CardInput
            value={userInput}
            labelLeft="Payment"
            labelRight={`MAX: ${max ? max.toString().padStart(2, '0') : '-'}`}
            errorMess={errorMess}
            rightInput={
              <RightInputButton>
                {/* <img src="/images/token_bnb.png" alt="" /> */}
                <ChainLogo chainId={chainId} />
                <Text>{native?.symbol}</Text>
              </RightInputButton>
            }
            placeholder="0.00"
            onChange={(e) => setUserInput(e.target.value)}
          />
        </Box>

        <PercentSelectOption onChangePercent={onChangePercent} />
      </CardContent>
      <div className="arrow_down">
        <img src="/images/arrow_circle_down.png" alt="" />
      </div>
    </StyledCardLeft>
  )
}

export default CardLeft
