import React, { Component } from 'react';
import Loader from './Views/Loader';
import './styles/app.css'
import './styles/loader.css'

import Global from './Global'
import { homeScene, gameScene } from './Views'
import GameSceneController from './Controllers/GameSceneController';

// Keep this import in order to instantiate webGL context
import webGL from './WebGL'

import * as firebase from "firebase/app";
import "firebase/auth";
firebase.initializeApp({
  apiKey: "AIzaSyBvhLLoM1h7m5q21DJk8bTisFnuflGwlY4",
  authDomain: "national-park-builder.firebaseapp.com",
  databaseURL: "https://national-park-builder.firebaseio.com",
  projectId: "national-park-builder",
  storageBucket: "national-park-builder.appspot.com",
  messagingSenderId: "594762971851",
  appId: "1:594762971851:web:4898eb4cef57ad5a1b794e"
});


export default class App extends Component {
  state = {
    scene: homeScene
  }

  componentWillUnmount() {
    Global.appState.setState = state => {
      Global.appState.state = state
    }
  }

  componentDidMount() {
    // Saving app state in the Global object
    // Loader.reload(2000);
    Global.appState.state = {...this.state, ...Global.appState.state}
    Global.appState.setState = state => {
      this.setState(state)
      Global.appState.state = state
    }
    Global.appState.setState(Global.appState.state)

    // Guesting
    const { search } = window.location
    const data = search ? search.split('=') : null
    if (data && data[0] && data[1] && data[0].includes('user')) {
      Global.isVisiting = true;

      Loader.fadeIn();

      Global.appState.setState({
        ...Global.appState.state,
        scene: gameScene
      })

      const visitUID = data[1]
      console.error(visitUID)
      GameSceneController.fetchGuestingData(visitUID)
    }
    else {
      Loader.fadeIn();
      // Auth state handler
      firebase.auth().onAuthStateChanged(async user => {
        if (user) user.idToken = await firebase.auth().currentUser.getIdToken(true)
        else Loader.fadeOut()
        GameSceneController.fetchUserData(user)
        Global.homeSceneState.setState({
          ...Global.homeSceneState.state,
          user,
          onAuthCalled: true
        })
      })
    }
    
    // setTimeout(() => {
    //   console.log("hiding loader!");
    //   Loader.fadeOut();
    // },1000);
  }

  render() {
    return (
      this.state.scene
    );
  }
}


// Web client ID: 594762971851-f625rrteufmprnkqeso7b8dl3ed242ir.apps.googleusercontent.com
// Web client secret: TabnmJX0SqISy2DW0ujHScGx