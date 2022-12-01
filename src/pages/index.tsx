import Home from '../views/Home'

const pageSupportedChains = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [5, 97] : [1, 56]

const IndexPage = () => {
  return <Home pageSupportedChains={pageSupportedChains} />
}

IndexPage.chains = pageSupportedChains

export default IndexPage
