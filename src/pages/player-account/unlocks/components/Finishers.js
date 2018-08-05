/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose, sortBy } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { withFullPageLoader } from 'components'

const Finisher = styled.div`
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primary};

  img {
    width: 64px;
    height: 64px;
    margin-right: 2rem;
    margin-left: 1rem;
  }

  span {
    position: absolute;
    left: 68px;
    bottom: 12px;
    ${({ theme }) => theme.generators.textShadow(0, 0, 7, 'rgba(0,0,0,1)', 10)};
  }
`

const Finishers = ({ finishers }) => (
  <div className="row">
    {finishers.map(f => (
      <div key={f.id} className="col-xs-4">
        <Finisher>
          <img src={f.data.icon} alt="finisher-icon" /> <span className="p1">{f.quantity && `x ${f.quantity}`}</span>
          {f.data.name}
        </Finisher>
      </div>
    ))}
  </div>
)

Finishers.propTypes = {
  finishers: PropTypes.array
}

const FinishersEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/finishers?token=:token`, {
    dataProp: 'finishers',
    props: ({ loading, finishers = [] }) => ({ loading, finishers: sortBy('data.order')(finishers) }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(({ loading }) => loading)
)(Finishers)

export default FinishersEnhancer
