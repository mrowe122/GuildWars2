import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { TooltipConsumer } from './Tooltip'
import { get, getOr } from 'lodash/fp'
import { Slot } from 'utils/constants'
import { cleanString } from 'utils/utilities'

export const IconTitle = ({ weapon }) => (
  <TooltipConsumer>
    {
      item => (
        <div className='img-title'>
          <img src={get('skin.icon')(item) || get('data.icon')(item)} />
          <h4 className={get('data.rarity')(item)}>
            {get('skin.name')(item) || get('data.name')(item)}&nbsp;
            {!weapon && get('upgrades[0].details.suffix')(item)}
          </h4>
        </div>
      )
    }
  </TooltipConsumer>
)

IconTitle.propTypes = {
  weapon: PropTypes.bool
}

export const Attributes = () => (
  <TooltipConsumer>
    {
      item => (
        <div>
          {
            getOr([], 'data.details.infix_upgrade.attributes')(item).map(a => (
              <p key={a.attribute} className='p2 Masterwork'>+{a.modifier} {a.attribute}</p>
            ))
          }
        </div>
      )
    }
  </TooltipConsumer>
)

export const Upgrades = () => (
  <TooltipConsumer>
    {
      ({ upgrades = [] }) => (
        <div className='space'>
          {
            upgrades.map((u, i) => (
              <Fragment key={u.id + i}>
                <div className='img-title'>
                  <img src={u.icon} />
                  <p className='Fine'>{u.name}</p>
                </div>
                {
                  u.details.type === 'Rune' ? (
                    getOr([], 'details.bonuses')(u).map((b, i) => (
                      <p key={b} className='Fine p2'>({++i}) {cleanString(b)}</p>
                    ))
                  ) : (
                    <p className='Fine'>{cleanString(get('details.infix_upgrade.buff.description')(u))}</p>
                  )
                }
              </Fragment>
            ))
          }
        </div>
      )
    }
  </TooltipConsumer>
)

export const Infusions = () => (
  <TooltipConsumer>
    {
      ({ infusions = [] }) => (
        <div className='space'>
          {
            infusions.map((u, i) => (
              <div key={u.id + i} className='img-title'>
                <img src={u.icon} />
                <p className='p2 Fine'>
                  {u.name}<br />
                  {getOr([], 'details.infix_upgrade.attributes')(u).map(a => (
                    <span key={a.attribute}>+{a.modifier} {a.attribute.replace(/([A-Z])/g, ' $1').trim()}<br /></span>
                  ))}
                </p>
              </div>
            ))
          }
        </div>
      )
    }
  </TooltipConsumer>
)

export const ItemInfo = () => (
  <TooltipConsumer>
    {
      item => (
        <div>
          <p className='p2'>{get('data.rarity')(item)}</p>
          <p className='p2'>{get('data.details.weight_class')(item)}</p>
          <p className='p2'>{Slot[item.slot]}</p>
          <p className='p2'>Required Level: {get('data.level')(item)}</p>
          <p className='p2'>{Slot[item.binding]}</p>
        </div>
      )
    }
  </TooltipConsumer>
)

export const ItemSkin = () => (
  <TooltipConsumer>
    {
      item => item.skin && (
        <div className='space'>
          <p>Transmuted</p>
          <p>{get('data.name')(item)}</p>
        </div>
      )
    }
  </TooltipConsumer>
)
