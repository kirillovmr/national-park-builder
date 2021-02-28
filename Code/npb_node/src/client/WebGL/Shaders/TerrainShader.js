import "./Shader"
import { Shader } from "./Shader";

export class TerrainShader extends Shader
{
    constructor(gl)
    {
        super(gl);
    }

    loadFromServer()
    {
        Shader.prototype.loadFromServer.call(this, "TerrainVertexShader", "TerrainFragmentShader");
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