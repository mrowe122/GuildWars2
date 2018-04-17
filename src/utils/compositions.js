import { compose, map, keyBy, assign } from 'lodash/fp'
import { lifecycle, withStateHandlers } from 'recompose'
import { cachedFetch } from './cachedFetch'
import { config } from 'config'

export const withAchievements = compose(
  withStateHandlers(() => ({ loading: true, data: {}
  }), {
    doneLoading: () => data => ({ loading: false, data })
  }),
  lifecycle({
    componentDidMount () {
      cachedFetch(`${config.gwHost}/achievements/daily`)
        .then(res1 => res1.json())
        .then(({ pvp, pve, wvw, fractals, special }) => {
          const allIds = [].concat(
            map('id')(pvp),
            map('id')(pve),
            map('id')(wvw),
            map('id')(fractals),
            map('id')(special)
          )
          cachedFetch(`${config.gwHost}/achievements?ids=${allIds}`)
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
