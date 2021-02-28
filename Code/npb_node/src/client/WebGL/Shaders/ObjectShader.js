import "./Shader"
import { Shader } from "./Shader";

export class ObjectShader extends Shader
{
    constructor(gl)
    {
        super(gl);
    }

    loadFromServer()
    {
        Shader.prototype.loadFromServer.call(this, "ObjectVertexShader", "ObjectFragmentShader");
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