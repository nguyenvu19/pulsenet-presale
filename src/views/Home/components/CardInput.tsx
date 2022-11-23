import { Flex, Text } from '@pancakeswap/uikit'
import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  .input_value {
    width: 100%;
    height: 56px;
    background: #000000;
    border-radius: 12px;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 3px 12px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 68px;
      padding: 5px 24px;
    }
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
  .error_message {
    position: absolute;
    top: 100%;
    left: 0;
  }
`

interface Props {
  labelLeft?: ReactNode
  labelRight?: ReactNode
  rightInput?: ReactNode
  errorMess?: string
  placeholder?: string
  [t: string]: any
}

const CardInput: React.FC<Props> = ({ labelLeft, labelRight, rightInput, errorMess, placeholder, ...props }) => {
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
      {errorMess && (
        <Text className="error_message" color="red" fontSize="14px">
          {errorMess}
        </Text>
      )}
    </StyledInput>
  )
}

export default CardInput
