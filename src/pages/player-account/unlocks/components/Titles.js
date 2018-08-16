/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose, get } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { cleanString } from 'utils/utilities'
import { withFullPageLoader } from 'components'

const Title = styled.div`
  text-align: left;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};

  h3 {
    color: ${({ theme }) => theme.colors.primaryLight1};
    margin-bottom: 0.8rem;
  }
`

const Titles = ({ titles }) => (
  <div className="row">
    {titles.map(t => (
      <div key={t.id} className="col-xs-6">
        <Title>
          <h3>{t.name}</h3>
          <p>
            {cleanString(get('achievements[0].requirement')(t)) || cleanString(get('achievements[0].description')(t))}
          </p>
        </Title>
      </div>
    ))}
  </div>
)

Titles.propTypes = {
  titles: PropTypes.array
}

const TitlesEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/titles?token=:token`, {
    dataProp: 'titles',
    props: ({ loading, titles = [] }) => ({ loading, titles }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(({ loading }) => loading)
)(Titles)

export default TitlesEnhancer
