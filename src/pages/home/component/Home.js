import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withCharacters } from 'utils/compositions'

const HomeTemplate = ({ className, data }) => (
  <div className={className}>
    <h3>Your characters</h3>
    {data.map(char => char)}
  </div>
)

HomeTemplate.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
}

const Home = styled(HomeTemplate)`
`

export default compose(
  withCharacters
)(Home)
