/* istanbul ignore file */
import React from 'react'
import { Redirect } from 'react-router-dom'

export default {
  'index': '/',
  'authorize': '/authenticate',
  'account': {
    'index': '/account',
    'achievements': '/account/achievements',
    'characters': '/account/characters',
    'guilds': '/account/guilds',
    'inventories': '/account/inventories',
    'pvp': '/account/pvp',
    'tradingpost': '/account/trading-post',
    'unlocks': '/account/unlocks',
    'wallet': '/account/wallet'
  },
  redirect: to => () => <Redirect to={to} />
}
