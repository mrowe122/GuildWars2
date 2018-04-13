import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withAchievements } from 'utils/compositions'
import { compose, uniqueId, map } from 'lodash/fp'
import { withState, branch, renderComponent } from 'recompose'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import RequiredTitles from './RequiredTitles'

const Loading = () => (
  <div>loading</div>
)

const DailyEntryTemplate = ({ className, daily }) => (
  <div className={className} title={daily.description}>
    <p>{map('count', daily.tiers)}</p>
    <div>
      <h3>{daily.name} <small>(levels {daily.level.min} - {daily.level.max})</small></h3>
      <em>{daily.requirement}</em>
    </div>
    <RequiredTitles games={daily.required_access} />
  </div>
)

DailyEntryTemplate.propTypes = {
  className: PropTypes.string,
  daily: PropTypes.object
}

const DailyEntry = styled(DailyEntryTemplate)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid black;

  h3 { margin-bottom: .7rem; }

  & > p:first-child {
    width: 2rem;
    text-align: center;
  }

  & > div:nth-child(2) {
    flex: 1;
    padding: 0 1rem;
  }
`

const DailyAchievementsTemplate = ({ className, loading, data: { pve, pvp, fractals, wvw } }) => {
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
          { pve.map(e => <DailyEntry key={uniqueId('pve')} daily={e} />) }
        </TabPanel>

        <TabPanel>
          { pvp.map(e => <DailyEntry key={uniqueId('pvp')} daily={e} />) }
        </TabPanel>

        <TabPanel>
          { fractals.map(e => <DailyEntry key={uniqueId('fractals')} daily={e} />) }
        </TabPanel>

        <TabPanel>
          { wvw.map(e => <DailyEntry key={uniqueId('wvw')} daily={e} />) }
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

const DailyAchievements = styled(DailyAchievementsTemplate)`
  width: 600px;

  .react-tabs__tab-panel {
    overflow: auto;
    height: 400px;
  }
`

const enhancer = compose(
  withState('api', 'setApi', ''),
  withAchievements,
  branch(
    props => props.loading,
    renderComponent(Loading)
  )
)

export default enhancer(DailyAchievements)
