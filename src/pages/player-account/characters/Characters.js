import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { compose, omit, get } from 'lodash/fp'
import { withProps, withHandlers, branch, renderComponent, lifecycle, mapProps } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import routes from 'utils/routes'
import { ageFromSeconds, formatDate } from 'utils/utilities'
import { withModal, ItemSlot } from 'components'
import { Layout } from 'providers/MainLayout'
import { CharacterSelectModal, ErrorCharacterModal } from './CharactersModals'
import { Bubble } from './StyledComponents'

const sideNavClasses = css`
  margin-left: ${({ theme }) => theme.sizes.pivotBar};
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
    &[active='1'], &:hover { color: ${({ theme }) => theme.colors.primaryLight1}; }
  }
`

const contentClasses = css`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => `
    margin-left: calc(${theme.sizes.sideNav} + ${theme.sizes.pivotBar});
  `}

  .middle-xs {
    margin-bottom: 1rem;
    img {
      width: 100%;
      ${({ theme }) => theme.generators.boxShadow(0, 0, 20, -3, '#000')}
    }
  }

  .gw-c1 {
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 { margin-bottom: .7rem; }
  }
`

const Characters = ({ selectChar, allChars, charData, charDataLoading, allCharsLoading }) => {
  return (
    <Layout>
      {
        ({ Container, SideNav, Content, FullPageLoader }) => (
          <Fragment>
            {(charDataLoading || allCharsLoading) && <FullPageLoader />}
            <SideNav customClasses={sideNavClasses}>
              <h2>Characters</h2>
              { allChars.map(c => <a key={c} active={get('name')(charData) === c ? '1' : '0'} onClick={selectChar}>{c}</a>) }
            </SideNav>
            <Content customClasses={contentClasses}>
              {
                charData && (
                  <Fragment>
                    <div className='row middle-xs'>
                      <img src={`/media/banners/${charData.profession}.jpg`} />
                    </div>
                    <div className='row around-xs'>
                      <Bubble>
                        <h3>Character</h3>
                        <p className='p3'>
                          {charData.name}<br />
                          Level: {charData.level}
                        </p>
                      </Bubble>

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
                      <div className='gw-c1'>
                        <h2>Armor</h2>
                        <ItemSlot item={charData.equipment.Helm} />
                        <ItemSlot item={charData.equipment.Shoulders} />
                        <ItemSlot item={charData.equipment.Coat} />
                        <ItemSlot item={charData.equipment.Gloves} />
                        <ItemSlot item={charData.equipment.Leggings} />
                        <ItemSlot item={charData.equipment.Boots} />
                        <ItemSlot item={charData.equipment.HelmAquatic} />
                      </div>

                      <div className='gw-c1'>
                        <h2>Weapons</h2>
                        <ItemSlot item={charData.equipment.WeaponA1} />
                        <ItemSlot item={charData.equipment.WeaponA2} />
                        <ItemSlot item={charData.equipment.WeaponB1} />
                        <ItemSlot item={charData.equipment.WeaponB2} />
                        <ItemSlot item={charData.equipment.WeaponAquaticA} />
                        <ItemSlot item={charData.equipment.WeaponAquaticB} />
                      </div>

                      <div className='gw-c1'>
                        <h2>Trinkets</h2>
                        <ItemSlot item={charData.equipment.Backpack} />
                        <ItemSlot item={charData.equipment.Accessory1} />
                        <ItemSlot item={charData.equipment.Accessory2} />
                        <ItemSlot item={charData.equipment.Amulet} />
                        <ItemSlot item={charData.equipment.Ring1} />
                        <ItemSlot item={charData.equipment.Ring2} />
                      </div>

                      <div className='gw-c1'>
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
          </Fragment>
        )
      }
    </Layout>
  )
}

Characters.propTypes = {
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool,
  allCharsLoading: PropTypes.bool
}

export default compose(
  withModal,
  withProps(() => ({ selectedChar: localStorage.getItem('defaultChar') })),
  fetchHoc(`api/characters`, {
    dataProp: 'allChars',
    // TODO: handle if someone else uses computer and changes API key (defaultChar no longer valid)
    props: ({ loading, allChars = [], error }) => ({ allCharsLoading: loading, allChars, error })
  }),
  fetchHoc(`api/characters/:char`, {
    method: 'onDemand',
    dataProp: 'charData',
    props: ({ loading, charData = undefined }) => ({ charDataLoading: loading, charData })
  }),
  branch(p => p.error === 403, renderComponent(ErrorCharacterModal)),
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
  mapProps(omit([ 'error', 'fetchData', 'loading', 'selectedChar', 'showModal', 'closeModal', 'modalSelectChar' ]))
)(Characters)
