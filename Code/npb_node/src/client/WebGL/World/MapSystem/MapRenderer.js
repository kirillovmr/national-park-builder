import { TerrainShader } from "../../Shaders/TerrainShader"
import { Camera } from "../../Camera"

import { Mesh } from "../../Model/Mesh"
import { Model } from "../../Model/Model"

import { Texture2D } from "../../Texture/Texture2D"

export class MapRenderer
{
    constructor(gl)
    {
        this.shader = new TerrainShader(gl);
        this.shader.loadFromServer();

        this.grassTerrainModels = [];
        this.transitionTerrainModels = [];

        this.grassTexture = new Texture2D(gl);
        this.grassTexture.loadFromServer("grass");

        this.transitionTexture = new Texture2D(gl);
        this.transitionTexture.loadFromServer("transition");

        this.gl = gl;
    }

    // Must be an array of 2 meshes - grass mesh and transition mesh
    addMeshes(meshes)
    {   
        if(!(meshes[0] instanceof Mesh) || !(meshes[1] instanceof Mesh))
        {   
            meshes[0] = Object.assign(new Mesh, meshes[0])
            meshes[1] = Object.assign(new Mesh, meshes[1])
        }

        this.grassTerrainModels.push(meshes[0].getModel(this.gl));
        this.transitionTerrainModels.push(meshes[1].getModel(this.gl));
    }


    render(camera)
    {
        if(!this.shader.shadersLoaded || !this.grassTexture.textureLoaded || !this.transitionTexture.textureLoaded)
        {
            return;
        }

        if(!(camera instanceof Camera))
        {
            console.error("Invalid arguments to render method in TerrainRenderer");
            return;
        }

        let gl =  this.gl;

        this.shader.bind();
        this.shader.loadProjectionMatrix(camera.getProjectionMatrix());
        this.shader.loadViewMatrix(camera.getViewMatrix());

        this.grassTexture.bind();
        for(let i = 0; i < this.grassTerrainModels.length; i++)
        {   
            let model = this.grassTerrainModels[i];
            model.bindVAO();

            gl.drawElements(gl.TRIANGLES, model.indicesLen, gl.UNSIGNED_SHORT, 0);
        }

        this.transitionTexture.bind();
        for(let i = 0; i < this.transitionTerrainModels.length; i++)
        {   
            let model = this.transitionTerrainModels[i];
            model.bindVAO();

            gl.drawElements(gl.TRIANGLES, model.indicesLen, gl.UNSIGNED_SHORT, 0);
        }
    }
}