import React, { Component } from 'react'
import { map, keyBy, assign } from 'lodash/fp'
import { config } from 'config'

export const withAchievements = WrappedComponent => class withAchievements extends Component {
  state = {
    loading: true,
    data: {}
  }

  componentDidMount = () => {
    fetch(`${config.gwHost}/achievements/daily`)
      .then(res1 => res1.json())
      .then(data => {
        const allIds = [].concat(
          map('id')(data.pvp),
          map('id')(data.pve),
          map('id')(data.wvw),
          map('id')(data.fractals),
          map('id')(data.special)
        )
        fetch(`${config.gwHost}/achievements?ids=${allIds}`)
          .then(res2 => res2.json())
          .then(data2 => {
            const keyData = keyBy('id')(data2)
            this.setState({
              loading: false,
              data: {
                pve: data.pve.map(e => assign(e, keyData[e.id])),
                pvp: data.pvp.map(e => assign(e, keyData[e.id])),
                wvw: data.wvw.map(e => assign(e, keyData[e.id])),
                fractals: data.fractals.map(e => assign(e, keyData[e.id])),
                special: data.special.map(e => assign(e, keyData[e.id]))
              }
            })
          })
      })
  }

  render = () => {
    return <WrappedComponent {...this.props} {...this.state} />
  }
}
