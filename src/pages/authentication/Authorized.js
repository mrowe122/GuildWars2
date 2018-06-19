import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { compose, map, includes, assign, orderBy } from 'lodash/fp'
import { withProps } from 'recompose'
import routes from 'utils/routes'

import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon'
import SwordCrossIcon from 'mdi-react/SwordCrossIcon'
import StarIcon from 'mdi-react/StarIcon'
import BriefcaseIcon from 'mdi-react/BriefcaseIcon'
import LockOpenIcon from 'mdi-react/LockOpenIcon'
import WalletIcon from 'mdi-react/WalletIcon'
import ShieldHalfFullIcon from 'mdi-react/ShieldHalfFullIcon'
import CompareIcon from 'mdi-react/CompareIcon'

const mapWithArgs = map.convert({ 'cap': false })

export const Permisions = {
  characters: {
    title: 'Characters',
    icon: <AccountMultipleIcon />,
    link: routes.account.characters
  },
  pvp: {
    title: 'PVP',
    icon: <SwordCrossIcon />,
    link: routes.account.pvp
  },
  progression: {
    title: 'Achievements',
    icon: <StarIcon />,
    link: routes.account.achievements
  },
  inventories: {
    title: 'Inventory',
    icon: <BriefcaseIcon />,
    link: routes.account.inventories
  },
  unlocks: {
    title: 'Unlocks',
    icon: <LockOpenIcon />,
    link: routes.account.unlocks
  },
  wallet: {
    title: 'Wallet',
    icon: <WalletIcon />,
    link: routes.account.wallet
  },
  guilds: {
    title: 'Guilds',
    icon: <ShieldHalfFullIcon />,
    link: routes.account.guilds
  },
  tradingpost: {
    title: 'Trading Post',
    icon: <CompareIcon />,
    link: routes.account.tradingpost
  }
}

export const Authorized = ({ path, component, location, items }) => {
  if (location.pathname === '/account') {
    return <Redirect to={routes.account.characters} />
  }

  return <Route path={path} render={p => createElement(component, assign(p, { items }))} />
}

Authorized.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func,
  location: PropTypes.object,
  items: PropTypes.array
}

export const enhancer = compose(
  withProps(({ apiKey }) => {
    const permissions = JSON.parse(localStorage.getItem('permissions'))
    return {
      items: orderBy('access')('desc')(mapWithArgs(
        (v, k) => assign(v, { access: includes(k)(permissions) })
      )(Permisions))
    }
  })
)

export default enhancer(Authorized)
