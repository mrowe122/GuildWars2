import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, omit } from 'lodash/fp'
import { withProps, withHandlers, branch, renderComponent, lifecycle, mapProps } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import { ageFromSeconds } from 'utils/utilities'
import { withModal, ItemSlot } from 'components'
import Loading from 'components/Loading'
import { CharacterSelectModal, ErrorCharacterModal } from './PlayerStatsModals'
import Spinner from 'react-spinkit'

const SideNav = styled.div`
  color: ${({ theme }) => theme.colors.gray1};
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.gray4};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};

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

const Content = styled.div`
  padding-top: 2rem;
  margin-left: ${({ theme }) => theme.sizes.sideNav};
  display: flex;
  flex-direction: row;

  & > div {
    padding: 0 2rem;
  }

  .lb {
    display: flex;
    flex-direction: column;
    div:nth-child(7) { margin-top: 1.5rem; }
  }

  .background {
    width: 400px;
    height: 600px;
    background-color: ${({ theme }) => theme.colors.gray3}
  }
`

const PlayerStatsTemplate = ({ className, selectChar, allChars, charData, charDataLoading }) => {
  console.log(charData)
  return (
    <div className={className}>
      { charDataLoading && <div className='overlay'><Spinner name='three-bounce' fadeIn='none' /></div> }
      <SideNav>
        { charData && allChars.map(c => <a key={c} active={charData.name === c ? '1' : '0'} onClick={selectChar}>{c}</a>) }
      </SideNav>
      {
        charData && (
          <Content className='col-xs-12'>
            <div>
              <h1>{charData.name} ({charData.level})</h1>
              <p>Playtime: {ageFromSeconds(charData.age)}</p>
              <p>profession: {charData.profession}</p>
            </div>

            <div className='lb'>
              <ItemSlot item={charData.equipment.Helm} />
              <ItemSlot item={charData.equipment.Shoulders} />
              <ItemSlot item={charData.equipment.Coat} />
              <ItemSlot item={charData.equipment.Gloves} />
              <ItemSlot item={charData.equipment.Leggings} />
              <ItemSlot item={charData.equipment.Boots} />

              <ItemSlot item={charData.equipment.WeaponA1} />
              <ItemSlot item={charData.equipment.WeaponA2} />
              <ItemSlot item={charData.equipment.WeaponB1} />
              <ItemSlot item={charData.equipment.WeaponB2} />
            </div>

            <div className='c'>
              <div className='background' />
            </div>

            <div className='rb'>
              <div className='row'>
                <ItemSlot item={charData.equipment.Backpack} />
                <ItemSlot item={charData.equipment.Accessory1} />
                <ItemSlot item={charData.equipment.Accessory2} />
              </div>
              <div className='row'>
                <ItemSlot item={charData.equipment.Amulet} />
                <ItemSlot item={charData.equipment.Ring1} />
                <ItemSlot item={charData.equipment.Ring2} />
              </div>
              <div className='row'>
                <ItemSlot item={charData.equipment.Sickle} />
                <ItemSlot item={charData.equipment.Axe} />
                <ItemSlot item={charData.equipment.Pick} />
              </div>
            </div>
          </Content>
        )
      }
    </div>
  )
}

PlayerStatsTemplate.propTypes = {
  className: PropTypes.string,
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool
}

const PlayerStats = styled(PlayerStatsTemplate)`
  color: ${({ theme }) => theme.colors.white};

  .overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndexLayers.modalOverlay};
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
  fetchHoc(`api/characters`, {
    dataProp: 'allChars',
    // TODO: handle new account with no characters
    props: ({ loading, allChars = [], error }) => ({ allCharsLoading: loading, allChars, error })
  }),
  fetchHoc(`api/characters/:char`, {
    method: 'onDemand',
    dataProp: 'charData',
    props: ({ loading, charData = undefined }) => ({ charDataLoading: loading, charData })
  }),
  branch(p => p.error === 403, renderComponent(ErrorCharacterModal)),
  branch(p => p.allCharsLoading, renderComponent(Loading)),
  withHandlers({
    selectChar: ({ fetchData, charData }) => e => {
      if (charData.name !== e.target.innerText) {
        localStorage.setItem('defaultChar', e.target.innerText)
        fetchData({ 'char': e.target.innerText })
      }
    },
    // will be removed once caching is implemented
    modalSelectChar: () => e => localStorage.setItem('defaultChar', e.target.innerText)
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
