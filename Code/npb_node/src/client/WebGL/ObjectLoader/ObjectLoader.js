import { ObjectLoaderParameters } from "./ObjectLoaderParameters"
import { Vertex, Mesh } from "../Model/Mesh"
import { Vector2 } from "../Math/Vector2"
import { Vector3 } from "../Math/Vector3"

import MeshesDatabase from "./MeshesDatabase"

export class ObjectLoader
{
    // constructor()
    // {       
    //     this.vertexPositions = [];
    //     this.textureCoordinates = [];
    //     this.vertexNormals = [];
    //     this.vertexColors = []; 
        
    //     this.indices = [];

    //     this.color = null;

    //     this.cache = {}
    // }

    static parse(modelId, parameters, text, mtl)
    {   
        // Trying to get the cached mesh
        // if (modelId && this.cache[modelId])
        // {
        //     return this.cache[modelId];
        // }

        let m = MeshesDatabase.getMesh(modelId);
        if(m != null)
        {   
            return m;
        }

        let vertexPositions = [];
        let textureCoordinates = [];
        let vertexNormals = [];
        let vertexColors = []; 
        
        let indices = [];

        let color = null;


        let params = parameters;
        let mesh = new Mesh();

        let lines = text.split("\n");

        for(let i = 0; i < lines.length; i++)
        {
            let line = lines[i];
            let tokens = line.split(" ");

            // Vertex Positions always loaded
            if(line.startsWith("v ") && true)
            {       
                mesh.vertexPositions.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
            }
            else if(line.startsWith("vt") && params.loadTextureCoordinates)
            {
                console.log("loading tcx" + tokens[1] + " " + tokens[2]);
                let textureCoordinate = new Vector2(parseFloat(tokens[1]), parseFloat(tokens[2]));
                textureCoordinates.push(textureCoordinate);
            }
            else if(line.startsWith("vn") && params.loadNormals)
            {
                let normal = new Vector3(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                vertexNormals.push(normal);
            }
        }

        if(params.loadTextureCoordinates)
        {
            mesh.textureCoordinates = new Array(2 * vertexPositions.length);
        }
        if(params.loadNormals)
        {
            mesh.vertexNormals = new Array(3 * vertexPositions.length);
        }
        if(params.loadColors)
        {
            mesh.vertexColors = new Array(3 * vertexPositions.length);
        }

        for(let i = 0; i < lines.length; i++)
        {
            let line = lines[i];


            if(line.startsWith("f") === false && line.startsWith("usemtl") === false)
                continue;

            
            if(line.startsWith("usemtl"))
            {
                color = ObjectLoader.getColor(line, mtl);
                // console.log(line, color);
                continue;
            }

            let tokens = line.split(" ");

            // v1[0] - vp index, v1[1] - tc index, v1[2] - vn index
            let v1 = tokens[1].split("/");
            let v2 = tokens[2].split("/");
            let v3 = tokens[3].split("/");

            let faceIndices = [ parseInt(v1[0]) - 1, parseInt(v2[0]) - 1, parseInt(v3[0]) - 1 ];
            mesh.indices.push( ...faceIndices );

            if(params.loadTextureCoordinates)
            {
                let textureCoordinateIndex = parseInt(v1[1]) - 1;
                let v1TextureCoordinate = textureCoordinates[textureCoordinateIndex];
                mesh.textureCoordinates[2 * faceIndices[0] + 0] = v1TextureCoordinate.x;
                mesh.textureCoordinates[2 * faceIndices[0] + 1] = v1TextureCoordinate.y;

                textureCoordinateIndex = parseInt(v2[1]) - 1;
                let v2TextureCoordinate = textureCoordinates[textureCoordinateIndex];
                mesh.textureCoordinates[2 * faceIndices[1] + 0] = v2TextureCoordinate.x;
                mesh.textureCoordinates[2 * faceIndices[1] + 1] = v2TextureCoordinate.y;
                
                textureCoordinateIndex = parseInt(v3[1]) - 1;
                let v3TextureCoordinate = textureCoordinates[textureCoordinateIndex];
                mesh.textureCoordinates[2 * faceIndices[2] + 0] = v3TextureCoordinate.x;
                mesh.textureCoordinates[2 * faceIndices[2] + 1] = v3TextureCoordinate.y;
            }
            if(params.loadNormals)
            {
                let normalIndex = parseInt(v1[2]) - 1;
                let v1Normal = vertexNormals[normalIndex];
                mesh.vertexNormals[3 * faceIndices[0] + 0] = v1Normal.x;
                mesh.vertexNormals[3 * faceIndices[0] + 1] = v1Normal.y;
                mesh.vertexNormals[3 * faceIndices[0] + 2] = v1Normal.z;

                normalIndex = parseInt(v2[2]) - 1;
                let v2Normal = vertexNormals[normalIndex];
                mesh.vertexNormals[3 * faceIndices[1] + 0] = v2Normal.x;
                mesh.vertexNormals[3 * faceIndices[1] + 1] = v2Normal.y;
                mesh.vertexNormals[3 * faceIndices[1] + 2] = v2Normal.z;

                normalIndex = parseInt(v3[2]) - 1;
                let v3Normal = vertexNormals[normalIndex];
                mesh.vertexNormals[3 * faceIndices[2] + 0] = v3Normal.x;
                mesh.vertexNormals[3 * faceIndices[2] + 1] = v3Normal.y;
                mesh.vertexNormals[3 * faceIndices[2] + 2] = v3Normal.z;
            }  
            
            if(params.loadColors && color)
            {
                mesh.vertexColors[3 * faceIndices[0] + 0] = color[0];
                mesh.vertexColors[3 * faceIndices[0] + 1] = color[1];
                mesh.vertexColors[3 * faceIndices[0] + 2] = color[2];

                mesh.vertexColors[3 * faceIndices[1] + 0] = color[0];
                mesh.vertexColors[3 * faceIndices[1] + 1] = color[1];
                mesh.vertexColors[3 * faceIndices[1] + 2] = color[2];

                mesh.vertexColors[3 * faceIndices[2] + 0] = color[0];
                mesh.vertexColors[3 * faceIndices[2] + 1] = color[1];
                mesh.vertexColors[3 * faceIndices[2] + 2] = color[2];
            }
        }

        // Caching
        // if(modelId)
        // {
        //     cache[modelId] = mesh
        // }

        if(modelId)
        {
            MeshesDatabase.addMesh(modelId, mesh);
        }

        return mesh;
    }


    static getColor(material, mtl)
    {
        let mat = material.split(' ')[1];

        let lines = mtl.split("\n");


        for(let i = 0; i < lines.length; i++)
        {
            let line = lines[i];

            if(line.split(' ')[1] == mat)
            {
                for(let j = i+1; j < lines.length; j++) {
                    let line = lines[j];
                    if (line.split(' ')[0] == 'Kd') {
                        let a = line.split(' ')
                        return [parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3])]
                    }
                }
            }


        }
    }
}

