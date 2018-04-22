import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withCharacters } from 'utils/compositions'

const HomeTemplate = ({ className }) => (
  <div className={className}>
    home
  </div>
)

HomeTemplate.propTypes = {
  className: PropTypes.string
}

const Home = styled(HomeTemplate)`
`

export default compose(
  withCharacters
)(Home)
