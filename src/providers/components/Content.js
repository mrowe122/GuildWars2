import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { FullPageLoader } from 'components'

const ContentTemplate = ({ className, children, loading }) => (
  <div className={className}>
    {loading && <FullPageLoader />}
    {children}
  </div>
)

ContentTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool
}

const Content = styled(ContentTemplate)`
  max-width: 1200px;
  flex: 1 0 auto;
  padding: 2rem 2rem 1rem;
  margin-top: ${({ theme }) => theme.sizes.header};
  ${({ styles }) => styles};
`

export default Content
