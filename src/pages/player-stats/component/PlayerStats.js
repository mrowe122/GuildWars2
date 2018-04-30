import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, omit } from 'lodash/fp'
import { withProps, withHandlers, branch, renderComponent, lifecycle, mapProps } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import { withModal } from 'components'
import Loading from 'components/Loading'
import CharacterSelectModal from './CharacterSelectModal'
import Spinner from 'react-spinkit'
import config from 'config'

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  position: fixed;
  background-color: ${({ theme }) => theme.colors.gray2};
`

const PlayerStatsTemplate = ({ className, selectChar, allChars, charData, charDataLoading }) => (
  <div className={className}>
    { charDataLoading && <div className='overlay'><Spinner name='three-bounce' fadeIn='none' /></div> }
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

    .sk-spinner { color: ${({ theme }) => theme.colors.primary}; }
  }
`

export default compose(
  withModal,
  fetchHoc(`${config.gwHost}/characters?access_token=${config.key}`, {
    dataProp: 'allChars',
    props: ({ loading, allChars = [] }) => ({ allCharsLoading: loading, allChars })
  }),
  fetchHoc(`${config.gwHost}/characters/:char?access_token=${config.key}`, {
    method: 'onDemand',
    dataProp: 'charData',
    props: ({ loading, charData = {} }) => ({ charDataLoading: loading, charData })
  }),
  branch(
    ({ allCharsLoading }) => allCharsLoading,
    renderComponent(Loading)
  ),
  withProps(() => ({ selectedChar: localStorage.getItem('defaultChar') || null })),
  withHandlers({
    selectChar: ({ handleModal, handleCharData, fetchData }) => e => {
      localStorage.setItem('defaultChar', e.target.innerText)
      fetchData({ 'char': e.target.innerText })
    }
  }),
  branch(
    ({ selectedChar }) => !selectedChar,
    renderComponent(CharacterSelectModal)
  ),
  lifecycle({ componentDidMount () { this.props.fetchData({ 'char': this.props.selectedChar }) } }),
  mapProps(omit([
    'fetchData',
    'loading',
    'selectedChar'
  ]))
)(PlayerStats)
