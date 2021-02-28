import { ObjectShader } from "../Shaders/ObjectShader"
import { Camera } from "../Camera" 

import { Mesh } from "../Model/Mesh"
import { Model } from "../Model/Model"

import { DummyBuilding } from "./DummyBuilding"
import { vec3, mat4 } from "../Libs/gl-matrix"


// Only one dummy building can exist at a time
export class DummyBuildingRenderer
{
    constructor(gl)
    {
        this.shader = new ObjectShader(gl);
        this.shader.loadFromServer();

        this.dummyBuilding = null;
        this.objectModel = null;
        this.gl = gl;
    }

    setDummyBuilding(dummyBuilding)
    {
        if(!(dummyBuilding instanceof DummyBuilding))
        {
            console.error("Invalid arguments to DummyBuildingRenderer constructor");
            return; 
        }

        this.dummyBuilding = dummyBuilding;
        this.objectModel = dummyBuilding.getMesh().getModel(this.gl);
    }

    removeDummyBuilding()
    {
        this.dummyBuilding = null;
        this.objectModel = null;
    }

    addMesh(mesh)
    {   
        if(!(mesh instanceof Mesh))
        {
            console.error("Invalid arguments to addMesh method in DummyBuildingRenderer");
            return;
        }

        this.objectModel = mesh.getModel(this.gl);
    }

    render(camera)
    {
        if(this.dummyBuilding === null)
        {
            return;
        }

        if(this.shader.shadersLoaded === false)
        {
            return;
        }

        if(!(camera instanceof Camera))
        {
            console.error("Invalid arguments to render method in DummyBuildingRenderer");
            return;
        }

        // console.log("rendering dummy");

        let gl =  this.gl;

        this.shader.bind();
        this.shader.loadProjectionMatrix(camera.getProjectionMatrix());
        this.shader.loadViewMatrix(camera.getViewMatrix());
        this.shader.loadModelMatrix(this.dummyBuilding.getModelMatrix());
     
        this.objectModel.bindVAO();

        gl.drawElements(gl.TRIANGLES, this.objectModel.indicesLen, gl.UNSIGNED_SHORT, 0);
    }
}