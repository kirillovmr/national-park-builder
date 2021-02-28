import { Structure } from "./Structure"
import { StructuresRenderer } from "./StructuresRenderer"

export class StructuresManager
{
    constructor(gl, modelDatabase)
    {
        this.modelDatabase = modelDatabase;

        this.structures = {};
        this.structuresRenderer = new StructuresRenderer(gl);
    }

    placeBuilding(buildingData)
    {
        let newStructure = new Structure(
            buildingData.id,
            buildingData.name,
            buildingData.model,
            buildingData.length,
            buildingData.width,
            buildingData.rot, 
            buildingData.x,
            buildingData.y,
            buildingData.z,
            this.modelDatabase
        );
            
        if(!(buildingData.model in this.structures))
        {
            this.structures[buildingData.model] = [];
            this.structures[buildingData.model].push(newStructure);

            this.structuresRenderer.addStructure(newStructure);
        }
        else 
        {
            this.structures[buildingData.model].push(newStructure);
        }
        
        // this.structures.push(newStructure);
    }

    displayStructures(camera)
    {
        if(Object.keys(this.structures).length > 0)
        {
            this.structuresRenderer.render(camera, this.structures);
        }
    }
}