import { Camera } from "../../Camera"
import { Vector2 } from "../../Math/Vector2"
import { Vector3 } from "../../Math/Vector3"
import { Vector4 } from "../../Math/Vector4"

import { mat4, vec3, vec4 } from "../../Libs/gl-matrix"

export class MousePickerRay
{
    static getCurrentRay(wmPos, camera)
    {
        if(!(camera instanceof Camera) || !(wmPos instanceof Vector2))
        {
            console.error("Invalid arguments to getCurrentRay method");
            return;
        }

        let vmPos = MousePickerRay.__getMousePosInViewportCoords(wmPos);
        let NDCmPos = MousePickerRay.__getMousePosInNDC(vmPos);
        let CCmPos = MousePickerRay.__getMousePosInClipCoords(NDCmPos);
        let worldCmPos = MousePickerRay.__getMousePosInWorldCoords(CCmPos, camera);
        
        return worldCmPos;
    }

    static __getMousePosInViewportCoords(wmPos)
    {
        if(!(wmPos instanceof Vector2))
        {
            console.error("Invalid arguments to __getMousePosInViewportCoords method");
            return;
        }

        let ww = window.innerWidth;
        let wh = window.innerHeight;
        
        let canvas = document.getElementById("canvas");
        let cw = canvas.width;
        let ch = canvas.height;

        let vmPos = new Vector2();
        vmPos.x = wmPos.x * cw / ww;
        vmPos.y = wmPos.y * ch / wh;
        
        return vmPos;
    }

    static __getMousePosInNDC(vmPos)
    {
        if(!(vmPos instanceof Vector2))
        {
            console.error("Invalid arguments to __getMousePosInNDC method");
            return;
        }

        let canvas = document.getElementById("canvas");
        let cw = canvas.width;
        let ch = canvas.height;

        let NDCmPos = new Vector2();
        NDCmPos.x = (2 * vmPos.x / cw) - 1;
        NDCmPos.y = 1 - (2 * vmPos.y / ch);

        return NDCmPos;
    }

    static __getMousePosInClipCoords(NDCmPos)
    {
        if(!(NDCmPos instanceof Vector2))
        {
            console.error("Invalid arguments to __getMousePosInClipCoords method");
            return;
        }

        let CCmPos = new Vector4();

        CCmPos.x = NDCmPos.x;
        CCmPos.y = NDCmPos.y;
        CCmPos.z = -1;
        CCmPos.w = 1;

        return CCmPos;
    }

    static __getMousePosInWorldCoords(CCmPos, camera)
    {
        if(!(CCmPos instanceof Vector4))
        {
            console.error("Invalid arguments to __getMousePosInWorldCoords method");
            return;
        }

        // Getting an inverse of projection matrix
        let inverseProjectionMatrix = new Float32Array(16);
        mat4.invert(inverseProjectionMatrix, camera.projectionMatrix);

        // Multiplying by an inverse of projection matrix
        let eyeCmPos = vec4.create();
        vec4.transformMat4(eyeCmPos, CCmPos.toVec4Lib(), inverseProjectionMatrix)
        vec4.set(eyeCmPos, eyeCmPos[0], eyeCmPos[1], -1, 0);
       

        // Getting an inverse of view matrix
        let inverseViewMatrix = new Float32Array(16);
        mat4.invert(inverseViewMatrix, camera.viewMatrix);

        // Multiplying by an inverse of view matrix
        let worldCmPos = vec4.create();
        vec4.transformMat4(worldCmPos, eyeCmPos, inverseViewMatrix);


        // Removing the w component
        let worldCmPos3D = vec3.create();
        vec3.set(worldCmPos3D, worldCmPos[0], worldCmPos[1], worldCmPos[2]);

        // Normalizing the result
        let result = vec3.create();
        vec3.normalize(result, worldCmPos3D);
        
        return new Vector3(result[0], result[1], result[2]);
    }
}