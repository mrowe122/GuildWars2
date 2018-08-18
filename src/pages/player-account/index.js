import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'routes'

import Characters from './characters/Characters'
import Pvp from './pvp/Pvp'
import Achievements from './achievements/Achievements'
import Inventories from './inventories/Inventories'
import Unlocks from './unlocks/Unlocks'
import Wallet from './wallet/Wallet'
import Guilds from './guilds/Guilds'
import TradingPost from './tradingpost/TradingPost'
import Settings from './settings/Settings'

const PlayerAccount = () => (
  <Switch>
    <Route path={routes.account.characters} component={Characters} />
    <Route path={routes.account.pvp} component={Pvp} />
    <Route path={routes.account.achievements} component={Achievements} />
    <Route path={routes.account.inventories} component={Inventories} />
    <Route path={routes.account.unlocks.index} component={Unlocks} />
    <Route path={routes.account.wallet} component={Wallet} />
    <Route path={routes.account.guilds} component={Guilds} />
    <Route path={routes.account.tradingpost} component={TradingPost} />
    <Route path={routes.account.settings} component={Settings} />
  </Switch>
)

export default PlayerAccount
