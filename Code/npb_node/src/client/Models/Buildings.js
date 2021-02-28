import buildingImages from '../img/buildings'
import testimg from '../img/react.png'

class Buildings {
    getAllBuildings() {
        return new Promise((resolve, reject) => {
            fetch('/api/getAllBuildings')
                .then(raw => raw.json())
                .then(res => resolve(res))
                .catch(e => resolve({}))
        })
    }

    getBuildingImage(buildingId) {
        return buildingImages[`bld_${buildingId}`] ? buildingImages[`bld_${buildingId}`] : testimg
    }
}

export default new Buildings()