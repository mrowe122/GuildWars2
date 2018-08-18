import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { compose, get } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import AlertBoxIcon from 'mdi-react/AlertBoxIcon'
import { Slot } from 'utils/constants'
import { Tooltip } from './Tooltip'
import { IconTitle, Attributes, Upgrades, Infusions, ItemInfo, ItemSkin } from './Tooltip/components'

import emptySlot from 'media/images/empty_slot.gif'

const ArmorTooltip = ({ item }) => (
  <Tooltip item={item}>
    <IconTitle />
    <p>
      Defense: <span className='Masterwork'>{get('data.details.defense')(item)}</span>
    </p>
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
    <p>
      Weapon Strength:{' '}
      <span className='Masterwork'>
        {get('data.details.min_power')(item)} - {get('data.details.max_power')(item)}
      </span>
    </p>
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
  <Tooltip item={item}>
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
  <Tooltip item={item}>
    <IconTitle />
    <Upgrades />
    <p>{get('data.description')(item)}</p>
    <p>{Slot[item.binding]}</p>
  </Tooltip>
)

GatheringTooltip.propTypes = {
  item: PropTypes.object
}

const custom = () => css`
  text-align: center;
  width: 200px;
`

const ErrorTooltip = () => (
  <Tooltip position='top' customClass={custom}>
    <p>There was an error getting this item</p>
  </Tooltip>
)

const renderTooltip = item => {
  switch (item.slot) {
    case 'Helm':
    case 'Shoulders':
    case 'Coat':
    case 'Gloves':
    case 'Leggings':
    case 'Boots':
    case 'HelmAquatic':
      return <ArmorTooltip item={item} />
    case 'WeaponA1':
    case 'WeaponA2':
    case 'WeaponB1':
    case 'WeaponB2':
    case 'WeaponAquaticA':
    case 'WeaponAquaticB':
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
    default:
      return <ErrorTooltip />
  }
}

export const ItemSlot = ({ className, item, showTooltip, handleHover }) => (
  <div className={className}>
    {item ? (
      item.data ? (
        <Fragment>
          <img
            src={get('skin.icon')(item) || get('data.icon')(item)}
            onMouseOver={handleHover}
            onMouseLeave={handleHover}
            alt='item-slot'
          />
          {showTooltip && renderTooltip(item)}
        </Fragment>
      ) : (
        <Fragment>
          <AlertBoxIcon onMouseOver={handleHover} onMouseLeave={handleHover} size={50} />
          {showTooltip && renderTooltip({ slot: null })}
        </Fragment>
      )
    ) : (
      <img src={emptySlot} alt='empty-slot' />
    )}
  </div>
)

ItemSlot.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  showTooltip: PropTypes.bool,
  handleHover: PropTypes.func
}

const ItemSlotEnhancer = compose(
  withStateHandlers(() => ({ showTooltip: false }), {
    handleHover: ({ showTooltip }) => () => ({ showTooltip: !showTooltip })
  })
)(ItemSlot)

const ItemSlotStyled = styled(ItemSlotEnhancer)`
  width: 50px;
  height: 50px;
  margin: 0.35rem;
  position: relative;
  ${({ theme, item = {} }) => item.data && theme.generators.boxShadow(0, 0, 7, 0, theme.colors.gray1)};

  img {
    width: 100%;
  }

  .mdi-icon {
    color: ${({ theme }) => theme.colors.error};

    path {
      pointer-events: none;
    }
  }

  ${Tooltip} {
    .space {
      margin: 1.5rem 0;

      .img-title {
        img {
          width: 30px;
        }
      }
    }

    .img-title {
      margin-bottom: 0.6rem;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        margin-right: 0.6rem;
      }
    }
  }
`

export default ItemSlotStyled
