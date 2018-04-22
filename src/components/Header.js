import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from './Logo'

const HeaderTemplate = ({ className }) => (
  <div className={className}>
    <Logo />
    <div>
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
  height: ${({ theme }) => theme.sizes.header};
  line-height: ${({ theme }) => theme.sizes.header};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 15, 0, 'rgba(0, 0, 0, 0.3)')}

  & > div > p {
    border-radius: 5px;
    margin: 0 .5rem;
    padding: 0.7rem 1.2rem;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    &:hover { background-color: ${({ theme }) => theme.colors.primaryHover}; }
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
