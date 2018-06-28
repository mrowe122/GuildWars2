import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import routes from 'routes'

const LogoTemplate = ({ className }) => (
  <div className={className}>
    <Link to={routes.index}>GuildWars2.io</Link>
  </div>
)

LogoTemplate.propTypes = { className: PropTypes.string }

const Logo = styled(LogoTemplate)`
  color: ${({ theme }) => theme.colors.white};
`

export default Logo
