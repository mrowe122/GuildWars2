import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LogoTemplate = ({ className }) => (
  <div className={className}>
    GuildWars2.io
  </div>
)

LogoTemplate.propTypes = { className: PropTypes.string }

const Logo = styled(LogoTemplate)`
`

export default Logo
