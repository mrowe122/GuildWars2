import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import routes from 'utils/routes'
import { Layout } from 'providers/MainLayout'

import Characters from './characters/Characters'
import Pvp from './pvp/Pvp'
import Achievements from './achievements/Achievements'
import Inventories from './inventories/Inventories'
import Unlocks from './unlocks/Unlocks'
import Wallet from './wallet/Wallet'
import Guilds from './guilds/Guilds'
import TradingPost from './tradingpost/TradingPost'

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

export default PlayerAccount
