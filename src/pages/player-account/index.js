import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { compose, map, includes, assign, orderBy } from 'lodash/fp'
import { branch, renderComponent } from 'recompose'
import routes from 'routes'
import { FullPageLoader } from 'components'
import { Layout } from 'providers/MainLayout'
import { withAuthentication } from 'providers/Authenticated'
import { fetchHocGet } from 'utils/cachedFetch'

import Characters from './characters/Characters'
import Pvp from './pvp/Pvp'
import Achievements from './achievements/Achievements'
import Inventories from './inventories/Inventories'
import Unlocks from './unlocks/Unlocks'
import Wallet from './wallet/Wallet'
import Guilds from './guilds/Guilds'
import TradingPost from './tradingpost/TradingPost'

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

const PlayerAccount = ({ items }) => (
  <Layout>
    {
      ({ Container, PivotBar }) => (
        <Container header footer pivotBar>
          <PivotBar items={items} />
          <Switch>
            <Route path={routes.account.characters} component={Characters} />
            <Route path={routes.account.pvp} component={Pvp} />
            <Route path={routes.account.achievements} component={Achievements} />
            <Route path={routes.account.inventories} component={Inventories} />
            <Route path={routes.account.unlocks} component={Unlocks} />
            <Route path={routes.account.wallet} component={Wallet} />
            <Route path={routes.account.guilds} component={Guilds} />
            <Route path={routes.account.tradingpost} component={TradingPost} />
          </Switch>
        </Container>
      )
    }
  </Layout>
)

PlayerAccount.propTypes = {
  items: PropTypes.array
}

export default compose(
  withAuthentication,
  fetchHocGet('api/permissions?token=:token', {
    variables: ({ authUser }) => ({ token: authUser.token }),
    props: ({ data }) => ({
      // TODO: check if can be simplified to not compute every render
      items: orderBy('access')('desc')(mapWithArgs(
        (v, k) => assign(v, { access: includes(k)(data) })
      )(Permisions))
    })
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(FullPageLoader)
  )
)(PlayerAccount)
