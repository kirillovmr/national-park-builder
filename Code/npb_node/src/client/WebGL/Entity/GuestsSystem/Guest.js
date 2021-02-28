import { Vector3 } from "../../Math/Vector3"
import { glMatrix, mat4, vec3 } from "../../Libs/gl-matrix"
import NoiseGenerator from "../../Math/NoiseGenerator"

import { WORLD_WIDTH, WORLD_LENGTH, TERRAIN_WIDTH, TERRAIN_LENGTH, UNIT_SIZE } from "../../World/WorldConstants"

export class Guest
{
    constructor(mesh, position, rotation)
    {
        if(!(position instanceof Vector3))
        {
            console.error("Invalid arguments to Guest constructor");
            return;
        }

        this.mesh = mesh;

        this.position = position;
        this.__adjustY();
        this.rotation = rotation;

        this.velocity = new Vector3(0.05, 0.05, 0.05);

        this.directionUp = new Vector3(0, 0, -1);
        this.directionLeft = new Vector3(-1, 0, 0);
        this.directionDown = new Vector3(0, 0, 1);
        this.directionRight = new Vector3(1, 0, 0);

        this.directionCur = this.directionUp;
    }

    update()
    {   
        // Every frame there is 1/1000 probability that the guest will turn left or right
        let min = Math.ceil(0);
        let max = Math.floor(1000);
        let res = Math.floor(Math.random() * (max - min) + min);

        if(res == 2)
        {
            this.rotate90degCW();
        }
        else if(res == 999)
        {
            this.rotate90degCCW();
        }

        if((this.position.x >= WORLD_WIDTH * TERRAIN_WIDTH * UNIT_SIZE) ||
           (this.position.x <= 1) ||
           (this.position.z >= WORLD_LENGTH * TERRAIN_LENGTH * UNIT_SIZE) ||
           (this.position.z <= 1))
        {
            this.rotate90degCCW();
            this.rotate90degCCW();
        }

        this.position = this.position.add(this.velocity.mul(this.directionCur));
        this.__adjustY();
    }

    rotate90degCW()
    {
        this.rotation -= 90;

        if(this.directionCur === this.directionUp)
            this.directionCur = this.directionRight
        else if(this.directionCur === this.directionRight)
            this.directionCur = this.directionDown
        else if(this.directionCur === this.directionDown)
            this.directionCur = this.directionLeft
        else if(this.directionCur === this.directionLeft)
            this.directionCur = this.directionUp
    }

    rotate90degCCW()
    {
        this.rotation += 90;

        if(this.directionCur === this.directionUp)
            this.directionCur = this.directionLeft
        else if(this.directionCur === this.directionRight)
            this.directionCur = this.directionUp
        else if(this.directionCur === this.directionDown)
            this.directionCur = this.directionRight
        else if(this.directionCur === this.directionLeft)
            this.directionCur = this.directionDown
    }

    getMesh()
    {
        return this.mesh;
    }

    getPosition()
    {
        return this.position;
    }

    setPosition(position)
    {
        if(!(position instanceof Vector3))
        {
            console.error("Invalid arguments passes to setPosition in DummyBuilding");
            return;
        }

        this.position = position;
    }

    getModelMatrix()
    {
        let worldMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);
        let translation = vec3.create();
        vec3.set(translation, this.position.x, this.position.y, this.position.z);
        mat4.translate(worldMatrix, worldMatrix, translation);
        mat4.rotateY(worldMatrix, worldMatrix, glMatrix.toRadian(this.rotation));

        return worldMatrix;
    }

    __adjustY()
    {
        this.position.y = NoiseGenerator.getLevel(this.position.x, this.position.z);
    }
}