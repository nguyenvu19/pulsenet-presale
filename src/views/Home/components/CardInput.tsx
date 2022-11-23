import { Flex, Text } from '@pancakeswap/uikit'
import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledInput = styled.div`
  .input_value {
    width: 100%;
    height: 68px;
    background: #000000;
    border-radius: 12px;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 5px 24px;

    input {
      color: #ffffff;
      font-weight: 700;
      font-size: 20px;
      line-height: 23px;

      width: 100%;
      height: 100%;
      border: unset;
      background: transparent;

      &:hover,
      &:focus {
        border: unset;
        outline: unset;
      }
    }
  }
`

interface Props {
  labelLeft?: ReactNode
  labelRight?: ReactNode
  rightInput?: ReactNode
  placeholder?: string
}

const CardInput: React.FC<Props> = ({ labelLeft, labelRight, rightInput, placeholder, ...props }) => {
  return (
    <StyledInput>
      <Flex mb="6px" justifyContent="space-between">
        {labelLeft && (
          <Text fontSize="16px" bold>
            {labelLeft}
          </Text>
        )}
        {labelRight && (
          <Text fontSize="14px" color="#D2D2DB">
            {labelRight}
          </Text>
        )}
      </Flex>
      <div className="input_value">
        <input placeholder={placeholder} {...props} />
        <div className="right_input">{rightInput}</div>
      </div>
    </StyledInput>
  )
}

export default CardInput
