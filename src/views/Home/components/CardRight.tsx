import { Flex, Box, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import styled from 'styled-components'
import CardInput from './CardInput'

const StyledCardRight = styled.div`
  min-height: 565px;
  padding: 24px;
  background: #111b1e;
  border: 1px solid #008037;
  border-radius: 12px;

  .box_head {
    width: 100%;
    height: 242px;
    margin-bottom: 48px;
    border-radius: 16px;
    background-image: url('/images/card_right_box_head_bg.png');
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      max-width: 184px;
      height: auto;
      object-fit: contain;
    }
  }
`
const RightInputButton = styled.button`
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
const SubmitButtonStyled = styled.button`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  width: 100%;
  max-width: 200px;
  height: 40px;
  margin: 0 auto;
  padding: 12px 48px;
  background: #008037;
  border-radius: 12px;
  border: unset;
  white-space: nowrap;
`

export enum CARD_ACTIVE {
  LOCK,
  PRESALE,
}

interface Props {
  account?: string
}

const CardRight = ({ account }: Props) => {
  return (
    <StyledCardRight>
      <div className="box_head">
        <img src="/images/card_right_box_head.png" alt="" />
      </div>

      <Box mb="24px">
        <CardInput
          labelLeft="Amount Received"
          rightInput={
            <RightInputButton>
              <img src="/images/card_pulse_logo.png" alt="" />
              <Text>PLDX</Text>
            </RightInputButton>
          }
          placeholder="0.00"
        />
      </Box>
      <Flex justifyContent="center" mb="24px">
        <Text>By confirm transaction you are agree with our terms & Private Policy!</Text>
      </Flex>
      <Flex justifyContent="center">
        {account ? <SubmitButtonStyled>Confirm transaction</SubmitButtonStyled> : <ConnectWalletButton />}
      </Flex>
    </StyledCardRight>
  )
}

export default CardRight
