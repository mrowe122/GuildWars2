/* istanbul ignore file */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { compose, sortBy, filter, get, getOr, find, reduce, cond, matches, uniqueId } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { Layout } from 'providers/MainLayout'
import { withFullPageLoader } from 'components'
import { withStateHandlers } from 'recompose'
import achievementIcon from 'media/images/achievement.png'

import MenuRightIcon from 'mdi-react/MenuRightIcon'
import MenuDownIcon from 'mdi-react/MenuDownIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'

const sideNavCSS = ({ theme }) => css`
  width: 22rem;

  .group {
    margin: 1rem 0;
    .mdi-icon {
      vertical-align: middle;
    }
  }

  .iconText {
    margin-bottom: 0.5rem;

    a {
      margin: 0;
      overflow: visible;
    }
  }
`

const contentCSS = ({ theme }) => css`
  width: calc(85% - 22rem + 4rem);
  margin-left: 22rem;

  h1 {
    text-align: center;
    margin-bottom: 1rem;

    img {
      margin-right: 0.5rem;
      vertical-align: middle;
    }
  }

  .p2 {
    margin: 0.4rem 0;

    &:nth-of-type(2) {
      color: ${theme.colors.gray1};
    }
  }

  .daily {
    margin-top: 1.1rem;
    padding-bottom: 1.1rem;
    border-bottom: 1px solid ${theme.colors.gray3};
  }

  .directionRow {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > div {
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .iconText {
    .mdi-icon {
      vertical-align: middle;
      color: ${theme.colors.completed};
    }
  }

  .col-xs-2 {
    .iconText {
      p {
        text-align: right;
        white-space: nowrap;
      }
      img {
        margin-left: 0.3rem;
      }
    }
  }
`

const Tiers = styled.div`
  margin-top: 0.5rem;
  margin-left: calc(64px + 0.5rem);

  table {
    margin-top: 0.5rem;
    border-collapse: collapse;

    tr {
      &:nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.primary};
      }
      &:nth-child(even) {
        background-color: ${({ theme }) => theme.colors.primaryDark1};
      }
      &.completed {
        background-color: rgba(40, 210, 30, 0.2);
      }
    }

    td {
      padding: 3px 8px;
      border: 1px solid ${({ theme }) => theme.colors.gray3};

      &:first-child,
      &:nth-child(3) {
        white-space: pre;
      }

      img {
        vertical-align: middle;
      }
    }
  }
`

const determineFraction = (progress, tiers) => {
  const current = getOr(0, 'current')(progress)
  let obtainedPoints = 0
  const totalPoints = reduce((acc, { count, points }) => {
    if (current >= count) {
      obtainedPoints += points
    }
    return acc + points
  }, 0)(tiers)
  return `${obtainedPoints} / ${totalPoints}`
}

const ItemReward = reward => <img key={uniqueId('item_')} src={reward.data.icon} width='36' height='36' />

const TitleReward = reward => (
  <img key={uniqueId('title_')} src='/media/images/title.png' title={reward.data.name} width='36' height='36' />
)

const CoinReward = reward => (
  <div key={uniqueId('coin_')}>
    <span />
  </div>
)

const MasteryReward = reward => (
  <img key={uniqueId('mastery_')} src={`/media/images/Mastery_point_${reward.region}.png`} width='36' height='36' />
)

export const Achievements = ({ achievements, selectedGroup, selectGroup, selectedCategory, selectCategory }) => (
  <Layout>
    {({ SideNav, Content }) => (
      <Fragment>
        <SideNav styles={sideNavCSS}>
          <h2>Achievements</h2>
          {achievements.map(g => (
            <div key={g.id}>
              <a className={`group ${selectedGroup === g.id ? 'active' : ''}`} onClick={() => selectGroup(g.id)}>
                {selectedGroup === g.id ? <MenuDownIcon /> : <MenuRightIcon />}
                {g.name}
              </a>
              {selectedGroup === g.id &&
                filter(get('achievements.length'))(sortBy('order')(g.categories)).map(c => (
                  <div key={c.id} className='iconText'>
                    <img src={c.icon} width='36' height='36' />
                    <a
                      onClick={() => {
                        selectCategory(c)
                      }}>
                      {c.name}
                    </a>
                  </div>
                ))}
            </div>
          ))}
        </SideNav>
        <Content styles={contentCSS}>
          <h1>
            <img src={selectedCategory.icon} />
            {selectedCategory.name}
          </h1>

          {getOr([], 'achievements')(selectedCategory).map(a => (
            <div className='daily' key={a.id}>
              <div className='row middle-xs'>
                <div className='col-xs'>
                  <div className='iconText'>
                    <img src={a.icon || selectedCategory.icon} />
                    <span>
                      <h4>
                        <strong>{a.name}</strong> {get('achievementProgress.done')(a) && <CheckCircleIcon size={20} />}
                      </h4>
                      <p className='p2'>{a.requirement}</p>
                      <p className='p2'>{a.description}</p>
                    </span>
                  </div>
                </div>

                {a.rewards && (
                  <div className='col-xs-2 center-xs directionRow'>
                    {a.rewards.map(
                      cond([
                        [matches({ type: 'Item' }), ItemReward],
                        [matches({ type: 'Title' }), TitleReward],
                        [matches({ type: 'Coins' }), CoinReward],
                        [matches({ type: 'Mastery' }), MasteryReward]
                      ])
                    )}
                  </div>
                )}

                <div className='col-xs-2'>
                  <div className='iconText end-xs'>
                    <p>{determineFraction(a.achievementProgress, a.tiers)}</p>
                    <img src={achievementIcon} width='26' height='26' />
                  </div>
                </div>
              </div>

              {get('tiers.length')(a) > 1 && (
                <div className='row'>
                  <Tiers className='col-xs'>
                    <h4>Tiers:</h4>
                    <table>
                      <tbody>
                        {a.tiers.map((t, i) => (
                          <tr
                            key={`${a.id}-${i}`}
                            className={get('achievementProgress.current')(a) >= t.count ? 'completed' : ''}>
                            <td>
                              <p>Tier {i + 1}</p>
                            </td>
                            <td>
                              <p>{getOr(`${t.count} Objectives Completed`, `bits[${i}].text`)(a)}</p>
                            </td>
                            <td>
                              <span className='p1'>{t.points}</span>{' '}
                              <img src={achievementIcon} width='26' height='26' />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Tiers>
                </div>
              )}
            </div>
          ))}
        </Content>
      </Fragment>
    )}
  </Layout>
)

Achievements.propTypes = {
  achievements: PropTypes.array,
  selectedGroup: PropTypes.string,
  selectGroup: PropTypes.func,
  selectedCategory: PropTypes.object,
  selectCategory: PropTypes.func
}

const AchievementsEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/achievements?token=:token`, {
    dataProp: 'achievements',
    props: ({ loading, achievements = [] }) => ({ loading, achievements: sortBy('order')(achievements) }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(({ loading }) => loading),
  withStateHandlers(
    ({ achievements }) => ({
      selectedGroup: achievements[0].id,
      selectedCategory: find({ order: 0 })(achievements[0].categories) || achievements[0].categories[0]
    }),
    {
      selectGroup: ({ selectedGroup }) => id => ({ selectedGroup: selectedGroup === id ? null : id }),
      selectCategory: () => cat => ({ selectedCategory: cat })
    }
  )
)(Achievements)

export default AchievementsEnhancer
