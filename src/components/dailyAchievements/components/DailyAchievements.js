import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withAchievements } from 'utils/HOC'
import { compose } from 'lodash/fp'
import { withState, branch, renderComponent } from 'recompose'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import RequiredTitles from './RequiredTitles'

const Loading = () => (
  <div>loading</div>
)

const DailyAchievementsTemplate = ({ className, loading, data }) => {
  console.log(data)
  return (
    <div className={className}>
      <Tabs>
        <TabList>
          <Tab>PvE</Tab>
          <Tab>PvP</Tab>
          <Tab>Fractals</Tab>
          <Tab>WvW</Tab>
        </TabList>

        <TabPanel>
          {
            data.pve.map(e => (
              <div key={e.id}>
                <p>{e.name}</p>
                <RequiredTitles games={e.required_access} />
              </div>
            ))
          }
        </TabPanel>

        <TabPanel>
          {
            data.pvp.map(e => (
              <div key={e.id}>
                <p>{e.name}</p>
                <RequiredTitles games={e.required_access} />
              </div>
            ))
          }
        </TabPanel>

        <TabPanel>
          {
            data.fractals.map(e => (
              <div key={e.id}>
                <p>{e.name}</p>
                <img src={e.icon} />
                <RequiredTitles games={e.required_access} />
              </div>
            ))
          }
        </TabPanel>

        <TabPanel>
          {
            data.wvw.map(e => (
              <div key={e.id}>
                <p>{e.name}</p>
                <RequiredTitles games={e.required_access} />
              </div>
            ))
          }
        </TabPanel>
      </Tabs>
    </div>
  )
}

DailyAchievementsTemplate.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.object
}

const DailyAchievements = styled(DailyAchievementsTemplate)``

const enhancer = compose(
  withState('api', 'setApi', ''),
  withAchievements,
  branch(
    props => props.loading,
    renderComponent(Loading)
  )
)

export default enhancer(DailyAchievements)
