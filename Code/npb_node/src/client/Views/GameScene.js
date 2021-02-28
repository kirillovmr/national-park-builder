import React, { Component } from 'react';
import Swal from 'sweetalert2'
import '../styles/gameScene.css'

import img from '../img/btns'

import Global from '../Global'
import { gameSceneController } from '../Controllers'

import { GuestModule } from '../Controllers/index';

import webGL from '../WebGL'
import Loader from './Loader';

export default class GameScene extends Component {
  state = {
    bottomLeftButtonsData: [],
    buildingsToBuild: [],
    money: 0,
    excitement: 0
  }

  componentWillUnmount() {
    Global.gameSceneState.setState = state => {
      Global.gameSceneState.state = state
    }
  }

  componentDidMount() {

    console.log("Is visiting: ", Global.isVisiting);


    // if(Loader.isShown)
    //   setTimeout(Loader.fadeOut, 1500);

    if(Global.isVisiting && Swal.isVisible())
      Swal.close()
      
    Global.isPopupOpened = false;
    // Saving scene state in the Global object
    Global.gameSceneState.state = {...this.state, ...Global.gameSceneState.state}
    Global.gameSceneState.setState = state => {
      this.setState(state)
      Global.gameSceneState.state = state
    }
    Global.gameSceneState.setState(Global.gameSceneState.state)
    
  }

  removeBackground() {
    document.getElementById("root").classList.remove("hs-bg-color");
    document.getElementById("root").style.backgroundImage = "";
    document.getElementById("root").classList.add("no-click");
    document.getElementById("root").style.pointerEvents = 'none';
  }

  getTopLeftButtons() {
    return (
      <div className="gs-btn-group" id="gs-left-top-btn-group">
        {gameSceneController.getOuterButton("Leave", null, gameSceneController.getUiImage('menu'), null, gameSceneController.onMenuBtn.bind(gameSceneController))}
        <div>
          <p>{}</p>
        </div>
        {!Global.isVisiting ? gameSceneController.getOuterButton( `${this.state.money}`, null, gameSceneController.getUiImage('moneybag'), null, null) : null}
      </div>
    )
  }

  getTopRow() {
    return (
      <div className="gs-btn-group" id="gs-top-btn-group">
        <div className="excitement-outer clickable">
          <img src={img.excitement} />
            <p>{this.state.excitement}</p>
          <img src={img.excitement} />
        </div>
      </div>
    )
  }

  getTopRightButtons() {
    return (<>
      <div className="gs-btn-group" id="gs-right-top-btn-group">
        {gameSceneController.getOuterButton("Leaderboard", null, gameSceneController.getUiImage('leader'), null, gameSceneController.onLeaderboardBtn)}
        {!Global.isVisiting ? gameSceneController.getOuterButton("Profile", null, gameSceneController.getUiImage('profile'), "green", gameSceneController.onProfileBtn) : null}
      </div>

      {!Global.isVisiting ? (
        <div className="gs-btn-group" id="gs-right-top-vertical-btn-group">
          {gameSceneController.getOuterButton("Tasks", 'notify', gameSceneController.getUiImage('tasks'), null, gameSceneController.onTasksBtn)}
          {gameSceneController.getOuterButton("Tickets", null, gameSceneController.getUiImage('ticket'), null, gameSceneController.onTicketsBtn)}
        </div>
      ) : null}
    </>)
  }

  getBottomLeftButtons() {
    if (Global.isVisiting) return

    return (
      <div className="gs-btn-group" id="gs-left-bottom-btn-group">
        {this.state.bottomLeftButtonsData.map(b => gameSceneController.getOuterButton(b.text, null, b.image, b.color, b.onClick))}
      </div>
    )
  }

  getBottomRightButtons() {
    if (Global.isVisiting) return

    return (
      <div className="gs-btn-group" id="gs-right-bottom-btn-group">
        {this.state.buildingsToBuild.map(b => gameSceneController.getOuterButton(b.text, b.price, b.image, b.color, b.onClick))}
        {gameSceneController.getOuterButton("Build", null, gameSceneController.getUiImage('build'), "orange", gameSceneController.onBuildBtn.bind(gameSceneController))}
      </div>
    )
  }

  render() {
    this.removeBackground();
    return (<>
      {this.getTopLeftButtons()}
      {this.getTopRow()}
      {this.getTopRightButtons()}
      {this.getBottomLeftButtons()}
      {this.getBottomRightButtons()}
    </>);
  }
}
