import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import './styles/main.scss'

ReactDOM.render(<App />, document.getElementById('root'))
