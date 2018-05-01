import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, omit } from 'lodash/fp'
import { withProps, withHandlers, branch, renderComponent, lifecycle, mapProps } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import { ageFromSeconds } from 'utils/utilities'
import { withModal } from 'components'
import Loading from 'components/Loading'
import { CharacterSelectModal, ErrorCharacterModal } from './PlayerStatsModals'
import Spinner from 'react-spinkit'
import config from 'config'

const SideNav = styled.div`
  color: ${({ theme }) => theme.colors.gray1};
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.gray5};

  a {
    cursor: pointer;
    width: inherit;
    margin: .5rem 0;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ theme }) => theme.generators.transition(150, 'linear')};

    &[active='1'], &:hover { color: ${({ theme }) => theme.colors.primaryLight2}; }
  }
`

const PlayerStatsTemplate = ({ className, selectChar, allChars, charData, charDataLoading }) => (
  <div className={className}>
    { charDataLoading && <div className='overlay'><Spinner name='three-bounce' fadeIn='none' /></div> }
    <SideNav>
      { allChars.map(c => <a key={c} active={charData.name === c ? '1' : '0'} onClick={selectChar}>{c}</a>) }
    </SideNav>
    {
      charData && (
        <div className='col-xs-12'>
          <h1>{charData.name} ({charData.level})</h1>
          <p>Playtime: {ageFromSeconds(charData.age)}</p>
          <p>gender: {charData.gender}</p>
          <p>profession: {charData.profession}</p>
          <p>race: {charData.race}</p>
        </div>
      )
    }
  </div>
)

PlayerStatsTemplate.propTypes = {
  className: PropTypes.string,
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool
}

const PlayerStats = styled(PlayerStatsTemplate)`
  .col-xs-12 {
    margin-left: ${({ theme }) => theme.sizes.sideNav};
  }

  .overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndexLayers.statsContent};
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.loadingOverlay};

    .sk-spinner { color: ${({ theme }) => theme.colors.primaryLight1}; }
  }
`

export default compose(
  withModal,
  withProps(() => ({ selectedChar: localStorage.getItem('defaultChar') })),
  fetchHoc(`${config.gwHost}/characters?access_token=${config.key}`, {
    dataProp: 'allChars',
    // TODO: handle new account with no characters
    props: ({ loading, allChars = [], error }) => ({ allCharsLoading: loading, allChars, error })
  }),
  fetchHoc(`${config.gwHost}/characters/:char?access_token=${config.key}`, {
    method: 'onDemand',
    dataProp: 'charData',
    props: ({ loading, charData = {} }) => ({ charDataLoading: loading, charData })
  }),
  branch(p => p.error === 403, renderComponent(ErrorCharacterModal)),
  branch(p => p.allCharsLoading, renderComponent(Loading)),
  withHandlers({
    selectChar: ({ fetchData, charData }) => e => {
      if (charData.name !== e.target.innerText) {
        localStorage.setItem('defaultChar', e.target.innerText)
        fetchData({ 'char': e.target.innerText })
      }
    }
  }),
  branch(p => !p.selectedChar, renderComponent(CharacterSelectModal)),
  lifecycle({ componentDidMount () { this.props.fetchData({ 'char': this.props.selectedChar }) } }),
  mapProps(omit([
    'error',
    'fetchData',
    'loading',
    'selectedChar'
  ]))
)(PlayerStats)
