/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { withAchievements } from 'utils/compositions'
import { compose, uniqueId, map } from 'lodash/fp'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'

import gw2Icon from 'media/logos/guild_wars_2_icon.png'
import hofIcon from 'media/logos/heart_of_thorns_icon.png'
import pofIcon from 'media/logos/path_of_fire_icon.png'

const mapIcons = {
  GuildWars2: gw2Icon,
  HeartOfThorns: hofIcon,
  PathOfFire: pofIcon
}

const DailyEntryTemplate = ({ className, daily }) => (
  <div className={className}>
    <div>
      { daily.required_access.map(game => <img key={game} src={mapIcons[game]} />) }
    </div>
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

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

  img {
    display: block;
    margin-bottom: .4rem;
    &:last-child { margin-bottom: 0; }
  }
`

const DailyAchievementsTemplate = ({ className, data: { pve, pvp, fractals, wvw } }) => (
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

DailyAchievementsTemplate.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object
}

const DailyAchievements = styled(DailyAchievementsTemplate)`
  width: 385px;
`

const enhancer = compose(
  withAchievements
)

export default enhancer(DailyAchievements)
