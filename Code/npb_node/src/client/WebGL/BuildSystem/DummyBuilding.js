import { vec3, mat4, glMatrix } from "../Libs/gl-matrix"
import { Vector3 } from "../Math/Vector3"
import { Mesh } from "../Model/Mesh"

import { ObjectLoader } from "../ObjectLoader/ObjectLoader"
import { ObjectLoaderParameters } from "../ObjectLoader/ObjectLoaderParameters"

export class DummyBuilding
{
    // data taken from buildingData
    constructor(id, name, model, length, width, modelDatabase)
    {
        this.id = id;
        this.name = name;
        this.model = model;
        this.length = length;
        this.width = width;

        let params = new ObjectLoaderParameters();
        params.loadNormals = false;
        params.loadColors = true;

        this.mesh = ObjectLoader.parse(this.model, params, modelDatabase[this.model].obj, modelDatabase[this.model].mtl);

        this.position = new Vector3(0, 0, 0);
        this.rotation = 90;

        console.log("Dummy added")
    }

    getMesh()
    {
        return this.mesh;
    }

    getPosition()
    {
        return this.position;
    }

    setPosition(position)
    {
        if(!(position instanceof Vector3))
        {
            console.error("Invalid arguments passes to setPosition in DummyBuilding");
            return;
        }

        this.position = position;
    }

    isPositionOk()
    {
        return true;
    }

    rotate90degCW()
    {
        this.rotation -= 45;
    }

    rotate90degCCW()
    {
        this.rotation += 45;
    }

    getModelMatrix()
    {
        let worldMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);
        let translation = vec3.create();
        vec3.set(translation, this.position.x, this.position.y, this.position.z);
        mat4.translate(worldMatrix, worldMatrix, translation);
        mat4.rotateY(worldMatrix, worldMatrix, glMatrix.toRadian(this.rotation));

        return worldMatrix;
    }
}