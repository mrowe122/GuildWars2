import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { sizes } from 'styles/variables'

const HeaderTemplate = ({ className }) => (
  <div className={className}>
    GuildWars2.io
  </div>
)

HeaderTemplate.propTypes = {
  className: PropTypes.string
}

const Header = styled(HeaderTemplate)`
  background: red;
  height: ${sizes.header};
  line-height: ${sizes.header};
`

export default Header
