import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { compose, map, includes, assign, orderBy } from 'lodash/fp'
import { withProps, branch, renderComponent, withState } from 'recompose'
import routes from 'utils/routes'
import ApikeyModal from './ApikeyModal'

import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon'
import SwordCrossIcon from 'mdi-react/SwordCrossIcon'
import StarIcon from 'mdi-react/StarIcon'
import BriefcaseIcon from 'mdi-react/BriefcaseIcon'
import LockOpenIcon from 'mdi-react/LockOpenIcon'
import WalletIcon from 'mdi-react/WalletIcon'
import ShieldHalfFullIcon from 'mdi-react/ShieldHalfFullIcon'
import CompareIcon from 'mdi-react/CompareIcon'

// Local db for developing
import db from 'db'

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
  withState('apiKey', 'setKey', db.permissions),
  // TODO: get permissions from DB
  branch(
    ({ apiKey }) => !apiKey,
    renderComponent(ApikeyModal)
  ),
  withProps(({ apiKey }) => ({
    items: orderBy('access')('desc')(mapWithArgs(
      (v, k) => assign(v, { access: includes(k)(apiKey) })
    )(Permisions))
  }))
)

export default enhancer(Authorized)
