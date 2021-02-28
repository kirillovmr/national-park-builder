const { ModelController, PlayerController, TaskController } = require('./controllers')

const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path')

// Initializing Firebase services
var admin = require("firebase-admin");
var serviceAccount = require("./national-park-builder-firebase-adminsdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://national-park-builder.firebaseio.com"
});

// Create a server instance
const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));

// Configure a server
app.use(express.static('dist'));

// Model API requests
app.get('/api/getAllBuildings', ModelController.getAllBuildings)
app.get('/api/get3dModel', ModelController.get3dModel)
app.get('/api/getMTL', ModelController.getMTL)
app.get('/api/getShader', ModelController.getShader)
app.get('/api/getImage', ModelController.getImage)

app.get('/api/getMapMeshes', ModelController.getMapMeshes)
app.post('/api/setMapMeshes', ModelController.setMapMeshes)

// Player API requests
app.get('/api/getPlayer', PlayerController.getPlayer)
app.get('/api/getGuestingPlayer', PlayerController.getGuestingPlayer)
app.get('/api/getPlayerProfile', PlayerController.getPlayerProfile)
app.get('/api/getLeaderboardPlayers', PlayerController.getLeaderboardPlayers)

// Player Game Interactions requests
app.post('/api/build', PlayerController.build)
app.post('/api/setCameraSpawn', PlayerController.setCameraSpawn)
app.post('/api/resetIsland', PlayerController.resetIsland)
app.post('/api/changeTicketPrice', PlayerController.changeTicketPrice)
app.post('/api/addRevenue', PlayerController.addRevenue)
app.post('/api/addVisitRevenue', PlayerController.addVisitRevenue)

// Task API requests
app.get('/api/getTasks', TaskController.getTasks.bind(TaskController))

// app.get('/api/test', (req, res) => {
//     admin.auth().verifyIdToken("5zgNg1RUwJOmt4ape8IDnavlRS43").then(user => {
//         console.log(user.toJSON())
//         res.send(user.toJSON())
//     })
// })

app.post('/api/ptest', (req, res) => {
    console.log(req.body)
})

// Misc API requests
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// Start a server
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
