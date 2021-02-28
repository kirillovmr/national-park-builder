import React from 'react'
import Swal from 'sweetalert2'

import Global from '../Global'
import { homeScene } from '../Views'

import { Buildings, Player } from '../Models'
import Loader from '../Views/Loader'
import { GuestModule } from './index';

import buttonImages from '../img/btns'
import testimg from '../img/react.png'
import WebGL from '../WebGL'

class GameSceneController {
    constructor() {
        this.buildingsShowing = false
    }

    // _placeBuildingAsync(buildingData) {
    //     return new Promise(resolve => resolve(WebGL.structuresManager.placeBuilding(buildingData)))
    // }

    _loader() {
        setTimeout(() =>{Loader.fadeOut()}, 2500);
    }

    _placeBuildings(player) {
        let a = Date.now()
        Object.keys(player.buildings).forEach(id => {
            // this._placeBuildingAsync(player.buildings[id])
            WebGL.structuresManager.placeBuilding(player.buildings[id]);
        });
        console.warn(`PLACING DONE in ${Date.now() - a} ms`)
        this._loader()
    }

    _placeBuildingsHelper(player) {
        if (!WebGL.structuresManager)
            return setTimeout(this._placeBuildingsHelper.bind(this, player), 1000)
        this._placeBuildings(player)
    }

    _initGL(seed, cameraPos) {
        if (!Global.glInitialized) {
            console.log("WebGL init called")
            WebGL.init(seed, cameraPos)
            Global.glInitialized = true
        }
        // Start WebGL game loop
        if (!Global.glLooped) {
            console.log("WebGL loop started")
            WebGL.loop()
            Global.glLooped = true
        }
    }

    fetchUserData(authData) {
        if (!authData) {
            return Global.gameSceneState.setState({
                ...Global.gameSceneState.state,
                money: -1,
                excitement: -1
            })
        }

        Player.getPlayer(authData.idToken).then(player => {
            console.warn(player)
            Global.gameSceneState.setState({
                ...Global.gameSceneState.state,
                money: player.money,
                excitement: player.excitement,
                ticket_price: player.ticket_price,
                last_visit: player.last_visit
            })

            let cameraPosArr = player.cameraPos.split('/')
            let cameraPos = { x: parseFloat(cameraPosArr[0]), z: parseFloat(cameraPosArr[1]) }

            this._initGL(player.seed, cameraPos)

            if(player.buildings) 
                this._placeBuildingsHelper(player)
            else 
                this._loader()

            GuestModule.init();
        })
    }

    fetchGuestingData(uid) {
        Player.getGuestingPlayer(uid).then(player => {
            console.warn("Guesting", player)
            Global.gameSceneState.setState({
                ...Global.gameSceneState.state,
                money: player.money,
                excitement: player.excitement,
                ticket_price: player.ticket_price,
                last_visit: player.last_visit
            })

            let cameraPosArr = player.cameraPos.split('/')
            let cameraPos = { x: parseFloat(cameraPosArr[0]), z: parseFloat(cameraPosArr[1]) }

            this._initGL(player.seed, cameraPos)

            if(player.buildings)
                this._placeBuildingsHelper(player)
            else
                this._loader()

            setInterval(() => {
                WebGL.guestsManager.addGuest();
                WebGL.guestsManager.addGuest();
                WebGL.guestsManager.addGuest();
            }, 7000)
        })
    }

    // Returns a button to be used withing the game scene
    getOuterButton(bottomText, topText, image, color, onClick) {
        return (
            <a className={"btn gs-btn clickable gs-outer-btn " + (color?`gs-btn-${color}`:"")} key={bottomText} onClick={onClick}>
                <div className={topText=='notify'?'notification':''}></div>
                <img src={image} />
                {<p className="gs-text-top">{topText && topText!='notify' ? topText : ""}</p>}
                <p className={image?"":"gs-text-no-img"}>{bottomText}</p>
            </a>
        )
    }

    // On home button
    onMenuBtn() {

        if (Global.isVisiting) {
            return window.location = '/'
        }

        // Change the scene
        Global.appState.setState({
            ...Global.appState.state,
            scene: homeScene
        })

        // "close" the building menu
        this.buildingsShowing = false
        Global.gameSceneState.setState({
            ...Global.gameSceneState.state,
            buildingsToBuild: []
        })

        // Cancel dummy building (if shown)
        this.onCancelBuilding()
    }

    // To be called once a user presses a building he is planning to build
    onExactBuildingBtn(buildingData) {
        WebGL.dummyBuildingManager.addDummyBuilding(buildingData);

        // Display buttons to confirm or cancel building placement
        Global.gameSceneState.setState({
            ...Global.gameSceneState.state,
            bottomLeftButtonsData: [{
                text: "Confirm",
                image: this.getUiImage("confirm"),
                onClick: this.onConfirmBuilding.bind(this, buildingData)
            },{
                text: "Cancel",
                image: this.getUiImage("cancel"),
                onClick: this.onCancelBuilding.bind(this)
            }]
        })
    }
    onConfirmBuilding(buildingData) {
        const { x, y, z, ok } = WebGL.dummyBuildingManager.getDummyPosition();
        const rot = WebGL.dummyBuildingManager.getDummyRotation();

        if(!ok) return

        buildingData = { ...buildingData, x, y, z, rot }
        WebGL.dummyBuildingManager.removeDummyBuilding();

        Player.build(Global.homeSceneState.state.user.idToken, buildingData)
        .then(res => {
            if(!res.success) return console.warn("Building rejected by server", buildingData)

            WebGL.structuresManager.placeBuilding(buildingData);

            console.log("Confirm placement of", buildingData)
            Global.gameSceneState.setState({
                ...Global.gameSceneState.state,
                bottomLeftButtonsData: [],
                money: res.newMoney,
                excitement: res.newExcitement
            })
        })

        // Toggle available buildings off
        if (this.buildingsShowing)
            this.onBuildBtn()
    }
    onCancelBuilding() {
        console.log("Cancel placement")
        
        WebGL.dummyBuildingManager.removeDummyBuilding();
        Global.gameSceneState.setState({
            ...Global.gameSceneState.state,
            bottomLeftButtonsData: []
        })
    }

