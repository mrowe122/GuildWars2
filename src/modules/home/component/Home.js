import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, get } from 'lodash/fp'
import { withState, withHandlers } from 'recompose'
import { DailyAchievements } from 'components'

const HomeTemplate = ({ className, setApi, saveInput }) => (
  <div className={className}>
    {/* <label htmlFor='api'>API key</label>
    <input id='api' type='text' onChange={compose(setApi, get('target.value'))} />
    <button onClick={saveInput}>submit</button> */}
    <DailyAchievements />
  </div>
)

HomeTemplate.propTypes = {
  className: PropTypes.string,
  setApi: PropTypes.func,
  saveInput: PropTypes.func
}

const Home = styled(HomeTemplate)`
`

export default compose(
  withState('api', 'setApi', ''),
  withHandlers({
    saveInput: ({ api, pass }) => () => {
      localStorage.setItem('key', api)
    }
  })
)(Home)
