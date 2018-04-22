import { compose, map, keyBy, assign } from 'lodash/fp'
import { lifecycle, withStateHandlers } from 'recompose'
import { cachedFetch } from './cachedFetch'
import { key, gwHost } from 'config'

export const withLoading = compose(
  withStateHandlers(
    () => ({ loading: true, data: {} }),
    { doneLoading: () => data => ({ loading: false, data }) }
  )
)

export const withAchievements = compose(
  withLoading,
  lifecycle({
    componentDidMount () {
      cachedFetch(`${gwHost}/achievements/daily`)
        .then(res1 => res1.json())
        .then(({ pvp, pve, wvw, fractals, special }) => {
          const allIds = [].concat(
            map('id')(pvp),
            map('id')(pve),
            map('id')(wvw),
            map('id')(fractals),
            map('id')(special)
          )
          cachedFetch(`${gwHost}/achievements?ids=${allIds}`)
            .then(res2 => res2.json())
            .then(data2 => {
              const keyData = keyBy('id')(data2)
              const normalizeData = e => assign(e, keyData[e.id])
              this.props.doneLoading({
                pve: map(normalizeData)(pve),
                pvp: map(normalizeData)(pvp),
                wvw: map(normalizeData)(wvw),
                fractals: map(normalizeData)(fractals),
                special: map(normalizeData)(special)
              })
            })
        })
    }
  })
)

export const withCharacters = compose(
  withLoading,
  lifecycle({
    componentDidMount () {
      cachedFetch(`${gwHost}/characters?access_token=${key}`).then(res1 => res1.json())
        .then(data => this.props.doneLoading(data))
    }
  })
)
