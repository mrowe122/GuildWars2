import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, get } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import { Slot } from 'utils/constants'
import { Tooltip } from './Tooltip'
import { IconTitle, Attributes, Upgrades, Infusions, ItemInfo, ItemSkin } from './Tooltip/components'

import emptySlot from 'media/images/empty_slot.gif'

const ArmorTooltip = ({ item }) => (
  <Tooltip item={item}>
    <IconTitle />
    <p>Defense: <span className='Masterwork'>{get('data.details.defense')(item)}</span></p>
    <Attributes />
    <Upgrades />
    <Infusions />
    <ItemSkin />
    <ItemInfo />
  </Tooltip>
)

ArmorTooltip.propTypes = {
  item: PropTypes.object
}

const WeaponTooltip = ({ item }) => (
  <Tooltip item={item}>
    <IconTitle weapon />
    <p>Weapon Strength: <span className='Masterwork'>{get('data.details.min_power')(item)} - {get('data.details.max_power')(item)}</span></p>
    <Attributes />
    <Upgrades />
    <Infusions />
    <ItemSkin />
    <ItemInfo />
  </Tooltip>
)

WeaponTooltip.propTypes = {
  item: PropTypes.object
}

const UtilityTooltip = ({ item }) => (
  <Tooltip item={item} position='left'>
    <IconTitle />
    <Attributes />
    <Upgrades />
    <Infusions />
    <ItemSkin />
    <ItemInfo />
  </Tooltip>
)

UtilityTooltip.propTypes = {
  item: PropTypes.object
}

const GatheringTooltip = ({ item }) => (
  <Tooltip item={item} position='left'>
    <IconTitle />
    <Upgrades />
    <p className='p2'>{get('data.description')(item)}</p>
    <p className='p2'>{Slot[item.binding]}</p>
  </Tooltip>
)

GatheringTooltip.propTypes = {
  item: PropTypes.object
}

const ItemSlotTemplate = ({ className, item, showTooltip, handleHover }) => (
  <div className={className}>
    {item
      ? (
        <div>
          <img src={get('skin.icon')(item) || item.data.icon} onMouseOver={handleHover} onMouseLeave={handleHover} />
          { showTooltip && renderTooltip(item)}
        </div>
      )
      : <img src={emptySlot} />}
  </div>
)

const renderTooltip = item => {
  switch (item.slot) {
    case 'Helm':
    case 'Shoulders':
    case 'Coat':
    case 'Gloves':
    case 'Leggings':
    case 'Boots':
      return <ArmorTooltip item={item} />
    case 'WeaponA1':
    case 'WeaponA2':
    case 'WeaponB1':
    case 'WeaponB2':
      return <WeaponTooltip item={item} />
    case 'Backpack':
    case 'Accessory1':
    case 'Accessory2':
    case 'Amulet':
    case 'Ring1':
    case 'Ring2':
      return <UtilityTooltip item={item} />
    case 'Sickle':
    case 'Axe':
    case 'Pick':
      return <GatheringTooltip item={item} />
  }
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

  ${Tooltip} {
    .space {
      margin: 1.5rem 0;

      .img-title {
        img { width: 30px; }
      }
    }

    .img-title {
      margin-bottom: .6rem;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        margin-right: .6rem;
      }
    }
  }
`

export default compose(
  withStateHandlers(
    () => ({ showTooltip: false }),
    { handleHover: ({ showTooltip }) => () => ({ showTooltip: !showTooltip }) }
  )
)(ItemSlot)
