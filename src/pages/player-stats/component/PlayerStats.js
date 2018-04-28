import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withProps, withHandlers } from 'recompose'
import { withCharacters, withCharData } from 'utils/compositions'

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  position: fixed;
  background-color: ${({ theme }) => theme.colors.gray2};
`

const PlayerStatsTemplate = ({ className, allChars = [], charData, selectChar }) => (
  <div className={className}>
    <SideNav>
      { allChars.map(char => <p onClick={selectChar} key={char}>{char}</p>) }
    </SideNav>
    {
      charData && (
        <div className='col-xs-12'>
          <h1>{charData.name}</h1>
          <p>{charData.level}</p>
        </div>
      )
    }
  </div>
)

PlayerStatsTemplate.propTypes = {
  className: PropTypes.string,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  selectChar: PropTypes.func
}

const PlayerStats = styled(PlayerStatsTemplate)`
  .col-xs-12 {
    margin-left: ${({ theme }) => theme.sizes.sideNav};
  }
`

export default compose(
  withCharacters,
  withCharData,
  // need to check what happens when account has no characters
  withProps(({ allChars }) => ({ defaultChar: localStorage.getItem('default') || allChars[0] })),
  withHandlers({
    selectChar: ({ handleModal, handleCharData, fetchCharData }) => e => {
      localStorage.setItem('default', e.target.innerText)
      fetchCharData(e.target.innerText)
    }
  }),
  // clean this up
  withProps(({ defaultChar, charData, fetchCharData }) => {
    if (!charData && defaultChar) {
      fetchCharData(defaultChar)
    }
  })
)(PlayerStats)
