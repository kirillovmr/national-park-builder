import "./Shader"
import { Shader } from "./Shader";

export class StructureShader extends Shader
{
    constructor(gl)
    {
        super(gl);
    }

    loadFromServer()
    {
        Shader.prototype.loadFromServer.call(this, "StructureVertexShader", "StructureFragmentShader");
    }

    loadModelMatrices(modelMatrices)
    {
        for(let i = 0; i < modelMatrices.length; i++)
        {
            Shader.prototype.loadMatrix4.call(this, "modelMatrices[" + i  + "]", modelMatrices[i]);
        }
    }

    loadModelMatrix(modelMatrix)
    {
        Shader.prototype.loadMatrix4.call(this, "modelMatrix", modelMatrix);
    }

    loadViewMatrix(viewMatrix)
    {
        Shader.prototype.loadMatrix4.call(this, "viewMatrix", viewMatrix);
    }

    loadProjectionMatrix(projectionMatrix)
    {
        Shader.prototype.loadMatrix4.call(this, "projectionMatrix", projectionMatrix);
    }
}