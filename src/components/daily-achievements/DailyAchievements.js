import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withAchievements } from 'utils/compositions'
import { compose, uniqueId, map } from 'lodash/fp'
import { branch, renderComponent } from 'recompose'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import RequiredTitles from './RequiredTitles'

const Loading = () => <div />

const DailyEntryTemplate = ({ className, daily }) => (
  <div className={className}>
    <RequiredTitles games={daily.required_access} />
    <div>
      <h4>{daily.name}</h4>
      <em>(levels {daily.level.min} - {daily.level.max})<br />{daily.requirement}</em>
    </div>
    <p>{map('count', daily.tiers)}</p>
  </div>
)

DailyEntryTemplate.propTypes = {
  className: PropTypes.string,
  daily: PropTypes.object
}

const DailyEntry = styled(DailyEntryTemplate)`
  display: flex;
  align-items: center;
  padding: 0.5rem .7rem;
  border-bottom: 1px solid black;

  h4 {
    font-weight: bold;
    margin-bottom: .7rem;
  }

  & > p {
    width: 2rem;
    text-align: center;
  }

  & > div:nth-child(2) {
    flex: 1;
    padding: 0 .7rem;
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
  width: 385px;
`

const enhancer = compose(
  withAchievements,
  branch(
    props => props.loading,
    renderComponent(Loading)
  )
)

export default enhancer(DailyAchievements)