    // On building button press (displays a list of available buildings)
    onBuildBtn() {
        if (this.buildingsShowing) {
            // Remove building buttons from the scene
            Global.gameSceneState.setState({ ...Global.gameSceneState.state, buildingsToBuild: [] })
            this.buildingsShowing = false
        }
        else {
            // buildingsData: array of buildings data from the database
            Buildings.getAllBuildings().then(buildingsData => {

                // Prepare the data to render
                let buttonsData = Object.keys(buildingsData).map(buildingId => {
                    const building = {...buildingsData[buildingId], id: buildingId}
                    return {
                        text: building.name,
                        price: building.price,
                        image: Buildings.getBuildingImage(buildingId),
                        onClick: this.onExactBuildingBtn.bind(this, building)
                    }
                })

                // Sort by price
                buttonsData = buttonsData.sort((a, b) => b.price - a.price)

                // Render the data
                Global.gameSceneState.setState({ ...Global.gameSceneState.state, buildingsToBuild: buttonsData })
                this.buildingsShowing = true
            })
        }
    }

    onLeaderboardBtn() {
        Global.isPopupOpened = true;
        Swal.fire({
            title: "Leaderboard",
            showCloseButton: true,
            showConfirmButton: false,
            text: 'Loading...',
            didDestroy: () => {Global.isPopupOpened = false;}
        })
  
        Player.getLeaderboardPlayers().then(players => {
            if (!Swal.isVisible()) return
            const userEmail = Global.homeSceneState.state.user ? Global.homeSceneState.state.user.email : null
            const body = players.reduce((acc, cur) => {
                return acc + `<a href="/?user=${cur.uid}"><p style="${userEmail && cur.email == userEmail?'font-weight: bold':''}">${cur.email} - ${cur.excitement}</p></a>`
            }, ``)
            Swal.update({
                html: 'Ordered by excitement score<hr>' + body
            })
        })
    }

    onProfileBtn() {
        Global.isPopupOpened = true;
        Swal.fire({
            title: "Profile",
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Set camera spawn",
            showDenyButton: true,
            denyButtonText: "Reset island",
            text: 'Loading...',
            didDestroy: () => {Global.isPopupOpened = false;}
        }).then(result => {
            // Setting camera spawn point
            if (result.isConfirmed) {
                const { x, z } = WebGL.camera.cameraPos
                Player.setCameraSpawn(Global.homeSceneState.state.user.idToken, `${x}/${z}`)
            }
            // Resetting island
            else if (result.isDenied) {
                Player.resetIsland(Global.homeSceneState.state.user.idToken).then(res => {
                    window.location = '/'
                })
            }
        })

        Player.getPlayerProfile(Global.homeSceneState.state.user.idToken).then(profile => {
            if (!Swal.isVisible()) return
            Swal.update({
                html: `
                    <img style="float:left; margin-right: 10px;" src="${profile.picture}"/>
                    <div style="text-align:left;">
                        <p>Name: ${profile.name}</p>
                        <p>Email: ${profile.email}</p>
                    </div>
                `
            })
        })
    }

    onTasksBtn() {
        Global.isPopupOpened = true;
        Swal.fire({
            title: "Daily Tasks",
            showCloseButton: true,
            showConfirmButton: false,
            text: 'Loading...',
            didDestroy: () => {Global.isPopupOpened = false;}
        })

        Player.getTasks(Global.homeSceneState.state.user.idToken).then(tasksObj => {
            if (!Swal.isVisible()) return
            Swal.update({
                html: tasksObj.tasks.reduce((acc, cur) => {
                    return acc + `${cur.progress >= cur.count?'<del>':''}<p>${cur.name} | Progress: ${cur.progress}/${cur.count} | Reward: ${cur.excitementReward}</p>${cur.progress >= cur.count?'</del>':''}`
                }, ``) + `<hr>New tasks in ${tasksObj.timeBeforeNewTasks/1000} seconds`
            })
        })
    }

    onTicketsBtn() {
        Global.isPopupOpened = true;
        Swal.fire({
            title: 'Park Tickets',
            showCloseButton: true,
            input: 'range',
            inputLabel: 'Current price of your park ticket for visitiors:',
            inputAttributes: {
                min: 1,
                max: 30,
                step: 1
            },
            inputValue: Global.gameSceneState.state.ticket_price,
            footer: `Move the tooltip to change the price`,
            confirmButtonText: "Submit",
            didDestroy: () => {Global.isPopupOpened = false;}
        }).then(res => {
            const { isConfirmed, isDenied, isDismissed, value } = res;

            if( isConfirmed ) {
                // change in db
                const newTicketPrice = parseInt(value),
                      idToken = Global.homeSceneState.state.user.idToken;
                Player.changeTicketPrice(idToken, newTicketPrice).then(res => {
                    // update in state
                    Global.gameSceneState.setState({
                        ...Global.gameSceneState.state,
                        ticket_price: newTicketPrice
                    })
                });
            }
        }) 
    }

    getUiImage(id) {
        return buttonImages[id] ? buttonImages[id] : testimg
    }
}

export default new GameSceneController()