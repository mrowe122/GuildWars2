import config from 'config'
import { compose, map, keyBy, assign, pick } from 'lodash/fp'
import { lifecycle, withStateHandlers, branch, mapProps, renderComponent, withProps } from 'recompose'
import { cachedFetch } from './cachedFetch'
import Loading from 'components/Loading'

const withLoading = compose(
  withStateHandlers(
    () => ({ loading: true, data: null }),
    { doneLoading: () => data => ({ loading: false, data }) }
  ),
  withProps(() => ({
    controller: new AbortController()
  }))
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
          cachedFetch(`${config.gwHost}/achievements?ids=${allIds}`, { signal: this.props.controller.signal })
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
    },
    componentWillUnmount () { this.props.controller.abort() }
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(Loading)
  ),
  mapProps(pick('data'))
)

export const withCharacters = compose(
  withLoading,
  lifecycle({
    componentDidMount () {
      cachedFetch(`${config.gwHost}/characters?access_token=${config.key}`, { signal: this.props.controller.signal })
        .then(res1 => res1.json())
        .then(data => this.props.doneLoading(data))
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.log('error', err)
          }
        })
    },
    componentWillUnmount () { this.props.controller.abort() }
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(Loading)
  ),
  mapProps(pick('data'))
)
