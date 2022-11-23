import { useState } from 'react'
import styled from 'styled-components'

const StyledPercentSelectOption = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: 14px;
  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 20px;
  }
  button {
    width: 100%;
    height: 32px;
    background: #111b1e;
    box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 2px #001015;
    border-radius: 12px;
    border: unset;
    cursor: pointer;
    &:last-child {
      color: #f98c36;
    }

    &:hover {
      background: #008037;
      box-shadow: unset;
    }

    &.active {
      background: #008037;
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      padding: 12px 24px;
      height: 43px;
    }
  }
`

interface Props {
  options?: number[]
  onSelect?: (p: number) => void
}

const defaultOptions = [25, 50, 75, 100]

const PercentSelectOption: React.FC<Props> = ({ options = defaultOptions, onSelect, ...props }) => {
  const [select, setSelect] = useState(options[0])
  const handleSelect = (num) => {
    setSelect(num)
    onSelect?.(num)
  }
  return (
    <StyledPercentSelectOption {...props}>
      {options.map((num, index) => {
        if (index < options.length - 1) {
          return (
            <button
              key={num}
              className={select === num ? 'active' : ''}
              type="button"
              onClick={() => handleSelect(num)}
            >
              {num}%
            </button>
          )
        }
        return (
          <button key={num} className={select === num ? 'active' : ''} type="button" onClick={() => handleSelect(num)}>
            MAX
          </button>
        )
      })}
    </StyledPercentSelectOption>
  )
}

export default PercentSelectOption
