import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, getOr, get } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import { Slot } from 'utils/constants'
import Tooltip from './Tooltip'

import emptySlot from 'media/images/empty_slot.gif'

const ArmorTooltip = ({ item }) => {
  return (
    <Tooltip>
      <div className='img-title'>
        <img src={get('skin.icon')(item) || get('data.icon')(item)} />
        <h4 className={get('data.rarity')(item)}>{get('skin.name')(item) || get('data.name')(item)} {get('upgrades[0].details.suffix')(item)}</h4>
      </div>
      <p>Defense: <span className='Masterwork'>{get('data.details.defense')(item)}</span></p>
      <div>
        {
          getOr([], 'data.details.infix_upgrade.attributes')(item).map(a => (
            <p key={a.attribute} className='p2 Masterwork'>+{a.modifier} {a.attribute}</p>
          ))
        }
      </div>
      <div className='space'>
        {
          getOr([], 'upgrades')(item).map((u, i) => (
            <div key={u.id + i} className='img-title'>
              <img src={u.icon} />
              <p className='Fine'>{u.name}</p>
            </div>
          ))
        }
      </div>
      <div className='space'>
        {
          getOr([], 'infusions')(item).map((u, i) => (
            <div key={u.id + i} className='img-title'>
              <img src={u.icon} />
              <p className='Fine'>{u.name}</p><br />
              <p className='Fine'>{get('details.infix_upgrade.buff.description')(u)}</p>
            </div>
          ))
        }
      </div>
      {item.skin &&
        <div className='space'>
          <p>Transmuted</p>
          <p>{item.data.name}</p>
        </div>
      }
      <div>
        <p className='p2'>{get('data.rarity')(item)}</p>
        <p className='p2'>{get('data.details.weight_class')(item)}</p>
        <p className='p2'>{Slot[item.slot]}</p>
        <p className='p2'>Required Level: {get('data.level')(item)}</p>
        <p className='p2'>{Slot[item.binding]}</p>
      </div>
    </Tooltip>
  )
}

ArmorTooltip.propTypes = {
  item: PropTypes.object
}

const WeaponTooltip = ({ item }) => {
  return (
    <Tooltip>
      <div className='img-title'>
        <img src={get('skin.icon')(item) || get('data.icon')(item)} />
        <h4 className={get('data.rarity')(item)}>{get('skin.name')(item) || get('data.name')(item)}</h4>
      </div>
      <p>Weapon Strength: <span className='Masterwork'>{get('data.details.min_power')(item)} - {get('data.details.max_power')(item)}</span></p>
      <div>
        {
          getOr([], 'data.details.infix_upgrade.attributes')(item).map(a => (
            <p key={a.attribute} className='p2 Masterwork'>+{a.modifier} {a.attribute}</p>
          ))
        }
      </div>
      <div className='space'>
        {
          getOr([], 'upgrades')(item).map((u, i) => (
            <div key={u.id + i} className='img-title'>
              <img src={u.icon} />
              <p className='Fine'>{u.name}</p>
            </div>
          ))
        }
      </div>
      <div className='space'>
        {
          getOr([], 'infusions')(item).map((u, i) => (
            <div key={u.id + i} className='img-title'>
              <img src={u.icon} />
              <p className='Fine'>{u.name}</p><br />
              <p className='Fine'>{get('details.infix_upgrade.buff.description')(u)}</p>
            </div>
          ))
        }
      </div>
      {item.skin &&
        <div className='space'>
          <p>Transmuted</p>
          <p>{item.data.name}</p>
        </div>
      }
      <div>
        <p className='p2'>{get('data.rarity')(item)}</p>
        <p className='p2'>{get('data.details.weight_class')(item)}</p>
        <p className='p2'>{Slot[item.slot]}</p>
        <p className='p2'>Required Level: {get('data.level')(item)}</p>
        <p className='p2'>{Slot[item.binding]}</p>
      </div>
    </Tooltip>
  )
}

WeaponTooltip.propTypes = {
  item: PropTypes.object
}

const UtilityTooltip = ({ item }) => {
  return (
    <Tooltip>
      <div className='img-title'>
        <img src={get('skin.icon')(item) || get('data.icon')(item)} />
        <h4 className={get('data.rarity')(item)}>{get('skin.name')(item) || get('data.name')(item)}</h4>
      </div>
      <div>
        {
          getOr([], 'data.details.infix_upgrade.attributes')(item).map(a => (
            <p key={a.attribute} className='p2 Masterwork'>+{a.modifier} {a.attribute}</p>
          ))
        }
      </div>
      <div className='space'>
        {
          getOr([], 'upgrades')(item).map((u, i) => (
            <div key={u.id + i} className='img-title'>
              <img src={u.icon} />
              <p className='Fine'>{u.name}</p>
            </div>
          ))
        }
      </div>
      <div className='space'>
        {
          getOr([], 'infusions')(item).map((u, i) => (
            <div key={u.id + i} className='img-title'>
              <img src={u.icon} />
              <p className='Fine'>{u.name}</p><br />
              <p className='Fine'>{get('details.infix_upgrade.buff.description')(u)}</p>
            </div>
          ))
        }
      </div>
      {item.skin &&
        <div className='space'>
          <p>Transmuted</p>
          <p>{item.data.name}</p>
        </div>
      }
      <div>
        <p className='p2'>{get('data.rarity')(item)}</p>
        <p className='p2'>{get('data.details.weight_class')(item)}</p>
        <p className='p2'>{Slot[item.slot]}</p>
        <p className='p2'>Required Level: {get('data.level')(item)}</p>
        <p className='p2'>{Slot[item.binding]}</p>
      </div>
    </Tooltip>
  )
}

UtilityTooltip.propTypes = {
  item: PropTypes.object
}

const ItemSlotTemplate = ({ className, item, showTooltip, handleHover }) => {
  return (
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
}

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
      break
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
