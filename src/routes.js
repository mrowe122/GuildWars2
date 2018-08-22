/* istanbul ignore file */
import React from 'react'
import { Redirect } from 'react-router-dom'

export default {
  index: '/',
  authenticate: '/authenticate',
  account: {
    index: '/act',
    settings: '/act/settings',
    achievements: '/act/achievements',
    characters: '/act/characters',
    guilds: '/act/guilds',
    inventories: '/act/inventories',
    pvp: '/act/pvp',
    tradingpost: '/act/trading-post',
    unlocks: {
      index: '/act/unlocks',
      skins: '/act/unlocks/skins',
      dyes: '/act/unlocks/dyes',
      minis: '/act/unlocks/minis',
      finishers: '/act/unlocks/finishers',
      titles: '/act/unlocks/titles'
    },
    wallet: '/act/wallet'
  },
  redirect: to => () => <Redirect to={to} />
}
