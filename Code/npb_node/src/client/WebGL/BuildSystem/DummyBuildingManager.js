import { Camera } from "../Camera"

import { DummyBuildingInputHandler } from "./DummyBuildingInputHandler"
import { DummyBuilding } from "./DummyBuilding"
import { DummyBuildingRenderer } from "./DummyBuildingRenderer"


export class DummyBuildingManager
{
    constructor(gl, modelDatabase)
    {
        this.gl = gl;

        this.modelDatabase = modelDatabase;

        this.dummyBuilding = null;
        this.dummyBuildingInputHandler = new DummyBuildingInputHandler();
        this.dummyBuildingRenderer = new DummyBuildingRenderer(this.gl);
    }

    
    addDummyBuilding(buildingData)
    {
        this.dummyBuilding = new DummyBuilding(
            buildingData.id,
            buildingData.name,
            buildingData.model,
            buildingData.length,
            buildingData.width,
            this.modelDatabase
        );
        
        this.dummyBuildingInputHandler.setDummyBuilding(this.dummyBuilding);
        this.dummyBuildingRenderer.setDummyBuilding(this.dummyBuilding);

        // Mouse event dispatch
        setTimeout(() => {
            document.getElementById('canvas').dispatchEvent(new MouseEvent('mousedown', { clientX: document.body.clientWidth/2, clientY: document.getElementById('canvas').height/2 }))
            document.getElementById('canvas').dispatchEvent(new MouseEvent('mousemove', { clientX: document.body.clientWidth/2, clientY: document.getElementById('canvas').height/2 }))
            setTimeout(() => {
                document.getElementById('canvas').dispatchEvent(new MouseEvent('mouseup', {}))
            }, 25)
        },400)
    }


    removeDummyBuilding()
    {
        if(this.dummyBuilding != null)
        {
            this.dummyBuildingInputHandler.removeDummyBuilding();
            this.dummyBuildingRenderer.removeDummyBuilding();

            delete this.dummyBuilding;
            this.dummyBuilding = null;
        }
    }


    displayDummyBuilding(camera)
    {
        if(this.dummyBuilding != null)
        {
            this.dummyBuildingRenderer.render(camera);
        }
    }


    getDummyPosition()
    {
        if(this.dummyBuilding === null)
        {
            console.error("Error in getDummyPosition method in DummyBuildingManager: dummyBuilding is null");
            return null;
        }

        return { ...this.dummyBuilding.position, ok : this.dummyBuilding.isPositionOk() };
    }

    getDummyRotation()
    {
        if(this.dummyBuilding === null)
        {
            console.error("Error in getDummyPosition method in DummyBuildingManager: dummyBuilding is null");
            return null;
        }

        return this.dummyBuilding.rotation;
    }


    getDummyBuilding()
    {
        if(this.dummyBuilding === null)
        {
            console.error("Error in getDummyBuilding method in DummyBuildingManager: dummyBuilding is null");
            return null;
        }

        return this.dummyBuilding;
    }

    proccessUserInput()
    {
        this.dummyBuildingInputHandler.proccessUserInput();
    }
}