import { useState } from 'react'
import { Flex, Box, Text, Button, LogoWithTextIcon } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import styled from 'styled-components'
import CardInput from './CardInput'

const StyledCardRight = styled.div`
  padding: 24px;
  background: #111b1e;
  border: 1px solid #008037;
  border-radius: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 565px;
  }
  .box_head {
    width: 100%;
    height: 160px;
    margin-bottom: 24px;
    padding: 12px;
    border-radius: 16px;
    background-image: url('/images/card_right_box_head_bg.png');
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 24px;
      height: 242px;
      margin-bottom: 48px;
    }

    img {
      width: 100%;
      max-width: 100px;
      height: auto;
      object-fit: contain;
      ${({ theme }) => theme.mediaQueries.sm} {
        max-width: 140px;
      }
    }

    svg {
      width: 100%;
      max-width: 300px;
    }
  }
`
const RightInputButton = styled.div`
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

  img {
    width: 28px;
    height: 28px;
  }
`
const SubmitButtonStyled = styled(Button)`
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

export enum VIEW_CARD {
  LOCK,
  PRESALE,
}

interface Props {
  account?: string
  onConfirm: (p: any, cb?: () => void) => void
  userOutput?: any
}

const CardRight = ({ account, onConfirm, userOutput }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    if (loading) return

    // setLoading(true)
    onConfirm(() => {
      // setLoading(false)
    })
  }
  return (
    <StyledCardRight>
      <div className="box_head">
        {/* <img src="/images/card_right_box_head2.png" alt="" /> */}
        <Flex width="100%" justifyContent="center" mb="16px">
          <LogoWithTextIcon />
        </Flex>

        <Text fontSize="15px" mb="6px">
          A decentralized exchange to offer a mandatory LP lock system with in-built contract scanner and a
          user-friendly token vault with easy search-ability
        </Text>
        <Text fontSize="15px">
          An all-in-one multi-utility multi-chain Dex with farming, staking, and much more with safety at its core
        </Text>
      </div>

      <Box mb="24px">
        <CardInput
          value={userOutput}
          readOnly
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
      {/* <Flex justifyContent="center" mb="24px">
        <Text>By confirm transaction you are agree with our terms & Private Policy!</Text>
      </Flex> */}
      <Flex justifyContent="center">
        {account ? (
          <SubmitButtonStyled isLoading={loading} onClick={handleConfirm}>
            Confirm transaction
          </SubmitButtonStyled>
        ) : (
          <ConnectWalletButton />
        )}
      </Flex>
    </StyledCardRight>
  )
}

export default CardRight
