import { vec4 } from "../Libs/gl-matrix"

export class Vector4
{
    constructor(x, y, z, w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    add(other)
    {
        if(!(other instanceof Vector4))
        {
            console.error("Can not add 2 4D vectors. Reason: type mismatch");
            return;
        }

        return new Vector4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }

    subtract(other)
    {
        if(!(other instanceof Vector4))
        {
            console.error("Can not subtract 2 4D vectors. Reason: type mismatch");
            return;
        }

        return new Vector4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    }

    mul(other)
    {
        if(!(other instanceof Vector4))
        {
            console.error("Can not mul 2 4D vectors. Reason: type mismatch");
            return;
        }

        return new Vector4(this.x * other.x, this.y * other.y, this.z * other.z, this.w * other.w);
    }

    scale(constant)
    {
        return new Vector4(constant * this.x, constant * this.y, constant * this.z, constant * this.w);
    }

    toVec4Lib()
    {
        let vector4 = vec4.create();
        vec4.set(vector4, this.x, this.y, this.z, this.w);
        
        return vector4;
    }
}
