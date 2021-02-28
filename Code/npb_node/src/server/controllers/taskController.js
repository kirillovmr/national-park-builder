var admin = require("firebase-admin");

const taskUpdateTimeout = 3*60*1000
const taskPool = [
    { name: 'Build 2 buildings', action: 'BUILD', progress: 0, count: 2, excitementReward: 20 },
    { name: 'Destroy 1 building', action: 'DESTROY', progress: 0, count: 1, excitementReward: 15 },
    { name: 'Upgrade 2 buildings', action: 'UPGRADE', progress: 0, count: 2, excitementReward: 30 },
    { name: 'Collect 250 coins', action: 'COLLECT_COINS', progress: 0, count: 250, excitementReward: 20 }
]
const numTasks = 2

class TaskController {

    _taskProcesser(uid, action, amount) {
        return new Promise((resolve, reject) => {
            this._getTasks(uid).then(currentTasks => {
                let promises = []
                for (let i=1; i<=numTasks; i++)
                    if (currentTasks[`task${i}`].action == action) {
                        promises.push( admin.database().ref(`users/${uid}/tasks/task${i}/progress`).set(currentTasks[`task${i}`].progress + amount) )

                        // If user completes the task for the first time
                        if (
                            currentTasks[`task${i}`].progress < currentTasks[`task${i}`].count &&
                            currentTasks[`task${i}`].progress + amount >= currentTasks[`task${i}`].count
                        ) {
                            promises.push(
                                new Promise((resolve, reject) => {
                                    admin.database().ref(`users/${uid}/excitement`).once('value').then(snapshot => {
                                        snapshot.ref.set(snapshot.val() + currentTasks[`task${i}`].excitementReward).then(() => resolve())
                                    })
                                })
                            )
                        }
                    }
                
                Promise.all(promises).then(() => {
                    resolve()
                })
            })
        })
    }

    _getTasks(uid) {
        return new Promise((resolve, reject) => {
            admin.database().ref(`users/${uid}/tasks`).once('value').then(snapshot => {
                if (!snapshot.exists() || Date.now() - snapshot.val().createdAt > taskUpdateTimeout) {
                    this._createNewTasks(uid, numTasks).then(currentTasks => {
                        return resolve(currentTasks)
                    })
                }
                else {
                    return resolve(snapshot.val())
                }
            })
        })
    }

    _createNewTasks(uid, count) {
        return new Promise((resolve, reject) => {
            const pool = JSON.parse(JSON.stringify(taskPool))

            const currentTasks = {
                // task1: ...
                // task2: ...
                createdAt: Date.now()
            }

            for(let i=0; i<Math.min(count, taskPool.length); i++) {
                const randInt = Math.floor(Math.random()*(taskPool.length - i))
                currentTasks[`task${i+1}`] = pool[randInt]
                pool[randInt] = pool[taskPool.length - 1 - i]
            }
            
            admin.database().ref(`users/${uid}/tasks`).set(currentTasks).then(() => {
                return resolve(currentTasks)
            })
        })
    }

    getTasks(req, res) {
        const { token } = req.query
        admin.auth().verifyIdToken(token).then(user => {
            this._getTasks(user.uid).then(currentTasks => {
                res.send({
                    tasks: new Array(numTasks).fill(1).reduce((prev, _, i) => {
                        prev.push(currentTasks[`task${i+1}`])
                        return prev
                    }, []),
                    timeBeforeNewTasks: taskUpdateTimeout-(Date.now()-currentTasks.createdAt)
                })
            })
        })
    }
}

module.exports = new TaskController()