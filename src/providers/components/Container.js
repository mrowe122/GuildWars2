/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { compose, map, includes, assign, orderBy } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import { fetchHocGet } from 'utils/cachedFetch'
import routes from 'routes'

import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon'
import SwordCrossIcon from 'mdi-react/SwordCrossIcon'
import StarIcon from 'mdi-react/StarIcon'
import BriefcaseIcon from 'mdi-react/BriefcaseIcon'
import LockOpenIcon from 'mdi-react/LockOpenIcon'
import WalletIcon from 'mdi-react/WalletIcon'
import ShieldHalfFullIcon from 'mdi-react/ShieldHalfFullIcon'
import CompareIcon from 'mdi-react/CompareIcon'

import Header from './Header'
import Footer from './Footer'
import PivotBar from './PivotBar'
import SideNav from './SideNav'
import { FullPageLoader, withFullPageLoader } from 'components'

const mapWithArgs = map.convert({ cap: false })

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
    link: routes.account.unlocks.index
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

export const Container = ({ className, children, token, handleMenu, pivotItems }) => (
  <div className={className}>
    <Header />
    {token && <PivotBar items={pivotItems} handleMenu={handleMenu} />}
    {children}
    <Footer />
  </div>
)

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  token: PropTypes.string,
  handleMenu: PropTypes.func,
  pivotItems: PropTypes.array
}

const ContainerStyled = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ token, theme }) =>
    token &&
    css`
    padding-left: ${theme.sizes.pivotBar};
    ${theme.generators.transition(200, 'ease-out')};

    ${Header}, ${SideNav}, ${FullPageLoader} {
      margin-left: ${theme.sizes.pivotBar};
      ${theme.generators.transition(200, 'ease-out')};
    }

    ${Footer} { margin-top: auto; }
  `} ${({ expanded, theme }) =>
  expanded &&
    css`
    padding-left: ${theme.sizes.pivotBarExpanded};

    ${PivotBar} {
      width: ${theme.sizes.pivotBarExpanded};
    }

    ${Header}, ${SideNav}, ${FullPageLoader} {
      margin-left: ${theme.sizes.pivotBarExpanded};
    }
  `};
`

const ContainerEnhancer = compose(
  withStateHandlers(() => ({ expanded: false }), { handleMenu: ({ expanded }) => () => ({ expanded: !expanded }) }),
  fetchHocGet('api/permissions?token=:token', {
    variables: ({ token }) => ({ token }),
    options: { forever: true },
    props: ({ data }) => ({
      // TODO: check if can be simplified to not compute every render
      pivotItems: orderBy('access')('desc')(mapWithArgs((v, k) => assign(v, { access: includes(k)(data) }))(Permisions))
    })
  }),
  withFullPageLoader(({ loading }) => loading)
)

export default ContainerEnhancer(ContainerStyled)
