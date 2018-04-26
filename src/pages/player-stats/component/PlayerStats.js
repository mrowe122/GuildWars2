import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withCharacters } from 'utils/compositions'

const PlayerStatsTemplate = ({ className, data }) => (
  <div className={className}>
    <h3>Your characters</h3>
    { data.map(char => <p key={char}>{char}</p>) }
  </div>
)

PlayerStatsTemplate.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
}

const PlayerStats = styled(PlayerStatsTemplate)`
`

export default compose(
  withCharacters
)(PlayerStats)
