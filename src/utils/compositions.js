import config from 'config'
import { compose, map, keyBy, assign } from 'lodash/fp'
import { lifecycle, withStateHandlers, branch, renderComponent, withProps, withHandlers } from 'recompose'
import Loading from 'components/Loading'

const withLoading = (dataProp = 'data') => compose(
  withProps(() => ({ controller: new AbortController() })),
  lifecycle({ componentWillUnmount () { this.props.controller.abort() } }),
  withStateHandlers(
    () => ({ loading: true, [dataProp]: null }),
    { doneLoading: () => data => ({ loading: false, [dataProp]: data }) }
  )
)

export const withAchievements = compose(
  withLoading(),
  lifecycle({
    componentDidMount () {
      fetch(`${config.gwHost}/achievements/daily`)
        .then(res => res.json())
        .then(({ pvp, pve, wvw, fractals, special }) => {
          const allIds = [].concat(
            map('id')(pvp),
            map('id')(pve),
            map('id')(wvw),
            map('id')(fractals),
            map('id')(special)
          )
          fetch(`${config.gwHost}/achievements?ids=${allIds}`, { signal: this.props.controller.signal })
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
  )
)

export const withCharacters = compose(
  withLoading('allChars'),
  lifecycle({
    componentDidMount () {
      fetch(`${config.gwHost}/characters?access_token=${config.key}`, { signal: this.props.controller.signal })
        .then(res => res.json())
        .then(data => this.props.doneLoading(data))
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.log('error', err)
          }
        })
    }
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(Loading)
  )
)

export const withCharData = compose(
  withLoading('charData'),
  withHandlers({
    fetchCharData: ({ controller, doneLoading }) => char => {
      fetch(`${config.gwHost}/characters/${char}?access_token=${config.key}`, { signal: controller.signal })
        .then(res => res.json())
        .then(data => doneLoading(data))
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.log('error', err)
          }
        })
    }
  })
)
