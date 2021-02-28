var admin = require("firebase-admin");
const fs = require('fs')
const path = require('path');
const { send } = require("process");

let mapMeshes = {}
let buildingMeshes = {}

class ModelController {
    getAllBuildings(req, res) {
        admin.database().ref('buildings').once('value').then(snapshot => {
            res.json(snapshot.val())
        })
    }

    getMapMeshes(req, res) {
        const { seed } = req.query
        if (mapMeshes[seed]) 
            return res.send(mapMeshes[seed])
        return res.send("")
    }

    setMapMeshes(req, res) {
        const { seed, meshes } = req.body;
        mapMeshes[seed] = meshes;
        return res.json({ success: true })
    }

    getBuildingMesh(req, res) {
        const { modelId } = req.query
        if (buildingMeshes[modelId]) 
            return res.send(buildingMeshes[modelId])
        return res.send("")
    }

    setBuildingMesh(req, res) {
        const { modelId, mesh } = req.body;
        buildingMeshes[modelId] = mesh;
        return res.json({ success: true })
    }

    get3dModel(req, res) {
        fs.readFile(path.resolve(__dirname, `../resources/3d/${req.query.name}.obj`), 'utf8' , (err, data) => {
            res.send(err ? '' : data)
        })
    }

    getMTL(req, res) {
        fs.readFile(path.resolve(__dirname, `../resources/3d/${req.query.name}.mtl`), 'utf8' , (err, data) => {
            res.send(err ? '' : data)
        })
    }

    getShader(req, res) {
        fs.readFile(path.resolve(__dirname, `../resources/ShaderSources/${req.query.name}.glsl`), 'utf8' , (err, data) => {
            res.send(err ? '' : data)
        })
    }

    getImage(req, res) {
        res.sendFile(path.resolve(__dirname, `../resources/img/${req.query.name}.png`))
    }
}

module.exports = new ModelController()