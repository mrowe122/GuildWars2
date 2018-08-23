/* istanbul ignore file */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose, get, getOr, toLower } from 'lodash/fp'
import { withState, withHandlers, lifecycle, onlyUpdateForKeys } from 'recompose'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { ageFromSeconds, formatDate } from 'utils/utilities'
import { ItemSlot, withFullPageLoader } from 'components'
import { Layout } from 'providers/MainLayout'
import { Bubble, Gradient, Specialization, contentCSS } from './styles'
import emptySlot from 'media/images/empty_slot.gif'

export const Characters = ({ selectChar, allChars, charData, charDataLoading }) => (
  <Layout>
    {({ Content, SideNav }) => (
      <Fragment>
        <SideNav>
          <h2>Characters</h2>
          {allChars.map(c => (
            <a key={c} active={get('name')(charData) === c ? '1' : '0'} onClick={selectChar}>
              {c}
            </a>
          ))}
        </SideNav>
        <Content styles={contentCSS} loading={charDataLoading}>
          {charData && (
            <Fragment>
              <div className='row middle-xs'>
                <Gradient>
                  <h2>{charData.name}</h2>
                  <p>Lv: {charData.level}</p>
                  <p>
                    {charData.race} {charData.gender}
                  </p>
                </Gradient>
                <img src={`/media/banners/${toLower(charData.profession)}.jpg`} alt='banner' />
              </div>
              <div className='row around-xs'>
                <Bubble guild={charData.guild.name}>
                  <h3>Guild</h3>
                  <p>{charData.guild.name}</p>
                  {charData.guild.name && <div className='emblem' />}
                </Bubble>

                <Bubble>
                  <h3>Playtime</h3>
                  <p>{ageFromSeconds(charData.age)}</p>
                </Bubble>

                <Bubble>
                  <h3>Crafting</h3>
                  <div>
                    {charData.crafting.length ? (
                      charData.crafting.sort((a, b) => a.active < b.active).map(c => (
                        <p disabled={!c.active} key={c.discipline}>
                          {c.discipline} ({c.rating})
                        </p>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                </Bubble>

                <Bubble>
                  <h3>Birthday</h3>
                  <p>{formatDate(charData.created)}</p>
                </Bubble>
              </div>
              <div className='row around-xs'>
                <div className='col-xs-6'>
                  <div className='row'>
                    <div className='col-xs gw-c1'>
                      <h3>Armor</h3>
                      <ItemSlot item={charData.equipment.Helm} />
                      <ItemSlot item={charData.equipment.Shoulders} />
                      <ItemSlot item={charData.equipment.Coat} />
                      <ItemSlot item={charData.equipment.Gloves} />
                      <ItemSlot item={charData.equipment.Leggings} />
                      <ItemSlot item={charData.equipment.Boots} />
                      <ItemSlot item={charData.equipment.HelmAquatic} />
                    </div>

                    <div className='col-xs gw-c1'>
                      <h3>Weapons</h3>
                      <ItemSlot item={charData.equipment.WeaponA1} />
                      <ItemSlot item={charData.equipment.WeaponA2} />
                      <ItemSlot item={charData.equipment.WeaponB1} />
                      <ItemSlot item={charData.equipment.WeaponB2} />
                      <ItemSlot item={charData.equipment.WeaponAquaticA} />
                      <ItemSlot item={charData.equipment.WeaponAquaticB} />
                    </div>

                    <div className='col-xs gw-c1'>
                      <h3>Trinkets</h3>
                      <ItemSlot item={charData.equipment.Backpack} />
                      <ItemSlot item={charData.equipment.Accessory1} />
                      <ItemSlot item={charData.equipment.Accessory2} />
                      <ItemSlot item={charData.equipment.Amulet} />
                      <ItemSlot item={charData.equipment.Ring1} />
                      <ItemSlot item={charData.equipment.Ring2} />
                    </div>

                    <div className='col-xs gw-c1'>
                      <h3>Tools</h3>
                      <ItemSlot item={charData.equipment.Sickle} />
                      <ItemSlot item={charData.equipment.Axe} />
                      <ItemSlot item={charData.equipment.Pick} />
                    </div>
                  </div>
                </div>
                <div className='col-xs-6 bag'>
                  {charData.bags.map((b, idx) =>
                    b.inventory.map(
                      (inv, idx2) =>
                        inv ? (
                          <img key={`${inv.id}-${idx2}`} src={inv.data.icon} alt='bag-slot' />
                        ) : (
                          <img key={`empty-${idx2}`} src={emptySlot} alt='empty-slot' />
                        )
                    )
                  )}
                </div>
              </div>

              <div className='row center-xs'>
                {getOr([], 'specializations.pve')(charData).map(
                  p =>
                    p && (
                      <Specialization key={`pve-${p.id}`} img={p.data.background}>
                        <h3>{p.data.name}</h3>
                        <span>
                          <img src={p.data.traitData[p.data.minor_traits[0]].icon} alt='trait' />
                        </span>
                        <span>
                          <img
                            disabled={p.traits[0] !== p.data.major_traits[0]}
                            src={p.data.traitData[p.data.major_traits[0]].icon}
                            alt='trait'
                          />
                          <img
                            disabled={p.traits[0] !== p.data.major_traits[1]}
                            src={p.data.traitData[p.data.major_traits[1]].icon}
                            alt='trait'
                          />
                          <img
                            disabled={p.traits[0] !== p.data.major_traits[2]}
                            src={p.data.traitData[p.data.major_traits[2]].icon}
                            alt='trait'
                          />
                        </span>
                        <span>
                          <img src={p.data.traitData[p.data.minor_traits[1]].icon} alt='trait' />
                        </span>
                        <span>
                          <img
                            disabled={p.traits[1] !== p.data.major_traits[3]}
                            src={p.data.traitData[p.data.major_traits[3]].icon}
                            alt='trait'
                          />
                          <img
                            disabled={p.traits[1] !== p.data.major_traits[4]}
                            src={p.data.traitData[p.data.major_traits[4]].icon}
                            alt='trait'
                          />
                          <img
                            disabled={p.traits[1] !== p.data.major_traits[5]}
                            src={p.data.traitData[p.data.major_traits[5]].icon}
                            alt='trait'
                          />
                        </span>
                        <span>
                          <img src={p.data.traitData[p.data.minor_traits[2]].icon} alt='trait' />
                        </span>
                        <span>
                          <img
                            disabled={p.traits[2] !== p.data.major_traits[6]}
                            src={p.data.traitData[p.data.major_traits[6]].icon}
                            alt='trait'
                          />
                          <img
                            disabled={p.traits[2] !== p.data.major_traits[7]}
                            src={p.data.traitData[p.data.major_traits[7]].icon}
                            alt='trait'
                          />
                          <img
                            disabled={p.traits[2] !== p.data.major_traits[8]}
                            src={p.data.traitData[p.data.major_traits[8]].icon}
                            alt='trait'
                          />
                        </span>
                      </Specialization>
                    )
                )}
              </div>
            </Fragment>
          )}
        </Content>
      </Fragment>
    )}
  </Layout>
)

Characters.propTypes = {
  selectChar: PropTypes.func,
  allChars: PropTypes.array,
  charData: PropTypes.object,
  charDataLoading: PropTypes.bool
}

const CharactersEnhancer = compose(
  withConsumer('app'),
  withState('selectedChar', 'setChar'),
  fetchHocGet('api/characters?token=:token', {
    dataProp: 'allChars',
    props: ({ loading, allChars = [] }) => ({ allCharsLoading: loading, allChars }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  fetchHocGet('api/characters/:char?token=:token', {
    name: 'fetchChar',
    call: 'onClick',
    dataProp: 'charData',
    props: ({ loading, charData = undefined }) => ({ charDataLoading: loading, charData }),
    variables: ({ authUser, allChars, selectedChar }) => ({ token: authUser.token, char: selectedChar || allChars[0] })
  }),
  withFullPageLoader(p => p.allCharsLoading),
  withHandlers({
    selectChar: ({ fetchChar, charData, setChar }) => e => {
      if (charData.name !== e.target.innerText) {
        setChar(e.target.innerText, () => fetchChar())
        window.scroll(0, 0)
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

export default CharactersEnhancer
