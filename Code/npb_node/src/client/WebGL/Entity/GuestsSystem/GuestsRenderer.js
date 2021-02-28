import { Camera } from "../../Camera"
import { GuestShader } from "../../Shaders/GuestShader"

import { Mesh } from "../../Model/Mesh"
import { Model } from "../../Model/Model"

import { Guest } from "./Guest"
import { vec3, mat4 } from "../../Libs/gl-matrix"

export class GuestsRenderer
{
    constructor(gl)
    {
        this.gl = gl;

        this.shader = new GuestShader(gl);
        this.shader.loadFromServer();

        // One model for all guests
        this.objectModel = null;
        this.guests = [];
    }

    addGuest(guest)
    {
        if(!(guest instanceof Guest))
        {
            console.error("Invalid argument to addGuest method in GuestsRenderer");
        }

        this.guests.push(guest);
        this.objectModel = guest.getMesh().getModel(this.gl);
    }

    removeGuest()
    {
        this.guests.pop();
    }

    render(camera)
    {
        if(this.shader.shadersLoaded === false)
        {
            return;
        }

        if(!(camera instanceof Camera))
        {
            console.error("Invalid arguments to render method in GuestsRenderer");
            return;
        }

        let gl = this.gl;

        this.shader.bind();

        this.shader.loadProjectionMatrix(camera.getProjectionMatrix());
        this.shader.loadViewMatrix(camera.getViewMatrix());
        this.shader.loadModelMatrices(this.__getModelMatrices());
    
        this.objectModel.bindVAO();

        gl.drawElementsInstanced(gl.TRIANGLES, this.objectModel.indicesLen, gl.UNSIGNED_SHORT, 0, this.guests.length);
    }


    __getModelMatrices()
    {
        let modelMatrices = [];
        for(let i = 0; i < this.guests.length; i++)
        {
            modelMatrices.push( this.guests[i].getModelMatrix() );
        }
        return modelMatrices;
    }
}