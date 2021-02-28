import { ModelController } from "../controllers"
import { BuildProgram } from "./ShaderLoader"

export class Shader
{
    constructor(gl)
    {
        this.gl = gl;
        this.shadersLoaded = false;
    }

    async loadFromServer(filenameVertex, filenameFragment)
    {
        let shaders = await Promise.all([
            ModelController.getShader(filenameVertex),  
            ModelController.getShader(filenameFragment) 
        ]);

        this.shaderProgram = BuildProgram(this.gl, shaders[0], shaders[1]);
        this.shadersLoaded = true;
    }

    bind()
    {
        if(!this.shadersLoaded)
        {
            console.error("Shaders not loaded!");
            return;
        }

        this.gl.useProgram(this.shaderProgram);
    }

    loadInt(uniformName, value)
    {
        if(!this.shadersLoaded)
        {
            console.error("Shaders not loaded!");
            return;
        }

        this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgram, uniformName), value);
    }

    loadFloat(uniformName, value)
    {
        if(!this.shadersLoaded)
        {
            console.error("Shaders not loaded!");
            return;
        }

        this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgram, uniformName), value);
    }

    loadVector2(uniformName, value)
    {
       // TODO
    }

    loadVector3(uniformName, value)
    {
        // TODO
    }

    loadVector4(uniformName, value)
    {
        // TODO
    }

    loadMatrix4(uniformName, value)
    {
        if(!this.shadersLoaded)
        {
            console.error("Shaders not loaded!");
            return;
        }

        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgram, uniformName), this.gl.FALSE, value);
    }
}
