import { ReactNode } from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

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

export enum VIEW_CARD {
  LOCK = 1,
  PRESALE = 2,
}

interface Props {
  active?: VIEW_CARD
  setViewCard: (p: VIEW_CARD) => void
  renderContent?: ReactNode
}

const CardLeft = ({ active, setViewCard, renderContent }: Props) => {
  return (
    <StyledCardLeft>
      <Flex>
        <StyledButtonLeft onClick={() => setViewCard(VIEW_CARD.LOCK)}>
          {active === VIEW_CARD.LOCK ? (
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
        <StyledButtonRight onClick={() => setViewCard(VIEW_CARD.PRESALE)}>
          {active === VIEW_CARD.PRESALE ? (
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
      {renderContent}
      <div className="arrow_down">
        <img src="/images/arrow_circle_down.png" alt="" />
      </div>
    </StyledCardLeft>
  )
}

export default CardLeft
