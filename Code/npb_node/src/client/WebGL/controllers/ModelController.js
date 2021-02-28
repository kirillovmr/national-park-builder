class ModelController {

    /** Returns an object:
     * {
     *   model_name: {
     *     obj: '',
     *     mtl: ''
     *   },
     *   ...
     * }
     */

    getAllModels() {
        return new Promise((resolve, reject) => {
            const modelNames = ['m_bench', 'm_bush', 'm_cafe', 'm_tree', 'm_tree2', 'm_plants', 'm_plants2', 'm_lamp', 'm_lamp2', 'm_fence', 'm_path', 'm_path2', 'guest',
             'Terrain/plane1', 'Terrain/plane2', 'Terrain/plane3', 'Terrain/plane4', 'Terrain/planed1', 'Terrain/planed2', 'Terrain/planed3', 'Terrain/planed4', 'Terrain/planeXZ',
             'Terrain/triangle1', 'Terrain/triangle2', 'Terrain/triangle3', 'Terrain/triangle4']
            const objPromises = [], mtlPromises = []

            for(name of modelNames) {
                objPromises.push(this.getModel(name))
                mtlPromises.push(this.getMTL(name))
            }

            Promise.all([ Promise.all(objPromises), Promise.all(mtlPromises) ]).then(res => {
                return resolve(modelNames.reduce((acc, modelName, i) => { return {
                    ...acc,
                    [modelName]: {
                        obj: res[0][i],
                        mtl: res[1][i]
                    }
                }}, {}))
            })
        })
    }

    getMapMeshes(seed) {
        return new Promise((resolve, reject) => {
            fetch(`/api/getMapMeshes?seed=${seed}`)
                .then(raw => raw.text())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }

    setMapMeshes(seed, meshes) {
        return new Promise((resolve, reject) => {
            fetch(`/api/setMapMeshes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ seed, meshes })
            })
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve({ success: false }))
        })
    }

    getModel(modelName) {
        return new Promise((resolve, reject) => {
            fetch(`/api/get3dModel?name=${modelName}`)
                .then(raw => raw.text())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }

    setBuildingMesh(modelId, mesh) {
        return new Promise((resolve, reject) => {
            fetch(`/api/setBuildingMesh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ modelId, mesh })
            })
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve({ success: false }))
        })
    }

    getBuildingMesh(modelId) {
        return new Promise((resolve, reject) => {
            fetch(`/api/getBuildingMesh?modelId=${modelId}`)
                .then(raw => raw.text())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }

    getMTL(modelName) {
        return new Promise((resolve, reject) => {
            fetch(`/api/getMTL?name=${modelName}`)
                .then(raw => raw.text())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }

    getShader(shaderName) {
        return new Promise((resolve, reject) => {
            fetch(`/api/getShader?name=${shaderName}`)
                .then(raw => raw.text())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }

    getImage(imageName) {
        return new Promise((resolve, reject) => {
            fetch(`/api/getImage?name=${imageName}`)
                .then(raw => raw.blob())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
}

export default new ModelController()