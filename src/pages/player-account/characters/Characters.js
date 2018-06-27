/* istanbul ignore file */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose, get, toLower } from 'lodash/fp'
import { withState, withHandlers, branch, renderComponent, lifecycle, onlyUpdateForKeys } from 'recompose'
import { fetchHocGet } from 'utils/cachedFetch'
import { ageFromSeconds, formatDate } from 'utils/utilities'
import { ItemSlot, FullPageLoader } from 'components'
import { Layout } from 'providers/MainLayout'
import { withAuthentication } from 'providers/Authenticated'
import { Bubble, Gradient, Special, sideNavClasses, contentClasses } from './StyledComponents'

const Characters = ({ selectChar, allChars, charData, charDataLoading }) => {
  return (
    <Layout>
      {
        ({ Container, SideNav, Content, FullPageLoader }) => (
          <Container>
            {charDataLoading && <FullPageLoader />}
            <SideNav customClasses={sideNavClasses}>
              <h2>Characters</h2>
              { allChars.map(c => <a key={c} active={get('name')(charData) === c ? '1' : '0'} onClick={selectChar}>{c}</a>) }
            </SideNav>
            <Content customClasses={contentClasses}>
              {
                charData && (
                  <Fragment>
                    <div className='row middle-xs'>
                      <Gradient>
                        <h2>{charData.name}</h2>
                        <p className='p3'>
                          Lv: {charData.level}
                        </p>
                      </Gradient>
                      <img src={`/media/banners/${toLower(charData.profession)}.jpg`} />
                    </div>
                    <div className='row around-xs'>
                      <Bubble guild={charData.guild.name}>
                        <h3>Guild</h3>
                        <p className='p3'>{charData.guild.name || 'Not in a Guild'}</p>
                        { charData.guild.name && (<div className='emblem' />) }
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

                    <div className='row center-xs'>
                      {
                        charData.specializations.pve.map(p => p && (
                          <Special key={`pve-${p.id}`} img={p.data.background}>
                            <img src={p.data.icon} />
                          </Special>
                        ))
                      }
                    </div>
                  </Fragment>
                )
              }
            </Content>
          </Container>
        )
      }
    </Layout>
  )
}

Characters.propTypes = {
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool
}

export default compose(
  withAuthentication,
  withState('selectedChar', 'setChar'),
  fetchHocGet(`api/characters?token=:token`, {
    dataProp: 'allChars',
    options: { forever: true },
    props: ({ loading, allChars = [], errorStatus }) => ({ allCharsLoading: loading, allChars, errorStatus }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  fetchHocGet(`api/characters/:char?token=:token`, {
    name: 'fetchChar',
    call: 'onClick',
    dataProp: 'charData',
    props: ({ loading, charData = undefined }) => ({ charDataLoading: loading, charData }),
    variables: ({ authUser, allChars, selectedChar }) => ({ token: authUser.token, char: selectedChar || allChars[0] })
  }),
  branch(p => p.allCharsLoading, renderComponent(FullPageLoader)),
  withHandlers({
    selectChar: ({ fetchChar, charData, setChar }) => e => {
      if (charData.name !== e.target.innerText) {
        setChar(e.target.innerText, () => fetchChar())
      }
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.fetchChar()
    }
  }),
  onlyUpdateForKeys(['allChars', 'charData', 'charDataLoading'])
)(Characters)
