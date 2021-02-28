import React, { Component } from 'react';
import '../styles/homeScene.css'

import Global from '../Global'
import { homeSceneController } from '../Controllers'

import bgImg from '../img/home_bg.png'

import * as firebase from "firebase/app";
import "firebase/auth";
import Swal from 'sweetalert2';

export default class HomeScene extends Component {
  state = {
    user: null,
    onAuthCalled: false
  }

  componentWillUnmount() {
    Global.homeSceneState.setState = state => {
      Global.homeSceneState.state = state
    }
  }
  
  componentDidMount() {
    Global.isPopupOpened = true;
    if(Swal.isVisible())
      Swal.close()
    // Saving scene state in the Global object
    Global.homeSceneState.state = {...this.state, ...Global.homeSceneState.state}
    Global.homeSceneState.setState = state => {
      this.setState(state)
      Global.homeSceneState.state = state
    }
    Global.homeSceneState.setState(Global.homeSceneState.state)
  }

  drawBackground() {
    document.getElementById("root").classList.add("hs-bg-color");
    document.getElementById("root").style.backgroundImage = `url(${bgImg})`;
    document.getElementById("root").classList.remove("no-click");
    document.getElementById("root").style.pointerEvents = 'all';
  }

  login() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(token)
      console.log(user)
      // ...
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode, errorMessage)
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log("SignOut OK")
    })
    .catch(e => {
      console.error("SignOut err", e)
    })
  }

  getProfileBtn() {
    return (
    <button className="btn hs-btn" 
      onClick={this.state.user ? this.logout.bind(this) : this.state.onAuthCalled ? this.login.bind(this) : null}>
      {this.state.user ? 'Logout' : this.state.onAuthCalled ? 'Login' : '...'}
    </button>
    )
  }

  render() {
    this.drawBackground();

    return (
      <div className="clickable">
        <div id="hs-username-group">
          {this.getProfileBtn()}
          <span className="hs-username text">{this.state.user ? this.state.user.email : this.state.onAuthCalled ? '@guest' : 'loading...'}</span>
        </div>

        {/* main menu */}
        <div className="hs-btn-container">
          <button className="btn hs-btn hs-menu-btn" onClick={this.state.user ? homeSceneController.onStartBtn : ()=>{alert("Please login")}}>Start Game</button>
          <button className="btn hs-btn hs-menu-btn">Dummy</button>
          <button className="btn hs-btn hs-menu-btn">Dummy</button>
        </div>
      </div>
    );
  }
}
