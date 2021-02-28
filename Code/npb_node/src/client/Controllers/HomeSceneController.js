import React from 'react'

import Global from '../Global'
import { gameScene } from '../Views'
import Loader from '../Views/Loader'

class HomeSceneController {
    onStartBtn() {
        // Loader.reload(100);
        Global.appState.setState({
            ...Global.appState.state,
            scene: gameScene
        })
    }
}

export default new HomeSceneController()