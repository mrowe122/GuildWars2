import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FullPageLoader } from 'components/Loading'

const Template = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

Template.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export const SideNav = styled(Template)`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.gray4};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
`

export const Content = styled(Template)`
  padding-top: 2rem;
  margin-left: ${({ theme }) => theme.sizes.sideNav};
`

export const Layout = ({ className, children, loading }) => (
  <div className={className}>
    {loading && <FullPageLoader />}
    {children}
  </div>
)

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool
}
