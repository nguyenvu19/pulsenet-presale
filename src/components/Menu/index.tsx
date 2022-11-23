import styled from 'styled-components'
import { Flex, Logo } from '@pancakeswap/uikit'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import UserMenu from './UserMenu'

const MENU_HEIGHT = 156

const WrapMenu = styled.div`
  overflow: hidden;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    padding-left: 16px;
    padding-right: 16px;

    height: ${MENU_HEIGHT - 60}px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: ${MENU_HEIGHT}px;
    }
  }
`
const InnerBody = styled.div`
  width: 100%;
  max-width: 1290px;
  margin: 0 auto;
  padding: 0 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 24px;
  }
`

const Menu = ({ children }) => {
  return (
    <WrapMenu>
      <div className="nav">
        <Flex>
          <Logo isDark href="/" />
        </Flex>
        <Flex alignItems="center" height="100%">
          <NetworkSwitcher />
          <UserMenu />
        </Flex>
      </div>
      <InnerBody>{children}</InnerBody>
    </WrapMenu>
  )
}

export default Menu
