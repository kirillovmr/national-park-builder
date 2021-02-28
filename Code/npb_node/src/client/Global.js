class Global {
    appState = {
        state: {},
        setState: (state) => { this.appState.state = state }
    }

    homeSceneState = {
        state: {},
        setState: (state) => { this.homeSceneState.state = state }
    }

    gameSceneState = {
        state: {},
        setState: (state) => { this.gameSceneState.state = state }
    }

    isVisiting = false

    glInitialized = false
    glLooped = false

    isPopupOpened = false
}

export default new Global()