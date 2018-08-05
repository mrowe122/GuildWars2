/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose, sortBy } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { withFullPageLoader } from 'components'

const Mini = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primary};

  img {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }
`

const Minis = ({ minis }) => (
  <div className="row">
    {minis.map(m => (
      <div key={m.id} className="col-xs-4">
        <Mini>
          <img src={m.icon} alt="mini-icon" /> {m.name}
        </Mini>
      </div>
    ))}
  </div>
)

Minis.propTypes = {
  minis: PropTypes.array
}

const MinisEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/minis?token=:token`, {
    dataProp: 'minis',
    props: ({ loading, minis = [] }) => ({ loading, minis: sortBy('order')(minis) }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(({ loading }) => loading)
)(Minis)

export default MinisEnhancer
