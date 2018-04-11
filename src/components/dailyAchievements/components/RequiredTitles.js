import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import gw2Icon from 'media/logos/guild_wars_2_icon.png'
import hofIcon from 'media/logos/heart_of_thorns_icon.png'
import pofIcon from 'media/logos/path_of_fire_icon.png'

const mapIcons = {
  GuildWars2: gw2Icon,
  HeartOfThorns: hofIcon,
  PathOfFire: pofIcon
}

const RequiredTitlesTemplate = ({ className, games }) => (
  <div className={className}>
    <p><small>Requires</small></p>
    { games.map(game => <img key={game} src={mapIcons[game]} />) }
  </div>
)

RequiredTitlesTemplate.propTypes = {
  className: PropTypes.string,
  games: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default styled(RequiredTitlesTemplate)`
  text-align: center;
  display: inline-block;
`
