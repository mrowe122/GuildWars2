import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { compose, map, includes, assign, orderBy, find, get, startsWith } from 'lodash/fp'
import { branch } from 'recompose'
import { withRouter } from 'react-router'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import Spinner from 'react-spinkit'
import routes from 'routes'
import PermissionRedirect from './PermissionRedirect'

import MenuIcon from 'mdi-react/MenuIcon'
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon'
import SwordCrossIcon from 'mdi-react/SwordCrossIcon'
import StarIcon from 'mdi-react/StarIcon'
import BriefcaseIcon from 'mdi-react/BriefcaseIcon'
import LockOpenIcon from 'mdi-react/LockOpenIcon'
import WalletIcon from 'mdi-react/WalletIcon'
import ShieldHalfFullIcon from 'mdi-react/ShieldHalfFullIcon'
import CompareIcon from 'mdi-react/CompareIcon'

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

const PivotBar = ({ className, items = [], handleMenu, loading }) => (
  <div className={className}>
    {loading ? (
      <div className="loading">
        <Spinner name="three-bounce" fadeIn="none" />
      </div>
    ) : (
      <Fragment>
        <div className="menu">
          <MenuIcon onClick={handleMenu} />
        </div>
        {items.map(i => (
          <NavLink key={i.title} to={i.link} activeClassName="active" disabled={!i.access} title={i.title}>
            {i.icon} {i.title}
          </NavLink>
        ))}
      </Fragment>
    )}
  </div>
)

PivotBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  handleMenu: PropTypes.func,
  loading: PropTypes.bool
}

const PivotBarEnhancer = compose(
  withConsumer('app'),
  withRouter,
  fetchHocGet('api/permissions?token=:token', {
    variables: ({ authUser }) => ({ token: authUser.token }),
    options: { forever: true },
    props: ({ data }) => ({
      // TODO: check if can be simplified to not compute every render
      items: orderBy('access')('desc')(mapWithArgs((v, k) => assign(v, { access: includes(k)(data) }))(Permisions))
    })
  }),
  // TODO: check if can be simplified to not compute every render
  branch(
    ({ location, items, loading }) =>
      !loading &&
      startsWith(routes.account.index)(location.pathname) &&
      !get('access')(find(['link', location.pathname])(items)),
    PermissionRedirect
  )
)(PivotBar)

export default styled(PivotBarEnhancer)`
  color: ${({ theme }) => theme.colors.white};
  width: ${({ theme }) => theme.sizes.pivotBar};
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  padding: 0 13px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: start;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndexLayers.pivotBar};
  background-color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.generators.transition(200, 'ease-out')};

  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(90deg);
  }

  .mdi-icon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
    padding: 0.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
  }

  a,
  .menu,
  .sk-spinner {
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    text-decoration: none;
  }

  .menu {
    cursor: pointer;
    line-height: ${({ theme }) => theme.sizes.header};

    .mdi-icon {
      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark1};
      }
    }
  }

  a {
    margin-top: 1.5rem;

    .mdi-icon {
      background-color: ${({ theme }) => theme.colors.primaryDark1};
    }

    &:hover {
      .mdi-icon {
        ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primaryLight1)};
      }
    }

    &.active {
      .mdi-icon {
        background-color: ${({ theme }) => theme.colors.primaryLight1};
      }
    }

    &[disabled] {
      pointer-events: none;
    }
  }
`
