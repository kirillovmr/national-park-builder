import "./Shader"
import { Shader } from "./Shader";

export class GuestShader extends Shader
{
    constructor(gl)
    {
        super(gl);
    }

    loadFromServer()
    {
        Shader.prototype.loadFromServer.call(this, "GuestVertexShader", "GuestFragmentShader");
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