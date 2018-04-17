import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { sizes } from 'styles/variables'
import DailyHeader from './DailyHeader'
import { Logo } from 'components'
import AccountIcon from 'mdi-react/AccountIcon'

const HeaderTemplate = ({ className }) => (
  <div className={className}>
    <Logo />
    <div>
      <DailyHeader />
      <AccountIcon />
    </div>
  </div>
)

HeaderTemplate.propTypes = {
  className: PropTypes.string
}

const Header = styled(HeaderTemplate)`
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: red;
  height: ${sizes.header};
  line-height: ${sizes.header};

  & > div:nth-child(2) {
    display: flex;
  }

  .mdi-icon {
    height: 26px;
    width: 26px;
    cursor: pointer;
    padding: .4rem;
    fill: white;
  }
`

export default Header
