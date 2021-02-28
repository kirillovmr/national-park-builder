import { Mesh } from "../../Model/Mesh";

import { Vector3 } from "../../Math/Vector3"
import NoiseGenerator from "../../Math/NoiseGenerator";

import { ObjectLoader } from "../../ObjectLoader/ObjectLoader"
import { ObjectLoaderParameters } from "../../ObjectLoader/ObjectLoaderParameters"

import { WORLD_WIDTH, WORLD_LENGTH, TERRAIN_WIDTH, TERRAIN_LENGTH, UNIT_SIZE } from "../WorldConstants"


export class TerrainGenerator
{
    constructor(modelDatabase)
    {
        this.noiseValues = new Array(WORLD_WIDTH * TERRAIN_WIDTH * WORLD_LENGTH * TERRAIN_LENGTH);

        let a = Date.now();
        for(let x = -1; x <= WORLD_WIDTH * TERRAIN_WIDTH; x++)
        {
            for(let z = -1; z <= WORLD_LENGTH * TERRAIN_LENGTH; z++)
            {
                this.noiseValues[z * WORLD_WIDTH * TERRAIN_WIDTH + x] = NoiseGenerator.getLevel(x * UNIT_SIZE, z * UNIT_SIZE);
            }
        }

        console.log("Time that noise optimally takes = ", Date.now() - a);

        this.__getMeshesOfTerrainComponents(modelDatabase);
    }

    produceMesh(terrainX, terrainZ)
    {
        this.terrainX = terrainX;
        this.terrainZ = terrainZ;

        let grassMesh = new Mesh();
        this.indicesIndexGrass = 0;

        let transitionMesh = new Mesh();
        this.indicesIndexTransition = 0;

        for(let z = 0; z < TERRAIN_LENGTH; z++)
        {
            for(let x = 0; x < TERRAIN_WIDTH; x++)
            {
                grassMesh.append(this.__produceGrassMeshUnit(x, z));
                transitionMesh.append(this.__produceTransitionMeshUnit(x, z));
            }
        }

        return [ grassMesh, transitionMesh ];
    }


    __produceGrassMeshUnit(x, z)
    {
        let gX = x + this.terrainX * TERRAIN_WIDTH;
        let gZ = z + this.terrainZ * TERRAIN_LENGTH;

        let hcur =      this.noiseValues[gZ * WORLD_WIDTH * TERRAIN_WIDTH + gX];
        let hup =       this.noiseValues[(gZ - UNIT_SIZE) * WORLD_WIDTH * TERRAIN_WIDTH + gX];
        let hright =    this.noiseValues[gZ * WORLD_WIDTH * TERRAIN_WIDTH + gX + UNIT_SIZE];
        let hdown =     this.noiseValues[(gZ + UNIT_SIZE) * WORLD_WIDTH * TERRAIN_WIDTH + gX];
        let hleft =     this.noiseValues[gZ * WORLD_WIDTH * TERRAIN_WIDTH + gX - UNIT_SIZE];

        // let hcur = NoiseGenerator.getLevel(x, z, this.terrainX, this.terrainZ);
        // let hup = NoiseGenerator.getLevel(x, z - UNIT_SIZE, this.terrainX, this.terrainZ);
        // let hright = NoiseGenerator.getLevel(x + UNIT_SIZE, z, this.terrainX, this.terrainZ);
        // let hdown = NoiseGenerator.getLevel(x, z + UNIT_SIZE, this.terrainX, this.terrainZ);
        // let hleft = NoiseGenerator.getLevel(x - UNIT_SIZE, z, this.terrainX, this.terrainZ);

        let translation = new Vector3();
        translation.x = x * UNIT_SIZE + this.terrainX;
        translation.z = z * UNIT_SIZE + this.terrainZ;

        let unitMesh = new Mesh();
        
        let plane = this.__prepareMesh(this.planeXZMesh, true, false);
        translation.y = hcur;

        unitMesh.append( plane.translateMesh(translation) );


        if(hdown == hleft && hup == hright && hdown > hcur)
        {
            let t = this.__prepareMesh(this.triangle1, true, true);
            translation.y = hdown;

            unitMesh.append(t.translateMesh(translation));
        }

        if(hdown == hright && hup == hleft && hdown > hcur)
        {
            let t = this.__prepareMesh(this.triangle2, true, true);
            translation.y = hdown;

            unitMesh.append(t.translateMesh(translation));
        }
        
        if(hup == hright && hdown == hleft && hup > hcur)
        {
            let t = this.__prepareMesh(this.triangle3, true, true);
            translation.y = hup;

            unitMesh.append(t.translateMesh(translation));
        }

        if(hup == hleft && hdown == hright && hup > hcur)
        {
            let t = this.__prepareMesh(this.triangle4, true, true);
            translation.y = hup;

            unitMesh.append(t.translateMesh(translation));
        }

        return unitMesh;
    }

