import "./Mesh"
import { Mesh } from "./Mesh";

export class Model
{
    constructor(gl)
    {
        this.gl = gl;
        this.__vao = this.gl.createVertexArray();
    }

    addMesh(mesh)
    {    
        if(mesh.vertexPositions.length > 0)
        {
            this.addVertexPositions(mesh.vertexPositions);
        }
        if(mesh.textureCoordinates.length > 0)
        {
            this.addTextureCoordinates(mesh.textureCoordinates);
        }
        if(mesh.vertexNormals.length > 0)
        {
            this.addVertexNormals(mesh.vertexNormals);
        }
        if(mesh.vertexColors.length > 0)
        {
            this.addVertexColors(mesh.vertexColors);
        }

        this.addIndices(mesh.indices);
    }

    addVertexPositions(vertexPositions)
    {
        this.__addVBO(vertexPositions, 3, 0);
    }

    addTextureCoordinates(textureCoords)
    {
        this.__addVBO(textureCoords, 2, 1);
    }

    addVertexNormals(vertexNormals)
    {
        this.__addVBO(vertexNormals, 3, 2);
    }

    addVertexColors(vertexColors)
    {
        this.__addVBO(vertexColors, 3, 3);
    }

    addIndices(indices)
    {
        this.__addEBO(indices);
        this.indicesLen = indices.length;
    }

    __addVBO(data, dimentions, location)
    {
        this.bindVAO();
        let gl = this.gl;

        let vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        gl.vertexAttribPointer(location, dimentions, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(location);

        this.unbindVAO();
    }

    __addEBO(data)
    {
        this.bindVAO();
        let gl = this.gl;

        let index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);

        this.unbindVAO()
    }

    bindVAO()
    {
        this.gl.bindVertexArray(this.__vao);
    }

    unbindVAO()
    {
        this.gl.bindVertexArray(null);
    }
}
