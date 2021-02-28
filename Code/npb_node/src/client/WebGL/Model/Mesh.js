import { Vector2 } from "../Math/Vector2"
import { Vector3 } from "../Math/Vector3"
import { Vertex } from "./Vertex"

import { Model } from "./Model" 

export class Mesh
{
    // Data can be managed directly by manipulating arrays created in the constructor.
    constructor()
    {
        this.vertexPositions = [];
        this.textureCoordinates = [];
        this.vertexNormals = [];
        this.vertexColors = [];

        this.indices = [];
    }

    getModel(gl)
    {
        let model = new Model(gl);
        model.addMesh(this);

        return model;
    }

    // The user is responsible for passing indices correctly
    append(mesh)
    {
        if(!(mesh instanceof Mesh))
        {
            console.error("Invalid arguments to append method in Mesh");
            return;
        }

        this.vertexPositions.push(...mesh.vertexPositions);
        this.textureCoordinates.push(...mesh.textureCoordinates);
        this.vertexNormals.push(...mesh.vertexNormals);
        this.vertexColors.push(...mesh.vertexColors);

        this.indices.push(...mesh.indices);
    }

    translateMesh(translation)
    {
        if(!(translation instanceof Vector3))
        {
            console.error("Invalid arguments to translateMesh method in Mesh");
            return;
        }

        for(let i = 0; i < this.vertexPositions.length; i+=3)
        {
            this.vertexPositions[i] += translation.x;
            this.vertexPositions[i + 1] += translation.y;
            this.vertexPositions[i + 2] += translation.z;
        }

        return this;
    }

    getVertex(i)
    {
        let vertex = new Vertex();
        
        if(this.vertexPositions.length > 0)
        {
            vertex.position = new Vector3(this.vertexPositions[3 * i], this.vertexPositions[3 * i + 1], this.vertexPositions[3 * i + 2]);
        }
        if(this.textureCoordinates.length > 0)
        {
            vertex.textureCoordinate = new Vector2(this.textureCoordinates[2 * i], this.textureCoordinates[2 * i + 1]);
        }
        if(this.vertexNormals.length > 0)
        {
            vertex.normal = new Vector3(this.vertexNormals[3 * i], this.vertexNormals[3 * i + 1], this.vertexNormals[3 * i + 2]);
        }
        if(this.vertexColors.length > 0)
        {
            vertex.color = new Vector3(this.vertexColors[3 * i], this.vertexColors[3 * i + 1], this.vertexColors[3 * i + 2]);
        }

        return vertex;
    }
}