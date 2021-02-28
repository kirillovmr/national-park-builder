import "./Shader"
import { Shader } from "./Shader";

export class BasicShader extends Shader
{
    constructor(gl)
    {
        super(gl);
    }

    loadFromServer()
    {
        Shader.prototype.loadFromServer.call(this, "BasicVertexShader", "BasicFragmentShader");
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