import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, getOr, get } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import Tooltip from './Tooltip'

import emptySlot from 'media/images/empty_slot.gif'

const ArmorTooltip = ({ item }) => {
  return (
    <Tooltip>
      <img src={get('data.icon')(item)} /> <h4>{get('data.name')(item)}</h4>
      Defense: {get('data.details.defense')(item)}
      {
        getOr([], 'data.details.infix_upgrade.attributes')(item).map(
          a => (<p key={a.attribute}>+{a.modifier} {a.attribute}</p>)
        )
      }
      {
        getOr([], 'upgrades')(item).map((u, i) => (
          <div key={u.id + i}>
            <img src={u.icon} /> <h4>{u.name}</h4>
          </div>
        ))
      }
      <p>{get('data.rarity')(item)}</p>
      <p>{item.slot}</p>
      <p>Required Level: {get('data.level')(item)}</p>
    </Tooltip>
  )
}

const ItemSlotTemplate = ({ className, item, showTooltip, handleHover }) => {
  return (
    <div className={className}>
      {
        item
          ? (
            <div>
              <img src={item.data.icon} onMouseOver={handleHover} onMouseLeave={handleHover} />
              { showTooltip && <ArmorTooltip item={item} /> }
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

  & > div { position: relative; }
  img { width: 100%; }
  ${Tooltip} { img { width: 40px; } }
`

export default compose(
  withStateHandlers(
    () => ({ showTooltip: false }),
    { handleHover: ({ showTooltip }) => () => ({ showTooltip: !showTooltip }) }
  )
)(ItemSlot)
