import Home from '../views/Home'

const IndexPage = ({ pageSupportedChains }) => {
  return <Home pageSupportedChains={pageSupportedChains} />
}

IndexPage.chains = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [5, 97] : [1, 56]

export default IndexPage
