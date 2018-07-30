/* istanbul ignore file */
import React from 'react'
import { Redirect } from 'react-router-dom'

export default {
  index: '/',
  authorize: '/authenticate',
  account: {
    index: '/act',
    achievements: '/act/achievements',
    characters: '/act/characters',
    guilds: '/act/guilds',
    inventories: '/act/inventories',
    pvp: '/act/pvp',
    tradingpost: '/act/trading-post',
    unlocks: '/act/unlocks',
    wallet: '/act/wallet'
  },
  redirect: to => () => <Redirect to={to} />
}
