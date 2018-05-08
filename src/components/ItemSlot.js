import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import Tooltip from './Tooltip'

import emptySlot from 'media/images/empty_slot.gif'

const ItemSlotTemplate = ({ className, item, showTooltip, handleHover }) => {
  return (
    <div className={className}>
      {
        item
          ? (
            <div>
              <img src={item.data.icon} onMouseOver={handleHover} onMouseLeave={handleHover} />
              { showTooltip && <Tooltip item={item} /> }
            </div>)
          : <img src={emptySlot} />
      }
    </div>
  )
}

ItemSlotTemplate.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  showTooltip: PropTypes.bool,
  handleHover: PropTypes.func
}

const ItemSlot = styled(ItemSlotTemplate)`
  width: 50px;
  height: 50px;
  margin: 0.35rem;
  ${({ theme }) => theme.generators.boxShadow(0, 0, 7, 0, theme.colors.gray1)};

  & > div {
    position: relative;
  }

  img { width: 100%; }
`

export default compose(
  withStateHandlers(
    () => ({ showTooltip: false }),
    { handleHover: ({ showTooltip }) => () => ({ showTooltip: !showTooltip }) }
  )
)(ItemSlot)
