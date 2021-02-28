import { Vector3 } from "./Math/Vector3";
import { glMatrix, mat4 } from "./Libs/gl-matrix"
import NoiseGenerator from  "./Math/NoiseGenerator"

import KeyBoardInput from "./Input/KeyBoardInput"

export class Camera
{
    constructor(cameraPos, lookAngle)
    {
        this.heightOffset = 10;
        this.lookAngle = lookAngle;

        this.velocity = new Vector3(0.1, 0.1, 0.1);
        this.cameraPos = new Vector3(cameraPos.x, 0, cameraPos.z);
        this.__adjustHeight();

        this.__setMovementVectors();
        this.__setMatrices(60, 0.1, 100);
    }

    getViewMatrix()
    {
        return mat4.lookAt(this.viewMatrix, this.cameraPos.toVec3Lib(), this.cameraPos.add(this.cameraFront).toVec3Lib(), this.cameraUp.toVec3Lib());
    }

    getProjectionMatrix()
    {
        return this.projectionMatrix;
    }

    processKeyBoardInput()
    {
        if(KeyBoardInput.pressedW)
        {
            this.cameraPos = this.cameraPos.add(this.cameraMoveFront.mul(this.velocity));
            this.__adjustHeight();
        }
        if(KeyBoardInput.pressedA)
        {
            this.cameraPos = this.cameraPos.subtract(this.cameraRight.mul(this.velocity));
            this.__adjustHeight();
        }
        if(KeyBoardInput.pressedS)
        {
            this.cameraPos = this.cameraPos.subtract(this.cameraMoveFront.mul(this.velocity));
            this.__adjustHeight();
        }
        if(KeyBoardInput.pressedD)
        {
            this.cameraPos = this.cameraPos.add(this.cameraRight.mul(this.velocity));
            this.__adjustHeight();
        }
    }

    __setMovementVectors()
    {
        this.cameraUp = new Vector3(
            0.0,
            1.0,
            0.0,
        );

        this.cameraRight = new Vector3(
            1.0,
            0.0,
            0.0,
        
        );
        this.cameraMoveFront = new Vector3(
            0.0,
            0.0,
           -1.0,
        );

        this.cameraFront = new Vector3(
            0.0,
            -Math.sin(glMatrix.toRadian(this.lookAngle)),
            -Math.cos(glMatrix.toRadian(this.lookAngle)),
        );
    }

    __setMatrices(fov, near, far)
    {
        this.viewMatrix = new Float32Array(16);

        this.projectionMatrix = new Float32Array(16);
        mat4.perspective(this.projectionMatrix, glMatrix.toRadian(fov), window.innerWidth/window.innerHeight, near, far);
    }

    __adjustHeight()
    {
        this.cameraPos.y = NoiseGenerator.getHeight(this.cameraPos.x, this.cameraPos.z) + this.heightOffset;
    }
}
