import { Flex, Text, Box } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { ChainLogo } from 'components/Logo/ChainLogo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import PercentSelectOption from './PercentSelectOption'
import CardInput from './CardInput'

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
export enum VIEW_CARD {
  LOCK = 1,
  PRESALE = 2,
}

interface Props {
  max?: number
  userInput?: string
  setUserInput?: (v: any) => void
  errorMess?: string
  onChangePercent?: (p: number) => void
}

const CardContentLockAndLoad = ({ max, errorMess, userInput, setUserInput, onChangePercent }: Props) => {
  const { chainId } = useActiveWeb3React()
  const native = useNativeCurrency()
  return (
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
        <Text fontSize="14px" color="#D2D2DB" mb="5px">
          TGE - 100 %
        </Text>
        <Text fontSize="14px" color="#D2D2DB" mb="5px">
          9 Months - 25 %
        </Text>
        <Text fontSize="14px" color="#D2D2DB" mb="5px">
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
  )
}

export default CardContentLockAndLoad