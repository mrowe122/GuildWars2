/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose } from 'recompose'
import { withConsumer } from 'context-hoc'
import { Layout } from 'providers/MainLayout'
import { fetchHocGet } from 'utils/cachedFetch'

const CurrencySlot = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 1rem;
  margin: 1rem 3rem 2rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};

  img {
    max-width: 60px;
    margin: 0.5rem 0;
  }
`

const Wallet = ({ wallet, loading }) => (
  <Layout>
    {({ Content }) => (
      <Content loading={loading}>
        <div className="row">
          {wallet.map(c => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={c.id}>
              <CurrencySlot title={c.data.description}>
                <p>{c.data.name}</p>
                <img src={c.data.icon} />
                <p>{c.value.toLocaleString()}</p>
              </CurrencySlot>
            </div>
          ))}
        </div>
      </Content>
    )}
  </Layout>
)

Wallet.propTypes = {
  wallet: PropTypes.array,
  loading: PropTypes.bool
}

const WalletEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/wallet?token=:token`, {
    dataProp: 'wallet',
    props: ({ loading, wallet = [] }) => ({ loading, wallet }),
    variables: ({ authUser }) => ({ token: authUser.token })
  })
)(Wallet)

export default WalletEnhancer
