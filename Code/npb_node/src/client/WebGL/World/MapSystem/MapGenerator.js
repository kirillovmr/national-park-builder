import { TerrainGenerator } from "./TerrainGenerator"
import { WORLD_WIDTH, WORLD_LENGTH, TERRAIN_WIDTH, TERRAIN_LENGTH, UNIT_SIZE } from "../WorldConstants"

import { Mesh } from "../../Model/Mesh"
import { Vector3 } from "../../Math/Vector3"

import NoiseGenerator from "../../Math/NoiseGenerator"

export class MapGenerator
{
    // Returns an array for terrains where meshes[i] - meshes for terrain i
    buildMap(modelDatabase)
    {
        this.__terrainGenerator = new TerrainGenerator(modelDatabase)
        let meshes = [];

        for(let terrainX = 0; terrainX < WORLD_LENGTH; terrainX++)
        {
            for(let terrainZ = 0; terrainZ < WORLD_WIDTH; terrainZ++)
            {
                let translation = new Vector3();
                translation.x = terrainX * (TERRAIN_WIDTH - 1);
                translation.z = terrainZ * (TERRAIN_LENGTH - 1);
                translation.y = 0;

                let results = this.__terrainGenerator.produceMesh(terrainX, terrainZ);

                results[0].translateMesh(translation);
                results[1].translateMesh(translation);

                meshes.push(results);
            }
        }

        return meshes;
    }
}