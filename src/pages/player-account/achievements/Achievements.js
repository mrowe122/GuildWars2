/* istanbul ignore file */
import React from 'react'
// import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
// import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { Layout } from 'providers/MainLayout'
import { withFullPageLoader } from 'components'
import config from 'config'

const Achievements = ({ groups }) => {
  return (
    <Layout>
      {({ SideNav, Content }) => (
        <SideNav>
          {groups.map(g => (
            <a key={g.id}>{g.name}</a>
          ))}
        </SideNav>
      )}
    </Layout>
  )
}

Achievements.propTypes = {
  groups: PropTypes.array
}

const AchievementsEnhancer = compose(
  fetchHocGet(`${config.gwHost}/achievements/groups?ids=all`, {
    dataProp: 'groups',
    props: ({ loading, groups = [] }) => ({ loading, groups })
  }),
  // withProps(props => console.log(props)),
  // fetchHocGet(`api/account/achievements?token=:token`, {
  //   dataProp: 'titles',
  //   props: ({ loading, achievements = [] }) => ({ loading, achievements }),
  //   variables: ({ authUser }) => ({ token: authUser.token })
  // }),
  withFullPageLoader(({ loading }) => loading)
)(Achievements)

export default AchievementsEnhancer