    __produceTransitionMeshUnit(x, z)
    {
        let gX = x + this.terrainX * TERRAIN_WIDTH;
        let gZ = z + this.terrainZ * TERRAIN_LENGTH;

        let hcur =      this.noiseValues[gZ * WORLD_WIDTH * TERRAIN_WIDTH + gX];
        let hup =       this.noiseValues[(gZ - UNIT_SIZE) * WORLD_WIDTH * TERRAIN_WIDTH + gX];
        let hright =    this.noiseValues[gZ * WORLD_WIDTH * TERRAIN_WIDTH + gX + UNIT_SIZE];
        let hdown =     this.noiseValues[(gZ + UNIT_SIZE) * WORLD_WIDTH * TERRAIN_WIDTH + gX];
        let hleft =     this.noiseValues[gZ * WORLD_WIDTH * TERRAIN_WIDTH + gX - UNIT_SIZE];

        // let hcur = NoiseGenerator.getLevel(x, z, this.terrainX, this.terrainZ);
        // let hup = NoiseGenerator.getLevel(x, z - UNIT_SIZE, this.terrainX, this.terrainZ);
        // let hright = NoiseGenerator.getLevel(x + UNIT_SIZE, z, this.terrainX, this.terrainZ);
        // let hdown = NoiseGenerator.getLevel(x, z + UNIT_SIZE, this.terrainX, this.terrainZ);
        // let hleft = NoiseGenerator.getLevel(x - UNIT_SIZE, z, this.terrainX, this.terrainZ);

        let translation = new Vector3();
        translation.x = x * UNIT_SIZE + this.terrainX;
        translation.z = z * UNIT_SIZE + this.terrainZ;

        let unitTransitionMesh = new Mesh();
        
        if(hcur > hright)
        {
            let rightFace = this.__prepareMesh(this.plane3Mesh, false, false);
            translation.y = hright;

            unitTransitionMesh.append(rightFace.translateMesh(translation));
        }

        if(hcur < hright)
        {
            let leftFace = this.__prepareMesh(this.plane3Mesh, false, false);
            translation.y = hcur;

            unitTransitionMesh.append(leftFace.translateMesh(translation));
        }

        if(hcur > hdown)
        {
            let frontFace = this.__prepareMesh(this.plane1Mesh, false, false);
            translation.y = hdown;

            unitTransitionMesh.append(frontFace.translateMesh(translation));
        }

        if(hdown == hleft && hup == hright && hdown > hcur)
        {
            let t = this.__prepareMesh(this.planed1Mesh, false, false);
            translation.y = hcur;

            unitTransitionMesh.append(t.translateMesh(translation));
        }

        if(hdown == hright && hup == hleft && hdown > hcur)
        {
            let t = this.__prepareMesh(this.planed2Mesh, false, false);
            translation.y = hcur;

            unitTransitionMesh.append(t.translateMesh(translation));
        }
        
        if(hup == hright && hdown == hleft && hup > hcur)
        {
            let t = this.__prepareMesh(this.planed3Mesh, false, false);
            translation.y = hcur;

            unitTransitionMesh.append(t.translateMesh(translation));
        }

        if(hup == hleft && hdown == hright && hup > hcur)
        {
            let t = this.__prepareMesh(this.planed4Mesh, false, false);
            translation.y = hcur;

            unitTransitionMesh.append(t.translateMesh(translation));
        }

        return unitTransitionMesh;
    }

    __prepareMesh(mesh, isGrassMesh, isTriangle)
    {
        if(!(mesh instanceof Mesh))
        {
            console.error("Invalid arguments to __prepareMesh method in TerrainGenerator");
            return;
        }

        let copy = new Mesh();

        copy.vertexPositions = [...mesh.vertexPositions];
        copy.textureCoordinates = [...mesh.textureCoordinates];
        copy.indices = [...mesh.indices];

        for(let i = 0; i < copy.indices.length; i++)
        {
            if(isGrassMesh)
                copy.indices[i] += this.indicesIndexGrass;
            else
                copy.indices[i] += this.indicesIndexTransition;
        }

        if(isGrassMesh && isTriangle)
            this.indicesIndexGrass += 3;
        else if(isGrassMesh && !isTriangle)
            this.indicesIndexGrass += 4;
        else if(!isGrassMesh && isTriangle)
            this.indicesIndexTransition += 3;
        else if(!isGrassMesh && !isTriangle)
            this.indicesIndexTransition += 4;   

        return copy;
    }

    __getMeshesOfTerrainComponents(modelDatabase)
    {
        let params = new ObjectLoaderParameters();
        params.loadTextureCoordinates = true;

        this.plane1Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/plane1'].obj);
        this.plane2Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/plane2'].obj);
        this.plane3Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/plane3'].obj);
        this.plane4Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/plane4'].obj);
        this.planeXZMesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/planeXZ'].obj);

        this.planed1Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/planed1'].obj);
        this.planed2Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/planed2'].obj);
        this.planed3Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/planed3'].obj);
        this.planed4Mesh = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/planed4'].obj);

        this.triangle1 = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/triangle1'].obj);
        this.triangle2 = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/triangle2'].obj);
        this.triangle3 = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/triangle3'].obj);
        this.triangle4 = ObjectLoader.parse(undefined, params, modelDatabase['Terrain/triangle4'].obj);
    }
}