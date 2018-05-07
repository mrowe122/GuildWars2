import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HomeTemplate = ({ className }) => (
  <div className={className}>
    <h3>Home</h3>
  </div>
)

HomeTemplate.propTypes = {
  className: PropTypes.string
}

const Home = styled(HomeTemplate)`
  color: ${({ theme }) => theme.colors.white};
`

export default Home
