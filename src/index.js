import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import App from './app'
import './styles/main.scss'

if (__MOCK__ || __DEV__) {
  module.hot.accept()
}

if (__MOCK__) {
  const authUser = {
    token: 'token',
    firebase: {
      createUserWithEmailAndPassword: () => Promise.resolve(),
      signInWithEmailAndPassword: () => Promise.resolve(),
      signOut: () => Promise.resolve()
    }
  }

  ReactDOM.render(<App authUser={authUser} />, document.getElementById('root'))
} else {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID
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
}
