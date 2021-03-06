/* istanbul ignore file */
import React from 'react'
import styled from 'react-emotion'
import { compose, groupBy, get } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { DyesOrder } from 'utils/constants'
import { withFullPageLoader } from 'components'

const DyeGroup = styled.div`
  margin-bottom: 2rem;
`

const DyeSlot = styled.span`
  padding: 0.4rem;
  margin: 0.7rem 1rem 0 0;
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ background }) => `rgb(${background[0]}, ${background[1]}, ${background[2]})`};
  ${({ theme }) => theme.generators.textShadow(0, 0, 2, 'rgba(0,0,0,.7)', 20)};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 7, -2, theme.colors.white)};

  img {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
  }
`

const Skins = ({ dyes }) =>
  Object.keys(dyes)
    .sort((a, b) => DyesOrder.indexOf(a) - DyesOrder.indexOf(b))
    .map(keyName => (
      <DyeGroup key={keyName}>
        <h3>{keyName === 'undefined' ? 'Exclusive' : keyName}</h3>
        {dyes[keyName].map(d => (
          <DyeSlot key={d.id} background={get('cloth.rgb')(d)}>
            {d.data ? (
              <img src={get('data.icon')(d)} alt='dye' />
            ) : (
              <img
                src='https://render.guildwars2.com/file/4C6A69A2F750523C239A075656E719ED07492B2E/66652.png'
                alt='dye'
              />
            )}
            <p className={get('data.rarity')(d)}>{d.name}</p>
          </DyeSlot>
        ))}
      </DyeGroup>
    ))

const SkinsEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/dyes?token=:token`, {
    dataProp: 'dyes',
    props: ({ loading, dyes = [] }) => ({ loading, dyes: groupBy('categories[2]')(dyes) }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(({ loading }) => loading)
)(Skins)

export default SkinsEnhancer
