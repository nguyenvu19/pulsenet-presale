import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <PageMeta />
      <StyledHeroSection>
        <button>a123123</button>
      </StyledHeroSection>
    </>
  )
}

export default Home
