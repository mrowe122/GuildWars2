import config from 'config'
import { compose, map, keyBy, assign, pick } from 'lodash/fp'
import { lifecycle, withStateHandlers, branch, mapProps, renderComponent } from 'recompose'
import { cachedFetch } from './cachedFetch'
import Loading from 'components/Loading'

export const withLoading = compose(
  withStateHandlers(
    () => ({ loading: true, data: null }),
    { doneLoading: () => data => ({ loading: false, data }) }
  )
)

export const withAchievements = compose(
  withLoading,
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
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(Loading)
  ),
  mapProps(pick('data'))
)

console.log(Loading)

export const withCharacters = compose(
  withLoading,
  lifecycle({
    componentDidMount () {
      cachedFetch(`${config.gwHost}/characters?access_token=${config.key}`)
        .then(res1 => res1.json())
        .then(data => this.props.doneLoading(data))
    }
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(Loading)
  ),
  mapProps(pick('data'))
)
