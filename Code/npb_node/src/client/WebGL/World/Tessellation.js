// Input - quad; output - mesh

import { Mesh } from "../Model/Mesh"
import { Vector2 } from "../Math/Vector2"
import { Vector3 } from "../Math/Vector3"

class TesselationEngineMesh
{
    constructor()
    {
        this.vertexPositions = [];
        this.indices = [];
    }

    getVertexCoords(i)
    {
        return new Vector2(this.vertexPositions[2 * i], this.vertexPositions[2 * i + 1]);
    }
}

export class QuadTesselation
{
    // tessFactor = number of quads in each dimention. i.e. tessFactor = 3 -> split the quad in 9 equal small quads.
    constructor(tessFactor)
    {
        this.tessFactor = tessFactor;
    }

    produceMesh(quadMesh, indicesIndex)
    {
        let engineMesh = this.QuadTessellationEngine();

        let quadLeftUpCorner = quadMesh.getVertex(0);
        let quadRightUpCorner = quadMesh.getVertex(1);
        let quadLeftBottomCorner = quadMesh.getVertex(2);
        let quadRightBottomCorner = quadMesh.getVertex(3);

        let resultMesh = new Mesh();

        for(let i = 0; i < engineMesh.vertexPositions.length / 2; i++)
        {
            let TessCoord = engineMesh.getVertexCoords(i);

            // Calculation Position
            let p1 = Vector3.mix( quadLeftUpCorner.position, quadRightUpCorner.position, TessCoord.x );
            let p2 = Vector3.mix( quadLeftBottomCorner.position, quadRightBottomCorner.position, TessCoord.x);

            let resPos = Vector3.mix( p1, p2, TessCoord.y );

            // Calculation Texture Coordinate
            let t1 = Vector2.mix( quadLeftUpCorner.textureCoordinate, quadRightUpCorner.textureCoordinate, TessCoord.x );
            let t2 = Vector2.mix( quadLeftBottomCorner.textureCoordinate, quadRightBottomCorner.textureCoordinate, TessCoord.x);

            let resTC = Vector2.mix( t1, t2, TessCoord.y );
            
            // Storing the results
            resultMesh.vertexPositions.push(resPos.x, resPos.y, resPos.z);
            resultMesh.textureCoordinates.push(resTC.x, resTC.y);
        }

        resultMesh.indices = engineMesh.indices.map((val) => { return val + indicesIndex; });

        return resultMesh;
    }

    QuadTessellationEngine()
    {
        let engineMesh = new TesselationEngineMesh();

        // Store vertex pos
        for(let z = 0; z < this.tessFactor + 1; z++)
        {
            for(let x = 0; x < this.tessFactor + 1; x++)
            {
                let r = (1 / this.tessFactor);

                engineMesh.vertexPositions.push(
                    r * x, r * z
                );
            }
        }

        // Store indices
        for(let z = 0; z < this.tessFactor; z++)
        {
            for(let x = 0; x < this.tessFactor; x++)
            {
                let k = z * (this.tessFactor + 1) + x;

                engineMesh.indices.push(
                    k + 1, k + 0, k + (this.tessFactor + 1),
                    k + (this.tessFactor + 1), k + (this.tessFactor + 2), k + 1
                );
            }
        }

        return engineMesh;
    }
}