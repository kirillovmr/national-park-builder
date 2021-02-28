var admin = require("firebase-admin");

const TaskController = require('./taskController')

function seedGenerator() {
    return Math.floor(Math.random() * 65536)
}

function getInitialUserObj(email) {
    return {
        email,
        money: 1000000,
        excitement: 2,
        ticket_price: 10,
        last_visit: Date.now(),
        seed: seedGenerator(),
        cameraPos: "40.0/40.0"
    }
}

class PlayerController {

    getPlayer(req, res) {
        const { token } = req.query
        admin.auth().verifyIdToken(token).then(user => {
            admin.database().ref(`users/${user.uid}`).once('value').then(snapshot => {
                // If user exists
                if (snapshot.exists()) return res.send(snapshot.val())
    
                // If first-time user
                const userObj = getInitialUserObj(user.email)
    
                // Set initial user object and return
                snapshot.ref.set(userObj).then(() => { res.send(userObj) })
            })
        })
    }

    getGuestingPlayer(req, res) {
        const { uid } = req.query
        admin.database().ref(`users/${uid}`).once('value').then(snapshot => {
            // If user exists
            if (snapshot.exists()) return res.send(snapshot.val())

            res.send(null)
        })
    }

    getPlayerProfile(req, res) {
        const { token } = req.query
        admin.auth().verifyIdToken(token).then(user => {
            res.send(user)
        })
    }

    getLeaderboardPlayers(req, res) {
        admin.database().ref('users').orderByChild('excitement').limitToFirst(10).once('value').then(snapshot => {
            let players = []
            snapshot.forEach(playerSnapshot => {
                const { email, excitement } = playerSnapshot.val()
                players.unshift({ email, excitement, uid: playerSnapshot.key })
            })
            res.send(players)
        })
    }

    changeTicketPrice(req, res) {
        const { idToken, price } = req.body;
        admin.auth().verifyIdToken(idToken).then(user => {
            admin.database().ref(`users/${user.uid}/ticket_price`).once('value').then(snapshot => {
                snapshot.ref.set(price).then(_ => {
                    // successfully updated ticket price
                    return res.send({
                        success: true,
                        ticket_price: price
                    });
                })
            })
        })
    }

    build(req, res) {
        const { idToken, buildingData } = req.body
        Promise.all([ 
            admin.auth().verifyIdToken(idToken), // authorization
            admin.database().ref(`buildings/${buildingData.id}/price`).once('value'), // get building price from db
            admin.database().ref(`buildings/${buildingData.id}/excitement`).once('value')  // get building excitement from db
        ]).then(snapshots => {
            const uid = snapshots[0].uid, 
                  buildingPrice = snapshots[1].val(),
                  buildingExcitement = snapshots[2].val()
            
            Promise.all([
                admin.database().ref(`users/${uid}/money`).once('value'), // get user money 
                admin.database().ref(`users/${uid}/excitement`).once('value') // get user excitement 
            ]).then(snapshots => {
                const userMoney = snapshots[0].val(),
                      userExcitement = snapshots[1].val();
                const [ moneySnapshot, excitementSnapshot ] = snapshots;

                if (userMoney < buildingPrice) return res.send({ success: false, error: 'not enough money' })

                // Update the data
                Promise.all([ 
                    moneySnapshot.ref.set(userMoney - buildingPrice), // substract price from user money balance
                    admin.database().ref(`users/${uid}/buildings`).push().set(buildingData), // push new building to user buildings 
                    excitementSnapshot.ref.set(userExcitement + buildingExcitement),
                    TaskController._taskProcesser(uid, 'BUILD', 1) 
                ]).then(_ => {
                    // Fetch new data
                    Promise.all([
                        admin.database().ref(`users/${uid}/money`).once('value'),
                        admin.database().ref(`users/${uid}/excitement`).once('value')
                    ]).then(results => {
                        return res.send({ 
                            success: true, 
                            newMoney: results[0].val(), 
                            newExcitement: results[1].val() 
                        })
                    })
                })
            })
        })
    }

    addRevenue(req, res) {
        const { idToken } = req.body;

        admin.auth().verifyIdToken(idToken).then(user => {
            Promise.all([
                admin.database().ref(`users/${user.uid}/money`).once('value'),
                admin.database().ref(`users/${user.uid}/ticket_price`).once('value'),
                admin.database().ref(`users/${user.uid}/last_visit`).once('value')
            ]).then(results => {
                const userMoney = results[0].val(),
                      moneySnapshot = results[0],
                      userTicketPrice = results[1].val(),
                      visitSnapshot = results[2];
                
                Promise.all([
                    visitSnapshot.ref.set((new Date().getTime() / 1000).toFixed(0)),
                    moneySnapshot.ref.set(userMoney + userTicketPrice)
                ]).then(_ => {
                    return res.send({
                        success: true,
                        newMoney: userMoney + userTicketPrice
                    });
                })
            });
        })
    }

    addVisitRevenue(req, res) {
        const { idToken } = req.body;

        admin.auth().verifyIdToken(idToken).then(user => {
            Promise.all([
                admin.database().ref(`users/${user.uid}/money`).once('value'),
                admin.database().ref(`users/${user.uid}/ticket_price`).once('value'),
                admin.database().ref(`users/${user.uid}/last_visit`).once('value')
            ]).then(results => {
                // snapshots and vals
                const moneySnapshot = results[0],
                      userMoney = results[0].val(),
                      userTicketPrice = results[1].val(),
                      lastVisit = results[2].val(),
                      visitSnapshot = results[2],
                // calculations
                      last_visit_sec = parseInt(lastVisit),
                      guestVisitChance = 100 - (userTicketPrice * 100 / 30).toFixed(1),
                      diff_time_sec = (parseInt((new Date().getTime() / 1000).toFixed(0)) - last_visit_sec) / 10;
                // calc visited guests
                let g_visited = (parseInt((diff_time_sec * guestVisitChance / 100).toFixed(0)) / 10).toFixed(0)
                // max: 500 guests offline
                if(g_visited >= 1) 
                    g_visited = g_visited < 500 ? g_visited : 500;
                else 
                    return res.send({
                        success: true,
                        newMoney: userMoney
                    })
                // money + rev
                const moneyRevenued = userMoney + (userTicketPrice * g_visited);

                Promise.all([
                    visitSnapshot.ref.set((new Date().getTime() / 1000).toFixed(0)),
                    moneySnapshot.ref.set(moneyRevenued)
                ]).then(_ => {
                    return res.send({
                        success: true,
                        newMoney: moneyRevenued
                    });
                })
            });
        })
    }

    setCameraSpawn(req, res) {
        const { idToken, pos } = req.body;

        admin.auth().verifyIdToken(idToken).then(user => {
            admin.database().ref(`users/${user.uid}/cameraPos`).set(pos).then(snapshot => {
                res.send({
                    success: true
                })
            })
        })
    }

    resetIsland(req, res) {
        const { idToken } = req.body;

        admin.auth().verifyIdToken(idToken).then(user => {
            Promise.all([
                admin.database().ref(`users/${user.uid}`).set(getInitialUserObj(user.email)).then(snapshot => {
                    res.send({
                        success: true
                    })
                })
            ])
        })
    }
}

module.exports = new PlayerController()