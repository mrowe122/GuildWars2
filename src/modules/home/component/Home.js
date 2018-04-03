import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, get } from 'lodash/fp'
import { withState, withHandlers } from 'recompose'

const HomeTemplate = ({ className, setApi, setPass, saveInput }) => (
  <div className={className}>
    <label htmlFor='api'>API key</label>
    <input id='api' type='text' onChange={compose(setApi, get('target.value'))} />
    <button onClick={saveInput}>submit</button>
  </div>
)

HomeTemplate.propTypes = {
  className: PropTypes.string,
  setApi: PropTypes.func,
  setPass: PropTypes.func,
  saveInput: PropTypes.func
}

const Home = styled(HomeTemplate)`
  & > * {
    display: block;
  }
`

export default compose(
  withState('api', 'setApi', ''),
  withState('pass', 'setPass', ''),
  withHandlers({
    saveInput: ({ api, pass }) => () => {
      // sessionStorage.setItem('key', api)
    }
  })
)(Home)
