import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { sizes } from 'styles/variables'
import UpdateIcon from 'mdi-react/UpdateIcon'
import { Logo } from 'components'

const HeaderTemplate = ({ className }) => (
  <div className={className}>
    <Logo />
    <div>
      <UpdateIcon />
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

  .mdi-icon {
    cursor: pointer;
    padding: .4rem;
    fill: white;
  }
`

export default Header
