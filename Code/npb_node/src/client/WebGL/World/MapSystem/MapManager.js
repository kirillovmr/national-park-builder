import { MapGenerator } from "./MapGenerator"
import { MapRenderer, TerrainRenderer } from "./MapRenderer"

import { ModelController } from "../../controllers"
import { Mesh } from "../../Model/Mesh"

export class MapManager
{
    constructor(gl, modelDatabase)
    {   
        this.gl = gl;
        this.modelDatabase = modelDatabase;

        this.mapMeshes = null;

        this.mapGenerator = new MapGenerator();
        this.mapRenderer = new MapRenderer(this.gl);
    }

    setMapMeshes(terrainMeshes)
    {
        this.mapMeshes = JSON.parse(terrainMeshes);
        
        for(let i = 0; i < this.mapMeshes.length; i++)
        {
            this.mapMeshes[0] = Object.assign(new Mesh, this.mapMeshes[0]);
            this.mapMeshes[1] = Object.assign(new Mesh, this.mapMeshes[1]);

            this.mapRenderer.addMeshes(this.mapMeshes[i]);
        }
    }

    generateMapMeshes(seed)
    {
        let a = Date.now();
        this.mapMeshes = this.mapGenerator.buildMap(this.modelDatabase);
        console.log("Time for generating = ", Date.now() - a);

        ModelController.setMapMeshes(seed, JSON.stringify(this.mapMeshes));

        for(let i = 0; i < this.mapMeshes.length; i++)
            this.mapRenderer.addMeshes(this.mapMeshes[i]);
    }

    displayMap(camera)
    {
        if(this.mapMeshes)
        {
            this.mapRenderer.render(camera);
        }
    }
}