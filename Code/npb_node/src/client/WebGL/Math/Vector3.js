import { vec3 } from "../Libs/gl-matrix"

export class Vector3
{
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other)
    {
        if(!(other instanceof Vector3))
        {
            console.error("Can not add 2 3D vectors. Reason: type mismatch");
            return;
        }

        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    subtract(other)
    {
        if(!(other instanceof Vector3))
        {
            console.error("Can not subtract 2 3D vectors. Reason: type mismatch");
            return;
        }

        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    mul(other)
    {
        if(!(other instanceof Vector3))
        {
            console.error("Can not mul 2 3D vectors. Reason: type mismatch");
            return;
        }

        return new Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
    }

    scale(constant)
    {
        return new Vector3(constant * this.x, constant * this.y, constant * this.z);
    }

    toVec3Lib()
    {
        let vector3 = vec3.create();
        vec3.set(vector3, this.x, this.y, this.z);
        
        return vector3;
    }
}
