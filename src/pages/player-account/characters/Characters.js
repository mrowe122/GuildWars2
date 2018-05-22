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
import { BannerText, Bubble } from './StyledComponents'
import CakeIcon from 'mdi-react/CakeIcon'
import StopwatchIcon from 'mdi-react/StopwatchIcon'

const CharactersTemplate = ({ className, selectChar, allChars, charData, charDataLoading }) => {
  return (
    <Layout className={className} loading={charDataLoading}>
      <SideNav>
        <h2>Characters</h2>
        { allChars.map(c => <a key={c} active={get('name')(charData) === c ? '1' : '0'} onClick={selectChar}>{c}</a>) }
      </SideNav>
      <Content className='col-xs-12'>
        {
          charData && (
            <Fragment>
              <div className='row'>
                <BannerText>
                  <img src={`/media/banners/${charData.profession}.jpg`} />
                  <div>
                    <h2>{charData.name}</h2>
                    <p className='p1'>Level: {charData.level}</p>
                  </div>
                </BannerText>
              </div>
              <div className='row around-xs'>
                <Bubble>
                  {
                    charData.guild.name
                      ? (
                        <Fragment>
                          <h3>Guild</h3>
                          <p className='p3'>{charData.guild.name}</p>
                          <div
                            className='emblem'
                            style={{ backgroundImage: `url(http://data.gw2.fr/guild-emblem/name/${encodeURI(charData.guild.name)}/100.png)` }} />
                        </Fragment>
                      )
                      : <p className='p3'>Not in a Guild</p>
                  }
                </Bubble>

                <Bubble>
                  <h3>Birthday</h3>
                  <p className='p3'>{formatDate(charData.created)}</p>
                </Bubble>

                <Bubble>
                  <h3>Playtime</h3>
                  <p className='p3'>{ageFromSeconds(charData.age)}</p>
                </Bubble>

                <Bubble>
                  <h3>Crafting</h3>
                  <div>
                    {
                      charData.crafting.length ? charData.crafting.sort((a, b) => a.active < b.active).map(c => (
                        <p className='p3' disabled={!c.active} key={c.discipline}>{c.discipline} ({c.rating})</p>
                      )) : <p className='p3'>None</p>
                    }
                  </div>
                </Bubble>
              </div>
              <div className='row around-xs'>
                <div className='test'>
                  <h2>Armor</h2>
                  <ItemSlot item={charData.equipment.Helm} />
                  <ItemSlot item={charData.equipment.Shoulders} />
                  <ItemSlot item={charData.equipment.Coat} />
                  <ItemSlot item={charData.equipment.Gloves} />
                  <ItemSlot item={charData.equipment.Leggings} />
                  <ItemSlot item={charData.equipment.Boots} />
                  <ItemSlot item={charData.equipment.HelmAquatic} />
                </div>

                <div className='test'>
                  <h2>Weapons</h2>
                  <ItemSlot item={charData.equipment.WeaponA1} />
                  <ItemSlot item={charData.equipment.WeaponA2} />
                  <ItemSlot item={charData.equipment.WeaponB1} />
                  <ItemSlot item={charData.equipment.WeaponB2} />
                  <ItemSlot item={charData.equipment.WeaponAquaticA} />
                  <ItemSlot item={charData.equipment.WeaponAquaticB} />
                </div>

                <div className='test'>
                  <h2>Trinkets</h2>
                  <ItemSlot item={charData.equipment.Backpack} />
                  <ItemSlot item={charData.equipment.Accessory1} />
                  <ItemSlot item={charData.equipment.Accessory2} />
                  <ItemSlot item={charData.equipment.Amulet} />
                  <ItemSlot item={charData.equipment.Ring1} />
                  <ItemSlot item={charData.equipment.Ring2} />
                </div>

                <div className='test'>
                  <h2>Tools</h2>
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
}

CharactersTemplate.propTypes = {
  className: PropTypes.string,
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool
}

const Characters = styled(CharactersTemplate)`
  color: ${({ theme }) => theme.colors.white};
  *[disabled] { opacity: .4; }

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
    img { width: 100%; }
  }
`

export default compose(
  withModal,
  withProps(() => ({ selectedChar: localStorage.getItem('defaultChar') })),
  fetchHoc(`api/characters`, {
    dataProp: 'allChars',
    // TODO: handle new account with no characters
    // TODO: handle if someone else uses computer and changes API key (default char no longer valid)
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
