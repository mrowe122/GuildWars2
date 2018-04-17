import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import { DailyAchievements } from 'components'
import UpdateIcon from 'mdi-react/UpdateIcon'

const DailyHeaderTemplate = ({ className, dropdown, toggleDropdown }) => {
  return (
    <div className={className}>
      <UpdateIcon onClick={toggleDropdown} />
      {
        dropdown && (
          <DailyAchievements />
        )
      }
    </div>
  )
}

DailyHeaderTemplate.propTypes = {
  className: PropTypes.string,
  dropdown: PropTypes.bool,
  toggleDropdown: PropTypes.func
}

const DailyHeader = styled(DailyHeaderTemplate)`
  position: relative;

  & > div {
    position: absolute;
    right: 0;
  }
`

export default compose(
  withStateHandlers(() => ({ dropdown: true }), {
    toggleDropdown: ({ dropdown }) => () => ({ dropdown: !dropdown })
  })
)(DailyHeader)
