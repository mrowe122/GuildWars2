import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import routes from 'routes'
import { find } from 'lodash/fp'

const PermissionRedirect = ({ items }) => {
  const path = find(['access', true])(items)
  return path === undefined ? <Redirect to={routes.index} /> : <Redirect to={path.link} />
}

PermissionRedirect.propTypes = {
  items: PropTypes.array
}

export default () => PermissionRedirect
