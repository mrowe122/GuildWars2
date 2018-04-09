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

const IconContainer = styled.div``

const RequiredTitlesTemplate = ({ className, games }) => (
  <div className={className}>
    <IconContainer>
      { games.map(game => <img key={game} src={mapIcons[game]} />) }
    </IconContainer>
  </div>
)

RequiredTitlesTemplate.propTypes = {
  className: PropTypes.string,
  games: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default styled(RequiredTitlesTemplate)`
  ${IconContainer} {
    display: inline-block;
  }
`
