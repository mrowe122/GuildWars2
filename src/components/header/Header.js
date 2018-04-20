import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Logo } from 'components'

const HeaderTemplate = ({ className }) => (
  <div className={className}>
    <Logo />
    <div>
      <p>Dailies</p>
      <p>Join</p>
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
  height: ${props => props.theme.sizes.header};
  line-height: ${props => props.theme.sizes.header};

  p {
    margin: 0 .5rem;
    text-transform: uppercase;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    padding: 0.7rem 1.2rem;
  }

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
