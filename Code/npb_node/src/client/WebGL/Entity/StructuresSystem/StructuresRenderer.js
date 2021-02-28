import { Camera } from "../../Camera"
import { StructureShader } from "../../Shaders/StructureShader"

import { Mesh } from "../../Model/Mesh"
import { Model } from "../../Model/Model"

import { Structure} from "./Structure"


export class StructuresRenderer
{
    constructor(gl)
    {
        this.shader = new StructureShader(gl);
        this.shader.loadFromServer();

        this.structureModels = {};
        this.positions = [];
        this.gl = gl;
    }

    addStructure(structure)
    {
        this.structureModels[structure.model] = structure.getMesh().getModel(this.gl);
    }

    render(camera, structures)
    {   
        // Nothing to render
        if(Object.keys(structures).length <= 0)
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

        let gl =  this.gl;

        this.shader.bind();
        this.shader.loadProjectionMatrix(camera.getProjectionMatrix());
        this.shader.loadViewMatrix(camera.getViewMatrix());

        for(let key of Object.keys(structures)) 
        {
            let structuresWithSameMesh = structures[key];

            let modelMatrices = [];
            for(let i = 0; i < structuresWithSameMesh.length; i++)
            {
                modelMatrices.push(structuresWithSameMesh[i].getModelMatrix());
            }

            this.shader.loadModelMatrices(modelMatrices);

            let model = this.structureModels[key];
            model.bindVAO();

            gl.drawElementsInstanced(gl.TRIANGLES, model.indicesLen, gl.UNSIGNED_SHORT, 0, structuresWithSameMesh.length);
        }
    }
}