/* istanbul ignore file */
import React from 'react'
import styled from 'react-emotion'
import { compose, groupBy, cond, matches } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { SkinsOrder } from 'utils/constants'
import { withFullPageLoader } from 'components'

const SkinGroup = styled.div`
  margin-bottom: 2rem;

  img {
    width: 50px;
    height: 50px;
    margin: 0.7rem 0.5rem 0 0;
    border: 1px solid ${({ theme }) => theme.colors.gray3};
  }
`

const Skins = ({ skins }) =>
  Object.keys(skins)
    .sort((a, b) => SkinsOrder.indexOf(a) - SkinsOrder.indexOf(b))
    .map(keyName => (
      <SkinGroup key={keyName}>
        <h3>{keyName}</h3>
        {skins[keyName].map(s => (
          <img key={s.id} src={s.icon} title={s.name} alt="skin" />
        ))}
      </SkinGroup>
    ))

const armorFunc = s => `${s.details.type} - ${s.details.weight_class}`
const typeFunc = s => `${s.details.type}`
const backFunc = s => `${s.type}`

const SkinsEnhancer = compose(
  withConsumer('app'),
  fetchHocGet(`api/account/skins?token=:token`, {
    dataProp: 'skins',
    props: ({ loading, skins }) => {
      const _skins = groupBy(
        cond([
          [matches({ type: 'Armor' }), armorFunc],
          [matches({ type: 'Back' }), backFunc],
          [matches({ type: 'Weapon' }), typeFunc],
          [matches({ type: 'Gathering' }), typeFunc]
        ])
      )(skins)
      return { loading, skins: _skins }
    },
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(({ loading }) => loading)
)(Skins)

export default SkinsEnhancer
