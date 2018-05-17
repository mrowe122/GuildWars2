import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, omit, get } from 'lodash/fp'
import { withProps, withHandlers, branch, renderComponent, lifecycle, mapProps } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import { ageFromSeconds, formatDate } from 'utils/utilities'
import { withModal, ItemSlot } from 'components'
import { Layout, SideNav, Content } from 'pages/player-account/_components/Layout'
import { FullPageLoader } from 'components/Loading'
import { CharacterSelectModal, ErrorCharacterModal } from './CharactersModals'

const Banner = styled.div`
  height: 400px;
  width: 768px;
  background-position: 0 -45px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ img }) => img});
  ${({ theme }) => theme.generators.boxShadow(0, 0, 15, 0, '#000')}
`

const CharactersTemplate = ({ className, selectChar, allChars, charData, charDataLoading }) => (
  <Layout className={className} loading={charDataLoading}>
    <SideNav>
      <h2>Characters</h2>
      { allChars.map(c => <a key={c} active={get('name')(charData) === c ? '1' : '0'} onClick={selectChar}>{c}</a>) }
    </SideNav>
    <Content className='col-xs-12'>
      {
        charData && (
          <Fragment>
            <div>
              <h1>{charData.name} ({charData.level})</h1>
              <p className='p1'>Birthday: {formatDate(charData.created)}</p>
              <p className='p1'>Playtime: {ageFromSeconds(charData.age)}</p>
              <p className='p1'>Profession: {charData.profession}</p>
              <div>
                Crafting:
                {
                  charData.crafting.length ? charData.crafting.map(c => (
                    <p className='p1' disabled={!c.active} key={c.discipline}>{c.discipline} ({c.rating})</p>
                  )) : ' None'
                }
              </div>
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
              <Banner img='/media/banners/mesmer.png' />
            </div>

            <div>
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
          </Fragment>
        )
      }
    </Content>
  </Layout>
)

CharactersTemplate.propTypes = {
  className: PropTypes.string,
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool
}

const Characters = styled(CharactersTemplate)`
  color: ${({ theme }) => theme.colors.white};

  ${SideNav} {
    & > h2 {
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: 1rem;
    } 

    a {
      color: ${({ theme }) => theme.colors.gray1};
      cursor: pointer;
      max-width: 100%;
      margin: .5rem 0;
      padding: 0 .2rem;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      ${({ theme }) => theme.generators.transition(150, 'linear')};
      ${({ theme }) => theme.generators.textNoSelect};
      &[active='1'], &:hover { color: ${({ theme }) => theme.colors.primaryLight2}; }
    }
  }

  ${Content} {
    & > div { padding: 0 2rem; }

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
  branch(p => p.allCharsLoading, renderComponent(FullPageLoader)),
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
    'selectedChar',
    'showModal',
    'closeModal',
    'allCharsLoading',
    'modalSelectChar'
  ]))
)(Characters)
