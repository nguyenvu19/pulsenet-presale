import { useState } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { PageMeta } from 'components/Layout/Page'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CardLeft, { CARD_ACTIVE } from './components/CardLeft'
import CardRight from './components/CardRight'

const StyledHome = styled.div`
  padding-bottom: 32px;
`

const Home = () => {
  const { account } = useActiveWeb3React()
  const [viewCard, setViewCard] = useState<CARD_ACTIVE>(CARD_ACTIVE.LOCK)

  return (
    <>
      <PageMeta />
      <StyledHome>
        <Row gutter={[30, 30]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <CardLeft active={viewCard} setViewCard={setViewCard} />
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <CardRight account={account} />
          </Col>
        </Row>
      </StyledHome>
    </>
  )
}

export default Home
