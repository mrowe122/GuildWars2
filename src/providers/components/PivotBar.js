import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { compose, map, includes, assign, orderBy } from 'lodash/fp'
import { withRouter } from 'react-router'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import Spinner from 'react-spinkit'
import routes from 'routes'

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
      <Spinner name="three-bounce" fadeIn="none" />
    ) : (
      <React.Fragment>
        <div>
          <MenuIcon onClick={handleMenu} /> {'Guild Wars 2'}
        </div>
        {items.map(i => (
          <NavLink key={i.title} to={i.link} activeClassName="active" disabled={!i.access} title={i.title}>
            {i.icon} {i.title}
          </NavLink>
        ))}
      </React.Fragment>
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
  })
  // TODO: check if can be simplified to not compute every render
  // branch(
  //   ({ location, items }) => !get('access')(find(['link', location.pathname])(items)),
  //   PermissionRedirect
  // )
)(PivotBar)

export default styled(PivotBarEnhancer)`
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

  .mdi-icon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
  }

  & > div,
  a {
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    text-decoration: none;

    .mdi-icon {
      cursor: pointer;
      padding: 0.5rem;
      margin-right: 1rem;
      border-radius: 50%;
    }
  }

  & > div {
    height: ${({ theme }) => theme.sizes.header};
    display: flex;
    align-items: center;

    .mdi-icon {
      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark1};
      }
    }
  }

  a {
    margin-bottom: 1.5rem;

    &:first-of-type {
      margin-top: 1.5rem;
    }
    .mdi-icon {
      background-color: ${({ theme }) => theme.colors.primaryDark1};
    }

    &:hover {
      .mdi-icon {
        ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primaryLight1)};
      }
    }

    &.active {
      &:hover {
        .mdi-icon {
          box-shadow: none;
        }
      }
      .mdi-icon {
        background-color: ${({ theme }) => theme.colors.primaryLight1};
      }
    }

    &[disabled] {
      pointer-events: none;
    }
  }
`
