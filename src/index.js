import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import App from './app'
import './styles/main.scss'

firebase.initializeApp({
  apiKey: 'AIzaSyDozSUfSBae_FH_rNsznfDjzSOFgvnUDYY',
  authDomain: 'gw2tracker-d615c.firebaseapp.com',
  projectId: 'gw2tracker-d615c'
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    user.getIdToken(false).then(token => {
      ReactDOM.render(<App authUser={{ token, firebase: firebase.auth() }} />, document.getElementById('root'))
    })
  } else {
    ReactDOM.render(<App authUser={{ firebase: firebase.auth() }} />, document.getElementById('root'))
  }
})

if (__DEV__) {
  module.hot.accept()
}
